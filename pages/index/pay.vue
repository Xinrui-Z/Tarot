<template>
	<view>
		<view class="container">
		    <view class="payPageTitle">
		        <view class="taro-img img">
		            <image mode="aspectFit" class="taro-img__mode-scaletofill" src="https://static.supercreator.cn/tarot/index-title3.png"></image>
		        </view>
		    </view>
		    <view class="payContent">
		        <view class="resContainer">
		            <!-- <view class="taro-text resText">
		                亲爱的：
		            </view>
					<view class="taro-text resText index2em">
						你的问题：{{ kw }}
					</view>
		            <view class="taro-text resText index2em">
		                
		            </view> -->
		            <view class="cardView">
		                <view class="cardItem">
		                    <view class="cardItemTitle">
		                        PASS
		                    </view>
		                    <view class="taro-img cardItemBg">
		                        <img class="taro-img__mode-scaletofill" :src="select_card[0]['image']">
		                    </view>
		                    <view class="cardItemName">
		                        {{ select_card[0]['name'] }}
		                    </view>
		                </view>
		                <view class="cardItem">
		                    <view class="cardItemTitle">
		                        NOW
		                    </view>
		                    <view class="taro-img cardItemBg">
		                        <img class="taro-img__mode-scaletofill" :src="select_card[1]['image']">
		                    </view>
		                    <view class="cardItemName">
		                        {{ select_card[1]['name'] }}
		                    </view>
		                </view>
		                <view class="cardItem">
		                    <view class="cardItemTitle">
		                        FUTURE
		                    </view>
		                    <view class="taro-img cardItemBg">
		                        <img class="taro-img__mode-scaletofill" :src="select_card[2]['image']">
		                    </view>
		                    <view class="cardItemName">
		                        {{ select_card[2]['name'] }}
		                    </view>
		                </view>
		            </view>
		            <!-- <view class="taro-img descImg">
		                <image mode="aspectFit" class="taro-img__mode-scaletofill" src=""></image>
		            </view> -->
					
		        </view>
				<view class="readingContainer">
				    <view class="readingContent">
				        <view class="readingItemTitle" style="align-items: center;justify-content: center;">
							<view class="aititle">测试结果</view>
				        </view>
				        
						<view class="voiceContent margin-top align-center justify-center">
							<view class="margin-top index2em resText" style="padding:30upx;" v-if="isfirst">
								{{ jx_txt }}
							</view>
							<view id="voiceLoveWave" class="voiceLoveTarget" :class="!paused && 0 === playinfo.singer ? 'tn-loading' : ''" v-if="isfirst && isvoice">
								<!-- <span style="--d: 20"></span>
								<span style="--d: 19"></span>
								<span style="--d: 18"></span>
								<span style="--d: 17"></span>
								<span style="--d: 16"></span> -->
								<span style="--d: 15"></span>
								<span style="--d: 14"></span>
								<span style="--d: 13"></span>
								<span style="--d: 12"></span>
								<span style="--d: 11"></span>
								<span style="--d: 10"></span>
								<span style="--d: 9"></span>
								<span style="--d: 8"></span>
								<span style="--d: 7"></span>
								<span style="--d: 6"></span>
								<span style="--d: 5"></span>
								<span style="--d: 4"></span>
								<span style="--d: 3"></span>
								<span style="--d: 2"></span>
								<span style="--d: 1"></span>
								<span style="--d: 0"></span>
								<span style="--d: 1"></span>
								<span style="--d: 2"></span>
								<span style="--d: 3"></span>
								<span style="--d: 4"></span>
								<span style="--d: 5"></span>
								<span style="--d: 6"></span>
								<span style="--d: 7"></span>
								<span style="--d: 8"></span>
								<span style="--d: 9"></span>
								<span style="--d: 10"></span>
								<span style="--d: 11"></span>
								<span style="--d: 12"></span>
								<span style="--d: 13"></span>
								<span style="--d: 14"></span>
								<span style="--d: 15"></span>
								<!-- <span style="--d: 16"></span>
								<span style="--d: 17"></span>
								<span style="--d: 18"></span>
								<span style="--d: 19"></span>
								<span style="--d: 20"></span> -->
							</view>
							<view data-voice="1" class="playBtn tn-button" @tap="play(playIndex)" hover-class="tn-hover" :hover-stay-time="150" v-if="isfirst && isvoice">
								{{ !paused ? '暂停' : '试听解析' }}
							</view>
							
							<view data-voice="1" class="playBtn tn-button" @tap="get_voice(orderno)" hover-class="tn-hover" :hover-stay-time="150" v-if="isfirst && !isvoice && !wait">
								生成音频
							</view>
							
							<view class="clearBtn tn-button" @tap="isshow2 = true" hover-class="tn-hover" :hover-stay-time="150" v-if="!isfirst">
								查看结果
							</view>
							
							<view class="clearBtn tn-button" hover-class="tn-hover" :hover-stay-time="150" v-if="wait && isfirst">
								生成中...
							</view>
						</view>
					</view>
				</view>	
				<view class="flex justify-between align-center">
					<view class="resetBtn tn-button" @tap="reBack()" hover-class="tn-hover" :hover-stay-time="150" style="width:300upx;">
						重新抽牌
					</view>
					
					<view class="resetBtn tn-button" @tap="share()" hover-class="tn-hover" :hover-stay-time="150" style="width:300upx;margin-left:40upx;">
						分享好友
						<button open-type="share" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0;"></button>
					</view>
				</view>
		    </view>
			
			<view class="flex " style="margin-bottom:50upx;">
				<ad unit-id="adunit-6d8fa0055bc4f006"></ad>
			</view>
			
			<!-- 使用组件 -->
			<!-- <zwy-popup :ishide='isshow2' width="466rpx" height="500rpx" radius="16rpx">
				<view class="content payModal">
					<view class="payModalText" style="padding: 60rpx">
					    看广告解锁测试结果
					</view>
					<view class="payModalPrice">
					    您的支持是我们继续前行的动力
					</view>
					<view class="payModalBtn tn-button" hover-class="tn-hover" :hover-stay-time="150" @tap="adClick()">
					    <view class="taro-text" >
					        看广告解锁
					    </view>
					</view>
				</view>
				<view class="close" @click="isshow2=false" hover-class="tn-hover" :hover-stay-time="150">✕</view>
			</zwy-popup> -->
			
		</view>
	</view>
