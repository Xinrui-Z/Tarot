<template>
		<view class="content">
			<image src="https://static.supercreator.cn/tarot/witch4.png" class="page_bg" mode="widthFix"></image>
			<view class="titleContent">
				<view class="taro-img image1">
					<img class="taro-img__mode-scaletofill" src="https://static.supercreator.cn/tarot/ai.png" mode="aspectFit">
				</view>
				<view class="taro-img image3">
					<img class="taro-img__mode-scaletofill" src="https://static.supercreator.cn/tarot/home-card2.png" mode="widthFix">
				</view>
				<view class="taro-img image1" style="margin:80upx auto 100upx;">
					<image class="taro-img__mode-scaletofill" src="https://static.supercreator.cn/tarot/index-title.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="beginContent">
				<!-- <view class="taro-img image1">
					<img class="taro-img__mode-scaletofill" src="https://static.supercreator.cn/tarot/home-describe2.png" mode="widthFix">
				</view> -->
				
				<!-- #ifdef MP-WEIXIN -->
				<button class="beginBtn tn-button" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true" v-if="!isuser" hover-class="tn-hover" :hover-stay-time="150">开启测试</button>
				
				<button class="beginBtn tn-button" @tap="goToStart()" v-if="isuser" hover-class="tn-hover" :hover-stay-time="150">开启测试</button>
				<!-- #endif -->
				
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				// islogin:false,
				isuser: false,
				code:'',
				anonymousCode:'',
				avatarUrl: '',
				nickName: '',
				gender: '',
				userinfo: {},
				clickAudioCtx: null,
			}
		},
		onLoad() {
			this.userinfo = this.utils.getData('userinfo');
			this.clickAudioCtx = uni.createInnerAudioContext();
			// this.getOrderByUser();
			var this_ = this
			//抖音获取授权并登陆
			if(this.userinfo){
				this_.islogin = true
				this_.isuser = true
			}
			
		},
		methods: {
			//触感震动
			onFeedTap() {
				let platform = uni.getSystemInfoSync().platform
				uni.vibrateLong();
			},
			goToStart(){
				//按钮特效
				this.clickAudioCtx.src = 'https://static.supercreator.cn/tarot/click.wav';
				this.clickAudioCtx.play();
				this.onFeedTap();
				// return uni.navigateTo({
				//  	url: '/pages/index/load'
				// })
				return uni.switchTab({
					url: '/pages/index/start'
				})
			},
			getuserinfo: function(){
				uni.showLoading({
					title: '授权中...'
				});
				var this_=this
				// wx登录
				wx.login({
					success (res) {
						if (res.code) {
							console.log(JSON.stringify(res))
							//发起网络请求
							var code = res.code
							// 获取微信用户信息
							wx.getUserInfo({
								success: function(res) {
									console.log(JSON.stringify(res))
									this_.userinfo = res.userInfo
									this_.wxlogin()
								},
								fail:res=>{
									// 获取失败的去引导用户授权 
								}
							})
					
						} else {

						}
					}
				})
			},
			wxlogin(){
				var this_ = this
				uni.login({
					timeout: 10000,
					provider: 'weixin',  //如果是uniapp，在这里需要标明平台的类型，支持的参数请查阅uniapp官网的uni.login()文档
					success: (res) => {
						//登陆成功的回调
						uni.hideLoading();
						let data = {'code':res.code};
						this.http('/user/wxLogin',data, 'post').then(res => {
							console.log(JSON.stringify(res))
							if(res.code === 200){
								this.userinfo = res.data;
								let result = this.save_login(res.data)
								if(result){
									// return uni.navigateTo({
									// 	url: '/pages/index/load'
									// })
									return uni.switchTab({
										url: '/pages/index/start'
									})
								}
							}else{
								uni.showModal({
									title: '温馨提示',
									content: res.msg,
									showCancel: false,
									confirmText: "确定",
									success: function (res) {
										if (res.confirm) {
											//uni.navigateBack();
										} else if (res.cancel) {
											
										}
									}
								});
							}
						});
					},
					fail: (err) => {
						uni.hideLoading();
					}
				})
			},
			save_wxlogin(data){
				// this.userinfo.openid = this.openid
				uni.setStorage({//缓存配置信息
					key: 'userinfo',  
					data: data.userinfo
				})
				return true;
			},
			logindy(){
				var this_=this
				let data = {'code':this_.code, 'anonymousCode':this_.anonymousCode, 'nick': this_.nickName, 'avatar': this_.avatarUrl};
				this.http('/tarot/dylogin',data, 'get').then(res => {
					// console.log(JSON.stringify(res))
					if(res.code === 1){
						// console.log(res.data)
						// this_.openid = res.data.data.openid
						// this_.unionid = res.data.data.unionid
						let result = this_.save_login(res.data)
						if(result){
							return uni.navigateTo({
								url: '/pages/index/load'
							})
						}
						
					}else{
						uni.showModal({
							title: '温馨提示',
							content: res.msg,
							showCancel: false,
							confirmText: "确定",
							success: function (res) {
								if (res.confirm) {
									//uni.navigateBack();
								} else if (res.cancel) {
									
								}
							}
						});
					}
				})
			},
			save_login(data){
				const userinfo = {
					id: data.id,
					userName: data.userName,
					sex: data.sex,
					phone: data.phone,
					birthday: data.birthday,
					zodiac: data.zodiac
				}
				console.log('userinfo', userinfo)
				uni.setStorage({//缓存配置信息
					key: 'userinfo',  
					data: userinfo
				})
				uni.setStorage({//缓存配置信息
					key: 'token',  
					data: data.token
				})
				return true;
				// uni.navigateBack();
			},
			getOrderByUser() {
				this.http('/tarot/getOrderByUser', {user_id : this.userinfo.id }, 'get').then(res => {
					if (!res.code) {
						uni.showToast({
							title: '获取数据失败，请刷新重试',
							icon: 'error'
						})
						return
					}
					
					// console.log(res);
				})
			}
		}
	}
