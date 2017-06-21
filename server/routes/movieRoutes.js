/**
 * 电影模块路由
 */
'use strict';
var movieController = mypro.controllers.movie;

module.exports = function (app) {
    app.get('/movie/:movietype/getlist', function (req, res, next) { //获取电影列表
        movieController.getlist(req,res,next);
    });

    app.post('/movie/:movietype/getlist', function (req, res, next) { //获取电影列表
        movieController.postlist(req,res,next);
    });
}
