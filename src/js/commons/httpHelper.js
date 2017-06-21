/**
 * http请求封装类
 */
import fetchJsonp from 'fetch-jsonp'
import axios from 'axios'
import qs from 'querystring'
// 配置文件
import Config from '../config.js' 

export default class HttpHelper{
    //请求数据的方式 fetch、axios、vue-resource
    static fetchMode=Config.fetchmode;
    static that=new HttpHelper();

    /**
     * Get请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     * @param {*可选参数：Vue根实例的$http} vrobj 
     */
    static Get(url,params,vrobj=null){
        switch (this.fetchMode) {
            case "fetch":
                return this.that.fetchGet(url,params);
            case "axios":
                return this.that.axiosGet(url,params);
            case "vue-resource":
                if(vrobj!=null)
                    return this.that.vrGet(url,params,vrobj);
                else
                    return this.that.axiosGet(url,params);
            default:
                return this.that.axiosGet(url,params);
        }
    }

    /**
     * Post请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     * @param {*可选参数：Vue根实例的$http} vrobj 
     */
    static Post(url,params,vrobj=null){
        switch (this.fetchMode) {
            case "fetch":
                return this.that.fetchPost(url,params);
            case "axios":
                return this.that.axiosPost(url,params);
            case "vue-resource":
                if(vrobj!=null)
                    return this.that.vrPost(url,params,vrobj);
                else
                    return this.that.axiosPost(url,params);
            default:
                return this.that.axiosPost(url,params);
        }
    }

    /**
     * Jsonp请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     * @param {*可选参数：Vue根实例的$http} vrobj 
     */
    static Jsonp(url,params,vrobj=null){
        switch (this.fetchMode) {
            case "fetch":
            case "axios":
                return this.that.commonJsonp(url,params);
            case "vue-resource":
                if(vrobj!=null)
                    return this.that.vrJsonp(url,params,vrobj);
                else
                    return this.that.commonJsonp(url,params);
            default:
                return this.that.commonJsonp(url,params);
        }
    }

    /**
     * fetch方式get请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     */
    fetchGet(url,params){
        let _url=url+"?"+qs.stringify(params);
        return new Promise((resolve, reject)=>{
            fetch(_url)  
            .then((res) => {
                if (res.ok)
                    return res.json()
                else
                    reject(new Error('服务器繁忙，请稍后再试；\r\nCode:' + res.status));
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        })
    }

    /**
     * fetch方式post请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     */
    fetchPost(url,params){
        return new Promise((resolve, reject)=>{
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: qs.stringify(params)
            }).then(function(res) {
                if (res.ok)
                    return res.json();
                else
                    reject(new Error('服务器繁忙，请稍后再试；\r\nCode:' + res.status));
            }).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            })
        })
    }

    /**
     * axios方式get请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     */
    axiosGet(url,params){
        return new Promise((resolve, reject)=>{
            axios.get(url, {
                params:params
            })  
            .then((res) => {
                if (res.status==200 && res.statusText=="OK")
                    return res.data;
                else
                    reject(new Error('服务器繁忙，请稍后再试；\r\nCode:' + res.status));
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        })
    }

    /**
     * axios方式post请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     */
    axiosPost(url,params){
        return new Promise((resolve, reject)=>{
            axios.post(url, qs.stringify(params)).then(function(res) {
                if (res.status==200 && res.statusText=="OK")
                    return res.data;
                else
                    reject(new Error('服务器繁忙，请稍后再试；\r\nCode:' + res.status));
            }).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            })
        })
    }

    /**
     * jsonp请求方式
     * @param {*请求url} url 
     * @param {*请求参数} params
     * @param {*设置callback名称，默认callback} cbname 
     */
    commonJsonp(url,params,cbname='callback'){
        return new Promise((resolve, reject)=>{
            let _url=url+"?"+qs.stringify(params);
            fetchJsonp(_url, {
                jsonpCallback: cbname,
            })
            .then(function(res) {
                if (res.ok)
                    return res.json();
                else
                    reject(new Error('服务器繁忙，请稍后再试；\r\nCode:' + res.status));
            }).then((data)=>{
                resolve(data);
            }).catch((err)=>{
                reject(err);
            })
        })
    }

    /**
     * vue-resource方式Get请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     * @param {*挂载到Vue根实例的$http} vrobj 
     */
    vrGet(url,params,vrobj){
        let _url=url+"?"+qs.stringify(params);
        return new Promise((resolve, reject)=>{
            vrobj.get(_url)  
            .then((res) => {
                if (res.ok)
                    return res.body;
                else
                    reject(new Error('服务器繁忙，请稍后再试；\r\nCode:' + res.status));
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        })
    }

    /**
     * vue-resource方式Post请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     * @param {*挂载到Vue根实例的$http} vrobj 
     */
    vrPost(url,params,vrobj){
        return new Promise((resolve, reject)=>{
            vrobj.post(url,params,{emulateJSON:true})  
            .then((res) => {
                if (res.ok)
                    return res.body;
                else
                    reject(new Error('服务器繁忙，请稍后再试；\r\nCode:' + res.status));
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        })
    }

    /**
     * vue-resource方式Jsonp请求
     * @param {*请求url} url 
     * @param {*请求参数} params 
     * @param {*挂载到Vue根实例的$http} vrobj 
     */
    vrJsonp(url,params,vrobj){
        let _url=url+"?"+qs.stringify(params);
        return new Promise((resolve, reject)=>{
            vrobj.jsonp(_url)  
            .then((res) => {
                if (res.ok)
                    return res.body;
                else
                    reject(new Error('服务器繁忙，请稍后再试；\r\nCode:' + res.status));
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        })
    }
}