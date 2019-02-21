const { User, UserAuth } = require("../models");
const bcrypt = require("bcrypt");
const JWT = require("../utils/jwt.service");
const RoleGuard = require("../utils/role.guard");
const storeFS = require("../utils/storeFile");

const resolverMap = {
  Query: {
    me: async (obj, args, context, info) => {
      return User.findByIdAndValidate(context.user.id, info);
    },
    user: async (obj, { id }, context, info) => {
      if (RoleGuard.canActivate(context, "admin")) {
        return User.findByIdAndValidate(id, info);
      }
    },
    users: async (obj, args, context, info) => {
      if (RoleGuard.canActivate(context, "admin")) {
        return User.find();
      }
    },
    experts: async (obj, args, context, info) => {
      return User.find({ role: "expert" });
    },
    expert: async (obj, { id }, context, info) => {
      return User.find({ role: "expert" }, { _id: id });
    }
  },
  Mutation: {
    addUser: async (obj, { data }, context, info) => {
      return User.create(data);
    },
    deleteUser: async (obj, { id }, context, info) => {
      return User.remove({ _id: id });
    },
    register: async (obj, { data }, context, info) => {
      // create new user by username
      let user = await User.create({ name: data.name });
      // create new userAuth
      let userAuth = await UserAuth.create({
        userId: user._id,
        identifier: data.identifier,
        credential: await bcrypt.hash(data.credential, 10)
      });
      // return token
      const token = JWT.generateToken(user);
      return { token, user };
    },
    login: async (obj, { data }, context, info) => {
      // find userAuth by credentitial in UserAuth
      const userAuth = await UserAuth.findOne({
        identifier: data.identifier
      });
      if (!userAuth) {
        throw new Error("邮箱或密码有误");
      }
      // check the password
      const valid = await bcrypt.compare(data.credential, userAuth.credential);
      if (!valid) {
        throw new Error("邮箱或密码有误");
      }
      // find user by userId in User
      const user = await User.findById(userAuth.userId);
      // return token
      const token = JWT.generateToken(user);
      return { token, user };
    },
    updateAvatar: async (obj, { userId, file }, context, info) => {
      const { createReadStream, filename, mimetype } = await file;
      let suffix = filename.split(".").slice(-1)[0];
      const stream = createReadStream();
      const folder = "avatars";
      const { id, path } = await storeFS({ stream, suffix, folder });
      await User.updateOne({ _id: userId }, { avatar: path });
      const user = await User.findById({ _id: userId });
      return user;
    }
  }
};

module.exports = resolverMap;
