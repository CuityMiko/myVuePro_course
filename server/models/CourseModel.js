/**
 * Course数据模型操作
 */
// const mongodb=mypro.core.mongodb;
const mongodb=require('../core/mongodb')

// 定义Course Schema结构
let courseSchema=new mongodb.mongoose.Schema({
    name:{type:String}
})

/**
 * 添加
 */
courseSchema.statics.add=(courses,callback)=>{
    let _courseModel=mongodb.db.model('Course');
    _courseModel.remove({},(err,res)=>{
        for(var i=0;i<courses.length;i++){
            _courseModel.create({name:courses[i]}).then((res)=>{}).catch((err)=>{})
        }
        callback()
    })
}

// 获取课程
courseSchema.statics.get=(callback)=>{
    let _courseModel=mongodb.db.model('Course');
    _courseModel.find({},(err,res)=>{
        callback(err,res);
    })
}

// 定义模型并指定Schema
let CourseModel = mongodb.db.model('Course', courseSchema);

module.exports=CourseModel;