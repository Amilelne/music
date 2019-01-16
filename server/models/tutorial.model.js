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
    resourceUrl: {
      type: String,
      required: false
    },
    resourceType: {
      type: Number,
      required: false
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000
    },
    level: {
      type: Number,
      required: true,
      default: 1
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

schema.pre('remove', async function() {
  const { Course } = require('./course.model');
  await Course.updateMany(
    { tutorials: this._id },
    { $pull: { tutorials: this._id } }
  );
});
const name = conf('collections.tutorial');
exports.Tutorial = mongoose.model(name, schema, name);
