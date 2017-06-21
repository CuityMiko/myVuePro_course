//全局依赖初始化
module.exports.init = function () {
    global.mypro = {};
    
    //config
    mypro.config = require('./config/config');

    //modules
    mypro.modules = {};
    require('./dependencies/modules')(mypro.modules);

    //core
    mypro.core = {};
    require('./dependencies/cores')(mypro.core);
    
    //models
    mypro.models = {};
    require('./dependencies/models')(mypro.models);

    //services
    mypro.services = {};
    require('./dependencies/services')(mypro.services);

    //filters
    mypro.filters = {};
    require('./dependencies/filters')(mypro.filters);

    //controllers
    mypro.controllers = {};
    require('./dependencies/controllers')(mypro.controllers);
}