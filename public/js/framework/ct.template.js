/**
 * @author 徐晨 xu chen ( xuchen@smartisan.com )
 * @description template-manager.js
 * @name ctCompile
 * @class 模板引擎
 * @constructor
 * @extends jQuery
 */

import {mainConfig} from './config.js';
import {filter} from './filter.js';

// 代码压缩时 window.ctCaches 赋值所有的模板文件
window.ctCaches = window.ctCaches || {};

const reg = {
    template: /\<script id=\"([^\"]+)\"[^\>]*\>([\s\S]*?)\<\/script\>/gi,
    include: /\{\{[^{]{0}\binclude\b\s+([^\s\}]+)\s*\}\}/,
    each: /([^\(\s\,]+)\,\s*([^\)\s\,]+)/,
    openTag: '{{',
    openTagString: '{{',
    closeTag: '}}',
    closeTagString: '}}'
};

const config = {
    compress : true,
    escape : true,
    debug : false
};

const isNewEngine = ''.trim;// '__proto__' in {}
const arrOutCode = isNewEngine
             ? ['$out="";', '$out+=', ';', '$out']
             : ['$out=[];', '$out.push(', ');', '$out.join("")'];

// 静态分析模板变量
const KEYWORDS =
    // 关键字
    'break,case,catch,continue,debugger,default,delete,do,else,false'
    + ',finally,for,function,if,in,instanceof,new,null,return,switch,this'
    + ',throw,true,try,typeof,var,void,while,with'

    // 保留字
    + ',abstract,boolean,byte,char,class,const,double,enum,export,extends'
    + ',final,float,goto,implements,import,int,interface,long,native'
    + ',package,private,protected,public,short,static,super,synchronized'
    + ',throws,transient,volatile'

    // ECMA 5 - use strict
    + ',arguments,let,yield'

    + ',undefined';

const REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g;
const SPLIT_RE = /[^\w$]+/g;
const KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
const NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
const BOUNDARY_RE = /^,+|,+$/g;
const SPLIT2_RE = /^$|,+/;

const escapeMap = {
    "<": "&#60;",
    ">": "&#62;",
    '"': "&#34;",
    "'": "&#39;",
    "&": "&#38;"
};

let caches = {};


let escapeFn = function (s) {
    return escapeMap[s];
};


let escapeHTML = function (content) {
    return toString(content)
    .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
};

let toString = function (value, type) {

    if (typeof value !== 'string') {

        type = typeof value;
        if (type === 'number') {
            value += '';
        } else if (type === 'function') {
            value = toString(value.call(value));
        } else {
            value = '';
        }
    }

    return value;

};

class ParseTemplate {
    /**
     * @author 徐晨 
     * @name ParseTemplate
     * @class 整理模板
     * @constructor
     * @param {String}     template    模板字符串 
     * @param {Bollean}    debug       是否执行 debug 模式 
     */
    constructor(template, debug = config.debug) {

        var self = this;

        self.debug = debug;
        
        self.uniq = {
            $data : true,
            $utils : true,
            $filters : true,
            $out : true,
            $line : 1,
            mainConfig : true
        };

        // self.filters = filter;

        self.line = 1;

        self.code = '';

        let headerCode = '\'use strict\';'
                       + 'var $utils=$utils,$filters=$utils.$filters,$uis=$utils.$uis,mainConfig=$utils.$mainConfig,'
                       + (debug ? '$line=0,' : '');

        let mainCode = arrOutCode[0];

        let footerCode = 'return new String(' + arrOutCode[3] + ');';

         // 插入动态模板
        template = self.include(template);

        self.template = template;

        var __arrSplitOpen = template.split(reg.openTag);

        var _parseResult;

        $.each(__arrSplitOpen, function (index, splitClose) {

            splitClose = splitClose.split(reg.closeTag);

            var $0 = splitClose[0];
            var $1 = splitClose[1];

            if ( splitClose.length == 1 ) {
                mainCode += self.parseHtml( $0 );
            } else {

                _parseResult = self.parseCode($0, headerCode);

                mainCode += _parseResult.code;

                headerCode = _parseResult.headerCode;

                if ( $1 ) {
                    mainCode += self.parseHtml( $1 );
                }
            }

        });

        // console.log(headerCode);
        // console.log(mainCode);

        // headerCode = 'console.log($utils);' + headerCode;

        var code = headerCode + mainCode + footerCode;

        // console.log('\n=====================================================================');
        // console.log(code);
        // console.log('=====================================================================\n');

        self.code = code;

        return self;
    }

