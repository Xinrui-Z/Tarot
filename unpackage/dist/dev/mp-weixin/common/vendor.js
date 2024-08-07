(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet', '__webpack_require_UNI_MP_PLUGIN__'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
var _default = target[key];
exports.default = _default;

/***/ }),
/* 2 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__0CB696D",
    appName: "taluo",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "4.24",
    uniRuntimeVersion: "4.24",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "__UNI__0CB696D",
      appName: "taluo",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach(function (name) {
      var matches = name.match(WORKLET_RE);
      if (matches) {
        var workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"taluo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
function getEventChannel(id) {
  var eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel;
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  {
    initWorkletMethods(pageOptions.methods, vueOptions.methods);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, extraApi[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) {
        ;
      }
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(t, e, r) {
  if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && setPrototypeOf(p, r.prototype), p;
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 23 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 25 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"taluo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"taluo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"taluo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"taluo","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 26 */
/*!****************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/pages.json ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 33 */
/*!******************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _packages = _interopRequireDefault(__webpack_require__(/*! ./packages */ 34));
var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ 35));
var _goods = _interopRequireDefault(__webpack_require__(/*! ./goods */ 36));
var _levelBenefits = _interopRequireDefault(__webpack_require__(/*! ./level-benefits */ 37));
var _member = _interopRequireDefault(__webpack_require__(/*! ./member */ 38));
var _rechargeCards = _interopRequireDefault(__webpack_require__(/*! ./rechargeCards */ 39));
var _addresses = _interopRequireDefault(__webpack_require__(/*! ./addresses */ 40));
var _attendance = _interopRequireDefault(__webpack_require__(/*! ./attendance */ 41));
var _customPoints = _interopRequireDefault(__webpack_require__(/*! ./custom-points */ 42));
var _pointsMall = _interopRequireDefault(__webpack_require__(/*! ./points-mall */ 43));
var _attendanceList = _interopRequireDefault(__webpack_require__(/*! ./attendance-list */ 44));
var _todayAttendance = _interopRequireDefault(__webpack_require__(/*! ./today-attendance */ 45));
var _orders = _interopRequireDefault(__webpack_require__(/*! ./orders */ 46));
var _customerCoupons = _interopRequireDefault(__webpack_require__(/*! ./customer-coupons */ 47));
var json = {
  packages: _packages.default,
  store: _store.default,
  goods: _goods.default,
  levelBenefits: _levelBenefits.default,
  member: _member.default,
  rechargeCards: _rechargeCards.default,
  addresses: _addresses.default,
  attendance: _attendance.default,
  customPoints: _customPoints.default,
  pointsMall: _pointsMall.default,
  attendanceList: _attendanceList.default,
  todayAttendance: _todayAttendance.default,
  orders: _orders.default,
  customerCoupons: _customerCoupons.default
};
var _default = function _default(name) {
  return new Promise(function (resolve) {
    return resolve(json[name]);
  }, 500);
};
exports.default = _default;

