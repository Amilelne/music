const { conf } = require("../config");
const mongoose = require("../mongoose");
const { Tutorial } = require("./index");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100
    },
    description: {
      type: String,
      required: false,
      maxlength: 1000
    },
    kind: {
      type: [Number],
      required: true
    },
    level: {
      type: Number,
      required: true,
      default: 1
    },
    pictureUrl: {
      type: String,
      required: false
    },
    tutorials: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "Tutorial"
      }
    ],
    price: {
      type: Schema.Types.Decimal128
    },
    createId: {
      type: Schema.Types.ObjectId,
      required: false
    }
  },
  {
    timestamps: { createdAt: "createDate", updatedAt: "updateDate" },
    versionKey: false
  }
);

const name = conf("collections.course");
exports.Course = mongoose.model(name, schema, name);
