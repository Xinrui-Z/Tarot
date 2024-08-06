<template>
	<view class="content">
		<!-- <view class="word blink">此刻，请</view> -->
		<view class="word blink">平静内心</view>
		<view class="word blink">放松身体</view>
		<view class="word blink">深呼吸</view>
		<view class="word blink">马上开始</view>
		
		<view v-if="show" class="flex flex-direction justify-center align-center">
			<input maxlength="100" type="text" value="" confirm-type="search" class="searchText" placeholder-style="color:#a6a7a8;font-size:14px;" placeholder="输入测试问题内容" v-model.trim="searchText"/>
			<view class="text-sm flex justify-center text-grey margin-top">
				内容不得超过50个字
			</view>
			<view class="searchBtn margin-top justify-center align-center flex" style="margin-top:100upx;" @tap="searchStart">开启牌阵</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgAudioCtx: null,
				show: false,
				searchText: '',
				
			};
		},
		onReady(){
			
		},
		onUnload() {
			this.bgAudioCtx.stop();
		},
		onLoad(){
			this.bgAudioCtx = uni.createInnerAudioContext();
			this.bgAudioCtx.src = 'https://static.supercreator.cn/tarot/bg-audio10.wav';
			this.bgAudioCtx.play();
			
			setTimeout(() => {
				// this.bgAudioCtx.stop();
				this.show = true
			}, 15000)
		},
		methods:{
			toNext(){
				return uni.switchTab({
					url: '/pages/index/start'
				})
			},
			searchStart(){
				let that = this
				if(!this.searchText){
					that.utils.toast('请输入你迫切想要解决的问题')
					return false;
				}
				
				return uni.switchTab({
					url: '/pages/index/start?kw='+this.searchText
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	width: 750upx;
	height: 100vh;
	background:#000;
	font-family: 'Montserrat', sans-serif;
	color: #fff;
    position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	display:flex;
	// filter: contrast(15);
	
}

.content{
	width: 750upx;
	height: 100vh;
	position: relative;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	display:flex;
}

.margin-top{
	margin-top: 40rpx;
}

.text-sm{
	font-size: 24upx;
	color: #9a8e8e;
	text-align: center;
	letter-spacing: 2rpx;
}

.text-grey{
	color:#eee;
}

.flex{
	display: flex;
}

.flex-direction{
	flex-direction: column;
}

.align-center{
	align-items: center;
}

.justify-center{
	justify-content: center;
}

.searchText{
	border:2upx solid #9a8e8e;
	padding: 20upx 30upx;
	border-radius: 10upx;
	width: 500upx;
}

.searchBtn{
	color:#181727;
	font-size: 30upx;
	border-radius: 100%;
	width: 200upx;
	height: 200upx;
	letter-spacing: 6upx;
	background-image: linear-gradient( rgba(218,187,136, 1), rgba(238,225,201, 1));
	-webkit-animation:btnAnimate 1.5s linear .01s infinite;
	animation:btnAnimate 1.5s linear .01s infinite;
}

@-webkit-keyframes btnAnimate {
	0%,to {-webkit-transform:scale(1);transform:scale(1);}
	50% {-webkit-transform:scale(1.2);transform:scale(1.2);}
}
@keyframes btnAnimate {
	0%,to {-webkit-transform:scale(1);transform:scale(1);}
	50% {-webkit-transform:scale(1.2);transform:scale(1.2);}
}

.word{
	font-size:70upx;
	position: absolute;
	// top: 50%;
	// left: 50%;
	width: 750upx;
	display: flex;
	justify-content: center;
	// transform: translate(-50%, -50%);
}
.blink:nth-child(2) {
animation-delay: 4s;
}
.blink:nth-child(3) {
animation-delay: 7s;
}
.blink:nth-child(4) {
animation-delay: 10s;
}
.blink:nth-child(5) {
animation-delay: 14s;
}

@keyframes blink{
	0%{opacity: 1;}
	50%{opacity: 1;}
	100%{opacity: 0;}
}

@-webkit-keyframes blink {
	0%{opacity: 1;}
	50%{opacity: 1;}
	100%{opacity: 0;}
}

@-moz-keyframes blink {
	0%{opacity: 1;}
	50%{opacity: 1;}
	100%{opacity: 0;}
}

@-ms-keyframes blink {
	0%{opacity: 1;}
	50%{opacity: 1;}
	100%{opacity: 0;}
}

@-o-keyframes blink {
	0%{opacity: 1;}
	50%{opacity: 1;}
	100%{opacity: 0;}
}

.blink{
	animation: blink 3s ease-in-out;
	opacity: 0;
	color: #fff;
}
</style>
