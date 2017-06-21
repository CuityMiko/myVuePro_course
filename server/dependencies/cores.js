//core依赖
module.exports = function (core) {
    core.tools = require('../core/tools');
    core.http = require('../core/httpHelper');
    core.request = require('../core/requestHelper');
    core.mongodb = require('../core/mongodb');
}