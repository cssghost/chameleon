var path = require('path');
var fs = require('fs');

var _ = require('../tools/underscore.js');
var file = require('../tools/file.tools.js');

var roomsPath = path.join(__dirname, '../rooms');
var apiDataPath = path.join(__dirname, '../data/');

console.log('***********************    开始更新    ***********************');

// 获取所有项目的名称
var files = fs.readdirSync(roomsPath);
var roomList = [];

files.forEach(function (item, index) {
    if ( fs.lstatSync(roomsPath + '/' + item).isDirectory() ) {
        roomList.push(item);
    }
});

console.log('需要更新的项目数组: ');
console.log(roomList);

console.log('==============================================================');

roomList.forEach(function (item, index) {
    var apiConfigData = file.readFile(apiDataPath + 'api.' + item + '.json', {sync:true, useJson:true});

    // 如果读取成功，则代表需要更新
    if ( !!apiConfigData ) {
        var map = apiConfigData.map;

        for ( var key in map ) {
            var data = _.extend({}, map[key]);
            console.log('新建 ' + key + ' 接口独立的存储信息文件');

            var apiKey = data.api.toLowerCase();
            var apiFileName = apiKey.replace(/[^\da-zA-Z]/gi, '-') + '.json';

            if ( !!file.writeFile(apiDataPath + item + '/detail/' + apiFileName, data, {sync:true}) ) {
                console.log('新建成功');
            } else {
                console.log('新建失败');
            }

            // 重置当前 API 的信息
            apiConfigData.map[key] = {
                group : data.group,
                name : data.name,
                api : data.api
            };
        }

        console.log('更新 ' + item + ' 项目的 API 配置存储文件');

        if ( !!file.writeFile(apiDataPath + item + '/api.' + item + '.json', apiConfigData, {sync:true}) ) {
            console.log('更新成功');
        } else {
            console.log('更新失败');
        }

        console.log('删除旧的 ' + item + ' 项目的 API 配置存储文件');
        fs.unlinkSync(apiDataPath + 'api.' + item + '.json');
    }
});



console.log('***********************    完成更新    ***********************');


        
