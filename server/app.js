'use strict';
const express = require('express');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs= require('ejs');
const redisStore = require('connect-redis')(session);
const flash = require('connect-flash');
const json2xls = require('json2xls'); //json转成Excel
var expressLayouts = require('express-ejs-layouts'); //layout for html 
require('promise.prototype.finally').shim(); // promise方式加入finally方法

const app = express();

//初始化全局对象依赖 
require('./dependency').init(); 

//配置
var config = mypro.config;

//设置view模板
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(expressLayouts);
//指定全局的模板页面
app.set('layout', '_share/root')

//config session 
//使用redis存储session
// app.use(session({
//   store: new redisStore({
//     host: config.sessionRedisHost,
//     port: config.sessionRedisPort,
//     db: config.sessionRedisDb
//   }),
//   secret: config.sessionSecret,
//   resave: false,
//   saveUninitialized: true
// }));

//启用本地session缓存
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true 
}))

//中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(json2xls.middleware); //json转成Excel

// 静态化ico
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//静态化资源
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(flash());

// 允许访问api的时候cors跨域（允许同域名不同端口号之间的跨域）
// 当工程作为API接口对外提供时，实现允许跨域访问
app.use((req,res,next)=>{
    // 增加了cors跨域的请求头
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
})

//过滤器
//全局身份验证
// var authorizeFilter = mypro.filters.authorize;
// app.use(function (req, res, next) {
//     authorizeFilter.isAuthentication(req, res,next);
// });

//路由
require('./routes/routes')(app);

// 打包的静态文件默认访问
// 此处用于React Web打包后的项目访问方式
// React router的history模式一般为browserhistory，但是此种方式的URL不能在浏览器中赋值
// 解决方式就是将React项目打包文件作为服务器资源渲染，即放在public目录下进行访问
// 如果不是React项目则注释以下代码
// 值得一提的是，Vue项目没有如上问题，则不需要以下代码
// app.get('*', function (req, res){
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })

// 404 handler
app.use(function (req, res, next) {
  res.status(404).render('error/404',{'title':'404页面'});
});

// 500 handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/500', {
      message: err.message,
      title:'500页面'
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error/500', {
    message: err.message,
    title:'500页面'
  });
});

module.exports = app;
