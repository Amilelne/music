const { conf } = require("../config");
const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    sendId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: false
    },
    userRole: {
      type: String,
      required: false
    },
    practiceId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    audioId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    read: {
      type: Boolean,
      required: true,
      default: false
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: { createdAt: "createDate", updatedAt: "updateDate" },
    versionKey: false
  }
);

const name = conf("collections.notice");
exports.Notice = mongoose.model(name, schema, name);
