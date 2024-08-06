var interstitialAd = null;
let interstitial = {
	load(id) {
		if (id && uni.createInterstitialAd) {
			interstitialAd = uni.createInterstitialAd({
				adUnitId: id
			})
			interstitialAd.onLoad(() => {
				console.log('插屏广告加载中')
			})
			interstitialAd.onError((err) => {
				console.log('加载错误', err)
			})
			interstitialAd.onClose((res) => {
				console.log('插屏广告关闭', res)
			})
		}
	},
	show() {
		if (interstitialAd) {
			interstitialAd.show().catch((err) => {
				console.error(err)
			})
		}
	}
}

let videoAd = null;
let rewarded = {
	load(id, e) {
		if (id && uni.createRewardedVideoAd) {
			videoAd = uni.createRewardedVideoAd({
				adUnitId: id
			});
			videoAd.onError(err => {
				console.log(err);
				e();
				return uni.showToast({
					title: '暂无广告',
					icon: 'none'
				})
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
			videoAd.closeHandler = (res) => {
				// 用户点击了【关闭广告】按钮
				if (res && res.isEnded || res === undefined) {
					// 正常播放结束，可以下发奖励
					console.log("播放完毕");
					e();
				} else {
					//提前关闭小程序
					console.log("none", "您看完广告后才能下载~")
				}
			};
			videoAd.onClose(videoAd.closeHandler);
		}
	},
	show(e) {
		if (videoAd) {
			videoAd.show().catch(() => {
				// 失败重试
				videoAd.load().then(() => videoAd.show()).catch(err => {
					console.log('激励视频 广告显示失败')
					e();
				})
			})
		}
	}
}

module.exports = {
	interstitial,
	rewarded
};
