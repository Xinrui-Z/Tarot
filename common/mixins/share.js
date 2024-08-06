export default{
	data(){
		return {
			//设置默认的分享参数
			sharedata:{
				title:'超智AI塔罗测试',
				path:'pages/index/index',
				imageUrl:'https://static.supercreator.cn/tarot/share_img_icon.png',
				desc:'超准的塔罗测试',
				content:''
			}
		}
	},
	//发送给朋友
	onShareAppMessage(res) {
		if (res.from == 'button') {
		 //    console.log("按钮转发--配置");
			// console.log(JSON.stringify(res))
			// console.log(res.target.dataset.id);
			// this.http('/answers/getShare', { platform: 'weixin', user_id: res.target.dataset.id }, 'get').then(res => {})
		}
		
		return {
			title:this.sharedata.title,
			path:this.sharedata.path,
			imageUrl:this.sharedata.imageUrl,
			desc:this.sharedata.desc,
			content:this.sharedata.content,
			success(res){
				uni.showToast({
					title:'分享成功'
				})
			},
			fail(res){
				uni.showToast({
					title:'分享失败',
					icon:'none'
				})
			}
		}
	},
   
	//uniapp微信小程序分享页面到微信朋友圈
	onShareTimeline(res) {
		return {
			title:this.sharedata.title,
			query:'',
			imageUrl:this.sharedata.imageurl,
			success(res){
				uni.showToast({
					title:'分享成功'
				})
			},
			fail(res){
				uni.showToast({
					title:'分享失败',
					icon:'none'
				})
			}
		}
	}
}