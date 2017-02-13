/** 
* @fileOverview test.js 测试
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-17
* @update：2015-07-17
*/ 
'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var zlib = require('zlib');
var Hzip = require('hzip');

var file = require('../tools/file.tools.js');
var log = require('../tools/log.tools.js');
var room = require('../atom/ctrl/room.ctrl.js');


/**
 * @name readFile
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 读取文件内容
 * @param {String}    src    文件路径, 路径以根目录开始
 */
router.post('/readFile', function(req, res, next) {
    var src = path.join(__dirname, '../' + req.body.src);

    console.log(src);

    file.readFile(src).then(
        function(data){
            log.response(res, data);
        },
        function(error){
            log.error(res, error.code, error.msg);
        }
    );

});

/**
 * @name writeFile
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 写入文件内容
 * @param {String}      src       文件路径
 * @param {String}      detail    文件内容
 */
router.post('/writeFile', function(req, res, next) {
    var src = path.join(__dirname, '../' + req.body.src),
        detail = req.body.detail;

    file.writeFile(src, detail, true).then(
        function(data){
            log.response(res, data);
        },
        function(error){
            log.error(res, error.code, error.msg);
        }
    );

});

/**
 * @name unZip 不好用
 * @see https://github.com/EvanOxfeld/node-unzip
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 解压缩文件
 * @param {String}      src       文件路径
 * @param {String}      output    输出路径
 */
router.post('/unZip', function(req, res, next) {
    var src = path.join(__dirname, '../' + req.body.src),
        output = path.join(__dirname, '../' + req.body.output);

    var zip = new Hzip(fs.readFileSync(src));

    // console.log(zip);

    var entry = zip.getEntry(src);

    console.log(entry);

    zlib.inflateRaw(entry.cfile,function(err,buf){
        console.log(buf.toString());
    });

    console.log(src);
    console.log(output);


});

/**
 * @name start
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 启动实例
 */
router.post('/start', function(req, res, next) {
    room.start();
    log.response(res, 'ok');
});

/**
 * @name end
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 关闭实例
 */
router.post('/end', function(req, res, next) {
    room.end();
    log.response(res, 'ok');
});

module.exports = router;