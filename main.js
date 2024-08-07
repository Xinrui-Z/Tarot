import App from './App'
import api from './api'
import util from './common/util'
import store from './store'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$util = util

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) { }

// +----------------------------------------------------------------------
// | 函数引入
// +----------------------------------------------------------------------
// 工具函数
import utils from './common/js/utils';
Vue.prototype.utils = utils;

// 广告函数
import adUtils from './common/js/ad';
Vue.prototype.adUtils = adUtils;

//导入 md5 加密
import md5 from 'js-md5';
Vue.prototype.md5 = md5;

// 应用配置
const app_info = require("@/static/app_info.js");
Vue.prototype.appInfo = app_info
Vue.config.productionTip = false

// 定义图片地址
let api_host = app_info.api_host;
Vue.prototype.imgUrl = api_host

// 统一请求函数
Vue.prototype.http = function(path, data, method = 'post', showLoading = true) {
	return utils.http(this, path, data, method, showLoading)
}

// 获取当前页面路径
Vue.prototype.currentPage = function () {
	var pages = getCurrentPages() // 获取栈实例
	let currentRoute  = pages[pages.length-1].route; // 获取当前页面路由
	let currentPage = pages[pages.length-1]['$page']['fullPath'] //当前页面路径(带参数)
	return currentPage
}


// 正常格式的日期时间
Vue.filter('format_date', function(time) {
	const dateTime = new Date(time * 1000);
	const YY = dateTime.getFullYear();
	const MM =
		dateTime.getMonth() + 1 < 10 ?
		'0' + (dateTime.getMonth() + 1) :
		dateTime.getMonth() + 1;
	const D =
		dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate();
	const hh =
		dateTime.getHours() < 10 ?
		'0' + dateTime.getHours() :
		dateTime.getHours();
	const mm =
		dateTime.getMinutes() < 10 ?
		'0' + dateTime.getMinutes() :
		dateTime.getMinutes();
	const ss =
		dateTime.getSeconds() < 10 ?
		'0' + dateTime.getSeconds() :
		dateTime.getSeconds();
	return `${YY}-${MM}-${D} ${hh}:${mm}`
});


// 秒转时分秒格式
Vue.filter('format_second', function(second, tips = '不限时') {
	if (second == undefined) return ''
	if (second == 0) return tips

	let result = parseInt(second)
	let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
	let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
	let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));

	let res = '';
	if(h !== '00') res += `${h}时`;
	if(m !== '00') res += `${m}分`;
	res += `${s}秒`;
	return res;
});
// |______________________________________________________________________


// +----------------------------------------------------------------------
// | 全局变量及函数
// +----------------------------------------------------------------------

// 导入并挂载全局的分享方法
import wxShare from '@/common/mixins/share.js'
Vue.mixin(wxShare)

// // 注册全局组件 main.js
// import zwyPopup from '@/components/zwy-popup/zwy-popup.vue'
// Vue.component('zwyPopup', zwyPopup)

//音频播放组件
import ZAudio from '@/components/uniapp-zaudio/index.js'
// import ZAudio from 'uniapp-zaudio' // npm引用方式

console.log(`ZAudio当前版本`,ZAudio.version)
let zaudio = new ZAudio({
	continuePlay: true, //续播
	autoPlay: false, //自动播放 部分浏览器不支持
})
 
Vue.prototype.$zaudio = zaudio


// |______________________________________________________________________



const app = new Vue({
	store,
  ...App
})
app.$mount()
// #endif



// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif