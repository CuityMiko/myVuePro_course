/**
 * 选课模块服务（myVuePro_Course项目使用）
 */
const request = mypro.core.request;
const User=mypro.models.User;
const Course=mypro.models.Course;

// 注册
var register = function (jsonObj) {
    return User.userRegister(jsonObj);
}

// 登录
var login = function (jsonObj) {
    return User.userLogin(jsonObj);
}

// 添加课程
var addCourse=(jsonObj,callback)=>{
    Course.add(jsonObj,callback);
}

// 添加课程
var getCourses=(callback)=>{
    Course.get(callback);
}

module.exports = { register,login,addCourse,getCourses };