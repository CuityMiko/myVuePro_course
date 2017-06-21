/**
 * 身份验证：
 * 1、登录验证
 * 2、权限验证
 */
import localsession from '../js/commons/localsession.js'
export default class Authentication{
    constructor(){
        this.user={
            name:'zhangsan'
        }
    }
    /**
     * 验证登录
     */
    VerificationLogin(to, from, next){
        if(to.path!="/login" && to.path!="/register"){
            let _user=localsession.sessionGet('user');
            if(_user)
                next();
            else
                next({ path: '/login' });
        }else{
            next();
        }
    }
}