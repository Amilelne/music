const { conf } = require('../config');
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    courseId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    progress: {
      type: [Number],
      required: false,
      default: []
    }
  },
  {
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
    versionKey: false
  }
);

const name = conf('collections.userCourse');
exports.UserCourse = mongoose.model(name, schema, name);
