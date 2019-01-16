const { Course, Tutorial } = require('../models');

const resolveMap = {
  Query: {
    courses: async (obj, args, context, info) => {
      return Course.find().populateFields(info);
    }
  },
  Mutation: {
    addCourse: async (obj, { data }, context, info) => {
      let tutorials = await Promise.all(
        data.tutorials.map(async (tutorial) => {
          let newTutorial = await Tutorial.create(tutorial);
          return newTutorial._id;
        })
      );
      let course = await Course.create({
        title: data.title,
        description: data.description,
        level: data.level,
        price: data.price,
        tutorials: tutorials
      });
      return course;
    },
    deleteCourse: async (obj, { id }, context, info) => {
      let course = await Course.findByIdAndValidate(id, info);
      await course.remove();
      return course;
    }
  }
};

module.exports = resolveMap;
