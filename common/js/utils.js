const app_info = require("@/static/app_info.js");
const api_host = app_info.api_host
const version = app_info.version
const api_prefix = api_host

//工具类
module.exports = {

	timestamp() {
		return parseInt(new Date().getTime() / 1000);
	},
	cons_log(...params) {
		for (let p of params) {
			console.log(p);
		}
	},
	cons_log_json(...params) {
		for (let p of params) {
			console.log(JSON.stringify(p));
		}
	},

	goto(url) {
		uni.navigateTo({
			url: url
		});
	},

	goreto(url) {
		uni.redirectTo({
			url: url
		});
	},

	gotore(url) {
		uni.reLaunch({
			url: url
		});
	},

	goback(delta = 1) {
		uni.navigateBack({
			delta: delta
		});
	},

	toast(msg, icon = 'none', duration = 2000, mask = false, image = '') {
		uni.showToast({
			title: msg,
			icon: icon,
			duration: duration,
			mask: mask,
			image: image
		})
	},
	
	loading(msg){
		uni.showLoading({
			title: msg
		})
	},
	
	closeLoading(){
		uni.hideLoading()
	},

	alert(content, callBack) {
		uni.hideLoading();
		uni.showModal({
			content: content,
			showCancel: false,
			success: function() {
				if (callBack != undefined) {
					callBack();
				}
			}
		})
	},

	getData(key, is_clear = false) {
		var value = uni.getStorageSync(key);
		if (is_clear) {
			uni.setStorageSync(key, '');
		}
		// console.log('get cache', key, value)
		return value;
	},

	setData(key, value) {
		// console.log('set cache', key, value)
		uni.setStorageSync(key, value);
	},

	array_column(obj, key) {
		var objects = [];
		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) continue;
			if (typeof obj[i] == 'object') {
				objects = objects.concat(this.array_column(obj[i], key));
			} else if (i == key) {
				objects.push(obj[i]);
			}
		}
		return objects;
	},

	shuffle(arr) {
		var l = arr.length
		var index, temp
		while (l > 0) {
			index = Math.floor(Math.random() * l)
			temp = arr[l - 1]
			arr[l - 1] = arr[index]
			arr[index] = temp
			l--
		}
		return arr
	},

	// 秒数转时分秒格式
	sec_to_time(s) {
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

	login() {
		var token = this.getData('token');
		var user = this.getData('user');
		if (!token || !user) {
			const pages = getCurrentPages()
			const currentPage = pages[pages.length - 1]
			const url = currentPage.route
			const options = currentPage.options
			let urlWithArgs = `/${url}?`
			for (let key in options) {
				const value = options[key]
				urlWithArgs += `${key}=${value}&`
			}
			urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
			uni.setStorageSync('route', urlWithArgs);
			console.log('没有缓存数据，需先授权')
			uni.redirectTo({
				url: "/pages/login/login"
			})
			return;
		}
		return true;
	},
	
	/**
	 * rich-text富文本中图片宽度最大100%
	 * @param {String} html
	 */
	formatRichText(html) {
		// 去掉img标签里的style、width、height属性
		let content_data= html.replace(/<img[^>]*>/gi, function(match,capture) {
			match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '')
			match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '')
			match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '')
			return match
		})
			
		// 修改所有style里的width属性为max-width:100%
		content_data = content_data.replace(/style="[^"]+"/gi,function(match,capture){
			match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;')
			return match
		})
			
		// 去掉<br/>标签
		content_data = content_data.replace(/<br[^>]*\/>/gi, '')
		// img标签添加style属性：max-width:100%;height:auto
		content_data = content_data.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:0px auto;"')
		
		return content_data
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
	http(handler, path, data = {}, method = 'post', showLoading = true) {
		let url = api_prefix + path
		let timestamp = Date.parse(new Date())
		if (typeof(data) == 'object') {
			data['timestamp'] = timestamp
		}

		if (showLoading) {
			uni.showLoading({
				title: '加载中..',
				mask: true
			})
		}

		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				method: method,
				data: data,
				header: {
					'content-type': 'application/json',
					'Authorization': `Bearer ${this.getData('token')}`,
					'app-version': version
				},
				success: (res => {
					// console.log('http res', res)
					if (res.statusCode == 200) {
						// 检查是否有新的令牌
						const newToken = res.header['Authorization'];
						if (newToken) {
							console.log('newToken', newToken)
							uni.setStorage({//缓存配置信息
								key: 'token',  
								data: newToken.replace('Bearer ', '')
							})
							console.log('oldToken', this.getData('token'))
						}
						resolve(res.data)
					} else {
						// console.log('http statusCode', res.statusCode)
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})

						// 未登录
						if (res.statusCode == 401) {
							uni.showToast({
								title: "用户未登录",
								icon: 'none'
							})
						}
						if (res.statusCode == 403) {
							uni.showToast({
								title: "用户登录过期",
								icon: 'none'
							})
						}
						this.forceLogout()
						reject(res.data);
					}
				}),
				fail: (res => {
					console.log(res)
					return false;
				}),
				complete: (res => {
					showLoading && uni.hideLoading()
				})
			})
		})
	},
	
	forceLogout() {
		const userinfo = uni.getStorageSync('userinfo')
		this.http('/user/wxLogout', userinfo.id, 'post')
		uni.removeStorageSync('avatar')
		uni.removeStorageSync('userinfo')
		uni.removeStorageSync('token')
		this.resetUserData()
		uni.navigateTo({
			url: "/pages/index/index"
		})
	},
	
	/**
	 * 上传文件
	 * @returns {Promise<*>}
	 */
	uploadFile(handler, filePath, data = {}, fileType = 'image', showLoading = true) {
		
		if (showLoading) {
			uni.showLoading({
				title: '加载中..',
				mask: true
			})
		}
		
		return new Promise((resolve, reject) => {
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
				success: (res) => {
					console.log('upload res', res)
					let data = JSON.parse(res.data)
					if (res.statusCode == 200) {
						resolve(data)
					} else {
						console.log('upload statusCode', res.statusCode)
						uni.showToast({
							title: data.message,
							icon: 'none'
						})
						
						// 未登录
						if (res.statusCode == 401) {
							handler.$refs.login.modal = true
						}
					}
				},
				fail: (res) => {
					console.log('fail res', res)
					return false;
				},
				complete: (res => {
					showLoading && uni.hideLoading()
				})
			})
		})
	},
};

