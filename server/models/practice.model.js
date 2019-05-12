const { conf } = require("../config");
const mongoose = require("../mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100
    },
    resourceUrl: {
      type: String,
      required: true,
      maxlength: 60
    },
    resourceType: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: false,
      maxlength: 1000
    },
    kind: {
      type: Number,
      required: false
    },
    level: {
      type: Number,
      required: false
    },
    abcUrl: {
      type: String,
      required: true
    },
    averageScore: {
      type: Number,
      required: false,
      default: 0
    },
    participants: {
      type: Number,
      required: false,
      default: 0
    },
    likes: {
      type: Number,
      required: false,
      default: 0
    }
  },
  {
    timestamps: { createdAt: "createDate", updatedAt: "updateDate" },
    versionKey: false
  }
);

const name = conf("collections.practice");
exports.Practice = mongoose.model(name, schema, name);
