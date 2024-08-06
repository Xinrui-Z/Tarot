<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "static/style/app.scss";
	@import "static/images/person/icon/iconfont.css";
	/*每个页面公共css */
	/* hover 点击效果 start */
	.tn-hover {
	  opacity: 0.6;
	}
	/* hover 点击效果 end */
	
	.tn-button::after{
		/*其他样式*/
		opacity: 0;
		box-shadow: 0 0 0 6px var(--primary-color);
		transition: .3s;
	}
	
	/*点击*/
	.tn-button:active::after{
		box-shadow: none;
		opacity: 0.4;
		transition: 0s; /*取消过渡*/
	}
</style>