/***/ }),
/* 34 */
/*!*********************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/packages.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "updated_at": "2020-05-03 15:31:59",
  "id": 187,
  "has_send_num": 0,
  "start_at": "2020-03-30 00:00",
  "end_at": "2020-05-15 23:59",
  "deleted_at": null,
  "buy_status": 1,
  "coupons": [{
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585539323",
      "use_good_category": "限部分商品",
      "category": 4,
      "expire_days": 30,
      "expire": "领券当日开始30天内有效",
      "min_num": 1,
      "number": 0,
      "m_and_n_coupon_of_n": 1,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "买A赠B券",
      "coupon_title": "第2件半价券(mini卡)",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始30天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585539323",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内购买任意茶饮或软欧包，第二件可获得半价优惠，优惠产品原价不得高于购买产品原价\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "4.5",
      "title": "第2件半价券(mini卡)",
      "second_max_num": 0,
      "total_amount": 5,
      "min_amount_use": 0,
      "used": 0,
      "goods_range_num": 1,
      "explain_text": "1. 使用条件：在有效期内购买任意茶饮或软欧包，第二件可获得半价优惠，优惠产品原价不得高于购买产品原价\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451347890055233536",
      "use_per_person_per_day": 0,
      "goods": [],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 1,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气mini卡",
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "无订单金额限制",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 1,
      "amount": "买A赠B券",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:21:51",
    "deleted_at": null,
    "id": 401,
    "coupon_id": "451347890055233536",
    "created_at": "2020-03-30 23:21:51",
    "coupon_num": 1,
    "packages_id": 187
  }, {
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585539381",
      "use_good_category": "",
      "category": 0,
      "expire_days": 30,
      "expire": "领券当日开始30天内有效",
      "min_num": 0,
      "number": 0,
      "m_and_n_coupon_of_n": 0,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "现金券现金券6元元",
      "coupon_title": "满58元减现金券6元元券",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始30天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585539381",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内，购买任意饮品或软欧包满58元享受6元优惠\n2. 适用商品：任意饮品或软欧包\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "2.5",
      "title": "58-6元现金券(mini卡)",
      "discount_categorie_goods": [],
      "second_max_num": 0,
      "total_amount": 6,
      "min_amount_use": 58,
      "used": 0,
      "goods_range_num": 1,
      "explain_text": "1. 使用条件：在有效期内，购买任意饮品或软欧包满58元享受6元优惠\n2. 适用商品：任意饮品或软欧包\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451348136147632128",
      "use_per_person_per_day": 0,
      "goods": [],
      "categorie_goods": [],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 0,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气mini卡",
      "categorieGoods": [],
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "满58元可用",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 0,
      "amount": "现金券6元",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discountCategorieGoods": [],
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:21:51",
    "deleted_at": null,
    "id": 402,
    "coupon_id": "451348136147632128",
    "created_at": "2020-03-30 23:21:51",
    "coupon_num": 2,
    "packages_id": 187
  }, {
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585539573",
      "use_good_category": "",
      "category": 0,
      "expire_days": 30,
      "expire": "领券当日开始30天内有效",
      "min_num": 0,
      "number": 0,
      "m_and_n_coupon_of_n": 0,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "现金券现金券10元元",
      "coupon_title": "满108元减现金券10元元券",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始30天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585539573",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内，购买任意饮品或软欧包满108元享受10元优惠\n2. 适用商品：任意饮品或软欧包\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "3.5",
      "title": "108-10元现金券(mini卡)",
      "discount_categorie_goods": [],
      "second_max_num": 0,
      "total_amount": 10,
      "min_amount_use": 108,
      "used": 0,
      "goods_range_num": 1,
      "explain_text": "1. 使用条件：在有效期内，购买任意饮品或软欧包满108元享受10元优惠\n2. 适用商品：任意饮品或软欧包\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451348939155234817",
      "use_per_person_per_day": 0,
      "goods": [],
      "categorie_goods": [],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 0,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气mini卡",
      "categorieGoods": [],
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "满108元可用",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 0,
      "amount": "现金券10元",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discountCategorieGoods": [],
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:21:51",
    "deleted_at": null,
    "id": 403,
    "coupon_id": "451348939155234817",
    "created_at": "2020-03-30 23:21:51",
    "coupon_num": 3,
    "packages_id": 187
  }],
  "image": "https://img-shop.qmimg.cn/s23107/2020/02/29/8b6ffdfb8c8d7ab0e3.jpg",
  "status": 2,
  "third_party_name": "",
  "third_party_id": 0,
  "send_num": 0,
  "created_at": "2020-03-30 23:21:51",
  "third_desc": "",
  "amount": "20.00",
  "content": "【基本规则】\n1、成功购买后，优惠券可在奈雪点单小程序内使用或线下门店出示会员码使用。\n2、优惠券规则以优惠券使用详情为准。\n3、单笔订单仅限使用一张优惠券，且不与其他活动共享。\n4、用户购买券包使用的手机号需和小程序登录的会员手机号保持一致。\n5、如逾期未使用优惠券，优惠券将自动失效，请在有效期内使用。\n【注意】\n1、奈雪会员卡包为奈雪的茶公开售卖的一种付费卡包，成功购买，不可转赠、不可退换、不可兑换现金。\n2、此券包有效期30天。",
  "limit_num": 0,
  "num": 100000,
  "store_id": 23107,
  "title": "霸气mini卡",
  "sale_num": 16170,
  "third_status": 0
}, {
  "updated_at": "2020-05-03 15:37:45",
  "id": 186,
  "has_send_num": 0,
  "start_at": "2020-03-30 00:00",
  "end_at": "2020-05-15 23:59",
  "deleted_at": null,
  "buy_status": 1,
  "coupons": [{
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585539689",
      "use_good_category": "限部分商品",
      "category": 4,
      "expire_days": 90,
      "expire": "领券当日开始90天内有效",
      "min_num": 1,
      "number": 0,
      "m_and_n_coupon_of_n": 1,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "买A赠B券",
      "coupon_title": "买3赠1券(心享卡)",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始90天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585539689",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内，购买任意饮品或软欧包满3件赠1件，赠送产品不得高于购买产品价格\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "14",
      "title": "买3赠1券(心享卡)",
      "second_max_num": 0,
      "total_amount": 0,
      "min_amount_use": 0,
      "used": 0,
      "goods_range_num": 3,
      "explain_text": "1. 使用条件：在有效期内，购买任意饮品或软欧包满3件赠1件，赠送产品不得高于购买产品价格\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451349427363045376",
      "use_per_person_per_day": 0,
      "goods": [],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 1,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气心享卡",
      "multi_range_type": 2,
      "shop_ids": "5809,7559",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "无订单金额限制",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 1,
      "amount": "买A赠B券",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:20:39",
    "deleted_at": null,
    "id": 397,
    "coupon_id": "451349427363045376",
    "created_at": "2020-03-30 23:20:39",
    "coupon_num": 1,
    "packages_id": 186
  }, {
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585539716",
      "use_good_category": "限部分商品",
      "category": 4,
      "expire_days": 90,
      "expire": "领券当日开始90天内有效",
      "min_num": 1,
      "number": 0,
      "m_and_n_coupon_of_n": 1,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "买A赠B券",
      "coupon_title": "第2件半价券(心享卡)",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始90天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585539716",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内购买任意茶饮或软欧包，第二件可获得半价优惠，优惠产品原价不得高于购买产品原价\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "6",
      "title": "第2件半价券(心享卡)",
      "second_max_num": 0,
      "total_amount": 5,
      "min_amount_use": 0,
      "used": 0,
      "goods_range_num": 1,
      "explain_text": "1. 使用条件：在有效期内购买任意茶饮或软欧包，第二件可获得半价优惠，优惠产品原价不得高于购买产品原价\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451349537945866241",
      "use_per_person_per_day": 0,
      "goods": [],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 1,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气心享卡",
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "无订单金额限制",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 1,
      "amount": "买A赠B券",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:20:39",
    "deleted_at": null,
    "id": 398,
    "coupon_id": "451349537945866241",
    "created_at": "2020-03-30 23:20:39",
    "coupon_num": 2,
    "packages_id": 186
  }, {
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585539765",
      "use_good_category": "",
      "category": 0,
      "expire_days": 90,
      "expire": "领券当日开始90天内有效",
      "min_num": 0,
      "number": 0,
      "m_and_n_coupon_of_n": 0,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "现金券现金券6元元",
      "coupon_title": "满58元减现金券6元元券",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始90天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585539765",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内，购买任意饮品或软欧包满58元享受6元优惠\n2. 适用商品：任意饮品或软欧包\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "2.4",
      "title": "58-6元现金券(心享卡)",
      "discount_categorie_goods": [],
      "second_max_num": 0,
      "total_amount": 6,
      "min_amount_use": 58,
      "used": 0,
      "goods_range_num": 1,
      "explain_text": "1. 使用条件：在有效期内，购买任意饮品或软欧包满58元享受6元优惠\n2. 适用商品：任意饮品或软欧包\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451349745320648705",
      "use_per_person_per_day": 0,
      "goods": [],
      "categorie_goods": [],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 0,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气心享卡",
      "categorieGoods": [],
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "满58元可用",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 0,
      "amount": "现金券6元",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discountCategorieGoods": [],
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:20:39",
    "deleted_at": null,
    "id": 399,
    "coupon_id": "451349745320648705",
    "created_at": "2020-03-30 23:20:39",
    "coupon_num": 5,
    "packages_id": 186
  }, {
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585539788",
      "use_good_category": "",
      "category": 0,
      "expire_days": 90,
      "expire": "领券当日开始90天内有效",
      "min_num": 0,
      "number": 0,
      "m_and_n_coupon_of_n": 0,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "现金券现金券10元元",
      "coupon_title": "满108元减现金券10元元券",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始90天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585539788",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内，购买任意饮品或软欧包满108元享受10元优惠\n2. 适用商品：任意饮品或软欧包\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "4",
      "title": "108-10元现金券(心享卡)",
      "discount_categorie_goods": [],
      "second_max_num": 0,
      "total_amount": 10,
      "min_amount_use": 108,
      "used": 0,
      "goods_range_num": 1,
      "explain_text": "1. 使用条件：在有效期内，购买任意饮品或软欧包满108元享受10元优惠\n2. 适用商品：任意饮品或软欧包\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451349840803979264",
      "use_per_person_per_day": 0,
      "goods": [],
      "categorie_goods": [],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 0,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气心享卡",
      "categorieGoods": [],
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "满108元可用",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 0,
      "amount": "现金券10元",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discountCategorieGoods": [],
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:20:39",
    "deleted_at": null,
    "id": 400,
    "coupon_id": "451349840803979264",
    "created_at": "2020-03-30 23:20:39",
    "coupon_num": 5,
    "packages_id": 186
  }],
  "image": "https://img-shop.qmimg.cn/s23107/2020/02/29/16c61aad4a84e7c2b5.jpg",
  "status": 2,
  "third_party_name": "",
  "third_party_id": 0,
  "send_num": 0,
  "created_at": "2020-03-30 23:20:39",
  "third_desc": "",
  "amount": "58.00",
  "content": "【基本规则】\n1、成功购买后，优惠券可在奈雪点单小程序内使用或线下门店出示会员码使用。\n2、优惠券规则以优惠券使用详情为准。\n3、单笔订单仅限使用一张优惠券，且不与其他活动共享。\n4、用户购买券包使用的手机号需和小程序登录的会员手机号保持一致。\n5、如逾期未使用优惠券，优惠券将自动失效，请在有效期内使用。\n【注意】\n1、奈雪会员卡包为奈雪的茶公开售卖的一种付费卡包，成功购买，不可转赠、不可退换、不可兑换现金。\n2、此券包有效期90天。",
  "limit_num": 0,
  "num": 100000,
  "store_id": 23107,
  "title": "霸气心享卡",
  "sale_num": 4388,
  "third_status": 0
}, {
  "updated_at": "2020-05-03 15:39:00",
  "id": 185,
  "has_send_num": 0,
  "start_at": "2020-03-30 00:00",
  "end_at": "2020-05-15 23:59",
  "deleted_at": null,
  "buy_status": 1,
  "coupons": [{
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585539833",
      "use_good_category": "限部分商品",
      "category": 4,
      "expire_days": 120,
      "expire": "领券当日开始120天内有效",
      "min_num": 1,
      "number": 0,
      "m_and_n_coupon_of_n": 1,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "买A赠B券",
      "multis": [{
        "name": "奈雪梦工厂海岸城店",
        "store_id": "23107",
        "id": "7559"
      }, {
        "name": "上海浦东机场卫星厅S2店",
        "store_id": "23107",
        "id": "5809"
      }],
      "coupon_title": "买2赠1券(分享卡)",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始120天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585539833",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内，购买任意饮品或软欧包满2件赠1件，赠送产品不得高于购买产品价格\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "15",
      "title": "买2赠1券(分享卡)",
      "discount_categorie_goods": [{
        "updated_at": "2020-04-19 21:37:47",
        "id": 4201,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 22,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos茶饮",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:45",
        "id": 4202,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 23,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos欧包",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:39",
        "id": 4652,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 26,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的茶",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:37",
        "id": 4654,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 27,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的欧包",
        "show_period": 0
      }],
      "second_max_num": 0,
      "total_amount": 0,
      "min_amount_use": 0,
      "used": 0,
      "goods_range_num": 2,
      "explain_text": "1. 使用条件：在有效期内，购买任意饮品或软欧包满2件赠1件，赠送产品不得高于购买产品价格\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451350032483667969",
      "use_per_person_per_day": 0,
      "goods": [],
      "categorie_goods": [{
        "updated_at": "2020-04-19 21:37:47",
        "id": 4201,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 22,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos茶饮",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:45",
        "id": 4202,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 23,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos欧包",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:39",
        "id": 4652,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 26,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的茶",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:37",
        "id": 4654,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 27,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的欧包",
        "show_period": 0
      }],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 1,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气心享卡",
      "categorieGoods": [{
        "updated_at": "2020-04-19 21:37:47",
        "id": 4201,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 22,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos茶饮",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:45",
        "id": 4202,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 23,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos欧包",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:39",
        "id": 4652,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 26,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的茶",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:37",
        "id": 4654,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 27,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的欧包",
        "show_period": 0
      }],
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "无订单金额限制",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 1,
      "amount": "买A赠B券",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discountCategorieGoods": [{
        "updated_at": "2020-04-19 21:37:47",
        "id": 4201,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 22,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos茶饮",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:45",
        "id": 4202,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 23,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos欧包",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:39",
        "id": 4652,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 26,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的茶",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:37",
        "id": 4654,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 27,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的欧包",
        "show_period": 0
      }],
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:19:05",
    "deleted_at": null,
    "id": 392,
    "coupon_id": "451350032483667969",
    "created_at": "2020-03-30 23:19:05",
    "coupon_num": 1,
    "packages_id": 185
  }, {
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585539870",
      "use_good_category": "限部分商品",
      "category": 4,
      "expire_days": 120,
      "expire": "领券当日开始120天内有效",
      "min_num": 1,
      "number": 0,
      "m_and_n_coupon_of_n": 1,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "买A赠B券",
      "multis": [{
        "name": "奈雪梦工厂海岸城店",
        "store_id": "23107",
        "id": "7559"
      }, {
        "name": "上海浦东机场卫星厅S2店",
        "store_id": "23107",
        "id": "5809"
      }],
      "coupon_title": "买3赠1券(分享卡)",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始120天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585539870",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内，购买任意饮品或软欧包满3件赠1件，赠送产品不得高于购买产品价格\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "15",
      "title": "买3赠1券(分享卡)",
      "discount_categorie_goods": [{
        "updated_at": "2020-04-19 21:37:47",
        "id": 4201,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 22,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos茶饮",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:45",
        "id": 4202,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 23,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos欧包",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:39",
        "id": 4652,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 26,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的茶",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:37",
        "id": 4654,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 27,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的欧包",
        "show_period": 0
      }],
      "second_max_num": 0,
      "total_amount": 0,
      "min_amount_use": 0,
      "used": 0,
      "goods_range_num": 3,
      "explain_text": "1. 使用条件：在有效期内，购买任意饮品或软欧包满3件赠1件，赠送产品不得高于购买产品价格\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451350186289872897",
      "use_per_person_per_day": 0,
      "goods": [],
      "categorie_goods": [{
        "updated_at": "2020-04-19 21:37:47",
        "id": 4201,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 22,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos茶饮",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:45",
        "id": 4202,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 23,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos欧包",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:39",
        "id": 4652,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 26,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的茶",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:37",
        "id": 4654,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 27,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的欧包",
        "show_period": 0
      }],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 1,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气分享卡",
      "categorieGoods": [{
        "updated_at": "2020-04-19 21:37:47",
        "id": 4201,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 22,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos茶饮",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:45",
        "id": 4202,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 23,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos欧包",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:39",
        "id": 4652,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 26,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的茶",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:37",
        "id": 4654,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 27,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的欧包",
        "show_period": 0
      }],
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "无订单金额限制",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 1,
      "amount": "买A赠B券",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discountCategorieGoods": [{
        "updated_at": "2020-04-19 21:37:47",
        "id": 4201,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 22,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos茶饮",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:45",
        "id": 4202,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 23,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos欧包",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:39",
        "id": 4652,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 26,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的茶",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:37",
        "id": 4654,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 27,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的欧包",
        "show_period": 0
      }],
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:19:05",
    "deleted_at": null,
    "id": 393,
    "coupon_id": "451350186289872897",
    "created_at": "2020-03-30 23:19:05",
    "coupon_num": 2,
    "packages_id": 185
  }, {
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585539930",
      "use_good_category": "限部分商品",
      "category": 4,
      "expire_days": 120,
      "expire": "领券当日开始120天内有效",
      "min_num": 1,
      "number": 0,
      "m_and_n_coupon_of_n": 1,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "买A赠B券",
      "multis": [{
        "name": "奈雪梦工厂海岸城店",
        "store_id": "23107",
        "id": "7559"
      }, {
        "name": "上海浦东机场卫星厅S2店",
        "store_id": "23107",
        "id": "5809"
      }],
      "coupon_title": "第3件半价券(分享卡)",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始120天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585539930",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内购买任意茶饮或软欧包，第三件可获得半价优惠，优惠产品原价不得高于购买产品原价\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "7.5",
      "title": "第3件半价券(分享卡)",
      "discount_categorie_goods": [{
        "updated_at": "2020-04-19 21:37:47",
        "id": 4201,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 22,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos茶饮",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:45",
        "id": 4202,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 23,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos欧包",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:39",
        "id": 4652,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 26,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的茶",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:37",
        "id": 4654,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 27,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的欧包",
        "show_period": 0
      }],
      "second_max_num": 0,
      "total_amount": 5,
      "min_amount_use": 0,
      "used": 0,
      "goods_range_num": 2,
      "explain_text": "1. 使用条件：在有效期内购买任意茶饮或软欧包，第三件可获得半价优惠，优惠产品原价不得高于购买产品原价\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451350439177043969",
      "use_per_person_per_day": 0,
      "goods": [],
      "categorie_goods": [{
        "updated_at": "2020-04-19 21:37:47",
        "id": 4201,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 22,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos茶饮",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:45",
        "id": 4202,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 23,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos欧包",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:39",
        "id": 4652,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 26,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的茶",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:37",
        "id": 4654,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 27,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的欧包",
        "show_period": 0
      }],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 1,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-分享卡",
      "categorieGoods": [{
        "updated_at": "2020-04-19 21:37:47",
        "id": 4201,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 22,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos茶饮",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:45",
        "id": 4202,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 23,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos欧包",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:39",
        "id": 4652,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 26,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的茶",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:37",
        "id": 4654,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 27,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的欧包",
        "show_period": 0
      }],
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "无订单金额限制",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 1,
      "amount": "买A赠B券",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discountCategorieGoods": [{
        "updated_at": "2020-04-19 21:37:47",
        "id": 4201,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 22,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos茶饮",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:45",
        "id": 4202,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 23,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 1,
        "name": "pos欧包",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:39",
        "id": 4652,
        "sign": "2",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 26,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的茶",
        "show_period": 0
      }, {
        "updated_at": "2020-04-19 21:37:37",
        "id": 4654,
        "sign": "1",
        "pid": 0,
        "is_prompt_category": 0,
        "seo_keywords": "",
        "url": "",
        "sort": 27,
        "icon": "",
        "multi_store_id": 0,
        "status": 1,
        "is_show_backstage": 1,
        "start_time": "00:00:00",
        "end_time": "23:59:59",
        "store_id": 23107,
        "seo_description": null,
        "type": 3,
        "name": "奈雪的欧包",
        "show_period": 0
      }],
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:19:05",
    "deleted_at": null,
    "id": 394,
    "coupon_id": "451350439177043969",
    "created_at": "2020-03-30 23:19:05",
    "coupon_num": 2,
    "packages_id": 185
  }, {
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585539965",
      "use_good_category": "",
      "category": 0,
      "expire_days": 120,
      "expire": "领券当日开始120天内有效",
      "min_num": 0,
      "number": 0,
      "m_and_n_coupon_of_n": 0,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "现金券现金券6元元",
      "multis": [{
        "name": "奈雪梦工厂海岸城店",
        "store_id": "23107",
        "id": "7559"
      }, {
        "name": "上海浦东机场卫星厅S2店",
        "store_id": "23107",
        "id": "5809"
      }],
      "coupon_title": "满58元减现金券6元元券",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始120天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585539965",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内，购买任意饮品或软欧包满58元享受6元优惠\n2. 适用商品：任意饮品或软欧包\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "3",
      "title": "58-6元现金券(分享卡)",
      "discount_categorie_goods": [],
      "second_max_num": 0,
      "total_amount": 6,
      "min_amount_use": 58,
      "used": 0,
      "goods_range_num": 1,
      "explain_text": "1. 使用条件：在有效期内，购买任意饮品或软欧包满58元享受6元优惠\n2. 适用商品：任意饮品或软欧包\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451350584189837312",
      "use_per_person_per_day": 0,
      "goods": [],
      "categorie_goods": [],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 0,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气心享卡",
      "categorieGoods": [],
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "满58元可用",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 0,
      "amount": "现金券6元",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discountCategorieGoods": [],
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:19:05",
    "deleted_at": null,
    "id": 395,
    "coupon_id": "451350584189837312",
    "created_at": "2020-03-30 23:19:05",
    "coupon_num": 6,
    "packages_id": 185
  }, {
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585539987",
      "use_good_category": "",
      "category": 0,
      "expire_days": 120,
      "expire": "领券当日开始120天内有效",
      "min_num": 0,
      "number": 0,
      "m_and_n_coupon_of_n": 0,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "现金券现金券10元元",
      "multis": [],
      "coupon_title": "满108元减现金券10元元券",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始120天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585539987",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内，购买任意饮品或软欧包满108元享受10元优惠\n2. 适用商品：任意饮品或软欧包\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "5",
      "title": "108-10元现金券(分享卡)",
      "discount_categorie_goods": [],
      "second_max_num": 0,
      "total_amount": 10,
      "min_amount_use": 108,
      "used": 0,
      "goods_range_num": 1,
      "explain_text": "1. 使用条件：在有效期内，购买任意饮品或软欧包满108元享受10元优惠\n2. 适用商品：任意饮品或软欧包\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451350676553392128",
      "use_per_person_per_day": 0,
      "goods": [],
      "categorie_goods": [],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 0,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气分享卡",
      "categorieGoods": [],
      "multi_range_type": 0,
      "shop_ids": "",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "满108元可用",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 0,
      "amount": "现金券10元",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discountCategorieGoods": [],
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:19:05",
    "deleted_at": null,
    "id": 396,
    "coupon_id": "451350676553392128",
    "created_at": "2020-03-30 23:19:05",
    "coupon_num": 6,
    "packages_id": 185
  }],
  "image": "https://img-shop.qmimg.cn/s23107/2020/02/29/73065efbbe87e00753.jpg",
  "status": 2,
  "third_party_name": "",
  "third_party_id": 0,
  "send_num": 0,
  "created_at": "2020-03-30 23:19:05",
  "third_desc": "",
  "amount": "108.00",
  "content": "【基本规则】\n1、成功购买后，优惠券可在奈雪点单小程序内使用或线下门店出示会员码使用。\n2、优惠券规则以优惠券使用详情为准。\n3、单笔订单仅限使用一张优惠券，且不与其他活动共享。\n4、用户购买券包使用的手机号需和小程序登录的会员手机号保持一致。\n5、如逾期未使用优惠券，优惠券将自动失效，请在有效期内使用。\n【注意】\n1、奈雪会员卡包为奈雪的茶公开售卖的一种付费卡包，成功购买，不可转赠、不可退换、不可兑换现金。\n2、此券包有效期120天。",
  "limit_num": 0,
  "num": 100000,
  "store_id": 23107,
  "title": "霸气分享卡",
  "sale_num": 1213,
  "third_status": 0
}, {
  "updated_at": "2020-05-03 15:39:37",
  "id": 184,
  "has_send_num": 0,
  "start_at": "2020-03-30 00:00",
  "end_at": "2020-05-15 23:59",
  "deleted_at": null,
  "buy_status": 1,
  "coupons": [{
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585540048",
      "use_good_category": "限部分商品",
      "category": 4,
      "expire_days": 120,
      "expire": "领券当日开始120天内有效",
      "min_num": 1,
      "number": 0,
      "m_and_n_coupon_of_n": 1,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "买A赠B券",
      "coupon_title": "第2件半价券(欢聚卡)",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始120天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585540048",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内购买任意茶饮或软欧包，第二件可获得半价优惠，优惠产品原价不得高于购买产品价格\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "8",
      "title": "第2件半价券(欢聚卡)",
      "second_max_num": 0,
      "total_amount": 5,
      "min_amount_use": 0,
      "used": 0,
      "goods_range_num": 1,
      "explain_text": "1. 使用条件：在有效期内购买任意茶饮或软欧包，第二件可获得半价优惠，优惠产品原价不得高于购买产品价格\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451350930572234753",
      "use_per_person_per_day": 0,
      "goods": [],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 1,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气欢聚卡",
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "无订单金额限制",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 1,
      "amount": "买A赠B券",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:17:24",
    "deleted_at": null,
    "id": 387,
    "coupon_id": "451350930572234753",
    "created_at": "2020-03-30 23:17:24",
    "coupon_num": 2,
    "packages_id": 184
  }, {
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585540087",
      "use_good_category": "限部分商品",
      "category": 4,
      "expire_days": 120,
      "expire": "领券当日开始120天内有效",
      "min_num": 1,
      "number": 0,
      "m_and_n_coupon_of_n": 1,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "买A赠B券",
      "coupon_title": "买2赠1券(欢聚卡)",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始120天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585540087",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内，购买任意饮品或软欧包满2件赠1件，赠送产品不得高于购买产品价格\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "16",
      "title": "买2赠1券(欢聚卡)",
      "second_max_num": 0,
      "total_amount": 0,
      "min_amount_use": 0,
      "used": 0,
      "goods_range_num": 2,
      "explain_text": "1. 使用条件：在有效期内，购买任意饮品或软欧包满2件赠1件，赠送产品不得高于购买产品价格\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451351095068643328",
      "use_per_person_per_day": 0,
      "goods": [],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 1,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气欢聚卡",
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "无订单金额限制",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 1,
      "amount": "买A赠B券",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:17:24",
    "deleted_at": null,
    "id": 388,
    "coupon_id": "451351095068643328",
    "created_at": "2020-03-30 23:17:24",
    "coupon_num": 2,
    "packages_id": 184
  }, {
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585540128",
      "use_good_category": "限部分商品",
      "category": 4,
      "expire_days": 120,
      "expire": "领券当日开始120天内有效",
      "min_num": 1,
      "number": 0,
      "m_and_n_coupon_of_n": 1,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "买A赠B券",
      "coupon_title": "买3赠1券(欢聚卡)",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始120天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585540128",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内，购买任意饮品或软欧包满3件赠1件，赠送产品不得高于购买产品价格\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "16",
      "title": "买3赠1券(欢聚卡)",
      "second_max_num": 0,
      "total_amount": 0,
      "min_amount_use": 0,
      "used": 0,
      "goods_range_num": 3,
      "explain_text": "1. 使用条件：在有效期内，购买任意饮品或软欧包满3件赠1件，赠送产品不得高于购买产品价格\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451351267828621313",
      "use_per_person_per_day": 0,
      "goods": [],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 1,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气欢聚卡",
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "无订单金额限制",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 1,
      "amount": "买A赠B券",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:17:24",
    "deleted_at": null,
    "id": 389,
    "coupon_id": "451351267828621313",
    "created_at": "2020-03-30 23:17:24",
    "coupon_num": 3,
    "packages_id": 184
  }, {
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585540174",
      "use_good_category": "限部分商品",
      "category": 4,
      "expire_days": 120,
      "expire": "领券当日开始120天内有效",
      "min_num": 1,
      "number": 0,
      "m_and_n_coupon_of_n": 1,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "买A赠B券",
      "coupon_title": "买5赠1券(欢聚卡)",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始120天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585540174",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内，购买任意饮品或软欧包满5件赠1件，赠送产品不得高于购买产品价格\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "16",
      "title": "买5赠1券(欢聚卡)",
      "second_max_num": 0,
      "total_amount": 0,
      "min_amount_use": 0,
      "used": 0,
      "goods_range_num": 5,
      "explain_text": "1. 使用条件：在有效期内，购买任意饮品或软欧包满5件赠1件，赠送产品不得高于购买产品价格\n2. 适用商品：任意饮品或软欧包，菜单上标有红色雪花产品除外\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451351459131113472",
      "use_per_person_per_day": 0,
      "goods": [],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 1,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气欢聚卡",
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "无订单金额限制",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 1,
      "amount": "买A赠B券",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:17:24",
    "deleted_at": null,
    "id": 390,
    "coupon_id": "451351459131113472",
    "created_at": "2020-03-30 23:17:24",
    "coupon_num": 3,
    "packages_id": 184
  }, {
    "detail": {
      "coupon_use_time": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "updated_at": "1585540240",
      "use_good_category": "",
      "category": 0,
      "expire_days": 120,
      "expire": "领券当日开始120天内有效",
      "min_num": 0,
      "number": 0,
      "m_and_n_coupon_of_n": 0,
      "property": 3,
      "total": 99999999,
      "property_text": "领取券",
      "max_num": 0,
      "coupon_amount": "现金券现金券10元元",
      "coupon_title": "满108元减现金券10元元券",
      "discountGoods": [],
      "scene_type_desc": "仅外卖、堂食可用",
      "expire_ymd": "领券当日开始120天内有效",
      "couponUseTime": [{
        "use_time_start": "00:00:00",
        "use_time_end": "23:59:59"
      }],
      "template_id": "",
      "created_at": "1585540240",
      "scene_type": 3,
      "desc": "1. 使用条件：在有效期内，购买任意饮品或软欧包满108元享受10元优惠\n2. 适用商品：任意饮品或软欧包\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "finance_payment": "5.4",
      "title": "108-10元现金券(欢聚卡)",
      "discount_categorie_goods": [],
      "second_max_num": 0,
      "total_amount": 10,
      "min_amount_use": 108,
      "used": 0,
      "goods_range_num": 1,
      "explain_text": "1. 使用条件：在有效期内，购买任意饮品或软欧包满108元享受10元优惠\n2. 适用商品：任意饮品或软欧包\n3. 适用门店：奈雪内地任意门店(上海浦东机场店、奈雪梦工厂除外)\n4. 适用场景：奈雪线下门店出示会员码或“奈雪点单”小程序使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
      "number_of_user": 0,
      "id": "451351737996726273",
      "use_per_person_per_day": 0,
      "goods": [],
      "categorie_goods": [],
      "min_num_use": 0,
      "expire_type": 1,
      "goods_range_type": 0,
      "start_at": 0,
      "image": "https://img-shop.qmimg.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
      "end_at": 0,
      "coupon_label": "付费券包-霸气分享卡",
      "categorieGoods": [],
      "multi_range_type": 2,
      "shop_ids": "7559,5809",
      "show_page": 1,
      "is_koubei": "",
      "use_category": "满108元可用",
      "out_biz_no": "",
      "only_coupon": 1,
      "status": 1,
      "coupon_type": 0,
      "amount": "现金券10元",
      "is_use_time_range": 0,
      "store_id": "23107",
      "coupon_no": "",
      "type": 1,
      "discountCategorieGoods": [],
      "discount_goods": [],
      "is_receive": 1
    },
    "updated_at": "2020-03-30 23:17:24",
    "deleted_at": null,
    "id": 391,
    "coupon_id": "451351737996726273",
    "created_at": "2020-03-30 23:17:24",
    "coupon_num": 10,
    "packages_id": 184
  }],
  "image": "https://img-shop.qmimg.cn/s23107/2020/02/28/e74279ce48190fd1c7.jpg",
  "status": 2,
  "third_party_name": "",
  "third_party_id": 0,
  "send_num": 0,
  "created_at": "2020-03-30 23:17:24",
  "third_desc": "",
  "amount": "198.00",
  "content": "【基本规则】\n1、成功购买后，优惠券可在奈雪点单小程序内使用或线下门店出示会员码使用。\n2、优惠券规则以优惠券使用详情为准。\n3、单笔订单仅限使用一张优惠券，且不与其他活动共享。\n4、用户购买券包使用的手机号需和小程序登录的会员手机号保持一致。\n5、如逾期未使用优惠券，优惠券将自动失效，请在有效期内使用。\n【注意】\n1、奈雪会员卡包为奈雪的茶公开售卖的一种付费卡包，成功购买，不可转赠、不可退换、不可兑换现金。\n2、此券包有效期120天。",
  "limit_num": 0,
  "num": 100000,
  "store_id": 23107,
  "title": "霸气欢聚卡",
  "sale_num": 523,
  "third_status": 0
}];
exports.default = _default;

/***/ }),
/* 35 */
/*!******************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/store.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "longitude": "114.065927",
  "latitude": "22.537361",
  "area_name": "福田区",
  "photo": "[\"s23107\\\/2019\\\/03\\\/25\\\/e4a12f9f81bd3e8f4d.jpg\"]",
  "is_show": 1,
  "mobile": "0755-82722513",
  "takeout_server_status": true,
  "is_open": true,
  "server_status": true,
  "created_at": "1568194697",
  "street": "深圳市福田区海田路与福华一路交汇深圳天元5栋1层N136",
  "area_id": 440304,
  "notice": "",
  "city_name": "深圳市",
  "id_card": "222222222222222222",
  "alipay_store_id": "",
  "takeout_server_time": "10:00-23:59",
  "id": 1,
  "forhere_server_time": "10:00-23:59",
  "province_id": 440000,
  "forhere_is_open": true,
  "is_floor_stall": 0,
  "is_eat": 1,
  "share_description": "",
  "distance": 896,
  "distance_text": "896m",
  "stalls": [],
  "tel": "0755-82722513",
  "is_takeout": 1,
  "images": ["https:\/\/img-shop.qmimg.cn\/s23107\/2019\/03\/25\/e4a12f9f81bd3e8f4d.jpg?imageView2\/0\/w\/200\/h\/200"],
  "shop_day": "",
  "image": "https:\/\/img-shop.qmimg.cn\/s23107\/2019\/03\/25\/e4a12f9f81bd3e8f4d.jpg",
  "server_time": "10:00-23:59",
  "status": 1,
  "multi_mark": "NXHNSZ0055",
  "per_price": "1.00",
  "balance": "0.00",
  "name": "卓悦中心ONE AVENUE店",
  "updated_at": "1578227762",
  "packing_fee": "2.00",
  "delivery_cost": "2.00",
  "min_price": "30.00",
  "avg_delivery_cost_time": "40"
};
exports.default = _default;

/***/ }),
/* 36 */
/*!******************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/goods.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _ref;
var _default = [{
  "sort": 1,
  "icon": "",
  "id": 6905,
  "goods_list": [{
    "sell_time_status": 0,
    "id": 24516,
    "pack_cost": "0.00",
    "sales": 1278,
    "cover_img": "",
    "property": [],
    "is_sell": true,
    "goods_type": 1,
    "entity": [{
      "spec_id": "",
      "trade_mark": "1212000070",
      "id": "5d79de67251ea00e",
      "stock": "10485.00",
      "spec_text": [],
      "spec": [],
      "image": "s23107/2020/04/29/4a62ee45dd527609ed.jpg",
      "num": 1,
      "price": 18,
      "membership_price": 0
    }],
    "stall_code": "",
    "sort": 3,
    "price": 18,
    "unit": "件",
    "imageArr": ["https://img-shop.qmimg.cn/s23107/2020/04/29/4a62ee45dd527609ed.jpg?imageView2/2/w/600/h/600"],
    "membership_price": 0,
    "use_property": 0,
    "unit_type": 0,
    "min_buy_num": 0,
    "specs": [],
    "content": "酥软口感,进口奶油搭配特制巧克力内馅",
    "use_spec": false,
    "stock": "10485.00",
    "type": 1,
    "is_label": 0,
    "name": "三排阵",
    "images": "https://img-shop.qmimg.cn/s23107/2020/04/29/4a62ee45dd527609ed.jpg?imageView2/2/w/400/h/400"
  }, {
    "sell_time_status": 0,
    "id": 65825,
    "is_sell": true,
    "pack_cost": "0.00",
    "sales": 487,
    "goods_type": 1,
    "cover_img": "",
    "property": [],
    "goods_meals_info": [],
    "is_add": 1,
    "use_spec": false,
    "entity": [{
      "spec_id": "",
      "trade_mark": "11110090",
      "id": "9ad36aa96636c246",
      "stock": "9999956.00",
      "spec_text": [],
      "spec": [],
      "image": "s23107/2020/04/19/fda6dd99c83af02353.jpg",
      "num": 1,
      "price": 18.5,
      "membership_price": 0
    }],
    "stall_code": "",
    "sort": 99,
    "price": 18.5,
    "unit": "件",
    "imageArr": ["https://img-shop.qmimg.cn/s23107/2020/04/19/fda6dd99c83af02353.jpg?imageView2/2/w/600/h/600"],
    "membership_price": 0,
    "use_property": 0,
    "unit_type": 0,
    "min_buy_num": 0,
    "specs": [],
    "content": "购买三明治,享早餐指定饮品半价",
    "is_follow_suit": 1,
    "stock": "9999956.00",
    "type": 2,
    "is_label": 0,
    "name": "奈雪早餐",
    "images": "https://img-shop.qmimg.cn/s23107/2020/04/19/fda6dd99c83af02353.jpg?imageView2/2/w/400/h/400"
  }],
  "name": "初阶排阵",
  "is_show_backstage": 0
}, {
  "sort": 2,
  "icon": "https://img-shop.qmimg.cn/s23107/2019/04/30/458c5a14fb2f190f96.png?imageView2/0/w/200/h/200",
  "id": 6208,
  "goods_list": [{
    "sell_time_status": 0,
    "id": 24516,
    "pack_cost": "0.00",
    "sales": 1278,
    "cover_img": "",
    "property": [],
    "is_sell": true,
    "goods_type": 1,
    "entity": [{
      "spec_id": "",
      "trade_mark": "1212000070",
      "id": "5d79de67251ea00e",
      "stock": "10485.00",
      "spec_text": [],
      "spec": [],
      "image": "s23107/2020/04/29/4a62ee45dd527609ed.jpg",
      "num": 1,
      "price": 18,
      "membership_price": 0
    }],
    "stall_code": "",
    "sort": 3,
    "price": 18,
    "unit": "件",
    "imageArr": ["https://img-shop.qmimg.cn/s23107/2020/04/29/4a62ee45dd527609ed.jpg?imageView2/2/w/600/h/600"],
    "membership_price": 0,
    "use_property": 0,
    "unit_type": 0,
    "min_buy_num": 0,
    "specs": [],
    "content": "酥软口感,进口奶油搭配特制巧克力内馅",
    "use_spec": false,
    "stock": "10485.00",
    "type": 1,
    "is_label": 0,
    "name": "三排阵",
    "images": "https://img-shop.qmimg.cn/s23107/2020/04/29/4a62ee45dd527609ed.jpg?imageView2/2/w/400/h/400"
  }, (_ref = {
    "sell_time_status": 0,
    "id": 24517,
    "pack_cost": "0.00",
    "sales": 1228,
    "cover_img": "",
    "property": [],
    "is_sell": true,
    "goods_type": 1,
    "entity": [{
      "spec_id": "",
      "trade_mark": "1212000071",
      "id": "2b3f1ea3ecabd22e",
      "stock": "10308.00",
      "spec_text": [],
      "spec": [],
      "image": "s23107/2020/04/29/99daa7b20061efab10.jpg",
      "num": 1,
      "price": 18,
      "membership_price": 0
    }]
  }, (0, _defineProperty2.default)(_ref, "is_sell", true), (0, _defineProperty2.default)(_ref, "goods_type", 2), (0, _defineProperty2.default)(_ref, "entity", [{
    "spec_id": "",
    "trade_mark": "1010010043",
    "id": "c7c6f8fd34040338",
    "stock": "999950.00",
    "spec_text": [],
    "spec": [],
    "image": "s23107/2020/04/26/ea8fc439fddf2f62e3.jpg",
    "num": 1,
    "price": 32,
    "membership_price": 0
  }]), (0, _defineProperty2.default)(_ref, "stall_code", ""), (0, _defineProperty2.default)(_ref, "sort", 2), (0, _defineProperty2.default)(_ref, "price", 32), (0, _defineProperty2.default)(_ref, "unit", "件"), (0, _defineProperty2.default)(_ref, "imageArr", ["https://img-shop.qmimg.cn/s23107/2020/04/26/ea8fc439fddf2f62e3.jpg?imageView2/2/w/600/h/600"]), (0, _defineProperty2.default)(_ref, "membership_price", 0), (0, _defineProperty2.default)(_ref, "use_property", 1), (0, _defineProperty2.default)(_ref, "unit_type", 0), (0, _defineProperty2.default)(_ref, "min_buy_num", 0), (0, _defineProperty2.default)(_ref, "specs", []), (0, _defineProperty2.default)(_ref, "content", "霸气杨梅和酸奶的首次搭配,甘甜可口"), (0, _defineProperty2.default)(_ref, "use_spec", false), (0, _defineProperty2.default)(_ref, "stock", "999950.00"), (0, _defineProperty2.default)(_ref, "type", 1), (0, _defineProperty2.default)(_ref, "is_label", 0), (0, _defineProperty2.default)(_ref, "name", "霸气酸奶杨梅"), (0, _defineProperty2.default)(_ref, "images", "https://img-shop.qmimg.cn/s23107/2020/04/26/ea8fc439fddf2f62e3.jpg?imageView2/2/w/400/h/400"), _ref)],
  "name": "高阶排阵",
  "is_show_backstage": 0
}, {
  "sort": 3,
  "icon": "https://img-shop.qmimg.cn/s23107/2019/04/30/458c5a14fb2f190f96.png?imageView2/0/w/200/h/200",
  "id": 6387,
  "goods_list": [{
    "sell_time_status": 0,
    "id": 31826,
    "pack_cost": "0.00",
    "sales": 70462,
    "cover_img": "",
    "property": [],
    "is_sell": true,
    "goods_type": 1,
    "entity": [{
      "spec_id": "",
      "trade_mark": "1212000017",
      "id": "2e3f40b8f6decb2a",
      "stock": "1000498.00",
      "spec_text": [],
      "spec": [],
      "image": "s23107/2019/04/28/be484557ff7cfa4dba.jpg",
      "num": 1,
      "price": 28,
      "membership_price": 0
    }],
    "stall_code": "",
    "sort": 2,
    "price": 28,
    "unit": "件",
    "imageArr": ["https://img-shop.qmimg.cn/s23107/2019/04/28/be484557ff7cfa4dba.jpg?imageView2/2/w/600/h/600"],
    "membership_price": 0,
    "use_property": 0,
    "unit_type": 0,
    "min_buy_num": 0,
    "specs": [],
    "content": "马来西亚D24榴莲王果肉+芒果干，爆浆的榴莲馅，这款是榴莲控的最爱。",
    "use_spec": false,
    "stock": "1000498.00",
    "type": 1,
    "is_label": 0,
    "name": "霸气榴莲王",
    "images": "https://img-shop.qmimg.cn/s23107/2019/04/28/be484557ff7cfa4dba.jpg?imageView2/2/w/400/h/400"
  }, {
    "sell_time_status": 0,
    "id": 31507,
    "pack_cost": "0.00",
    "sales": 199583,
    "cover_img": "",
    "property": [{
      "is_open_checkbox": false,
      "values": [{
        "is_default": 1,
        "id": 582,
        "code": "Z5E5E2B483FA903805",
        "value": "标准冰"
      }, {
        "is_default": 0,
        "id": 583,
        "code": "Z5E5E2B484016A8529",
        "value": "去冰"
      }, {
        "is_default": 0,
        "id": 584,
        "code": "Z5E5E2B48405642832",
        "value": "热"
      }, {
        "is_default": 0,
        "id": 2544,
        "code": "Z5E5E2B48409616050",
        "value": "温"
      }],
      "name": "温度",
      "id": 190
    }, {
      "is_open_checkbox": false,
      "id": 191,
      "values": [{
        "is_default": 1,
        "id": 585,
        "code": "Z5DD789B45391F4495",
        "value": "标准糖"
      }, {
        "is_default": 0,
        "id": 586,
        "code": "Z5DD789B453D023182",
        "value": "少糖"
      }, {
        "is_default": 0,
        "id": 1959,
        "code": "Z5DD789B4540531795",
        "value": "不另外加糖"
      }],
      "name": "糖度",
      "desc": "茶饮含糖量较低，推荐标准做法，口味更佳"
    }],
    "is_sell": true,
    "goods_type": 2,
    "entity": [{
      "spec_id": "",
      "trade_mark": "1010050003",
      "id": "ee375ed5ae7f77eb",
      "stock": "1002053.00",
      "spec_text": [],
      "spec": [],
      "image": "s23107/2019/04/26/1cb88e6cd2fbcefb2a.jpg",
      "num": 1,
      "price": 29,
      "membership_price": 0
    }],
    "stall_code": "",
    "sort": 99,
    "price": 29,
    "unit": "件",
    "imageArr": ["https://img-shop.qmimg.cn/s23107/2019/04/26/1cb88e6cd2fbcefb2a.jpg?imageView2/2/w/600/h/600"],
    "membership_price": 0,
    "use_property": 1,
    "unit_type": 0,
    "min_buy_num": 0,
    "specs": [],
    "content": "奈雪明星产品。选用奈雪自有草莓园新鲜草莓，搭配严选茉莉毛尖茶底，淋上轻盈香滑的芝士奶盖。",
    "use_spec": false,
    "stock": "1002053.00",
    "type": 1,
    "is_label": 0,
    "name": "霸气芝士草莓",
    "images": "https://img-shop.qmimg.cn/s23107/2019/04/26/1cb88e6cd2fbcefb2a.jpg?imageView2/2/w/400/h/400"
  }],
  "name": "独家排阵",
  "is_show_backstage": 0
}];
exports.default = _default;

/***/ }),
/* 37 */
/*!***************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/level-benefits.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "picture": "https://images.qmai.cn/s33123/2020/01/20/f6bdc61b9356e87d03.jpg",
  "cardName": "V1",
  "benefitsSummaries": [{
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 2
    }],
    "benefitsName": "开卡特权",
    "benefitsType": 0
  }, {
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 1
    }],
    "benefitsName": "会员日特权",
    "benefitsType": 4
  }],
  "level": 1
}, {
  "picture": "https://images.qmai.cn/s33123/2020/01/20/fd13fff0e873b8c06d.jpg",
  "cardName": "V2",
  "benefitsSummaries": [{
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 2
    }],
    "benefitsName": "升级特权",
    "benefitsType": 1
  }, {
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 1
    }],
    "benefitsName": "生日特权",
    "benefitsType": 3
  }, {
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 1
    }],
    "benefitsName": "会员日特权",
    "benefitsType": 4
  }],
  "level": 2
}, {
  "picture": "https://images.qmai.cn/s33123/2020/01/20/a292980f9803aa4504.jpg",
  "cardName": "V3",
  "benefitsSummaries": [{
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 3
    }],
    "benefitsName": "升级特权",
    "benefitsType": 1
  }, {
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 1
    }],
    "benefitsName": "生日特权",
    "benefitsType": 3
  }, {
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 1
    }],
    "benefitsName": "会员日特权",
    "benefitsType": 4
  }],
  "level": 3
}, {
  "picture": "https://images.qmai.cn/s33123/2020/01/20/6fc9b939b9912c4387.jpg",
  "cardName": "V4",
  "benefitsSummaries": [{
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 3
    }],
    "benefitsName": "升级特权",
    "benefitsType": 1
  }, {
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 1
    }],
    "benefitsName": "生日特权",
    "benefitsType": 3
  }, {
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 1
    }],
    "benefitsName": "会员日特权",
    "benefitsType": 4
  }],
  "level": 4
}, {
  "picture": "https://images.qmai.cn/s33123/2020/01/20/460bdca3e1e7f87def.jpg",
  "cardName": "V5",
  "benefitsSummaries": [{
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 6
    }],
    "benefitsName": "升级特权",
    "benefitsType": 1
  }, {
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 1
    }],
    "benefitsName": "生日特权",
    "benefitsType": 3
  }],
  "level": 5
}, {
  "picture": "https://images.qmai.cn/s33123/2020/01/20/508ea53092bcf504f3.jpg",
  "cardName": "V6",
  "benefitsSummaries": [{
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 6
    }],
    "benefitsName": "升级特权",
    "benefitsType": 1
  }, {
    "benefitsItemSummaries": [{
      "unitType": 0,
      "benefitsType": 0,
      "num": 1
    }],
    "benefitsName": "生日特权",
    "benefitsType": 3
  }],
  "level": 6
}];
exports.default = _default;

/***/ }),
/* 38 */
/*!*******************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/member.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _storeId$mobilePhone$;
var _default = (_storeId$mobilePhone$ = {
  "storeId": null,
  "mobilePhone": "18666600000",
  "nickname": "tinypuppet",
  "avatar": "/static/images/mine/default.png",
  "country": "",
  "cardName": "V2",
  "memberLevel": 2,
  "city": "",
  "cardNo": "39390020696322222",
  "openingCardDate": "2018-10-20 15:10:10",
  "customerId": "343400246943295100",
  "district": null,
  "unionId": "",
  "address": null,
  "storeName": null,
  "gender": 1,
  "province": "",
  "memberOrigin": "wechat",
  "username": "我是新人",
  "memberLevelName": "VIP2",
  "birthday": "",
  "pointNum": 413,
  "couponNum": 6,
  "rechargeBalance": null,
  "balance": 0,
  "giftBalance": 0,
  "expenseAmount": null,
  "conditionType": 3,
  "ruleList": null,
  "expiredTime": null,
  "currentValue": 410,
  "level": 2,
  "cardUrl": "https://images.qmai.cn/s33123/2020/01/20/fd13fff0e873b8c06d.jpg",
  "needValue": 90
}, (0, _defineProperty2.default)(_storeId$mobilePhone$, "cardName", "V2"), (0, _defineProperty2.default)(_storeId$mobilePhone$, "max", false), _storeId$mobilePhone$);
exports.default = _default;

/***/ }),
/* 39 */
/*!**************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/rechargeCards.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "updated_at": "2020-05-03 20:31:46",
  "id": 1948,
  "sales": 314,
  "image": "/s1000106/2018/07/09/cfbc38cae535a8ad8a.jpeg",
  "value": "100.00",
  "deleted_at": null,
  "sort": 999,
  "status_text": "启用",
  "status": 1,
  "created_at": "2020-01-03 15:46:36",
  "desc": "1. 储值成功后，不可退款，请根据自己的消费情况充值。\n2. 储值余额不可提现，不可转移、转赠。\n3. 储值金额按国家法律、法规开具符合规定的发票，后续凭储值余额消费时，不再开具发票。如需发票请至奈雪点单小程序个人中心联系客服。\n4. 储值不累计会员成长值、积分与宝石，订单消费时以实际订单支付金额累计会员成长值、积分与宝石。\n5. 储值余额可在奈雪的茶内地线下门店、奈雪酒屋全国门店、奈雪点单小程序在线支付使用。",
  "store_id": 23107,
  "gifts": [],
  "type": 0,
  "full_image": "https://img-shop.qmimg.cn/s1000106/2018/07/09/cfbc38cae535a8ad8a.jpeg",
  "name": "100元",
  "sell_price": "100.00"
}, {
  "updated_at": "2020-05-02 21:59:50",
  "id": 1972,
  "sales": 112,
  "image": "/s1000106/2018/07/09/cfbc38cae535a8ad8a.jpeg",
  "value": "200.00",
  "deleted_at": null,
  "sort": 999,
  "status_text": "启用",
  "status": 1,
  "created_at": "2020-01-09 23:37:52",
  "desc": "1. 储值成功后，不可退款，请根据自己的消费情况充值。\n2. 储值余额不可提现，不可转移、转赠。\n3. 储值金额按国家法律、法规开具符合规定的发票，后续凭储值余额消费时，不再开具发票。如需发票请至奈雪点单小程序个人中心联系客服。\n4. 储值不累计会员成长值、积分与宝石，订单消费时以实际订单支付金额累计会员成长值、积分与宝石。\n5. 储值余额可在奈雪的茶内地线下门店、奈雪酒屋全国门店、奈雪点单小程序在线支付使用。",
  "store_id": 23107,
  "gifts": [],
  "type": 0,
  "full_image": "https://img-shop.qmimg.cn/s1000106/2018/07/09/cfbc38cae535a8ad8a.jpeg",
  "name": "200元",
  "sell_price": "200.00"
}, {
  "updated_at": "2020-05-01 20:19:41",
  "id": 1973,
  "sales": 31,
  "image": "/s1000106/2018/07/09/cfbc38cae535a8ad8a.jpeg",
  "value": "300.00",
  "deleted_at": null,
  "sort": 999,
  "status_text": "启用",
  "status": 1,
  "created_at": "2020-01-09 23:38:10",
  "desc": "1. 储值成功后，不可退款，请根据自己的消费情况充值。\n2. 储值余额不可提现，不可转移、转赠。\n3. 储值金额按国家法律、法规开具符合规定的发票，后续凭储值余额消费时，不再开具发票。如需发票请至奈雪点单小程序个人中心联系客服。\n4. 储值不累计会员成长值、积分与宝石，订单消费时以实际订单支付金额累计会员成长值、积分与宝石。\n5. 储值余额可在奈雪的茶内地线下门店、奈雪酒屋全国门店、奈雪点单小程序在线支付使用。",
  "store_id": 23107,
  "gifts": [],
  "type": 0,
  "full_image": "https://img-shop.qmimg.cn/s1000106/2018/07/09/cfbc38cae535a8ad8a.jpeg",
  "name": "300元",
  "sell_price": "300.00"
}, {
  "updated_at": "2020-05-03 13:12:35",
  "id": 1974,
  "sales": 14,
  "image": "/s1000106/2018/07/09/cfbc38cae535a8ad8a.jpeg",
  "value": "400.00",
  "deleted_at": null,
  "sort": 999,
  "status_text": "启用",
  "status": 1,
  "created_at": "2020-01-09 23:38:30",
  "desc": "1. 储值成功后，不可退款，请根据自己的消费情况充值。\n2. 储值余额不可提现，不可转移、转赠。\n3. 储值金额按国家法律、法规开具符合规定的发票，后续凭储值余额消费时，不再开具发票。如需发票请至奈雪点单小程序个人中心联系客服。\n4. 储值不累计会员成长值、积分与宝石，订单消费时以实际订单支付金额累计会员成长值、积分与宝石。\n5. 储值余额可在奈雪的茶内地线下门店、奈雪酒屋全国门店、奈雪点单小程序在线支付使用。",
  "store_id": 23107,
  "gifts": [],
  "type": 0,
  "full_image": "https://img-shop.qmimg.cn/s1000106/2018/07/09/cfbc38cae535a8ad8a.jpeg",
  "name": "400元",
  "sell_price": "400.00"
}, {
  "updated_at": "2020-04-18 07:43:07",
  "id": 1975,
  "sales": 7,
  "image": "/s1000106/2018/07/09/cfbc38cae535a8ad8a.jpeg",
  "value": "600.00",
  "deleted_at": null,
  "sort": 999,
  "status_text": "启用",
  "status": 1,
  "created_at": "2020-01-09 23:38:44",
  "desc": "1. 储值成功后，不可退款，请根据自己的消费情况充值。\n2. 储值余额不可提现，不可转移、转赠。\n3. 储值金额按国家法律、法规开具符合规定的发票，后续凭储值余额消费时，不再开具发票。如需发票请至奈雪点单小程序个人中心联系客服。\n4. 储值不累计会员成长值、积分与宝石，订单消费时以实际订单支付金额累计会员成长值、积分与宝石。\n5. 储值余额可在奈雪的茶内地线下门店、奈雪酒屋全国门店、奈雪点单小程序在线支付使用。",
  "store_id": 23107,
  "gifts": [],
  "type": 0,
  "full_image": "https://img-shop.qmimg.cn/s1000106/2018/07/09/cfbc38cae535a8ad8a.jpeg",
  "name": "600元",
  "sell_price": "600.00"
}, {
  "updated_at": "2020-04-29 19:48:32",
  "id": 1976,
  "sales": 18,
  "image": "/s1000106/2018/07/09/cfbc38cae535a8ad8a.jpeg",
  "value": "800.00",
  "deleted_at": null,
  "sort": 999,
  "status_text": "启用",
  "status": 1,
  "created_at": "2020-01-09 23:38:58",
  "desc": "1. 储值成功后，不可退款，请根据自己的消费情况充值。\n2. 储值余额不可提现，不可转移、转赠。\n3. 储值金额按国家法律、法规开具符合规定的发票，后续凭储值余额消费时，不再开具发票。如需发票请至奈雪点单小程序个人中心联系客服。\n4. 储值不累计会员成长值、积分与宝石，订单消费时以实际订单支付金额累计会员成长值、积分与宝石。\n5. 储值余额可在奈雪的茶内地线下门店、奈雪酒屋全国门店、奈雪点单小程序在线支付使用。",
  "store_id": 23107,
  "gifts": [],
  "type": 0,
  "full_image": "https://img-shop.qmimg.cn/s1000106/2018/07/09/cfbc38cae535a8ad8a.jpeg",
  "name": "800元",
  "sell_price": "800.00"
}];
exports.default = _default;

/***/ }),
/* 40 */
/*!**********************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/addresses.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "id": 1,
  "accept_name": "隔壁老王",
  "mobile": "18666600000",
  "province_name": "广东省",
  "area": 440306,
  "city": 440300,
  "sex": 0,
  "district": {
    "districts": "广东省深圳市南山区",
    "area": "宝安区",
    "city": "深圳市",
    "province": "广东省"
  },
  "street": "有一间公寓八栋",
  "inner": false,
  "lat": "",
  "door_number": "AB1234",
  "is_default": 0,
  "province": 440000,
  "area_name": "南山区",
  "city_name": "深圳市",
  "poiname": ""
}, {
  "id": 2,
  "accept_name": "黄女士",
  "mobile": "18666610000",
  "province_name": "广东省",
  "area": 440306,
  "city": 440300,
  "sex": 1,
  "district": {
    "districts": "广东省深圳市南山区",
    "area": "宝安区",
    "city": "深圳市",
    "province": "广东省"
  },
  "street": "有两间公寓二栋",
  "inner": false,
  "lat": "",
  "door_number": "AB5210",
  "is_default": 0,
  "province": 440000,
  "area_name": "南山区",
  "city_name": "深圳市",
  "poiname": ""
}];
exports.default = _default;

/***/ }),
/* 41 */
/*!***********************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/attendance.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "points": 1,
  "day_name": 1,
  "is_day": 1
}, {
  "points": 1,
  "day_name": 2,
  "is_day": 0
}, {
  "points": 1,
  "day_name": 3,
  "is_day": 0
}, {
  "points": 1,
  "day_name": 4,
  "is_day": 0
}, {
  "points": 1,
  "day_name": 5,
  "is_day": 0
}, {
  "points": 1,
  "day_name": 6,
  "is_day": 0
}, {
  "points": 10,
  "day_name": 7,
  "is_day": 0
}];
exports.default = _default;

/***/ }),
/* 42 */
/*!**************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/custom-points.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "soonExpiredPoints": 0,
  "totalPoints": 487,
  "expiredTime": null,
  "foreverPoints": 0
};
exports.default = _default;

/***/ }),
/* 43 */
/*!************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/points-mall.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "奈雪好券": [{
    "points_price": 800,
    "exchange_desc": "<p>兑换规则：会员可凭800积分兑换“任意软欧包免费券”1件，菜单上标有红色雪花产品除外。<p><p>售后服务：虚拟券不支持退换货服务，请先确认后兑换。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "28910",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2020-03-20 14:16:25",
    "goods_name": "软欧包免费券",
    "total_num": 0,
    "sale_time_end": null,
    "goods_img": "[]",
    "multi_range_type": 0,
    "id": 574,
    "has_send_num": 0,
    "exchanged_num": 1241,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 1,
    "exchange_num": 0,
    "goods_cate_id": 2,
    "sort": 6,
    "level_ask": 0,
    "goods_type": 1,
    "coupon_data": null,
    "third_party_id": 0,
    "img": [],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "0.00",
    "goods_stock": 99665,
    "status": 1,
    "updated_at": "2020-05-11 09:37:06",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 800,
    "exchange_desc": "<p>兑换规则：会员可凭800积分兑换“任意茶饮或软欧包买一送一优惠券”1件（菜单上标有红色雪花产品除外）。<p><p>售后服务：虚拟券不支持退换货服务，请先确认后兑换。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "28321",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "5809,7559",
    "is_open_sale_time": 0,
    "created_at": "2019-11-15 17:17:43",
    "goods_name": "买一送一券",
    "total_num": 0,
    "sale_time_end": null,
    "goods_img": "[]",
    "multi_range_type": 2,
    "id": 380,
    "has_send_num": 0,
    "exchanged_num": 14201,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 1,
    "exchange_num": 0,
    "goods_cate_id": 2,
    "sort": 7,
    "level_ask": 0,
    "goods_type": 1,
    "coupon_data": null,
    "third_party_id": 0,
    "img": [],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "0.00",
    "goods_stock": 97377,
    "status": 1,
    "updated_at": "2020-05-11 10:47:28",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 1000,
    "exchange_desc": "<p>兑换规则：会员可凭1000积分兑换“任意茶饮免费券”1件，菜单上标有红色雪花产品除外。<p><p>售后服务：虚拟券不支持退换货服务，请先确认后兑换。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "28911",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "5809,7559",
    "is_open_sale_time": 0,
    "created_at": "2019-12-21 11:27:56",
    "goods_name": "茶饮免费券",
    "total_num": 0,
    "sale_time_end": null,
    "goods_img": "[]",
    "multi_range_type": 2,
    "id": 433,
    "has_send_num": 0,
    "exchanged_num": 3940,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 1,
    "exchange_num": 0,
    "goods_cate_id": 2,
    "sort": 8,
    "level_ask": 0,
    "goods_type": 1,
    "coupon_data": null,
    "third_party_id": 0,
    "img": [],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "0.00",
    "goods_stock": 99111,
    "status": 1,
    "updated_at": "2020-05-11 10:43:23",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }],
  "奈雪好物": [{
    "points_price": 100,
    "exchange_desc": "<p>【夏日宝藏画框】夏日限定周边，奈雪独家定制画框，可盐可甜，可摆可挂。<p><p>【画框材质】油画布采用原装墨水喷绘，外框选用古铜色铝合金；珍藏奈雪宝藏。<p><p>【画框尺寸】宽：30cm，高：42.5cm<p><p><br><p><p>兑换规则：会员可凭上述积分+现金兑换“夏日宝藏画框”一份<p><p>售后服务：积分兑换商品不支持质量问题外的退换货服务，请您先确认后签收。<p><p>温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在10个工作日内寄出。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "641",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2020-04-10 12:29:33",
    "goods_name": "夏日宝藏挂画",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\images.qmai.cn\\s23107\\2020\\04\\30\\1399a8bee03f3dd13a.jpg\"]",
    "multi_range_type": 0,
    "id": 641,
    "has_send_num": 0,
    "exchanged_num": 14,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 2,
    "exchange_num": 0,
    "sort": 9,
    "level_ask": 0,
    "goods_cate_id": 3,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/1399a8bee03f3dd13a.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "99.00",
    "goods_stock": 29,
    "status": 1,
    "updated_at": "2020-05-08 09:30:42",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 100,
    "exchange_desc": "<p>【霸气杨梅主题画框】霸气杨梅回归，梅你不行！<p><p>【画框材质】UV油画布+外框铝合金材质，五里黑板，有机玻璃装裱；珍藏奈雪宝藏。<p><p>【画框尺寸】宽：30cm，高：42.5cm，A3画布。<p><p><br><p><p>兑换规则：会员可凭上述积分+现金兑换【“梅你不行”主题挂画】一份<p><p>售后服务：积分兑换商品不支持质量问题外的退换货服务，请您先确认后签收。<p><p>温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在10个工作日内寄出。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "688",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2020-04-26 21:26:15",
    "goods_name": "梅你不行挂画",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\img-shop.qmimg.cn\\s23107\\2020\\04\\26\\df31e1d42cc4242327.jpg\"]",
    "multi_range_type": 0,
    "id": 688,
    "has_send_num": 0,
    "exchanged_num": 7,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 2,
    "exchange_num": 0,
    "sort": 10,
    "level_ask": 0,
    "goods_cate_id": 3,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://img-shop.qmimg.cn/s23107/2020/04/26/df31e1d42cc4242327.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "99.00",
    "goods_stock": 12,
    "status": 1,
    "updated_at": "2020-05-07 22:44:28",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 500,
    "exchange_desc": "<p>【公仔详情】奈雪经典饮品——霸气橙子周边公仔，可在奈雪礼物线下门店限定夹取，现于线上限量积分兑换！可爱橙子形象与霸气水果杯超萌结合，材质亲肤柔软，奈雪出品，品质保证！<p><p>奈雪礼物线下门店信息可在“奈雪的礼物”小程序-我的-全国门店中查看。<p><p><br><p><p>【公仔尺寸】22-25cm<p><p><br><p><p>兑换规则：会员可凭上述积分+现金兑换“霸气橙子公仔”一份<p><p>售后服务：积分商城商品不支持质量问题外的退换货服务，请您先确认后签收。<p><p>温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在10个工作日内寄出。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "664",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2020-04-20 19:11:18",
    "goods_name": "霸气橙子公仔",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\images.qmai.cn\\s23107\\2020\\04\\30\\e41bb7b1489ec044f7.jpg\"]",
    "multi_range_type": 0,
    "id": 664,
    "has_send_num": 0,
    "exchanged_num": 10,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 2,
    "exchange_num": 0,
    "sort": 11,
    "level_ask": 0,
    "goods_cate_id": 3,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/e41bb7b1489ec044f7.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "45.00",
    "goods_stock": 30,
    "status": 1,
    "updated_at": "2020-05-07 11:46:59",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 2000,
    "exchange_desc": "<p>【公仔详情】奈雪经典饮品——霸气橙子周边公仔，可在奈雪礼物线下门店限定夹取，现于线上限量积分兑换！可爱橙子形象与霸气水果杯超萌结合，材质亲肤柔软，奈雪出品，品质保证！<p><p>奈雪礼物线下门店信息可在“奈雪的礼物”小程序-我的-全国门店中查看。<p><p><br><p><p>【公仔尺寸】22-25cm<p><p><br><p><p>兑换规则：会员可凭上述积分兑换“霸气橙子公仔”一份<p><p>售后服务：积分商城商品不支持质量问题外的退换货服务，请您先确认后签收。<p><p>温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在10个工作日内寄出。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "665",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2020-04-20 19:11:52",
    "goods_name": "霸气橙子公仔",
    "sale_time_end": null,
    "goods_img": "[]",
    "multi_range_type": 0,
    "id": 665,
    "has_send_num": 0,
    "exchanged_num": 6,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 1,
    "exchange_num": 0,
    "sort": 12,
    "level_ask": 0,
    "goods_cate_id": 3,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/e41bb7b1489ec044f7.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "0.00",
    "goods_stock": 4,
    "status": 1,
    "updated_at": "2020-05-08 16:19:24",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 500,
    "exchange_desc": "<p>【公仔详情】奈雪经典饮品——霸气草莓周边公仔，可在奈雪礼物线下门店限定夹取，现于线上限量积分兑换！可爱橙子形象与霸气水果杯超萌结合，材质亲肤柔软，奈雪出品，品质保证！<p><p>奈雪礼物线下门店信息可在“奈雪的礼物”小程序-我的-全国门店中查看。<p><p><br><p><p>【公仔尺寸】22-25cm<p><p><br><p><p>兑换规则：会员可凭上述积分+现金兑换“霸气草莓公仔”一份<p><p>售后服务：积分商城商品不支持质量问题外的退换货服务，请您先确认后签收。<p><p>温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在10个工作日内寄出。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "666",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2020-04-20 19:16:40",
    "goods_name": "霸气草莓公仔",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\images.qmai.cn\\s23107\\2020\\04\\30\\6ada410b2d50636859.jpg\"]",
    "multi_range_type": 0,
    "id": 666,
    "has_send_num": 0,
    "exchanged_num": 12,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 2,
    "exchange_num": 0,
    "sort": 13,
    "level_ask": 0,
    "goods_cate_id": 3,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/6ada410b2d50636859.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "45.00",
    "goods_stock": 28,
    "status": 1,
    "updated_at": "2020-05-10 10:01:50",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 2000,
    "exchange_desc": "<p>【公仔详情】奈雪经典饮品——霸气草莓周边公仔，可在奈雪礼物线下门店限定夹取，现于线上限量积分兑换！可爱橙子形象与霸气水果杯超萌结合，材质亲肤柔软，奈雪出品，品质保证！<p><p>奈雪礼物线下门店信息可在“奈雪的礼物”小程序-我的-全国门店中查看。<p><p><br><p><p>【公仔尺寸】22-25cm<p><p><br><p><p>兑换规则：会员可凭上述积分兑换“霸气草莓公仔”一份<p><p>售后服务：积分商城商品不支持质量问题外的退换货服务，请您先确认后签收。<p><p>温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在10个工作日内寄出。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "667",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2020-04-20 19:17:15",
    "goods_name": "霸气草莓公仔",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\images.qmai.cn\\s23107\\2020\\04\\30\\6ada410b2d50636859.jpg\"]",
    "multi_range_type": 0,
    "id": 667,
    "has_send_num": 0,
    "exchanged_num": 7,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 1,
    "exchange_num": 0,
    "sort": 14,
    "level_ask": 0,
    "goods_cate_id": 3,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/6ada410b2d50636859.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "0.00",
    "goods_stock": 3,
    "status": 1,
    "updated_at": "2020-05-09 09:58:01",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 2000,
    "exchange_desc": "<p>产品说明：奈雪的茶特邀荷兰艺术家工作室，为奈雪的茶创作了5个酷爱夏天的小动物，变身六款T-shirt，带来百搭的季节必备单品！<p><p>尺码说明：本T-shirt仅剩XXL尺码。\n兑换规则：会员可凭2000积分兑换“霸气杨梅[夏日T-shirt]”1件，兑换物品随机发货。\n售后服务：积分兑换商品不支持质量问题外的退换货服务，请您先确认后签收。\n温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在5个工作日内寄出~<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "206",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2019-08-23 18:19:41",
    "goods_name": "霸气杨梅T恤XXL",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\images.qmai.cn\\s23107\\2020\\04\\30\\c3e522084d9706a96e.jpg\"]",
    "multi_range_type": 0,
    "id": 206,
    "has_send_num": 0,
    "exchanged_num": 21,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 1,
    "exchange_num": 0,
    "sort": 25,
    "level_ask": 0,
    "goods_cate_id": 3,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/c3e522084d9706a96e.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "0.00",
    "goods_stock": 15,
    "status": 1,
    "updated_at": "2020-05-09 15:22:33",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }],
  "奈雪联名": [{
    "points_price": 100,
    "exchange_desc": "<p>礼盒内容：奈雪大红袍*1罐，特仑苏有机纯牛奶*3支，奈雪马克杯*1个<p><p>兑换规则：会员可凭上述积分兑换“奈雪宝藏奶茶DIY礼盒”一份<p><p>售后服务：积分兑换商品不支持质量问题外的退换货服务，请您先确认后签收。<p><p>温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在10个工作日内寄出。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "556",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2020-03-18 17:49:15",
    "goods_name": "特仑苏奶茶礼盒",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\images.qmai.cn\\s23107\\2020\\04\\30\\b360279d3a9f58d668.jpg\"]",
    "multi_range_type": 0,
    "id": 556,
    "has_send_num": 0,
    "exchanged_num": 39,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 2,
    "exchange_num": 0,
    "sort": 17,
    "level_ask": 0,
    "goods_cate_id": 4,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/b360279d3a9f58d668.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "105.00",
    "goods_stock": 3,
    "status": 1,
    "updated_at": "2020-05-09 07:42:56",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 2800,
    "exchange_desc": "<p>礼盒内容：奈雪大红袍*1罐，特仑苏有机纯牛奶*3支，奈雪马克杯*1个<p><p>兑换规则：会员可凭上述积分兑换“奈雪宝藏奶茶DIY礼盒”一份<p><p>售后服务：积分兑换商品不支持质量问题外的退换货服务，请您先确认后签收。<p><p>温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在10个工作日内寄出。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "553",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2020-03-18 17:43:16",
    "goods_name": "特仑苏奶茶礼盒",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\images.qmai.cn\\s23107\\2020\\04\\30\\b360279d3a9f58d668.jpg\"]",
    "multi_range_type": 0,
    "id": 553,
    "has_send_num": 0,
    "exchanged_num": 33,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 1,
    "exchange_num": 0,
    "sort": 18,
    "level_ask": 0,
    "goods_cate_id": 4,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/b360279d3a9f58d668.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "0.00",
    "goods_stock": 2,
    "status": 1,
    "updated_at": "2020-05-08 16:24:01",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 2000,
    "exchange_desc": "<p>兑换规则：会员可凭上述积分兑换“奈雪X人民日报定制保温杯”<p><p>售后服务：积分兑换商品不支持质量问题外的退换货服务，请您先确认后签收。<p><p>温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在10个工作日内寄出。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "430",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2019-12-20 19:51:11",
    "goods_name": "人民日报保温杯",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\images.qmai.cn\\s23107\\2020\\04\\30\\8d862b032568414c99.jpg\"]",
    "multi_range_type": 0,
    "id": 430,
    "has_send_num": 0,
    "exchanged_num": 130,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 1,
    "exchange_num": 0,
    "sort": 21,
    "level_ask": 0,
    "goods_cate_id": 4,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/8d862b032568414c99.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "0.00",
    "goods_stock": 20,
    "status": 1,
    "updated_at": "2020-05-10 20:26:17",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 1500,
    "exchange_desc": "<p>兑换规则：会员可凭上述积分兑换“奈雪x人民日报定制军用水壶”<p><p>售后服务：积分兑换商品不支持质量问题外的退换货服务，请您先确认后签收。<p><p>温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在10个工作日内寄出。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "431",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2019-12-20 19:58:10",
    "goods_name": "人民日报水壶",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\images.qmai.cn\\s23107\\2020\\04\\30\\85f06751236939431b.jpg\"]",
    "multi_range_type": 0,
    "id": 431,
    "has_send_num": 0,
    "exchanged_num": 89,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 1,
    "exchange_num": 0,
    "sort": 22,
    "level_ask": 0,
    "goods_cate_id": 4,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/85f06751236939431b.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "0.00",
    "goods_stock": 11,
    "status": 1,
    "updated_at": "2020-05-08 21:35:46",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 1000,
    "exchange_desc": "<p>兑换规则：会员可凭上述积分兑换“奈雪x人民日报定制搪瓷杯”<p><p>售后服务：积分兑换商品不支持质量问题外的退换货服务，请您先确认后签收。<p><p>温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在10个工作日内寄出。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "432",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2019-12-20 19:59:22",
    "goods_name": "人民日报搪瓷缸",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\images.qmai.cn\\s23107\\2020\\04\\30\\2a24bda6e1791c00a0.jpg\"]",
    "multi_range_type": 0,
    "id": 432,
    "has_send_num": 0,
    "exchanged_num": 163,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 1,
    "exchange_num": 0,
    "sort": 23,
    "level_ask": 0,
    "goods_cate_id": 4,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/2a24bda6e1791c00a0.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "0.00",
    "goods_stock": 37,
    "status": 1,
    "updated_at": "2020-05-11 00:45:30",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 500,
    "exchange_desc": "<p><span style=\"color: rgb(0, 0, 0);\">产品说明：该产品为奈雪生日限定手机壳，适用于iphone 7P&amp;8P系列<span><p><p><span style=\"color: rgb(0, 0, 0);\">售后服务：积分兑换商品不支持质量问题外的退换货服务，请您先确认后签收。<span><p><p><span style=\"color: rgb(0, 0, 0);\">温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在5个工作日内寄出<span><p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "269",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2019-09-29 11:29:44",
    "goods_name": "生日手机壳 78P",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\images.qmai.cn\\s23107\\2020\\04\\30\\4c81b4d86db88e8f87.jpg\"]",
    "multi_range_type": 0,
    "id": 269,
    "has_send_num": 0,
    "exchanged_num": 295,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 1,
    "exchange_num": 0,
    "sort": 26,
    "level_ask": 0,
    "goods_cate_id": 4,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/4c81b4d86db88e8f87.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "0.00",
    "goods_stock": 5,
    "status": 1,
    "updated_at": "2020-05-10 17:59:53",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }],
  "奈雪好茶": [{
    "points_price": 2500,
    "exchange_desc": "<p>产品介绍：冻顶乌龙80g*1<p><p>兑换规则：会员可凭上述积分兑换“冻顶乌龙”一罐<p><p>售后服务：积分兑换商品不支持质量问题外的退换货服务，请您先确认后签收。<p><p>温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在10个工作日内寄出。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "486",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2020-01-09 17:19:02",
    "goods_name": "奈雪冻顶乌龙",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\images.qmai.cn\\s23107\\2020\\04\\30\\064fd765371de1d8b0.jpg\"]",
    "multi_range_type": 0,
    "id": 486,
    "has_send_num": 0,
    "exchanged_num": 7,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 1,
    "exchange_num": 0,
    "sort": 55,
    "level_ask": 0,
    "goods_cate_id": 5,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/064fd765371de1d8b0.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "0.00",
    "goods_stock": 23,
    "status": 1,
    "updated_at": "2020-05-07 11:54:51",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 1800,
    "exchange_desc": "<p>产品介绍：青心乌龙80g*1<p><p>兑换规则：会员可凭上述积分兑换“青心乌龙”一罐<p><p>售后服务：积分兑换商品不支持质量问题外的退换货服务，请您先确认后签收。<p><p>温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在10个工作日内寄出。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "488",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2020-01-09 17:25:08",
    "goods_name": "奈雪青心乌龙",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\images.qmai.cn\\s23107\\2020\\04\\30\\0b32c3249b8388a403.jpg\"]",
    "multi_range_type": 0,
    "id": 488,
    "has_send_num": 0,
    "exchanged_num": 14,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 1,
    "exchange_num": 0,
    "sort": 55,
    "level_ask": 0,
    "goods_cate_id": 5,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/0b32c3249b8388a403.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "0.00",
    "goods_stock": 16,
    "status": 1,
    "updated_at": "2020-05-08 00:16:21",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }, {
    "points_price": 1200,
    "exchange_desc": "<p>产品介绍：白鸡冠30g*1<p><p>兑换规则：会员可凭上述积分兑换“白鸡冠”一罐<p><p>售后服务：积分兑换商品不支持质量问题外的退换货服务，请您先确认后签收。<p><p>温馨提示：积分商城仅支持中国大陆地区的兑换邮寄服务，我们将在10个工作日内寄出。<p>",
    "auto_off_datetime": null,
    "exchange_num_desc": "不限制",
    "goods_id": "490",
    "exchange_limit": 0,
    "send_num": 0,
    "deleted_at": null,
    "multi_store_id": "0",
    "is_open_sale_time": 0,
    "created_at": "2020-01-09 17:32:23",
    "goods_name": "奈雪白鸡冠",
    "sale_time_end": null,
    "goods_img": "[\"https:\\\\images.qmai.cn\\s23107\\2020\\04\\30\\1e5e034a3c61bb9ccd.jpg\"]",
    "multi_range_type": 0,
    "id": 490,
    "has_send_num": 0,
    "exchanged_num": 24,
    "level_name": "",
    "is_vip_level": 0,
    "exchange_type": 1,
    "exchange_num": 0,
    "sort": 55,
    "level_ask": 0,
    "goods_cate_id": 5,
    "goods_type": 2,
    "third_party_id": 0,
    "img": ["https://images.qmai.cn/s23107/2020/04/30/1e5e034a3c61bb9ccd.jpg"],
    "third_party_name": "",
    "sale_time_start": null,
    "amount": "0.00",
    "goods_stock": 6,
    "status": 1,
    "updated_at": "2020-05-09 10:21:48",
    "store_id": 23107,
    "level_id": 0,
    "auto_off_date": null
  }]
};
exports.default = _default;

/***/ }),
/* 44 */
/*!****************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/attendance-list.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "attendance_id": 1,
  "updated_at": "2020-04-25 02:46:36",
  "id": 1,
  "created_at": "2020-04-25 02:46:36",
  "attendance_coupon": 0,
  "nickname": "tinypuppet",
  "num": 0,
  "reward_days": 1,
  "user_id": "1",
  "date": "2020-04-25",
  "attendance_point": 1,
  "store_id": 1
}, {
  "attendance_id": 1,
  "updated_at": "2020-05-02 03:30:42",
  "id": 2,
  "created_at": "2020-05-02 03:30:42",
  "attendance_coupon": 0,
  "nickname": "tinypuppet",
  "num": 0,
  "reward_days": 1,
  "user_id": "1",
  "date": "2020-05-02",
  "attendance_point": 1,
  "store_id": 1
}, {
  "attendance_id": 1,
  "updated_at": "2020-05-03 19:37:12",
  "id": 3,
  "created_at": "2020-05-03 19:37:12",
  "attendance_coupon": 0,
  "nickname": "tinypuppet",
  "num": 0,
  "reward_days": 1,
  "user_id": "1",
  "date": "2020-05-03",
  "attendance_point": 1,
  "store_id": 1
}, {
  "attendance_id": 1,
  "updated_at": "2020-05-06 10:38:42",
  "id": 4,
  "created_at": "2020-05-06 10:38:42",
  "attendance_coupon": 0,
  "nickname": "tinypuppet",
  "num": 0,
  "reward_days": 1,
  "user_id": "1",
  "date": "2020-05-06",
  "attendance_point": 1,
  "store_id": 1
}];
exports.default = _default;

/***/ }),
/* 45 */
/*!*****************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/today-attendance.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "is_attendance": 2,
  "total_points": 0,
  "attendance_points": 1,
  "attendance_category": 1,
  "attendance_continuity_day": 1,
  "list": [{
    "points": 1,
    "updated_at": "2020-01-15 05:29:25",
    "attendances_id": 312,
    "id": 770,
    "status": 0,
    "receive_type": 0,
    "created_at": "2019-10-23 19:17:21",
    "coupon_name": "",
    "attendance_category": 1,
    "coupon_id": "0",
    "attendance_day": 1,
    "coupon_num": 0,
    "deleted_at": null
  }]
};
exports.default = _default;

/***/ }),
/* 46 */
/*!*******************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/orders.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "coupon_name": "",
  "receive_at": 0,
  "pay_mode": "微信支付",
  "pay_user_name": "tinypuppet",
  "updated_at": 1588937139,
  "goods_num": 2,
  "completed_at": 1588937139,
  "created_at": 1588936782,
  "invoice_status": 1,
  "sended_time": 0,
  "status_text": "已完成",
  "remark": "",
  "coupon_amount": 0,
  "mobile": "18666600000",
  "user_name": "tinypuppet",
  "payed_at": 1588936805,
  "total_amount": "50.00",
  "store": {
    "address": "广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺",
    "longitude": "113.804601",
    "latitude": "22.678654",
    "mobile": "075523224859",
    "name": "福永同泰时代城店"
  },
  "send_status": 0,
  "discount": [],
  "status": 5,
  "completed_time": "2020-05-08 19:25:39",
  "amount": "50.00",
  "multi_store": "福永同泰时代城店",
  "productioned_time": "2020-05-08 19:24:37",
  "postscript": "打包",
  "sort_num": "8093",
  "order_no": "ABCDEFGHIJKLMN0001",
  "id": 1,
  "typeCate": 1,
  "goods": [{
    "number": 1,
    "originAmount": "28.00",
    "price": "28.00",
    "unit": "件",
    "property": "去冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2020/03/19/630a810c8c7201c112.jpg",
    "amount": "28.00",
    "name": "霸气葡萄"
  }, {
    "number": 1,
    "originAmount": "22.00",
    "price": "22.00",
    "unit": "件",
    "property": "标准冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2020/03/27/8d4a1edb7c9e2d6554.jpg",
    "amount": "28.00",
    "name": "霸气葡萄"
  }]
}, {
  "coupon_name": "",
  "receive_at": 0,
  "pay_mode": "微信支付",
  "pay_user_name": "tinypuppet",
  "updated_at": 1588682566,
  "goods_num": 3,
  "completed_at": 1588682566,
  "created_at": 1588682001,
  "invoice_status": 0,
  "sended_time": 0,
  "status_text": "已完成",
  "remark": "",
  "coupon_amount": 0,
  "mobile": "18666600000",
  "user_name": "tinypuppet",
  "payed_at": 1588682014,
  "total_amount": "73.00",
  "store": {
    "address": "广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺",
    "longitude": "113.804601",
    "latitude": "22.678654",
    "mobile": "075523224859",
    "name": "福永同泰时代城店"
  },
  "send_status": 0,
  "discount": [],
  "status": 5,
  "completed_time": "2020-05-05 20:42:46",
  "amount": "73.00",
  "multi_store": "福永同泰时代城店",
  "productioned_time": "2020-05-05 20:38:49",
  "postscript": "打包",
  "sort_num": "8145",
  "order_no": "ABCDEFGHIJKLMN0002",
  "id": 2,
  "typeCate": 2,
  "goods": [{
    "number": 1,
    "originAmount": "27.00",
    "price": "27.00",
    "unit": "件",
    "property": "标准,标准（冰沙）,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2020/04/26/79187a01f23e6f1e66.jpg",
    "amount": "27.00",
    "name": "杨枝甘露宝藏茶"
  }, {
    "number": 1,
    "originAmount": "29.00",
    "price": "29.00",
    "unit": "件",
    "property": "标准(芝士),标准冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg",
    "amount": "29.00",
    "name": "霸气芝士芒果"
  }, {
    "number": 1,
    "originAmount": "17.00",
    "price": "17.00",
    "unit": "件",
    "property": "去冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/26/333b43719bd81f4e00.jpg",
    "amount": "17.00",
    "name": "霸气绿柠檬"
  }]
}, {
  "coupon_name": "",
  "receive_at": 0,
  "pay_mode": "微信支付",
  "pay_user_name": "tinypuppet",
  "updated_at": 1587818906,
  "goods_num": 2,
  "completed_at": 1587818906,
  "created_at": 1587817016,
  "invoice_status": 0,
  "sended_time": 0,
  "status_text": "已完成",
  "remark": "",
  "coupon_amount": 0,
  "mobile": "18666600000",
  "user_name": "tinypuppet",
  "payed_at": 1587817024,
  "total_amount": "43.00",
  "store": {
    "address": "广东省深圳市宝安区深圳市宝安区西乡街道码头路新湖路海城路合围处宝安大仟里购物中心一楼L111-L112号铺（奈雪的茶）",
    "longitude": "113.87243",
    "latitude": "22.56995",
    "mobile": "18124071450",
    "name": "宝安大仟里店"
  },
  "send_status": 0,
  "discount": [],
  "status": 5,
  "completed_time": "2020-04-25 20:48:26",
  "amount": "43.00",
  "multi_store": "福永同泰时代城店",
  "productioned_time": "2020-04-25 20:20:16",
  "postscript": "打包",
  "sort_num": "8025",
  "order_no": "ABCDEFGHIJKLMN0003",
  "id": 3,
  "typeCate": 1,
  "goods": [{
    "number": 1,
    "originAmount": "22.00",
    "price": "22.00",
    "unit": "件",
    "property": "标准冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2020/03/27/bac6a6e8b23fd3b30e.jpg",
    "amount": "22.00",
    "name": "芝士奈雪金色山脉"
  }, {
    "number": 1,
    "originAmount": "21.00",
    "price": "21.00",
    "unit": "件",
    "property": "去冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2020/03/27/369520a40d39e0ac11.jpg",
    "amount": "21.00",
    "name": "芝士茉莉初雪"
  }]
}, {
  "coupon_name": "优惠券：省28元",
  "receive_at": 0,
  "pay_mode": "微信支付",
  "pay_user_name": "tinypuppet",
  "updated_at": 1585055587,
  "goods_num": 3,
  "completed_at": 1585055587,
  "created_at": 1585055310,
  "invoice_status": 0,
  "sended_time": 0,
  "status_text": "已完成",
  "remark": "",
  "coupon_amount": "28.00",
  "mobile": "18666600000",
  "user_name": "tinypuppet",
  "payed_at": 1587817024,
  "total_amount": "84.00",
  "store": {
    "address": "广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺",
    "longitude": "113.804601",
    "latitude": "22.678654",
    "mobile": "075523224859",
    "name": "福永同泰时代城店"
  },
  "send_status": 0,
  "discount": [{
    "summary": "优惠券：省28.00元，茶饮满二赠一券",
    "amount": "28.00",
    "method": "coupon",
    "order_no": "D5E7A064EA50054115",
    "name": "茶饮满二赠一券",
    "data_id": "420000007885550000"
  }],
  "status": 5,
  "completed_time": "2020-03-24 21:13:07",
  "amount": "56.00",
  "multi_store": "福永同泰时代城店",
  "productioned_time": "2020-03-24 21:12:13",
  "postscript": "打包",
  "sort_num": "8106",
  "order_no": "ABCDEFGHIJKLMN0004",
  "id": 4,
  "typeCate": 1,
  "goods": [{
    "number": 1,
    "originAmount": "28.00",
    "price": "28.00",
    "unit": "件",
    "property": "标准(芝士),去冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg",
    "amount": "28.00",
    "name": "霸气芝士芒果"
  }, {
    "number": 1,
    "originAmount": "28.00",
    "price": "28.00",
    "unit": "件",
    "property": "标准(芝士),冰沙,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg",
    "amount": "28.00",
    "name": "霸气芝士芒果"
  }, {
    "number": 1,
    "originAmount": "28.00",
    "price": "28.00",
    "unit": "件",
    "property": "标准(芝士),冰沙,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/26/1cb88e6cd2fbcefb2a.jpg",
    "amount": "28.00",
    "name": "霸气芝士草莓"
  }]
}, {
  "coupon_name": "",
  "receive_at": 0,
  "pay_mode": "标记支付",
  "pay_user_name": "tinypuppet",
  "updated_at": 1581962231,
  "goods_num": 2,
  "completed_at": 1571556377,
  "created_at": 1571555358,
  "invoice_status": 0,
  "sended_time": 0,
  "status_text": "已完成",
  "remark": "",
  "coupon_amount": 0,
  "mobile": "18666600000",
  "user_name": "tinypuppet",
  "payed_at": 1571555358,
  "total_amount": "48.00",
  "store": {
    "address": "广东省深圳市宝安区深圳市宝安区新安街道宝安中心区新湖路99号壹方城B1层017、019号商铺",
    "longitude": "113.886497",
    "latitude": "22.55278",
    "mobile": "17881400084",
    "name": "壹方城店"
  },
  "send_status": 0,
  "discount": [],
  "status": 5,
  "completed_time": "2019-10-20 15:26:17",
  "amount": "48.00",
  "productioned_time": "2019-10-20 15:17:54",
  "postscript": "打包",
  "sort_num": "50347",
  "order_no": "ABCDEFGHIJKLMN0005",
  "id": 5,
  "typeCate": 1,
  "goods": [{
    "number": 1,
    "originAmount": "20.00",
    "price": "20.00",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/28/94d8440ab7b4fed802.jpg",
    "amount": "20.00",
    "name": "草莓魔法棒"
  }, {
    "number": 1,
    "originAmount": "28.00",
    "price": "28.00",
    "image": "https://img-shop.qmimg.cn/s23107/2019/09/04/d34eb836a41b6bb856.jpg",
    "amount": "28.00",
    "name": "报款红石榴"
  }]
}, {
  "coupon_name": "优惠券：省28元",
  "receive_at": 0,
  "pay_mode": "微信支付",
  "pay_user_name": "tinypuppet",
  "updated_at": 1585055587,
  "goods_num": 3,
  "completed_at": 1585055587,
  "created_at": 1585055310,
  "invoice_status": 0,
  "sended_time": 0,
  "status_text": "已完成",
  "remark": "",
  "coupon_amount": "28.00",
  "mobile": "18666600000",
  "user_name": "tinypuppet",
  "payed_at": 1587817024,
  "total_amount": "84.00",
  "store": {
    "address": "广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺",
    "longitude": "113.804601",
    "latitude": "22.678654",
    "mobile": "075523224859",
    "name": "福永同泰时代城店"
  },
  "send_status": 0,
  "discount": [{
    "summary": "优惠券：省28.00元，茶饮满二赠一券",
    "amount": "28.00",
    "method": "coupon",
    "order_no": "D5E7A064EA50054115",
    "name": "茶饮满二赠一券",
    "data_id": "420000007885550000"
  }],
  "status": 5,
  "completed_time": "2020-03-24 21:13:07",
  "amount": "56.00",
  "multi_store": "福永同泰时代城店",
  "productioned_time": "2020-03-24 21:12:13",
  "postscript": "打包",
  "sort_num": "8106",
  "order_no": "ABCDEFGHIJKLMN0006",
  "id": 6,
  "typeCate": 1,
  "goods": [{
    "number": 1,
    "originAmount": "28.00",
    "price": "28.00",
    "unit": "件",
    "property": "标准(芝士),去冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg",
    "amount": "28.00",
    "name": "霸气芝士芒果"
  }, {
    "number": 1,
    "originAmount": "28.00",
    "price": "28.00",
    "unit": "件",
    "property": "标准(芝士),冰沙,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg",
    "amount": "28.00",
    "name": "霸气芝士芒果"
  }, {
    "number": 1,
    "originAmount": "28.00",
    "price": "28.00",
    "unit": "件",
    "property": "标准(芝士),冰沙,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/26/1cb88e6cd2fbcefb2a.jpg",
    "amount": "28.00",
    "name": "霸气芝士草莓"
  }]
}, {
  "coupon_name": "",
  "receive_at": 0,
  "pay_mode": "微信支付",
  "pay_user_name": "tinypuppet",
  "updated_at": 1587818906,
  "goods_num": 2,
  "completed_at": 1587818906,
  "created_at": 1587817016,
  "invoice_status": 0,
  "sended_time": 0,
  "status_text": "已完成",
  "remark": "",
  "coupon_amount": 0,
  "mobile": "18666600000",
  "user_name": "tinypuppet",
  "payed_at": 1587817024,
  "total_amount": 43,
  "store": {
    "address": "广东省深圳市宝安区深圳市宝安区西乡街道码头路新湖路海城路合围处宝安大仟里购物中心一楼L111-L112号铺（奈雪的茶）",
    "longitude": "113.87243",
    "latitude": "22.56995",
    "mobile": "18124071450",
    "name": "宝安大仟里店"
  },
  "send_status": 0,
  "discount": [],
  "status": 5,
  "completed_time": "2020-04-25 20:48:26",
  "amount": 43,
  "multi_store": "福永同泰时代城店",
  "productioned_time": "2020-04-25 20:20:16",
  "postscript": "打包",
  "sort_num": "8025",
  "order_no": "ABCDEFGHIJKLMN0007",
  "id": 7,
  "typeCate": 1,
  "goods": [{
    "number": 1,
    "originAmount": "22.00",
    "price": "22.00",
    "unit": "件",
    "property": "标准冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2020/03/27/bac6a6e8b23fd3b30e.jpg",
    "amount": "22.00",
    "name": "芝士奈雪金色山脉"
  }, {
    "number": 1,
    "originAmount": "21.00",
    "price": "21.00",
    "unit": "件",
    "property": "去冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2020/03/27/369520a40d39e0ac11.jpg",
    "amount": "21.00",
    "name": "芝士茉莉初雪"
  }]
}, {
  "coupon_name": "",
  "receive_at": 0,
  "pay_mode": "微信支付",
  "pay_user_name": "tinypuppet",
  "updated_at": 1588682566,
  "goods_num": 3,
  "completed_at": 1588682566,
  "created_at": 1588682001,
  "invoice_status": 0,
  "sended_time": 0,
  "status_text": "已完成",
  "remark": "",
  "coupon_amount": 0,
  "mobile": "18666600000",
  "user_name": "tinypuppet",
  "payed_at": 1588682014,
  "total_amount": 73,
  "store": {
    "address": "广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺",
    "longitude": "113.804601",
    "latitude": "22.678654",
    "mobile": "075523224859",
    "name": "福永同泰时代城店"
  },
  "send_status": 0,
  "discount": [],
  "status": 5,
  "completed_time": "2020-05-05 20:42:46",
  "amount": 73,
  "multi_store": "福永同泰时代城店",
  "productioned_time": "2020-05-05 20:38:49",
  "postscript": "打包",
  "sort_num": "8145",
  "order_no": "ABCDEFGHIJKLMN0008",
  "id": 8,
  "typeCate": 1,
  "goods": [{
    "number": 1,
    "originAmount": "27.00",
    "price": "27.00",
    "unit": "件",
    "property": "标准,标准（冰沙）,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2020/04/26/79187a01f23e6f1e66.jpg",
    "amount": "27.00",
    "name": "杨枝甘露宝藏茶"
  }, {
    "number": 1,
    "originAmount": "29.00",
    "price": "29.00",
    "unit": "件",
    "property": "标准(芝士),标准冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg",
    "amount": "29.00",
    "name": "霸气芝士芒果"
  }, {
    "number": 1,
    "originAmount": "17.00",
    "price": "17.00",
    "unit": "件",
    "property": "去冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/26/333b43719bd81f4e00.jpg",
    "amount": "17.00",
    "name": "霸气绿柠檬"
  }]
}, {
  "coupon_name": "",
  "receive_at": 0,
  "pay_mode": "标记支付",
  "pay_user_name": "tinypuppet",
  "updated_at": 1581962231,
  "goods_num": 2,
  "completed_at": 1571556377,
  "created_at": 1571555358,
  "invoice_status": 0,
  "sended_time": 0,
  "status_text": "已完成",
  "remark": "",
  "coupon_amount": 0,
  "mobile": "18666600000",
  "user_name": "tinypuppet",
  "payed_at": 1571555358,
  "total_amount": "48.00",
  "store": {
    "address": "广东省深圳市宝安区深圳市宝安区新安街道宝安中心区新湖路99号壹方城B1层017、019号商铺",
    "longitude": "113.886497",
    "latitude": "22.55278",
    "mobile": "17881400084",
    "name": "壹方城店"
  },
  "send_status": 0,
  "discount": [],
  "status": 5,
  "completed_time": "2019-10-20 15:26:17",
  "amount": "48.00",
  "productioned_time": "2019-10-20 15:17:54",
  "postscript": "打包",
  "sort_num": "50347",
  "order_no": "ABCDEFGHIJKLMN0009",
  "id": 9,
  "typeCate": 1,
  "goods": [{
    "number": 1,
    "originAmount": "20.00",
    "price": "20.00",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/28/94d8440ab7b4fed802.jpg",
    "amount": "20.00",
    "name": "草莓魔法棒"
  }, {
    "number": 1,
    "originAmount": "28.00",
    "price": "28.00",
    "image": "https://img-shop.qmimg.cn/s23107/2019/09/04/d34eb836a41b6bb856.jpg",
    "amount": "28.00",
    "name": "报款红石榴"
  }]
}, {
  "coupon_name": "",
  "receive_at": 0,
  "pay_mode": "微信支付",
  "pay_user_name": "tinypuppet",
  "updated_at": 1588937139,
  "goods_num": 2,
  "completed_at": 1588937139,
  "created_at": 1588936782,
  "invoice_status": 1,
  "sended_time": 0,
  "status_text": "已完成",
  "remark": "",
  "coupon_amount": 0,
  "mobile": "18666600000",
  "user_name": "tinypuppet",
  "payed_at": 1588936805,
  "total_amount": 50,
  "store": {
    "address": "广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺",
    "longitude": "113.804601",
    "latitude": "22.678654",
    "mobile": "075523224859",
    "name": "福永同泰时代城店"
  },
  "send_status": 0,
  "discount": [],
  "status": 5,
  "completed_time": "2020-05-08 19:25:39",
  "amount": 50,
  "multi_store": "福永同泰时代城店",
  "productioned_time": "2020-05-08 19:24:37",
  "postscript": "打包",
  "sort_num": "8093",
  "order_no": "ABCDEFGHIJKLMN0010",
  "id": 10,
  "typeCate": 1,
  "goods": [{
    "number": 1,
    "originAmount": "28.00",
    "price": "28.00",
    "unit": "件",
    "property": "去冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2020/03/19/630a810c8c7201c112.jpg",
    "amount": "28.00",
    "name": "霸气葡萄"
  }, {
    "number": 1,
    "originAmount": "22.00",
    "price": "22.00",
    "unit": "件",
    "property": "标准冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2020/03/27/8d4a1edb7c9e2d6554.jpg",
    "amount": "28.00",
    "name": "霸气葡萄"
  }]
}, {
  "coupon_name": "",
  "receive_at": 0,
  "pay_mode": "微信支付",
  "pay_user_name": "tinypuppet",
  "updated_at": 1587818906,
  "goods_num": 2,
  "completed_at": 1587818906,
  "created_at": 1587817016,
  "invoice_status": 0,
  "sended_time": 0,
  "status_text": "已完成",
  "remark": "",
  "coupon_amount": 0,
  "mobile": "18666600000",
  "user_name": "tinypuppet",
  "payed_at": 1587817024,
  "total_amount": 43,
  "store": {
    "address": "广东省深圳市宝安区深圳市宝安区西乡街道码头路新湖路海城路合围处宝安大仟里购物中心一楼L111-L112号铺（奈雪的茶）",
    "longitude": "113.87243",
    "latitude": "22.56995",
    "mobile": "18124071450",
    "name": "宝安大仟里店"
  },
  "send_status": 0,
  "discount": [],
  "status": 5,
  "completed_time": "2020-04-25 20:48:26",
  "amount": 43,
  "multi_store": "福永同泰时代城店",
  "productioned_time": "2020-04-25 20:20:16",
  "postscript": "打包",
  "sort_num": "8025",
  "order_no": "ABCDEFGHIJKLMN0011",
  "id": 11,
  "typeCate": 1,
  "goods": [{
    "number": 1,
    "originAmount": "22.00",
    "price": "22.00",
    "unit": "件",
    "property": "标准冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2020/03/27/bac6a6e8b23fd3b30e.jpg",
    "amount": "22.00",
    "name": "芝士奈雪金色山脉"
  }, {
    "number": 1,
    "originAmount": "21.00",
    "price": "21.00",
    "unit": "件",
    "property": "去冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2020/03/27/369520a40d39e0ac11.jpg",
    "amount": "21.00",
    "name": "芝士茉莉初雪"
  }]
}, {
  "coupon_name": "优惠券：省28元",
  "receive_at": 0,
  "pay_mode": "微信支付",
  "pay_user_name": "tinypuppet",
  "updated_at": 1585055587,
  "goods_num": 3,
  "completed_at": 1585055587,
  "created_at": 1585055310,
  "invoice_status": 0,
  "sended_time": 0,
  "status_text": "已完成",
  "remark": "",
  "coupon_amount": "28.00",
  "mobile": "18666600000",
  "user_name": "tinypuppet",
  "payed_at": 1587817024,
  "total_amount": "84.00",
  "store": {
    "address": "广东省深圳市宝安区深圳市宝安区福海街道宝安大道6259号 L1 层55/56号商铺",
    "longitude": "113.804601",
    "latitude": "22.678654",
    "mobile": "075523224859",
    "name": "福永同泰时代城店"
  },
  "send_status": 0,
  "discount": [{
    "summary": "优惠券：省28.00元，茶饮满二赠一券",
    "amount": "28.00",
    "method": "coupon",
    "order_no": "D5E7A064EA50054115",
    "name": "茶饮满二赠一券",
    "data_id": "420000007885550000"
  }],
  "status": 5,
  "completed_time": "2020-03-24 21:13:07",
  "amount": "56.00",
  "multi_store": "福永同泰时代城店",
  "productioned_time": "2020-03-24 21:12:13",
  "postscript": "打包",
  "sort_num": "8106",
  "order_no": "ABCDEFGHIJKLMN0012",
  "id": 12,
  "typeCate": 1,
  "goods": [{
    "number": 1,
    "originAmount": "28.00",
    "price": "28.00",
    "unit": "件",
    "property": "标准(芝士),去冰,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg",
    "amount": "28.00",
    "name": "霸气芝士芒果"
  }, {
    "number": 1,
    "originAmount": "28.00",
    "price": "28.00",
    "unit": "件",
    "property": "标准(芝士),冰沙,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/26/a2aad6ced9aa42e2c6.jpg",
    "amount": "28.00",
    "name": "霸气芝士芒果"
  }, {
    "number": 1,
    "originAmount": "28.00",
    "price": "28.00",
    "unit": "件",
    "property": "标准(芝士),冰沙,标准糖",
    "image": "https://img-shop.qmimg.cn/s23107/2019/04/26/1cb88e6cd2fbcefb2a.jpg",
    "amount": "28.00",
    "name": "霸气芝士草莓"
  }]
}];
exports.default = _default;

/***/ }),
/* 47 */
/*!*****************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/customer-coupons.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "couponExplain": "<p>1. 在有效期内，凭此券在奈雪内地任意门店(机场店、奈雪梦工厂除外)及“奈雪点单”小程序免费兑换任意饮品或软欧包一份，菜单上标有红色雪花产品除外</p><p>2. 此券不可兑换现金，不设找零，优惠券抵扣金额不予积分</p><p>3. 此券每单仅限使用一张，不得与其他优惠券同时使用</p><p>4. 此券不适用于第三方外送服务</p><p>5. 券面图片仅供参考，产品以实物为准</p>",
  "discountUnit": 1,
  "imageUrl": "https://images.qmai.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
  "id": "1",
  "discountAmount": null,
  "beginAt": "2020-05-10 00:00:00",
  "useTimeScope": "[{\"begin\":\"00:00:00\",\"end\":\"23:59:59\"}]",
  "endAt": "2020-06-08 23:59:59",
  "createdAt": "2020-05-10 02:06:00",
  "title": "生日免费券",
  "couponId": "1",
  "deletedAt": null,
  "sellerName": "奈雪の茶",
  "updatedAt": "2020-05-10 02:06:00",
  "couponType": 1
}, {
  "couponExplain": "1. 适用商品：免费兑换生日特调鸡尾酒一杯\n2. 适用门店：仅限内地奈雪酒屋任意门店堂食使用\n3. 适用场景：线下门店出示会员码使用\n4. 本券仅限消费酒类产品，依法不支持未成年人使用\n5. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n6. 此券不适用于第三方外送服务\n7. 券面图片仅供参考，产品以实物为准",
  "discountUnit": null,
  "imageUrl": "https://images.qmai.cn/s34747/2019/12/04/5d97da76e82bfe26d3.png",
  "id": "2",
  "discountAmount": null,
  "beginAt": "2020-05-10 00:00:00",
  "useTimeScope": "[{\"begin\":\"00:00:00\",\"end\":\"23:59:59\"}]",
  "endAt": "2020-06-08 23:59:59",
  "createdAt": "2020-05-10 02:06:00",
  "title": "生日特调券",
  "couponId": "2",
  "deletedAt": null,
  "sellerName": "奈雪酒屋",
  "updatedAt": "2020-05-10 02:06:00",
  "couponType": 2
}, {
  "couponExplain": "1. 使用条件：在有效期内，免费兑换鸡尾酒一杯，每周五、周六与法定节假日19点后不支持使用\n2. 适用商品：鸡尾酒/红葡萄酒/白葡萄酒，具体以门店营业信息为准\n3. 适用门店：仅限内地奈雪酒屋任意门店堂食使用\n4. 适用场景：线下门店出示会员码使用\n5. 本券仅限消费酒类产品，依法不支持未成年人使用\n6. 此券每单仅限使用一张，不可兑换现金，不设找零，优惠券抵扣金额不予积分\n7. 此券不适用于第三方外送服务8. 券面图片仅供参考，产品以实物为准",
  "discountUnit": null,
  "imageUrl": "https://images.qmai.cn/s34747/2019/12/04/5d97da76e82bfe26d3.png",
  "id": "3",
  "discountAmount": null,
  "beginAt": "2020-05-08 00:00:00",
  "useTimeScope": "[{\"begin\":\"00:00:00\",\"end\":\"23:59:59\"}]",
  "endAt": "2020-06-06 23:59:59",
  "createdAt": "2020-05-08 19:25:41",
  "title": "酒屋特调券",
  "couponId": "3",
  "deletedAt": null,
  "sellerName": "奈雪酒屋",
  "updatedAt": "2020-05-08 19:25:41",
  "couponType": 2
}, {
  "couponExplain": "<p>1. 在有效期内，凭此券可在奈雪内地任意门店(机场店、奈雪梦工厂除外)及“奈雪点单”小程序购买任意茶饮一杯，可免费获得软欧包一个（价格不高于茶饮），菜单上标有红色雪花产品除外</p><p>2. 此券不可兑换现金，不设找零，优惠券抵扣金额不予积分</p><p>3. 此券每单仅限使用一张，不得与其他优惠券同时使用</p><p>4. 此券不适用于第三方外送服务</p><p>5. 券面图片仅供参考，产品以实物为准</p>",
  "discountUnit": 2,
  "imageUrl": "https://images.qmai.cn/s23107/2019/10/10/8a8be6ddf7a4140944.jpg",
  "id": "4",
  "discountAmount": 0,
  "beginAt": "2020-05-08 00:00:00",
  "useTimeScope": "[{\"begin\":\"00:00:00\",\"end\":\"23:59:59\"}]",
  "endAt": "2020-06-06 23:59:59",
  "createdAt": "2020-05-08 19:25:41",
  "title": "升级好友券",
  "couponId": "4",
  "deletedAt": null,
  "sellerName": "奈雪の茶",
  "updatedAt": "2020-05-08 19:25:41",
  "couponType": 1
}, {
  "couponExplain": "<p>1. 在有效期内，凭此券可在奈雪内地任意门店(机场店、奈雪梦工厂除外)及“奈雪点单”小程序享受购买任意茶饮满两杯赠一杯（赠送产品价格不高于购买产品），菜单上标有红色雪花产品除外</p><p>2. 此券不可兑换现金，不设找零，优惠券抵扣金额不予积分</p><p>3. 此券每单仅限使用一张，不得与其他优惠券同时使用</p><p>4. 此券不适用于第三方外送服务</p><p>5. 券面图片仅供参考，产品以实物为准</p>",
  "discountUnit": 2,
  "imageUrl": "https://images.qmai.cn/s23107/2019/10/09/ea5b8ed493c0cc310d.jpg",
  "id": "5",
  "discountAmount": 0,
  "beginAt": "2020-05-08 00:00:00",
  "useTimeScope": "[{\"begin\":\"00:00:00\",\"end\":\"23:59:59\"}]",
  "endAt": "2020-06-06 23:59:59",
  "createdAt": "2020-05-08 19:25:41",
  "title": "茶饮满二赠一券",
  "couponId": "5",
  "deletedAt": null,
  "sellerName": "奈雪の茶",
  "updatedAt": "2020-05-08 19:25:41",
  "couponType": 1
}, {
  "couponExplain": "<p>1.&nbsp;在有效期内，凭此券可在“奈雪点单”小程序外卖(机场店、奈雪梦工厂除外)购买任意茶饮或软欧包减免5元优惠</p><p>2.&nbsp;此券不可兑换现金，不设找零，优惠券抵扣金额不予积分</p><p>3.&nbsp;此券每单仅限使用一张，不得与其他优惠券同时使用</p><p>4.&nbsp;此券不适用于第三方外送服务</p><p>5.&nbsp;券面图片仅供参考，产品以实物为准</p>",
  "imageUrl": "https://images.qmai.cn/s23107/2019/12/04/fcb80e25ea8b39c1ac.jpg",
  "id": "6",
  "discountAmount": 5,
  "beginAt": "2020-05-08 00:00:00",
  "useTimeScope": "[{\"begin\":\"00:00:00\",\"end\":\"23:59:59\"}]",
  "endAt": "2020-06-06 23:59:59",
  "createdAt": "2020-05-08 19:25:40",
  "title": "小程序外卖5元现金券",
  "couponId": "6",
  "deletedAt": null,
  "sellerName": "奈雪の茶",
  "updatedAt": "2020-05-08 19:25:40",
  "couponType": 1
}];
exports.default = _default;

/***/ }),
/* 48 */
/*!********************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/common/util.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time;
  }
  var hour = parseInt(time / 3600);
  time = time % 3600;
  var minute = parseInt(time / 60);
  time = time % 60;
  var second = time;
  return [hour, minute, second].map(function (n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }).join(':');
}
function formatDateTime(date) {
  var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd hh:mm:ss';
  if (!date) {
    return '';
  }
  if (typeof date === 'number') {
    date = new Date(date * 1000);
  }
  var o = {
    "M+": date.getMonth() + 1,
    //月份
    "d+": date.getDate(),
    //日
    "h+": date.getHours(),
    //小时
    "m+": date.getMinutes(),
    //分
    "s+": date.getSeconds(),
    //秒
    "q+": Math.floor((date.getMonth() + 3) / 3),
    //季度
    "S": date.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
  }
  return fmt;
}
function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude);
  }
  longitude = longitude.toFixed(2);
  latitude = latitude.toFixed(2);
  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  };
}
var dateUtils = {
  UNITS: {
    '年': 31557600000,
    '月': 2629800000,
    '天': 86400000,
    '小时': 3600000,
    '分钟': 60000,
    '秒': 1000
  },
  humanize: function humanize(milliseconds) {
    var humanize = '';
    for (var key in this.UNITS) {
      if (milliseconds >= this.UNITS[key]) {
        humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
        break;
      }
    }
    return humanize || '刚刚';
  },
  format: function format(dateStr) {
    var date = this.parse(dateStr);
    var diff = Date.now() - date.getTime();
    if (diff < this.UNITS['天']) {
      return this.humanize(diff);
    }
    var _format = function _format(number) {
      return number < 10 ? '0' + number : number;
    };
    return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' + _format(date.getHours()) + ':' + _format(date.getMinutes());
  },
  parse: function parse(str) {
    //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
    var a = str.split(/[^0-9]/);
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
  }
};
module.exports = {
  formatTime: formatTime,
  formatDateTime: formatDateTime,
  formatLocation: formatLocation,
  dateUtils: dateUtils
};

/***/ }),
/* 49 */
/*!********************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/store/index.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 50));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 52));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 53));
var _api = _interopRequireDefault(__webpack_require__(/*! @/api */ 33));
var _addresses = _interopRequireDefault(__webpack_require__(/*! @/api/addresses */ 40));
_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {
    store: {},
    cart: [],
    orderType: 'takein',
    address: {},
    addresses: _addresses.default,
    member: {},
    order: {}
  },
  getters: {
    isLogin: function isLogin(state) {
      return Object.keys(state.member).length > 0;
    } //是否登录
  },

  mutations: {
    SET_ORDER_TYPE: function SET_ORDER_TYPE(state, type) {
      state.orderType = type;
    },
    SET_MEMBER: function SET_MEMBER(state, member) {
      state.member = member;
    },
    SET_ADDRESS: function SET_ADDRESS(state, address) {
      state.address = address;
    },
    SET_ADDRESSES: function SET_ADDRESSES(state, addresses) {
      state.addresses = addresses;
    },
    SET_STORE: function SET_STORE(state, store) {
      state.store = store;
    },
    SET_CART: function SET_CART(state, cart) {
      state.cart = cart;
    },
    REMOVE_CART: function REMOVE_CART(state) {
      state.cart = [];
    },
    SET_ORDER: function SET_ORDER(state, order) {
      state.order = order;
    }
  },
  actions: {
    getStore: function getStore(_ref) {
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var commit, store;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                commit = _ref.commit;
                _context.next = 3;
                return (0, _api.default)('store');
              case 3:
                store = _context.sent;
                commit('SET_STORE', store);
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }
});
var _default = store;
exports.default = _default;

