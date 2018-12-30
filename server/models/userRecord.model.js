const { conf } = require('../config');
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    exerciseId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    audioUrl: {
      type: String,
      required: false
    },
    AIBeatScore: {
      type: Number,
      required: false
    },
    AIIntonationScore: {
      type: Number,
      required: false
    },
    AITotalScore: {
      type: Number,
      required: false
    },
    expertId: {
      type: Schema.Types.ObjectId,
      required: false
    },
    expertBeatScore: {
      type: Number,
      required: false
    },
    expertIntonationScore: {
      type: Number,
      required: false
    },
    expertTotalScore: {
      type: Number,
      required: false
    }
  },
  {
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
    versionKey: false
  }
);

const name = conf('collections.userRecord');
exports.UserRecord = mongoose.model(name, schema, name);
