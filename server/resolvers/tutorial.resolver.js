const { Tutorial } = require('../models');

const resolveMap = {
  Query: {
    tutorials: async (obj, args, context, info) => {
      return Tutorial.find();
    }
  },
  Mutation: {
    addTutorial: async (obj, { data }, context, info) => {
      let tutorial = await Tutorial.create(data);
      return tutorial;
    },
    deleteTutorial: async (obj, { id }, context, info) => {
      let tutorial = await Tutorial.findByIdAndValidate(id, info);
      tutorial.remove();
      return tutorial;
    }
  }
};

module.exports = resolveMap;
