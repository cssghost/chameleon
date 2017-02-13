webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	module.exports = __webpack_require__(23);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Copyright (c) 2005 - 2010, James Auldridge
	 * All rights reserved.
	 *
	 * Licensed under the BSD, MIT, and GPL (your choice!) Licenses:
	 *  http://code.google.com/p/cookies/wiki/License
	 *
	 */
	var jaaulde = window.jaaulde || {};
	jaaulde.utils = jaaulde.utils || {};
	jaaulde.utils.cookies = function () {
		var resolveOptions,
		    assembleOptionsString,
		    parseCookies,
		    constructor,
		    defaultOptions = {
			expiresAt: null,
			path: '/',
			domain: null,
			secure: false
		};
		/**
	 * resolveOptions - receive an options object and ensure all options are present and valid, replacing with defaults where necessary
	 *
	 * @access private
	 * @static
	 * @parameter Object options - optional options to start with
	 * @return Object complete and valid options object
	 */
		resolveOptions = function resolveOptions(options) {
			var returnValue, expireDate;

			if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object' || options === null) {
				returnValue = defaultOptions;
			} else {
				returnValue = {
					expiresAt: defaultOptions.expiresAt,
					path: defaultOptions.path,
					domain: defaultOptions.domain,
					secure: defaultOptions.secure
				};

				if (_typeof(options.expiresAt) === 'object' && options.expiresAt instanceof Date) {
					returnValue.expiresAt = options.expiresAt;
				} else if (typeof options.hoursToLive === 'number' && options.hoursToLive !== 0) {
					expireDate = new Date();
					expireDate.setTime(expireDate.getTime() + options.hoursToLive * 60 * 60 * 1000);
					returnValue.expiresAt = expireDate;
				}

				if (typeof options.path === 'string' && options.path !== '') {
					returnValue.path = options.path;
				}

				if (typeof options.domain === 'string' && options.domain !== '') {
					returnValue.domain = options.domain;
				}

				if (options.secure === true) {
					returnValue.secure = options.secure;
				}
			}

			return returnValue;
		};
		/**
	 * assembleOptionsString - analyze options and assemble appropriate string for setting a cookie with those options
	 *
	 * @access private
	 * @static
	 * @parameter options OBJECT - optional options to start with
	 * @return STRING - complete and valid cookie setting options
	 */
		assembleOptionsString = function assembleOptionsString(options) {
			options = resolveOptions(options);

			return (_typeof(options.expiresAt) === 'object' && options.expiresAt instanceof Date ? '; expires=' + options.expiresAt.toGMTString() : '') + '; path=' + options.path + (typeof options.domain === 'string' ? '; domain=' + options.domain : '') + (options.secure === true ? '; secure' : '');
		};
		/**
	 * parseCookies - retrieve document.cookie string and break it into a hash with values decoded and unserialized
	 *
	 * @access private
	 * @static
	 * @return OBJECT - hash of cookies from document.cookie
	 */
		parseCookies = function parseCookies() {
			var cookies = {},
			    i,
			    pair,
			    name,
			    value,
			    separated = document.cookie.split(';'),
			    unparsedValue;
			for (i = 0; i < separated.length; i = i + 1) {
				pair = separated[i].split('=');
				name = pair[0].replace(/^\s*/, '').replace(/\s*$/, '');

				try {
					value = decodeURIComponent(pair[1]);
				} catch (e1) {
					value = pair[1];
				}

				if ((typeof JSON === 'undefined' ? 'undefined' : _typeof(JSON)) === 'object' && JSON !== null && typeof JSON.parse === 'function') {
					try {
						unparsedValue = value;
						value = JSON.parse(value);
					} catch (e2) {
						value = unparsedValue;
					}
				}

				cookies[name] = value;
			}
			return cookies;
		};

		constructor = function constructor() {};

		/**
	  * get - get one, several, or all cookies
	  *
	  * @access public
	  * @paramater Mixed cookieName - String:name of single cookie; Array:list of multiple cookie names; Void (no param):if you want all cookies
	  * @return Mixed - Value of cookie as set; Null:if only one cookie is requested and is not found; Object:hash of multiple or all cookies (if multiple or all requested);
	  */
		constructor.prototype.get = function (cookieName) {
			var returnValue,
			    item,
			    cookies = parseCookies();

			if (typeof cookieName === 'string') {
				returnValue = typeof cookies[cookieName] !== 'undefined' ? cookies[cookieName] : null;
			} else if ((typeof cookieName === 'undefined' ? 'undefined' : _typeof(cookieName)) === 'object' && cookieName !== null) {
				returnValue = {};
				for (item in cookieName) {
					if (typeof cookies[cookieName[item]] !== 'undefined') {
						returnValue[cookieName[item]] = cookies[cookieName[item]];
					} else {
						returnValue[cookieName[item]] = null;
					}
				}
			} else {
				returnValue = cookies;
			}

			return returnValue;
		};
		/**
	  * filter - get array of cookies whose names match the provided RegExp
	  *
	  * @access public
	  * @paramater Object RegExp - The regular expression to match against cookie names
	  * @return Mixed - Object:hash of cookies whose names match the RegExp
	  */
		constructor.prototype.filter = function (cookieNameRegExp) {
			var cookieName,
			    returnValue = {},
			    cookies = parseCookies();

			if (typeof cookieNameRegExp === 'string') {
				cookieNameRegExp = new RegExp(cookieNameRegExp);
			}

			for (cookieName in cookies) {
				if (cookieName.match(cookieNameRegExp)) {
					returnValue[cookieName] = cookies[cookieName];
				}
			}

			return returnValue;
		};
		/**
	  * set - set or delete a cookie with desired options
	  *
	  * @access public
	  * @paramater String cookieName - name of cookie to set
	  * @paramater Mixed value - Any JS value. If not a string, will be JSON encoded; NULL to delete
	  * @paramater Object options - optional list of cookie options to specify
	  * @return void
	  */
		constructor.prototype.set = function (cookieName, value, options) {
			if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object' || options === null) {
				options = {};
			}

			if (typeof value === 'undefined' || value === null) {
				value = '';
				options.hoursToLive = -8760;
			} else if (typeof value !== 'string') {
				if ((typeof JSON === 'undefined' ? 'undefined' : _typeof(JSON)) === 'object' && JSON !== null && typeof JSON.stringify === 'function') {
					value = JSON.stringify(value);
				} else {
					throw new Error('cookies.set() received non-string value and could not serialize.');
				}
			}

			var optionsString = assembleOptionsString(options);

			document.cookie = cookieName + '=' + encodeURIComponent(value) + optionsString;
		};
		/**
	  * del - delete a cookie (domain and path options must match those with which the cookie was set; this is really an alias for set() with parameters simplified for this use)
	  *
	  * @access public
	  * @paramater MIxed cookieName - String name of cookie to delete, or Bool true to delete all
	  * @paramater Object options - optional list of cookie options to specify ( path, domain )
	  * @return void
	  */
		constructor.prototype.del = function (cookieName, options) {
			var allCookies = {},
			    name;

			if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object' || options === null) {
				options = {};
			}

			if (typeof cookieName === 'boolean' && cookieName === true) {
				allCookies = this.get();
			} else if (typeof cookieName === 'string') {
				allCookies[cookieName] = true;
			}

			for (name in allCookies) {
				if (typeof name === 'string' && name !== '') {
					this.set(name, null, options);
				}
			}
		};
		/**
	  * test - test whether the browser is accepting cookies
	  *
	  * @access public
	  * @return Boolean
	  */
		constructor.prototype.test = function () {
			var returnValue = false,
			    testName = 'cT',
			    testValue = 'data';

			this.set(testName, testValue);

			if (this.get(testName) === testValue) {
				this.del(testName);
				returnValue = true;
			}

			return returnValue;
		};
		/**
	  * setOptions - set default options for calls to cookie methods
	  *
	  * @access public
	  * @param Object options - list of cookie options to specify
	  * @return void
	  */
		constructor.prototype.setOptions = function (options) {
			if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
				options = null;
			}

			defaultOptions = resolveOptions(options);
		};

		return new constructor();
	}();

	(function () {
		if (__webpack_provided_window_dot_jQuery) {
			(function ($) {
				$.cookies = jaaulde.utils.cookies;

				var extensions = {
					/**
	    * $( 'selector' ).cookify - set the value of an input field, or the innerHTML of an element, to a cookie by the name or id of the field or element
	    *                           (field or element MUST have name or id attribute)
	    *
	    * @access public
	    * @param options OBJECT - list of cookie options to specify
	    * @return jQuery
	    */
					cookify: function cookify(options) {
						return this.each(function () {
							var i,
							    nameAttrs = ['name', 'id'],
							    name,
							    $this = $(this),
							    value;

							for (i in nameAttrs) {
								if (!isNaN(i)) {
									name = $this.attr(nameAttrs[i]);
									if (typeof name === 'string' && name !== '') {
										if ($this.is(':checkbox, :radio')) {
											if ($this.attr('checked')) {
												value = $this.val();
											}
										} else if ($this.is(':input')) {
											value = $this.val();
										} else {
											value = $this.html();
										}

										if (typeof value !== 'string' || value === '') {
											value = null;
										}

										$.cookies.set(name, value, options);

										break;
									}
								}
							}
						});
					},
					/**
	    * $( 'selector' ).cookieFill - set the value of an input field or the innerHTML of an element from a cookie by the name or id of the field or element
	    *
	    * @access public
	    * @return jQuery
	    */
					cookieFill: function cookieFill() {
						return this.each(function () {
							var n,
							    getN,
							    nameAttrs = ['name', 'id'],
							    name,
							    $this = $(this),
							    value;

							getN = function getN() {
								n = nameAttrs.pop();
								return !!n;
							};

							while (getN()) {
								name = $this.attr(n);
								if (typeof name === 'string' && name !== '') {
									value = $.cookies.get(name);
									if (value !== null) {
										if ($this.is(':checkbox, :radio')) {
											if ($this.val() === value) {
												$this.attr('checked', 'checked');
											} else {
												$this.removeAttr('checked');
											}
										} else if ($this.is(':input')) {
											$this.val(value);
										} else {
											$this.html(value);
										}
									}

									break;
								}
							}
						});
					},
					/**
	    * $( 'selector' ).cookieBind - call cookie fill on matching elements, and bind their change events to cookify()
	    *
	    * @access public
	    * @param options OBJECT - list of cookie options to specify
	    * @return jQuery
	    */
					cookieBind: function cookieBind(options) {
						return this.each(function () {
							var $this = $(this);
							$this.cookieFill().change(function () {
								$this.cookify(options);
							});
						});
					}
				};

				$.each(extensions, function (i) {
					$.fn[i] = this;
				});
			})(__webpack_provided_window_dot_jQuery);
		}
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*!
	 * modernizr v3.3.1
	 * Build http://modernizr.com/download?-canvas-cssanimations-csscalc-csstransitions-fontface-history-opacity-setclasses-dontmin
	 *
	 * Copyright (c)
	 *  Faruk Ates
	 *  Paul Irish
	 *  Alex Sexton
	 *  Ryan Seddon
	 *  Patrick Kettner
	 *  Stu Cox
	 *  Richard Herrera

	 * MIT License
	 */

	/*
	 * Modernizr tests which native CSS3 and HTML5 features are available in the
	 * current UA and makes the results available to you in two ways: as properties on
	 * a global `Modernizr` object, and as classes on the `<html>` element. This
	 * information allows you to progressively enhance your pages with a granular level
	 * of control over the experience.
	*/

	;(function (window, document, undefined) {
	  var classes = [];

	  var tests = [];

	  /**
	   *
	   * ModernizrProto is the constructor for Modernizr
	   *
	   * @class
	   * @access public
	   */

	  var ModernizrProto = {
	    // The current version, dummy
	    _version: '3.3.1',

	    // Any settings that don't work as separate modules
	    // can go in here as configuration.
	    _config: {
	      'classPrefix': '',
	      'enableClasses': true,
	      'enableJSClass': true,
	      'usePrefixes': true
	    },

	    // Queue of tests
	    _q: [],

	    // Stub these for people who are listening
	    on: function on(test, cb) {
	      // I don't really think people should do this, but we can
	      // safe guard it a bit.
	      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
	      // This is in case people listen to synchronous tests. I would leave it out,
	      // but the code to *disallow* sync tests in the real version of this
	      // function is actually larger than this.
	      var self = this;
	      setTimeout(function () {
	        cb(self[test]);
	      }, 0);
	    },

	    addTest: function addTest(name, fn, options) {
	      tests.push({ name: name, fn: fn, options: options });
	    },

	    addAsyncTest: function addAsyncTest(fn) {
	      tests.push({ name: null, fn: fn });
	    }
	  };

	  // Fake some of Object.create so we can force non test results to be non "own" properties.
	  var Modernizr = function Modernizr() {};
	  Modernizr.prototype = ModernizrProto;

	  // Leak modernizr globally when you `require` it rather than force it here.
	  // Overwrite name so constructor name is nicer :D
	  Modernizr = new Modernizr();

	  /*!
	  {
	    "name": "History API",
	    "property": "history",
	    "caniuse": "history",
	    "tags": ["history"],
	    "authors": ["Hay Kranen", "Alexander Farkas"],
	    "notes": [{
	      "name": "W3C Spec",
	      "href": "https://www.w3.org/TR/html51/browsers.html#the-history-interface"
	    }, {
	      "name": "MDN documentation",
	      "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.history"
	    }],
	    "polyfills": ["historyjs", "html5historyapi"]
	  }
	  !*/
	  /* DOC
	  Detects support for the History API for manipulating the browser session history.
	  */

	  Modernizr.addTest('history', function () {
	    // Issue #733
	    // The stock browser on Android 2.2 & 2.3, and 4.0.x returns positive on history support
	    // Unfortunately support is really buggy and there is no clean way to detect
	    // these bugs, so we fall back to a user agent sniff :(
	    var ua = navigator.userAgent;

	    // We only want Android 2 and 4.0, stock browser, and not Chrome which identifies
	    // itself as 'Mobile Safari' as well, nor Windows Phone (issue #1471).
	    if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	      return false;
	    }

	    // Return the regular check
	    return window.history && 'pushState' in window.history;
	  });

	  /**
	   * is returns a boolean if the typeof an obj is exactly type.
	   *
	   * @access private
	   * @function is
	   * @param {*} obj - A thing we want to check the type of
	   * @param {string} type - A string to compare the typeof against
	   * @returns {boolean}
	   */

	  function is(obj, type) {
	    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === type;
	  }
	  ;

	  /**
	   * Run through all tests and detect their support in the current UA.
	   *
	   * @access private
	   */

	  function testRunner() {
	    var featureNames;
	    var feature;
	    var aliasIdx;
	    var result;
	    var nameIdx;
	    var featureName;
	    var featureNameSplit;

	    for (var featureIdx in tests) {
	      if (tests.hasOwnProperty(featureIdx)) {
	        featureNames = [];
	        feature = tests[featureIdx];
	        // run the test, throw the return value into the Modernizr,
	        // then based on that boolean, define an appropriate className
	        // and push it into an array of classes we'll join later.
	        //
	        // If there is no name, it's an 'async' test that is run,
	        // but not directly added to the object. That should
	        // be done with a post-run addTest call.
	        if (feature.name) {
	          featureNames.push(feature.name.toLowerCase());

	          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
	            // Add all the aliases into the names list
	            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
	              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
	            }
	          }
	        }

	        // Run the test, or use the raw value if it's not a function
	        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;

	        // Set each of the names on the Modernizr object
	        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
	          featureName = featureNames[nameIdx];
	          // Support dot properties as sub tests. We don't do checking to make sure
	          // that the implied parent tests have been added. You must call them in
	          // order (either in the test, or make the parent test a dependency).
	          //
	          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
	          // hashtag famous last words
	          featureNameSplit = featureName.split('.');

	          if (featureNameSplit.length === 1) {
	            Modernizr[featureNameSplit[0]] = result;
	          } else {
	            // cast to a Boolean, if not one already
	            /* jshint -W053 */
	            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
	              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
	            }

	            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
	          }

	          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
	        }
	      }
	    }
	  }
	  ;

	  /**
	   * docElement is a convenience wrapper to grab the root element of the document
	   *
	   * @access private
	   * @returns {HTMLElement|SVGElement} The root element of the document
	   */

	  var docElement = document.documentElement;

	  /**
	   * A convenience helper to check if the document we are running in is an SVG document
	   *
	   * @access private
	   * @returns {boolean}
	   */

	  var isSVG = docElement.nodeName.toLowerCase() === 'svg';

	  /**
	   * setClasses takes an array of class names and adds them to the root element
	   *
	   * @access private
	   * @function setClasses
	   * @param {string[]} classes - Array of class names
	   */

	  // Pass in an and array of class names, e.g.:
	  //  ['no-webp', 'borderradius', ...]
	  function setClasses(classes) {
	    var className = docElement.className;
	    var classPrefix = Modernizr._config.classPrefix || '';

	    if (isSVG) {
	      className = className.baseVal;
	    }

	    // Change `no-js` to `js` (independently of the `enableClasses` option)
	    // Handle classPrefix on this too
	    if (Modernizr._config.enableJSClass) {
	      var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
	      className = className.replace(reJS, '$1' + classPrefix + 'js$2');
	    }

	    if (Modernizr._config.enableClasses) {
	      // Add the new classes
	      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
	      isSVG ? docElement.className.baseVal = className : docElement.className = className;
	    }
	  }

	  ;

	  /**
	   * createElement is a convenience wrapper around document.createElement. Since we
	   * use createElement all over the place, this allows for (slightly) smaller code
	   * as well as abstracting away issues with creating elements in contexts other than
	   * HTML documents (e.g. SVG documents).
	   *
	   * @access private
	   * @function createElement
	   * @returns {HTMLElement|SVGElement} An HTML or SVG element
	   */

	  function createElement() {
	    if (typeof document.createElement !== 'function') {
	      // This is the case in IE7, where the type of createElement is "object".
	      // For this reason, we cannot call apply() as Object is not a Function.
	      return document.createElement(arguments[0]);
	    } else if (isSVG) {
	      return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
	    } else {
	      return document.createElement.apply(document, arguments);
	    }
	  }

	  ;
	  /*!
	  {
	    "name": "Canvas",
	    "property": "canvas",
	    "caniuse": "canvas",
	    "tags": ["canvas", "graphics"],
	    "polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
	  }
	  !*/
	  /* DOC
	  Detects support for the `<canvas>` element for 2D drawing.
	  */

	  // On the S60 and BB Storm, getContext exists, but always returns undefined
	  // so we actually have to call getContext() to verify
	  // github.com/Modernizr/Modernizr/issues/issue/97/
	  Modernizr.addTest('canvas', function () {
	    var elem = createElement('canvas');
	    return !!(elem.getContext && elem.getContext('2d'));
	  });

	  /**
	   * List of property values to set for css tests. See ticket #21
	   * http://git.io/vUGl4
	   *
	   * @memberof Modernizr
	   * @name Modernizr._prefixes
	   * @optionName Modernizr._prefixes
	   * @optionProp prefixes
	   * @access public
	   * @example
	   *
	   * Modernizr._prefixes is the internal list of prefixes that we test against
	   * inside of things like [prefixed](#modernizr-prefixed) and [prefixedCSS](#-code-modernizr-prefixedcss). It is simply
	   * an array of kebab-case vendor prefixes you can use within your code.
	   *
	   * Some common use cases include
	   *
	   * Generating all possible prefixed version of a CSS property
	   * ```js
	   * var rule = Modernizr._prefixes.join('transform: rotate(20deg); ');
	   *
	   * rule === 'transform: rotate(20deg); webkit-transform: rotate(20deg); moz-transform: rotate(20deg); o-transform: rotate(20deg); ms-transform: rotate(20deg);'
	   * ```
	   *
	   * Generating all possible prefixed version of a CSS value
	   * ```js
	   * rule = 'display:' +  Modernizr._prefixes.join('flex; display:') + 'flex';
	   *
	   * rule === 'display:flex; display:-webkit-flex; display:-moz-flex; display:-o-flex; display:-ms-flex; display:flex'
	   * ```
	   */

	  // we use ['',''] rather than an empty array in order to allow a pattern of .`join()`ing prefixes to test
	  // values in feature detects to continue to work
	  var prefixes = ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', ''];

	  // expose these for the plugin API. Look in the source for how to join() them against your input
	  ModernizrProto._prefixes = prefixes;

	  /*!
	  {
	    "name": "CSS Calc",
	    "property": "csscalc",
	    "caniuse": "calc",
	    "tags": ["css"],
	    "builderAliases": ["css_calc"],
	    "authors": ["@calvein"]
	  }
	  !*/
	  /* DOC
	  Method of allowing calculated values for length units. For example:
	  
	  ```css
	  //lem {
	    width: calc(100% - 3em);
	  }
	  ```
	  */

	  Modernizr.addTest('csscalc', function () {
	    var prop = 'width:';
	    var value = 'calc(10px);';
	    var el = createElement('a');

	    el.style.cssText = prop + prefixes.join(value + prop);

	    return !!el.style.length;
	  });

	  /*!
	  {
	    "name": "CSS Opacity",
	    "caniuse": "css-opacity",
	    "property": "opacity",
	    "tags": ["css"]
	  }
	  !*/

	  // Browsers that actually have CSS Opacity implemented have done so
	  // according to spec, which means their return values are within the
	  // range of [0.0,1.0] - including the leading zero.

	  Modernizr.addTest('opacity', function () {
	    var style = createElement('a').style;
	    style.cssText = prefixes.join('opacity:.55;');

	    // The non-literal . in this regex is intentional:
	    // German Chrome returns this value as 0,55
	    // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
	    return (/^0.55$/.test(style.opacity)
	    );
	  });

	  /**
	   * getBody returns the body of a document, or an element that can stand in for
	   * the body if a real body does not exist
	   *
	   * @access private
	   * @function getBody
	   * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
	   * artificially created element that stands in for the body
	   */

	  function getBody() {
	    // After page load injecting a fake body doesn't work so check if body exists
	    var body = document.body;

	    if (!body) {
	      // Can't use the real body create a fake one.
	      body = createElement(isSVG ? 'svg' : 'body');
	      body.fake = true;
	    }

	    return body;
	  }

	  ;

	  /**
	   * injectElementWithStyles injects an element with style element and some CSS rules
	   *
	   * @access private
	   * @function injectElementWithStyles
	   * @param {string} rule - String representing a css rule
	   * @param {function} callback - A function that is used to test the injected element
	   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
	   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
	   * @returns {boolean}
	   */

	  function injectElementWithStyles(rule, callback, nodes, testnames) {
	    var mod = 'modernizr';
	    var style;
	    var ret;
	    var node;
	    var docOverflow;
	    var div = createElement('div');
	    var body = getBody();

	    if (parseInt(nodes, 10)) {
	      // In order not to give false positives we create a node for each test
	      // This also allows the method to scale for unspecified uses
	      while (nodes--) {
	        node = createElement('div');
	        node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
	        div.appendChild(node);
	      }
	    }

	    style = createElement('style');
	    style.type = 'text/css';
	    style.id = 's' + mod;

	    // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
	    // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
	    (!body.fake ? div : body).appendChild(style);
	    body.appendChild(div);

	    if (style.styleSheet) {
	      style.styleSheet.cssText = rule;
	    } else {
	      style.appendChild(document.createTextNode(rule));
	    }
	    div.id = mod;

	    if (body.fake) {
	      //avoid crashing IE8, if background image is used
	      body.style.background = '';
	      //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
	      body.style.overflow = 'hidden';
	      docOverflow = docElement.style.overflow;
	      docElement.style.overflow = 'hidden';
	      docElement.appendChild(body);
	    }

	    ret = callback(div, rule);
	    // If this is done after page load we don't want to remove the body so check if body exists
	    if (body.fake) {
	      body.parentNode.removeChild(body);
	      docElement.style.overflow = docOverflow;
	      // Trigger layout so kinetic scrolling isn't disabled in iOS6+
	      docElement.offsetHeight;
	    } else {
	      div.parentNode.removeChild(div);
	    }

	    return !!ret;
	  }

	  ;

	  /**
	   * testStyles injects an element with style element and some CSS rules
	   *
	   * @memberof Modernizr
	   * @name Modernizr.testStyles
	   * @optionName Modernizr.testStyles()
	   * @optionProp testStyles
	   * @access public
	   * @function testStyles
	   * @param {string} rule - String representing a css rule
	   * @param {function} callback - A function that is used to test the injected element
	   * @param {number} [nodes] - An integer representing the number of additional nodes you want injected
	   * @param {string[]} [testnames] - An array of strings that are used as ids for the additional nodes
	   * @returns {boolean}
	   * @example
	   *
	   * `Modernizr.testStyles` takes a CSS rule and injects it onto the current page
	   * along with (possibly multiple) DOM elements. This lets you check for features
	   * that can not be detected by simply checking the [IDL](https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Interface_development_guide/IDL_interface_rules).
	   *
	   * ```js
	   * Modernizr.testStyles('#modernizr { width: 9px; color: papayawhip; }', function(elem, rule) {
	   *   // elem is the first DOM node in the page (by default #modernizr)
	   *   // rule is the first argument you supplied - the CSS rule in string form
	   *
	   *   addTest('widthworks', elem.style.width === '9px')
	   * });
	   * ```
	   *
	   * If your test requires multiple nodes, you can include a third argument
	   * indicating how many additional div elements to include on the page. The
	   * additional nodes are injected as children of the `elem` that is returned as
	   * the first argument to the callback.
	   *
	   * ```js
	   * Modernizr.testStyles('#modernizr {width: 1px}; #modernizr2 {width: 2px}', function(elem) {
	   *   document.getElementById('modernizr').style.width === '1px'; // true
	   *   document.getElementById('modernizr2').style.width === '2px'; // true
	   *   elem.firstChild === document.getElementById('modernizr2'); // true
	   * }, 1);
	   * ```
	   *
	   * By default, all of the additional elements have an ID of `modernizr[n]`, where
	   * `n` is its index (e.g. the first additional, second overall is `#modernizr2`,
	   * the second additional is `#modernizr3`, etc.).
	   * If you want to have more meaningful IDs for your function, you can provide
	   * them as the fourth argument, as an array of strings
	   *
	   * ```js
	   * Modernizr.testStyles('#foo {width: 10px}; #bar {height: 20px}', function(elem) {
	   *   elem.firstChild === document.getElementById('foo'); // true
	   *   elem.lastChild === document.getElementById('bar'); // true
	   * }, 2, ['foo', 'bar']);
	   * ```
	   *
	   */

	  var testStyles = ModernizrProto.testStyles = injectElementWithStyles;

	  /*!
	  {
	    "name": "@font-face",
	    "property": "fontface",
	    "authors": ["Diego Perini", "Mat Marquis"],
	    "tags": ["css"],
	    "knownBugs": [
	      "False Positive: WebOS https://github.com/Modernizr/Modernizr/issues/342",
	      "False Postive: WP7 https://github.com/Modernizr/Modernizr/issues/538"
	    ],
	    "notes": [{
	      "name": "@font-face detection routine by Diego Perini",
	      "href": "http://javascript.nwbox.com/CSSSupport/"
	    },{
	      "name": "Filament Group @font-face compatibility research",
	      "href": "https://docs.google.com/presentation/d/1n4NyG4uPRjAA8zn_pSQ_Ket0RhcWC6QlZ6LMjKeECo0/edit#slide=id.p"
	    },{
	      "name": "Filament Grunticon/@font-face device testing results",
	      "href": "https://docs.google.com/spreadsheet/ccc?key=0Ag5_yGvxpINRdHFYeUJPNnZMWUZKR2ItMEpRTXZPdUE#gid=0"
	    },{
	      "name": "CSS fonts on Android",
	      "href": "https://stackoverflow.com/questions/3200069/css-fonts-on-android"
	    },{
	      "name": "@font-face and Android",
	      "href": "http://archivist.incutio.com/viewlist/css-discuss/115960"
	    }]
	  }
	  !*/

	  var blacklist = function () {
	    var ua = navigator.userAgent;
	    var wkvers = ua.match(/applewebkit\/([0-9]+)/gi) && parseFloat(RegExp.$1);
	    var webos = ua.match(/w(eb)?osbrowser/gi);
	    var wppre8 = ua.match(/windows phone/gi) && ua.match(/iemobile\/([0-9])+/gi) && parseFloat(RegExp.$1) >= 9;
	    var oldandroid = wkvers < 533 && ua.match(/android/gi);
	    return webos || oldandroid || wppre8;
	  }();
	  if (blacklist) {
	    Modernizr.addTest('fontface', false);
	  } else {
	    testStyles('@font-face {font-family:"font";src:url("https://")}', function (node, rule) {
	      var style = document.getElementById('smodernizr');
	      var sheet = style.sheet || style.styleSheet;
	      var cssText = sheet ? sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '' : '';
	      var bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
	      Modernizr.addTest('fontface', bool);
	    });
	  }
	  ;

	  /**
	   * If the browsers follow the spec, then they would expose vendor-specific style as:
	   *   elem.style.WebkitBorderRadius
	   * instead of something like the following, which would be technically incorrect:
	   *   elem.style.webkitBorderRadius
	    * Webkit ghosts their properties in lowercase but Opera & Moz do not.
	   * Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
	   *   erik.eae.net/archives/2008/03/10/21.48.10/
	    * More here: github.com/Modernizr/Modernizr/issues/issue/21
	   *
	   * @access private
	   * @returns {string} The string representing the vendor-specific style properties
	   */

	  var omPrefixes = 'Moz O ms Webkit';

	  var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : [];
	  ModernizrProto._cssomPrefixes = cssomPrefixes;

	  /**
	   * List of JavaScript DOM values used for tests
	   *
	   * @memberof Modernizr
	   * @name Modernizr._domPrefixes
	   * @optionName Modernizr._domPrefixes
	   * @optionProp domPrefixes
	   * @access public
	   * @example
	   *
	   * Modernizr._domPrefixes is exactly the same as [_prefixes](#modernizr-_prefixes), but rather
	   * than kebab-case properties, all properties are their Capitalized variant
	   *
	   * ```js
	   * Modernizr._domPrefixes === [ "Moz", "O", "ms", "Webkit" ];
	   * ```
	   */

	  var domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : [];
	  ModernizrProto._domPrefixes = domPrefixes;

	  /**
	   * contains checks to see if a string contains another string
	   *
	   * @access private
	   * @function contains
	   * @param {string} str - The string we want to check for substrings
	   * @param {string} substr - The substring we want to search the first string for
	   * @returns {boolean}
	   */

	  function contains(str, substr) {
	    return !! ~('' + str).indexOf(substr);
	  }

	  ;

	  /**
	   * cssToDOM takes a kebab-case string and converts it to camelCase
	   * e.g. box-sizing -> boxSizing
	   *
	   * @access private
	   * @function cssToDOM
	   * @param {string} name - String name of kebab-case prop we want to convert
	   * @returns {string} The camelCase version of the supplied name
	   */

	  function cssToDOM(name) {
	    return name.replace(/([a-z])-([a-z])/g, function (str, m1, m2) {
	      return m1 + m2.toUpperCase();
	    }).replace(/^-/, '');
	  }
	  ;

	  /**
	   * fnBind is a super small [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) polyfill.
	   *
	   * @access private
	   * @function fnBind
	   * @param {function} fn - a function you want to change `this` reference to
	   * @param {object} that - the `this` you want to call the function with
	   * @returns {function} The wrapped version of the supplied function
	   */

	  function fnBind(fn, that) {
	    return function () {
	      return fn.apply(that, arguments);
	    };
	  }

	  ;

	  /**
	   * testDOMProps is a generic DOM property test; if a browser supports
	   *   a certain property, it won't return undefined for it.
	   *
	   * @access private
	   * @function testDOMProps
	   * @param {array.<string>} props - An array of properties to test for
	   * @param {object} obj - An object or Element you want to use to test the parameters again
	   * @param {boolean|object} elem - An Element to bind the property lookup again. Use `false` to prevent the check
	   */
	  function testDOMProps(props, obj, elem) {
	    var item;

	    for (var i in props) {
	      if (props[i] in obj) {

	        // return the property name as a string
	        if (elem === false) {
	          return props[i];
	        }

	        item = obj[props[i]];

	        // let's bind a function
	        if (is(item, 'function')) {
	          // bind to obj unless overriden
	          return fnBind(item, elem || obj);
	        }

	        // return the unbound function or obj or value
	        return item;
	      }
	    }
	    return false;
	  }

	  ;

	  /**
	   * Create our "modernizr" element that we do most feature tests on.
	   *
	   * @access private
	   */

	  var modElem = {
	    elem: createElement('modernizr')
	  };

	  // Clean up this element
	  Modernizr._q.push(function () {
	    delete modElem.elem;
	  });

	  var mStyle = {
	    style: modElem.elem.style
	  };

	  // kill ref for gc, must happen before mod.elem is removed, so we unshift on to
	  // the front of the queue.
	  Modernizr._q.unshift(function () {
	    delete mStyle.style;
	  });

	  /**
	   * domToCSS takes a camelCase string and converts it to kebab-case
	   * e.g. boxSizing -> box-sizing
	   *
	   * @access private
	   * @function domToCSS
	   * @param {string} name - String name of camelCase prop we want to convert
	   * @returns {string} The kebab-case version of the supplied name
	   */

	  function domToCSS(name) {
	    return name.replace(/([A-Z])/g, function (str, m1) {
	      return '-' + m1.toLowerCase();
	    }).replace(/^ms-/, '-ms-');
	  }
	  ;

	  /**
	   * nativeTestProps allows for us to use native feature detection functionality if available.
	   * some prefixed form, or false, in the case of an unsupported rule
	   *
	   * @access private
	   * @function nativeTestProps
	   * @param {array} props - An array of property names
	   * @param {string} value - A string representing the value we want to check via @supports
	   * @returns {boolean|undefined} A boolean when @supports exists, undefined otherwise
	   */

	  // Accepts a list of property names and a single value
	  // Returns `undefined` if native detection not available
	  function nativeTestProps(props, value) {
	    var i = props.length;
	    // Start with the JS API: http://www.w3.org/TR/css3-conditional/#the-css-interface
	    if ('CSS' in window && 'supports' in window.CSS) {
	      // Try every prefixed variant of the property
	      while (i--) {
	        if (window.CSS.supports(domToCSS(props[i]), value)) {
	          return true;
	        }
	      }
	      return false;
	    }
	    // Otherwise fall back to at-rule (for Opera 12.x)
	    else if ('CSSSupportsRule' in window) {
	        // Build a condition string for every prefixed variant
	        var conditionText = [];
	        while (i--) {
	          conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
	        }
	        conditionText = conditionText.join(' or ');
	        return injectElementWithStyles('@supports (' + conditionText + ') { #modernizr { position: absolute; } }', function (node) {
	          return getComputedStyle(node, null).position == 'absolute';
	        });
	      }
	    return undefined;
	  }
	  ;

	  // testProps is a generic CSS / DOM property test.

	  // In testing support for a given CSS property, it's legit to test:
	  //    `elem.style[styleName] !== undefined`
	  // If the property is supported it will return an empty string,
	  // if unsupported it will return undefined.

	  // We'll take advantage of this quick test and skip setting a style
	  // on our modernizr element, but instead just testing undefined vs
	  // empty string.

	  // Property names can be provided in either camelCase or kebab-case.

	  function testProps(props, prefixed, value, skipValueTest) {
	    skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;

	    // Try native detect first
	    if (!is(value, 'undefined')) {
	      var result = nativeTestProps(props, value);
	      if (!is(result, 'undefined')) {
	        return result;
	      }
	    }

	    // Otherwise do it properly
	    var afterInit, i, propsLength, prop, before;

	    // If we don't have a style element, that means we're running async or after
	    // the core tests, so we'll need to create our own elements to use

	    // inside of an SVG element, in certain browsers, the `style` element is only
	    // defined for valid tags. Therefore, if `modernizr` does not have one, we
	    // fall back to a less used element and hope for the best.
	    var elems = ['modernizr', 'tspan'];
	    while (!mStyle.style) {
	      afterInit = true;
	      mStyle.modElem = createElement(elems.shift());
	      mStyle.style = mStyle.modElem.style;
	    }

	    // Delete the objects if we created them.
	    function cleanElems() {
	      if (afterInit) {
	        delete mStyle.style;
	        delete mStyle.modElem;
	      }
	    }

	    propsLength = props.length;
	    for (i = 0; i < propsLength; i++) {
	      prop = props[i];
	      before = mStyle.style[prop];

	      if (contains(prop, '-')) {
	        prop = cssToDOM(prop);
	      }

	      if (mStyle.style[prop] !== undefined) {

	        // If value to test has been passed in, do a set-and-check test.
	        // 0 (integer) is a valid property value, so check that `value` isn't
	        // undefined, rather than just checking it's truthy.
	        if (!skipValueTest && !is(value, 'undefined')) {

	          // Needs a try catch block because of old IE. This is slow, but will
	          // be avoided in most cases because `skipValueTest` will be used.
	          try {
	            mStyle.style[prop] = value;
	          } catch (e) {}

	          // If the property value has changed, we assume the value used is
	          // supported. If `value` is empty string, it'll fail here (because
	          // it hasn't changed), which matches how browsers have implemented
	          // CSS.supports()
	          if (mStyle.style[prop] != before) {
	            cleanElems();
	            return prefixed == 'pfx' ? prop : true;
	          }
	        }
	        // Otherwise just return true, or the property name if this is a
	        // `prefixed()` call
	        else {
	            cleanElems();
	            return prefixed == 'pfx' ? prop : true;
	          }
	      }
	    }
	    cleanElems();
	    return false;
	  }

	  ;

	  /**
	   * testPropsAll tests a list of DOM properties we want to check against.
	   * We specify literally ALL possible (known and/or likely) properties on
	   * the element including the non-vendor prefixed one, for forward-
	   * compatibility.
	   *
	   * @access private
	   * @function testPropsAll
	   * @param {string} prop - A string of the property to test for
	   * @param {string|object} [prefixed] - An object to check the prefixed properties on. Use a string to skip
	   * @param {HTMLElement|SVGElement} [elem] - An element used to test the property and value against
	   * @param {string} [value] - A string of a css value
	   * @param {boolean} [skipValueTest] - An boolean representing if you want to test if value sticks when set
	   */
	  function testPropsAll(prop, prefixed, elem, value, skipValueTest) {

	    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
	        props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

	    // did they call .prefixed('boxSizing') or are we just testing a prop?
	    if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
	      return testProps(props, prefixed, value, skipValueTest);

	      // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
	    } else {
	        props = (prop + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
	        return testDOMProps(props, prefixed, elem);
	      }
	  }

	  // Modernizr.testAllProps() investigates whether a given style property,
	  // or any of its vendor-prefixed variants, is recognized
	  //
	  // Note that the property names must be provided in the camelCase variant.
	  // Modernizr.testAllProps('boxSizing')
	  ModernizrProto.testAllProps = testPropsAll;

	  /**
	   * testAllProps determines whether a given CSS property is supported in the browser
	   *
	   * @memberof Modernizr
	   * @name Modernizr.testAllProps
	   * @optionName Modernizr.testAllProps()
	   * @optionProp testAllProps
	   * @access public
	   * @function testAllProps
	   * @param {string} prop - String naming the property to test (either camelCase or kebab-case)
	   * @param {string} [value] - String of the value to test
	   * @param {boolean} [skipValueTest=false] - Whether to skip testing that the value is supported when using non-native detection
	   * @example
	   *
	   * testAllProps determines whether a given CSS property, in some prefixed form,
	   * is supported by the browser.
	   *
	   * ```js
	   * testAllProps('boxSizing')  // true
	   * ```
	   *
	   * It can optionally be given a CSS value in string form to test if a property
	   * value is valid
	   *
	   * ```js
	   * testAllProps('display', 'block') // true
	   * testAllProps('display', 'penguin') // false
	   * ```
	   *
	   * A boolean can be passed as a third parameter to skip the value check when
	   * native detection (@supports) isn't available.
	   *
	   * ```js
	   * testAllProps('shapeOutside', 'content-box', true);
	   * ```
	   */

	  function testAllProps(prop, value, skipValueTest) {
	    return testPropsAll(prop, undefined, undefined, value, skipValueTest);
	  }
	  ModernizrProto.testAllProps = testAllProps;

	  /*!
	  {
	    "name": "CSS Animations",
	    "property": "cssanimations",
	    "caniuse": "css-animation",
	    "polyfills": ["transformie", "csssandpaper"],
	    "tags": ["css"],
	    "warnings": ["Android < 4 will pass this test, but can only animate a single property at a time"],
	    "notes": [{
	      "name" : "Article: 'Dispelling the Android CSS animation myths'",
	      "href": "https://goo.gl/OGw5Gm"
	    }]
	  }
	  !*/
	  /* DOC
	  Detects whether or not elements can be animated using CSS
	  */

	  Modernizr.addTest('cssanimations', testAllProps('animationName', 'a', true));

	  /*!
	  {
	    "name": "CSS Transitions",
	    "property": "csstransitions",
	    "caniuse": "css-transitions",
	    "tags": ["css"]
	  }
	  !*/

	  Modernizr.addTest('csstransitions', testAllProps('transition', 'all', true));

	  // Run each test
	  testRunner();

	  // Remove the "no-js" class if it exists
	  setClasses(classes);

	  delete ModernizrProto.addTest;
	  delete ModernizrProto.addAsyncTest;

	  // Run the things that are supposed to run after the tests
	  for (var i = 0; i < Modernizr._q.length; i++) {
	    Modernizr._q[i]();
	  }

	  // Leak Modernizr namespace
	  window.Modernizr = Modernizr;

	  ;
	})(window, document);

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	/*
	 * Hamster.js v1.0.4
	 * (c) 2013 Monospaced http://monospaced.com
	 * License: MIT
	 */

	(function (window, document) {
	  'use strict';

	  /**
	   * Hamster
	   * use this to create instances
	   * @returns {Hamster.Instance}
	   * @constructor
	   */

	  var Hamster = function Hamster(element) {
	    return new Hamster.Instance(element);
	  };

	  // default event name
	  Hamster.SUPPORT = 'wheel';

	  // default DOM methods
	  Hamster.ADD_EVENT = 'addEventListener';
	  Hamster.REMOVE_EVENT = 'removeEventListener';
	  Hamster.PREFIX = '';

	  // until browser inconsistencies have been fixed...
	  Hamster.READY = false;

	  Hamster.Instance = function (element) {
	    if (!Hamster.READY) {
	      // fix browser inconsistencies
	      Hamster.normalise.browser();

	      // Hamster is ready...!
	      Hamster.READY = true;
	    }

	    this.element = element;

	    // store attached event handlers
	    this.handlers = [];

	    // return instance
	    return this;
	  };

	  /**
	   * create new hamster instance
	   * all methods should return the instance itself, so it is chainable.
	   * @param   {HTMLElement}       element
	   * @returns {Hamster.Instance}
	   * @constructor
	   */
	  Hamster.Instance.prototype = {
	    /**
	     * bind events to the instance
	     * @param   {Function}    handler
	     * @param   {Boolean}     useCapture
	     * @returns {Hamster.Instance}
	     */
	    wheel: function onEvent(handler, useCapture) {
	      Hamster.event.add(this, Hamster.SUPPORT, handler, useCapture);

	      // handle MozMousePixelScroll in older Firefox
	      if (Hamster.SUPPORT === 'DOMMouseScroll') {
	        Hamster.event.add(this, 'MozMousePixelScroll', handler, useCapture);
	      }

	      return this;
	    },

	    /**
	     * unbind events to the instance
	     * @param   {Function}    handler
	     * @param   {Boolean}     useCapture
	     * @returns {Hamster.Instance}
	     */
	    unwheel: function offEvent(handler, useCapture) {
	      // if no handler argument,
	      // unbind the last bound handler (if exists)
	      if (handler === undefined && (handler = this.handlers.slice(-1)[0])) {
	        handler = handler.original;
	      }

	      Hamster.event.remove(this, Hamster.SUPPORT, handler, useCapture);

	      // handle MozMousePixelScroll in older Firefox
	      if (Hamster.SUPPORT === 'DOMMouseScroll') {
	        Hamster.event.remove(this, 'MozMousePixelScroll', handler, useCapture);
	      }

	      return this;
	    }
	  };

	  Hamster.event = {
	    /**
	     * cross-browser 'addWheelListener'
	     * @param   {Instance}    hamster
	     * @param   {String}      eventName
	     * @param   {Function}    handler
	     * @param   {Boolean}     useCapture
	     */
	    add: function add(hamster, eventName, handler, useCapture) {
	      // store the original handler
	      var originalHandler = handler;

	      // redefine the handler
	      handler = function handler(originalEvent) {

	        if (!originalEvent) {
	          originalEvent = window.event;
	        }

	        // create a normalised event object,
	        // and normalise "deltas" of the mouse wheel
	        var event = Hamster.normalise.event(originalEvent),
	            delta = Hamster.normalise.delta(originalEvent);

	        // fire the original handler with normalised arguments
	        return originalHandler(event, delta[0], delta[1], delta[2]);
	      };

	      // cross-browser addEventListener
	      hamster.element[Hamster.ADD_EVENT](Hamster.PREFIX + eventName, handler, useCapture || false);

	      // store original and normalised handlers on the instance
	      hamster.handlers.push({
	        original: originalHandler,
	        normalised: handler
	      });
	    },

	    /**
	     * removeWheelListener
	     * @param   {Instance}    hamster
	     * @param   {String}      eventName
	     * @param   {Function}    handler
	     * @param   {Boolean}     useCapture
	     */
	    remove: function remove(hamster, eventName, handler, useCapture) {
	      // find the normalised handler on the instance
	      var originalHandler = handler,
	          lookup = {},
	          handlers;
	      for (var i = 0, len = hamster.handlers.length; i < len; ++i) {
	        lookup[hamster.handlers[i].original] = hamster.handlers[i];
	      }
	      handlers = lookup[originalHandler];
	      handler = handlers.normalised;

	      // cross-browser removeEventListener
	      hamster.element[Hamster.REMOVE_EVENT](Hamster.PREFIX + eventName, handler, useCapture || false);

	      // remove original and normalised handlers from the instance
	      for (var h in hamster.handlers) {
	        if (hamster.handlers[h] == handlers) {
	          hamster.handlers.splice(h, 1);
	          break;
	        }
	      }
	    }
	  };

	  /**
	   * these hold the lowest deltas,
	   * used to normalise the delta values
	   * @type {Number}
	   */
	  var lowestDelta, lowestDeltaXY;

	  Hamster.normalise = {
	    /**
	     * fix browser inconsistencies
	     */
	    browser: function normaliseBrowser() {
	      // detect deprecated wheel events
	      if (!('onwheel' in document || document.documentMode >= 9)) {
	        Hamster.SUPPORT = document.onmousewheel !== undefined ? 'mousewheel' : // webkit and IE < 9 support at least "mousewheel"
	        'DOMMouseScroll'; // assume remaining browsers are older Firefox
	      }

	      // detect deprecated event model
	      if (!window.addEventListener) {
	        // assume IE < 9
	        Hamster.ADD_EVENT = 'attachEvent';
	        Hamster.REMOVE_EVENT = 'detachEvent';
	        Hamster.PREFIX = 'on';
	      }
	    },

	    /**
	     * create a normalised event object
	     * @param   {Function}    originalEvent
	     * @returns {Object}      event
	     */
	    event: function normaliseEvent(originalEvent) {
	      var event = Hamster.SUPPORT === 'wheel' ? originalEvent : {
	        // keep a reference to the original event object
	        originalEvent: originalEvent,
	        target: originalEvent.target || originalEvent.srcElement,
	        type: 'wheel',
	        deltaMode: originalEvent.type === 'MozMousePixelScroll' ? 0 : 1,
	        deltaX: 0,
	        delatZ: 0,
	        preventDefault: function preventDefault() {
	          if (originalEvent.preventDefault) {
	            originalEvent.preventDefault();
	          } else {
	            originalEvent.returnValue = false;
	          }
	        },
	        stopPropagation: function stopPropagation() {
	          if (originalEvent.stopPropagation) {
	            originalEvent.stopPropagation();
	          } else {
	            originalEvent.cancelBubble = false;
	          }
	        }
	      };

	      // calculate deltaY (and deltaX) according to the event

	      // 'mousewheel'
	      if (originalEvent.wheelDelta) {
	        event.deltaY = -1 / 40 * originalEvent.wheelDelta;
	      }
	      // webkit
	      if (originalEvent.wheelDeltaX) {
	        event.deltaX = -1 / 40 * originalEvent.wheelDeltaX;
	      }

	      // 'DomMouseScroll'
	      if (originalEvent.detail) {
	        event.deltaY = originalEvent.detail;
	      }

	      return event;
	    },

	    /**
	     * normalise 'deltas' of the mouse wheel
	     * @param   {Function}    originalEvent
	     * @returns {Array}       deltas
	     */
	    delta: function normaliseDelta(originalEvent) {
	      var delta = 0,
	          deltaX = 0,
	          deltaY = 0,
	          absDelta = 0,
	          absDeltaXY = 0,
	          fn;

	      // normalise deltas according to the event

	      // 'wheel' event
	      if (originalEvent.deltaY) {
	        deltaY = originalEvent.deltaY * -1;
	        delta = deltaY;
	      }
	      if (originalEvent.deltaX) {
	        deltaX = originalEvent.deltaX;
	        delta = deltaX * -1;
	      }

	      // 'mousewheel' event
	      if (originalEvent.wheelDelta) {
	        delta = originalEvent.wheelDelta;
	      }
	      // webkit
	      if (originalEvent.wheelDeltaY) {
	        deltaY = originalEvent.wheelDeltaY;
	      }
	      if (originalEvent.wheelDeltaX) {
	        deltaX = originalEvent.wheelDeltaX * -1;
	      }

	      // 'DomMouseScroll' event
	      if (originalEvent.detail) {
	        delta = originalEvent.detail * -1;
	      }

	      // look for lowest delta to normalize the delta values
	      absDelta = Math.abs(delta);
	      if (!lowestDelta || absDelta < lowestDelta) {
	        lowestDelta = absDelta;
	      }
	      absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
	      if (!lowestDeltaXY || absDeltaXY < lowestDeltaXY) {
	        lowestDeltaXY = absDeltaXY;
	      }

	      // convert deltas to whole numbers
	      fn = delta > 0 ? 'floor' : 'ceil';
	      delta = Math[fn](delta / lowestDelta);
	      deltaX = Math[fn](deltaX / lowestDeltaXY);
	      deltaY = Math[fn](deltaY / lowestDeltaXY);

	      return [delta, deltaX, deltaY];
	    }
	  };

	  // Expose Hamster to the global object
	  window.Hamster = Hamster;

	  // requireJS module definition
	  if (typeof window.define === 'function' && window.define.amd) {
	    window.define('hamster', [], function () {
	      return Hamster;
	    });
	  }
	})(window, window.document);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery, Backbone) {/** 
	* @fileOverview storeApp.js 公共模块框架
	* @author XuChen(xuchen@smartisan.com)
	* @date：2014-5-19
	* @update：2014-7-10
	* @version 0.1 
	*/
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function ($) {
	    /**
	     * @author 徐晨 
	     * @name StoreApp
	     * @class 公共模块框架
	     * @constructor
	     * @extends jQuery
	     * @since version 0.1 
	     */
	    function StoreApp() {
	        var self = this;
	        // I am a unique ID of this application instance. NOTE: not currently used.
	        self.id = "app-" + new Date().getTime();

	        // I am the collection of controllers. All controllers are intended to be
	        // singleton instances.
	        self.pageReady = null;

	        // I am the collection of models. I can contain either cached singleton
	        // instances or class definitions (to be instantiated at request).
	        self.models = {
	            cache: {},
	            classes: {},
	            keeps: {}
	        };

	        // I am the collection of models. I can contain either cached singleton
	        // instances or class definitions (to be instantiated at request).
	        self.services = {
	            cache: {},
	            classes: {},
	            keeps: {}
	        };

	        // I am the collection of views. I can contain either cached singleton
	        // instances of class definitions (to be instantiated at request).
	        self.views = {
	            cache: {},
	            classes: {},
	            keeps: {}
	        };

	        // I am the collection of collections. I can contain either cached singleton
	        // instances of class definitions (to be instantiated at request).
	        self.collections = {
	            cache: {},
	            classes: {},
	            keeps: {}
	        };

	        // I am the collection of plugin. I can contain either cached singleton
	        // instances of class definitions (to be instantiated at request).
	        self.plugins = {
	            cache: {},
	            classes: {},
	            keeps: {}
	        };

	        self.modelCaches = {};

	        self.receptor = {};

	        self.configs = {
	            base: {},
	            custom: {}
	        };

	        self.filters = {
	            cache: []
	        };

	        self.uis = {
	            cache: []
	        };

	        self.Router = {};

	        // this.locationEvent = null;

	        // I bind myself (THIS) to the change event on the hash.
	        // $( this ).bind( "locationchange", this.proxyCallback( this.onLocationChange ) );

	        // I am a flag to determine if the application has already started running.
	        // I will determine if action is delayed or executed immediately when controllers
	        // are registered.
	        self.isRunning = false;

	        // custom init
	        self.config = {};
	        self.customConfig = {};
	        self.baseTemplate = {};
	        self.cachePage = {};
	        self.currentView = {};
	        self.reloadView = function () {};
	        self.filter = {};
	        self.ui = {};

	        // setInterval 的对象 map, 在切换页面时先清除所有计时器事件
	        self.loop = {};
	    }

	    // I add a given cache of backbone to the given cache repository
	    StoreApp.prototype.addBBClass = function (className, target, value, useCache) {
	        var className = className;

	        if (target.classes[className]) {
	            throw new Error(className + ' is had !!');
	        }

	        target.classes[className] = value();

	        if (useCache) {
	            target.keeps[className] = true;
	        }
	    };

	    // I add a given class to the given cache or class repository.
	    StoreApp.prototype.addClass = function (className, target, value, cache) {
	        // Get the constructor of our value class.
	        var constructor = value.constructor;

	        var className = className;

	        // Check to see if this constructor is the Function object. If it is,
	        // then this is just a class, not an instance.

	        if (constructor == Function && !cache) {
	            // Cache the class constructor.
	            target.classes[className] = value;
	        } else {

	            // Cache the class constructor.
	            target.classes[className] = value.constructor;

	            // In addition to caching the class constructor, let's cache this instance
	            // of the given class itself (as it will act as a singleton).
	            target.cache[className] = value;

	            // Check to see if the application is running. If it is, then we need to initialize
	            // the singleton instance.
	            if (this.isRunning) {
	                this.initClass(value);
	            }
	        }
	    };

	    /**
	     * @name StoreApp#onPageReady
	     * @desc  add controller
	     * @event
	     * @param {Function} class
	     * @example window.Store.onPageReady((function( $, Store ){
	        function Controller() {}
	    
	        Controller.prototype.init = function(){};
	    
	        return( new Controller() );
	    
	    })( jQuery, window.Store ));
	     */
	    StoreApp.prototype.onPageReady = function (controller) {
	        this.pageReady = controller;
	    };

	    /**
	     * @name StoreApp#addModel
	     * @desc  add model
	     * @event
	     * @param {String} name
	     * @param {Function} class
	     * @example window.Store.addModel('Model', function( $, Store ){
	    
	        return Backbone.Model.extend({
	            defaults : {}
	        });
	    
	    });
	     */
	    StoreApp.prototype.addModel = function (className, model, useCache) {
	        this.addBBClass(className, this.models, model, useCache);
	    };

	    /**
	     * @name StoreApp#addCollection
	     * @desc  add collection
	     * @event
	     * @param {String} name
	     * @param {Function} class
	     * @example window.Store.addCollection('Collection', function( $, Store ){
	    
	        return Backbone.Model.extend({
	            defaults : {}
	        });
	    
	    });
	     */
	    StoreApp.prototype.addCollection = function (className, collection, useCache) {
	        this.addBBClass(className, this.collections, collection, useCache);
	    };

	    /**
	     * @name StoreApp#addService
	     * @desc  add service
	     * @event
	     * @param {String} name
	     * @param {Function} class
	     * @example window.Store.addService('Service', (function( $, Store ){
	        function Service() {}
	    
	        Service.prototype.init = function(){};
	    
	        return( new Service() );
	    
	    })( jQuery, window.Store ));
	     */
	    StoreApp.prototype.addService = function (className, service) {
	        this.addClass(className, this.services, service);
	    };

	    /**
	     * @name StoreApp#addView
	     * @desc  add view
	     * @event
	     * @param {String} name
	     * @param {Function} class
	     * @example window.Store.addView('View', (function( $, Store ){
	        function View() {}
	    
	        View.prototype.init = function(){};
	    
	        return( new View() );
	    
	    })( jQuery, window.Store ));
	     */
	    StoreApp.prototype.addView = function (className, view, useCache) {
	        this.addBBClass(className, this.views, view, useCache);
	    };

	    /**
	     * @name StoreApp#addPlugin
	     * @desc  add plugin
	     * @event
	     * @param {String} name
	     * @param {Function} class
	     * @example window.Store.addPlugin('UI', (function( $, Store ){
	        function UI() {}
	    
	        UI.prototype.init = function(){};
	    
	        return( new UI() );
	    
	    })( jQuery, window.Store ));
	     */

	    StoreApp.prototype.addPlugin = function (className, view) {
	        this.addClass(className, this.plugins, view);
	    };

	    // I return an cache or class with the given name from the given target.
	    StoreApp.prototype.getBBClass = function (target, className, initArguments) {
	        if (target.classes[className] === undefined) {
	            throw new Error(className + ' is not exist');
	            return {};
	        }

	        // Check to see if the instance is a cached singleton.
	        if (target.cache[className]) {
	            if (initArguments) {
	                if (true) {
	                    typeof target.cache[className].set == 'function' && target.cache[className].set(initArguments);
	                } else {
	                    target.cache[className] = new target.classes[className](initArguments);
	                }
	            }
	            return target.cache[className];
	        } else {
	            if (target.keeps[className]) {
	                var initArguments = initArguments || {};
	                target.cache[className] = new target.classes[className](initArguments);
	                return target.cache[className];
	            } else {
	                return target.classes[className];
	            }
	        }
	    };

	    // I return an instance of the class with the given name from the given target.
	    StoreApp.prototype.getClass = function (target, className, initArguments) {
	        // Check to see if the instance is a cached singleton.
	        if (target.cache[className]) {
	            initArguments = initArguments || {};
	            // This is a cached class - return the singleton.
	            if (initArguments.cache) {
	                if (!target.keeps[className]) {
	                    target.keeps[className] = new target.cache[className]();
	                }
	                return target.keeps[className];
	            } else {
	                return target.cache[className];
	            }
	        } else {
	            // This is not a cached class - return a new instance. In order to
	            // do that, we will have to create an instance of it and then
	            // initialize it with the given arguments.
	            if (target.classes[className] === undefined) {
	                return {};
	            }
	            var newInstance = new target.classes[className]() || {};

	            console.log(newInstance);

	            // Initialize the class, this time calling the constructor in the
	            // context of the class instance.
	            target.classes[className].apply(newInstance, initArguments);

	            // Return the new instance.
	            return newInstance;
	        }
	    };

	    /**
	     * @name StoreApp#getModel
	     * @desc  get model
	     * @event
	     * @param {String} name
	     * @param {arguments} initArguments
	     * @example var model = Store.getModel('Model');
	     */
	    StoreApp.prototype.getModel = function (className, initArguments) {
	        return this.getBBClass(this.models, className, initArguments);
	    };

	    /**
	     * @name StoreApp#getCollection
	     * @desc  get collection
	     * @event
	     * @param {String} name
	     * @param {arguments} initArguments
	     * @example var collection = Store.getCollection('Collection');
	     */
	    StoreApp.prototype.getCollection = function (className, initArguments) {
	        return this.getBBClass(this.collections, className, initArguments);
	    };

	    /**
	     * @name StoreApp#getService
	     * @desc  get service
	     * @event
	     * @param {String} name
	     * @param {arguments} initArguments
	     * @example var model = Store.getService('Model');
	     */
	    StoreApp.prototype.getService = function (className, initArguments) {
	        return this.getClass(this.services, className, initArguments);
	    };

	    /**
	     * @name StoreApp#getView
	     * @desc  get view
	     * @event
	     * @param {String} name
	     * @param {arguments} initArguments
	     * @example var view = Store.getView('View');
	     */
	    StoreApp.prototype.getView = function (className, initArguments) {
	        return this.getBBClass(this.views, className, initArguments);
	    };

	    /**
	     * @name StoreApp#getPlugin
	     * @desc  get plugin
	     * @event
	     * @param {String} name
	     * @param {arguments} initArguments
	     * @example var plugin = Store.getPlugin('Plugin');
	     */
	    StoreApp.prototype.getPlugin = function (className, initArguments) {
	        return this.getClass(this.plugins, className, initArguments);
	    };

	    // I initialize the given class instance.
	    StoreApp.prototype.initClass = function (instance) {
	        // Check to see if the target instance has an init method.
	        if (instance.init) {
	            // Invoke the init method.
	            instance.init();
	        }
	    };

	    // I intialize the given collection of class singletons.
	    StoreApp.prototype.initClasses = function (classes) {
	        var self = this;

	        // Loop over the given class collection - our singletons - and init them.
	        $.each(classes, function (index, instance) {
	            self.initClass(instance);
	        });
	    };

	    // I intialize the controllers. Once the application starts running and the
	    // DOM can be interacted with, I need to give the controllers a chance to
	    // get ready.
	    StoreApp.prototype.initPageRead = function () {
	        var self = this;
	        this.pageReady && this.pageReady($, self);
	    };

	    // I intialize the model. Once the application starts running and the
	    // DOM can be interacted with, I need to give the model a chance to
	    // get ready.
	    StoreApp.prototype.initModels = function () {
	        this.initClasses(this.models.cache);
	    };

	    // I intialize the model. Once the application starts running and the
	    // DOM can be interacted with, I need to give the model a chance to
	    // get ready.
	    StoreApp.prototype.initServices = function () {
	        this.initClasses(this.services.cache);
	    };

	    // I intialize the views. Once the application starts running and the
	    // DOM can be interacted with, I need to give the views a chance to
	    // get ready.
	    StoreApp.prototype.initViews = function () {
	        this.initClasses(this.views.cache);
	    };

	    // I intialize the plugins. Once the application starts running and the
	    // DOM can be interacted with, I need to give the plugins a chance to
	    // get ready.
	    StoreApp.prototype.initPlugins = function () {
	        this.initClasses(this.plugins.cache);
	    };

	    // I intialize the browser.
	    StoreApp.prototype.initBrowser = function () {
	        var config = this.config;
	        $('body').toggleClass('browser-ie', config.isIE);
	        $('body').toggleClass('browser-ie6', config.isIE6);
	        $('body').toggleClass('browser-hack-ie', config.isHackIE);
	        $('body').toggleClass('browser-normal-ie', config.isNormalIE);
	        $('body').toggleClass('browser-webkit', config.isWebkit);
	        $('body').toggleClass('browser-firefox', config.isFirefox);
	        $('body').toggleClass('browser-windows', config.isWindows);
	        $('body').toggleClass('browser-linux', config.isLinux);
	        $('body').toggleClass('browser-mac', config.isMac);
	    };

	    // I normalize a hash value for comparison.
	    StoreApp.prototype.normalizeHash = function (hash) {
	        // Strip off front hash and slashses as well as trailing slash. This will
	        // convert hash values like "#/section/" into "section".
	        return hash.replace(new RegExp("^[#/]+|/$", "g"), "");
	    };

	    // I normalize a JSON response from an AJAX call. This is because some languages
	    // (such as ColdFusion) are not case sensitive and do not have proper casing
	    // on their JSON translations. I will lowercase all keys.
	    StoreApp.prototype.normalizeJSON = function (object) {
	        var self = this;

	        // Check to see if this is an object that can be normalized.
	        if (typeof object == "boolean" || typeof object == "string" || typeof object == "number" || $.isFunction(object)) {

	            // This is a non-object, just return it's value.
	            return object;
	        }

	        // Check to see if this is an array.
	        if ($.isArray(object)) {

	            // Create an array into which the normalized data will be storeAppd.
	            var normalizedObject = [];

	            // Loop over the array value and moralize it's value.
	            $.each(object, function (index, value) {
	                normalizedObject[index] = self.normalizeJSON(value);
	            });
	        } else {

	            // Create an object into which the normalized data will be storeAppd.
	            var normalizedObject = {};

	            // Loop over the object key and moralize it's key and value.
	            $.each(object, function (key, value) {
	                normalizedObject[key.toLowerCase()] = self.normalizeJSON(value);
	            });
	        }

	        // Return the normalized object.
	        return normalizedObject;
	    };

	    // I create a proxy for the callback so that given callback executes in the
	    // context of the application object, overriding any context provided by the
	    // calling context.
	    StoreApp.prototype.proxyCallback = function (callback) {
	        var self = this;

	        // Return a proxy that will apply the callback in the THIS context.
	        return function () {
	            return callback.apply(self, arguments);
	        };
	    };

	    /**
	     * @name StoreApp#addConfig
	     * @description add config
	     * @event
	     * @param {String} configName  when isCustom is true
	     *                             you can git is by Store.customConfig[configName]
	     * @param {Json} value         config value
	     * @param {Bool} isCustom      is custom config
	     * @example
	    window.Store.addConfig( 'base', (function( $, Store ){
	        var __config = {}
	    
	        return __config;
	    
	    })( jQuery, window.Store ));
	     */
	    StoreApp.prototype.addConfig = function (configName, value, isCustom) {
	        var self = this;

	        if (isCustom) {
	            self.configs.custom[configName] = value;
	        } else {
	            self.configs.base[configName] = value;
	        }
	    };

	    /**
	     * @name initConfig
	     * @description init config
	     */
	    StoreApp.prototype.initConfig = function () {
	        var self = this;

	        self.getBaseConfig();

	        $.each(self.configs.base, function (key, value) {
	            $.extend(self.config, value);
	        });

	        $.each(self.configs.custom, function (key, value) {
	            self.customConfig[key] = value;
	        });

	        ct.setConfig(self.config);
	    };

	    /**
	     * @name StoreApp#addFilter
	     * @desc  add filter 通过克隆的方法添加筛选器
	     * @event
	     * @param {Function} class
	     * @example window.Store.addFilter( (function( $, Store ){
	        function Filter() {
	            var self = this;
	        };
	    
	        Filter.prototype.filterMedth = function(){};
	    
	        return Filter;
	        
	    })( jQuery, window.Store ));
	     */
	    StoreApp.prototype.addFilter = function (value) {
	        var self = this;

	        // 采用克隆原型链的方法定于筛选函数
	        value.constructor == Function && self.filters.cache.push(value);
	    };

	    /**
	     * @name StoreApp#addUI
	     * @desc  add filter 通过克隆的方法添加筛选器
	     * @event
	     * @param {Function} class
	     * @example window.Store.addUI( (function( $, Store ){
	        function UI() {
	            var self = this;
	        };
	    
	        UI.prototype.UIMedth = function(){};
	    
	        return UI;
	        
	    })( jQuery, window.Store ));
	     */
	    StoreApp.prototype.addUI = function (value) {
	        var self = this;

	        // 采用克隆原型链的方法定于筛选函数
	        value.constructor == Function && self.uis.cache.push(value);
	    };

	    /**
	     * @name initUI
	     * @description init ui
	     */
	    StoreApp.prototype.initUI = function () {
	        var self = this,
	            __UI = function __UI() {};

	        $.each(self.uis.cache, function (index, subClass) {
	            $.each(subClass.prototype, function (key, value) {
	                if (__UI.prototype[key]) {
	                    throw new Error('ui "' + key + '" is have !!');
	                } else {
	                    __UI.prototype[key] = value;
	                }
	            });
	        });

	        self.ui = new __UI();
	        ct.addUI(self.ui);
	    };

	    /**
	     * @name initFilter
	     * @description init filter
	     */
	    StoreApp.prototype.initFilter = function () {
	        var self = this,
	            __Filter = function __Filter() {
	            return this;
	        };

	        $.each(self.filters.cache, function (index, subClass) {
	            $.each(subClass.prototype, function (key, value) {
	                if (__Filter.prototype[key]) {
	                    throw new Error('filter "' + key + '" is have !!');
	                } else {
	                    __Filter.prototype[key] = value;
	                }
	            });
	        });

	        self.filter = new __Filter();
	        ct.addFilter(self.filter);
	    };

	    /**
	     * @name onEmit (测试阶段，未完成，暂时不能确定作用域是否正确)
	     * @description 添加推送事件
	     * @param {string} name 推送事件名称
	     * @param {function} fn 事件
	     */
	    StoreApp.prototype.onEmit = function (name, fn) {
	        var self = this;
	        self.receptor[name] = fn;
	    };

	    /**
	     * @name doEmit (测试阶段，未完成，暂时不能确定作用域是否正确)
	     * @description 执行相应推送事件
	     * @param {string} name 推送事件名称
	     * @param {object} arg 事件参数
	     */
	    StoreApp.prototype.doEmit = function (name, arg) {
	        var self = this;
	        typeof self.receptor[name] == 'function' && self.receptor[name](arg);
	    };

	    /**
	     * @name getBaseConfig
	     * @description init base config
	     */
	    StoreApp.prototype.getBaseConfig = function () {
	        var self = this;
	        var userAgent = navigator.userAgent.toLowerCase();
	        var __config = {
	            /**
	             * 基础dom 内容区
	             * @type jQuery dom
	             */
	            layoutContainer: $(document),
	            /**
	             * 基础page url
	             * @type String
	             */
	            commonTempUrl: 'base-template',
	            /**
	             * 基础page url
	             * @type String
	             */
	            pageUrl: '',
	            /**
	             * 基础ajax url
	             * @type String
	             */
	            ajaxUrl: '',
	            /**
	             * 公共Ajax错误信息map
	             * @type Object
	             * @default {}
	            */
	            errorMap: {},
	            /**
	             * 是否为IE浏览器
	             * @type Boolean
	             * @default {}
	            */
	            isIE: /msie/.test(userAgent),
	            /**
	             * 是否为IE6浏览器
	             * @type Boolean
	             * @default {}
	            */
	            isIE6: /msie 6/.test(userAgent),
	            /**
	             * 是否为IE浏览器 并且版本为7~8
	             * @type Boolean
	             * @default {}
	            */
	            isHackIE: /msie [7-8]/.test(userAgent),
	            /**
	             * 是否为webkit浏览器
	             * @type Boolean
	             * @default {}
	            */
	            isWebkit: /webkit/.test(userAgent),
	            /**
	             * 是否为firefox浏览器
	             * @type Boolean
	             * @default {}
	            */
	            isFirefox: /firefox/.test(userAgent),
	            /**
	             * 是否为 PC
	             * @type Boolean
	             * @default {}
	            */
	            isWindows: /windows/.test(userAgent),
	            /**
	             * 是否为 Linux
	             * @type Boolean
	             * @default {}
	            */
	            isLinux: /linux/.test(userAgent),
	            /**
	             * 是否为 Mac
	             * @type Boolean
	             * @default {}
	            */
	            isMac: /mac/.test(userAgent)
	        };
	        /**
	         * 是否为IE高版本浏览器 并且版本为9~11
	         * @type Boolean
	         * @default {}
	        */
	        __config.isNormalIE = __config.isIE && !__config.isIE6 && !__config.isHackIE;
	        self.config = __config;
	    };

	    /**
	     * @name StoreApp#ajax
	     * @desc  ajax
	     * @event
	     * @param {Object} options
	     * @param {String} options.url 发送请求的地址
	     * @param {String} options.type ["get" : "post"] 请求方式 默认为"post"
	     * @param {String} options.dataType 请求方式 默认为"json"
	     * @param {Function} options.success 请求结果为是的回调函数
	     * @param {Function} options.error 请求结果为否的回调函数
	     * @example 
	        return Store.ajax({
	            url : url,
	       [可选]type : type,
	       [可选]dataType : dataType,
	       [可选]data : data,
	       [可选]success : function (){},
	       [可选]error : function (){}
	     */
	    StoreApp.prototype.ajax = function (options) {
	        var self = this;

	        // Get the full range of settings.
	        var ajaxOptions = $.extend({
	            type: "post",
	            dataType: "json",
	            cache: false,
	            timeout: 10 * 1000,
	            complete: function complete(request, statusText) {}
	        }, options);

	        // If the data type is JSON init common fn
	        if (ajaxOptions.dataType == "json") {

	            // init base init
	            ajaxOptions.url = self.config.ajaxUrl + ajaxOptions.url;

	            // Proxy the success callback
	            var targetSuccess = options.success;

	            // Proxy the error callback
	            var targetError = options.error;

	            // clear custom fn
	            delete ajaxOptions.success;
	            delete ajaxOptions.error;

	            return $.ajax(ajaxOptions).then(function (response, statusText, defer) {
	                // console.log(self.getView('Dialog'));

	                // return success fn
	                if (response.code == 0) {
	                    var successResult = typeof targetSuccess == 'function' ? targetSuccess(response.data) : undefined;
	                    successResult = successResult === undefined ? response.data : successResult;
	                    return $.Deferred().resolve(successResult, response, defer).promise();
	                }
	                // return error fn
	                else {

	                        var msg = '未知错误',
	                            errorKey = '';

	                        if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) == 'object' && response.errInfo) {
	                            jQuery.each(response.errInfo, function (key, value) {
	                                errorKey = key;
	                                msg = value;
	                            });
	                        }

	                        var errorResult = typeof targetError == 'function' ? targetError(errorKey, msg, response) : undefined;

	                        // 需要自定义fail时在error函数中返回false,然后再fail函数中添加事件
	                        if (errorResult !== false) {
	                            errorResult = errorResult === undefined ? response.errInfo : errorResult;

	                            if (errorResult['1000']) {
	                                console.log('未登录');
	                            }

	                            // 公共信息处理

	                            // var DialogPlugin = self.getPlugin('Dialog');
	                            // var DialogUserLoginPlugin = self.getPlugin('DialogUserLogin');

	                            // if ( errorResult['1000'] && DialogUserLoginPlugin ) {
	                            //     DialogUserLoginPlugin.openLoginDialog();
	                            // } else {
	                            // 公共错误处理方法
	                            // if ( DialogPlugin ) {
	                            //     DialogView.message({
	                            //         message : msg
	                            //     });
	                            // } else {
	                            //      alert(msg);
	                            // }
	                            // }
	                        }
	                        return $.Deferred().reject(errorKey, msg, response, defer).promise();
	                    }
	            }, function (defer, status, statusText) {
	                switch (statusText) {
	                    case 'Not Found':
	                        // window.location.href = 'http://www.smartisan.com/#/error/' + 404;
	                        break;
	                    default:
	                        break;
	                }
	            });
	        }

	        // If the data type is JSONP init common fn
	        if (ajaxOptions.dataType == "jsonp") {
	            // document.domain = 'smartisan.com';
	            // $.support.cors = true;
	            var _arrData = [];

	            for (var k in ajaxOptions.data) {
	                _arrData.push('&data' + k + '=' + ajaxOptions.data[k]);
	            }

	            // ajaxOptions.dataType = "json";

	            // init base url and format data to url
	            ajaxOptions.url = self.config.secureUrl + ajaxOptions.url + _arrData.join('');

	            // Proxy the success callback
	            var targetSuccess = options.doSuccess;

	            // Proxy the error callback
	            var targetError = options.doError;

	            // clear custom fn and data
	            delete ajaxOptions.data;
	            delete ajaxOptions.doSuccess;
	            delete ajaxOptions.doError;

	            return $.ajax(ajaxOptions).then(function (response, statusText, defer) {
	                // return success fn
	                if (response.errno == 0) {
	                    var successResult = typeof targetSuccess == 'function' ? targetSuccess(response.data) : undefined;
	                    successResult = successResult === undefined ? response.data : successResult;
	                    return $.Deferred().resolve(successResult, response, defer).promise();
	                }
	                // return error fn
	                else {
	                        var msg = '未知错误',
	                            errorKey = '';

	                        errorKey = response.errno + '';

	                        msg = self.config.accountError[errorKey];
	                        // jsonp 的回执没有msg
	                        return $.Deferred().reject(errorKey, msg, response, defer).promise();
	                    }
	            }, function (defer, status, statusText) {
	                // if ( defer.status && (defer.status + '').match(/^4|5/) ) {
	                //     window.location.href = 'http://www.smartisan.com/#/error/' + defer.status;
	                // } else {
	                //     window.location.href = 'http://www.smartisan.com/#/error/' + 404;
	                // }
	            });
	        }

	        // Make the AJAX call not dataType is json.
	        return $.ajax(ajaxOptions);
	    };

	    // 已弃用
	    StoreApp.prototype.getPage = function (url) {
	        var self = this;

	        if (self.cachePage[url]) {
	            return $.Deferred().resolve(self.cachePage[url]).promise();
	        } else {
	            return self.ajax({
	                type: 'get',
	                url: url,
	                dataType: 'html'
	            }).then(function (result) {
	                self.cachePage[url] = result;
	                self.setTemplate(result);
	                return self.cachePage[url];
	            });
	        }
	    };

	    /**
	     * @name StoreApp#replaceUrl
	     * @description replace location href
	     * @event
	     * @param {String|Array}    key    key
	     * @param {String}          value    value
	     * @example
	     *     before: xxx.xxx.com/#/xxx/ccc
	            Store.replaceUrl('key', 'value');
	           after:  xxx.xxx.com/#/xxx/ccc?key=value
	     * @returns {json}      result     
	     * @returns {string}    result.base    
	     * @returns {string}    result.hash
	     */
	    StoreApp.prototype.replaceUrl = function (key, value) {
	        var self = this;

	        var url = Backbone.history.getFragment(),
	            baseUrl = url.replace(/[?|&].*$/, ''),
	            suffixUrl = url.replace(baseUrl, ''),
	            arr = key && key.constructor === Array ? key : [{ key: key, value: value }],
	            result = {
	            base: baseUrl,
	            hash: ''
	        };

	        $.each(arr, function (index, item) {
	            var reg = new RegExp('[?|&]?' + item.key + '=[^&]+');
	            var spl = suffixUrl.split(reg);

	            suffixUrl = spl.length > 1 ? spl.join('&' + item.key + '=' + item.value) : suffixUrl + '&' + item.key + '=' + item.value;
	        });

	        suffixUrl = suffixUrl.replace(/^[?|&]+/gi, '?');

	        result.hash = suffixUrl;

	        self.Router.navigate(baseUrl + suffixUrl, {
	            replace: true
	        });

	        return result;
	    };

	    /**
	     * @name StoreApp#formatUrlToParams
	     * @description 整理后缀参数
	     * @event
	     * @param {String}       [medth]         key 只有一个参数是为后缀参数
	     * @param {String}       [param]    [可选]value
	     * @example
	            xxx/xxx(?|&)?(aaa=bbb)?
	     * @returns {JSON}      [result]
	                {String}    [result.base]    base url
	                {Array}     [result.param]   param array
	     */
	    StoreApp.prototype.formatUrlToParams = function (medth, value) {
	        var self = this,
	            url,
	            mtUrl,
	            hash,
	            isHashParams = medth && !value,
	            baseUrl = '',
	            result = {
	            arrParams: [],
	            jsonParams: {}
	        };

	        // 给定 hash param
	        if (isHashParams) {
	            url = medth;
	            mtUrl = url.match(/^[?|&]?(.*)$/);
	        }
	        // 需要整理完整的 url hash
	        else {
	                url = Backbone.history.getFragment();
	                mtUrl = url.match(/^([^?|&]+)[?|&]?(.*)$/);
	            }

	        if (!!mtUrl) {
	            // 给定 hash param
	            if (isHashParams) {
	                hash = mtUrl[1];
	            }
	            // 需要整理完整的 url hash
	            else {
	                    baseUrl = mtUrl[1];
	                    hash = mtUrl[2];
	                }
	        }

	        result = self.formatUrlHash(hash);
	        result.base = baseUrl;

	        return result;
	    };

	    /**
	     * @name StoreApp#formatUrlHash
	     * @description 整理后缀参数
	     * @event
	     * @param {String}  [hash]            hash param
	     * @param {String}  [medth]    [可选] key 只有一个参数是为后缀参数
	     * @param {String}  [param]    [可选] value
	     * @example
	            (?|&)?(aaa=bbb)?
	     * @return {Array}     [result.param]   param array
	     */
	    StoreApp.prototype.formatUrlHash = function (hash, medth, value) {
	        var self = this,
	            flag = false,
	            hash = hash && hash.replace(/^[?|&]/, '') || '',
	            arr = hash.split('&') || [],
	            result = {
	            arrParams: [],
	            jsonParams: {}
	        };

	        $.each(arr, function (index, item) {
	            var spl = item.split('=');

	            // 如果不为['']形式
	            if (spl.length > 1) {
	                // 如果已存在目标参数
	                if (spl[0] == medth) {
	                    flag = true;
	                    result.arrParams.push({
	                        key: medth,
	                        value: value
	                    });
	                } else {
	                    result.arrParams.push({
	                        key: spl[0],
	                        value: spl[1]
	                    });
	                }

	                result.jsonParams[spl[0]] = spl[1];
	            }
	        });

	        if (medth && value && !flag) {
	            result.arrParams.push({
	                key: medth,
	                value: value
	            });
	        }

	        return result;
	    };

	    /**
	     * @name StoreApp#formatHashAction
	     * @description 根据 hash 整理需要执行的方法
	     * @event
	     * @param {String}  [prev]    prev hash param (form this.formatUrlHash)
	     * @param {String}  [next]    next hash param (form this.formatUrlHash)
	     * @example
	            (?|&)?(aaa=bbb)?
	     * @returns {json}      [result]            param array
	     * @returns {array}     [result.update]     param array
	     * @returns {array}     [result.added]      param array
	     * @returns {array}     [result.removed]    param array
	     * @returns {json}      [result.json]       all param json array
	     */
	    StoreApp.prototype.formatHashAction = function (prev, next) {
	        var self = this,
	            prevData = $.extend({}, prev.jsonParams),
	            result = {
	            update: [],
	            added: [],
	            removed: [],
	            list: {}
	        };

	        if (prev && next) {

	            // 先根据当前的参数，整理添加的或者修改的
	            $.each(next.arrParams, function (index, item) {
	                // 旧 hash 不包含，则添加到 added 数组里
	                if (prevData[item.key] == undefined) {
	                    result.added.push(item);

	                    result.list[item.key] = {
	                        type: 'added',
	                        value: item.value
	                    };
	                } else {

	                    // 旧 hash 值不同，则添加到 update 数组里
	                    if (prevData[item.key] != item.value) {
	                        result.update.push(item);

	                        result.list[item.key] = {
	                            type: 'update',
	                            value: item.value
	                        };
	                    }

	                    // 移除修改的或者相同的
	                    delete prevData[item.key];
	                }
	            });

	            // 整理后只剩下需要移除的参数，添加到 remove 数组里
	            $.each(prev.arrParams, function (index, item) {
	                if (prevData[item.key] == item.value) {
	                    result.removed.push(item);

	                    result.list[item.key] = {
	                        type: 'removed',
	                        value: item.value
	                    };
	                }
	            });
	        }

	        return result;
	    };

	    // Deferred proxy to done
	    StoreApp.prototype.proxyDefer = function (value) {
	        return $.Deferred().resolve(value).promise();
	    };

	    // Deferred proxy to fail
	    StoreApp.prototype.proxyDeferError = function (value) {
	        return $.Deferred().reject(value).promise();
	    };

	    // is type
	    StoreApp.prototype.isType = function (arg, type) {
	        return Object.prototype.toString.call(arg) === '[object ' + type + ']';
	    };

	    // is Array
	    StoreApp.prototype.isArray = function (arg) {
	        return this.isType(arg, 'Array');
	    };

	    // is function
	    StoreApp.prototype.isFunction = function (arg) {
	        return this.isType(arg, 'Function');
	    };

	    // is boolean
	    StoreApp.prototype.isBoolean = function (arg) {
	        return this.isType(arg, 'Boolean');
	    };

	    // is object
	    StoreApp.prototype.isObject = function (arg) {
	        return this.isType(arg, 'Object');
	    };

	    /**
	     * 获取包裹内所有数据
	     * @type Function
	     * @param {jQuery Dom} $wrapper 包裹
	     * @param {Boolean} withoutHidden 只获取显示的dom
	     */
	    StoreApp.prototype.getData = function ($wrapper, withoutHidden) {
	        var self = this,
	            data = {},
	            strHidden = withoutHidden ? ':visible' : '';
	        $wrapper.find('[name]' + strHidden).each(function () {
	            var $input = $(this),
	                tagName = $input.get(0).nodeName,
	                tagType = $input.get(0).type,
	                key = $input.attr('name'),
	                val = $input.data('value') || $.trim($input.val());

	            if (tagName == "INPUT" || tagName == "SELECT") {
	                switch (tagType) {
	                    case "radio":
	                        data[key] = $wrapper.find('[name="' + key + '"]:checked').val();
	                        break;
	                    case "checkbox":
	                        $input.prop('checked') && (data[key] = val);
	                        break;
	                    default:
	                        data[key] = val;
	                        break;
	                }
	            } else {
	                data[key] = val;
	            }
	        });

	        return data;
	    };

	    // I start the library.
	    StoreApp.prototype.run = function () {
	        var self = this;
	        // Initialize the config
	        self.initConfig();

	        // get base page
	        ct.get(self.config.commonTempUrl).done(function (result) {
	            // Initialize browser class
	            self.initBrowser();

	            // Initialize base template
	            ct.setTemplate(result);

	            // Initialize the service.
	            self.initServices();

	            // Initialize the views.
	            self.initPlugins();

	            // Initialize the filter.
	            self.initFilter();

	            // Initialize the ui.
	            self.initUI();

	            // Initialize the controllers.
	            self.initPageRead();

	            // Flag that the application is running.
	            self.isRunning = true;
	        });
	    };

	    // Create a new instance of the application and store it in the window.
	    window.Store = new StoreApp();

	    // When the DOM is ready, run the application.
	    $(function () {
	        var __Store = window.Store;

	        __Store.run();
	    });

	    // Return a new application instance.
	    return window.Store;
	})(jQuery);

	// 添加 jQuery 动画方式
	jQuery.easing['jswing'] = jQuery.easing['swing'];

	jQuery.extend(jQuery.easing, {
	    def: 'easeOutQuad',
	    easeOutQuart: function easeOutQuart(x, t, b, c, d) {
	        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	    }
	});
	// 添加dom resize方法
	(function ($, h, c) {
	    var a = $([]),
	        e = $.resize = $.extend($.resize, {}),
	        i,
	        k = "setTimeout",
	        j = "resize",
	        d = j + "-special-event",
	        b = "delay",
	        f = "throttleWindow";e[b] = 250;e[f] = true;$.event.special[j] = { setup: function setup() {
	            if (!e[f] && this[k]) {
	                return false;
	            }var l = $(this);a = a.add(l);$.data(this, d, { w: l.width(), h: l.height() });if (a.length === 1) {
	                g();
	            }
	        }, teardown: function teardown() {
	            if (!e[f] && this[k]) {
	                return false;
	            }var l = $(this);a = a.not(l);l.removeData(d);if (!a.length) {
	                clearTimeout(i);
	            }
	        }, add: function add(l) {
	            if (!e[f] && this[k]) {
	                return false;
	            }var n;function m(s, o, p) {
	                var q = $(this),
	                    r = $.data(this, d);r.w = o !== c ? o : q.width();r.h = p !== c ? p : q.height();n.apply(this, arguments);
	            }if ($.isFunction(l)) {
	                n = l;return m;
	            } else {
	                n = l.handler;l.handler = m;
	            }
	        } };function g() {
	        i = h[k](function () {
	            a.each(function () {
	                var n = $(this),
	                    m = n.width(),
	                    l = n.height(),
	                    o = $.data(this, d);if (m !== o.w || l !== o.h) {
	                    n.trigger(j, [o.w = m, o.h = l]);
	                }
	            });g();
	        }, e[b]);
	    }
	})(jQuery, undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(10)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/**
	 * @config.js 全局配置文件
	 * @author wanghuijun(wanghuijun@smartisan.cn)
	 * @update xuchen(xuchen@smartisan.com)
	 */
	'use strict';

	window.Store.addConfig('base', function ($, Store) {

	        var Config = {

	                // 主内容区
	                layoutContainer: $('#main'),

	                pageLoading: $('.page-loading'),

	                // 后台接口地址
	                baseUrl: '/',
	                nodeUrl: '/',

	                // retina 适配判断
	                isRetina: window.devicePixelRatio && window.devicePixelRatio > 1.2,
	                // isRetina : true,

	                // 是否为移动端
	                isMobileTerminal: /iphone|android|ucweb|ucbrowser|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase()),
	                isMobile: /iphone|android|ucweb|ucbrowser|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase()),
	                isUC: /ucweb|ucbrowser/i.test(navigator.userAgent.toLowerCase()),
	                // 后台接口地址 https
	                secureUrl: '',

	                // 是否为微信打开
	                isWeixin: /micromessenger/i.test(navigator.userAgent.toLowerCase()),

	                // 分页模块
	                paging: {
	                        pageViewClass: 'page-view', // 包裹样式
	                        selectClass: 'on', // 页码选中的样式
	                        prevClass: 'page-prev', // 上一页的样式
	                        prevWidth: 97, // 上一页的宽度
	                        nextClass: 'page-next', // 下一页的样式
	                        nextWidth: 97, // 下一页的宽度
	                        lastClass: 'page-last', // 最后一页的样式
	                        lastWidth: 50, // 最后一页的宽度
	                        firstClass: 'page-first', // 第一页的样式
	                        firstWidth: 51, // 第一页的宽度
	                        itemWidth: 51 // 每一个页码的宽度
	                },

	                headconfig: {
	                        headers: {
	                                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
	                        }
	                },

	                regExp: {
	                        // 正则表达式中的特殊符号，如果被包含于中括号中，则失去特殊意义，但 \ [ ] : ^ - 除外。
	                        isMobile: /^1[3|4|5|7|8]\d{9}$/,
	                        isMail: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
	                        isPassword: /^[\w\\\[\]\:\^\-~!@#$%&*()-+={}|;'",.\/<>?]{6,16}$/
	                },

	                errorMap: {},
	                /**
	                 * 判断浏览器是否支持css 动画
	                 * @return {Boolean} true 支持 false 不支持
	                 */
	                csstransitions: Modernizr.csstransitions,
	                /**
	                 * 判断浏览器是否支持 opacity
	                 * @return {Boolean} true 支持 false 不支持
	                 */
	                opacity: Modernizr.opacity,

	                /**
	                 * service error
	                 * @type Function
	                 */
	                serviceError: {
	                        '404': {
	                                title: '未找到页面',
	                                label: '抱歉，您访问的页面暂未找到。',
	                                css: 'page-error-404'
	                        },
	                        '500': {
	                                title: '内部错误',
	                                label: '抱歉，服务器内部错误，请稍后再试。',
	                                css: 'page-error-500'
	                        }
	                }
	        };

	        return Config;
	}(jQuery, window.Store));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/**
	 * @author 徐晨 xu chen ( xuchen@smartisan.com )
	 * @description template-manager.js
	 * @name ctCompile
	 * @class 模板引擎
	 * @constructor
	 * @extends jQuery
	 */
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	!function () {

	    // ========================    base params start    ==================================

	    var _ct = {};
	    var caches = {};
	    var cacheCompile = {};

	    var reg = {
	        template: /\<script id=\"([^\"]+)\"[^\>]*\>([\s\S]*?)\<\/script\>/gi,
	        include: /\{\{[^{]{0}\binclude\b\s+([^\s\}]+)\s*\}\}/,
	        each: /([^\(\s\,]+)\,\s*([^\)\s\,]+)/,
	        openTag: '{{',
	        // openTag: /\{\{[^{]{0}/,
	        openTagString: '{{',
	        // closeTag: /[^}]{0}\}\}/,
	        closeTag: '}}',
	        closeTagString: '}}'
	    };

	    var config = {
	        compress: true,
	        escape: true,
	        debug: false
	    };

	    var isNewEngine = ''.trim; // '__proto__' in {}
	    var arrOutCode = isNewEngine ? ['$out="";', '$out+=', ';', '$out'] : ['$out=[];', '$out.push(', ');', '$out.join("")'];

	    // 静态分析模板变量
	    var KEYWORDS =
	    // 关键字
	    'break,case,catch,continue,debugger,default,delete,do,else,false' + ',finally,for,function,if,in,instanceof,new,null,return,switch,this' + ',throw,true,try,typeof,var,void,while,with'

	    // 保留字
	     + ',abstract,boolean,byte,char,class,const,double,enum,export,extends' + ',final,float,goto,implements,import,int,interface,long,native' + ',package,private,protected,public,short,static,super,synchronized' + ',throws,transient,volatile'

	    // ECMA 5 - use strict
	     + ',arguments,let,yield' + ',undefined';

	    var REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g;
	    var SPLIT_RE = /[^\w$]+/g;
	    var KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
	    var NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
	    var BOUNDARY_RE = /^,+|,+$/g;
	    var SPLIT2_RE = /^$|,+/;

	    // console.log(KEYWORDS_RE);

	    var escapeMap = {
	        "<": "&#60;",
	        ">": "&#62;",
	        '"': "&#34;",
	        "'": "&#39;",
	        "&": "&#38;"
	    };

	    var escapeFn = function escapeFn(s) {
	        return escapeMap[s];
	    };

	    var toString = function toString(value, type) {

	        if (typeof value !== 'string') {

	            type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
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

	    var escapeHTML = function escapeHTML(content) {
	        return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
	    };

	    var utils = _ct.utils = {

	        $filters: {
	            rmb: function rmb(text, isFloat) {
	                return text + '-filter-rmb';
	            },
	            realImage: function realImage(text) {
	                return text;
	            }
	        },

	        $uis: {
	            test: function test() {}
	        },

	        $string: toString,

	        $escape: escapeHTML,

	        $each: function $each(arrayData, fn) {

	            if (arrayData) {
	                $.each(arrayData, fn);
	            } else {
	                return '';
	            }
	        },
	        $mainConfig: {}

	    };

	    // 版本号
	    _ct.verison = '1.0.0';

	    /**
	     * 添加模板辅助方法
	     * @name    template.filter
	     * @param   {String}    名称
	     * @param   {Function}  方法
	     */
	    _ct.setConfig = function (name, value) {
	        if (value) {
	            mainConfig[name] = value;
	        } else {
	            $.extend(mainConfig, name);
	        }
	    };

	    /**
	     * 添加模板辅助方法
	     * @name    template.filter
	     * @param   {String}    名称
	     * @param   {Function}  方法
	     */
	    _ct.addFilter = function (name, filter) {
	        if (filter) {
	            filters[name] = filter;
	        } else {
	            $.extend(filters, name);
	        }
	    };

	    /**
	     * 添加 UI 组件
	     * @name    template.addUI
	     * @param   {String}    名称
	     * @param   {Function}  方法
	     */
	    _ct.addUI = function (name, ui) {
	        if (ui) {
	            uis[name] = ui;
	        } else {
	            $.extend(uis, name);
	        }
	    };

	    var mainConfig = _ct.mainConfig = utils.$mainConfig;
	    var filters = _ct.filters = utils.$filters;
	    var uis = _ct.uis = utils.$uis;

	    // ========================     base params end     ==================================

	    /**
	     * 渲染模板
	     * @name    template.render
	     * @param   {String}    模板
	     * @param   {Object}    数据
	     * @return  {String}    渲染好的字符串
	     */
	    // _ct.render = function (source, model) {
	    //     if ( !cacheCompile[source] ) {
	    //         cacheCompile[source] = new parseTemplate(source, model);
	    //     }

	    //     // console.log(cacheCompile[source]);

	    //     return cacheCompile[source](model, utils) + '';
	    // };

	    /**
	     * 渲染模板
	     * @name    template.compile
	     * @param   {String}    模板
	     * @param   {Object}    数据
	     * @return  {String}    渲染好的字符串
	     */
	    _ct.compile = function (source, model, useModel) {
	        if (!cacheCompile[source]) {
	            var compileTemplate = new parseTemplate(source);

	            cacheCompile[source] = compileTemplate.compile();
	            // console.log(cacheCompile[source]);
	        }

	        try {

	            var result = cacheCompile[source](model, utils) + '';

	            if (useModel) {
	                return $(result).data('model', model);
	            } else {
	                return result;
	            }
	        } catch (e) {

	            // 使用 debug 模式重新编译，查看渲染时的详细错误
	            try {
	                var compileDebug = new parseTemplate(source, true),
	                    sourceDebug = compileDebug.compile();

	                sourceDebug(model, utils) + '';
	            } catch (error) {

	                error.source = sourceDebug;

	                var message = 'Template Error\n\n';

	                for (var name in error) {
	                    message += '<' + name + '>\n' + error[name] + '\n\n';
	                }

	                if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === 'object') {
	                    console.error(message);
	                }
	            }
	        }
	    };

	    /**
	     * 整理模板
	     * @name ctCompile#parseTemplate
	     * @event
	     * @param {String} [template]            模板
	     */
	    var parseTemplate = _ct.parseTemplate = function (template, debug) {

	        var pt = this;

	        pt.debug = debug || config.debug;

	        pt.uniq = { $data: 1, $utils: 1, $filters: 1, $out: 1, $line: 1, mainConfig: 1 };

	        pt.filters = filters;

	        pt.line = 1;

	        pt.code = '';

	        var headerCode = "'use strict';" + 'var $utils=$utils,$filters=$utils.$filters,$uis=$utils.$uis,mainConfig=$utils.$mainConfig,' + (pt.debug ? '$line=0,' : '');

	        var mainCode = arrOutCode[0];

	        var footerCode = 'return new String(' + arrOutCode[3] + ');';

	        // 插入动态模板
	        template = pt.include(template);

	        pt.template = template;

	        var __arrSplitOpen = template.split(reg.openTag);

	        var _parseResult;

	        $.each(__arrSplitOpen, function (index, splitClose) {

	            splitClose = splitClose.split(reg.closeTag);

	            var $0 = splitClose[0];
	            var $1 = splitClose[1];

	            if (splitClose.length == 1) {
	                mainCode += pt.parseHtml($0);
	            } else {

	                _parseResult = pt.parseCode($0, headerCode);

	                mainCode += _parseResult.code;

	                headerCode = _parseResult.headerCode;

	                if ($1) {
	                    mainCode += pt.parseHtml($1);
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

	        pt.code = code;

	        return pt;
	    };

	    /**
	     * 嵌入动态模板
	     * @name ctCompile#include
	     * @event
	     * @param  {String} [tempName]   模板名称
	     * @return {String} 动态模板
	     */
	    parseTemplate.prototype.include = function (template) {
	        var self = this;

	        template = template.replace(reg.include, function ($0, $1) {
	            var dynamicTemp = _ct.get($1, true);

	            if (dynamicTemp) {
	                return dynamicTemp;
	            } else {
	                return ' ';
	            }
	        });

	        if (reg.include.test(template)) {
	            return self.include(template);
	        }

	        return template;
	    };

	    /**
	     * 返回编译后的模板
	     * @name ctCompile#compile
	     * @event
	     * @param  {String} [tempName]   模板名称
	     * @return {String} 动态模板
	     */
	    parseTemplate.prototype.compile = function () {
	        var self = this,
	            code = self.code,
	            template = self.template;

	        // 调试语句
	        if (self.debug) {
	            code = 'try{' + code + '}catch(e){' + 'throw {' + 'name:"Render Error",' + 'message:e.message,' + 'line:$line,' + 'source:' + self.formatCode(template) + '.split(/\\n/)[$line-1].replace(/^\\s+/,"")' + '};' + '}';
	        }

	        try {

	            var Render = new Function('$data', '$utils', code);
	            Render.prototype = utils;

	            return Render;
	        } catch (e) {

	            if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) == 'object') {
	                console.log(e);
	                console.log(code);
	            }

	            throw new Error('{Template Error}');
	        }
	    };

	    /**
	     * 整理 html
	     * @name ctCompile#parseHtml
	     * @event
	     * @param  {String} [code]   模板代码
	     * @return {String} 生成匿名函数的内部代码
	     */
	    parseTemplate.prototype.parseHtml = function (code) {

	        var self = this;

	        self.line += code.split(/\n/).length - 1;

	        // 压缩多余空白与注释
	        if (config.compress) {
	            code = code.replace(/\s+/g, ' ').replace(/<!--[\w\W]*?-->/g, '');
	        }

	        if (code) {
	            code = arrOutCode[1] + self.formatCode(code) + arrOutCode[2] + '\n';
	        }

	        return code;
	    };

	    /**
	     * 字符串转义
	     * @name ctCompile#formatCode
	     * @event
	     * @param  {String} [code]   模板代码
	     * @return {String} 生成匿名函数的内部代码
	     */
	    parseTemplate.prototype.formatCode = function (code) {
	        return "'" + code
	        // 单引号与反斜杠转义
	        .replace(/('|\\)/g, '\\$1')
	        // 换行符转义(windows + linux)
	        .replace(/\r/g, '\\r').replace(/\n/g, '\\n') + "'";
	    };

	    /**
	     * 整理 被替换的数据
	     * @name ctCompile#parseCode
	     * @event
	     * @param  {String} [code]   数据代码
	     * @return {String} 生成匿名函数的内部代码
	     */
	    parseTemplate.prototype.parseCode = function (code, headerCode) {

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
	                return '$line=' + self.line + ';';
	            });
	        }

	        if (/^=+/.test(code)) {

	            var escapeSyntax = escape && !/^=[=#]/.test(code);

	            code = code.replace(/^=[=#]?|[\s;]*$/g, '');

	            // 对内容编码
	            if (escapeSyntax) {

	                var name = code.replace(/\s*\([^\)]+\)/, '');

	                // 排除 utils.* | include | print

	                if (!utils[name]) {
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
	            if (utils[name]) {
	                value = '$utils.' + name;
	            } else if (uis[name]) {
	                value = '$uis.' + name;
	            } else if (filters[name]) {
	                value = '$filters.' + name;
	            } else {
	                value = '$data.' + name;
	            }

	            headerCode += name + '=' + value + ',';
	            self.uniq[name] = true;
	        });

	        return {
	            code: code + '\n',
	            headerCode: headerCode
	        };
	    };

	    /**
	     * 整理 过滤器的代码
	     * @name ctCompile#formatFilter
	     * @event
	     * @param  {String} [code]   数据代码
	     * @return {String} 生成匿名函数的内部代码
	     */
	    parseTemplate.prototype.formatFilter = function (val, filter) {
	        var parts = filter.split(':');
	        var name = parts.shift();
	        var args = parts.join(',') || '';

	        if (!filters[name]) {
	            throw new Error('filter method "' + name + '" is not exist !!');
	        }

	        if (args) {
	            args = ', ' + args;
	        }

	        return '$filters.' + name + '(' + val + args + ')';
	    };

	    /**
	     * 整理 ui 组件的代码
	     * @name ctCompile#formatUI
	     * @event
	     * @param  {String} [code]   数据代码
	     * @return {String} 生成匿名函数的内部代码
	     */
	    parseTemplate.prototype.formatUI = function (ui) {
	        var splitUI = ui.split('\:');
	        var name = splitUI.shift();
	        var args = splitUI.join(',') || '';

	        if (!uis[name]) {
	            throw new Error('ui method "' + name + '" is not exist !!');
	        }

	        return '$uis.' + name + '(' + args + ')';
	    };

	    /**
	     * 整理 执行方法
	     * @name ctCompile#parseMedth
	     * @event
	     * @param  {String} [code]   数据代码
	     * @return {String} 生成匿名函数的内部代码
	     */
	    parseTemplate.prototype.parseMedth = function (code) {
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

	                if (!!paramMatch) {
	                    index = paramMatch[1];
	                    value = paramMatch[2];
	                } else {
	                    index = '$index';
	                    value = argEach[0];
	                }

	                var paramEach = index + ', ' + value;

	                if (argEach.length != 2) {
	                    throw new Error('method "each" error not has in');
	                }

	                code = '$each(' + object + ', function(' + paramEach + '){';
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

	                if (args) {
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

	                    for (; i < len; i++) {
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
	    };

	    /**
	     * 获取变量
	     * @name ctCompile#parseMedth
	     * @event
	     * @param  {String} [code]   数据代码
	     * @return {String} 生成匿名函数的内部代码
	     */
	    parseTemplate.prototype.getVariable = function (code) {

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

	        return code.replace(REMOVE_RE, '').replace(SPLIT_RE, ',').replace(KEYWORDS_RE, '').replace(NUMBER_RE, '').replace(BOUNDARY_RE, '').split(SPLIT2_RE);
	    };

	    /**
	     * 设置开始的标签
	     * @name ctCompile#setOpenTag
	     * @event
	     * @param {String} [tag]            开始的标签
	     * @param {Json}   [arr][私有属性]
	     */
	    var _setOpenTag = _ct.setOpenTag = function (tag, oTag) {
	        if (typeof tag == 'string') {
	            oTag = {
	                arr: tag.split(''),
	                parse: []
	            };

	            for (var i = 0, l = oTag.arr.length; i < l; i++) {
	                oTag.parse.push('\\' + oTag.arr[i]);
	            };

	            reg.openTag = new RegExp(oTag.parse.join('') + '[^' + oTag.parse[0] + ']{0}');
	            reg.openTagString = tag;
	            // console.log(reg);
	        } else {
	                throw new Error('标签必须为字符串');
	            }
	    };

	    /**
	     * 设置闭合的标签
	     * @name ctCompile#setCloseTag
	     * @event
	     * @param {String} [tag]            闭合的标签
	     * @param {Json}   [arr][私有属性]
	     */
	    var _setCloseTag = _ct.setCloseTag = function (tag, oTag) {
	        if (typeof tag == 'string') {
	            oTag = {
	                arr: tag.split(''),
	                parse: []
	            };

	            for (var i = 0, l = oTag.arr.length; i < l; i++) {
	                oTag.parse.push('\\' + oTag.arr[i]);
	            };

	            reg.closeTag = new RegExp('[^' + oTag.parse[oTag.parse.length - 1] + ']{0}' + oTag.parse.join(''));
	            reg.closeTagString = tag;
	            // console.log(reg);
	        } else {
	                throw new Error('标签必须为字符串');
	            }
	    };

	    /**
	     * 测试执行方法的时间（毫秒级）
	     * @name ctCompile#test
	     * @event
	     * @param {function} [__fn] 需要执行的方法
	     */
	    var _test = _ct.test = function (__fn) {
	        var __start = +new Date();

	        typeof __fn == 'function' && __fn();

	        var __end = +new Date();

	        var __time = __end - __start;

	        return __time;
	    };

	    var _get = _ct.get = function (id, isStatic) {

	        // Can we find this template in the cache?
	        if (caches[id] || isStatic) {
	            var __template = caches[id];

	            // Yes? OK, lets call our callback function and return.
	            // return callback(templates[id]);

	            return isStatic ? __template : $.Deferred().resolve(__template).promise();
	        }

	        // Otherwise, lets load it up. We'll build our URL based on the ID passed in.
	        var url = 'tpl/' + id + '.html?' + TIMESTAMP;

	        // And use a handy jQuery library called Traffic Cop to handle marshalling
	        // requests to the server. This will prevent multiple concurrent requests
	        // for the same resource.
	        var promise = $.get(url);

	        // Wire up a handler for this request via jQuery's promise API
	        return promise.then(function (template) {

	            // `template` is a string of HTML loaded via `$.ajax`. So here, we
	            // can take the opportunity to pre-compile it for performance. When we
	            // pre-compile a template, it returns a function that we can store in our
	            // cache for future use.
	            // var tmp = self.compile(template, model);

	            // 谨慎命名，避免冲突
	            caches[id] = _setTemplate(template);

	            return caches[id];
	        }, function () {
	            throw new Error('template page "' + id + '" is not exist !!');
	        });
	    };

	    var _setTemplate = _ct.setTemplate = function (__str) {
	        __str = __str.replace(reg.template, function ($0, $1, $2) {
	            // $0: 某一模板, $1: key, $2: value
	            caches[$1] = $2;

	            return ' ';
	        });

	        return __str;
	    };

	    // RequireJS && SeaJS
	    // if (typeof define === 'function') {
	    //     define(function() {
	    //         return _ct;
	    //     });

	    // NodeJS
	    // } else if (typeof exports !== 'undefined') {
	    //     module.exports = _ct;
	    // } else {
	    window.ct = _ct;
	    // }
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, jQuery) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * @main-service.js 基础服务 Ajax 配置
	 * @author wanghuijun(wanghuijun@smartisan.cn)
	 * @update xuchen(xuchen@smartisan.com)
	 */

	window.mainService = {
	    ajax: function ajax(options) {
	        var self = this;

	        // Get the full range of settings.
	        var ajaxOptions = $.extend({
	            type: 'post',
	            dataType: 'json',
	            cache: false,
	            timeout: 10 * 1000,
	            complete: function complete(request, statusText) {}
	        }, options);

	        // If the data type is JSON init common fn
	        if (ajaxOptions.dataType == 'json') {
	            // init base init
	            ajaxOptions.url = ajaxOptions.isNode ? Store.config.nodeUrl + ajaxOptions.url : Store.config.baseUrl + ajaxOptions.url;

	            delete ajaxOptions.isNode;

	            // Proxy the success callback
	            var targetSuccess = options.success;

	            // Proxy the error callback
	            var targetError = options.error;

	            // clear custom fn
	            delete ajaxOptions.success;
	            delete ajaxOptions.error;
	            delete ajaxOptions.preorder;

	            return $.ajax(ajaxOptions).then(function (response, statusText, defer) {

	                // return success fn
	                if (response.code == 0) {
	                    var successResult = typeof targetSuccess == 'function' ? targetSuccess(response.data) : undefined;
	                    successResult = successResult === undefined ? response.data : successResult;
	                    return $.Deferred().resolve(successResult, response, defer).promise();
	                }
	                // return error fn
	                else {

	                        var msg = '未知错误',
	                            errorKey = '';

	                        if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) == 'object' && response.errInfo) {
	                            jQuery.each(response.errInfo, function (key, value) {
	                                errorKey = key | 0;
	                                msg = value;
	                            });
	                        }

	                        var errorResult = typeof targetError == 'function' ? targetError(errorKey, msg, response) : undefined;

	                        // 需要自定义fail时在error函数中返回false,然后再fail函数中添加事件
	                        if (errorResult !== false) {
	                            errorResult = errorResult === undefined ? response.errInfo : errorResult;

	                            errorResult = !!errorResult ? errorResult : {};

	                            var DialogPlugin = Store.getPlugin('Dialog');

	                            // 公共错误处理方法
	                            if (DialogPlugin) {
	                                DialogPlugin.message({
	                                    message: msg
	                                });
	                            } else {
	                                alert(msg);
	                            }
	                        }
	                        return $.Deferred().reject(errorKey, msg, response, defer).promise();
	                    }
	            }, function (defer, status, statusText) {
	                alert(statusText);
	                // switch(statusText){
	                //     case 'Not Found':
	                //     // console.log(statusText);
	                //         window.location.href = '#/error/404';
	                //     break;
	                //     default:
	                //         // window.location.href = 'http://www.smartisan.com/#/error/500';
	                //     break;
	                // }
	            });
	        }

	        // If the data type is JSONP init common fn
	        if (ajaxOptions.dataType == 'jsonp') {
	            // document.domain = 'smartisan.com';
	            // $.support.cors = true;
	            var _arrData = [];

	            for (var k in ajaxOptions.data) {
	                _arrData.push('&data' + k + '=' + ajaxOptions.data[k]);
	            }

	            // init base url and format data to url
	            ajaxOptions.url = Store.config.secureUrl + ajaxOptions.url + _arrData.join('');

	            // Proxy the success callback
	            var targetSuccess = options.success;

	            // Proxy the error callback
	            var targetError = options.error;

	            // clear custom fn and data
	            delete ajaxOptions.data;
	            delete ajaxOptions.success;
	            delete ajaxOptions.error;

	            return $.ajax(ajaxOptions).then(function (response, statusText, defer) {
	                // return success fn
	                if (response.errno == 0) {
	                    var successResult = typeof targetSuccess == 'function' ? targetSuccess(response.data) : undefined;
	                    successResult = successResult === undefined ? response.data : successResult;
	                    return $.Deferred().resolve(successResult, response, defer).promise();
	                }
	                // return error fn
	                else {
	                        var msg = '未知错误',
	                            errorKey = '';

	                        errorKey = response.errno + '';

	                        msg = self.config.accountError[errorKey];
	                        // jsonp 的回执没有msg
	                        return $.Deferred().reject(errorKey, msg, response, defer).promise();
	                    }
	            }, function (defer, status, statusText) {
	                // if ( defer.status && (defer.status + '').match(/^4|5/) ) {
	                //     window.location.href = 'http://www.smartisan.com/#/error/' + defer.status;
	                // } else {
	                //     window.location.href = 'http://www.smartisan.com/#/error/' + 404;
	                // }
	            });
	        }

	        // Make the AJAX call not dataType is json.
	        return $.ajax(ajaxOptions);
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(2)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/**
	 * @iframe-dialog.js iframe 对话框
	 * @author wanghuijun(wanghuijun@smartisan.cn)
	 */
	'use strict';

	(function (exports, $) {
	    // 保存 DOM 对应的 jQuery 对象
	    var dom = {
	        wrapper: $('#iframe-dialog'),
	        mask: $('#iframe-dialog .mask'),
	        iframe: $('#iframe-dialog iframe')
	    };

	    var config = {
	        origin: 'https://account.smartisan.com',
	        loginUrl: 'https://account.smartisan.com/#/login/embed?origin=http://' + window.location.hostname,
	        registerUrl: 'https://account.smartisan.com/#/register/embed?origin=http://' + window.location.hostname,
	        logoutUrl: 'https://account.smartisan.com/#/logout/embed?origin=http://' + window.location.hostname,
	        modifyAvatarUrl: 'https://account.smartisan.com/#/modifyAvatar/embed?origin=http://' + window.location.hostname
	    };

	    // 获取相关 DOM 节点
	    function init() {
	        // 对话框打开时，首先在 body 添加相应节点
	        if (!dom.wrapper.length) {
	            var html = [];

	            html.push('<div class="iframe-dialog" id="iframe-dialog">');
	            html.push('<div class="mask"></div>');
	            html.push('<iframe allowtransparency="true" src="" frameborder="0"></iframe>');
	            html.push('</div>');

	            $('body').append(html.join(''));
	        }

	        dom.wrapper = $('#iframe-dialog');
	        dom.mask = $('#iframe-dialog .mask');
	        dom.iframe = $('#iframe-dialog iframe');
	    }

	    // @param String url
	    // iframe 内嵌的 URL
	    // @param Boolean isSilent
	    // isSilent true 表示隐藏 iframe
	    function open(url, isSilent) {
	        // 打开对话框时必须传入 URL
	        if (typeof url === 'undefined') {
	            return;
	        }

	        init();

	        dom.iframe.attr('src', url);

	        if (!isSilent) {
	            // 现显示遮罩层，dialog 淡入，这样会比较平滑
	            dom.mask.show();
	            dom.iframe.fadeIn(200);
	        }
	    }

	    function close() {
	        // 遮罩和 dialog 同步淡出
	        dom.mask.fadeOut(200);
	        dom.iframe.fadeOut(200);
	        // 结束后清空 src
	        setTimeout(function () {
	            dom.iframe.attr('src', '');
	        }, 200);
	    }

	    exports.IframeDialog = {
	        config: config,
	        open: open,
	        close: close
	    };
	})(window, jQuery);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }
]);