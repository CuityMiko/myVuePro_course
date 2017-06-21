/**
 * SessionStorage和localStorage的使用
 */
export default{
    sessionSet(key,val){
        window.sessionStorage.setItem(key,JSON.stringify(val));
    },
    sessionGet(key){
        return JSON.parse(window.sessionStorage.getItem(key));
    },
    sessionDel(key){
        window.sessionStorage.removeItem(key);
    },
    localSet(key,val){
        window.localStorage.setItem(key,JSON.stringify(val));
    },
    localGet(key){
        return JSON.parse(window.localStorage.getItem(key));
    },
    localDel(key){
        window.localStorage.removeItem(key);
    }
}