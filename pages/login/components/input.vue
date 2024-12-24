<template>
	<view class="input">
		<!-- input组件绑定v-model -->
		<input @input="handleInput" :value="modelValue" :type="type" :placeholder="placeholder" />
		<view class="icon">
			<!-- 根据当前类型配置右侧图标点击事件 -->
			<uv-icon @tap="inputTypeConfig[type].rightIconClick" :name="inputTypeConfig[type].rightIcon" color="#868684"
				size="14" bold></uv-icon>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		defineEmits,
		ref
	} from 'vue';

	// 接收父组件的 `v-model` 和其他 prop
	const props = defineProps({
		modelValue: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'text'
		},
		placeholder: {
			type: String,
			default: ''
		}
	});

	// 用于触发更新事件
	const emit = defineEmits();

	// 配置不同类型的输入框操作
	const inputTypeConfig = ref({
		text: {
			rightIcon: 'close',
			rightIconClick() {
				emit('update:modelValue', ''); // 清空输入框内容
			}
		},
		password: {
			rightIcon: 'eye-fill',
			rightIconClick() {
				// 这里可以添加密码显示/隐藏的逻辑
				console.log('Password icon clicked');
			}
		}
	});

	// 处理输入事件并更新父组件的 modelValue
	const handleInput = (event) => {
		emit('update:modelValue', event.target.value);
	};
</script>

<style lang="scss" scoped>
	.input {
		padding: 25rpx 40rpx;
		background-color: #F6F6F4;
		border-radius: 100rpx;
		display: flex;
		gap: 20rpx;
		align-items: center;

		input {
			flex: 1;
		}

		.icon {
			padding: 8rpx;
			border-radius: 50%;
			background-color: #E2E2E0;
		}
	}
</style>