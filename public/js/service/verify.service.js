/**
* @fileOverview verify.service.js 文件操作
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-08-22
* @update：2016-08-22
*/

class Verify {
    /**
     * @author 徐晨
     * @name Verify
     * @class Verify Serive
     * @constructor
     */
    constructor() {
        this.init();

        this.mapDelayTime = {};
    }

     init () {
         this.verifyConfig = {
             notNull : {
                 reg : /[^\s|.]/,
                 withName : true,
                 msg : '必填'
             },
             required : {
                 reg : /[^\s|.]/,
                 withName : true,
                 msg : '必填'
             },
             linkRequired : {
                 withName : true,
                 msg : '必填'
             },
             number : {
                 reg : /^\d+$/,
                 msg : '只能是数字'
             },
             numOrEn : {
                 reg : /^[0-9a-zA-Z]+$/,
                 msg : '只能是英文或者数字'
             },
             errorStr : {
                 reg : /^[^\&\<\>]*$/,
                 msg : '包含非法字符'
             },
             maxlength : {
                 msg : '过长'
             },
             email : {
                 reg : /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
                 msg : '邮箱格式错误'
             },
             nullOrEmail : {
                 reg : /^.{0}$|^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
                 msg : '邮箱格式错误'
             },
             mobile : {
                 reg : /^1[3|4|5|7|8]\d{9}$/,
                 msg : '手机号格式错误'
             },
             username : {
                 reg : /^1[3|4|5|7|8]\d{9}$|^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
                 msg : '邮箱/手机号格式错误'
             },
             password : {
                 reg : /^[\w\\\[\]\:\^\-~!@#$%&*()-+={}|;'",.\/<>?]{6,16}$/,
                 msg : '密码格式错误'
             },
             nullOrMobile : {
                 reg : /^.{0}$|^1[3|4|5|7|8]\d{9}$/,
                 msg : '手机号码格式错误'
             },
             zip : {
                 reg : /^\d{6}$/,
                 msg : '邮编格式错误'
             },
             api : {
                 reg : /^[\da-zA-Z\/\-.?=!]+$/,
                 msg : 'API 格式错误'
             },
             nullOrTelephoneArea : {
                 reg : /^.{0}$|^0\d{2,3}$/,
                 msg : '格式错误'
             },
             nullOrTelephone : {
                 reg : /^.{0}$|^\d{6,8}$/,
                 msg : '格式错误'
             },
             notExist : {
                 withName : true,
                 msg : '不存在'
             },
             strRange : {
                 msg : "字符串非法或过长"  //strRange,{1-2}
             },
             json : {
                 msg : "非法 JSON 格式"
             },
             ajax : {
                 msg : "已存在"
             },
             price : {
                 reg : /^\d+(\.\d{1,2})?$/,
                 msg : '格式错误'
             },
             max : {
                 msg : '超过最大值'
             },
             imei : {
                 reg : /^\d{14,15}$/,
                 msg : '格式错误'
             }
         };
     };

     /**
      * 验证条件：被验证数据为普通字符串且在{n-m}字数范围中 例:strRange,{100-200}
      * @param {String} val 被验证数据
      * @param {String} msg 错误信息
      * @param {jQuery Object} dom 被验证jQuery Object
      * @param {String} range 范围值
      * @return {Object} { result : true|false, msg : msg };
      */
     strRange (val, msg, dom, range){
         var self = this,
             strMin = range.split("-")[0],
             strMax = range.split("-")[1],
             _reg = new RegExp('^[\\S\\.\\s]{' + strMin + ',' + strMax + '}$'),
             _msg = (strMin == 0 ? 1 : strMin) + '~' + strMax + '个字符';
         if( _reg.test(val) ) {
             return { result : true, msg : _msg };
         } else {
             return { result : false, msg : _msg };
         }
     }

     /**
      * 验证条件：被验证数据为普通字符串且小等于{max} 例:max,{200}
      * @param {String} val 被验证数据
      * @param {String} msg 错误信息
      * @param {jQuery Object} dom 被验证jQuery Object
      * @param {String} range 范围值
      * @return {Object} { result : true|false, msg : msg };
      */
     max (val, msg, dom, range){
         var self = this,
             val = val | 0,
             range = range | 0;

         if( val <= range ) {
             return { result : true, msg : msg };
         } else {
             return { result : false, msg : msg };
         }
     }

     /**
      * 验证条件：被验证数据为 JSON 格式 例:json
      * @param {String} val 被验证数据
      * @param {String} msg 错误信息
      * @param {jQuery Object} dom 被验证jQuery Object
      * @param {String} range 范围值
      * @return {Object} { result : true|false, msg : msg };
      */
     json (val, msg, dom, range){
         var self = this,
             flag = true;

         try {
             JSON.parse(val);
         }
         catch (e) {
             flag = false;
         }

         return { result : flag, msg : msg };
     }

     /**
      * 延迟输入
      * @author 徐晨 ( xuchen@smartisan.com )
      */
      delayInput (id, callback) {
          let time = +(new Date());

          if ( !this.mapDelayTime[id] ) {
              this.mapDelayTime[id] = [];
          }

          this.mapDelayTime[id].push(time);

          setTimeout(() => {
              if ( time == this.mapDelayTime[id][this.mapDelayTime[id].length - 1] ) {
                  Store.isFunction(callback) && callback();
              }
          }, 300);
      }
}

let VerifyService = new Verify();

export { VerifyService };
