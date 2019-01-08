const { User, UserAuth } = require('../models');

const resolverMap = {
  Query: {
    users: async (obj, args, context, info) => {
      return User.find();
    }
  },
  Mutation: {
    addUser: async (obj, { data }, context, info) => {
      return User.create(data);
    },
    register: async (obj, { data }, context, info) => {
      return User.create({ name: data.name }).then((user) => {
        UserAuth.create({
          userId: user._id,
          identifier: data.identifier,
          credential: data.credential
        });
        return user;
      });
    },
    login: async (obj, { data }, context, info) => {
      return UserAuth.findOne({
        identifier: data.identifier,
        credential: data.credential
      }).then((user) => {
        return User.findById(user.userId);
      });
    }
  }
};

module.exports = resolverMap;