/***/ }),
/* 50 */
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 51)();
module.exports = runtime;

/***/ }),
/* 51 */
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) {
              if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            }
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) {
      r.push(n);
    }
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) {
        "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      }
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 52 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 53 */
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 54 */
/*!************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/common/js/utils.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
var app_info = __webpack_require__(/*! @/static/app_info.js */ 55);
var api_host = app_info.api_host;
var version = app_info.version;
var api_prefix = api_host;

//工具类
module.exports = {
  timestamp: function timestamp() {
    return parseInt(new Date().getTime() / 1000);
  },
  cons_log: function cons_log() {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }
    for (var _i = 0, _params = params; _i < _params.length; _i++) {
      var p = _params[_i];
      console.log(p);
    }
  },
  cons_log_json: function cons_log_json() {
    for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      params[_key2] = arguments[_key2];
    }
    for (var _i2 = 0, _params2 = params; _i2 < _params2.length; _i2++) {
      var p = _params2[_i2];
      console.log(JSON.stringify(p));
    }
  },
  goto: function goto(url) {
    uni.navigateTo({
      url: url
    });
  },
  goreto: function goreto(url) {
    uni.redirectTo({
      url: url
    });
  },
  gotore: function gotore(url) {
    uni.reLaunch({
      url: url
    });
  },
  goback: function goback() {
    var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    uni.navigateBack({
      delta: delta
    });
  },
  toast: function toast(msg) {
    var icon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2000;
    var mask = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var image = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
    uni.showToast({
      title: msg,
      icon: icon,
      duration: duration,
      mask: mask,
      image: image
    });
  },
  loading: function loading(msg) {
    uni.showLoading({
      title: msg
    });
  },
  closeLoading: function closeLoading() {
    uni.hideLoading();
  },
  alert: function alert(content, callBack) {
    uni.hideLoading();
    uni.showModal({
      content: content,
      showCancel: false,
      success: function success() {
        if (callBack != undefined) {
          callBack();
        }
      }
    });
  },
  getData: function getData(key) {
    var is_clear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var value = uni.getStorageSync(key);
    if (is_clear) {
      uni.setStorageSync(key, '');
    }
    // console.log('get cache', key, value)
    return value;
  },
  setData: function setData(key, value) {
    // console.log('set cache', key, value)
    uni.setStorageSync(key, value);
  },
  array_column: function array_column(obj, key) {
    var objects = [];
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      if (_typeof(obj[i]) == 'object') {
        objects = objects.concat(this.array_column(obj[i], key));
      } else if (i == key) {
        objects.push(obj[i]);
      }
    }
    return objects;
  },
  shuffle: function shuffle(arr) {
    var l = arr.length;
    var index, temp;
    while (l > 0) {
      index = Math.floor(Math.random() * l);
      temp = arr[l - 1];
      arr[l - 1] = arr[index];
      arr[index] = temp;
      l--;
    }
    return arr;
  },
  // 秒数转时分秒格式
  sec_to_time: function sec_to_time(s) {
    var t;
    if (s > -1) {
      var hour = Math.floor(s / 3600);
      var min = Math.floor(s / 60) % 60;
      var sec = s % 60;
      if (hour < 10) {
        t = '0' + hour + ":";
      } else {
        t = hour + ":";
      }
      if (min < 10) {
        t += "0";
      }
      t += min + ":";
      if (sec < 10) {
        t += "0";
      }
      t += sec.toFixed(2);
    }
    return t;
  },
  login: function login() {
    var token = this.getData('token');
    var user = this.getData('user');
    if (!token || !user) {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      var url = currentPage.route;
      var options = currentPage.options;
      var urlWithArgs = "/".concat(url, "?");
      for (var key in options) {
        var value = options[key];
        urlWithArgs += "".concat(key, "=").concat(value, "&");
      }
      urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);
      uni.setStorageSync('route', urlWithArgs);
      console.log('没有缓存数据，需先授权');
      uni.redirectTo({
        url: "/pages/login/login"
      });
      return;
    }
    return true;
  },
  /**
   * rich-text富文本中图片宽度最大100%
   * @param {String} html
   */
  formatRichText: function formatRichText(html) {
    // 去掉img标签里的style、width、height属性
    var content_data = html.replace(/<img[^>]*>/gi, function (match, capture) {
      match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
      match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
      match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
      return match;
    });

    // 修改所有style里的width属性为max-width:100%
    content_data = content_data.replace(/style="[^"]+"/gi, function (match, capture) {
      match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
      return match;
    });

    // 去掉<br/>标签
    content_data = content_data.replace(/<br[^>]*\/>/gi, '');
    // img标签添加style属性：max-width:100%;height:auto
    content_data = content_data.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:0px auto;"');
    return content_data;
  },
  /**
   * http请求
   * @param handler
   * @param path
   * @param data
   * @param method
   * @param showLoading
   * @returns {Promise<unknown>}
   */
  http: function http(handler, path) {
    var _this = this;
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'post';
    var showLoading = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var url = api_prefix + path;
    var timestamp = Date.parse(new Date());
    if (_typeof(data) == 'object') {
      data['timestamp'] = timestamp;
    }
    if (showLoading) {
      uni.showLoading({
        title: '加载中..',
        mask: true
      });
    }
    return new Promise(function (resolve, reject) {
      uni.request({
        url: url,
        method: method,
        data: data,
        header: {
          'content-type': 'application/json',
          'Authorization': "Bearer ".concat(_this.getData('token')),
          'app-version': version
        },
        success: function success(res) {
          // console.log('http res', res)
          if (res.statusCode == 200) {
            // 检查是否有新的令牌
            var newToken = res.header['Authorization'];
            if (newToken) {
              console.log('newToken', newToken);
              uni.setStorage({
                //缓存配置信息
                key: 'token',
                data: newToken.replace('Bearer ', '')
              });
              console.log('oldToken', _this.getData('token'));
            }
            resolve(res.data);
          } else {
            // console.log('http statusCode', res.statusCode)
            uni.showToast({
              title: res.data.message,
              icon: 'none'
            });

            // 未登录
            if (res.statusCode == 401) {
              uni.showToast({
                title: "用户未登录",
                icon: 'none'
              });
            }
            if (res.statusCode == 403) {
              uni.showToast({
                title: "用户登录过期",
                icon: 'none'
              });
            }
            _this.forceLogout();
            reject(res.data);
          }
        },
        fail: function fail(res) {
          console.log(res);
          return false;
        },
        complete: function complete(res) {
          showLoading && uni.hideLoading();
        }
      });
    });
  },
  forceLogout: function forceLogout() {
    var userinfo = uni.getStorageSync('userinfo');
    this.http('/user/wxLogout', userinfo.id, 'post');
    uni.removeStorageSync('avatar');
    uni.removeStorageSync('userinfo');
    uni.removeStorageSync('token');
    this.resetUserData();
    uni.navigateTo({
      url: "/pages/index/index"
    });
  },
  /**
   * 上传文件
   * @returns {Promise<*>}
   */
  uploadFile: function uploadFile(handler, filePath) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var fileType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'image';
    var showLoading = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    if (showLoading) {
      uni.showLoading({
        title: '加载中..',
        mask: true
      });
    }
    return new Promise(function (resolve, reject) {
      uni.uploadFile({
        url: api_prefix + 'common/upload',
        header: {
          'token': uni.getStorageSync('token'),
          "Content-Type": "multipart/form-data"
        },
        fileType: fileType,
        filePath: filePath,
        formData: data,
        name: 'file',
        success: function success(res) {
          console.log('upload res', res);
          var data = JSON.parse(res.data);
          if (res.statusCode == 200) {
            resolve(data);
          } else {
            console.log('upload statusCode', res.statusCode);
            uni.showToast({
              title: data.message,
              icon: 'none'
            });

            // 未登录
            if (res.statusCode == 401) {
              handler.$refs.login.modal = true;
            }
          }
        },
        fail: function fail(res) {
          console.log('fail res', res);
          return false;
        },
        complete: function complete(res) {
          showLoading && uni.hideLoading();
        }
      });
    });
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 55 */
/*!************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/static/app_info.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var app_info = {
  api_host: "http://localhost:8088/api",
  version: '1.0.0'
};
module.exports = app_info;

/***/ }),
/* 56 */
/*!*********************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/common/js/ad.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {var interstitialAd = null;
var interstitial = {
  load: function load(id) {
    if (id && uni.createInterstitialAd) {
      interstitialAd = uni.createInterstitialAd({
        adUnitId: id
      });
      interstitialAd.onLoad(function () {
        console.log('插屏广告加载中');
      });
      interstitialAd.onError(function (err) {
        console.log('加载错误', err);
      });
      interstitialAd.onClose(function (res) {
        console.log('插屏广告关闭', res);
      });
    }
  },
  show: function show() {
    if (interstitialAd) {
      interstitialAd.show().catch(function (err) {
        console.error(err);
      });
    }
  }
};
var videoAd = null;
var rewarded = {
  load: function load(id, e) {
    if (id && uni.createRewardedVideoAd) {
      videoAd = uni.createRewardedVideoAd({
        adUnitId: id
      });
      videoAd.onError(function (err) {
        console.log(err);
        e();
        return uni.showToast({
          title: '暂无广告',
          icon: 'none'
        });
      });
      // videoAd.onClose((status) => {
      // 	if (status && status.isEnded || status === undefined) {
      // 		e()
      // 	} else {

      // 	}
      // })

      //防止奖励重复发放
      try {
        if (videoAd.closeHandler) {
          videoAd.offClose(videoAd.closeHandler);
          console.log("videoAd.offClose卸载成功");
        }
      } catch (e) {
        console.log("videoAd.offClose 卸载失败");
        console.error(e);
      }
      videoAd.closeHandler = function (res) {
        // 用户点击了【关闭广告】按钮
        if (res && res.isEnded || res === undefined) {
          // 正常播放结束，可以下发奖励
          console.log("播放完毕");
          e();
        } else {
          //提前关闭小程序
          console.log("none", "您看完广告后才能下载~");
        }
      };
      videoAd.onClose(videoAd.closeHandler);
    }
  },
  show: function show(e) {
    if (videoAd) {
      videoAd.show().catch(function () {
        // 失败重试
        videoAd.load().then(function () {
          return videoAd.show();
        }).catch(function (err) {
          console.log('激励视频 广告显示失败');
          e();
        });
      });
    }
  }
};
module.exports = {
  interstitial: interstitial,
  rewarded: rewarded
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 57 */
/*!************************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/node_modules/js-md5/src/md5.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global, module) {var __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_MD5_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object';
  var NODE_JS = !root.JS_MD5_NO_NODE_JS && (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_MD5_NO_COMMON_JS && ( false ? undefined : _typeof(module)) === 'object' && module.exports;
  var AMD =  true && __webpack_require__(/*! !webpack amd options */ 61);
  var ARRAY_BUFFER = !root.JS_MD5_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [128, 32768, 8388608, -2147483648];
  var SHIFT = [0, 8, 16, 24];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'buffer', 'arrayBuffer', 'base64'];
  var BASE64_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
  var blocks = [],
    buffer8;
  if (ARRAY_BUFFER) {
    var buffer = new ArrayBuffer(68);
    buffer8 = new Uint8Array(buffer);
    blocks = new Uint32Array(buffer);
  }
  if (root.JS_MD5_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }
  if (ARRAY_BUFFER && (root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return _typeof(obj) === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  /**
   * @method hex
   * @memberof md5
   * @description Output hash as hex string
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {String} Hex string
   * @example
   * md5.hex('The quick brown fox jumps over the lazy dog');
   * // equal to
   * md5('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method digest
   * @memberof md5
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md5.digest('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method array
   * @memberof md5
   * @description Output hash as bytes array
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Array} Bytes array
   * @example
   * md5.array('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method arrayBuffer
   * @memberof md5
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md5.arrayBuffer('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof md5
   * @description Output hash as ArrayBuffer
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {ArrayBuffer} ArrayBuffer
   * @example
   * md5.buffer('The quick brown fox jumps over the lazy dog');
   */
  /**
   * @method base64
   * @memberof md5
   * @description Output hash as base64 string
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {String} base64 string
   * @example
   * md5.base64('The quick brown fox jumps over the lazy dog');
   */
  var createOutputMethod = function createOutputMethod(outputType) {
    return function (message) {
      return new Md5(true).update(message)[outputType]();
    };
  };

  /**
   * @method create
   * @memberof md5
   * @description Create Md5 object
   * @returns {Md5} Md5 object.
   * @example
   * var hash = md5.create();
   */
  /**
   * @method update
   * @memberof md5
   * @description Create and update Md5 object
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md5} Md5 object.
   * @example
   * var hash = md5.update('The quick brown fox jumps over the lazy dog');
   * // equal to
   * var hash = md5.create();
   * hash.update('The quick brown fox jumps over the lazy dog');
   */
  var createMethod = function createMethod() {
    var method = createOutputMethod('hex');
    if (NODE_JS) {
      method = nodeWrap(method);
    }
    method.create = function () {
      return new Md5();
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type);
    }
    return method;
  };
  var nodeWrap = function nodeWrap(method) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var nodeMethod = function nodeMethod(message) {
      if (typeof message === 'string') {
        return crypto.createHash('md5').update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw ERROR;
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }
      if (Array.isArray(message) || ArrayBuffer.isView(message) || message.constructor === Buffer) {
        return crypto.createHash('md5').update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };
    return nodeMethod;
  };

  /**
   * Md5 class
   * @class Md5
   * @description This is internal class.
   * @see {@link md5.create}
   */
  function Md5(sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
      this.buffer8 = buffer8;
    } else {
      if (ARRAY_BUFFER) {
        var buffer = new ArrayBuffer(68);
        this.buffer8 = new Uint8Array(buffer);
        this.blocks = new Uint32Array(buffer);
      } else {
        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
    this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
  }

  /**
   * @method update
   * @memberof Md5
   * @instance
   * @description Update hash
   * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
   * @returns {Md5} Md5 object.
   * @see {@link md5.update}
   */
  Md5.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }
    var notString,
      type = _typeof(message);
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw ERROR;
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw ERROR;
          }
        }
      } else {
        throw ERROR;
      }
      notString = true;
    }
    var code,
      index = 0,
      i,
      length = message.length,
      blocks = this.blocks;
    var buffer8 = this.buffer8;
    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = blocks[16];
        blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }
      if (notString) {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            buffer8[i++] = message[index];
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
          }
        }
      } else {
        if (ARRAY_BUFFER) {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              buffer8[i++] = code;
            } else if (code < 0x800) {
              buffer8[i++] = 0xc0 | code >> 6;
              buffer8[i++] = 0x80 | code & 0x3f;
            } else if (code < 0xd800 || code >= 0xe000) {
              buffer8[i++] = 0xe0 | code >> 12;
              buffer8[i++] = 0x80 | code >> 6 & 0x3f;
              buffer8[i++] = 0x80 | code & 0x3f;
            } else {
              code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
              buffer8[i++] = 0xf0 | code >> 18;
              buffer8[i++] = 0x80 | code >> 12 & 0x3f;
              buffer8[i++] = 0x80 | code >> 6 & 0x3f;
              buffer8[i++] = 0x80 | code & 0x3f;
            }
          }
        } else {
          for (i = this.start; index < length && i < 64; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              blocks[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 0x800) {
              blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            } else if (code < 0xd800 || code >= 0xe000) {
              blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            } else {
              code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
              blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
            }
          }
        }
      }
      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };
  Md5.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks,
      i = this.lastByteIndex;
    blocks[i >> 2] |= EXTRA[i & 3];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = blocks[16];
      blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.bytes << 3;
    blocks[15] = this.hBytes << 3 | this.bytes >>> 29;
    this.hash();
  };
  Md5.prototype.hash = function () {
    var a,
      b,
      c,
      d,
      bc,
      da,
      blocks = this.blocks;
    if (this.first) {
      a = blocks[0] - 680876937;
      a = (a << 7 | a >>> 25) - 271733879 << 0;
      d = (-1732584194 ^ a & 2004318071) + blocks[1] - 117830708;
      d = (d << 12 | d >>> 20) + a << 0;
      c = (-271733879 ^ d & (a ^ -271733879)) + blocks[2] - 1126478375;
      c = (c << 17 | c >>> 15) + d << 0;
      b = (a ^ c & (d ^ a)) + blocks[3] - 1316259209;
      b = (b << 22 | b >>> 10) + c << 0;
    } else {
      a = this.h0;
      b = this.h1;
      c = this.h2;
      d = this.h3;
      a += (d ^ b & (c ^ d)) + blocks[0] - 680876936;
      a = (a << 7 | a >>> 25) + b << 0;
      d += (c ^ a & (b ^ c)) + blocks[1] - 389564586;
      d = (d << 12 | d >>> 20) + a << 0;
      c += (b ^ d & (a ^ b)) + blocks[2] + 606105819;
      c = (c << 17 | c >>> 15) + d << 0;
      b += (a ^ c & (d ^ a)) + blocks[3] - 1044525330;
      b = (b << 22 | b >>> 10) + c << 0;
    }
    a += (d ^ b & (c ^ d)) + blocks[4] - 176418897;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[5] + 1200080426;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[6] - 1473231341;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[7] - 45705983;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ b & (c ^ d)) + blocks[8] + 1770035416;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[9] - 1958414417;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[10] - 42063;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[11] - 1990404162;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (d ^ b & (c ^ d)) + blocks[12] + 1804603682;
    a = (a << 7 | a >>> 25) + b << 0;
    d += (c ^ a & (b ^ c)) + blocks[13] - 40341101;
    d = (d << 12 | d >>> 20) + a << 0;
    c += (b ^ d & (a ^ b)) + blocks[14] - 1502002290;
    c = (c << 17 | c >>> 15) + d << 0;
    b += (a ^ c & (d ^ a)) + blocks[15] + 1236535329;
    b = (b << 22 | b >>> 10) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[1] - 165796510;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[6] - 1069501632;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[11] + 643717713;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[0] - 373897302;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[5] - 701558691;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[10] + 38016083;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[15] - 660478335;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[4] - 405537848;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[9] + 568446438;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[14] - 1019803690;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[3] - 187363961;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[8] + 1163531501;
    b = (b << 20 | b >>> 12) + c << 0;
    a += (c ^ d & (b ^ c)) + blocks[13] - 1444681467;
    a = (a << 5 | a >>> 27) + b << 0;
    d += (b ^ c & (a ^ b)) + blocks[2] - 51403784;
    d = (d << 9 | d >>> 23) + a << 0;
    c += (a ^ b & (d ^ a)) + blocks[7] + 1735328473;
    c = (c << 14 | c >>> 18) + d << 0;
    b += (d ^ a & (c ^ d)) + blocks[12] - 1926607734;
    b = (b << 20 | b >>> 12) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[5] - 378558;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[8] - 2022574463;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[11] + 1839030562;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[14] - 35309556;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[1] - 1530992060;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[4] + 1272893353;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[7] - 155497632;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[10] - 1094730640;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[13] + 681279174;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[0] - 358537222;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[3] - 722521979;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[6] + 76029189;
    b = (b << 23 | b >>> 9) + c << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[9] - 640364487;
    a = (a << 4 | a >>> 28) + b << 0;
    d += (bc ^ a) + blocks[12] - 421815835;
    d = (d << 11 | d >>> 21) + a << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[15] + 530742520;
    c = (c << 16 | c >>> 16) + d << 0;
    b += (da ^ c) + blocks[2] - 995338651;
    b = (b << 23 | b >>> 9) + c << 0;
    a += (c ^ (b | ~d)) + blocks[0] - 198630844;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[7] + 1126891415;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[14] - 1416354905;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[5] - 57434055;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[12] + 1700485571;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[3] - 1894986606;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[10] - 1051523;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[1] - 2054922799;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[8] + 1873313359;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[15] - 30611744;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[6] - 1560198380;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[13] + 1309151649;
    b = (b << 21 | b >>> 11) + c << 0;
    a += (c ^ (b | ~d)) + blocks[4] - 145523070;
    a = (a << 6 | a >>> 26) + b << 0;
    d += (b ^ (a | ~c)) + blocks[11] - 1120210379;
    d = (d << 10 | d >>> 22) + a << 0;
    c += (a ^ (d | ~b)) + blocks[2] + 718787259;
    c = (c << 15 | c >>> 17) + d << 0;
    b += (d ^ (c | ~a)) + blocks[9] - 343485551;
    b = (b << 21 | b >>> 11) + c << 0;
    if (this.first) {
      this.h0 = a + 1732584193 << 0;
      this.h1 = b - 271733879 << 0;
      this.h2 = c - 1732584194 << 0;
      this.h3 = d + 271733878 << 0;
      this.first = false;
    } else {
      this.h0 = this.h0 + a << 0;
      this.h1 = this.h1 + b << 0;
      this.h2 = this.h2 + c << 0;
      this.h3 = this.h3 + d << 0;
    }
  };

  /**
   * @method hex
   * @memberof Md5
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md5.hex}
   * @example
   * hash.hex();
   */
  Md5.prototype.hex = function () {
    this.finalize();
    var h0 = this.h0,
      h1 = this.h1,
      h2 = this.h2,
      h3 = this.h3;
    return HEX_CHARS[h0 >> 4 & 0x0F] + HEX_CHARS[h0 & 0x0F] + HEX_CHARS[h0 >> 12 & 0x0F] + HEX_CHARS[h0 >> 8 & 0x0F] + HEX_CHARS[h0 >> 20 & 0x0F] + HEX_CHARS[h0 >> 16 & 0x0F] + HEX_CHARS[h0 >> 28 & 0x0F] + HEX_CHARS[h0 >> 24 & 0x0F] + HEX_CHARS[h1 >> 4 & 0x0F] + HEX_CHARS[h1 & 0x0F] + HEX_CHARS[h1 >> 12 & 0x0F] + HEX_CHARS[h1 >> 8 & 0x0F] + HEX_CHARS[h1 >> 20 & 0x0F] + HEX_CHARS[h1 >> 16 & 0x0F] + HEX_CHARS[h1 >> 28 & 0x0F] + HEX_CHARS[h1 >> 24 & 0x0F] + HEX_CHARS[h2 >> 4 & 0x0F] + HEX_CHARS[h2 & 0x0F] + HEX_CHARS[h2 >> 12 & 0x0F] + HEX_CHARS[h2 >> 8 & 0x0F] + HEX_CHARS[h2 >> 20 & 0x0F] + HEX_CHARS[h2 >> 16 & 0x0F] + HEX_CHARS[h2 >> 28 & 0x0F] + HEX_CHARS[h2 >> 24 & 0x0F] + HEX_CHARS[h3 >> 4 & 0x0F] + HEX_CHARS[h3 & 0x0F] + HEX_CHARS[h3 >> 12 & 0x0F] + HEX_CHARS[h3 >> 8 & 0x0F] + HEX_CHARS[h3 >> 20 & 0x0F] + HEX_CHARS[h3 >> 16 & 0x0F] + HEX_CHARS[h3 >> 28 & 0x0F] + HEX_CHARS[h3 >> 24 & 0x0F];
  };

  /**
   * @method toString
   * @memberof Md5
   * @instance
   * @description Output hash as hex string
   * @returns {String} Hex string
   * @see {@link md5.hex}
   * @example
   * hash.toString();
   */
  Md5.prototype.toString = Md5.prototype.hex;

  /**
   * @method digest
   * @memberof Md5
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md5.digest}
   * @example
   * hash.digest();
   */
  Md5.prototype.digest = function () {
    this.finalize();
    var h0 = this.h0,
      h1 = this.h1,
      h2 = this.h2,
      h3 = this.h3;
    return [h0 & 0xFF, h0 >> 8 & 0xFF, h0 >> 16 & 0xFF, h0 >> 24 & 0xFF, h1 & 0xFF, h1 >> 8 & 0xFF, h1 >> 16 & 0xFF, h1 >> 24 & 0xFF, h2 & 0xFF, h2 >> 8 & 0xFF, h2 >> 16 & 0xFF, h2 >> 24 & 0xFF, h3 & 0xFF, h3 >> 8 & 0xFF, h3 >> 16 & 0xFF, h3 >> 24 & 0xFF];
  };

  /**
   * @method array
   * @memberof Md5
   * @instance
   * @description Output hash as bytes array
   * @returns {Array} Bytes array
   * @see {@link md5.array}
   * @example
   * hash.array();
   */
  Md5.prototype.array = Md5.prototype.digest;

  /**
   * @method arrayBuffer
   * @memberof Md5
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md5.arrayBuffer}
   * @example
   * hash.arrayBuffer();
   */
  Md5.prototype.arrayBuffer = function () {
    this.finalize();
    var buffer = new ArrayBuffer(16);
    var blocks = new Uint32Array(buffer);
    blocks[0] = this.h0;
    blocks[1] = this.h1;
    blocks[2] = this.h2;
    blocks[3] = this.h3;
    return buffer;
  };

  /**
   * @method buffer
   * @deprecated This maybe confuse with Buffer in node.js. Please use arrayBuffer instead.
   * @memberof Md5
   * @instance
   * @description Output hash as ArrayBuffer
   * @returns {ArrayBuffer} ArrayBuffer
   * @see {@link md5.buffer}
   * @example
   * hash.buffer();
   */
  Md5.prototype.buffer = Md5.prototype.arrayBuffer;

  /**
   * @method base64
   * @memberof Md5
   * @instance
   * @description Output hash as base64 string
   * @returns {String} base64 string
   * @see {@link md5.base64}
   * @example
   * hash.base64();
   */
  Md5.prototype.base64 = function () {
    var v1,
      v2,
      v3,
      base64Str = '',
      bytes = this.array();
    for (var i = 0; i < 15;) {
      v1 = bytes[i++];
      v2 = bytes[i++];
      v3 = bytes[i++];
      base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[(v1 << 4 | v2 >>> 4) & 63] + BASE64_ENCODE_CHAR[(v2 << 2 | v3 >>> 6) & 63] + BASE64_ENCODE_CHAR[v3 & 63];
    }
    v1 = bytes[i];
    base64Str += BASE64_ENCODE_CHAR[v1 >>> 2] + BASE64_ENCODE_CHAR[v1 << 4 & 63] + '==';
    return base64Str;
  };
  var exports = createMethod();
  if (COMMON_JS) {
    module.exports = exports;
  } else {
    /**
     * @method md5
     * @description Md5 hash function, export to global in browsers.
     * @param {String|Array|Uint8Array|ArrayBuffer} message message to hash
     * @returns {String} md5 hashes
     * @example
     * md5(''); // d41d8cd98f00b204e9800998ecf8427e
     * md5('The quick brown fox jumps over the lazy dog'); // 9e107d9d372bb6826bd81d3542a419d6
     * md5('The quick brown fox jumps over the lazy dog.'); // e4d909c290d0fb1ca068ffaddf22cbd0
     *
     * // It also supports UTF-8 encoding
     * md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07
     *
     * // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
     * md5([]); // d41d8cd98f00b204e9800998ecf8427e
     * md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e
     */
    root.md5 = exports;
    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 58), __webpack_require__(/*! ./../../../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 3), __webpack_require__(/*! ./../../../../../../../../../HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/module.js */ 60)(module)))

