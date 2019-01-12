const { User, UserAuth } = require('../models');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { conf } = require('../config');
const { ForbiddenError, AuthenticationError } = require('apollo-server');
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
      // return jwt
      return jsonwebtoken.sign(
        {
          id: user._id,
          role: user.role,
          level: user.level
        },
        conf('security.jwt_secret'),
        { expiresIn: '2h' }
      );
    },
    login: async (obj, { data }, context, info) => {
      // find userAuth by credentitial in UserAuth
      const userAuth = await UserAuth.findOne({
        identifier: data.identifier
      });
      if (!userAuth) {
        throw new Error('Invalid username or password');
      }
      // check the password
      const valid = await bcrypt.compare(data.credential, userAuth.credential);
      if (!valid) {
        throw new Error('Invalid username or password');
      }
      // find user by userId in User
      const user = await User.findById(userAuth.userId);
      // return jwt
      return jsonwebtoken.sign(
        {
          id: user._id,
          role: user.role,
          level: user.level
        },
        conf('security.jwt_secret'),
        { expiresIn: '2h' }
      );
    }
  }
};

module.exports = resolverMap;
