// 项目入口文件
import Vue from 'vue'

import AppContainer from '../containers/AppContainer.vue'

// 身份验证
import Authentication from '../filters/Authentication.js'

// Vue-router
import VueRouter from 'vue-router'
Vue.use(VueRouter)  // 在Vue中注册VueRouter

import routes from './routes.js' // 引入路由配置文件
const router=new VueRouter({
    // mode: 'history', // 根据HTML5 History API方式将#锚点的方式变成url的方式
    routes // 将路由配置文件配置在VueRouter中，相当于routes:routes的缩写
})

// 引入Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

// 跨域方式请求数据：vue-resource方式
import vueResource from 'vue-resource'
Vue.use(vueResource);

const app =new Vue({
    data:{
        bus:new Vue() // 用过声明一个空的Vue实例作为中央事件总线，从而事件兄弟组件之间的通信
    },
    router, // 将配置后的VueRouter挂载到Vue根实例上，相当于router:router的缩写
    render:h=>h(AppContainer)
}).$mount("#app")

// 全局路由的导航钩子 一般用来做用户身份验证、权限验证以及日志记录使用
router.beforeEach((to, from, next) => {
    const _authentication=new Authentication();
    _authentication.VerificationLogin(to, from, next);
    // console.log(to); // 导航进入的路由
    // console.log(from); // 导航从哪个路由进入的
    // next();
    // next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航
})