</script>

<style>
	page {
		width: 750upx;
	    font-size: 24upx;
	    height: 100vh;
		/* height: 100%; */
	    font-family: PingFangSC-Regular,Helvetica,Arial,sans-serif;
		box-sizing: border-box;
		/* background: url('https://static.supercreator.cn/tarot/background3.png') #54285b no-repeat; */
		background-position: top;
		/* background-size: 100% auto; */
		background-size: cover;
		background-origin: content-box;
		overflow:hidden;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
		width: 750upx;
		height: 100%;
		max-height: 100vh;
		position:relative;
		box-sizing: border-box;
	}
	


	@-webkit-keyframes btnAnimate {
		0%,to {-webkit-transform:scale(1);transform:scale(1);}
		50% {-webkit-transform:scale(1.2);transform:scale(1.2);}
	}
	@keyframes btnAnimate {
		0%,to {-webkit-transform:scale(1);transform:scale(1);}
		50% {-webkit-transform:scale(1.2);transform:scale(1.2);}
	}
	.flexCol, .flexRow {
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-flex-direction: row;
	    -ms-flex-direction: row;
	    flex-direction: row;
	}
	
	.page_bg {
		position:absolute;
		/* top:var(--status-bar-height); */
		top: 0;
		left:50%;
		width:750upx;
		height:1624upx;
		/* max-height: 100vh; */
		-webkit-transform:translateX(-50%);
		-ms-transform:translateX(-50%);
		transform:translateX(-50%);
		/* opacity: .85; */
	}
	.taro-img {
	    display: inline-block;
	    overflow: hidden;
	    position: relative;
	    font-size: 0;
	    width: 640upx;
	    height: 480upx;
	}
	
	.taro-img__mode-scaletofill {
	    object-fit: contain;
	    width: 100%;
	    height: 100%;
	}
	.content .titleContent {
		margin-top:322upx;
		/* display:flex; */
		
	}
	.content .titleContent .image1,.content .titleContent .image2 {
		display:block;height:128upx;margin:0 auto;background:0 0;
	}
	.content .titleContent .image2 {height:60upx;margin-top:.12rem;}
	.content .beginContent .image1,.content .titleContent .image3 {display:block;height:190upx;margin:0 auto;margin-top:60upx;background:0 0;}
	.content .beginContent .image1 {margin-top: 30upx;}
	.content .beginContent .tips{color:#9a8e8e;margin-top:40upx;text-align:center;z-index: 1;position:relative; letter-spacing: 2upx; justify-content: center; align-items: center;}
	.content .beginContent .beginBtn {position:relative;
	margin:30upx auto 0;
	width:460upx;
	height:78upx;
	line-height: 78upx;
	letter-spacing: 6upx;
	color:#333;
	z-index:2;
	background: url("https://static.supercreator.cn/tarot/start-btn.png") no-repeat;
	background-position:50%;
	background-size:100% 100%;
	-webkit-animation:btnAnimate 1.5s linear .01s infinite;
	animation:btnAnimate 1.5s linear .01s infinite;
	}
	.content .footer {
		margin-top:120upx;
		padding:20upx 0 20upx;
		display:-webkit-flex;
		display:-ms-flexbox;
		display:flex;
		-webkit-flex-direction:column;
		-ms-flex-direction:column;
		flex-direction:column;
		-webkit-align-items:center;
		-ms-flex-align:center;
		align-items:center;
		color:#9a8e8e;
		z-index: 1;
	}
	.content .footer .footer-item {text-align:center;-webkit-flex:1;-ms-flex:1;flex:1;cursor:pointer;margin:.8rem .4rem;}
	.content .footer .myOrder {font-size:.6rem;color:#d6b47d;text-decoration:underline;margin-top:.44rem;}
	.content .company {margin-top:20upx;font-size:24upx;}

</style>
