const { DateTime, URL } = require('@okgrow/graphql-scalars');
const { merge } = require('lodash');
const UserResolverMap = require('./user.resolver');

const resolverMap = {
  DateTime,
  URL,
  Query: {
    appName: async (obj, args, context, info) => {
      return 'This is music-ai ';
    }
  }
};

exports.resolvers = merge(resolverMap, UserResolverMap);
