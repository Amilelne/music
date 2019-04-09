const { Course, Tutorial } = require("../models");
const storeFS = require("../utils/storeFile");

const resolveMap = {
  Query: {
    courses: async (obj, args, context, info) => {
      return Course.find().populateFields(info);
    },
    course: async (obj, { id }, context, info) => {
      return Course.findById(id).populateFields(info);
    },
    courseNumberByKind: async (obj, args, context, info) => {
      let kind0 = await Course.countDocuments({ kind: 0 });
      let kind1 = await Course.countDocuments({ kind: 1 });
      let kind2 = await Course.countDocuments({ kind: 2 });
      return [kind0, kind1, kind2];
    }
  },
  Mutation: {
    addCourse: async (obj, { data }, context, info) => {
      let tutorials = [];
      if (data.tutorials !== undefined) {
        tutorials = await Promise.all(
          data.tutorials.map(async tutorial => {
            let newTutorial = await Tutorial.create(tutorial);
            return newTutorial._id;
          })
        );
      }
      Object.assign(data, { tutorials: tutorials });
      let course = await Course.create(data);
      return course;
    },
    deleteCourse: async (obj, { id }, context, info) => {
      let course = await Course.findByIdAndValidate(id, info);
      await course.remove();
      return course;
    },
    singleUpload: async (obj, { file }, context, info) => {
      const { createReadStream, filename, mimetype } = await file;
      let suffix = filename.split(".").slice(-1)[0];
      if (suffix === "blob") {
        suffix = "wav";
      }
      const stream = createReadStream();
      const folder = "tutorials";
      const { id, path } = await storeFS({ stream, suffix, folder });
      return { filename: path, mimetype: mimetype, encoding: "utf-8" };
    }
  }
};

module.exports = resolveMap;
