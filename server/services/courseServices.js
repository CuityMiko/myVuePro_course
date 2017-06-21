/**
 * 选课模块服务（myVuePro_Course项目使用）
 */
const request = mypro.core.request;
const User=mypro.models.User;

// 注册
var register = function (jsonObj) {
    return User.userRegister(jsonObj);
}

// 登录
var login = function (jsonObj) {
    return User.userLogin(jsonObj);
}

module.exports = { register,login };