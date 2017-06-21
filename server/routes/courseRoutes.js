/**
 * 选课路由（myVuePro_Course项目使用）
 */
'use strict';
var courseController = mypro.controllers.course;

module.exports = function (app) {
    // 登录
    app.post('/course/login',courseController.login); 
    // 注册
    app.post('/course/register',courseController.register);
    // 添加课程
    app.post('/course/addcourse',courseController.addcourse);
    // 获取课程
    app.post('/course/getcourses',courseController.getcourses);
}
