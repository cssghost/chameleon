/*
 *@description FileUpload
 *@author：xu chen 
 *@date：2014-9-19
 *@update：2014-9-19
*/
'use strict';

window.Store.addView('FileUpload', function(){

    /**
     * uploader
     * @type Function
     * @params {JSON} filters
     * @params {String} filter.name
     * @params {Function} filter.fn
     * @params {String} filter.message
     */
    function FileUpload() {
        var self = this;

        // base config
        self.base = {
            $file: $('input:file'),
            url: '/',
            alias: 'file',
            headers: {},
            queue: [],
            progress: 0,
            autoUpload: false,
            removeAfterUpload: false,
            method: 'POST',
            filters: {},
            formData: [],
            queueLimit: Number.MAX_VALUE,
            withCredentials: false
        };

        self.queue = [];

        self._failFilter = '';

        self.jqxhr = null;

    }

    
    FileUpload.prototype.init = function(options){
        var self = this;

        self.options = $.extend({}, self.base, options);

        if ( options.$file.length ) {

            // bind upload medth
            options.$file.on('change', function (event) {

                var files = self.isHTML5 ? event.target.files : event.target;

                self.queue = [];

                self.addQueue(files);
            });

        } else {
            throw new Error('file input is not exist!!!');
        }
    };

    FileUpload.prototype.isHTML5 = !!(window.File && window.FormData);
    // FileUpload.prototype.isHTML5 = false;

    // 添加到上传队列
    FileUpload.prototype.addQueue = function (file) {
        var self = this,
            files = typeof file == 'object' && file.length != undefined ? file : [file],
            count = self.queue.length,
            addFileItem = [];

        for ( var i = 0, l = files.length; i < l; i++ ) {

            var item = new self._FileItem(self, files[i]);

            if ( self.isValidFile( item ) ) {

                addFileItem.push( item );
                self.queue.push( item );

                self._onAfterAddingFile( item );

            } else {
                self._onAddingFailed( item, self.options.filters[ self._failFilter ], self );
                break;
            }
        }

    }

    // 验证上传文件是否符合要求
    FileUpload.prototype.isValidFile = function (file) {
        var self = this,
            filters = self.options.filters,
            flag = true;

        for ( var key in filters ) {
            if ( typeof filters[key].fn != 'function' ) {
                self._failFilter = key;
                break;
            }
            if ( !filters[key].fn(file.file, self) ) {
                self._failFilter = key;
                flag = false;
                break;
            }
        }
        return flag;
    }

    // 添加文件时，没有通过验证
    FileUpload.prototype._onAddingFailed = function(fileItem, errorFilter,options){
        this.onAddingFailed(fileItem, errorFilter,options);
    };

    // 添加文件时，通过验证
    FileUpload.prototype._onAfterAddingFile = function(fileItem){
        this.onAfterAddingFile(fileItem);
    };

    // 上传文件之前
    FileUpload.prototype._onBeforeUploadItem = function(fileItem){
        fileItem._onBeforeUpload();
        this.onBeforeUploadItem(fileItem);
    };

    // 上传文件中
    // FileUpload.prototype._onProgressItem = function(fileItem, progress){};

    // 上传单个文件完成时
    FileUpload.prototype._onCompleteItem = function(){
        this.onCompleteItem();
    };

    // 上传所有文件完成时
    FileUpload.prototype._onCompleteAll = function(){
        this.onCompleteAll();
    };
    
    // 外部引用 添加文件时，没有通过验证
    FileUpload.prototype.onAddingFailed = function(file, errorFilter,options){};
    // 外部引用 添加文件时，通过验证
    FileUpload.prototype.onAfterAddingFile = function(fileItem){};

    // 上传文件之前
    FileUpload.prototype.onBeforeUploadItem = function(){};
    // 上传文件中
    FileUpload.prototype.onProgressItem = function(fileItem, progress){};

    
    FileUpload.prototype.onCancelItem = function(){};
    FileUpload.prototype.onSuccessItem = function(response){};
    FileUpload.prototype.onErrorItem = function(){};
    FileUpload.prototype.onCompleteItem = function(){};
    FileUpload.prototype.onCompleteAll = function(){};

    FileUpload.prototype.uploadItem = function (fileItem) {
        var self = this;

        if ( fileItem.isUploading ) {
            return;
        }

        self._onBeforeUploadItem(fileItem);

        if ( self.isHTML5 ) {
            self._ajaxUpload( fileItem );
        } else {
            self._iframeUpload( fileItem );
        }
        
    }

    FileUpload.prototype._ajaxUpload = function(fileItem){
        var self = this;

        var form = new FormData();

        $.each(fileItem.formData, function (index, item) {
            $.each(item, function (key, value) {
                form.append(key, value);
            });
        });

        fileItem.file.name = encodeURIComponent(fileItem.file.name);

        form.append(fileItem.alias, fileItem._file, fileItem.file.name);
        // console.log(fileItem);
        
        self.jqxhr = $.ajax({
            url: self.options.url,
            data: form,
            cache: false,
            // contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            contentType: false,
            processData: false,
            type: 'POST',
            xhr: function() {
                var req = $.ajaxSettings.xhr();
                if (req) {
                    req.upload.addEventListener('progress',function(ev){
                        //Display progress Percentage
                        var progress = Math.round(ev.loaded * 100 / ev.total);

                        self.onProgressItem(fileItem, progress);

                    }, false);
                }
                return req;
            }
        })
        .success(function(data) {

            if ( typeof data == 'string' ) {
                data = JSON.parse(data);
            }

            self.onSuccessItem(fileItem, data);
        })
        .error(function(jqXHR, textStatus, errorThrown) {
            self.onErrorItem();
        })
        .complete(function(jqXHR, textStatus) {
            self._onCompleteItem(fileItem, jqXHR);
        });

    };

    // old brower to upload
    FileUpload.prototype._iframeUpload = function(fileItem){
        var self = this;

        var $form = $('<form />');
        var $iframe = $('<iframe class="fn-hide" name="iframeFileUpload' + +(new Date()) + '">');

        $.each(fileItem.formData, function (index, item) {
            $.each(item, function (key, value) {
                $form.append($('<input type="hidden" name="' + key + '" value="' + value + '" />'));
            });
        });

        $form.prop({
            action: fileItem.url,
            method: 'POST',
            target: $iframe.prop('name'),
            enctype: 'multipart/form-data',
            encoding: 'multipart/form-data' // old IE
        });

        $iframe.on('load', function() {
            var html = '{"code : 1"}',
                reg = /(\{.*\})/;
            try {
                // Fix for legacy IE browsers that loads internal error page
                // when failed WS response received. In consequence iframe
                // content access denied error is thrown becouse trying to
                // access cross domain page. When such thing occurs notifying
                // with empty response object. See more info at:
                // http://stackoverflow.com/questions/151362/access-is-denied-error-on-accessing-iframe-document-object
                // Note that if non standard 4xx or 5xx error code returned
                // from WS then response content can be accessed without error
                // but 'XHR' status becomes 200. In order to avoid confusion
                // returning response via same 'success' event handler.

                // fixed angular.contents() for iframes
                html = $iframe[0].contentDocument.body.innerHTML;
                // html 有可能会包含在一些标签内，所有需要通过正则吧回执捕获出来
            } catch (e) {}

            var match = html.match(reg);

            if ( !html || !match ) {
                return;
            }

            html = match[0];

            // console.log('****************');
            // console.log(match);
            // console.log( html );
            // console.log( JSON.parse(html) );
            // console.log('****************');

            var xhr = {response: JSON.parse(html), status: 200, dummy: true};
            var response = xhr.response;
            var headers = {};

            self.onSuccessItem(fileItem, response, xhr.status, headers);
            self._onCompleteItem(fileItem, response, xhr.status, headers);
        });

        fileItem.$file.after($form);
        $form.append(fileItem.$file).append($iframe);

        $form[0].submit();

        // console.log(fileItem);
        // console.log($iframe);
    };

    FileUpload.prototype._FileItem = function (uploader, file) {
        var self = this;

        !uploader.isHTML5 && (file = $(file).val());

        $.extend(self, uploader.base, uploader.options, {
            uploader : uploader,
            file: new uploader._FileInfo(file, uploader),
            isReady: false,
            isUploading: false,
            isUploaded: false,
            isSuccess: false,
            isCancel: false,
            isError: false,
            progress: 0,
            index: null,
            _file: file
        });
    }

    FileUpload.prototype._FileItem.prototype = {
        // 上传之前
        _onBeforeUpload : function () {
            this.isReady = true;
            this.isUploading = true;
            this.isUploaded = false;
            this.isSuccess = false;
            this.isCancel = false;
            this.isError = false;
            this.progress = 0;
        },
        // 上传文件
        upload : function () {
            this.uploader.uploadItem(this);
        }
    }

    // 整理数据
    FileUpload.prototype._FileInfo = function (file, uploader) {
        var self = this;

        if ( uploader.isHTML5 ) {
            self.lastModifiedDate = file.lastModifiedDate;
            self.size = file.size;
            self.type = file.type;
            self.name = file.name;
        } else {
            // console.log($(file).val());
            self.lastModifiedDate = null;
            // var filePath = $(file).val();
            self.size = null;
            self.type = 'like/' + file.slice(file.lastIndexOf('.') + 1).toLowerCase();
            self.name = file.slice(file.lastIndexOf('/') + file.lastIndexOf('\\') + 2);
        }
    }

    return FileUpload;
    
});