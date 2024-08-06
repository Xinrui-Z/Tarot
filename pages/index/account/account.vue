<template>
	<view @click="resetinfo" class="container">
		<view class="title">
			<image :src="avatar"></image>
			<view class="info">
				<text class="nickname">昵称：{{nickname}}</text>
				<view class="constellation">星座：{{constellation}}</view>
			</view>
			<view @click="handleAuth" class="icon">{{isLoggedIn ? '退出登录' : '登录/注册'}}</view>
		</view>
		<view class="item_list">
			<view class="item">
				<view class="wrap">
					<text class="icon-icon-"></text>
					<text>我的订单</text>
				</view>
				<text class="icon-arrow-down"></text>
			</view>
			<view class="item">
				<view class="wrap">
					<text class="icon-cart1"></text>
					<text>我的购物车</text>
				</view>
				<text class="icon-arrow-down"></text>
			</view>
			<view class="item">
				<view class="wrap">
					<text class="icon-yue"></text>
					<text>我的余额</text>
				</view>
				<text class="icon-arrow-down"></text>
			</view>
			<view class="item">
				<view class="wrap">
					<text class="icon-youhuijuan"></text>
					<text>我的优惠卷</text>
				</view>
				<text class="icon-arrow-down"></text>
			</view>
			<view class="item">
				<view class="wrap">
					<text class="icon-yijianfankui1"></text>
					<text>帮助和反馈</text>
				</view>
				<text class="icon-arrow-down"></text>
			</view>
			<view class="item">
				<view class="wrap">
					<text class="icon-shezhi"></text>
					<text>设置</text>
				</view>
				<text class="icon-arrow-down"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				nickname:"",
				constellation:"",
				avatar:"",
				city:"",
				isLoggedIn: false // Track login status
			}
		},
		onShow() {
			this.initData()
		},
		methods:{
			initData() {
				const userinfo = uni.getStorageSync('userinfo')
				if (userinfo != null && userinfo != undefined) {
					this.isLoggedIn = true
					this.nickname = userinfo.userName
					this.constellation = userinfo.zodiac
					const avatar = uni.getStorageSync('avatar')
					if (!avatar) {
						this.loadAvatar()
					}
					this.avatar = avatar;
				}
			},
			handleAuth() {
				if (this.isLoggedIn) {
					this.logout()
				} else {
					this.login()
				}
			},
			login(){
				uni.navigateTo({
					url:"/pages/index/index"
				})
			},
			logout() {
				// Add your logout logic here
				uni.showToast({
					title: '已退出登录',
					icon: 'none'
				})
				uni.removeStorageSync('avatar')
				uni.removeStorageSync('userinfo')
				uni.removeStorageSync('token')
				this.resetUserData()
				uni.navigateTo({
					url: "/pages/index/index"
				})
			},
			resetUserData(){
				this.nickname = ""
				this.constellation = ""
				this.avatar = ""
				this.city = ""
				this.isLoggedIn = false
			},
			resetinfo(){
				uni.navigateTo({
					url:"/pages/index/account/preson_info/preson_info"
				})
			},
			async loadAvatar() {
				try {
					const app_info = require("@/static/app_info.js");
					const api_host = app_info.api_host
				    // 调用 uni.request 方法获取图片数据
				    const response = await new Promise((resolve, reject) => {
				        uni.request({
				            url: api_host + '/file/showAvatar',
				            method: 'GET',
				            responseType: 'arraybuffer', // 获取原始二进制数据
				            header: {
				                'Authorization': `Bearer ${uni.getStorageSync('token')}`
				            },
				            success: (res) => {
				                if (res.statusCode === 200) {
									const base64Data = uni.arrayBufferToBase64(res.data);
									this.avatar = `data:image/jpeg;base64,${base64Data}`;
									uni.setStorage({//缓存配置信息
										key: 'avatar',  
										data: this.avatar
									})
				                    resolve(res.data); // 返回二进制数据
				                } else {
				                    reject(new Error('请求失败'));
				                }
				            },
				            fail: (error) => {
				                reject(error);
				            }
				        });
				    });
				    } catch (error) {
				        console.error('获取头像失败', error);
				    }
				}		        
			},
	}
</script>

<style>
	.title{
		display: flex;
		align-items: center;
		background-color: white;
		padding: 30rpx;
	}
	.title image{
		height: 90rpx;
		width: 90rpx;
		border-radius: 45rpx;
		border: 1px solid #CCCCCC;
		margin-right: 20rpx;
	}
	.item_list{
		margin-top: 10rpx;
	}
	.item{
		display: flex;
		justify-content: space-between;
		height: 89rpx;
		line-height: 89rpx;
		font-size: 30rpx;
		font-weight: 700;
		background-color: white;
		padding: 0rpx 20rpx;
		margin-top: 20rpx;
		border-radius:20rpx;
	}
	.wrap{
		display: flex;
	}
	.wrap text:nth-of-type(1){
		font-size: 40rpx;
		margin-right: 20rpx;
	}
	.nickname{
		margin-right: 19rpx;
	}
	.info{
		line-height: 46rpx;
		font-size: 26rpx;
	}
	.icon{
		 margin-left:auto;
		 width: 150rpx;
		 height: 60rpx;
		 text-align: center;
		 line-height: 60rpx;
		 color: #555555;
		 border: 1px solid #555555;
		 font-size: 26rpx;
		 border-radius: 50rpx;
	}

</style>

