/**
* @fileOverview file.tools.js 文件操作
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-17
* @update：2015-07-17
*/
'use strict';
var path = require('path');
var fs = require('fs');
var Q = require('q');
var errCode = require('../config/error.code.js');
var type = require('./type.tools.js');

/**
 * @author 徐晨
 * @name FileTools
 * @class 文件操作
 * @constructor
 */
function FileTools() {}

/**
 * @name mkDir
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 创建文件夹
 * @param {String}      src                    文件夹路径
 * @param {JSON}        option            [可选]选项
 * @param {Boolean}     option.sync            是否执行同步操作 [true | false]
 *                                             true:  同步, 直接返回数据
 *                                             false: 异步, 返回 promise
 * @param {Boolean}     option.mustNotExist    文件夹必须不存在
 */
FileTools.prototype.mkDir = function (src, option) {
    var self = this,
        option = option || {},
        exists = fs.existsSync(src),
        deferred = Q.defer();

    if ( exists ) {
        if ( option.sync ) {
            return !option.mustNotExist;
        }
        option.mustNotExist ? deferred.reject(errCode.exist) : deferred.resolve();
    } else {
        var src = path.normalize(src),
            split = src.split(path.sep);

        // 获取需要创建的文件夹层级目录
        var fn = function (split, list) {
            list.unshift( split.pop() );
            var _path = path.join( split.join('/') );
            return fs.existsSync(_path)
                ? {list:list,path:_path} : fn(split, list);
        }

        var createList = fn(split, []),
            createPath = createList.path;

        createList.list.forEach(function (dir) {
            createPath = path.join(createPath, dir);

            if ( fs.mkdirSync(createPath) ) {
                if ( option.sync ) {
                    return false;
                }
                deferred.reject(errCode.mkdir)
            }
        });

        if ( option.sync ) {
            return true;
        }

        deferred.resolve();
    }

    return deferred.promise;
}

/**
 * @name readFile
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 读取文件内容
 * @param {String}      src                  文件路径
 * @param {JSON}        option          [可选]选项
 * @param {Boolean}     option.sync          是否执行同步操作 [true | false]
 *                                           true:  同步, 直接返回数据
 *                                           false: 异步, 返回 promise
 * @param {Boolean}     option.mustExists    文件必须存在
 * @param {Boolean}     option.useJson       只要 JSON 数据
 **********************************************************
 * @returns {JSON}      err               错误码
 * @returns {JSON}      data
 * @returns {String}    data.data         文件内容
 * @returns {JSON}      data.json         转为 JSON 后的内容
 */
FileTools.prototype.readFile = function (src, option) {
    var self = this,
        option = option || {},
        exists = fs.existsSync(src),
        deferred = Q.defer();

    if ( exists ) {
        if ( option.sync ) {
            var data = fs.readFileSync(src, 'utf-8');
            return self.parseJson(data, option.useJson);
        } else {
            fs.readFile(src, 'utf-8', function (err, data) {
                if ( err ) {
                    deferred.reject(errCode.readFile)
                } else {
                    deferred.resolve( self.parseJson(data, option.useJson) );
                }
            });
        }
    } else {
        if ( option.sync ) {
            return option.mustExists ? false : '';
        } else {
            option.mustExists ? deferred.reject(errCode.notExist) : deferred.resolve(option.useJson ? {} : '');
        }
    }

    return deferred.promise;
}

/**
 * @name writeFile
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 读取文件内容
 * @param {String}         src                文件路径
 * @param {String|JSON}    data               文件内容
 * @param {JSON}        option            [可选]选项
 * @param {Boolean}     option.sync            是否执行同步操作 [true | false]
 *                                             true:  同步, 直接返回数据
 *                                             false: 异步, 返回 promise
 * @param {Boolean}     option.mustNotExist    文件必须不存在
 */
FileTools.prototype.writeFile = function (src, data, option) {
    var self = this,
        option = option || {},
        exists = fs.existsSync(src),
        deferred = Q.defer();

    // 把 json 数据转为 string
    if ( type.isObject(data) ) {
        data = JSON.stringify(data, null, 4);
    }

    if ( !option.mustNotExist ) {
        self.mkDir(path.dirname(src), {sync:true});
    }

    if ( exists ) {
        if ( option.mustNotExist ) {
            if ( option.sync ) {
                return false;
            } else {
                deferred.reject(errCode.exist);
            }
        } else {
            fs.unlinkSync(src);
        }
    }

    if ( option.sync ) {
        fs.appendFileSync(src, data);
        return true;
    } else {
        fs.appendFile(src, data, function (err) {
            err ? deferred.reject(errCode.appendFile) : deferred.resolve();
        });
    }


    return deferred.promise;
}

