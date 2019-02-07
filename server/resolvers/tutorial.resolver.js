const { Tutorial, Course } = require('../models');

const resolveMap = {
  Query: {
    tutorials: async (obj, args, context, info) => {
      return Tutorial.find();
    }
  },
  Mutation: {
    addTutorial: async (obj, { data, id }, context, info) => {
      let tutorial = await Tutorial.create(data);
      Course.updateOne(
        { _id: id },
        { $push: { tutorials: tutorial._id } },
        function(err, doc) {
          if (err) console.log(err);
        }
      );
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
