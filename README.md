### Vue项目基本骨架
+ src : 项目程序目录
+ src/bower_components : bower管理的web前端libs
+ src/components : 组件
+ src/containers : Vue容器文件目录
+ src/examples : 测试文件目录
+ src/examples : 测试文件目录
+ src/js/app.js : 项目入口文件
+ src/js/config.js : 项目全局配置文件
+ src/js/routes.js : 项目路由配置文件
+ src/js/commons : 自定义公共模块
+ src/js/commons/util.js : 项目工具类
+ src/js/commons/localsession.js : SessionStorage和localStorage的使用
+ src/js/commons/httpHelper.js : 跨域请求获取数据的封装帮助类
+ src/services : 项目服务目录
+ src/filters : 过滤器（用户全局钩子和局部页面的钩子上）
+ src/pages : 前端页面
+ src/index.html : 项目入口页面
+ src/template.html : webpack生产环境自动生成到dist目录的项目入口页面模板
+ .babelrc : babel配置文件
+ .bowerrc : 指定bower install的组件存放位置
+ .eslintignore : 配置eslint语法规范监测忽略的文件目录
+ .eslintrc.js : 定义eslint语法规范规则
+ .gitignore : 定义git上传忽略的文件目录
+ bower.json : bower配置文件
+ ESLint.md : eslint笔记
+ gulpfile.js : gulp配置文件
+ package.json : npm配置文件
+ typings.json : 智能提示配置文件
+ webpack.develop.config.js : webpack开发时配置文件
+ webpack.publish.config.js : webpack发布生产时配置文件
+ server : node服务器端
+ 运行:
```
npm install
npm run develop

// 打包
npm run publish
```
### 将md文件生成html页面
+ 运行 i5ting_toc -f README.md 命令
+ 在生成的preview目录中运行http服务器查看md文件生成的html页面
+ hs -o -p8020