/**
 * @name copyFile
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 复制文件，默认认为文件夹都是存在的
 * @param {String}    src           被复制的文件路径
 * @param {String}    out           输出的文件路径
 * @param {Boolean}   isCut         是否为剪切
 */
FileTools.prototype.copyFile = function (src, out, isCut) {
    let self = this,
        exists = fs.existsSync(src);

    return new Promise(function (resolve, reject) {
        if ( exists ) {
            self.mkDir(path.dirname(out)).then(
                function () {
                    let readStream = fs.createReadStream(src);
                    let writeStream = fs.createWriteStream(out);

                    readStream.pipe(writeStream);
                    readStream.on('end', function () {
                        !!isCut && self.deleteFile(src);
                        resolve('');
                    });
                    readStream.on('error', function (err) {
                        reject(errCode.copyFile)
                    });
                },
                function (error) {
                    reject(error);
                }
            );
        } else {
            reject(errCode.notExist);
        }
    });
}

/**
 * @name copyFolder
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 复制文件夹
 * @param {String}    src           被复制的文件路径
 * @param {String}    out           输出的文件路径
 * @param {Boolean}   isCut         是否为剪切
 */
FileTools.prototype.copyFolder = function (src, out, isCut) {
    let self = this,
        exists = fs.existsSync(src);

    return new Promise(function (resolve, reject) {
        if ( exists ) {
            let files = fs.readdirSync(src),
                promise = [];

            files.forEach(function(file,index){

                const curPath = src + "/" + file,
                      curOut = out + "/" + file;

                if(fs.statSync(curPath).isDirectory()) { // recurse

                    promise.push( self.copyFolder(curPath, curOut, isCut) );

                } else { // delete file

                    promise.push( self.copyFile(curPath, curOut, isCut) );
                }

            });

            Promise.all(promise).then(
                function (result) {
                    resolve(result);
                },
                function (error) {
                    reject(result);
                }
            );
        } else {
            reject(errCode.notExist);
        }
    });
}

/**
 * @name deleteFile
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 删除文件
 * @param {String}    path     需要删除的文件路径
 */
FileTools.prototype.deleteFile = function(path) {

    var self = this;

    fs.existsSync(path) && fs.unlinkSync(path);
};

/**
 * @name deleteFolder
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 删除文件夹
 * @param {String}    path     需要删除的文件夹路径
 * @param {String}    clean    只清空，不删除目标根目录
 */
FileTools.prototype.deleteFolder = function(path, clean) {

    var self = this;

    var files = [];

    if( fs.existsSync(path) ) {

        files = fs.readdirSync(path);

        files.forEach(function(file,index){

            var curPath = path + "/" + file;

            if(fs.statSync(curPath).isDirectory()) { // recurse

                self.deleteFolder(curPath);

            } else { // delete file

                fs.unlinkSync(curPath);

            }

        });

        !clean && fs.rmdirSync(path);

    }
};

/**
 * @name cleanFolder
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 清空文件夹，继承 deleteFolder
 * @param {String}    path     需要清空的文件夹路径
 */
FileTools.prototype.cleanFolder = function(path) {
    this.deleteFolder(path, true);
};

/**
 * @name parseJson
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 把文件内容，转成 JSON（如果可以的情况下）
 *              返回原始数据和 JSON
 * @param {String}     data       文件内容
 * @param {Boolean}    useJson    只要 JSON 数据
 ********************************************
 * @returns {JSON}      response         返回值
 * @returns {String}    response.data    原始数据
 * @returns {JSON}      response.json    转换成的 JSON 数据
 */
FileTools.prototype.parseJson = function(data, useJson) {
    var response = {
        data : data,
        json : {}
    };

     // 如果是 json 文件，转为 json
    try {
        response.json = JSON.parse(data);
    }
    catch (err){}

    return useJson ? response.json : response;
};


module.exports = new FileTools();