/***/ }),
/* 58 */
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 59);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),
/* 59 */
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 58)))

/***/ }),
/* 60 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 61 */
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),
/* 62 */
/*!****************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/common/mixins/share.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  data: function data() {
    return {
      //设置默认的分享参数
      sharedata: {
        title: '超智AI塔罗测试',
        path: 'pages/index/index',
        imageUrl: 'https://static.supercreator.cn/tarot/share_img_icon.png',
        desc: '超准的塔罗测试',
        content: ''
      }
    };
  },
  //发送给朋友
  onShareAppMessage: function onShareAppMessage(res) {
    if (res.from == 'button') {
      //    console.log("按钮转发--配置");
      // console.log(JSON.stringify(res))
      // console.log(res.target.dataset.id);
      // this.http('/answers/getShare', { platform: 'weixin', user_id: res.target.dataset.id }, 'get').then(res => {})
    }
    return {
      title: this.sharedata.title,
      path: this.sharedata.path,
      imageUrl: this.sharedata.imageUrl,
      desc: this.sharedata.desc,
      content: this.sharedata.content,
      success: function success(res) {
        uni.showToast({
          title: '分享成功'
        });
      },
      fail: function fail(res) {
        uni.showToast({
          title: '分享失败',
          icon: 'none'
        });
      }
    };
  },
  //uniapp微信小程序分享页面到微信朋友圈
  onShareTimeline: function onShareTimeline(res) {
    return {
      title: this.sharedata.title,
      query: '',
      imageUrl: this.sharedata.imageurl,
      success: function success(res) {
        uni.showToast({
          title: '分享成功'
        });
      },
      fail: function fail(res) {
        uni.showToast({
          title: '分享失败',
          icon: 'none'
        });
      }
    };
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 63 */
/*!***************************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/components/uniapp-zaudio/index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _zaudio = _interopRequireDefault(__webpack_require__(/*! ./dist/zaudio.js */ 64));
var _default = _zaudio.default;
exports.default = _default;

