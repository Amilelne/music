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
    description: {
      type: String,
      required: false,
      maxlength: 1000
    },
    level: {
      type: Number,
      required: true,
      default: 1
    },
    practices: {
      type: [Schema.Types.ObjectId],
      required: false
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true,
      default: 0
    }
  },
  {
    timestamps: { createdAt: "createDate", updatedAt: "updateDate" },
    versionKey: false
  }
);

const name = conf("collections.test");
exports.Test = mongoose.model(name, schema, name);
