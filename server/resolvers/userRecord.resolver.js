const { UserRecord } = require("../models");
const storeFS = require("../utils/storeFile");
const { PythonShell } = require("python-shell");

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
      { data: { file, userId, practiceId, practiceTitle } },
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
      const { id, path } = await storeFS({ stream, suffix, folder });
      // Run python shell
      let options = {
        mode: "text",
        pythonPath: "python3",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath: "/home/musicAI/ml/test/code/",
        args: [
          "/home/musicAI/ml/test/code/1.abc",
          "/home/musicAI/ml/test/code/1.mp3"
        ]
      };
      let shell = new PythonShell("estimate.py", options);
      shell.on("message", function(message) {
        console.log(message);
        let score = message.split(" ");
        let AIIntonationScore = score[0];
        let AIBeatScore = score[1];
        let AITotalScore = (score[0] + score[1]) / 2;
        // Save record into userRecord
        let record = UserRecord.create({
          userId: userId,
          practiceId: practiceId,
          audioUrl: path,
          practiceTitle: practiceTitle,
          AIIntonationScore: AIIntonationScore,
          AIBeatScore: AIBeatScore,
          AITotalScore: AITotalScore
        });
        return record;
      });
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