/***/ }),
/* 64 */
/*!*********************************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/components/uniapp-zaudio/dist/zaudio.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _toConsumableArray = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18);
var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime/regenerator */ 50);
var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
var _classCallCheck = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23);
var _createClass = __webpack_require__(/*! @babel/runtime/helpers/createClass */ 24);
var _get = __webpack_require__(/*! @babel/runtime/helpers/get */ 65);
var _inherits = __webpack_require__(/*! @babel/runtime/helpers/inherits */ 68);
var _possibleConstructorReturn = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ 69);
var _getPrototypeOf = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ 67);
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var zaudioCbName;
(function (zaudioCbName) {
  zaudioCbName["onWaiting"] = "waiting";
  zaudioCbName["onError"] = "error";
  zaudioCbName["onTimeUpdate"] = "playing";
  zaudioCbName["onCanplay"] = "canPlay";
  zaudioCbName["onPause"] = "pause";
  zaudioCbName["onEnded"] = "ended";
  zaudioCbName["setAudio"] = "setAudio";
  zaudioCbName["updateAudio"] = "updateAudio";
  zaudioCbName["seek"] = "seek";
  zaudioCbName["onStop"] = "stop";
  zaudioCbName["syncStateOn"] = "syncStateOn";
})(zaudioCbName || (zaudioCbName = {}));
var zaudioCbNameArr = [];
for (var key in zaudioCbName) {
  if (Object.prototype.hasOwnProperty.call(zaudioCbName, key)) {
    var item = zaudioCbName[key];
    zaudioCbNameArr.push(item);
  }
}
var util_1 = __webpack_require__(/*! ./util */ 71);
/**
 * ZAudio类
 * @class ZAudio
 * @constructor
 * @param    {String}    defaultCover    音频默认封面
 * @param    {Boolean}   continuePlay    继续播放,错误播放或结束播放后执行
 * @param    {Boolean}   autoPlay        自动播放,部分浏览器不支持
 * @property {Number}         renderIndex     当前渲染索引
 * @property {<audioinfo>}      renderinfo      当前渲染数据
 * @property {Array<audio>}   audiolist       音频列表数组
 * @property {<audioinfo>}      playinfo        当前播放数据
 * @property {Boolean}        paused          音频暂停状态
 * @property {Number}         playIndex       当前播放索引
 * @property {Boolean}        renderIsPlay    渲染与播放是否一致
 *
 * @method on(event, action, fn)       回调函数注册业务事件
 * @method off(event, action)          回调函数中卸载业务事件
 * @method setRender(data)             指定音频, 渲染到zaudio组件
 * @method syncRender()    						 同步并渲染当前的播放状态
 * @method operate(index)       			 播放或暂停指定索引的音频
 * @method setAudio(list)		   				 覆盖音频列表
 * @method updateAudio(list)   				 添加音频列表
 * @method stop()          						 强制暂停当前播放音频
 * @method stepPlay(count)      				快进快退
 * @method syncStateOn(action, cb)       	注册一个用于同步获取当前播放状态的事件
 * @method syncStateOff(action)     		卸载用于同步获取当前播放状态的事件
 *
 *
 * **/
