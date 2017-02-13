// PV 检测
var isMobileTerminal = /iphone|android|ucweb|ucbrowser|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase());
MLTrackerz = {
    mid: isMobileTerminal ? 251581 : 251572,
    ers: [{ "type": "pageview" }],
    track: function (er) {
        this.ers.push(er);
    } 
};
(function (){
  var js = document.createElement("script"), scri = document.getElementsByTagName("script")[0];
  js.type = "text/javascript";
  js.async = true;
  scri.parentNode.insertBefore(js, scri);
  js.src = location.protocol == "https:" ? "https://secure.mlt01.com/mltz.js" : "http://static.mlt01.com/mltz.js";
})();


// 百度统计
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?482e5a238e881dd62851ca123d8b11f3";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

// Google Analytics
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-49819160-1', 'smartisan.com');
ga('send', 'pageview');
