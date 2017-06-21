'use strict';
var exampleController = mypro.controllers.example;

module.exports = function (app) {
    app.get('/examples/mongoose', function (req, res, next) { // mongoose
        exampleController.mongoosetest(req,res,next);
    });

    app.get('/examples/socketio', function (req, res, next) { // socket.io
        exampleController.socketio(req,res,next);
    });
}
