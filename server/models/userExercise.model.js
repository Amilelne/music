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
    userAnswer: {
      type: [String],
      required: false
    }
  },
  {
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
    versionKey: false
  }
);

const name = conf('collections.userExercise');
exports.UserExercise = mongoose.model(name, schema, name);
