/**
 * controllers依赖
 */
module.exports = function (controllers) {
    //首页
    controllers.index = require('../controllers/indexController');
    //电影模块
    controllers.movie = require('../controllers/movieController');
    // example
    controllers.example = require('../controllers/exampleController');
    // Course选课
    controllers.course = require('../controllers/courseContorller');
}