    /**
     * 嵌入动态模板
     * @param  {String}    template    模板名称
     * @return {String}                动态模板
     */
    include (template) {
        template = template.replace(reg.include, function ($0, $1) {

            let dynamicTemp = ct.get($1, true);

            if ( dynamicTemp ) {
                return dynamicTemp;
            } else {
                return ' ';        
            }
        });

        if ( reg.include.test(template) ) {
            return this.include(template);
        }

        return template;
    }

    /**
     * 编译模板
     */
    compile () {

        let code = this.code;

        // 调试语句
        if (this.debug) {
            code = 'try{' + code + '}catch(e){'
            +       'throw {'
            +           'name:"Render Error",'
            +           'message:e.message,'
            +           'line:$line,'
            +           'source:' + this.formatCode(this.template)
            +           '.split(/\\n/)[$line-1].replace(/^\\s+/,"")'
            +       '};'
            + '}';
        }

        try {
            
            var Render = new Function('$data', '$utils', code);
            Render.prototype = ct.utils;

            return Render;
            
        } catch (e) {

            if ( typeof console == 'object' ) {
                console.log(e);
                console.log(code);
            }

            throw new Error('{Template Error}');

        }
    }

    /**
     * 整理  html
     * @param  {String}    code    模板字符串
     * @return {String}            生成匿名函数的内部代码
     */
    parseHtml (code) {

        this.line += code.split(/\n/).length - 1;

        // 压缩多余空白与注释
        if (config.compress) {
            code = code
            .replace(/\s+/g, ' ')
            .replace(/<!--[\w\W]*?-->/g, '');
        }
        
        if (code) {
            code = arrOutCode[1] + this.formatCode(code) + arrOutCode[2] + '\n';
        }

        return code;
    }

