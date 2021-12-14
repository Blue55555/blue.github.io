import store from '@/store/index.js'  
function login(username, password) {
	uniCloud.callFunction({
		name: 'user',
		data: {
			method: 'login',
			username: username,
			password: password
		},
		success(res) {
			if (res.result.code === 0) {
				// 2.8.0版本起调整为蛇形uni_id_token（调整后在一段时间内兼容驼峰uniIdToken）
				uni.setStorageSync('uni_id_token', res.result.token)
				uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
				
				store.commit('setToken',res.result.token)
				store.commit('setUserInfo',res.result.userInfo)
				
				// 其他业务代码，如跳转到首页等
				uni.showToast({
					title: '登录成功',
					icon: 'none'
				})
				uni.switchTab({
					url: '/pages/mine/index'
				})
			} else {
				uni.showModal({
					content: res.result.message,
					showCancel: false
				})
			}
		},
		fail() {
			uni.showModal({
				content: '登录失败，请稍后再试1',
				showCancel: false
			})
		}
	})

}

function register(username, password) {
	uniCloud.callFunction({
		name: 'user',
		data: {
			method: 'register',
			username: username,
			password: password
		},
		success(res) {
			if (res.result.code === 0) {
				// 2.8.0版本起调整为蛇形uni_id_token（调整后在一段时间内兼容驼峰uniIdToken）
				uni.setStorageSync('uni_id_token', res.result.token)
				uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
				
				
				// 其他业务代码，如跳转到首页等
				uni.showToast({
					title: '注册成功',
					icon: 'none'
				})
			} else {
				uni.showModal({
					content: res.result.message,
					showCancel: false
				})
			}
		},
		fail() {
			uni.showModal({
				content: '注册失败，请稍后再试',
				showCancel: false
			})
		}
	})

}

function logout(token) {
	uniCloud.callFunction({
		name: 'user',
		data: {
			method: 'logout',
			uniIdToken:token
		},
		success(res){
			
			uni.removeStorageSync('uni_id_token')
			uni.removeStorageSync('uni_id_token_expired')
			
			store.commit('setToken','')
			store.commit('setUserInfo', {})
			
			uni.showToast({
				title: '登出成功',
				icon: 'none'
			})
		},
		fail(){
			uni.showModal({
				content: '登出失败，请稍后再试',
				showCancel: false
			})
		}
	})
	
}

// function getUserInfoByToken(username, password){
	
// }

let UserApi = {
	login,
	register,
	logout
}


export default UserApi
