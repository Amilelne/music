const { UserRecord } = require("../models");
const storeFS = require("../utils/storeFile");
const { PythonShell } = require("python-shell");
const path = require("path");

function runPython(standardFile, userFile) {
  console.log(standardFile, userFile);
  return new Promise((resolve, reject) => {
    let options = {
      mode: "text",
      pythonPath: "python3",
      pythonOptions: ["-u"], // get print results in real-time
      scriptPath: "/home/musicAI/ml/test/code/",
      args: [standardFile, userFile]
    };
    let shell = new PythonShell("estimate.py", options);
    const out = [];
    shell.on("message", function(message) {
      if (message) {
        let score = message.split(" ");
        let AIIntonationScore = parseInt(score[0]);
        let AIBeatScore = parseInt(score[1]);
        let AITotalScore = Math.round((AIIntonationScore + AIBeatScore) / 2);
        out.push(AIIntonationScore, AIBeatScore, AITotalScore);
      }
    });
    shell.end(function(err, code, signal) {
      if (err) throw err;
      resolve(out);
    });
  });
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

      const output = await runPython(abcFilePath, userFilePath);
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
      let expertTotalScore =
        (data.expertBeatScore + data.expertIntonationScore) / 2;
      return UserRecord.updateOne(
        { _id: data.id },
        {
          expertId: data.expertId,
          expertBeatScore: data.expertBeatScore,
          expertIntonationScore: data.expertIntonationScore,
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
