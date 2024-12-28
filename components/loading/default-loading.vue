<template>
	<view class="loader">
		<view class="circle"></view>
		<view class="circle"></view>
		<view class="circle"></view>
		<view class="circle"></view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.loader {
		$circle_color_1: #ED9458;
		$circle_color_2: #ED8258;
		$circle_color_3: #B8463F;
		$circle_color_4: #7D3D41;
		$loader-size: 48rpx;
		$circle-size: 18rpx;
		width: $loader-size;
		height: $loader-size;
		position: relative;
		animation: spin988 1.5s linear infinite;

		.circle {
			width: $circle-size;
			height: $circle-size;
			border-radius: 50%;
			position: absolute;
		}

		.circle:nth-child(1) {
			top: 0;
			left: 0;
			background-color: #ED9458;
		}

		.circle:nth-child(2) {
			top: 0;
			right: 0;
			background-color: $circle_color_2;
		}

		.circle:nth-child(3) {
			bottom: 0;
			left: 0;
			background-color: $circle_color_3;
		}

		.circle:nth-child(4) {
			bottom: 0;
			right: 0;
			background-color: $circle_color_4;
		}

		@keyframes spin988 {
			0% {
				transform: scale(1) rotate(0);
			}

			20%,
			25% {
				transform: scale(1.3) rotate(90deg);
			}

			45%,
			50% {
				transform: scale(1) rotate(180deg);
			}

			70%,
			75% {
				transform: scale(1.3) rotate(270deg);
			}

			95%,
			100% {
				transform: scale(1) rotate(360deg);
			}
		}
	}
</style>