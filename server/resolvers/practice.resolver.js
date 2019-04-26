const { Practice } = require("../models");
let { PythonShell } = require("python-shell");
const spawn = require("child_process").spawn;

const resolveMap = {
  Query: {
    practice: async (obj, { id }, context, info) => {
      return Practice.findById(id);
    },
    practices: async (
      obj,
      { pageIndex, pageSize, kind, level },
      context,
      info
    ) => {
      const cursor = Practice.find();
      if (kind) {
        cursor.where("kind", kind);
      }
      if (level) {
        cursor.where("level", level);
      }
      cursor.skip((pageIndex - 1) * pageSize).limit(pageSize);
      return cursor;
    },
    practicesCount: async (obj, { kind, level }, context, info) => {
      const countCursor = Practice.find();
      if (kind) {
        countCursor.where("kind").in(kind);
      }
      if (level) {
        countCursor.where("level", level);
      }
      return countCursor.countDocuments();
    },
    recommendPractices: async (obj, { id }, context, info) => {
      // const cursor = Practice.find({}, { title: 1, _id: 0 });
      const cursor = Practice.find();
      let titles = await cursor.select({ title: 1, _id: 0 });
      titles = titles.map(x => x.title);

      let options = {
        mode: "text",
        pythonPath: "python3",
        pythonOptions: ["-u"], // get print results in real-time
        scriptPath:
          "/Users/amelie/Documents/graduationDesign/music-ai/server/mlscripts",
        args: [titles]
      };

      PythonShell.run("kmeans.py", options, function(err, result) {
        if (err) throw err;
        console.log(result);
      });

      return cursor;
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
