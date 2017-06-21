### 1.使用并安装淘宝npm镜像：
+ npm install -g cnpm --registry=https://registry.npm.taobao.org

### 2.使用node-dev
+ cnpm install node-dev -g

### 3.安装node_modules
+ cnpm intstall 
+ 如果安装过程中出现error则反复安装几次即可

### 4.修改当前项目下的node-dev.bat文件，项目路径改为自己项目的路径

### 5.双击启动项目根目录下的node-dev.bat文件

### 6.git clone指定分支:git clone -b 分支name github_url --depth 1

### 目录结构
+ public : 目录是前端静态文件包含前端页面js文件
+ routes : 路由配置目录
+ routes/routes.js : 全局路由依赖，项目中所有的路由文件需要在该文件中注册一下才可以使用
+ dependencies : 全局依赖目录，对应模块创建的文件都需要在该目录下注册一下才能使用
+ dependency.js : 全局依赖文件，dependencies目录下文件的注册
+ controllers : 控制器目录
+ services : 服务接口目录
+ core : 公共模块目录
+ config : 配置文件目录
+ views : 前台页面文件存放目录
+ app.js : 工程入口文件

### 引入mongoose操作mongodb 2017-06-19
```javascript
 cnpm install mongoose --save
```

### Node_Pro 工程是对Node项目引入新东西的练习与拓展，将完善封装后的东西同步到myNodePro工程中去

### 引入socket.io 2017-06-20
```javascript
cnpm install socket.io --save
```



