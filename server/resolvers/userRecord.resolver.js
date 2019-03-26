const { UserRecord } = require("../models");
const storeFS = require("../utils/storeFile");

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
      // Save record into userRecord
      let record = await UserRecord.create({
        userId: userId,
        practiceId: practiceId,
        audioUrl: path,
        practiceTitle: practiceTitle
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