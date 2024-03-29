const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([Course.find({}), Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => {
        res.render("me/stored-courses", {
          courses: mutipleMongooseToObject(courses),
          deletedCount,
        });
      })
      .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Promise.all([Course.findDeleted({}), Course.countDocuments()])
      .then(([courses, coursesCount]) =>
        res.render("me/trash-courses", {
          courses: mutipleMongooseToObject(courses),
          coursesCount
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
