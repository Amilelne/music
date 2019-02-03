const { Course, Tutorial } = require('../models');
const fs = require('fs');
const nanoid = require('nanoid');
const uploadDir = './server/uploads/';
const storeFS = ({ stream, suffix }) => {
  const id = nanoid(10);
  const path = `${id}.${suffix}`;
  return new Promise((resolve, reject) => {
    stream
      .on('error', (error) => {
        if (stream.truncated) {
          fs.unlinkSync(path);
        }
        reject(error);
      })
      .pipe(fs.createWriteStream(uploadDir + path))
      .on('error', (error) => reject(error))
      .on('finish', () => resolve({ id, path }));
  });
};

const resolveMap = {
  Query: {
    courses: async (obj, args, context, info) => {
      return Course.find().populateFields(info);
    },
    course: async (obj, { id }, context, info) => {
      return Course.findById(id).populateFields(info);
    }
  },
  Mutation: {
    addCourse: async (obj, { data }, context, info) => {
      let tutorials = [];
      if (data.tutorials !== undefined) {
        tutorials = await Promise.all(
          data.tutorials.map(async (tutorial) => {
            let newTutorial = await Tutorial.create(tutorial);
            return newTutorial._id;
          })
        );
      }
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
    },
    singleUpload: async (obj, { file }, context, info) => {
      const { createReadStream, filename, mimetype } = await file;
      let suffix = filename.split('.').slice(-1)[0];
      if (suffix === 'blob') {
        suffix = 'wav';
      }
      const stream = createReadStream();

      const { id, path } = await storeFS({ stream, suffix });
      return { filename: path, mimetype: mimetype, encoding: 'utf-8' };
    }
  }
};

module.exports = resolveMap;
