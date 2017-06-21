import AppContainer from '../containers/AppContainer.vue'
// 实现页面加载的时候异步加载文件
// 首页
const HomeContainer = r => require.ensure([], () => r(require('../containers/HomeContainer.vue')), 'home')
// 选课
const CourseContainer = r => require.ensure([], () => r(require('../containers/CourseContainer.vue')), 'course')
// 课程管理
const CourseMagContainer = r => require.ensure([], () => r(require('../containers/CourseMagContainer.vue')), 'coursemag')
// 登录
const LoginContainer = r => require.ensure([], () => r(require('../containers/LoginContainer.vue')), 'login')
// 注册
const RegisterContainer = r => require.ensure([], () => r(require('../containers/RegisterContainer.vue')), 'register')
// 404
const NoFindContainer = r => require.ensure([], () => r(require('../containers/NoFindContainer.vue')), '404')

export default[
    {
        path:'/home',
        component:HomeContainer,
        beforeEnter: (to, from, next) => { // 单个路由的导航钩子
            next();
        }
    },
    {path:'/course',component:CourseContainer}, // 选课
    {path:'/coursemag',component:CourseMagContainer}, // 课程管理
    {path:'/login',component:LoginContainer}, // 登录
    {path:'/register',component:RegisterContainer}, // 注册
    {path:'/',redirect:'/home'}, // 如果路由为/的时候跳转到/home路由
    {path:'*',component:NoFindContainer} // 此配置要放在最下面，如果没有匹配到路由则404
]