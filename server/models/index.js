const { Comment } = require('./comment.model.js');
const { Course } = require('./course.model.js');
const { Exercise } = require('./exercise.model.js');
const { Test } = require('./test.model.js');
const { Tutorial } = require('./tutorial.model.js');
const { User } = require('./user.model.js');
const { UserAuth } = require('./userAuth.model.js');
const { UserCourse } = require('./userCourse.model.js');
const { UserExercise } = require('./userExercise.model.js');
const { UserRecord } = require('./userRecord.model.js');

module.exports = {
  Comment,
  Course,
  Exercise,
  Test,
  Tutorial,
  User,
  UserAuth,
  UserCourse,
  UserExercise,
  UserRecord
};
