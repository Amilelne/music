const { Practice } = require('../models');

const resolveMap = {
  Query: {
    practice: async (obj, { id }, context, info) => {
      return Practice.findById(id);
    },
    practices: async (obj, args, context, info) => {
      return Practice.find();
    }
  },
  Mutation: {
    addPractice: async (obj, { data }, context, info) => {
      let practice = await Practice.create(data);
      return practice;
    },
    deletePractice: async (obj, { id }, context, info) => {
      let practice = await Practice.findByIdAndValidate(id, info);
      practice.remove();
      return practice;
    }
  }
};

module.exports = resolveMap;
