const { conf } = require('../config');
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    identityType: {
      type: Number,
      required: true,
      default: 0
    },
    identifier: {
      type: String,
      required: true
    },
    credential: {
      type: String,
      required: false
    }
  },
  {
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
    versionKey: false
  }
);

const name = conf('collections.userAuth');
exports.UserAuth = mongoose.model(name, schema, name);
