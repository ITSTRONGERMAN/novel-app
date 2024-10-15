<script setup>
import { ref } from 'vue';

const current = ref(0);
const statusList = ref([
	{ name: '全部', status: 0 },
	{ name: '代付款', status: 1 },
	{ name: '制作中', status: 2 },
	{ name: '带用餐', status: 3 },
	{ name: '已完成', status: 4 },
	{ name: '交易取消', status: 5 },
	{ name: '交易关闭', status: 6 }
]);
const props = defineProps({
	listTitle: {
		type: String,
		default: ''
	},
	goodsList: {
		type: Array,
		default: () => []
	},
	imgWidth: {
		type: Number,
		default: 100
	},
	imgHeight: {
		type: Number,
		default: 100
	}
});
const change = (e) => {
	current.value = e;
};
</script>
<template>
	<scroll-view scroll-x="true" class="scroll-box pc">
		<view class="item_box" v-for="(iten, indn) in statusList" :key="indn">
			<!-- 如果需要左右显示徽标等其他改变布局使用flex-start即可 王子公主,-->
			<view class="flex-colum cmodelt" @click="change(indn)" :class="current == indn ? 'a active' : ''">
				<view class="flex-start">
					{{ iten.name }}
				</view>
			</view>
		</view>
	</scroll-view>
</template>
<style>
/* 如果有滚动条就用这个 */
/deep/ ::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
	display: none;
}
</style>
<style lang="scss">
.flex-colum {
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* #ifdef APP-PLUS */
	align-items: center;
	/* #endif */
	/* #ifdef H5 */
	align-content: center;
	align-items: center;
	/* #endif */
}
// }
// .flex-start {
// 	display: flex;
// 	justify-content: flex-start;
// 	/* #ifdef APP-PLUS */
// 	align-items: center;
// 	/* #endif */
// 	flex-wrap: wrap;
// 	flex-direction: row ;
// 	/* #ifdef H5 */
// 	align-content: center ;
// 	align-items: center ;
// 	/* #endif */
// }
.scroll-box {
	background-color: #fff;
	height: auto;
	display: flex;
	white-space: nowrap;
}
.item_box {
	display: inline-block;
	box-sizing: border-box;
	border-radius: 12rpx;
	width: 20%;
	text-align: center;
}
.active {
	color: #333333;
	font-weight: bold;
	font-size: 28rpx;
}
.a::after {
	content: '';
	margin-top: 6rpx;
	width: 30rpx;
	height: 4rpx;
	border-radius: 2rpx;
	background-color: #eb7b0c;
}
// 设置其他样式底部u形图片，
// .a::after {
// 	content: '';
// 	margin-top: 6rpx;
// 	width: 40rpx;
// 	height: 10rpx;
// 	border-radius: 2rpx;
// 	background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAUCAYAAADC1B7dAAAAAXNSR0IArs4c6QAABLZJREFUWEfNWFtoXFUUXevMRNNkakZQm9CIlX400BD60aLgIwlSihRtRavVPJwPNRaF1A9BkGI+/FE/Wj8kKFQTU5OChBZMhWJDglSx+pHiA1Ko2Dbah7E1j0kyNDN3y3nd3JmkoSrauYSZm3P2PXets9de+yQEgBckVaMg7xB8CEAWwCCgXuvkh6f0fLFdGm8MeBvAZkCyAI95vHST3wJICMRgJ0hA0kBsY7GRsnjlOwHLCRjE+htAGlCbuEuePQRwm8uCmzOBQsiRTnY/UkwZ2iWpQwA8XrP/AhGdBIEMaELTjq0nIxHWmU52lRUZoSkAK+2G2+T4ewJzfH4+dVUgcQtaKw3UgtNxWoIzc1fv6Lul749iIJX6M5WMJ+SKQUpqgAYvaO40+hxb0qlzEKkOAZsAW0w2iq8cSHS9WwyEmidb26m415KgTowl5C/FMe74vfUzEFttdrQUnTO4IBHMSI739ld1/3QjST1+PlWj4jICys0QpyFKpDyMuo7w0bHWdgH25oGV0OmMMyDgJQGaB+7qHrwRpB4ea6mPBzwIhVWhETsBRc1MQV5mw0gqWVIe/AJIhdZXfoZsVo2LAxnJ4b3sBbVnuLEr838Q09jiK4LXSdkNImZxWAswjcVZtm02yIiaqzJIH/yh+Q0E7LBRJj36w5DTSfV+70hcFOFb6StT3ScbD0/8F8Q2jGxPJphoo2I7iUoLyRuA9QLaOvLepbG++WVdzx4Tt2aooXRV+Z0jAqxzO2ALLVpPoVmEpp4JAukPRA0Emamj/5bchqHtyfiKsnogtlMp02dKI5tlkehP52oWjr0IOX1p5te6M43DmdAh6oZaahHD1xBZGT7oPIRCirNGU5DeJv24IAfBjznBcSiOIofTitmz07PZCZSNT+gX+Y27CVWJGOKVSrCaMdZAgloFbKTiehEpKTQlDzksGf9+IxzzMw0lm76//4A5pi1YHoCaL57ZEojSnTi6O2F6bUc2qgxrLU+O0XF3X6Bzs5Y2mkXrRMcjPcTYk7dmr5iFtTOKwWOjm3uP+kfyCOnBtZ833TefVX2AVNuXi+gMaRohuIKisgXq6s9tk3kmrEGdYdfWHDh/XAlj/CKmXzpBhScauwm2epwDExdF5Ilz2z75KlrHiwjpydX9TdW5HHoEqM/vShGTdNZS6BgOi+XuNZ9vsVEVhbVqCr+gMBCAUKZuvJr83WAWsdTlJz/+rdCUliTkg27taW4LAukAUOnGPA1/znWg3bDLyhK0HaDQr2xIoZQK0UUk7KYmEJdXJ5t69xeGXlNyiwLf31GRiJfsFuAlgreHefeozZlqQQqRk687X7mubvC7wMhLzMFRS1vXZ2QtswPud4KTAWTfbHZ+H9o+nbwWmUWmsFwgPmooLZeqpxjwRSHucU3AgDT3kYL14KJZWIpMFPTCDvtjjVn6mwDYP1sSO4jWnpll8UVkcT1xeTGlnTvXqBJuoeJWCh8AURFmKc8bzN8orq8vzpDPzsLiMi7gCYgcywGHM8/1nv274JatoetdLPHB0+tBVQtKLRTXIpC7Ad4GskIgSRJxKyvMk0hDcBmQcVCdCYLgZxKjzMnJ9PkLp9AxrP8F8I+vvwDmGTt4BsP7GwAAAABJRU5ErkJggg==);
// 	background-size: 100% 100%;
// }
</style>
