const { User } = require('../models');

const resolverMap = {
  Query: {
    users: async (obj, args, context, info) => {
      return User.find();
    }
  },
  Mutation: {
    addUser: async (obj, { data }, context, info) => {
      return User.create(data);
    }
  }
};

module.exports = resolverMap;
