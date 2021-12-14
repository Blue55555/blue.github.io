<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
				<view class="title">username</view>
				<input class="uni-input" name="username" placeholder="" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">mobile</view>
				<input class="uni-input" name="mobile" placeholder="" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">email</view>
				<input class="uni-input" name="email" placeholder="" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">gender</view>
				<radio-group name="radio">
					<label>
						<radio :value="1" /><text>male</text>
					</label>
					<label>
						<radio :value="2" /><text>female</text>
					</label>
				</radio-group>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">input</view>
				<uni-file-picker 
				  v-model="imageValue" 
				     fileMediatype="image" 
				     mode="grid" 
				     @select="select" 
				     @progress="progress" 
				     @success="success" 
				     @fail="fail" 
				    disable-preview
				    :del-icon="false"
				    return-type="object"
				>选择头像</uni-file-picker>
			</view>
			<view class="uni-btn-v">
				<button form-type="submit">Submit</button>
				<button type="default" form-type="reset">Reset</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: []
			}
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			}
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
