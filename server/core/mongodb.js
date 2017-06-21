/**
 * mongodb数据库连接
 */
// const mongoose=mypro.modules.mongoose;
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;

// 配置文件
const config = mypro.config;

// 创建数据库连接
const db = mongoose.createConnection(config.mongodbUrl);

// 链接错误
db.on('error',(err)=>{
    console.log(`mongodb数据库连接失败！错误提示：${err}`);
});

// 连接成功
db.once('open', ()=>{
    console.log('mongodb数据库连接成功！')
});

module.exports={ mongoose,db }

