<template>
	<view class="page">
		<view class="action">
			<view><image src="/static/center4/scan.png"></image></view>
			<view><image src="/static/center4/setting.png"></image></view>
		</view>
		<view class="user">
			<image class="avatar" src="/static/center4/avatar.png"></image>
			<view class="name">
				<text>易师傅</text>
				<text>工作党</text>
			</view>
			<image class="right" src="/static/center4/right.png"></image>
		</view>
		<view class="tip"> 
			<view>
				<text>阅读书籍</text>
				<text>13</text>
			</view>
			<view>
				<text>坚持天数</text>
				<text>47</text>
			</view>
		</view>
		
		<view class="card">
			<view class="menu">
				<view class="item" v-for="v in menus1" :key="v.id">
					<image :src="v.icon"></image>
					<view>{{v.name}}</view>
					<image class="arrow" v-if="v.arrow" src="/static/center1/right.png"></image>
				</view>
			</view>
		</view>
		
		<view class="card">
			<view class="menu">
				<view class="item" v-for="v in menus2" :key="v.id">
					<image :src="v.icon"></image>
					<view>{{v.name}}</view>
					<image class="arrow" v-if="v.arrow" src="/static/center1/right.png"></image>
				</view>
			</view>
		</view>
		
	</view>
</template>


<script>
	export default {
		data() {
			return {
				menus1: [
					{id: 1, name: '我的书籍', icon: '/static/center4/book.png', arrow: true},
					{id: 2, name: '我的账户', icon: '/static/center4/self.png', arrow: true},
					{id: 3, name: '图书捐赠', icon: '/static/center4/heart.png', arrow: true}
				],
				menus2: [
					{id: 4, name: '联系客服', icon: '/static/center4/kefu.png', arrow: true},
					{id: 5, name: '分享应用', icon: '/static/center4/share.png', arrow: false},
					{id: 6, name: '退出登录', icon: '/static/center4/out.png', arrow: false},
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.page {
		background: #f5f5f5;
		min-height: 100vh;
		
		.action{
			display: flex;
			justify-content: flex-end;
			padding: 10rpx;
			background: #fff;
			
			view{
				padding: 10rpx;
				margin: 0 10rpx;
				border-radius: 8rpx;
				width: 45rpx;
				height: 45rpx;
				
				&:active{
					background: #ccc;
				}
				image{
					width: 45rpx;
					height: 45rpx;
				}
			}
		}
		
		.user{
			display: flex;
			align-items: center;
			padding: 25rpx;
			background: #fff;
			
			&:active{
				background: #f0f0f0;
			}
			
			.avatar{
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
			}
			.right{
				width: 30rpx;
				height: 30rpx;
			}
			.name{
				flex-grow: 1;
				display: flex;
				flex-direction: column;
				padding-left: 20rpx;
				
				text{
					&:nth-child(1){
						font-size: 16px;
						font-weight: bold;
					}
					&:nth-child(2){
						font-size: 12px;
						color: #777;
					}
				}
			}
		}
		
		.tip{
			background: #4776EC;
			width: 700rpx;
			margin: auto;
			height: 100rpx;
			border-radius: 12rpx;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #fff;
			
			view{
				padding-left: 20rpx;
				width: 330rpx;
				
				text{
					font-size: 14px;
					&:nth-child(2){
						font-size: 16px;
						font-weight: bold;
						margin-left: 10rpx;
					}
				}
			}
		}
		
		.card{
			background: #fff;
			box-sizing: border-box;
			width: 700rpx;
			margin: auto;
			padding: 15rpx;
			margin-top: 20rpx;
			border-radius: 12rpx;
			
			.menu{
				
				.item{
					display: flex;
					height: 100rpx;
					align-items: center;
					padding: 0 20rpx;
					box-sizing: border-box;
					width: 700rpx;
					
					&:active{
						background: #f0f0f0;
					}
					
					image{
						height: 45rpx;
						width: 45rpx;
					}
					
					view{
						font-size: 14px;
						color: #444;
						padding-left: 15rpx;
						box-sizing: border-box;
						width: calc(100% - 100rpx);
					}
					
					.arrow{
						width: 26rpx;
						height: 26rpx;
					}
				}
			}
		}
		
	}
</style>