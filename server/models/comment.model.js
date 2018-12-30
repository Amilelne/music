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
    comment: {
      type: [String],
      required: false,
      default: []
    }
  },
  {
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
    versionKey: false
  }
);

const name = conf('collections.comment');
exports.Comment = mongoose.model(name, schema, name);
