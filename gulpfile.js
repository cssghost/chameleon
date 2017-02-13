var path = require('path');
var fs = require('fs');

var gulp = require('gulp');

gulp.task('update', function () {
    var ghostServerFile = path.join(__dirname, 'ghost/room.js'),
        roomsPath = path.join(__dirname, 'rooms');

    var files = fs.readdirSync(roomsPath);

    var copyList = [];

    files.forEach(function (item, index) {
        if ( fs.lstatSync(roomsPath + '/' + item).isDirectory() ) {
            copyList.push( roomsPath + '/' + item);
        }
    });

    console.log('==============================================');
    console.log('需要更新的文件夹');
    console.log(copyList);
    console.log('==============================================');

    var ready = gulp.src(ghostServerFile);

    copyList.forEach(function (item, index) {
        ready.pipe(gulp.dest(item));
    });

        
});


gulp.task('default', ['update']); //定义默认任务