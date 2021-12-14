<template>
	<view>
		
		<view v-if="isLogin"  class="">
			<view @click="goto('/pages/mine/setuserinfo')">
				<image :src="userInfo.avatar" mode=""></image>
				<view class="">
					{{userInfo.username}}
				</view>
				
			</view>
			<button  type="default" @click="logout">登出</button>
			
		</view>
		<button v-else type="default" @click="goto('/pages/mine/login')">登录/注册</button>
		<button type="default">asd</button>
	</view>
</template>

<script>
	import UserApi from '@/api/mine/login.js'
	export default {
		data() {
			return {
				
			}
		},
		computed: {

			isLogin() {
				return this.$store.state.token ? true : false
			},
			userInfo(){
				return this.$store.state.userInfo
			}
		},
		onLoad() {
			console.log(123, this.$store.state.token, this.isLogin)
		},
		methods: {
			goto(url) {
				uni.navigateTo({
					url: url
				})
			},
			logout() {
				UserApi.logout(this.$store.token)
			}
		}
	}
</script>

<style>

</style>
