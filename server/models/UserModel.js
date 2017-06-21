/**
 * User数据模型操作
 */
// const mongodb=mypro.core.mongodb;
const mongodb=require('../core/mongodb')

// 定义User Schema结构
let userSchema=new mongodb.mongoose.Schema({
    username:{type:String},
    pwd:{type:String},
    age:{type:Number},
    isadmin:{type:Boolean},
    courses:{type:Array}
})

/**
 * 根据姓名查询
 */
var findByName=(username)=>{
    let _userModel=mongodb.db.model('User');
    return new Promise((resolve,reject)=>{
        _userModel.findOne({username:username},(err,res)=>{
            if(err!=null)
                reject(err);
            else
                resolve(res);
        })
    })
}

/**
 * 用户登录
 */
userSchema.statics.userLogin=(user)=>{
    let _userModel=mongodb.db.model('User');
    return new Promise((resolve,reject)=>{
        _userModel.find(user,(err,res)=>{
            if(err!=null)
                reject(err);
            else{
                if(res && res.length>0)
                    resolve(res);
                else
                    reject(err);
            }
        })
    })
}

/**
 * 注册
 */
userSchema.statics.userRegister=(user)=>{
    let _userModel=mongodb.db.model('User');
    return new Promise((resolve,reject)=>{
        findByName(user.username).then((res)=>{
            if(res)
                resolve({result:false,msg:'该用户已经存在!'})
            else{
                _userModel.create(user).then((res)=>{
                    resolve({result:true,msg:'注册成功!'})
                }).catch((err)=>{
                    reject(err)
                })
            }
        },(err)=>{
            reject(err);
        }).catch((err)=>{
            reject(err);
        })
    })
}

// 定义模型并指定Schema
let UserModel = mongodb.db.model('User', userSchema);

module.exports=UserModel;