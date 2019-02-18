const { conf } = require('../config');
const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const default_avatar  = "http://"+conf('server.host')+":"+conf('server.port')+'/avatars/default.png';
const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 30
    },
    role: {
      type: String,
      required: true,
      default: 'user'
    },
    level: {
      type: Number,
      required: true,
      default: 1
    },
    introduction: {
      type: String,
      required: false,
      maxlength: 300
    },
    avatar: {
      type: String,
      required: false,
      default: default_avatar
    }
  },
  {
    timestamps: { createdAt: 'createDate', updatedAt: 'updateDate' },
    versionKey: false
  }
);

const name = conf('collections.user');
exports.User = mongoose.model(name, schema, name);