var ZAudio = /*#__PURE__*/function (_util_1$EventBus) {
  _inherits(ZAudio, _util_1$EventBus);
  var _super = _createSuper(ZAudio);
  function ZAudio(options) {
    var _this;
    _classCallCheck(this, ZAudio);
    _this = _super.call(this);
    _this.loading = false;
    _this.renderIndex = 0;
    _this.audiolist = [];
    _this.renderinfo = {
      current: "00:00",
      duration: "00:00",
      duration_value: 0,
      current_value: 0,
      src: "",
      title: "",
      singer: "",
      coverImgUrl: ""
    };
    _this.playinfo = {
      current: "00:00",
      duration: "00:00",
      duration_value: 0,
      current_value: 0,
      src: "",
      title: "",
      singer: "",
      coverImgUrl: ""
    };
    _this.paused = true;
    _this.uPause = false;
    _this.autoPlay = false;
    _this.defaultCover = "";
    _this.continuePlay = true;
    //fix: 防抖触发音频播放中事件
    _this.throttlePlaying = util_1.throttle(function () {
      _this.emit(zaudioCbName.onTimeUpdate, _this.playinfo);
      _this.syncStateEmit();
    }, 1000);
    var defaultCover = options.defaultCover,
      autoPlay = options.autoPlay,
      continuePlay = options.continuePlay;
    _this.defaultCover = defaultCover;
    _this.autoPlay = autoPlay;
    _this.continuePlay = continuePlay;
    _this.init();
    return _this;
  }
  _createClass(ZAudio, [{
    key: "init",
    value: function init() {
      var _this2 = this;
      var audioCtx = uni.getBackgroundAudioManager();
      this.audioCtx = audioCtx;
      this.audioCtx.onWaiting(this.onWaitingHandler.bind(this));
      this.audioCtx.onCanplay(this.onCanplayHandler.bind(this));
      this.audioCtx.onPlay(this.onPlayHandler.bind(this));
      this.audioCtx.onPause(this.onPauseHandler.bind(this));
      this.audioCtx.onStop(this.onStopHandler.bind(this));
      this.audioCtx.onEnded(this.onEndedHandler.bind(this));
      this.audioCtx.onTimeUpdate(this.onTimeUpdateHandler.bind(this));
      this.audioCtx.onError(this.onErrorHandler.bind(this));
      //fix: 修复iOS原生音频切换不起作用

      setTimeout(function () {
        if (_this2.autoPlay) {
          _this2.operate();
        }
      }, 500);
      this.appCheckReplay();
    }
    //检测on off的参数
  }, {
    key: "checkEventParams",
    value: function checkEventParams(event, action, fn) {
      if (zaudioCbNameArr.indexOf(event) < 0) {
        console.error("\u53C2\u6570".concat(event, "\u9519\u8BEF, \u5FC5\u987B\u4E3A").concat(zaudioCbNameArr.join(" | "), "\u4E2D\u67D0\u4E00\u9879"));
        return false;
      }
      if (typeof action !== "string" && _typeof(action) !== "symbol") {
        console.error("\u53C2\u6570".concat(action, "\u9519\u8BEF, \u53C2\u6570\u5FC5\u987B\u4E3Astring\u6216symbol\u7C7B\u578B"));
        return false;
      }
      if (fn && typeof fn !== "function") {
        console.error("fn参数错误");
        return false;
      }
      return true;
    }
    /**
     * @description 回调中卸载业务事件
     * @param {<zaudioCbName>}   event     回调名称枚举值
     * @param {Sting|Symbol}         action    业务函数名,用于区分不同业务
     * @returns undefined
     * **/
  }, {
    key: "off",
    value: function off(event, action) {
      if (!this.checkEventParams(event, action)) return;
      _get(_getPrototypeOf(ZAudio.prototype), "off", this).call(this, event, action);
    }
    /**
     * @description 回调中注册业务事件
     * @param {<zaudioCbName>}        event     回调名称枚举值
     * @param {Sting|Symbol}              action    业务函数名,用于区分不同业务
     * @param {function(object|string|number|undefined):undefined}      fn      业务函数, 参数或为音频状态
     * @returns undefined
     * **/
  }, {
    key: "on",
    value: function on(event, action, fn) {
      if (!this.checkEventParams(event, action)) return;
      _get(_getPrototypeOf(ZAudio.prototype), "on", this).call(this, event, action, fn);
    }
    /**
     * @description 订阅触发音频回调
     * @param {<zaudioCbName>}        event      回调名称枚举值,具体看zaudioCbName
     * @param {object|string|number|undefined}     data        订阅触发回调时,传的音频属性
     * @returns undefined
     * **/
  }, {
    key: "emit",
    value: function emit(event, data) {
      _get(_getPrototypeOf(ZAudio.prototype), "emit", this).call(this, event, data);
    }
  }, {
    key: "commit",
    value: function commit(action, data) {
      typeof this[action] === "function" && this[action](data);
    }
  }, {
    key: "onWaitingHandler",
    value: function onWaitingHandler() {
      this.commit("setLoading", true);
      this.emit(zaudioCbName.onWaiting, true);
      this.syncStateEmit();
    }
  }, {
    key: "onCanplayHandler",
    value: function onCanplayHandler() {
      this.emit(zaudioCbName.onCanplay, this.playinfo);
      this.commit("setLoading", false);
      this.syncStateEmit();
    }
  }, {
    key: "onPlayHandler",
    value: function onPlayHandler() {
      this.commit("setPause", false);
      this.commit("setUnnormalPause", false);
    }
  }, {
    key: "onPauseHandler",
    value: function onPauseHandler() {
      this.commit("setPause", true);
      this.emit(zaudioCbName.onPause);
      this.syncStateEmit();
    }
  }, {
    key: "onStopHandler",
    value: function onStopHandler() {
      this.commit("setPause", true);
      this.emit(zaudioCbName.onStop);
      this.syncStateEmit();
    }
  }, {
    key: "onEndedHandler",
    value: function onEndedHandler() {
      this.commit("setPause", true);
      this.audioCtx.startTime = 0;
      this.commit("setPlayinfo", {
        current: "00:00",
        current_value: 0,
        src: ""
      });
      this.emit(zaudioCbName.onEnded);
      this.syncStateEmit();
      //续播
      if (this.continuePlay) {
        this.changeplay(1);
      }
      // else {
      //     let nextkey = this.getNextKey(1);
      //     this.commit("setRender", nextkey);
      // }
    }
  }, {
    key: "onTimeUpdateHandler",
    value: function onTimeUpdateHandler() {
      if (this.renderIsPlay) {
        //fix: 解决播放进度大于总进度问题
        var currentTime = this.audioCtx.currentTime > this.audioCtx.duration ? this.audioCtx.duration : this.audioCtx.currentTime;
        this.commit("setPlayinfo", {
          current: util_1.formatSeconds(currentTime),
          current_value: currentTime
        });

        //fix: 解决小程序与h5无法获取总进度的问题
        if (this.audioCtx.duration != this.playinfo.duration_value) {
          this.commit("setPlayinfo", {
            duration: util_1.formatSeconds(this.audioCtx.duration),
            duration_value: this.audioCtx.duration
          });
        }
      }
      this.throttlePlaying();
    }
  }, {
    key: "onErrorHandler",
    value: function onErrorHandler() {
      this.commit("setPause", true);
      this.commit("setRender", {
        src: "",
        title: "",
        singer: "",
        coverImgUrl: ""
      });
      this.commit("setPlayinfo", {
        current: "00:00",
        current_value: 0,
        duration: "00:00",
        duration_value: 0,
        title: "",
        src: ""
      });
      this.emit(zaudioCbName.onError);
      this.syncStateEmit();
      if (this.continuePlay) {
        this.changeplay(1);
      }
    }
    /**
     * @description 实时渲染当前状态
     * @returns undefined
     * **/
  }, {
    key: "syncRender",
    value: function syncRender() {
      this.setRender(this.playIndex);
    }
    /**
     * @description 注册一个实时获取ZAudio属性的方法
     * @param {String}        action      自定义业务名
     * @param {Funtion}     fn        实时获取ZAudio属性回调
     * @returns undefined
     * **/
  }, {
    key: "syncStateOn",
    value: function syncStateOn(action, fn) {
      typeof fn === "function" && this.on(zaudioCbName.syncStateOn, action, fn);
    }
    /**
     * @description 卸载实时获取ZAudio属性的方法
     * @param {String}        action      自定义业务名
     * @returns undefined
     * **/
  }, {
    key: "syncStateOff",
    value: function syncStateOff(action) {
      this.off(zaudioCbName.syncStateOn, action);
    }
    /**
     * @description 订阅实时获取ZAudio属性的方法
     * @returns undefined
     * **/
  }, {
    key: "syncStateEmit",
    value: function syncStateEmit() {
      this.emit(zaudioCbName.syncStateOn, {
        renderIndex: this.renderIndex,
        audiolist: this.audiolist,
        renderinfo: this.renderinfo,
        playinfo: this.playinfo,
        paused: this.paused,
        playIndex: this.playIndex,
        renderIsPlay: this.renderIsPlay,
        loading: this.loading
      });
    }
    /**
     * @description 跳转播放
     * @param {Number}        value      跳转位置
     * @returns undefined
     * **/
  }, {
    key: "seek",
    value: function seek(value) {
      var val = value > this.audioCtx.duration ? this.audioCtx.duration : value;
      this.audioCtx.seek(val);
      this.commit("setPlayinfo", {
        current: util_1.formatSeconds(val),
        current_value: val
      });
      // setTimeout(() => {
      //   this.emit(zaudioCbName.seek, this.playinfo.current);
      // }, 0);
      this.emit(zaudioCbName.seek, this.playinfo.current);
    }
    /**
     * @description 快进
     * @param {Number}        value      跳转位置
     * @returns undefined
     * **/
  }, {
    key: "stepPlay",
    value: function stepPlay(value) {
      if (this.renderIsPlay) {
        var pos = this.playinfo.current_value + value;
        this.seek(pos);
      }
    }
    /**
     * @description 获取下一首歌曲索引(用于渲染和播放)
     * @param {Number}        count     切换数量
     * @returns number
     * **/
  }, {
    key: "getNextKey",
    value: function getNextKey(count) {
      var nextkey = this.renderIndex;
      nextkey += count;
      nextkey = nextkey < 0 ? this.audiolist.length - 1 : nextkey > this.audiolist.length - 1 ? 0 : nextkey;
      return nextkey;
    }
    /**
     * @description 切歌
     * @param {Number}        count      数量
     * @returns undefined
     * **/
  }, {
    key: "changeplay",
    value: function changeplay(count) {
      var nextkey = this.getNextKey(count);
      this.commit("setPause", true);
      this.operate(nextkey);
    }
    /**
     * @description 手动播放或暂停, 并渲染对应的数据
     * @param {Number|String|<audioInfo>|undefined}        key      索引或音频对象
     * @returns undefined
     * **/
  }, {
    key: "operate",
    value: function operate(key) {
      key !== undefined && this.commit("setRender", key);
      this.operation();
    }
    /**
     * @description 强制暂停播放
     * @returns undefined
     * **/
  }, {
    key: "stop",
    value: function stop() {
      this.audioCtx.pause();
      this.commit("setPause", true);
      this.commit("setUnnormalPause", true);
      this.emit(zaudioCbName.onStop);
    }
    //播放,暂停事件判断,
    //播放数据与渲染数据相同时: 播放->暂停, 暂停->播放
    //播放数据与渲染数据不相同时: 播放渲染音频
  }, {
    key: "operation",
    value: function operation() {
      return __awaiter(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _this$playinfo, duration, current, duration_value, current_value, src, _this$renderinfo, renderSrc, renderTitle, renderSinger, renderCoverImgUrl, renderIsPlay, paused;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$playinfo = this.playinfo, duration = _this$playinfo.duration, current = _this$playinfo.current, duration_value = _this$playinfo.duration_value, current_value = _this$playinfo.current_value, src = _this$playinfo.src;
                _this$renderinfo = this.renderinfo, renderSrc = _this$renderinfo.src, renderTitle = _this$renderinfo.title, renderSinger = _this$renderinfo.singer, renderCoverImgUrl = _this$renderinfo.coverImgUrl;
                renderIsPlay = this.renderIsPlay;
                paused = this.paused;
                if (!renderIsPlay) {
                  //渲染与播放地址 不同
                  this.audioCtx.src = renderSrc;
                  this.audioCtx.title = renderTitle;
                  this.audioCtx.singer = renderSinger;
                  this.audioCtx.coverImgUrl = renderCoverImgUrl || this.defaultCover;
                  this.audioCtx.startTime = 0;
                  this.audioCtx.seek(0);
                  this.audioCtx.play();
                  this.commit("setPause", false);
                  this.commit("setPlayinfo", {
                    src: renderSrc,
                    title: renderTitle,
                    singer: renderSinger,
                    coverImgUrl: renderCoverImgUrl
                  });
                } else {
                  if (paused) {
                    //渲染与播放地址相同
                    this.audioCtx.play();
                    this.audioCtx.startTime = current_value;
                    // this.audioCtx.seek(current_value);
                    this.commit("setPause", false);
                    this.commit("setPlayinfo", {
                      src: renderSrc,
                      title: renderTitle,
                      singer: renderSinger,
                      coverImgUrl: renderCoverImgUrl
                    });
                  } else {
                    this.audioCtx.pause();
                    this.commit("setPause", true);
                    this.commit("setUnnormalPause", true);
                  }
                }
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
    /**
     * @description 覆盖音频
     * @param {Array<audio>} data 音频数组
     * @returns undefined
     * **/
  }, {
    key: "setAudio",
    value: function setAudio(data) {
      this.audiolist = _toConsumableArray(data);
      this.emit(zaudioCbName.setAudio, this.audiolist);
      this.syncStateEmit();
    }
    /**
     * @description 添加音频
     * @param {Array<audio>} data 音频数组
     * @returns undefined
     * **/
  }, {
    key: "updateAudio",
    value: function updateAudio(data) {
      var _this$audiolist;
      (_this$audiolist = this.audiolist).push.apply(_this$audiolist, _toConsumableArray(data));
      this.emit(zaudioCbName.updateAudio, this.audiolist);
      this.syncStateEmit();
    }
    /**
     * @description 设置当前播放信息
     * @param {<audioInfo>} data 音频对象
     * @returns undefined
     * **/
  }, {
    key: "setPlayinfo",
    value: function setPlayinfo(data) {
      for (var i in data) {
        this.playinfo[i] = data[i];
      }
    }
    /**
     * @description 设置暂停状态
     * @param {boolean} data 布尔值
     * @returns undefined
     * **/
  }, {
    key: "setPause",
    value: function setPause(data) {
      this.paused = data;
    }
    /**
     * @description 设置loading
     * @param {boolean} data 布尔值
     * @returns undefined
     * **/
  }, {
    key: "setLoading",
    value: function setLoading(data) {
      this.loading = data;
    }
    /**
     * @description 设置通话时暂停状态
     * @param {boolean} data 布尔值
     * @returns undefined
     * **/
  }, {
    key: "setUnnormalPause",
    value: function setUnnormalPause(data) {
      this.uPause = data;
    }
    /**
     * @description 设置渲染
     * @param {number | string | audioInfo} data 索引或渲染信息
     * @returns undefined
     * **/
  }, {
    key: "setRender",
    value: function setRender(data) {
      if (this.audiolist.length == 0) return;
      if (typeof data === "number" || typeof data === "string") {
        this.renderIndex = typeof data === "string" ? parseInt(data) : data;
        this.renderinfo = {
          src: this.audiolist[this.renderIndex].src,
          title: this.audiolist[this.renderIndex].title,
          singer: this.audiolist[this.renderIndex].singer,
          coverImgUrl: this.audiolist[this.renderIndex].coverImgUrl,
          current: "00:00",
          duration: "00:00",
          current_value: 0,
          duration_value: 100
        };
      } else {
        this.renderinfo = data;
        var renderIndex = this.audiolist.findIndex(function (i) {
          return i.src == data.src;
        });
        if (renderIndex >= 0) {
          this.renderIndex = renderIndex;
        }
      }
      this.syncStateEmit();
    }
    //当前索引
  }, {
    key: "playIndex",
    get: function get() {
      var _this3 = this;
      var index = this.audiolist.findIndex(function (i) {
        return i.src == _this3.playinfo.src;
      });
      return index <= 0 ? 0 : index;
    }
    //渲染与播放是否一致
  }, {
    key: "renderIsPlay",
    get: function get() {
      return this.renderinfo.src == this.playinfo.src;
    }
    //app端判断电话来电后, 音频意外中断之后的继续播放
  }, {
    key: "appCheckReplay",
    value: function appCheckReplay() {
      var _t = this;
    }
  }]);
  return ZAudio;
}(util_1.EventBus);
exports.default = ZAudio;
ZAudio.version = "2.2.51";
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 65 */
/*!****************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/get.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var superPropBase = __webpack_require__(/*! ./superPropBase.js */ 66);
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _get.apply(this, arguments);
}
module.exports = _get, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 66 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf.js */ 67);
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
module.exports = _superPropBase, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 67 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 68 */
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 69 */
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ 70);
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return assertThisInitialized(self);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 70 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 71 */
/*!*******************************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/components/uniapp-zaudio/dist/util.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toConsumableArray = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18);
var _classCallCheck = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23);
var _createClass = __webpack_require__(/*! @babel/runtime/helpers/createClass */ 24);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventBus = exports.throttle = exports.formatSeconds = void 0;
function formatSeconds(seconds) {
  var result = typeof seconds === "string" ? parseFloat(seconds) : seconds;
  if (isNaN(result)) return "";
  var h = Math.floor(result / 3600) < 10 ? "0" + Math.floor(result / 3600) : Math.floor(result / 3600);
  var m = Math.floor(result / 60 % 60) < 10 ? "0" + Math.floor(result / 60 % 60) : Math.floor(result / 60 % 60) + h * 60;
  var s = Math.floor(result % 60) < 10 ? "0" + Math.floor(result % 60) : Math.floor(result % 60);
  return "".concat(m, ":").concat(s);
}
exports.formatSeconds = formatSeconds;
function throttle(fn, wait) {
  var previous = 0;
  return function () {
    var context = this;
    var now = Date.now();
    //每隔一段时间执行一次；
    if (now - previous > wait) {
      for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }
      fn.apply(context, arg);
      previous = now;
    }
  };
}
exports.throttle = throttle;
var EventBus = /*#__PURE__*/function () {
  function EventBus() {
    _classCallCheck(this, EventBus);
    this._events = new Map();
  }
  _createClass(EventBus, [{
    key: "on",
    value: function on(event, action, fn) {
      var arr = this._events.get(event);
      var hasAction = arr ? arr.findIndex(function (i) {
        return i.action == action;
      }) : -1;
      if (hasAction > -1) {
        return;
      }
      this._events.set(event, [].concat(_toConsumableArray(this._events.get(event) || []), [{
        action: action,
        fn: fn
      }]));
    }
  }, {
    key: "has",
    value: function has(event) {
      return this._events.has(event);
    }
  }, {
    key: "emit",
    value: function emit(event, data) {
      if (!this.has(event)) {
        return;
      }
      var arr = this._events.get(event);
      arr.forEach(function (i) {
        i.fn(data);
      });
    }
  }, {
    key: "off",
    value: function off(event, action) {
      if (!this.has(event)) {
        return;
      }
      var arr = this._events.get(event);
      var newdata = arr.filter(function (i) {
        return i.action !== action;
      });
      this._events.set(event, _toConsumableArray(newdata));
    }
  }]);
  return EventBus;
}();
exports.EventBus = EventBus;

