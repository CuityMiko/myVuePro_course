/**
 * Student数据模型操作
 */
// const mongodb=mypro.core.mongodb;
const mongodb=require('../core/mongodb')

// Student Schema 结构
let studentSchema = new mongodb.mongoose.Schema({
    username : {type : String},
    age      : {type : Number, default : 18},
    sex      : {type : String}
});

/**
 * 封装删除方法
 */
studentSchema.statics.delete=(conditions)=>{
    return new Promise((resolve,reject)=>{
        mongodb.db.model('Student').remove(conditions,(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        })
    })
}

/**
 * 封装修改方法
 * conditions:查询条件
 * updated:修改内容
 */
studentSchema.statics.modify=(conditions,updated,callback)=>{
    let _conditions = conditions;
    let _update = {$set : updated};
    let _options = {upsert : true};
    return new Promise((resolve,reject)=>{
        mongodb.db.model('Student').update(_conditions,_update,_options,(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        })
    })
}

/**
 * 按照姓名查找内容
 */
studentSchema.statics.findByName=(name)=>{
    return new Promise((resolve,reject)=>{
        mongodb.db.model('Student').find({username:name},(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        })
    })
}

// 定义模型并指定Schema
let StudentModel = mongodb.db.model('Student', studentSchema);

module.exports=StudentModel;