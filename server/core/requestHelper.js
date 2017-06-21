const config = mypro.config,
      request = mypro.modules.request,
      q = mypro.modules.q; 
      rp = mypro.modules.rp; 
const proHost=config.soaProHost; //mypro proHost
const apiHost=config.soaApiHost; //mypro apiHost
const httprequest = mypro.core.http; 

//get请求
var getRequest=function(url,jsonObj){
    var options = {
        uri: _convertHostUrl(url),
        qs: jsonObj,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response 
    };
    var deferred=q.defer();
    rp(options)
    .then(function (repos) {
        deferred.resolve(repos);
    })
    .catch(function (err) {
        deferred.reject(err); 
    });
    return deferred.promise;
} 

//post请求
var postRequest=function(url,jsonObj){
    var _url=_convertHostUrl(url);
    // 方式一
    // jsonObj.ContentType='application/json';
    // httprequest.post(
    //     _url,
    //     30000,
    //     jsonObj,
    //     function(err,res){
    //         var json = JSON.parse(res);
    //         callback(err, json);     
    //     },'utf-8',{},'utf-8',true);
    // 方式二
    // request.post({url: _url,form:jsonObj}, (error, response, body)=>{
    //     if (!error && response.statusCode == 200) {
    //         var _result=JSON.parse(body);
    //         callback(null,_result);
    //     }
    //     else
    //         callback(new Error("error"),null);
    // }); 
    //方式三
    var options = {
        method: 'POST',
        uri:_url,
        body: jsonObj,
        json: true // Automatically stringifies the body to JSON 
    };
    var deferred=q.defer();
    rp(options)
    .then(function (parsedBody) {
        deferred.resolve(parsedBody); 
    })
    .catch(function (err) {
        deferred.reject(err); 
    });
    return deferred.promise;
}

/**
 * 解析并转换URL
 * @param {*请求url} url 
 * eg: url: /user/getlist => proHost+url
 *     url: douban:/user/getlist => apiHost[_apiflag]+newurls[1]
 */
var _convertHostUrl=function(url){
    if(url.indexOf(":")>-1){
        var newurls=url.split(':');
        var _apiflag=newurls[0];
        if(apiHost.hasOwnProperty(_apiflag))
            return apiHost[_apiflag]+newurls[1];
        else
           return proHost+newurls[1];
    }else //B.mypro
        return proHost+url;
}

module.exports={getRequest,postRequest};