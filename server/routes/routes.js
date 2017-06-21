'use strict';
/**
 * 全局路由注册
 */
module.exports = function (app) {
    require('./indexRoutes')(app);
    // 电影路由
    require('./movieRoutes')(app);
    // example
    require('./exampleRoutes')(app);
    // course选课
    require('./courseRoutes')(app);
};
