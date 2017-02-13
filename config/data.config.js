/** 
* @fileOverview data.config.js 数据文件的基本配置
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-07-12
* @update：2016-07-12
*/ 
'use strict';

const path = require('path');

const dataPath = '../data/V3/';
const backupPath = '../tempData/backup/V2/';

const config = {
    /**
     * Room Config Path
     */
    roomConfigPath: path.join(__dirname, '../rooms/'),
    /**
     * V2 Data Path
     */
    V2Path: path.join(__dirname, '../data/'),
    /**
     * V3 Data Path
     */
    V3Path: path.join(__dirname, dataPath),
    /**
     * API File Path
     */
    apiFilePath: path.join(__dirname, '../api/'),
    /**
     * API Map File
     */
    apiMap: path.join(__dirname, dataPath, 'api.map.json'),
    /**
     * API Group Map File
     */
    apiGroupMap: path.join(__dirname, dataPath, 'api.group.map.json'),
    /**
     * API List Path
     */
    apiListPath: path.join(__dirname, dataPath, 'api/'),
    /**
     * API data Path
     */
    apiDataPath: path.join(__dirname, dataPath, 'apiData/'),
    /**
     * API Contact Path
     */
    apiContactPath: path.join(__dirname, dataPath, 'apiContact/'),
    /**
     * Room Map File
     */
    roomMap: path.join(__dirname, dataPath, 'room.map.json'),
    /**
     * Room Group Map File
     */
    roomGroupMap: path.join(__dirname, dataPath, 'room.group.map.json'),
    /**
     * Room Data Path
     */
    roomDataPath: path.join(__dirname, dataPath, 'room/'),
    /**
     * backup API Path
     */
    backupApiPath: path.join(__dirname, backupPath, 'api/'),
    /**
     * backup Data Path
     */
    backupDataPath: path.join(__dirname, backupPath, 'data/'),
    /**
     * backup Room List File
     */
    backupRoomList: path.join(__dirname, backupPath, 'data/room.list.json')
};

module.exports = config;