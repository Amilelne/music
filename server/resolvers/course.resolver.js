const { Course, Tutorial } = require("../models");
const storeFS = require("../utils/storeFile");

const resolveMap = {
  Query: {
    courses: async (obj, { pageIndex, pageSize, kind }, context, info) => {
      const cursor = Course.find().populateFields(info);
      if (kind) {
        cursor.where("kind").in(kind);
      }
      cursor.skip((pageIndex - 1) * pageSize).limit(pageSize);
      return cursor;
    },
    course: async (obj, { id }, context, info) => {
      return Course.findById(id).populateFields(info);
    },
    coursesCount: async (obj, { kind }, context, info) => {
      const countCursor = Course.find();
      if (kind) {
        countCursor.where("kind").in(kind);
      }
      return countCursor.countDocuments();
    },
    courseNumberByKind: async (obj, args, context, info) => {
      let kind1 = await Course.countDocuments({ kind: 1 });
      let kind2 = await Course.countDocuments({ kind: 2 });
      let kind3 = await Course.countDocuments({ kind: 3 });
      return [kind1, kind2, kind3];
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
