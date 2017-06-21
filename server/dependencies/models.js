//models依赖
module.exports = function (models) {
    models.Student = require('../models/StudentModel');
    // User Model
    models.User = require('../models/UserModel');
    // User Model
    models.Course = require('../models/CourseModel');
}