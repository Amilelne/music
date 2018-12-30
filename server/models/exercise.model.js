const { conf } = require('../config');
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100
    },
    type: {
      type: String,
      required: true,
      maxlength: 50
    },
    resourceUrl: {
      type: String,
      required: false,
      maxlength: 60
    },
    resourceType: {
      type: Number,
      required: false
    },
    choices: {
      type: [String],
      required: false,
      maxlength: 1000
    },
    rightAnswer: {
      type: [String],
      required: false
    },
    answerAnalyse: {
      type: String,
      required: false,
      maxlength: 1000
    },
    description: {
      type: String,
      required: false,
      maxlength: 1000
    },
    level: {
      type: Number,
      required: false
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
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
    versionKey: false
  }
);

const name = conf('collections.exercise');
exports.Exercise = mongoose.model(name, schema, name);
