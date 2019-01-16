const { conf } = require('../config');
const mongoose = require('../mongoose');
const { Tutorial } = require('./index');
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
    tutorials: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Tutorial'
      }
    ],
    price: {
      type: Schema.Types.Decimal128
    }
  },
  {
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
    versionKey: false
  }
);

const name = conf('collections.course');
exports.Course = mongoose.model(name, schema, name);