</template>

<script>
	let videoAd = null;
	var w = uni.getSystemInfoSync().windowWidth;
	var h = uni.getSystemInfoSync().windowHeight;
	import zwyPopup from '@/components/zwy-popup/zwy-popup.vue';
	export default {
		data() {
			return {
				title: '',
				select_card: {},
				money: 0,
				price: 0,
				card_ids : '',
				order: [],
				orderno: '',
				userinfo: {},
				audiolist: this.$zaudio.audiolist, //当前音频列表
				playIndex: this.$zaudio.playIndex, //当前播放的索引
				paused: this.$zaudio.paused, //当前是否暂停
				playinfo: this.$zaudio.playinfo,//当前播放的信息
				audiodata: [],
				isfirst: true,//第一次加载暂停
				isshow: false,
				isshow2: false,
				isshow3: false,
				wait: true,
				isvoice: false,
				clickAudioCtx: null,
				appname: 'weixin',
				kw: '',
				timer33: null,
				jx_txt: '',
				//设置默认的分享参数
				sharedata:{
					title: '',
					path: '',
					imageUrl:'',
					desc:'',
					content:''
				},
			}
		},
		components: { zwyPopup },
		onLoad(option) {
			this.userinfo = this.utils.getData('userinfo');
			if(option.cids){
				this.card_ids = option.cids
				if(option.no){
					this.orderno = option.no
				}
				if(option.kw){
					this.kw = option.kw
				}
				//获得塔罗牌牌组信息
				this.getTarot(option.cids);
			}
			
			//注意: 不同的回调方法, 相同的业务函数方法名, 不会相互影响;
			this.$zaudio.on('stop', 'aaa', function(){
				// console.log('我是强制暂停或关闭小程序音频浮窗触发的')
			});
			//注意: 相同的回调方法, 且相同的业务函数方法名, 只作用于第一次注册的业务
			this.$zaudio.on('seek', 'aaa', function(time){
				// console.log('进度拖动B', time)
			});
			
			this.clickAudioCtx = uni.createInnerAudioContext();
			//显示插屏广告
			this.adUtils.interstitial.load("adunit-9c088611ab437d07")
			this.adUtils.interstitial.show()
			// this.getOrderByUser();
		},
		onShow() {
			//实时渲染当前的播放状态
			this.$zaudio.syncRender()
		
			//实时获取当前播放状态
			this.$zaudio.syncStateOn('page-index-get-state', ({ audiolist, playIndex, paused, playinfo }) => {
				this.audiolist = audiolist;
				this.playIndex = playIndex;
				this.paused = paused;
				this.playinfo = playinfo;
			});
			//获取支付通道
			uni.getProvider({
				service: 'payment',
				success: function(res) {
					// console.log(JSON.stringify(res.provider))
					uni.setStorageSync('providerpayment', res.provider[0]);
				}
			});
		},
		onHide() {
			//卸载不需要的业务和获取播放状态的业务,提高页面性能
			this.$zaudio.syncStateOff('page-index-get-state');
			this.$zaudio.off('seek', 'aaa');
			this.$zaudio.off('stop', 'aaa');
			// clearInterval(this.timer33);
			// this.timer33 = null;
		},
		methods: {
			//上传广告成功日志
			// upAdClick(){
			// 	let that = this;
			// 	let token = '$JDHHCK584752';
			// 	let time = new Date().getTime();
			// 	let sign = that.md5(that.userinfo.user_id + time + token)
			// 	//如果广告调用失败，则给予一次机会
			// 	that.http('/tarot/giveAward2', {uid : that.userinfo.user_id, id: that.orderno, cards: that.card_ids, sign: sign, timestamps: time, isfal: 1 , p: that.appname, kw: that.kw }, 'post').then(res => {
			// 		// that.getUser();
			// 	})
			// },
			//点击看广告
			// adClick(){
			// 	var that = this
			// 	let token = '$JDHHCK584752';
			// 	that.adUtils.rewarded.show(() => {
			// 		let time = new Date().getTime();
			// 		let sign = that.md5(that.userinfo.user_id + time + token)
			// 		//如果广告调用失败，则给予一次机会
			// 		that.http('/tarot/giveAward2', {uid : that.userinfo.user_id, id: that.orderno, cards: that.card_ids, sign: sign, timestamps: time, isfal: 1 , p: that.appname, kw: that.kw }, 'post').then(res => {
			// 			// that.utils.toast('感谢支持, AI解析中...');
						
			// 			// that.timer33 = setInterval(function(){
			// 			// 	that.getOrder();
			// 			// }, 1000);
			// 			that.isshow2 = false;
			// 			that.getOrder();
			// 			that.wait = true;
			// 			return
			// 		})
			// 	});
			// },
			// loadAd(){
			// 	// // 激励广告
			// 	let that = this
			// 	let token = '$JDHHCK584752';
			// 	that.adUtils.rewarded.load( "adunit-e38f67604d8171da" , () => {
			// 		let time = new Date().getTime();
			// 		let sign = that.md5(that.userinfo.user_id + time + token)
			
			// 	    //这里写你的任意奖励事件
			// 		that.http('/tarot/giveAward2', {uid : that.userinfo.user_id, id: that.orderno, cards: that.card_ids, sign: sign, timestamps: time , p: that.appname, kw: that.kw }, 'post').then(res => {
			// 			// that.utils.toast('感谢支持, AI解析中...');
						
			// 			// that.timer33 = setInterval(function(){
			// 			// 	that.getOrder();
			// 			// }, 1000);
			// 			that.isshow2 = false;
			// 			that.getOrder();
			// 			that.wait = true;
			// 			return
			// 		})
			// 	});
			// },
			//触感震动
			onClickOut() {
				//按钮特效
				this.clickAudioCtx.src = 'https://static.supercreator.cn/tarot/click.wav';
				this.clickAudioCtx.play();
				let platform = uni.getSystemInfoSync().platform
				uni.vibrateLong();
			},
			reBack(){
				this.onClickOut();
				this.$zaudio.syncStateOff('page-index-get-state');
				this.$zaudio.off('seek', 'aaa');
				this.$zaudio.off('stop', 'aaa');
				this.$zaudio.off('playing', 'recharge');
				// clearInterval(this.timer33);
				// this.timer33 = null;
				return uni.reLaunch({
					url: '/pages/index/start?kw='+this.kw
				})
			},
			play(key) {
				if(!this.isfirst){
					this.willStop();
				}
				//触感反馈
				this.onClickOut();
				this.$zaudio.operate(key);
			},
			//设置播放列表
			firstAudios(data){
				this.audiodata = [];
				let audio_data = {};
				let this_ = this;
				data.url.forEach((i, v) => {
					audio_data = {
						src: i,
						title: 'AI牌面解析',
						singer: v,
						coverImgUrl: ''
					};
					console.log(audio_data);
					this_.audiodata.push(audio_data)
				});
				// 设置音频数据
				this_.$zaudio.setAudio(this_.audiodata)
				//渲染第一首音频
				this_.$zaudio.setRender(0)
			},
			// payDY(){
			// 	let that = this;
			// 	this.http('/tarot/ttpay', {no: that.orderno, user_id: that.userinfo.user_id, id: that.card_ids } , 'post').then(res => {
			// 		if (!res.code) {
			// 			uni.showToast({
			// 				title: res.msg,
			// 				icon: 'error'
			// 			})
			// 			return
			// 		}
			// 		// console.log(JSON.stringify(res))
			// 		// #ifdef MP-WEIXIN
			// 		that.opratePay(res.data);
			// 		// #endif
			// 	})
				
			// },
			// opratePay(orderString) {
			// 	let _this = this;
			// 	//支付
			// 	uni.requestPayment({
			// 		provider: uni.getStorageSync('providerpayment'),
			// 		// #ifdef MP-WEIXIN
			// 		orderInfo: orderString,
			// 		service: 5,
			// 		// #endif
			
			// 		success: function(value) {
			// 			// #ifdef MP-WEIXIN
			// 			if(value.code==0){
			// 				// 支付成功处理逻辑，只有res.code=0时，才表示支付成功
			// 				// 但是最终状态要以商户后端结果为准
			// 				uni.showToast({
			// 					title: '支付成功',
			// 					icon: 'none'
			// 				});
			// 				_this.isshow = false;
			// 				_this.isshow2 = false;
			// 				_this.getOrder();
			// 			}else{
			// 				_this.isshow = false;
			// 				_this.isshow2 = false;
			// 				uni.showToast({
			// 					title: '支付失败',
			// 					icon: 'none'
			// 				})
			// 			}
			// 			// #endif
			// 		},
			// 		fail: function(err) {
			// 			console.log(err);
			// 			_this.showPay = false;
			// 			uni.showToast({
			// 				title: '支付失败',
			// 				icon: 'none'
			// 			})
			// 		}
			// 	})
			// },
			//注册10秒后暂停事件
			willStop() {
				this.$zaudio.on('playing', 'recharge', info => {
					if (info.current_value > 6) {
						this.$zaudio.stop();
						// this.isshow = true
						this.isshow2 = true;
					}
				});
				this.isfirst = true;
			},
			//卸载10秒后暂停事件
			removeStop() {
				this.$zaudio.off('playing', 'recharge');
				this.$zaudio.operate();
			},
			//获取订单
			getOrder(){
				let that = this
				this.http('/tarot/getOrderByNo', {'user_id' : this.userinfo.user_id, 'no': this.orderno} , 'get').then(res => {
					if (!res.code) {
						return
					}
					that.order = res.data;
					if(parseInt(that.order.status) == 1){
						let play_result = {}
						if(that.order.retxt){
							that.wait = false;
							that.jx_txt = that.order.retxt;
						}else{
							that.wait = true;
							that.getAIGC()
						}
						
						if(that.order.voice){
							that.isvoice = true;
							if(that.order.voice_notify){
								play_result = {
									url: JSON.parse(that.order.voice),
									type: 2
								}
								that.firstAudios(play_result);
								//将注册的暂停事件清除
								that.removeStop();
							}else{
								play_result = {
									url: JSON.parse(that.order.voice),
									type: 1
								}
								that.firstAudios(play_result);
								//将注册的暂停事件清除
								that.removeStop();
							}
						}
						
						that.isfirst = true;

						// clearInterval(that.timer33);
						// that.timer33 = null;

					}
					uni.hideLoading()
				})
			},
			getAIGC(){
				let that = this
				that.http('/tarot/getAigc', {'user_id': that.userinfo.user_id,'no': that.orderno} , 'get').then(res => {
					// that.getOrder();
					that.get_voice();
				})
			},
			get_voice(){
				let that = this
				that.http('/tarot/getVoice', {'user_id': that.userinfo.user_id,'no': that.orderno} , 'get').then(res => {
					that.getOrder();
				})
			},
			//获取牌组信息
			getTarot(e) {
				let that = this;
				this.http('/tarot/getTarot', {data : e }, 'get').then(res => {
					// that.getPrice();
					that.getOrder();
					
					if (!res.code) {
						uni.showToast({
							title: '获取数据失败，请刷新重试',
							icon: 'error'
						})
						return
					}
					that.select_card = res.data;
					if(that.order.length <= 0){
						let token = '$JDHHCK584752';
						let time = new Date().getTime();
						let sign = that.md5(that.userinfo.user_id + time + token)
						that.http('/tarot/giveAward2', {uid : that.userinfo.user_id, id: that.orderno, cards: that.card_ids, sign: sign, timestamps: time, isfal: 1 , p: that.appname, kw: that.kw }, 'post').then(res => {
							that.getOrder();
							that.wait = true;
							return
						})
					}
					// that.loadAd();
				})
			}
		}
	}