    /**
     * 字符串转义
     * @param  {String}    code   模板代码
     * @return {String}    生成匿名函数的内部代码
     */
    formatCode (code) {
        return "'" + code
        // 单引号与反斜杠转义
        .replace(/('|\\)/g, '\\$1')
        // 换行符转义(windows + linux)
        .replace(/\r/g, '\\r')
        .replace(/\n/g, '\\n') + "'";
    }

    /**
     * 整理 被替换的数据
     * @param  {String}  code   数据代码
     * @return {String}  生成匿名函数的内部代码
     */
    parseCode (code, headerCode) {

        var self = this;

        var thisLine = self.line;

        // 语法转换插件钩子
        if (self.parseMedth) {
            code = self.parseMedth(code);
        }

        if (self.debug) {

            // console.log(code);

            // 记录行号
            code = code.replace(/\n/g, function () {
                self.line++;
                return '$line=' + self.line +  ';';
            });
            
        }


        if ( /^=+/.test(code) ) {

            var escapeSyntax = escape && !/^=[=#]/.test(code);

            code = code.replace(/^=[=#]?|[\s;]*$/g, '');

            // 对内容编码
            if (escapeSyntax) {

                var name = code.replace(/\s*\([^\)]+\)/, '');

                // 排除 utils.* | include | print
                
                if (!ct.utils[name]) {
                    code = '$escape(' + code + ')';
                }

            // 不编码
            } else {
                code = '$string(' + code + ')';
            }

            code = arrOutCode[1] + code + arrOutCode[2];
        }

        if (self.debug) {
            code = '$line=' + thisLine + ';' + code;
        }

        // console.log(code);

        var splitCode = self.getVariable(code);

        // console.log(splitCode);

        // 提取模板中的变量名
        $.each(splitCode, function (index, name) {

            // name 值可能为空，在安卓低版本浏览器下
            if (!name || self.uniq[name]) {
                return;
            }

            var value;

            // 声明模板变量
            // 赋值优先级:
            // utils > uis > filters > data
            if (ct.utils[name]) {
                value = '$utils.' + name;
            // } else if (uis[name]) {
                // value = '$uis.' + name;
            } else if (filter[name]) {
                value = '$filters.' + name;
            } else {
                value = '$data.' + name;
            }
            
            headerCode += name + '=' + value + ',';
            self.uniq[name] = true;
            
            
        });

        return {
            code : (code + '\n'),
            headerCode : headerCode
        };
    }

    /**
     * 整理 过滤器的代码
     * @name ctCompile#formatFilter
     * @event
     * @param  {String} [val]    需要运算的变量
     * @param  {String} [term]   过滤器的方法及参数
     * @return {String} 返回过滤器的使用代码
     */
    formatFilter (val, term) {
        var parts = term.split(':');
        var name = parts.shift();
        var args = parts.join(',') || '';

        if ( !filter[name] ) {
            throw new Error('filter method "' + name + '" is not exist !!');
        }

        if (args) {
            args = ', ' + args;
        }

        return '$filters.' + name + '(' + val + args + ')';
    }

    /**
     * 整理 ui 组件的代码
     * @name ctCompile#formatUI
     * @event
     * @param  {String} [code]   数据代码
     * @return {String} 生成匿名函数的内部代码
     */
    formatUI (ui) {
        var splitUI = ui.split('\:');
        var name = splitUI.shift();
        var args = splitUI.join(',') || '';

        if ( !uis[name] ) {
            throw new Error('ui method "' + name + '" is not exist !!');
        }

        return '$uis.' + name + '(' + args + ')';
    }

    /**
     * 整理 执行方法
     * @name ctCompile#parseMedth
     * @event
     * @param  {String} [code]   数据代码
     * @return {String} 生成匿名函数的内部代码
     */
    parseMedth (code) {
        // console.log(code);

        var self = this;

        code = code.replace(/^\s/, '');

        var params = code.split(' ');
        var key = params.shift();
        var args = params.join(' ');

        // console.log(code);

        switch (key) {
            case 'each':

                var argEach = args.split(' in ');

                var object = argEach[1] || '$data';

                var paramMatch = argEach[0].match(reg.each);

                var value, index;

                if ( !!paramMatch ) {
                    index = paramMatch[1];
                    value = paramMatch[2];
                } else {
                    index = '$index';
                    value = argEach[0];
                }
                
                var paramEach   = index + ', ' + value;
                
                if (argEach.length != 2) {
                    throw new Error('method "each" error not has in');
                }

                code =  '$each(' + object + ', function(' + paramEach + '){';
            break;

            case '/each':
                code = '});';
            break;

            case 'if':
                code = 'if (' + args + ') {';
            break;

            case 'else':
                
                if (params.shift() === 'if') {
                    params = ' if (' + params.join(' ') + ') ';
                } else {
                    params = '';
                }

                code = '} else ' + params + '{';
            break;

            case '/if':
                code = '}';
            break;

            case 'ui':

                // console.log(args);
                
                if ( args ) {
                    // console.log(code);

                    // console.log(self.formatUI(args));

                    code = '=#' + self.formatUI(args);
                } else {
                    code = '=' + code;
                }

            break;

            default:

                // code = arrOutCode[1] + code + arrOutCode[2];
                // 过滤器（辅助方法）
                // {{value | filterA:'abcd' | filterB}}
                // >>> $helpers.filterB($helpers.filterA(value, 'abcd'))
                // TODO: {{ddd||aaa}} 不包含空格
                if (/\s*\|\s+[\w\$]/.test(args)) {

                    var escape = true;

                    // {{#value | link}}
                    if (code.indexOf('#') === 0) {
                        code = code.substr(1);
                        escape = false;
                    }

                    var i = 0;
                    var array = code.split(/\s+\|\s+/);
                    var len = array.length;
                    var val = array[i++];

                    // console.log('\n=====================================================================');
                    // console.log(code + '\n' + key + '\n' + args + '\n');
                    // console.log(i);
                    // console.log(val);
                    // console.log(array);
                    // console.log('=====================================================================\n');

                    for (; i < len; i ++) {
                        val = self.formatFilter(val, array[i]);
                    }

                    code = (escape ? '=' : '=#') + val;

                // 内容直接输出 {{value}}
                } else {

                    // console.log('parseMedth:key ==> ' + key);

                    code = $.trim(code);

                    // if ( /\s+/.test(code) ) {
                    //     throw new Error('"' + reg.openTagString + code + reg.closeTagString + '" is error template');
                    // }

                    code = '=' + code;
                }
            break;
        }

        return code;    
    }

    /**
     * 获取变量
     * @name ctCompile#parseMedth
     * @event
     * @param  {String} [code]   数据代码
     * @return {String} 生成匿名函数的内部代码
     */
    getVariable (code) {

        // console.log('\n===========================================================================');

        // console.log( code );
        // console.log( code.replace(REMOVE_RE, '') );

        // console.log(
        //     code
        //         .replace(REMOVE_RE, '')
        //         .replace(SPLIT_RE, ',')
        // );

        // console.log(
        //     code
        //         .replace(REMOVE_RE, '')
        //         .replace(SPLIT_RE, ',')
        //         .replace(KEYWORDS_RE, '')
        // );

        // console.log(
        //     code
        //         .replace(REMOVE_RE, '')
        //         .replace(SPLIT_RE, ',')
        //         .replace(KEYWORDS_RE, '')
        //         .replace(NUMBER_RE, '')
        // );  

        // console.log(
        //     code
        //         .replace(REMOVE_RE, '')
        //         .replace(SPLIT_RE, ',')
        //         .replace(KEYWORDS_RE, '')
        //         .replace(NUMBER_RE, '')
        //         .replace(BOUNDARY_RE, '')
        // );  

        // console.log(
        //     code
        //         .replace(REMOVE_RE, '')
        //         .replace(SPLIT_RE, ',')
        //         .replace(KEYWORDS_RE, '')
        //         .replace(NUMBER_RE, '')
        //         .replace(BOUNDARY_RE, '')
        //         .split(SPLIT2_RE)
        // );

        // console.log('===========================================================================\n');


        return code
        .replace(REMOVE_RE, '')
        .replace(SPLIT_RE, ',')
        .replace(KEYWORDS_RE, '')
        .replace(NUMBER_RE, '')
        .replace(BOUNDARY_RE, '')
        .split(SPLIT2_RE);
    };
}

/**
 * 模板引擎
 * @author 徐晨 
 * @constructor
 */
function ctCompile () {

    this.utils = {
        $filters : filter,
        $string : toString,
        $escape : escapeHTML,
        $each : function (arrayData, fn) {
            if ( arrayData ) {
                $.each(arrayData, fn);
            } else {
                return '';
            }
        },
        $mainConfig : mainConfig
    };

    this.cacheCompile = {};

}

/**
 * 渲染模板
 * @name    template.compile
 * @param   {String}    模板
 * @param   {Object}    数据
 * @return  {String}    渲染好的字符串
 */
ctCompile.prototype.compile = function (source, model, useModel) {
    var self = this;

    if ( !self.cacheCompile[source] ) {
        var compileTemplate = new ParseTemplate(source);

        self.cacheCompile[source] = compileTemplate.compile();
    // console.log(self.cacheCompile[source]);
    }


    try {

        var result = self.cacheCompile[source](model, self.utils) + '';

        if ( useModel ) {
            return $(result).data('model', model);
        } else {
            return result;
        }

    } catch (e) {

        // 使用 debug 模式重新编译，查看渲染时的详细错误
        try {
            var compileDebug = new ParseTemplate(source, true),
                sourceDebug = compileDebug.compile();

            sourceDebug(model, self.utils) + '';
        } catch (error) {

            error.source = sourceDebug;

            var message = 'Template Error\n\n';

            for (var name in error) {
                message += '<' + name + '>\n' + error[name] + '\n\n';
            }
            
            if (typeof console === 'object') {
                console.error(message);
            }
        }

    }

};

ctCompile.prototype.get = function(id, isStatic) {
    var self = this;

    // Can we find this template in the cache?
    if (window.ctCaches[id] || caches[id] || isStatic) {
        var __template = window.ctCaches[id] || caches[id];

        // Yes? OK, lets call our callback function and return.
        // return callback(templates[id]);
        
        return ( isStatic ? __template : $.Deferred().resolve(__template).promise() );
    }

    // Otherwise, lets load it up. We'll build our URL based on the ID passed in.
    var url = 'tpl/' + id + '.html?' + TIMESTAMP;

    // And use a handy jQuery library called Traffic Cop to handle marshalling 
    // requests to the server. This will prevent multiple concurrent requests 
    // for the same resource.
    var promise = $.get(url);

    // Wire up a handler for this request via jQuery's promise API
    return promise.then(
        function (template) {

            // `template` is a string of HTML loaded via `$.ajax`. So here, we 
            // can take the opportunity to pre-compile it for performance. When we 
            // pre-compile a template, it returns a function that we can store in our 
            // cache for future use.
            // var tmp = self.compile(template, model);
            
            // 谨慎命名，避免冲突
            caches[id] = self.setTemplate(template);

            return caches[id];
        },
        function () {
            throw new Error( 'template page "' + id + '" is not exist !!' );
        }
    );
};

ctCompile.prototype.setTemplate = function(str) {

    str = str.replace(reg.template, function ($0, $1, $2) {
        caches[$1] = $2;

        return ' ';
    });

    return str;
};

let ct = new ctCompile();

window.ct = ct;
