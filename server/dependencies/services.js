/**
 * services依赖
 */
module.exports = function (services) {
    services.movie = require('../services/movieServices');

    // course选课服务
    services.course = require('../services/courseServices');
}