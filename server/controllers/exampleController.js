'use strict';
/**
 * mongoose练习
 */
// const Student=mypro.models.Student.StudentModel;
const Student=require('../models/StudentModel');

var mongoosetest=function(req,res,next){
    let _student={
        username:'lisi',
        sex:'男'
    }
    // 第一种添加数据的方式（基于实体Entity的方式）
    //let stumodel=new Student(_student);
    // 保存
    //let promise=stumodel.save();

    // 第二种添加数据的方式（基于model的方式）
    let promise=Student.create(_student);
    promise.then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    }).finally(()=>{
        res.render('examples/mongoose',{
            model:{
            }
        });
    })

    // 删除
    // Student.delete({username:'zhangsan'}).then((res)=>{
    //     console.log(res)
    // }).catch((err)=>{
    //     console.log(`删除失败！${err}`);
    // }).finally(()=>{
    //     res.render('examples/mongoose',{
    //         model:{
    //         }
    //     });
    // })

    // 修改
    // Student.modify({username:'lisi'},{age:30,sex:'女'}).then((res)=>{
    //     console.log(res)
    // }).catch((err)=>{
    //     console.log(err)
    // }).finally(()=>{
    //     res.render('examples/mongoose',{
    //         model:{
    //         }
    //     });
    // })

    // 查
    // Student.findByName('lisi').then((res)=>{
    //     console.log(res)
    // }).catch((err)=>{
    //     console.log(err)
    // }).finally(()=>{
    //     res.render('examples/mongoose',{
    //         model:{
    //         }
    //     });
    // })
}

/**
 * socket.io 练习
 */
var socketio=(req,res,next)=>{
    res.render('examples/socketio',{model:{
        name:req.query.name
    }})
}

module.exports = {mongoosetest,socketio}
