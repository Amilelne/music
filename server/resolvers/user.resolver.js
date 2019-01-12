const { User, UserAuth } = require('../models');
const bcrypt = require('bcrypt');
const JWT = require('../utils/jwt.service');
const RoleGuard = require('../utils/role.guard');

const resolverMap = {
  Query: {
    users: async (obj, args, context, info) => {
      if (RoleGuard.canActivate(context, 'admin')) {
        return User.find();
      }
    }
  },
  Mutation: {
    addUser: async (obj, { data }, context, info) => {
      return User.create(data);
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
        throw new Error('邮箱或密码有误');
      }
      // check the password
      const valid = await bcrypt.compare(data.credential, userAuth.credential);
      if (!valid) {
        throw new Error('邮箱或密码有误');
      }
      // find user by userId in User
      const user = await User.findById(userAuth.userId);
      // return token
      const token = JWT.generateToken(user);
      return { token, user };
    }
  }
};

module.exports = resolverMap;
