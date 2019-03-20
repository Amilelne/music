const { Notice } = require("../models");

const resolveMap = {
  Query: {
    notice: async (obj, { id }, context, info) => {
      return Notice.findById(id);
    },
    noticesToUser: async (obj, { userId }, context, info) => {
      return Notice.find({ userId: userId });
    },
    noticesToGroup: async (obj, { userRole }, context, info) => {
      return Notice.find({ userRole: userRole });
    },
    noticesSend: async (obj, { sendId }, context, info) => {
      return Notice.find({ sendId: sendId });
    }
  },
  Mutation: {
    sendNotice: async (obj, { data }, context, info) => {
      let notice = await Notice.create(data);
      return notice;
    }
  }
};

module.exports = resolveMap;
