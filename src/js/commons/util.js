/**
 * 工具类
 */
import Config from '../config.js'
import httpHelper from './httpHelper.js'
import md5 from 'blueimp-md5' 

export default class Util{
    /**
     * 获取本地信息
     */
    static getLocation(){
        return new Promise((resolve, reject)=>{
            httpHelper.Jsonp(Config.apiurl.bmapurl.getLocationUrl).then((res)=>{
                let _location={
                    province:res.content.address_detail.province,
                    city:res.content.address_detail.city.substring(0,res.content.address_detail.city.length-1),
                    city_code:res.content.address_detail.city_code,
                    address:res.content.address,
                    long:res.content.point.x,
                    lat:res.content.point.y
                }
                resolve(_location);
            }).catch((err)=>{
                reject(err);
            })
        })
    }

    /**
     * MD5加密
     * @param {*加密字符串} val 
     */
    static GetMD5(val){
        return md5(val);
    }
}