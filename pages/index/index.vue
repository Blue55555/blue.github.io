<template>
	<view class="content" style="height: 100%">

		<view class="">

			<scroll-view class="nav" scroll-x @scroll="scroll" :scroll-left="scrollLeft" scroll-with-animation show-scrollbar>
				<view class="nav-item"
					:class="{active:current===index}"
					v-for="(item,index) in navList" :key="index" @click="changeCurrent(index)">
					{{item}}
				</view>
			</scroll-view>

			<!-- 
			<view class="nav-item"
				:style="{fontSize: (index===current ? '18px':'14px'),color: (index===current ? 'black':'#72727b'),borderBottom:(index===current ? '1px solid #f06742':'')}"
				v-for="(item,index) in navList" @click="changeCurrent(index)">
				{{item}}
			</view> -->
		</view>
		<swiper :style="{height: listHeight}" class="swiper" @animationfinish="changeSwiper" :current="current">
			<swiper-item v-for="(it,i) in navList">
				<scroll-view style="height: 100%;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"
					@scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
					<view class="list-view-body">

						<view class="list-view-item" v-for="item in currentList[i]">
							<image class="cover-image" :src="item.img" mode="aspectFit"></image>
							<view class="cover-data">
								<text
									style="width:250px;font-size: 16px;white-space:nowrap;text-overflow:ellipsis; overflow:hidden;">{{item.title}}</text>
								<text
									style="width:250px;font-size: 13px;color: #999;white-space:nowrap;text-overflow:ellipsis; overflow:hidden;">{{item.subtitle}}</text>
								<view style="font-size: 12px;color: #999;display: flex; align-items: center;">
									<view class="iconfont" style="padding-right: 3px;">&#xe6ae;</view>
									<view class="">{{item.info.num}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>

			</swiper-item>
			<!-- <swiper-item>
				<view class="swiper-item">B</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">C</view>
			</swiper-item> -->
		</swiper>
		<image :style="{opacity: gotopbbutton}" src="../../static/top.png" @tap="goTop" class="gotop-button">

			⬆️
		</image>
	</view>
</template>

<script>
	import indexApi from '@/api/index/index.js'
	export default {
		data() {
			return {
				listHeight: '',
				scrollTops: [0, 0, 0],
				windowHeight: '0px',
				windowWidth:0,
				scrollLeft:0,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				navList: ['所有', '相声', '音乐', '相声', '音乐', '相声', '音乐', '相声', '音乐'],
				current: 0,
				currentList: [],
				list: []
			}
		},
		computed: {

			navActive() {
				return this.current
			},
			gotopbbutton() {
				// let a = this.scrollTops[this.current] >= 80 ? 'inline-block' : 'none'
				let a = this.scrollTops[this.current] >= 80 ? '1' : '0'
				console.log(a)
				return a
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			changeCurrent(index) {
				console.log('点击nav切换', this.scrollTops)
				this.current = index
				this.$nextTick(() => {
					this.scrollTop = this.scrollTops[index]
				});
			},

			changeSwiper(e) {
				console.log('滑动切换', this.scrollTops)
				this.current = e.detail.current
				let a = this.windowWidth
				this.$nextTick(() => {
					this.scrollLeft = e.detail.current*20
				});
			},

			//滚动
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log('到底了', e)
				this.getList()
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
				this.scrollTops[this.current] = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(() => {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			},

			async getList() {
				let a = await indexApi.getNovels()
				a = a.data
				this.list.push(...a)

				let list = []
				list[0] = [...this.list]
				for (let i = 1; i < this.navList.length; i++) {
					list[i] = this.list.filter(it => it.type === this.navList[i])
				}
				this.currentList = list

				uni.getSystemInfo({
					success: (res) => {
						console.log(res)
						// this.listHeight = res.windowHeight - 40 - 50 + 'px'
						this.listHeight = res.windowHeight - 100 + 'px'
						this.windowHeight = res.windowHeight + 'px'
						this.windowWidth = res.windowWidth
					}
				})
			},

		}
	}
</script>

<style>
	@font-face {
		font-family: 'iconfont';
		/* Project id 2961193 */
		src: url('//at.alicdn.com/t/font_2961193_jm641tf21fo.woff2?t=1637719908962') format('woff2'),
			url('//at.alicdn.com/t/font_2961193_jm641tf21fo.woff?t=1637719908962') format('woff'),
			url('//at.alicdn.com/t/font_2961193_jm641tf21fo.ttf?t=1637719908962') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 12px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}

	.content {
		/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
		overflow: hidden
	}

	.active {
		border-bottom: 1px solid red;
	}

	.nav {
		position: fixed;
		top: 0;
		width: 100%;
		
		white-space: nowrap;
	}
	.nav::-webkit-scrollbar {
	  display: none;
	}

	.nav-item {
		display: inline-block;
		padding: 14rpx 25rpx;
	}
.nav-item::-webkit-scrollbar {
	  display: none;
	}
	.swiper {
		margin: 80rpx 0 0 0;
		overflow: hidden;
	}

	.list-view-body {

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.list-view-item {
		width: 690rpx;
		height: 140rpx;
		padding: 30rpx 0;
		display: flex;
		position: relative;
		/* border-bottom: 1px solid #999; */


	}

	.list-view-item:after {
		content: " ";
		position: absolute;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid #d9d9d9;
		color: #d9d9d9;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		left: 0;
		z-index: 2;
	}

	.list-view-item:last-child:after {
		display: none;
	}

	.list-view-item .cover-image {
		width: 140rpx;
		height: 140rpx;
		padding-right: 30rpx;
	}

	.list-view-item .cover-data {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.gotop-button {
		width: 40px;
		height: 40px;
		/* border-radius: 100px; */
		/* background-color:#007AFF; */
		font-size: 40px;
		text-align: center;
		color: white;
		/* border: 40px solid rgba(200,200,200,0); */
		/* border-bottom-color: #007AFF; */
		position: fixed;
		right: 10px;
		bottom: var(--window-bottom);
		z-index: 1000;
		transition: linear 1s;
	}
</style>
