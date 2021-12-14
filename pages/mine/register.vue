<template>
	<view class="">
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
				<view class="title">input</view>
				<input class="uni-input" placeholder="请输入账号" v-model="username" />
				<input class="uni-input" type="password" placeholder="请输入密码" v-model="password" />
			</view>
			<view class="uni-btn-v">
				<button form-type="submit">注册</button>				
				<button type="default" form-type="reset">Reset</button>
			</view>
		</form>
	</view>
</template>

<script>
	import  UserApi from '@/api/mine/login.js'
	export default {
		data() {
			return {
				username: '',
				password: '',
			}
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + this.username + this.password)
				// console.log(UserApi.default.login())
				UserApi.register(this.username, this.password)
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		},
	}
</script>

<style>

</style>
