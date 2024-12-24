<template>
	<view class="login-container">
		<view class="header">
			<view class="status-bar"></view>
			<view class="inner-box">
				<uv-icon @tap="back" color="#000" name="arrow-left" size="50rpx"></uv-icon>
			</view>
		</view>
		<view class="icon-box">
			<image src="../../static/images/logo.png" mode=""></image>
		</view>
		<view class="form">
			<view class="inner-box">
				<inputVue role="login" prop="account" @updateValue="updateValue" type="text" placeholder="请输入您的账号"
					:modelValue="formInfo.login.account">
				</inputVue>
				<inputVue role="login" prop="password" @updateValue="updateValue" type="password" placeholder="请输入您的密码"
					:modelValue="formInfo.login.password"></inputVue>
				<view class="btn-group">
					<button @tap="onSubmit" open-type="submit" class="btn">登录</button>
					<button class="btn">注册</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue'
	import inputVue from './components/input.vue';

	const formInfo = reactive({
		login: {
			account: '',
			password: ''
		}
	})

	// 返回上一页
	const back = () => {
		uni.navigateBack();
	};

	// 提交表单数据
	const onSubmit = () => {
		console.log(formInfo.login);
	};
	const updateValue = ({
		key,
		value,
		role
	}) => {
		formInfo[role][key] = value
	}
</script>

<style lang="scss" scoped>
	.login-container {
		width: 100vw;
		height: 100vh;

		.header {
			padding: 0 20rpx;
		}

		.icon-box {
			padding: 80rpx 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 20rpx;

			image {
				box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.1);
				width: 180rpx;
				height: 180rpx;
				border-radius: 20rpx;
			}
		}

		.form {
			display: block;
			width: 85vw;
			margin: 0 auto;

			.inner-box {
				display: flex;
				flex-direction: column;
				gap: 40rpx;

				.btn-group {
					width: 100%;
					display: flex;
					justify-content: center;
					flex-direction: column;
					gap: 30rpx;

					.btn {
						width: 100%;
						background-color: #F7713C;
						color: #fff;
						border-radius: 300rpx;
						transition: all 0.3s;
						border: none;

						&:active {
							background-color: #F9965F;
						}
					}
				}
			}
		}
	}
</style>