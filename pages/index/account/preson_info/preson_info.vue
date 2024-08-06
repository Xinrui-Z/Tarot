<template>
    <view class="userinfo">
        <view class="form">
            <button class="avatar-wrap" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
                <view class="label"> 头像 </view>
                <view class="ipt">
                    <img class="avatar" :src="cdnUrl" />
                    <uni-icons class="arrow-right" type="right" size="20"></uni-icons>
                </view>
            </button>
        </view>
        <view class="info_nickname">
            <view class="nickname_left"> 昵称 </view>
            <view class="nickname_right">
                <input v-model="userinfo.userName" placeholder="请输入您的昵称" />
            </view>
        </view>
        <view class="info_nickname">
            <view class="nickname_left">生日</view>
            <view class="nickname_right">
                <picker mode="date" @change="onDateChange">
                    <view class="uni-input">
                        <text v-if="userinfo.birthday">{{ userinfo.birthday }}</text>
						<text style="color: #73767a;" v-else>请选择您的生日</text>
                    </view>
                </picker>
            </view>
        </view>
        <view class="info_nickname">
            <view class="nickname_left"> 性别 </view>
            <view class="nickname_right gender">
                <picker @change="examinationType" :range="examinationTypeArray" style="margin-right: 10rpx">
                    <label class="">
						<text v-if="userinfo.sex != undefined && userinfo.sex != null">{{examinationTypeArray[userinfo.sex]}}</text>
						<text style="color: #73767a;" v-else>请选择性别</text>
					</label>
                </picker>
                <uni-icons class="arrow-right" type="right" size="20" style="margin-top: 5rpx"></uni-icons>
            </view>
        </view>
        <view class="info_nickname">
            <view class="nickname_left"> 手机号 </view>
            <view class="nickname_right">
                <input class="showphone" v-model="userinfo.phone" placeholder="请输入手机号"></input>
            </view>
        </view>
        <view class="btn-wrap">
            <button type="warn" class="btn" @click="saveinfo()">保存</button>
        </view>
    </view>
</template>
 
<script>
// import  {getPhone}  from '../../utils/phoneNumber.js'
 
export default {
    data() {
        return {
            cdnUrl: '',
            avatar: '',
            nickname: '',
            userbirth: '',
            examinationTypeArray: ['女', '男'],
            examinationTypeIndex: 0,
            examinationTypeArrayType: '',
            phone: '',
            number: 2,
            flag: false,
			userinfo: {
				id: '',
				avatar: '',
				userName: '',
				sex: 0,
				birthday: '',
				phone: '',
				zodiac: ''
			},
			api_host: ''
        }
    },
    onShow() {
        this.initData()
    },
    methods: {
		initData() {
			const app_info = require("@/static/app_info.js");
			this.api_host = app_info.api_host
			this.getUserinfo()
		},
        saveinfo: function () {
            this.http('/user/update', this.userinfo, 'post').then(res => {
				if (res.code === 200) {
					uni.showToast({
						title: '修改成功',
						icon: 'success',
					})
					this.userinfo.zodiac = res.data
					uni.setStorage({//缓存配置信息
						key: 'userinfo',  
						data: this.userinfo
					})
				}
			})
        },
        upload_file: function (e) {
            wx.showLoading({
                title: '上传中'
            })
 
            let self = this
            wx.uploadFile({
                url: this.api_host + '/file/uploadAvatar',
                filePath: e, //图片路径
                name: 'file',
                header: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${uni.getStorageSync('token')}`
                },
                success: function (res) {
					self.userinfo.avatar = res.data
					console.log("res", self.userinfo.avatar)
					uni.setStorage({//缓存配置信息
						key: 'avatar',  
						data: e
					})
                    wx.hideLoading()
                    wx.showToast({
                        title: '上传成功',
                        icon: 'success',
                        duration: 3000
                    })
                },
                fail: function (a) {
                    wx.hideLoading()
                    wx.showToast({
                        title: '上传失败',
                        icon: 'none',
                        duration: 3000
                    })
                }
            })
        },
        getUserinfo() {
            let self = this
			this.cdnUrl = uni.getStorageSync('avatar')
			this.userinfo = uni.getStorageSync('userinfo')
			console.log('userinfo', this.userinfo)
        },
        onChooseAvatar(res) {
            console.log(res)
            const { detail } = res
            this.upload_file(detail.avatarUrl)
            this.cdnUrl = detail.avatarUrl
        },
        // 绑定输入监听事件
        onName(event) {
            console.log(event)
            const { detail } = event
            this.userbirth = detail.value
        },
        change(e) {
            console.log('e:', e)
        },
        examinationType(e) {
            this.userinfo.sex = e.target.value
            this.examinationTypeArrayType = this.examinationTypeArray[this.examinationTypeIndex]
        },
        changenumber() {
            this.number = 1
            this.flag = true
        },
        onPhone(event) {
            console.log(event)
            const { detail } = event
            this.phone = detail.value
        },
		onDateChange(event) {
		    // 获取选择的日期
		    const selectedDate = event.target.value;
		    // 更新userinfo.birthday
		    this.userinfo.birthday = selectedDate;
		}
    }
}
</script>
 
<style lang="scss">
button::after {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
}
.userinfo {
    font-size: 34rpx;
    font-weight: 400;
    color: #333333;
    height: 100%;
    position: relative;
    .form {
        background-color: #ffffff;
    }
    .avatar-wrap {
        border: 0;
        background-color: #ffffff;
        height: 158rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 32rpx;
        .avatar {
            margin-right: 10rpx;
        }
        .ipt {
            display: flex;
            align-items: center;
        }
        img {
            width: 118rpx;
            height: 118rpx;
        }
    }
 
    .info_nickname {
        border-bottom: 1px solid #e9e9e9;
        height: 112rpx;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 32rpx;
        // justify-content: space-between;
 
        .nickname_left {
        }
 
        .nickname_right {
            input {
                text-align: right;
            }
        }
        .gender {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .btn-wrap {
        position: absolute;
        margin-top: 2%;
        width: 100%;
        text-align: center;
        .btn {
            width: 690rpx;
            height: 88rpx;
        }
    }
}
</style>