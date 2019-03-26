const { Notice } = require("../models");

const resolveMap = {
  Query: {
    notice: async (obj, { id }, context, info) => {
      return Notice.findById(id);
    },
    noticesToUser: async (obj, { userId }, context, info) => {
      return Notice.find({ userId: userId });
    },
    unreadNoticesToUser: async (obj, { userId }, context, info) => {
      return Notice.find({ userId: userId, read: false });
    },
    noticesToGroup: async (obj, { userRole }, context, info) => {
      return Notice.find({ userRole: userRole });
    },
    unreadNoticesToGroup: async (obj, { userRole }, context, info) => {
      return Notice.find({ userRole: userRole, read: false });
    },
    noticesSend: async (obj, { sendId }, context, info) => {
      return Notice.find({ sendId: sendId });
    }
  },
  Mutation: {
    sendNotice: async (obj, { data }, context, info) => {
      let notice = await Notice.create(data);
      return notice;
    },
    readNotice: async (obj, { id }, context, info) => {
      return Notice.updateOne({ _id: id }, { read: true }, function(
        err,
        rawResult
      ) {
        if (err) return false;
        return true;
      });
    },
    deleteNotice: async (obj, { id }, context, info) => {
      return Notice.deleteOne({ _id: id }, function(err, result) {
        if (err) return false;
        return true;
      });
    }
  }
};

module.exports = resolveMap;
