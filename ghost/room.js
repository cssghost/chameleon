/**
* @fileOverview room.js 文件操作
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-20
* @update：2015-07-20
*/
'use strict';

var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var config = require('./config.json');

var PORT = config.port;

var staticType = {
    "css": "text/css; charset=UTF-8",
    "gif": "image/gif",
    "html": "text/html; charset=UTF-8",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "woff": "application/font-woff",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain; charset=UTF-8",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

var queryReg = /^([^=]+)=(.*)$/;

// 根据配置获取静态资源目录
var staticPath = config.staticPath;

var server = http.createServer(function (request, response) {

    var method = request.method.toLowerCase();

    var pathname = url.parse(request.url).pathname;

    // 如果 get 请求可以获取 index.html 文件，则返回静态资源
    if ( method == 'get' && fs.existsSync( path.join(staticPath, pathname, 'index.html') ) ) {
        pathname = path.join(pathname, 'index.html');
    }

    var realPath = path.join(staticPath, pathname);

    var ext = path.extname(realPath).replace(/\./g, '');

    // console.log(ext);

    // 读取静态文件
    if ( method == 'get' && staticType[ext] ) {
        fs.exists(realPath, function (exists) {
            if (!exists) {
                errorResponse(response, 404, 'This request URL ' + pathname + ' was not found on this server.');
            } else {

                fs.readFile(realPath, "binary", function (err, file) {
                    if (err) {
                        errorResponse(response, 500, err);
                    } else {
                        var contentType = staticType[ext] || staticType.txt;
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        response.write(file, "binary");
                        response.end();
                    }
                });
            }

        });
    } else {

        console.log('====================================');
        console.log('http request: ' + request.url);
        console.log('pathname: ' + pathname);

        router(method, url.parse(request.url), request, response);
    }

});
server.listen(PORT);


/**
 * @name router
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 路由方法
 * @param {String}    method       接口请求方式 [get|post]
 * @param {JSON}      location     location 对象
 * @param {Object}    request      request 对象
 * @param {Object}    response     response 对象
 */
function router (method, location, request, response) {
    var errMsg = '未知接口，请在管理页面添加',
        routeMap = config.route;

    var routeKey = location.pathname.replace(/^\/+|\/+$/, '').toLowerCase().split('&')[0];

    var map = routeMap[routeKey];

    // 默认取不带 ? location.search 的
    // 所以如果没有值 再取一边带 ? location.search 的
    if ( !map ) {
        routeKey += location.search;
        // 去除 & 符号分隔的参数
        routeKey = routeKey.toLowerCase().split('&')[0];
        // console.log(routeMap);
        // console.log(routeKey);
        // console.log(routeKey.toLowerCase().split('&')[0]);
        map = routeMap[routeKey];
    }

    // console.log(location);
    // console.log(routeKey);
    // console.log(routeMap);

    // console.log(map);
    // console.log(method);

    if ( !map ) {
        errorResponse(response, 404, errMsg);
        return;
    }

    console.log(map);

    // 与设置的接口 post type 不一致
    if ( map.method != method ) {
        errMsg = '与规定的发送方式不一致，请更换';

        errorResponse(response, 404, errMsg);
    } else {
        // 预留通过插件方式返回数据
        if ( !!map.plugin ) {
            // code
        }
        // 返回相应的 json 文件数据
        else {
            if ( map.dataType && map.dataType.toLowerCase() == 'file' ) {
                setTimeout(function () {
                    apiResponse(response, routeKey, map.api);
                }, 5000);
            } else {
                apiResponse(response, routeKey, map.api);
            }
        }
    }
}

/**
 * @name successResponse
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 返回数据
 * @param {Object}    res     response 对象
 * @param {String}    src     接口文件路径，从配置中读取接口文件的项目根目录
 * @param {String}    fileName     接口文件路径，从配置中读取接口文件的项目根目录
 */
function apiResponse (res, src, fileName) {
    // var src = src.toLowerCase().replace(/[^\da-zA-Z]/gi, '/');
    // V2 版本 API 文件在 room 的文件夹下
    // var src = path.join(__dirname, '../../api/' + config.name, src, fileName);
    var src = path.join(__dirname, '../../api/', fileName);

    // console.log(src);
    // successResponse(res, src);
    // return;

    fs.exists(src, function (exists) {

        if ( exists ) {
            fs.readFile(src, 'utf-8', function (e, data) {

                if ( e ) {
                    errorResponse(res, 500, '接口的 json 文件读取失败，请在管理页面修改');
                }
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });

                res.end(data);
            });
        } else {
            errorResponse(res, 404, '接口的 json 文件不存在，请在管理页面添加');
        }

    });
}

/**
 * @name successResponse
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 返回信息
 * @param {Object}    res     response 对象
 * @param {String}    msg     信息
 */
function successResponse (res, msg) {
    res.writeHead(200, {
        'Content-Type': staticType.txt
    });

    if ( typeof msg == 'string' ) {
        res.write(msg);
        res.end();
    } else {
        res.end(msg);
    }
}

/**
 * @name errorResponse
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 返回错误的信息
 * @param {Object}          res     response 对象
 * @param {Number}          code    服务器错误码
 * @param {String||JSON}    err     错误信息
 */
function errorResponse (res, code, err) {
    res.writeHead(code, {
        'Content-Type': staticType.txt
    });

    console.log(code, err);
    if ( typeof err == 'string' ) {
        res.write(err);
        res.end();
    } else {
        res.end(err);
    }
}

/**
 * @name getMapValue
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 应用匿名函数，返回对象的值
 * @param {JSON}      data    数据
 * @param {String}    code    取对象指的代码字符串
 */
function getMapValue (data, code) {
    var fnStr = '';

    fnStr += 'return data' + code;

    // console.log(fnStr);

    var fn = new Function('data', fnStr);

    // console.log(fn);
    // console.log(fn(data));

    return fn(data);

}
