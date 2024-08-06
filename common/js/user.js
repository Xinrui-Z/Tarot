// /api/user.js

// 获取用户信息的 API 接口
export function userinfo() {
    return new Promise((resolve, reject) => {
        uni.request({
            url: '/api/user/info',  // 替换成你的实际 API 接口地址
            method: 'GET',
            success: (res) => {
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    reject(new Error('获取用户信息失败'));
                }
            },
            fail: (error) => {
                reject(error);
            }
        });
    });
}

// 更新用户信息的 API 接口
export function profile(data) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: '/api/user/update',  // 替换成你的实际 API 接口地址
            method: 'POST',
            data: data,
            header: {
                'Content-Type': 'application/json',
                // 如果需要添加认证信息，可以在这里设置
                // 'Authorization': 'Bearer ' + uni.getStorageSync('token')
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else {
                    reject(new Error('更新用户信息失败'));
                }
            },
            fail: (error) => {
                reject(error);
            }
        });
    });
}
