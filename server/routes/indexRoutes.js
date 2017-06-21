'use strict';
var indexController = mypro.controllers.index;

module.exports = function (app) {
    app.get('/', function (req, res, next) { //首页
        indexController.index(req,res,next);
    });

    app.get('/test', function (req, res, next) { //testly
        indexController.testly(req,res,next);
    });
}
