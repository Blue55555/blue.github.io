'use strict';
// 云函数register的代码
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const {
		username,
		password,
		avatar,
		method,
		uniIdToken
	} = event
	
	if(uniIdToken){
		const payload = await uniID.checkToken(uniIdToken)
		if (payload.code) {
			return payload
		}
	}
	

	// if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(password)){
	//   return {
	//     code: 401,
	//     msg: '密码至少包含大写字母，小写字母，数字，且不少于6位'
	//   }
	// }

	switch (method) {
		case 'register':
			return await uniID.register({
				username,
				password
			})
		case 'login':
			return await uniID.login({
				username,
				password
			})
		case 'logout':
			return await uniID.logout(uniIdToken)

		case 'resetPwd':
			return await uniID.resetPwd({
				uid: payload.uid,
				password: password
			})
		case 'setAvatar':
			return await uniID.setAvatar({
				uid: payload.uid,
				avatar
			})
		case 'getUserInfo':
			return await uniID.getUserInfo({
				uid: payload.uid,
				field: ['username','avatar','mobile','email','gender']
			})
	}



}
