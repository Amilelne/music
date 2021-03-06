const { DateTime, URL } = require("@okgrow/graphql-scalars");
const { merge } = require("lodash");
const UserResolverMap = require("./user.resolver");
const CourseResolverMap = require("./course.resolver");
const TutorialResolverMap = require("./tutorial.resolver");
const PracticeResolverMap = require("./practice.resolver");
const UserRecordResolverMap = require("./userRecord.resolver");
const NoticeResolverMap = require("./notice.resolver");

const resolverMap = {
  DateTime,
  URL,
  Query: {
    appName: async (obj, args, context, info) => {
      if (!context.user) return "No user";
      return context.user;
    }
  }
};

exports.resolvers = merge(
  resolverMap,
  UserResolverMap,
  CourseResolverMap,
  TutorialResolverMap,
  PracticeResolverMap,
  UserRecordResolverMap,
  NoticeResolverMap
);
