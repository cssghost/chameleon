var path = require('path');
var fs = require('fs');

var _ = require('../tools/underscore.js');
var file = require('../tools/file.tools.js');
var config = require('../tempData/insert.json');

var roomManageCtrl = require('../atom/ctrl/room.manage.ctrl.js');

var tempDataPath = path.join(__dirname, '../tempData/');
var logPath = path.join(__dirname, '../log/');
var apiPath = path.join(__dirname, '../api/');
var apiDataPath = path.join(__dirname, '../data/');

console.log('***********************    开始解析    ***********************');
if ( config.project && config.project.length ) {
    config.project.forEach(function (project) {
        var room = project.room,
            importPath = path.join(tempDataPath, 'import'),
            // 当前项目的 API 数据集合
            apiFileData = file.readFile(apiDataPath + room + '/api.' + room + '.json', {sync:true, useJson:true}) || {map:{},route:{}};

        console.log('所要导入数据的项目名称：' + room);

        if ( !apiFileData.map ) {
            apiFileData.map = {};
        }

        if ( !apiFileData.route ) {
            apiFileData.route = {};
        }

        console.log('============================================================');
        project.api.forEach(function (api) {
            console.log('所要导入的 API 名称：' + api.api);
            var apiKey = api.api.toLowerCase().replace(/^\/|\/$/gi, ''),
                _apiFilePath = apiPath + room + '/' + path.join.apply(null, apiKey.split(/[^\da-zA-Z]/gi)) + '/',
                _apiFileName = apiKey.replace(/[^\da-zA-Z]/gi, '-') + '.json',
                _importData = {
                    group : api.group || '导入数据',
                    name : api.name || '导入数据接口',
                    api : api.api,
                    dataType : "json",
                    method : "post",
                    curApiFile : _apiFileName,
                    backup : [
                        {
                            tagID : +new Date() + '',
                            fileTag : "默认",
                            fileName : _apiFileName
                        }
                    ]
                };

            if ( apiFileData.map[apiKey] ) {
                console.log('API 已存在');
            } else {
                var _importDataFolder = path.join(importPath, room, api.fileName),
                    _importApiData = file.readFile(_importDataFolder, {sync:true, useJson:true});

                if ( !!_importApiData ) {
                    console.log('path ===> ' + _apiFilePath + _apiFileName);
                    if ( 
                        !!file.writeFile(_apiFilePath + _apiFileName, _importApiData, {sync:true})
                     && !!file.writeFile(apiDataPath + room + '/detail/' + _apiFileName, _importData, {sync:true})
                    ) {
                        apiFileData.map[apiKey] = {
                            group : _importData.group,
                            name : _importData.name,
                            api : _importData.api
                        };

                        apiFileData.route[apiKey] = {
                            api : _apiFileName,
                            method : _importData.method
                        };

                        console.log('导入成功');
                    } else {
                        console.log('导入失败');
                    }
                } else {
                    console.log('没找到所要导入的 API 数据');
                }
            }
            console.log('============================================================');
        });

        if ( !!file.writeFile(apiDataPath + room + '/api.' + room + '.json', apiFileData, {sync:true}) ) {
            roomManageCtrl.updateRoom({ name: room, route : apiFileData.route });
            console.log('重新生成 API 集合成功');
        } else {
            console.log('重新生成 API 集合失败');
        }


    });
} else {
    console.log('没有可导入的数据');
}

console.log('***********************    脚本完成    ***********************');


        
