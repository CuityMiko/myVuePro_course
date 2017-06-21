'use strict';
var dataformat = require('date-format');
var config = mypro.config,
    request = mypro.modules.request; 
var redis = mypro.modules.redis;

/**
 * 克隆JSON对象
 * 
 * @param json 对象
 * @returns 
 */
function clone(json) {
    return JSON.parse(JSON.stringify(json));
};

/**
 * 获取客户端IP
 * 
 * @param req 请求
 */
function getClientIP(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

function strIsNull(str) {
    str = str || '';
    if (str != undefined && str != '' && str.trim()) {
        return false;
    } else { return true; }
}

function formatIPv4(str) {
    if (!strIsNull(str)) {
        var ip = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
        var text = ip.exec(str);
        if (text == null)
            return '';
        else
            return text[0];
    } else
        return '';
}
 
//日期格式化处理
var dateFormat=function(format,date){
    if(date)
        return dataformat(format, new Date(date));
    else
        return dataformat(format, new Date());
}

//redis作为缓存的操作
//存储
var _cacheSet=function(key,value,callback){
    var client = redis.createClient(config.cacheRedisPort,config.cacheRedisHost,config.cacheRedis_OPTS);
    client.on('connect',function(){
        client.set(key,value,(err)=>{
            callback(err);
        });
    });
}

//获取
var _cacheGet=function(key,callback){
    var client = redis.createClient(config.cacheRedisPort,config.cacheRedisHost,config.cacheRedis_OPTS);
    client.on('connect',function(){
        client.get(key, (err,result)=>{
            callback(err,result);
        });
    });
}

module.exports = {
    //克隆JSON对象
    clone: clone,
    getClientIP: getClientIP,
    strIsNull: strIsNull,
    formatIPv4: formatIPv4,
    dateFormat:dateFormat,
    cacheSet:_cacheSet,
    cacheGet:_cacheGet
}