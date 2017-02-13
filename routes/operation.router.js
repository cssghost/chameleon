/** 
* @fileOverview operation.router.js 
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-07-12
* @update：2016-07-12
*/ 
'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var file = require('../tools/file.tools.js');
var log = require('../tools/log.tools.js');
var responseTools = require('../tools/api.tools.js');
var errCode = require('../config/error.code.js');
var roomManageCtrl = require('../atom/ctrl/room.manage.ctrl.js');
var apiManageCtrl = require('../atom/ctrl/api.manage.ctrl.js');

/**
 * @name upgrade
 * @description 系统升级为 V3
 * @author 徐晨 ( xuchen@smartisan.com )
 * @param {String}    name    项目名称
 */
router.post('/upgrade', function(req, res, next) {

});

module.exports = router;