'use strict';
/**
 * http请求的工具操作集，包含请求超时时间设置
 */

var http = require('http');
var https = require('https');
var qs = require('querystring');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');

/**
 * @exports core/httpHelper
 */
var httpHelper = {

    /**
     * @description 发起远程请求的基础方法
     * @param {Object} options 请求选项
     * @param {String} [options.protocol='http'] 请求协议
     * @param {String} [options.method='get'] 请求方法，get、post...
     * @param {Object=} options.headers 请求头
     * @param {String=} options.encode 请求数据的编码格式，如果是gbk，使用escape编码
     * @param {Boolean=} [options.json=false] 发送的是否json数据
     * @param {Boolean=} [options.buffer=false] 是否直接返回二进制数据
     * @param {Number=} timeout 超时时间，单位为毫秒
     * @param {Object=} data 请求发送的数据对象
     * @param {RequestCallback} callback 处理请求响应的回调方法，查看 {@link RequestCallback}
     * @param {String} [encoding='utf-8'] 编码格式
     */
    request: function (options, timeout, data, callback, encoding) {
        var httpLib = http;
        if (options.protocol && options.protocol === 'https:') {
            httpLib = https;
        }
        var content = {};
        if (options.json) {
            content = JSON.stringify(data);
        } else {
            content = (options.encode && options.encode.toLocaleLowerCase() == 'gbk') ? qs.stringify(data, null, null, {encodeURIComponent: escape}) : qs.stringify(data);
        }
        if (options.method.toLowerCase() === 'post') {
            options.headers = options.headers || {};
            options.headers['Content-Type'] = options.json ? 'application/json' : 'application/x-www-form-urlencoded';
            options.headers['Content-Length'] = Buffer.byteLength(content);
        }
        /** 为true时直接返回数据流 */
        options.buffer = options.buffer || false;

//console.log(options);
        var req = httpLib.request(options, function (res) {
            var bufferHelper = new BufferHelper();
            res.on('data', function (chunk) {
                bufferHelper.concat(chunk);
            });
            res.on('end', function () {
                var _data;
                if (options.buffer) {
                    _data = bufferHelper.toBuffer();
                }
                else {
                    if (typeof encoding != 'undefined' && encoding !== null) {
                        _data = iconv.decode(bufferHelper.toBuffer(), encoding);
                    } else {
                        _data = iconv.decode(bufferHelper.toBuffer(), 'utf-8');
                    }
                }
                callback(null, _data, res, req);
            });
        });

        req.on('error', function (err) {
            callback(err);
        });

        req.write(content);

        if (timeout && timeout > 0) {
            req.setTimeout(timeout, function () {
                callback(new Error('request timeout'), '');
            });
        }

        req.end();
    },

    /**
     * @description 以GET的方式发起远程请求
     * @param {String} url 请求地址
     * @param {Number=} timeout 超时时间，单位为毫秒
     * @param {RequestCallback} callback 处理请求响应的回调方法，查看 {@link RequestCallback}
     * @param {String} [encoding='utf-8'] 编码格式
     * @param {Object=} header 请求头对象
     */
    get: function (url, timeout, callback, encoding, header) {
        var options = require('url').parse(url);
        options.method = 'GET';
        if (header) {
            options.headers = header;
        }

        this.request(options, timeout, {}, callback, encoding);
    },

    /**
     * @description 以POST的方式发起远程请求
     * @param {String} url 请求地址
     * @param {Number=} timeout 超时时间，单位为毫秒
     * @param {Object=} data 请求发送的数据对象
     * @param {RequestCallback} callback 处理请求响应的回调方法，查看 {@link RequestCallback}
     * @param {String} [encoding='utf-8'] 编码格式
     * @param {Object=} header 请求头对象
     * @param {String=} reqEncoding 请求数据的编码格式，如果是gbk，使用escape编码
     * @param {Boolean=} [json=false] 发送的是否json数据
     */
    post: function (url, timeout, data, callback, encoding, header, reqEncoding, json) {
        var options = require('url').parse(url);
        options.method = 'POST';
        if (header) {
            options.headers = header;
        }
        if (reqEncoding) {
            options.encode = reqEncoding;
        }
        if (json) {
            options.json = json;
        }
        this.request(options, timeout, data, callback, encoding);
    }
};

/**
 * @description 处理请求响应的回调方法
 * @callback RequestCallback
 * @param {Object} err 请求或响应的错误对象
 * @param {string} data 响应的数据
 * @param {Object} res 响应流对象
 */

module.exports = httpHelper;