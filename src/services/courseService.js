/**
 * course数据服务
 */
import HttpHelper from '../js/commons/httpHelper'
import Config from '../js/config.js' 

export default class CourseService{
    // 服务器地址
    static serverUrl=Config.server_url;

    /**
     * 注册
     * @param {*参数} parmas 
     * @param {*可选参数：Vue根实例的$http} vrobj 
     */
    static Register(parmas,vrobj=null){
        let _url=`${this.serverUrl}/course/register`;
        return HttpHelper.Post(_url,parmas,vrobj);
    }

    /**
     * 登录
     * @param {*参数} parmas 
     * @param {*可选参数：Vue根实例的$http} vrobj 
     */
    static Login(parmas,vrobj=null){
        let _url=`${this.serverUrl}/course/login`;
        return HttpHelper.Post(_url,parmas,vrobj);
    }

     /**
     * 添加课程
     * @param {*参数} parmas 
     * @param {*可选参数：Vue根实例的$http} vrobj 
     */
    static AddCourses(parmas,vrobj=null){
        let _url=`${this.serverUrl}/course/addcourse`;
        return HttpHelper.Post(_url,parmas,vrobj);
    }

     /**
     * 获取课程
     * @param {*参数} parmas 
     * @param {*可选参数：Vue根实例的$http} vrobj 
     */
    static GetCourses(parmas,vrobj=null){
        let _url=`${this.serverUrl}/course/getcourses`;
        return HttpHelper.Post(_url,parmas,vrobj);
    }

    /**
     * 选课
     * @param {*参数} parmas 
     * @param {*可选参数：Vue根实例的$http} vrobj 
     */
    static Course(parmas,vrobj=null){
        let _url=`${this.serverUrl}/course/update`;
        return HttpHelper.Post(_url,parmas,vrobj);
    }
}