/***/ }),
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */
/*!************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/api/points-flow.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  "happenedDate": "2020-05-11",
  "sourceType": 5,
  "sellerName": "奈雪の茶",
  "changeNum": 1,
  "changeType": 1,
  "reason": "积分签到奖励",
  "createdAt": "2020-05-11 00:17:47",
  "id": 1
}, {
  "happenedDate": "2020-05-10",
  "sourceType": 5,
  "sellerName": "奈雪の茶",
  "changeNum": 1,
  "changeType": 1,
  "reason": "积分签到奖励",
  "createdAt": "2020-05-10 22:23:36",
  "id": 2
}, {
  "happenedDate": "2020-05-09",
  "sourceType": 5,
  "sellerName": "奈雪の茶",
  "changeNum": 1,
  "changeType": 1,
  "reason": "积分签到奖励",
  "createdAt": "2020-05-09 02:14:24",
  "id": 3
}, {
  "happenedDate": "2020-05-08",
  "sourceType": 1,
  "sellerName": "奈雪の茶",
  "changeNum": 50,
  "changeType": 1,
  "reason": "消费增加",
  "createdAt": "2020-05-08 19:25:40",
  "id": 4
}, {
  "happenedDate": "2020-05-08",
  "sourceType": 5,
  "sellerName": "奈雪の茶",
  "changeNum": 1,
  "changeType": 1,
  "reason": "积分签到奖励",
  "createdAt": "2020-05-08 18:43:14",
  "id": 5
}, {
  "happenedDate": "2020-05-07",
  "sourceType": 5,
  "sellerName": "奈雪の茶",
  "changeNum": 1,
  "changeType": 1,
  "reason": "积分签到奖励",
  "createdAt": "2020-05-07 16:25:46",
  "id": 6
}, {
  "happenedDate": "2020-05-06",
  "sourceType": 5,
  "sellerName": "奈雪の茶",
  "changeNum": 1,
  "changeType": 1,
  "reason": "积分签到奖励",
  "createdAt": "2020-05-06 10:38:42",
  "id": 7
}, {
  "happenedDate": "2020-05-05",
  "sourceType": 1,
  "sellerName": "奈雪の茶",
  "changeNum": 73,
  "changeType": 1,
  "reason": "消费增加",
  "createdAt": "2020-05-05 20:42:47",
  "id": 8
}, {
  "happenedDate": "2020-05-03",
  "sourceType": 5,
  "sellerName": "奈雪の茶",
  "changeNum": 1,
  "changeType": 1,
  "reason": "积分签到奖励",
  "createdAt": "2020-05-03 19:37:12",
  "id": 9
}, {
  "happenedDate": "2020-05-02",
  "sourceType": 5,
  "sellerName": "奈雪の茶",
  "changeNum": 1,
  "changeType": 1,
  "reason": "积分签到奖励",
  "createdAt": "2020-05-02 03:30:42",
  "id": 10
}, {
  "happenedDate": "2020-04-25",
  "sourceType": 1,
  "sellerName": "奈雪の茶",
  "changeNum": 43,
  "changeType": 1,
  "reason": "消费增加",
  "createdAt": "2020-04-25 20:48:26",
  "id": 11
}, {
  "happenedDate": "2020-04-25",
  "sourceType": 5,
  "sellerName": "奈雪の茶",
  "changeNum": 1,
  "changeType": 1,
  "reason": "积分签到奖励",
  "createdAt": "2020-04-25 02:46:36",
  "id": 12
}, {
  "happenedDate": "2020-04-24",
  "sourceType": 1,
  "sellerName": "奈雪の茶",
  "changeNum": 57,
  "changeType": 1,
  "reason": "消费增加",
  "createdAt": "2020-04-24 20:23:45",
  "id": 13
}, {
  "happenedDate": "2020-04-18",
  "sourceType": 1,
  "sellerName": "奈雪の茶",
  "changeNum": 56,
  "changeType": 1,
  "reason": "消费增加",
  "createdAt": "2020-04-18 20:20:08",
  "id": 14
}, {
  "happenedDate": "2020-04-10",
  "sourceType": 1,
  "sellerName": "奈雪の茶",
  "changeNum": 33,
  "changeType": 1,
  "reason": "消费增加",
  "createdAt": "2020-04-10 20:40:44",
  "id": 15
}];
exports.default = _default;

/***/ }),
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */
/*!***********************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/components/uni-icons/icons.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612"
};
exports.default = _default;

/***/ }),
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */
/*!*******************************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/pages/attendance/uni-calendar/util.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _calendar = _interopRequireDefault(__webpack_require__(/*! ./calendar.js */ 248));
var Calendar = /*#__PURE__*/function () {
  function Calendar() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      date = _ref.date,
      selected = _ref.selected,
      startDate = _ref.startDate,
      endDate = _ref.endDate,
      range = _ref.range;
    (0, _classCallCheck2.default)(this, Calendar);
    // 当前日期
    this.date = this.getDate(date); // 当前初入日期
    // 打点信息
    this.selected = selected || [];
    // 范围开始
    this.startDate = startDate;
    // 范围结束
    this.endDate = endDate;
    this.range = range;
    // 多选状态
    this.multipleStatus = {
      before: '',
      after: '',
      data: []
    };
    // 每周日期
    this.weeks = {};
    this._getWeek(this.date.fullDate);
  }

  /**
   * 获取任意时间
   */
  (0, _createClass2.default)(Calendar, [{
    key: "getDate",
    value: function getDate(date) {
      var AddDayCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var str = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
      if (!date) {
        date = new Date();
      }
      if ((0, _typeof2.default)(date) !== 'object') {
        date = date.replace(/-/g, '/');
      }
      var dd = new Date(date);
      switch (str) {
        case 'day':
          dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
          break;
        case 'month':
          if (dd.getDate() === 31) {
            dd.setDate(dd.getDate() + AddDayCount);
          } else {
            dd.setMonth(dd.getMonth() + AddDayCount); // 获取AddDayCount天后的日期
          }

          break;
        case 'year':
          dd.setFullYear(dd.getFullYear() + AddDayCount); // 获取AddDayCount天后的日期
          break;
      }
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
      var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
      return {
        fullDate: y + '-' + m + '-' + d,
        year: y,
        month: m,
        date: d,
        day: dd.getDay()
      };
    }

    /**
     * 获取上月剩余天数
     */
  }, {
    key: "_getLastMonthDays",
    value: function _getLastMonthDays(firstDay, full) {
      var dateArr = [];
      for (var i = firstDay; i > 0; i--) {
        var beforeDate = new Date(full.year, full.month - 1, -i + 1).getDate();
        dateArr.push({
          date: beforeDate,
          month: full.month - 1,
          lunar: this.getlunar(full.year, full.month - 1, beforeDate),
          disable: true
        });
      }
      return dateArr;
    }
    /**
     * 获取本月天数
     */
  }, {
    key: "_currentMonthDys",
    value: function _currentMonthDys(dateData, full) {
      var _this = this;
      var dateArr = [];
      var fullDate = this.date.fullDate;
      var _loop = function _loop(i) {
        var isinfo = false;
        var nowDate = full.year + '-' + (full.month < 10 ? full.month : full.month) + '-' + (i < 10 ? '0' + i : i);
        // 是否今天
        var isDay = fullDate === nowDate;
        // 获取打点信息
        var info = _this.selected && _this.selected.find(function (item) {
          if (_this.dateEqual(nowDate, item.date)) {
            return item;
          }
        });

        // 日期禁用
        var disableBefore = true;
        var disableAfter = true;
        if (_this.startDate) {
          var dateCompBefore = _this.dateCompare(_this.startDate, fullDate);
          disableBefore = _this.dateCompare(dateCompBefore ? _this.startDate : fullDate, nowDate);
        }
        if (_this.endDate) {
          var dateCompAfter = _this.dateCompare(fullDate, _this.endDate);
          disableAfter = _this.dateCompare(nowDate, dateCompAfter ? _this.endDate : fullDate);
        }
        var multiples = _this.multipleStatus.data;
        var checked = false;
        var multiplesStatus = -1;
        if (_this.range) {
          if (multiples) {
            multiplesStatus = multiples.findIndex(function (item) {
              return _this.dateEqual(item, nowDate);
            });
          }
          if (multiplesStatus !== -1) {
            checked = true;
          }
        }
        var data = {
          fullDate: nowDate,
          year: full.year,
          date: i,
          multiple: _this.range ? checked : false,
          month: full.month,
          lunar: _this.getlunar(full.year, full.month, i),
          disable: !disableBefore || !disableAfter,
          isDay: isDay
        };
        if (info) {
          data.extraInfo = info;
        }
        dateArr.push(data);
      };
      for (var i = 1; i <= dateData; i++) {
        _loop(i);
      }
      return dateArr;
    }
    /**
     * 获取下月天数
     */
  }, {
    key: "_getNextMonthDays",
    value: function _getNextMonthDays(surplus, full) {
      var dateArr = [];
      for (var i = 1; i < surplus + 1; i++) {
        dateArr.push({
          date: i,
          month: Number(full.month) + 1,
          lunar: this.getlunar(full.year, Number(full.month) + 1, i),
          disable: true
        });
      }
      return dateArr;
    }
    /**
     * 设置日期
     * @param {Object} date
     */
  }, {
    key: "setDate",
    value: function setDate(date) {
      this._getWeek(date);
    }
    /**
     * 获取当前日期详情
     * @param {Object} date
     */
  }, {
    key: "getInfo",
    value: function getInfo(date) {
      var _this2 = this;
      if (!date) {
        date = new Date();
      }
      var dateInfo = this.canlender.find(function (item) {
        return item.fullDate === _this2.getDate(date).fullDate;
      });
      return dateInfo;
    }

    /**
     * 比较时间大小
     */
  }, {
    key: "dateCompare",
    value: function dateCompare(startDate, endDate) {
      // 计算截止时间
      startDate = new Date(startDate.replace('-', '/').replace('-', '/'));
      // 计算详细项的截止时间
      endDate = new Date(endDate.replace('-', '/').replace('-', '/'));
      if (startDate <= endDate) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * 比较时间是否相等
     */
  }, {
    key: "dateEqual",
    value: function dateEqual(before, after) {
      // 计算截止时间
      before = new Date(before.replace('-', '/').replace('-', '/'));
      // 计算详细项的截止时间
      after = new Date(after.replace('-', '/').replace('-', '/'));
      if (before.getTime() - after.getTime() === 0) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * 获取日期范围内所有日期
     * @param {Object} begin
     * @param {Object} end
     */
  }, {
    key: "geDateAll",
    value: function geDateAll(begin, end) {
      var arr = [];
      var ab = begin.split('-');
      var ae = end.split('-');
      var db = new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de = new Date();
      de.setFullYear(ae[0], ae[1] - 1, ae[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
      var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
      for (var k = unixDb; k <= unixDe;) {
        k = k + 24 * 60 * 60 * 1000;
        arr.push(this.getDate(new Date(parseInt(k))).fullDate);
      }
      return arr;
    }
    /**
     * 计算阴历日期显示
     */
  }, {
    key: "getlunar",
    value: function getlunar(year, month, date) {
      return _calendar.default.solar2lunar(year, month, date);
    }
    /**
     * 设置打点
     */
  }, {
    key: "setSelectInfo",
    value: function setSelectInfo(data, value) {
      this.selected = value;
      this._getWeek(data);
    }

    /**
     *  获取多选状态
     */
  }, {
    key: "setMultiple",
    value: function setMultiple(fullDate) {
      var _this$multipleStatus = this.multipleStatus,
        before = _this$multipleStatus.before,
        after = _this$multipleStatus.after;
      if (!this.range) return;
      if (before && after) {
        this.multipleStatus.before = '';
        this.multipleStatus.after = '';
        this.multipleStatus.data = [];
        this._getWeek(fullDate);
      } else {
        if (!before) {
          this.multipleStatus.before = fullDate;
        } else {
          this.multipleStatus.after = fullDate;
          if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
          } else {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
          }
          this._getWeek(fullDate);
        }
      }
    }

    /**
     * 获取每周数据
     * @param {Object} dateData
     */
  }, {
    key: "_getWeek",
    value: function _getWeek(dateData) {
      var _this$getDate = this.getDate(dateData),
        fullDate = _this$getDate.fullDate,
        year = _this$getDate.year,
        month = _this$getDate.month,
        date = _this$getDate.date,
        day = _this$getDate.day;
      var firstDay = new Date(year, month - 1, 1).getDay();
      var currentDay = new Date(year, month, 0).getDate();
      var dates = {
        lastMonthDays: this._getLastMonthDays(firstDay, this.getDate(dateData)),
        // 上个月末尾几天
        currentMonthDys: this._currentMonthDys(currentDay, this.getDate(dateData)),
        // 本月天数
        nextMonthDays: [],
        // 下个月开始几天
        weeks: []
      };
      var canlender = [];
      var surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length);
      dates.nextMonthDays = this._getNextMonthDays(surplus, this.getDate(dateData));
      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays);
      var weeks = {};
      // 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天
      for (var i = 0; i < canlender.length; i++) {
        if (i % 7 === 0) {
          weeks[parseInt(i / 7)] = new Array(7);
        }
        weeks[parseInt(i / 7)][i % 7] = canlender[i];
      }
      this.canlender = canlender;
      this.weeks = weeks;
    }

    //静态方法
    // static init(date) {
    // 	if (!this.instance) {
    // 		this.instance = new Calendar(date);
    // 	}
    // 	return this.instance;
    // }
  }]);
  return Calendar;
}();
var _default = Calendar;
exports.default = _default;

/***/ }),
/* 248 */
/*!***********************************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/pages/attendance/uni-calendar/calendar.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
* @1900-2100区间内的公历、农历互转
* @charset UTF-8
* @github  https://github.com/jjonline/calendar.js
* @Author  Jea杨(JJonline@JJonline.Cn)
* @Time    2014-7-21
* @Time    2016-8-13 Fixed 2033hex、Attribution Annals
* @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
* @Time    2017-7-24 Fixed use getTerm Func Param Error.use solar year,NOT lunar year
* @Version 1.0.3
* @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
* @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
*/
/* eslint-disable */
var calendar = {
  /**
      * 农历1900-2100的润大小信息表
      * @Array Of Property
      * @return Hex
      */
  lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  // 1900-1909
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  // 1910-1919
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  // 1920-1929
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  // 1930-1939
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  // 1940-1949
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
  // 1950-1959
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  // 1960-1969
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
  // 1970-1979
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  // 1980-1989
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
  // 1990-1999
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  // 2000-2009
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  // 2010-2019
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  // 2020-2029
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  // 2030-2039
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
  // 2040-2049
  /** Add By JJonline@JJonline.Cn**/
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
  // 2050-2059
  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
  // 2060-2069
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
  // 2070-2079
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
  // 2080-2089
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
  // 2090-2099
  0x0d520],
  // 2100

  /**
      * 公历每个月份的天数普通表
      * @Array Of Property
      * @return Number
      */
  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  /**
      * 天干地支之天干速查表
      * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
      * @return Cn string
      */
  Gan: ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"],
  /**
      * 天干地支之地支速查表
      * @Array Of Property
      * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
      * @return Cn string
      */
  Zhi: ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"],
  /**
      * 天干地支之地支速查表<=>生肖
      * @Array Of Property
      * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
      * @return Cn string
      */
  Animals: ["\u9F20", "\u725B", "\u864E", "\u5154", "\u9F99", "\u86C7", "\u9A6C", "\u7F8A", "\u7334", "\u9E21", "\u72D7", "\u732A"],
  /**
      * 24节气速查表
      * @Array Of Property
      * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
      * @return Cn string
      */
  solarTerm: ["\u5C0F\u5BD2", "\u5927\u5BD2", "\u7ACB\u6625", "\u96E8\u6C34", "\u60CA\u86F0", "\u6625\u5206", "\u6E05\u660E", "\u8C37\u96E8", "\u7ACB\u590F", "\u5C0F\u6EE1", "\u8292\u79CD", "\u590F\u81F3", "\u5C0F\u6691", "\u5927\u6691", "\u7ACB\u79CB", "\u5904\u6691", "\u767D\u9732", "\u79CB\u5206", "\u5BD2\u9732", "\u971C\u964D", "\u7ACB\u51AC", "\u5C0F\u96EA", "\u5927\u96EA", "\u51AC\u81F3"],
  /**
      * 1900-2100各年的24节气日期速查表
      * @Array Of Property
      * @return 0x string For splice
      */
  sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],
  /**
      * 数字转中文速查表
      * @Array Of Property
      * @trans ['日','一','二','三','四','五','六','七','八','九','十']
      * @return Cn string
      */
  nStr1: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"],
  /**
      * 日期转农历称呼速查表
      * @Array Of Property
      * @trans ['初','十','廿','卅']
      * @return Cn string
      */
  nStr2: ["\u521D", "\u5341", "\u5EFF", "\u5345"],
  /**
      * 月份转农历称呼速查表
      * @Array Of Property
      * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
      * @return Cn string
      */
  nStr3: ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A"],
  /**
      * 返回农历y年一整年的总天数
      * @param lunar Year
      * @return Number
      * @eg:var count = calendar.lYearDays(1987) ;//count=387
      */
  lYearDays: function lYearDays(y) {
    var i;
    var sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {
      sum += this.lunarInfo[y - 1900] & i ? 1 : 0;
    }
    return sum + this.leapDays(y);
  },
  /**
      * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
      * @param lunar Year
      * @return Number (0-12)
      * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
      */
  leapMonth: function leapMonth(y) {
    // 闰字编码 \u95f0
    return this.lunarInfo[y - 1900] & 0xf;
  },
  /**
      * 返回农历y年闰月的天数 若该年没有闰月则返回0
      * @param lunar Year
      * @return Number (0、29、30)
      * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
      */
  leapDays: function leapDays(y) {
    if (this.leapMonth(y)) {
      return this.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
    }
    return 0;
  },
  /**
      * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
      * @param lunar Year
      * @return Number (-1、29、30)
      * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
      */
  monthDays: function monthDays(y, m) {
    if (m > 12 || m < 1) {
      return -1;
    } // 月份参数从1至12，参数错误返回-1
    return this.lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
  },
  /**
      * 返回公历(!)y年m月的天数
      * @param solar Year
      * @return Number (-1、28、29、30、31)
      * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
      */
  solarDays: function solarDays(y, m) {
    if (m > 12 || m < 1) {
      return -1;
    } // 若参数错误 返回-1
    var ms = m - 1;
    if (ms == 1) {
      // 2月份的闰平规律测算后确认返回28或29
      return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
    } else {
      return this.solarMonth[ms];
    }
  },
  /**
     * 农历年份转换为干支纪年
     * @param  lYear 农历年的年份数
     * @return Cn string
     */
  toGanZhiYear: function toGanZhiYear(lYear) {
    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (ganKey == 0) ganKey = 10; // 如果余数为0则为最后一个天干
    if (zhiKey == 0) zhiKey = 12; // 如果余数为0则为最后一个地支
    return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];
  },
  /**
     * 公历月、日判断所属星座
     * @param  cMonth [description]
     * @param  cDay [description]
     * @return Cn string
     */
  toAstro: function toAstro(cMonth, cDay) {
    var s = "\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5EA7"; // 座
  },

  /**
      * 传入offset偏移量返回干支
      * @param offset 相对甲子的偏移量
      * @return Cn string
      */
  toGanZhi: function toGanZhi(offset) {
    return this.Gan[offset % 10] + this.Zhi[offset % 12];
  },
  /**
      * 传入公历(!)y年获得该年第n个节气的公历日期
      * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
      * @return day Number
      * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
      */
  getTerm: function getTerm(y, n) {
    if (y < 1900 || y > 2100) {
      return -1;
    }
    if (n < 1 || n > 24) {
      return -1;
    }
    var _table = this.sTermInfo[y - 1900];
    var _info = [parseInt('0x' + _table.substr(0, 5)).toString(), parseInt('0x' + _table.substr(5, 5)).toString(), parseInt('0x' + _table.substr(10, 5)).toString(), parseInt('0x' + _table.substr(15, 5)).toString(), parseInt('0x' + _table.substr(20, 5)).toString(), parseInt('0x' + _table.substr(25, 5)).toString()];
    var _calday = [_info[0].substr(0, 1), _info[0].substr(1, 2), _info[0].substr(3, 1), _info[0].substr(4, 2), _info[1].substr(0, 1), _info[1].substr(1, 2), _info[1].substr(3, 1), _info[1].substr(4, 2), _info[2].substr(0, 1), _info[2].substr(1, 2), _info[2].substr(3, 1), _info[2].substr(4, 2), _info[3].substr(0, 1), _info[3].substr(1, 2), _info[3].substr(3, 1), _info[3].substr(4, 2), _info[4].substr(0, 1), _info[4].substr(1, 2), _info[4].substr(3, 1), _info[4].substr(4, 2), _info[5].substr(0, 1), _info[5].substr(1, 2), _info[5].substr(3, 1), _info[5].substr(4, 2)];
    return parseInt(_calday[n - 1]);
  },
  /**
      * 传入农历数字月份返回汉语通俗表示法
      * @param lunar month
      * @return Cn string
      * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
      */
  toChinaMonth: function toChinaMonth(m) {
    // 月 => \u6708
    if (m > 12 || m < 1) {
      return -1;
    } // 若参数错误 返回-1
    var s = this.nStr3[m - 1];
    s += "\u6708"; // 加上月字
    return s;
  },
  /**
      * 传入农历日期数字返回汉字表示法
      * @param lunar day
      * @return Cn string
      * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
      */
  toChinaDay: function toChinaDay(d) {
    // 日 => \u65e5
    var s;
    switch (d) {
      case 10:
        s = "\u521D\u5341";
        break;
      case 20:
        s = "\u4E8C\u5341";
        break;
        break;
      case 30:
        s = "\u4E09\u5341";
        break;
        break;
      default:
        s = this.nStr2[Math.floor(d / 10)];
        s += this.nStr1[d % 10];
    }
    return s;
  },
  /**
      * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
      * @param y year
      * @return Cn string
      * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
      */
  getAnimal: function getAnimal(y) {
    return this.Animals[(y - 4) % 12];
  },
  /**
      * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
      * @param y  solar year
      * @param m  solar month
      * @param d  solar day
      * @return JSON object
      * @eg:console.log(calendar.solar2lunar(1987,11,01));
      */
  solar2lunar: function solar2lunar(y, m, d) {
    // 参数区间1900.1.31~2100.12.31
    // 年份限定、上限
    if (y < 1900 || y > 2100) {
      return -1; // undefined转换为数字变为NaN
    }
    // 公历传参最下限
    if (y == 1900 && m == 1 && d < 31) {
      return -1;
    }
    // 未传参  获得当天
    if (!y) {
      var objDate = new Date();
    } else {
      var objDate = new Date(y, parseInt(m) - 1, d);
    }
    var i;
    var leap = 0;
    var temp = 0;
    // 修正ymd参数
    var y = objDate.getFullYear();
    var m = objDate.getMonth() + 1;
    var d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = this.lYearDays(i);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;
      i--;
    }

    // 是否今天
    var isTodayObj = new Date();
    var isToday = false;
    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
      isToday = true;
    }
    // 星期几
    var nWeek = objDate.getDay();
    var cWeek = this.nStr1[nWeek];
    // 数字表示周几顺应天朝周一开始的惯例
    if (nWeek == 0) {
      nWeek = 7;
    }
    // 农历年
    var year = i;
    var leap = this.leapMonth(i); // 闰哪个月
    var isLeap = false;

    // 效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
      // 闰月
      if (leap > 0 && i == leap + 1 && isLeap == false) {
        --i;
        isLeap = true;
        temp = this.leapDays(year); // 计算农历闰月天数
      } else {
        temp = this.monthDays(year, i); // 计算农历普通月天数
      }
      // 解除闰月
      if (isLeap == true && i == leap + 1) {
        isLeap = false;
      }
      offset -= temp;
    }
    // 闰月导致数组下标重叠取反
    if (offset == 0 && leap > 0 && i == leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --i;
      }
    }
    if (offset < 0) {
      offset += temp;
      --i;
    }
    // 农历月
    var month = i;
    // 农历日
    var day = offset + 1;
    // 天干地支处理
    var sm = m - 1;
    var gzY = this.toGanZhiYear(year);

    // 当月的两个节气
    // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
    var firstNode = this.getTerm(y, m * 2 - 1); // 返回当月「节」为几日开始
    var secondNode = this.getTerm(y, m * 2); // 返回当月「节」为几日开始

    // 依据12节气修正干支月
    var gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
      gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
    }

    // 传入的日期的节气与否
    var isTerm = false;
    var Term = null;
    if (firstNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 2];
    }
    if (secondNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 1];
    }
    // 日柱 当月一日与 1900/1/1 相差天数
    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = this.toGanZhi(dayCyclical + d - 1);
    // 该日期所属的星座
    var astro = this.toAstro(m, d);
    return {
      'lYear': year,
      'lMonth': month,
      'lDay': day,
      'Animal': this.getAnimal(year),
      'IMonthCn': (isLeap ? "\u95F0" : '') + this.toChinaMonth(month),
      'IDayCn': this.toChinaDay(day),
      'cYear': y,
      'cMonth': m,
      'cDay': d,
      'gzYear': gzY,
      'gzMonth': gzM,
      'gzDay': gzD,
      'isToday': isToday,
      'isLeap': isLeap,
      'nWeek': nWeek,
      'ncWeek': "\u661F\u671F" + cWeek,
      'isTerm': isTerm,
      'Term': Term,
      'astro': astro
    };
  },
  /**
      * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
      * @param y  lunar year
      * @param m  lunar month
      * @param d  lunar day
      * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
      * @return JSON object
      * @eg:console.log(calendar.lunar2solar(1987,9,10));
      */
  lunar2solar: function lunar2solar(y, m, d, isLeapMonth) {
    // 参数区间1900.1.31~2100.12.1
    var isLeapMonth = !!isLeapMonth;
    var leapOffset = 0;
    var leapMonth = this.leapMonth(y);
    var leapDay = this.leapDays(y);
    if (isLeapMonth && leapMonth != m) {
      return -1;
    } // 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
      return -1;
    } // 超出了最大极限值
    var day = this.monthDays(y, m);
    var _day = day;
    // bugFix 2016-9-25
    // if month is leap, _day use leapDays method
    if (isLeapMonth) {
      _day = this.leapDays(y, m);
    }
    if (y < 1900 || y > 2100 || d > _day) {
      return -1;
    } // 参数合法性效验

    // 计算农历的时间差
    var offset = 0;
    for (var i = 1900; i < y; i++) {
      offset += this.lYearDays(i);
    }
    var leap = 0;
    var isAdd = false;
    for (var i = 1; i < m; i++) {
      leap = this.leapMonth(y);
      if (!isAdd) {
        // 处理闰月
        if (leap <= i && leap > 0) {
          offset += this.leapDays(y);
          isAdd = true;
        }
      }
      offset += this.monthDays(y, i);
    }
    // 转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) {
      offset += day;
    }
    // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();
    return this.solar2lunar(cY, cM, cD);
  }
};
var _default = calendar;
exports.default = _default;

