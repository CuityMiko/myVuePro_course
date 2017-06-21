/**
 * 选课控制器（myVuePro_Course项目使用）
 */
'use strict';
// 服务
const courseServices = mypro.services.course;

// 登录
var login=(req, res, next)=>{
    courseServices.login(req.body).then((result)=>{
        res.json({result:true,msg:"登录成功",data:result[0]});
    },(err)=>{
        res.json({result:false,msg:"用户名或密码错误！"});
    }).catch((err)=>{
        res.json({result:false,msg:"登录失败"});
    })
}

// 重构用户信息
var restructureUserinfo=(userobj)=>{
    let user=userobj;
    user.isadmin=user.username=='admin'?true:false; // 追加 isadmin属性
    user.age=parseInt(user.age); // 设置age为int类型
    user.courses=[]; // 设置选课为空
    delete user.repwd // 删除 repwd属性
    return user;
}

// 注册
var register=function(req, res, next){
    // 重构用户信息
    let user=restructureUserinfo(req.body);
    courseServices.register(user).then((result)=>{
        res.json(result);
    },(err)=>{
        res.json({result:false,msg:"注册失败"});
    }).catch((err)=>{
        res.json({result:false,msg:"注册失败"});
    })
}

// 添加课程
var addcourse=(req, res, next)=>{
    let _courses=req.body.courses.split(',');
    courseServices.addCourse(_courses,()=>{
        res.json({result:true,msg:"课程添加成功"});
    })
}

// 获取课程
var getcourses=(req, res, next)=>{
    courseServices.getCourses((err,data)=>{
        res.json({result:true,msg:"获取成功",data:data});
    })
}
module.exports = { login,register,addcourse,getcourses }