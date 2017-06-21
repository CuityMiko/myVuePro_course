/**
 * 电影模块控制器
 */
'use strict';
var movieServices = mypro.services.movie;

// 获取电影列表
var getlist=function(req, res, next){
    var obj= {
        start: parseInt(req.query.start),
        count:parseInt(req.query.count),
        city:req.query.city,
        q:req.query.q
    }
    var promise=movieServices.getmovielist(req.params.movietype,obj);
    promise.then((data)=>{
        res.json({result:true,data:data});
    },(err)=>{
        res.json({result:false,data:err});
    })
}

// post方式获取电影列表
var postlist=function(req, res, next){
    var obj= {
        start: parseInt(req.body.start),
        count:parseInt(req.body.count),
        city:req.body.city,
        q:req.body.q
    }
    var promise=movieServices.getmovielist(req.params.movietype,obj);
    promise.then((data)=>{
        res.json({result:true,data:data});
    },(err)=>{
        res.json({result:false,data:err});
    })
}
module.exports = {getlist,postlist}