/***/ }),
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */
/*!************************************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/components/jyf-parser/libs/MpHtmlParser.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(wx) {var _classCallCheck = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23);
var _createClass = __webpack_require__(/*! @babel/runtime/helpers/createClass */ 24);
var _defineProperty = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11);
/*
  将 html 解析为适用于小程序 rich-text 的 DOM 结构
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
  update：2020/05/08
*/
var cfg = __webpack_require__(/*! ./config.js */ 264),
  blankChar = cfg.blankChar,
  CssHandler = __webpack_require__(/*! ./CssHandler.js */ 265),
  screenWidth = wx.getSystemInfoSync().screenWidth;
var emoji; // emoji 补丁包 https://jin-yufeng.github.io/Parser/#/instructions?id=emoji
var MpHtmlParser = /*#__PURE__*/function () {
  "use strict";

  function MpHtmlParser(data) {
    var _this = this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, MpHtmlParser);
    _defineProperty(this, "isClose", function () {
      return _this.data[_this.i] == '>' || _this.data[_this.i] == '/' && _this.data[_this.i + 1] == '>';
    });
    _defineProperty(this, "section", function () {
      return _this.data.substring(_this.start, _this.i);
    });
    _defineProperty(this, "parent", function () {
      return _this.STACK[_this.STACK.length - 1];
    });
    _defineProperty(this, "siblings", function () {
      return _this.STACK.length ? _this.parent().children : _this.DOM;
    });
    this.attrs = {};
    this.compress = options.compress;
    this.CssHandler = new CssHandler(options.tagStyle, screenWidth);
    this.data = data;
    this.domain = options.domain;
    this.DOM = [];
    this.i = this.start = this.audioNum = this.imgNum = this.videoNum = 0;
    this.protocol = this.domain && this.domain.includes('://') ? this.domain.split('://')[0] : '';
    this.state = this.Text;
    this.STACK = [];
    this.useAnchor = options.useAnchor;
  }
  _createClass(MpHtmlParser, [{
    key: "parse",
    value: function parse() {
      if (emoji) this.data = emoji.parseEmoji(this.data);
      for (var c; c = this.data[this.i]; this.i++) {
        this.state(c);
      }
      if (this.state == this.Text) this.setText();
      while (this.STACK.length) {
        this.popNode(this.STACK.pop());
      }
      if (this.DOM.length) {
        this.DOM[0].PoweredBy = 'Parser';
        if (this.title) this.DOM[0].title = this.title;
      }
      return this.DOM;
    }
    // 设置属性
  }, {
    key: "setAttr",
    value: function setAttr() {
      var name = this.attrName.toLowerCase();
      if (cfg.trustAttrs[name]) {
        var val = this.attrVal;
        if (val) {
          if (name == 'src') this.attrs[name] = this.getUrl(this.decode(val, 'amp'));else if (name == 'href' || name == 'style') this.attrs[name] = this.decode(val, 'amp');else this.attrs[name] = val;
        } else if (cfg.boolAttrs[name]) this.attrs[name] = 'T';
      }
      this.attrVal = '';
      while (blankChar[this.data[this.i]]) {
        this.i++;
      }
      if (this.isClose()) this.setNode();else {
        this.start = this.i;
        this.state = this.AttrName;
      }
    }
    // 设置文本节点
  }, {
    key: "setText",
    value: function setText() {
      var back,
        text = this.section();
      if (!text) return;
      text = cfg.onText && cfg.onText(text, function () {
        return back = true;
      }) || text;
      if (back) {
        this.data = this.data.substr(0, this.start) + text + this.data.substr(this.i);
        var j = this.start + text.length;
        for (this.i = this.start; this.i < j; this.i++) {
          this.state(this.data[this.i]);
        }
        return;
      }
      if (!this.pre) {
        // 合并空白符
        var tmp = [];
        for (var i = text.length, c; c = text[--i];) {
          if (!blankChar[c] || !blankChar[tmp[0]] && (c = ' ')) tmp.unshift(c);
        }
        text = tmp.join('');
      }
      this.siblings().push({
        type: 'text',
        text: this.decode(text)
      });
    }
    // 设置元素节点
  }, {
    key: "setNode",
    value: function setNode() {
      var node = {
          name: this.tagName.toLowerCase(),
          attrs: this.attrs
        },
        close = cfg.selfClosingTags[node.name];
      this.attrs = {};
      if (!cfg.ignoreTags[node.name]) {
        this.matchAttr(node);
        if (!close) {
          node.children = [];
          if (node.name == 'pre' && cfg.highlight) {
            this.remove(node);
            this.pre = node.pre = true;
          }
          this.siblings().push(node);
          this.STACK.push(node);
        } else if (!cfg.filter || cfg.filter(node, this) != false) this.siblings().push(node);
      } else {
        if (!close) this.remove(node);else if (node.name == 'source') {
          var parent = this.parent();
          if (parent && (parent.name == 'video' || parent.name == 'audio') && node.attrs.src) parent.attrs.source.push(node.attrs.src);
        } else if (node.name == 'base' && !this.domain) this.domain = node.attrs.href;
      }
      if (this.data[this.i] == '/') this.i++;
      this.start = this.i + 1;
      this.state = this.Text;
    }
    // 移除标签
  }, {
    key: "remove",
    value: function remove(node) {
      var _this2 = this;
      var name = node.name,
        j = this.i;
      // 处理 svg
      var handleSvg = function handleSvg() {
        var src = _this2.data.substring(j, _this2.i + 1);
        if (!node.attrs.xmlns) src = ' xmlns="http://www.w3.org/2000/svg"' + src;
        var i = j;
        while (_this2.data[j] != '<') {
          j--;
        }
        src = _this2.data.substring(j, i) + src;
        var parent = _this2.parent();
        if (node.attrs.width == '100%' && parent && (parent.attrs.style || '').includes('inline')) parent.attrs.style = 'width:300px;max-width:100%;' + parent.attrs.style;
        _this2.siblings().push({
          name: 'img',
          attrs: {
            src: 'data:image/svg+xml;utf8,' + src.replace(/#/g, '%23'),
            ignore: 'T'
          }
        });
      };
      if (node.name == 'svg' && this.data[j] == '/') return handleSvg(this.i++);
      while (1) {
        if ((this.i = this.data.indexOf('</', this.i + 1)) == -1) {
          if (name == 'pre' || name == 'svg') this.i = j;else this.i = this.data.length;
          return;
        }
        this.start = this.i += 2;
        while (!blankChar[this.data[this.i]] && !this.isClose()) {
          this.i++;
        }
        if (this.section().toLowerCase() == name) {
          // 代码块高亮
          if (name == 'pre') {
            this.data = this.data.substr(0, j + 1) + cfg.highlight(this.data.substring(j + 1, this.i - 5), node.attrs) + this.data.substr(this.i - 5);
            return this.i = j;
          } else if (name == 'style') this.CssHandler.getStyle(this.data.substring(j + 1, this.i - 7));else if (name == 'title') this.title = this.data.substring(j + 1, this.i - 7);
          if ((this.i = this.data.indexOf('>', this.i)) == -1) this.i = this.data.length;
          if (name == 'svg') handleSvg();
          return;
        }
      }
    }
    // 处理属性
  }, {
    key: "matchAttr",
    value: function matchAttr(node) {
      var attrs = node.attrs,
        style = this.CssHandler.match(node.name, attrs, node) + (attrs.style || ''),
        styleObj = {};
      if (attrs.id) {
        if (this.compress & 1) attrs.id = void 0;else if (this.useAnchor) this.bubble();
      }
      if (this.compress & 2 && attrs.class) attrs.class = void 0;
      switch (node.name) {
        case 'a':
        case 'ad':
          this.bubble();
          break;
        case 'font':
          if (attrs.color) {
            styleObj['color'] = attrs.color;
            attrs.color = void 0;
          }
          if (attrs.face) {
            styleObj['font-family'] = attrs.face;
            attrs.face = void 0;
          }
          if (attrs.size) {
            var size = parseInt(attrs.size);
            if (size < 1) size = 1;else if (size > 7) size = 7;
            var map = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
            styleObj['font-size'] = map[size - 1];
            attrs.size = void 0;
          }
          break;
        case 'video':
        case 'audio':
          if (!attrs.id) attrs.id = node.name + ++this["".concat(node.name, "Num")];else this["".concat(node.name, "Num")]++;
          if (node.name == 'video') {
            if (this.videoNum > 3) node.lazyLoad = 1;
            if (attrs.width) {
              styleObj.width = parseFloat(attrs.width) + (attrs.width.includes('%') ? '%' : 'px');
              attrs.width = void 0;
            }
            if (attrs.height) {
              styleObj.height = parseFloat(attrs.height) + (attrs.height.includes('%') ? '%' : 'px');
              attrs.height = void 0;
            }
          }
          attrs.source = [];
          if (attrs.src) attrs.source.push(attrs.src);
          if (!attrs.controls && !attrs.autoplay) console.warn("\u5B58\u5728\u6CA1\u6709 controls \u5C5E\u6027\u7684 ".concat(node.name, " \u6807\u7B7E\uFF0C\u53EF\u80FD\u5BFC\u81F4\u65E0\u6CD5\u64AD\u653E"), node);
          this.bubble();
          break;
        case 'td':
        case 'th':
          if (attrs.colspan || attrs.rowspan) for (var k = this.STACK.length, item; item = this.STACK[--k];) {
            if (item.name == 'table') {
              item.c = void 0;
              break;
            }
          }
      }
      if (attrs.align) {
        styleObj['text-align'] = attrs.align;
        attrs.align = void 0;
      }
      // 压缩 style
      var styles = style.split(';');
      style = '';
      for (var i = 0, len = styles.length; i < len; i++) {
        var info = styles[i].split(':');
        if (info.length < 2) continue;
        var _key = info[0].trim().toLowerCase(),
          _value = info.slice(1).join(':').trim();
        if (_value.includes('-webkit') || _value.includes('-moz') || _value.includes('-ms') || _value.includes('-o') || _value.includes('safe')) style += ";".concat(_key, ":").concat(_value);else if (!styleObj[_key] || _value.includes('import') || !styleObj[_key].includes('import')) styleObj[_key] = _value;
      }
      if (node.name == 'img') {
        if (attrs['data-src']) {
          attrs.src = attrs.src || attrs['data-src'];
          attrs['data-src'] = void 0;
        }
        if (attrs.src && !attrs.ignore) {
          if (this.bubble()) attrs.i = (this.imgNum++).toString();else attrs.ignore = 'T';
        }
        if (attrs.ignore) styleObj['max-width'] = '100%';
        var width;
        if (styleObj.width) width = styleObj.width;else if (attrs.width) width = attrs.width.includes('%') ? attrs.width : attrs.width + 'px';
        if (width) {
          styleObj.width = width;
          attrs.width = '100%';
          if (parseInt(width) > screenWidth) {
            styleObj.height = '';
            if (attrs.height) attrs.height = void 0;
          }
        }
        if (styleObj.height) {
          attrs.height = styleObj.height;
          styleObj.height = '';
        } else if (attrs.height && !attrs.height.includes('%')) attrs.height += 'px';
      }
      for (var key in styleObj) {
        var value = styleObj[key];
        if (key.includes('flex') || key == 'order' || key == 'self-align') node.c = 1;
        // 填充链接
        if (value.includes('url')) {
          var j = value.indexOf('(');
          if (j++ != -1) {
            while (value[j] == '"' || value[j] == "'" || blankChar[value[j]]) {
              j++;
            }
            value = value.substr(0, j) + this.getUrl(value.substr(j));
          }
        }
        // 转换 rpx
        else if (value.includes('rpx')) value = value.replace(/[0-9.]+\s*rpx/g, function ($) {
          return parseFloat($) * screenWidth / 750 + 'px';
        });else if (key == 'white-space' && value.includes('pre')) this.pre = node.pre = true;
        style += ";".concat(key, ":").concat(value);
      }
      style = style.substr(1);
      if (style) attrs.style = style;
    }
    // 节点出栈处理
  }, {
    key: "popNode",
    value: function popNode(node) {
      // 空白符处理
      if (node.pre) {
        node.pre = this.pre = void 0;
        for (var i = this.STACK.length; i--;) {
          if (this.STACK[i].pre) this.pre = true;
        }
      }
      var siblings = this.siblings(),
        len = siblings.length,
        childs = node.children.length;
      if (node.name == 'head' || cfg.filter && cfg.filter(node, this) == false) return siblings.pop();
      var attrs = node.attrs;
      // 替换一些标签名
      if (cfg.blockTags[node.name]) node.name = 'div';else if (!cfg.trustTags[node.name]) node.name = 'span';
      // 去除块标签前后空串
      if (node.name == 'div' || node.name == 'p' || node.name[0] == 't') {
        if (len > 1 && siblings[len - 2].text == ' ') siblings.splice(--len - 1, 1);
        if (childs && node.children[childs - 1].text == ' ') node.children.pop();
      }
      // 处理列表
      if (node.c && (node.name == 'ul' || node.name == 'ol')) {
        if ((node.attrs.style || '').includes('list-style:none')) {
          for (var _i = 0, child; child = node.children[_i++];) {
            if (child.name == 'li') child.name = 'div';
          }
        } else if (node.name == 'ul') {
          var floor = 1;
          for (var _i2 = this.STACK.length; _i2--;) {
            if (this.STACK[_i2].name == 'ul') floor++;
          }
          if (floor != 1) for (var _i3 = childs; _i3--;) {
            node.children[_i3].floor = floor;
          }
        } else {
          for (var _i4 = 0, num = 1, _child; _child = node.children[_i4++];) {
            if (_child.name == 'li') {
              _child.type = 'ol';
              _child.num = function (num, type) {
                if (type == 'a') return String.fromCharCode(97 + (num - 1) % 26);
                if (type == 'A') return String.fromCharCode(65 + (num - 1) % 26);
                if (type == 'i' || type == 'I') {
                  num = (num - 1) % 99 + 1;
                  var one = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
                    ten = ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
                    res = (ten[Math.floor(num / 10) - 1] || '') + (one[num % 10 - 1] || '');
                  if (type == 'i') return res.toLowerCase();
                  return res;
                }
                return num;
              }(num++, attrs.type) + '.';
            }
          }
        }
      }
      // 处理表格的边框
      if (node.name == 'table') {
        var padding = attrs.cellpadding,
          spacing = attrs.cellspacing,
          border = attrs.border;
        if (node.c) {
          this.bubble();
          if (!padding) padding = 2;
          if (!spacing) spacing = 2;
        }
        if (border) attrs.style = "border:".concat(border, "px solid gray;").concat(attrs.style || '');
        if (spacing) attrs.style = "border-spacing:".concat(spacing, "px;").concat(attrs.style || '');
        if (border || padding) (function f(ns) {
          for (var i = 0, n; n = ns[i]; i++) {
            if (n.name == 'th' || n.name == 'td') {
              if (border) n.attrs.style = "border:".concat(border, "px solid gray;").concat(n.attrs.style);
              if (padding) n.attrs.style = "padding:".concat(padding, "px;").concat(n.attrs.style);
            } else f(n.children || []);
          }
        })(node.children);
      }
      this.CssHandler.pop && this.CssHandler.pop(node);
      // 自动压缩
      if (node.name == 'div' && !Object.keys(attrs).length && childs == 1 && node.children[0].name == 'div') siblings[len - 1] = node.children[0];
    }
    // 工具函数
  }, {
    key: "bubble",
    value: function bubble() {
      for (var i = this.STACK.length, item; item = this.STACK[--i];) {
        if (cfg.richOnlyTags[item.name]) {
          if (item.name == 'table' && !Object.hasOwnProperty.call(item, 'c')) item.c = 1;
          return false;
        }
        item.c = 1;
      }
      return true;
    }
  }, {
    key: "decode",
    value: function decode(val, amp) {
      var i = -1,
        j,
        en;
      while (1) {
        if ((i = val.indexOf('&', i + 1)) == -1) break;
        if ((j = val.indexOf(';', i + 2)) == -1) break;
        if (val[i + 1] == '#') {
          en = parseInt((val[i + 2] == 'x' ? '0' : '') + val.substring(i + 2, j));
          if (!isNaN(en)) val = val.substr(0, i) + String.fromCharCode(en) + val.substr(j + 1);
        } else {
          en = val.substring(i + 1, j);
          if (cfg.entities[en] || en == amp) val = val.substr(0, i) + (cfg.entities[en] || '&') + val.substr(j + 1);
        }
      }
      return val;
    }
  }, {
    key: "getUrl",
    value: function getUrl(url) {
      if (url[0] == '/') {
        if (url[1] == '/') url = this.protocol + ':' + url;else if (this.domain) url = this.domain + url;
      } else if (this.domain && url.indexOf('data:') != 0 && !url.includes('://')) url = this.domain + '/' + url;
      return url;
    }
  }, {
    key: "Text",
    value:
    // 状态机
    function Text(c) {
      if (c == '<') {
        var next = this.data[this.i + 1],
          isLetter = function isLetter(c) {
            return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';
          };
        if (isLetter(next)) {
          this.setText();
          this.start = this.i + 1;
          this.state = this.TagName;
        } else if (next == '/') {
          this.setText();
          if (isLetter(this.data[++this.i + 1])) {
            this.start = this.i + 1;
            this.state = this.EndTag;
          } else this.Comment();
        } else if (next == '!') {
          this.setText();
          this.Comment();
        }
      }
    }
  }, {
    key: "Comment",
    value: function Comment() {
      var key;
      if (this.data.substring(this.i + 2, this.i + 4) == '--') key = '-->';else if (this.data.substring(this.i + 2, this.i + 9) == '[CDATA[') key = ']]>';else key = '>';
      if ((this.i = this.data.indexOf(key, this.i + 2)) == -1) this.i = this.data.length;else this.i += key.length - 1;
      this.start = this.i + 1;
      this.state = this.Text;
    }
  }, {
    key: "TagName",
    value: function TagName(c) {
      if (blankChar[c]) {
        this.tagName = this.section();
        while (blankChar[this.data[this.i]]) {
          this.i++;
        }
        if (this.isClose()) this.setNode();else {
          this.start = this.i;
          this.state = this.AttrName;
        }
      } else if (this.isClose()) {
        this.tagName = this.section();
        this.setNode();
      }
    }
  }, {
    key: "AttrName",
    value: function AttrName(c) {
      var blank = blankChar[c];
      if (blank) {
        this.attrName = this.section();
        c = this.data[this.i];
      }
      if (c == '=') {
        if (!blank) this.attrName = this.section();
        while (blankChar[this.data[++this.i]]) {
          ;
        }
        this.start = this.i--;
        this.state = this.AttrValue;
      } else if (blank) this.setAttr();else if (this.isClose()) {
        this.attrName = this.section();
        this.setAttr();
      }
    }
  }, {
    key: "AttrValue",
    value: function AttrValue(c) {
      if (c == '"' || c == "'") {
        this.start++;
        if ((this.i = this.data.indexOf(c, this.i + 1)) == -1) return this.i = this.data.length;
        this.attrVal = this.section();
        this.i++;
      } else {
        for (; !blankChar[this.data[this.i]] && !this.isClose(); this.i++) {
          ;
        }
        this.attrVal = this.section();
      }
      this.setAttr();
    }
  }, {
    key: "EndTag",
    value: function EndTag(c) {
      if (blankChar[c] || c == '>' || c == '/') {
        var name = this.section().toLowerCase();
        for (var i = this.STACK.length; i--;) {
          if (this.STACK[i].name == name) break;
        }
        if (i != -1) {
          var node;
          while ((node = this.STACK.pop()).name != name) {
            ;
          }
          this.popNode(node);
        } else if (name == 'p' || name == 'br') this.siblings().push({
          name: name,
          attrs: {}
        });
        this.i = this.data.indexOf('>', this.i);
        this.start = this.i + 1;
        if (this.i == -1) this.i = this.data.length;else this.state = this.Text;
      }
    }
  }]);
  return MpHtmlParser;
}();
module.exports = MpHtmlParser;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),
/* 264 */
/*!******************************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/components/jyf-parser/libs/config.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(wx) {/* 配置文件 */

var canIUse = wx.canIUse('editor'); // 高基础库标识，用于兼容

module.exports = {
  // 过滤器函数
  filter: null,
  // 代码高亮函数
  highlight: null,
  // 文本处理函数
  onText: null,
  // 实体编码列表
  entities: {
    quot: '"',
    apos: "'",
    semi: ';',
    nbsp: '\xA0',
    ensp: "\u2002",
    emsp: "\u2003",
    ndash: '–',
    mdash: '—',
    middot: '·',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    hellip: '…'
  },
  blankChar: makeMap(' ,\xA0,\t,\r,\n,\f'),
  // 块级标签，将被转为 div
  blockTags: makeMap('address,article,aside,body,caption,center,cite,footer,header,html,nav,section' + (canIUse ? '' : ',pre')),
  // 将被移除的标签
  ignoreTags: makeMap('area,base,basefont,canvas,command,frame,input,isindex,keygen,link,map,meta,param,script,source,style,svg,textarea,title,track,use,wbr' + (canIUse ? ',rp' : '') + ',embed,iframe'),
  // 只能被 rich-text 显示的标签
  richOnlyTags: makeMap('a,colgroup,fieldset,legend,picture,table' + (canIUse ? ',bdi,bdo,caption,rt,ruby' : '')),
  // 自闭合的标签
  selfClosingTags: makeMap('area,base,basefont,br,col,circle,ellipse,embed,frame,hr,img,input,isindex,keygen,line,link,meta,param,path,polygon,rect,source,track,use,wbr'),
  // 信任的属性
  trustAttrs: makeMap('align,alt,app-id,author,autoplay,border,cellpadding,cellspacing,class,color,colspan,controls,data-src,dir,face,height,href,id,ignore,loop,media,muted,name,path,poster,rowspan,size,span,src,start,style,type,unit-id,width,xmlns'),
  // bool 型的属性
  boolAttrs: makeMap('autoplay,controls,ignore,loop,muted'),
  // 信任的标签
  trustTags: makeMap('a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video' + (canIUse ? ',bdi,bdo,caption,pre,rt,ruby' : '')),
  // 默认的标签样式
  userAgentStyles: {
    address: 'font-style:italic',
    big: 'display:inline;font-size:1.2em',
    blockquote: 'background-color:#f6f6f6;border-left:3px solid #dbdbdb;color:#6c6c6c;padding:5px 0 5px 10px',
    caption: 'display:table-caption;text-align:center',
    center: 'text-align:center',
    cite: 'font-style:italic',
    dd: 'margin-left:40px',
    mark: 'background-color:yellow',
    pre: 'font-family:monospace;white-space:pre;overflow:scroll',
    s: 'text-decoration:line-through',
    small: 'display:inline;font-size:0.8em',
    u: 'text-decoration:underline'
  }
};
function makeMap(str) {
  var map = {},
    list = str.split(',');
  for (var i = list.length; i--;) {
    map[list[i]] = true;
  }
  return map;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),
/* 265 */
/*!**********************************************************************************************************!*\
  !*** E:/m_study/important data/CloCoder/Code/Zhanbu/taluo-main/components/jyf-parser/libs/CssHandler.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _classCallCheck = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23);
var _createClass = __webpack_require__(/*! @babel/runtime/helpers/createClass */ 24);
var _defineProperty = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11);
/*
  解析和匹配 Css 的选择器
  github：https://github.com/jin-yufeng/Parser
  docs：https://jin-yufeng.github.io/Parser
  author：JinYufeng
  update：2020/03/15
*/
var cfg = __webpack_require__(/*! ./config.js */ 264);
var CssHandler = /*#__PURE__*/function () {
  "use strict";

  function CssHandler(tagStyle) {
    var _this = this;
    _classCallCheck(this, CssHandler);
    _defineProperty(this, "getStyle", function (data) {
      return _this.styles = new CssParser(data, _this.styles).parse();
    });
    var styles = Object.assign({}, cfg.userAgentStyles);
    for (var item in tagStyle) {
      styles[item] = (styles[item] ? styles[item] + ';' : '') + tagStyle[item];
    }
    this.styles = styles;
  }
  _createClass(CssHandler, [{
    key: "match",
    value: function match(name, attrs) {
      var tmp,
        matched = (tmp = this.styles[name]) ? tmp + ';' : '';
      if (attrs.class) {
        var items = attrs.class.split(' ');
        for (var i = 0, item; item = items[i]; i++) {
          if (tmp = this.styles['.' + item]) matched += tmp + ';';
        }
      }
      if (tmp = this.styles['#' + attrs.id]) matched += tmp + ';';
      return matched;
    }
  }]);
  return CssHandler;
}();
module.exports = CssHandler;
var CssParser = /*#__PURE__*/function () {
  "use strict";

  function CssParser(data, init) {
    var _this2 = this;
    _classCallCheck(this, CssParser);
    _defineProperty(this, "section", function () {
      return _this2.data.substring(_this2.start, _this2.i);
    });
    _defineProperty(this, "isLetter", function (c) {
      return c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z';
    });
    this.data = data;
    this.floor = 0;
    this.i = 0;
    this.list = [];
    this.res = init;
    this.state = this.Space;
  }
  _createClass(CssParser, [{
    key: "parse",
    value: function parse() {
      for (var c; c = this.data[this.i]; this.i++) {
        this.state(c);
      }
      return this.res;
    }
  }, {
    key: "Space",
    value:
    // 状态机
    function Space(c) {
      if (c == '.' || c == '#' || this.isLetter(c)) {
        this.start = this.i;
        this.state = this.Name;
      } else if (c == '/' && this.data[this.i + 1] == '*') this.Comment();else if (!cfg.blankChar[c] && c != ';') this.state = this.Ignore;
    }
  }, {
    key: "Comment",
    value: function Comment() {
      this.i = this.data.indexOf('*/', this.i) + 1;
      if (!this.i) this.i = this.data.length;
      this.state = this.Space;
    }
  }, {
    key: "Ignore",
    value: function Ignore(c) {
      if (c == '{') this.floor++;else if (c == '}' && ! --this.floor) this.state = this.Space;
    }
  }, {
    key: "Name",
    value: function Name(c) {
      if (cfg.blankChar[c]) {
        this.list.push(this.section());
        this.state = this.NameSpace;
      } else if (c == '{') {
        this.list.push(this.section());
        this.Content();
      } else if (c == ',') {
        this.list.push(this.section());
        this.Comma();
      } else if (!this.isLetter(c) && (c < '0' || c > '9') && c != '-' && c != '_') this.state = this.Ignore;
    }
  }, {
    key: "NameSpace",
    value: function NameSpace(c) {
      if (c == '{') this.Content();else if (c == ',') this.Comma();else if (!cfg.blankChar[c]) this.state = this.Ignore;
    }
  }, {
    key: "Comma",
    value: function Comma() {
      while (cfg.blankChar[this.data[++this.i]]) {
        ;
      }
      if (this.data[this.i] == '{') this.Content();else {
        this.start = this.i--;
        this.state = this.Name;
      }
    }
  }, {
    key: "Content",
    value: function Content() {
      this.start = ++this.i;
      if ((this.i = this.data.indexOf('}', this.i)) == -1) this.i = this.data.length;
      var content = this.section();
      for (var i = 0, item; item = this.list[i++];) {
        if (this.res[item]) this.res[item] += ';' + content;else this.res[item] = content;
      }
      this.list = [];
      this.state = this.Space;
    }
  }]);
  return CssParser;
}();

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map