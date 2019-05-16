const { UserRecord } = require("../models");
const storeFS = require("../utils/storeFile");
const { spawnSync } = require("child_process");
const path = require("path");

function runPython(standardFile, userFile) {
  const spawnShell = spawnSync("python3", ["main.py", standardFile, userFile], {
    cwd: "/home/musicAI/ml/test/code",
    encoding: "utf-8"
  });
  const result = JSON.parse(spawnShell.stdout);
  let AIIntonationScore = parseInt(result[0]);
  let AIBeatScore = parseInt(result[1]);
  let AITotalScore = Math.round((AIIntonationScore + AIBeatScore) / 2);
  let imageUrl = result[2];
  return AIIntonationScore, AIBeatScore, AITotalScore, imageUrl;
}

const resolveMap = {
  Query: {
    record: async (obj, { id }, context, info) => {
      return UserRecord.findById(id);
    },
    userRecords: async (obj, { userId }, context, info) => {
      return UserRecord.find({ userId: userId });
    },
    records: async (obj, args, context, info) => {
      return UserRecord.find();
    },
    unscoredRecords: async (obj, args, context, info) => {
      return UserRecord.find({ expertTotalScore: null });
    }
  },
  Mutation: {
    uploadRecord: async (
      obj,
      { data: { file, userId, practiceId, practiceTitle, abcUrl } },
      context,
      info
    ) => {
      // Read file
      const { createReadStream, filename, mimetype } = await file;
      // Get file suffix
      let suffix = filename.split(".").slice(-1)[0];
      if (suffix === "blob") {
        suffix = "wav";
      }
      // Store audio file into folder
      const stream = createReadStream();
      const folder = "recorders";
      const { id, httpPath, serverPath } = await storeFS({
        stream,
        suffix,
        folder
      });
      // Run python shell
      let abcFilePath = path.resolve(process.cwd(), abcUrl);
      let userFilePath = path.resolve(process.cwd(), serverPath);
      console.log(abcFilePath, userFilePath);
      const output = runPython(abcFilePath, userFilePath);
      console.log(output);
      // Save record into userRecord
      let record = UserRecord.create({
        userId: userId,
        practiceId: practiceId,
        audioUrl: httpPath,
        practiceTitle: practiceTitle,
        AIIntonationScore: output[0],
        AIBeatScore: output[1],
        AITotalScore: output[2]
      });
      return record;
    },
    scoreRecord: async (obj, { data }, context, info) => {
      let expertTotalScore = Math.round(
        (data.expertBeatScore + data.expertIntonationScore) / 2
      );
      return UserRecord.updateOne(
        { _id: data.id },
        {
          expertId: data.expertId,
          expertBeatScore: Math.round(data.expertBeatScore),
          expertIntonationScore: Math.round(data.expertIntonationScore),
          expertTotalScore: expertTotalScore
        },
        function(err, doc) {
          if (err) return false;
          return true;
        }
      );
    }
  }
};

module.exports = resolveMap;