</script>

<style lang="scss">
@import "/static/css/at_modal.css";
page {
	width: 750upx;
	font-size: 24upx;
	height: 100vh;
	/* height: 100%; */
	font-family: PingFangSC-Regular,Helvetica,Arial,sans-serif;
	box-sizing: border-box;
	background: url('https://static.supercreator.cn/tarot/background3.png') #1d1936 no-repeat;
	background-position: top;
	background-size: 100% auto;
	background-origin: content-box;
}
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 750upx;
	height: 100%;
	position:relative;
	box-sizing: border-box;
}

.flex{
	display: flex;
}
.flex-direction{
	flex-direction: column;
}
.justify-center{
	justify-content: center;
}
.justify-between{
	justify-content: space-between;
}
.align-center{
	align-items: center;
}
.margin-top{
	margin-top: 40upx;
}

.clearBtn{
	color:#181727;
	font-weight: 600;
	font-size: 32upx;
	border-radius: 100%;
	width: 200upx;
	height: 200upx;
	letter-spacing: 6upx;
	display:-webkit-flex;
	display:-ms-flexbox;
	display:flex;
	-webkit-align-items:center;
	-ms-flex-align:center;
	align-items:center;
	-webkit-justify-content:center;
	-ms-flex-pack:center;
	justify-content:center;
	background-image:-webkit-gradient(linear,left bottom,left top,from(#cda86d),to(#d6b47d));
	background-image:-webkit-linear-gradient(bottom,#cda86d,#d6b47d);
	background-image:-o-linear-gradient(bottom,#cda86d,#d6b47d);
	background-image:linear-gradient(0deg,#cda86d,#d6b47d);
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

.index2em{
	text-indent: 2em;
}

@-webkit-keyframes pokeFadeIn {
	0% {
		opacity:0;
	}
	to {
		opacity:1;
	}
}
@keyframes pokeFadeIn {
	0% {
		opacity:0;
	}
	to {
		opacity:1;
	}
}
@-webkit-keyframes pokeRotate {
	0%,50% {
		-webkit-transform:translateY(45%) rotate(0deg) scale(2.8) rotateY(0deg);
		transform:translateY(45%) rotate(0deg) scale(2.8) rotateY(0deg);
	}
	to {
		-webkit-transform:translateY(45%) rotate(0deg) scale(2.8) rotateY(90deg);
		transform:translateY(45%) rotate(0deg) scale(2.8) rotateY(90deg);
	}
}
@keyframes pokeRotate {
	0%,50% {
		-webkit-transform:translateY(45%) rotate(0deg) scale(2.8) rotateY(0deg);
		transform:translateY(45%) rotate(0deg) scale(2.8) rotateY(0deg);
	}
	to {
		-webkit-transform:translateY(45%) rotate(0deg) scale(2.8) rotateY(90deg);
		transform:translateY(45%) rotate(0deg) scale(2.8) rotateY(90deg);
	}
}
@-webkit-keyframes pokeGotoCard1 {
	0% {
		top:4.6rem;
		width:4.92rem;
		height:7.76rem;
		margin-left:0;
		-webkit-transform:translateX(-2.48rem) rotateY(90deg);
		transform:translateX(-2.48rem) rotateY(90deg);
	}
	50% {
		top:4.6rem;
		width:4.92rem;
		height:7.76rem;
		margin-left:0;
		-webkit-transform:translateX(-2.48rem) rotateY(0deg);
		transform:translateX(-2.48rem) rotateY(0deg);
	}
	to {
		top:19.04rem;
		width:2.72rem;
		height:4.32rem;
		margin-left:0;
		-webkit-transform:translateX(-6.68rem) rotateY(0deg);
		transform:translateX(-6.68rem) rotateY(0deg);
	}
}
@keyframes pokeGotoCard1 {
	0% {
		top:4.6rem;
		width:4.92rem;
		height:7.76rem;
		margin-left:0;
		-webkit-transform:translateX(-2.48rem) rotateY(90deg);
		transform:translateX(-2.48rem) rotateY(90deg);
	}
	50% {
		top:4.6rem;
		width:4.92rem;
		height:7.76rem;
		margin-left:0;
		-webkit-transform:translateX(-2.48rem) rotateY(0deg);
		transform:translateX(-2.48rem) rotateY(0deg);
	}
	to {
		top:19.04rem;
		width:2.72rem;
		height:4.32rem;
		margin-left:0;
		-webkit-transform:translateX(-6.68rem) rotateY(0deg);
		transform:translateX(-6.68rem) rotateY(0deg);
	}
}
@-webkit-keyframes pokeGotoCard2 {
	0% {
		top:4.6rem;
		width:4.92rem;
		height:7.76rem;
		margin-left:0;
		-webkit-transform:translateX(-2.48rem) rotateY(90deg);
		transform:translateX(-2.48rem) rotateY(90deg);
	}
	50% {
		top:4.6rem;
		width:4.92rem;
		height:7.76rem;
		margin-left:0;
		-webkit-transform:translateX(-2.48rem) rotateY(0deg);
		transform:translateX(-2.48rem) rotateY(0deg);
	}
	to {
		top:19.04rem;
		width:2.72rem;
		height:4.32rem;
		margin-left:0;
		-webkit-transform:translateX(-1.392rem) rotateY(0deg);
		transform:translateX(-1.392rem) rotateY(0deg);
	}
}
@keyframes pokeGotoCard2 {
	0% {
		top:4.6rem;
		width:4.92rem;
		height:7.76rem;
		margin-left:0;
		-webkit-transform:translateX(-2.48rem) rotateY(90deg);
		transform:translateX(-2.48rem) rotateY(90deg);
	}
	50% {
		top:4.6rem;
		width:4.92rem;
		height:7.76rem;
		margin-left:0;
		-webkit-transform:translateX(-2.48rem) rotateY(0deg);
		transform:translateX(-2.48rem) rotateY(0deg);
	}
	to {
		top:19.04rem;
		width:2.72rem;
		height:4.32rem;
		margin-left:0;
		-webkit-transform:translateX(-1.392rem) rotateY(0deg);
		transform:translateX(-1.392rem) rotateY(0deg);
	}
}
@-webkit-keyframes pokeGotoCard3 {
	0% {
		top:4.6rem;
		width:4.92rem;
		height:7.76rem;
		margin-left:0;
		-webkit-transform:translateX(-2.48rem) rotateY(90deg);
		transform:translateX(-2.48rem) rotateY(90deg);
	}
	50% {
		top:4.6rem;
		width:4.92rem;
		height:7.76rem;
		margin-left:0;
		-webkit-transform:translateX(-2.48rem) rotateY(0deg);
		transform:translateX(-2.48rem) rotateY(0deg);
	}
	to {
		top:19.04rem;
		width:2.72rem;
		height:4.32rem;
		margin-left:0;
		-webkit-transform:translateX(3.92rem) rotateY(0deg);
		transform:translateX(3.92rem) rotateY(0deg);
	}
}
@keyframes pokeGotoCard3 {
	0% {
		top:4.6rem;
		width:4.92rem;
		height:7.76rem;
		margin-left:0;
		-webkit-transform:translateX(-2.48rem) rotateY(90deg);
		transform:translateX(-2.48rem) rotateY(90deg);
	}
	50% {
		top:4.6rem;
		width:4.92rem;
		height:7.76rem;
		margin-left:0;
		-webkit-transform:translateX(-2.48rem) rotateY(0deg);
		transform:translateX(-2.48rem) rotateY(0deg);
	}
	to {
		top:19.04rem;
		width:2.72rem;
		height:4.32rem;
		margin-left:0;
		-webkit-transform:translateX(3.92rem) rotateY(0deg);
		transform:translateX(3.92rem) rotateY(0deg);
	}
}
.payPageTitle {
	padding:100upx 0;
	text-align:center;
}
.taro-img {
    display: inline-block;
    overflow: hidden;
    position: relative;
    font-size: 0;
    width: 650upx;
    // height: 240px;
}

.payPageTitle .img {
	display:block;
	margin:0 auto;
	height:88upx;
	background:0 0;
}
.payContent {
	padding:0 30upx 60upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.payContent .resContainer,.payContent .resetBtn {
	display:-webkit-flex;
	display:-ms-flexbox;
	display:flex;
}
.payContent .resetBtn {
	width:600upx;
	height:78upx;
	-webkit-align-items:center;
	-ms-flex-align:center;
	align-items:center;
	-webkit-justify-content:center;
	-ms-flex-pack:center;
	justify-content:center;
	background-image:-webkit-gradient(linear,left bottom,left top,from(#cda86d),to(#d6b47d));
	background-image:-webkit-linear-gradient(bottom,#cda86d,#d6b47d);
	background-image:-o-linear-gradient(bottom,#cda86d,#d6b47d);
	background-image:linear-gradient(0deg,#cda86d,#d6b47d);
	border-radius:40upx;
	margin:60upx auto 60upx;
	font-size: 32upx;
	color:#181727;
	font-weight:600;
	position:relative;
}
.payContent .resContainer {
	-webkit-flex-direction:column;
	-ms-flex-direction:column;
	flex-direction:column;
	background:rgba(82,44,87,.59);
	border:4upx dashed rgba(207,165,199,.46);
	border-radius: 20upx;
	padding:30upx 20upx;
	width: 650upx;
}
.payContent .resContainer .resText {
	font-size: 32upx;
	color:#cfa5c7;
	letter-spacing:0;
	text-align: left;
	line-height: 46upx;
	padding:0 10upx;
	flex-wrap: wrap;
	word-break: break-all;
}

.resText {
	font-size: 32upx;
	color:#cfa5c7;
	letter-spacing:0;
	text-align: left;
	line-height: 46upx;
	padding:0 10upx;
	flex-wrap: wrap;
	word-break: break-all;
}
.payContent .resContainer .resText:nth-child(2) {
	margin-top:20upx;
}
.payContent .resContainer .resText:nth-child(3) {
	margin-top:20upx;
}
.payContent .resContainer .cardView {
	display:-webkit-flex;
	display:-ms-flexbox;
	display:flex;
	-webkit-align-items:center;
	-ms-flex-align:center;
	align-items:center;
	-webkit-justify-content:center;
	-ms-flex-pack:center;
	justify-content:center;
	margin-top:40upx;
}
.payContent .resContainer .cardView .cardItem {
	-webkit-flex:1;
	-ms-flex:1;
	flex:1;
	text-align:center;
}
.payContent .resContainer .cardView .cardItem .cardItemTitle {
	font-size:24upx;
	color:#d6b47d;
	line-height:32upx;
}
.payContent .resContainer .cardView .cardItem .cardItemName {
	line-height: 32upx;
	font-size:24upx;
	color:#cfa5c7;
	margin-top:10upx;
	text-align:center;
}
.payContent .resContainer .cardView .cardItem .cardItemBg {
	width: 144upx;
	height: 222upx;
	margin:20upx auto 0;
	border-radius:10upx;
	overflow:222upx;
}
.payContent .resContainer .descImg {
	display:block;
	margin:60upx auto 0;
	max-width:100%;
	height: 88upx;
}
.payContent .payContainer {
	background: #fff;
	border-radius: 20upx;
	overflow: hidden;
	margin-top:20upx;
}
.payContent .payContainer .name {
	display:-webkit-flex;
	display:-ms-flexbox;
	display:flex;
	-webkit-align-items:center;
	-ms-flex-align:center;
	align-items:center;
	-webkit-justify-content:center;
	-ms-flex-pack:center;
	justify-content:center;
	background:#cfa5c7;
	font-size:0;
	text-align:center;
	height:1.88rem;
	font-size:24upx;
	color:#522c57;
	font-weight:600;
}
.payContent .payContainer .content {
	padding:.84rem .64rem;
}
.payContent .payContainer .content .discountPrice {
	white-space:nowrap;
	background:#f13c4c;
	border-radius:.2rem;
	font-size:.68rem;
	color:#fff;
	line-height:1.28rem;
	padding:0 .34rem;
}
.payContent .payContainer .content .price {
	font-size:.64rem;
	color:#919ba2;
	line-height:.896rem;
	margin-top:.168rem;
}
.payContent .payContainer .content .price .line {
	text-decoration:line-through;
}
.payContent .payContainer .content .tip {
	font-size:24upx;
	color:#4a4a4a;
	margin-top:20upx;
	text-align:center;
}
.payContent .payContainer .content .buttonArea {
	margin-top:20upx;
}
.payContent .payContainer .content .buttonArea .btn {
	background:#00b30d;
	border-radius:.212rem;
	height:2.04rem;
	display:-webkit-flex;
	display:-ms-flexbox;
	display:flex;
	-webkit-align-items:center;
	-ms-flex-align:center;
	align-items:center;
	-webkit-justify-content:center;
	-ms-flex-pack:center;
	justify-content:center;
}
.payContent .payContainer .content .buttonArea .btn.zfb {
	background-color:#02a9f0;
	margin-top:.424rem;
}
.payContent .payContainer .content .buttonArea .btn .btnIcon {
	height:.88rem;
	width:1.08rem;
}
.payContent .payContainer .content .buttonArea .btn .btnName {
	margin-left:.424rem;
	font-size:.768rem;
	color:#fff;
	font-weight:600;
}
.payContent .payContainer .content .safeArea {
	margin-top:.84rem;
}
.payContent .payContainer .content .safeArea .safeImg {
	display:block;
	margin:0 auto;
	height:1.236rem;
}
.payContent .payContainer .content .safeArea .safeText {
	text-align:center;
	font-size:.512rem;
	color:#00b30d;
	line-height:.704rem;
	margin-top:.212rem;
}


.payContent .readingContainer {
	border:4upx dashed #f17f6f;
	position:relative;
	background:rgba(66,33,70,.7);
	border-radius:20upx;
	margin-top:60upx;
	padding:0 40upx 60upx;
	width: 610upx;
}
.payContent .readingContainer .readingContent {
	position:relative;
	top:-30upx;
}
.payContent .readingContainer .readingContent .readingItemTitle {
	text-align:center;
	font-size:0;
	height: 64upx;
	display:flex;
}
.payContent .readingContainer .readingContent .readingLove {
	color:#f97b77;
	background:url("data:image/png;base64,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") no-repeat;
	background-position:top;
	background-size:340upx 60upx;
}
.payContent .readingContainer .readingContent .readingWealth {
	color:#f97b77;
	background:url("data:image/png;base64,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") no-repeat;
	background-position:top;
	background-size:340upx 60upx;
	// background-size:6.64rem 1.2rem;
}
.payContent .readingContainer .readingContent .readingBusiness {
	color:#f97b77;
	background:url("data:image/png;base64,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") no-repeat;
	background-position:top;
	background-size:340upx 60upx;
	// background-size:6.64rem 1.2rem;
}

.payContent .readingContainer .readingContent .aititle {
	color: #fff;
	font-size:40upx;
	text-align:center;
	width:400upx;
	height: 60upx;
	line-height: 60upx;
	background:#f97b77;
	position:relative;
	border-radius: 20upx;
}
// .payContent .readingContainer .readingContent .aititle::after{
// 	position:absolute;
// 	content: '';
// 	width:400upx;
// 	height: 60upx;
// 	background:#f97b77;
// 	top: 0;
// 	left:100upx;
// 	z-index:1;
// }
.payContent .readingContainer .readingContent .readingItemDetail {
	text-align:center;
}
.payContent .readingContainer .readingContent .readingItemDetail .cardBg {
	width:144upx;
	height:222upx;
	margin:20upx auto 0;
	border-radius:10upx;
	overflow:hidden;
}
.payContent .readingContainer .readingContent .readingItemDetail .cardName {
	width: 144upx;
	margin:20upx auto 0;
	padding:0 20upx;
	height:32upx;
	line-height:32upx;
	background:rgba(207,165,199,.2);
	border-radius:40upx;
	font-size:24upx;
	color:#cfa5c7;
}
.payContent .voiceContent {
	display:flex;
	flex-direction: column;
}
.payContent .voiceContent .title {
	font-size:30upx;
	color:#d6b47d;
	line-height:36upx;
}
.payContent .voiceContent .voiceLoveTarget {
	margin-top:20upx;
	margin-bottom:20upx;
	height:80upx;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}
.payContent .voiceContent .voiceLoveTarget span {
	background: linear-gradient(to top, #d299c2 0%, #fef9d7 100%);
	width: 4px;
	height: 20%;
	border-radius: calc(var(--h) * 0.2 * 0.5);
	margin-right: 4px;
}
.tn-loading span{
	animation: loading 2.5s infinite linear;
	animation-delay: calc(0.2s * var(--d));
}
.payContent .voiceContent .voiceLoveTarget span:last-child {
	margin-right: 0px;
}
@keyframes loading {
	0% {
		background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
		height: 20%;
		border-radius: calc(var(--h) * 0.2 * 0.5);
	}
	50% {
		background-image: linear-gradient(to top, #d299c2 0%, #fef9d7 100%);
		height: 100%;
		border-radius: calc(var(--h) * 1 * 0.5);
	}
	100% {
		background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
		height: 20%;
		border-radius: calc(var(--h) * 0.2 * 0.5);
	}
}
.payContent .voiceContent .playBtn {
	font-size:30upx;
	color:#181727;
	font-weight:600;
}
.payContent .voiceContent .playBtn,.payContent .voiceContent .unlockBtn {
	width:600upx;
	height:78upx;
	display:-webkit-flex;
	display:-ms-flexbox;
	display:flex;
	-webkit-align-items:center;
	-ms-flex-align:center;
	align-items:center;
	-webkit-justify-content:center;
	-ms-flex-pack:center;
	justify-content:center;
	background-image:-webkit-gradient(linear,left bottom,left top,from(#cda86d),to(#d6b47d));
	background-image:-webkit-linear-gradient(bottom,#cda86d,#d6b47d);
	background-image:-o-linear-gradient(bottom,#cda86d,#d6b47d);
	background-image:linear-gradient(0deg,#cda86d,#d6b47d);
	border-radius: 40upx;
	margin:20upx auto 0;
}
.payContent .voiceContent .unlockBtn .unlockIcon {
	width:.72rem;
	height:.72rem;
}
.payContent .voiceContent .unlockBtn .unlockText {
	font-size:24upx;
	color:#181727;
	margin-left:20upx;
	font-weight:600;
}
.payContent .orderDisplay {
	color:#cfa5c7;
}
.payModal {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
}
.close {
	width: 60rpx;
	height: 60rpx;
	color: #FFFFFF;
	line-height: 60rpx;
	text-align: center;
	border-radius: 50%;
	border: 1px solid #FFFFFF;
	position: relative;
	bottom: -10%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.payModal .payModalText {
	font-size: 28upx;
	color:#432144;
	margin:0 auto;
	line-height: 40upx;
}
.payModal .payModalPrice .defaultPrice {
	font-size: 28upx;
	text-decoration:line-through;
}
.payModal .payModalPrice .discountPrice {
	display:block;
	font-size: 28upx;
	white-space:nowrap;
	background:#f13c4c;
	border-radius: 28upx;
	color:#fff;
	line-height: 40upx;
	padding:0 20upx;
}
.payModal .payModalBtn {
	cursor:pointer;
	margin-top: 30upx;
	display:-webkit-flex;
	display:-ms-flexbox;
	display:flex;
	-webkit-flex-direction:row;
	-ms-flex-direction:row;
	flex-direction:row;
	-webkit-align-items:center;
	-ms-flex-align:center;
	align-items:center;
	-webkit-justify-content:center;
	-ms-flex-pack:center;
	justify-content:center;
	color:#fff;
	border-radius: 40upx;
	height: 80upx;
	font-size:28upx;
	width: 80%;
	background:#d6b47d;
	border:2upx solid #d6b47d;
}
.payModal .payModalBtn .icon {
	width:60upx;
	height:60upx;
	margin-right:20upx;
}
.taro-img__mode-scaletofill {
	object-fit: contain;
	width: 100%;
	height: 100%;
}

</style>
