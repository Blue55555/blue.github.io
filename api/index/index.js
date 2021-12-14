import store from '@/store/index.js'  
function getNovels() {
	return new Promise((resolve,reject)=>{
		uniCloud.callFunction({
			name: 'list',
			data: {
				method: 'get'
			},
			success(res) {
				resolve(res.result)
				// if (res.result.code === 0) {
					
				// } else {
				// 	uni.showModal({
				// 		content: res.result.message,
				// 		showCancel: false
				// 	})
				// }
			},
			fail(err) {
				uni.showModal({
					content: err,
					showCancel: false
				})
			}
		})
	})
	

}




let indexApi = {
	getNovels
}


export default indexApi
