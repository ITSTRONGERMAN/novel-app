<template>
	<view class="input">
		<input @input="handleInput" :value="modelValue" :type="inputTypeConfig[type].type" :placeholder="placeholder" />
		<view class="icon" v-if="modelValue.length!=0">
			<uv-icon @tap="inputTypeConfig[type].rightIconClick"
				:name="inputTypeConfig[type].rightIcon[inputTypeConfig[type].iconIndex]" color="#868684" size="14"
				bold></uv-icon>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		defineEmits,
		ref,
		reactive
	} from 'vue';

	// 接收父组件传递的 props，包括 modelValue
	const props = defineProps({
		prop: {
			type: String,
			default: '',
		},
		role: {
			type: String,
			default: '',
		},
		modelValue: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: 'text',
		},
		placeholder: {
			type: String,
			default: '',
		}
	});

	// 触发事件的 emit
	const emit = defineEmits(['updateValue']);

	// 配置不同类型的输入框操作
	const inputTypeConfig = reactive({
		text: {
			rightIcon: ['close'],
			iconIndex: 0,
			type: "text",
			rightIconClick() {
				emit('updateValue', {
					key: props.prop,
					value: '',
					role: props.role
				}); // 清空输入框
			}
		},
		password: {
			rightIcon: ['eye', 'eye-off-outline'],
			type: "password",
			iconIndex: 0,
			rightIconClick() {
				const iconIndex = inputTypeConfig.password.iconIndex
				inputTypeConfig.password.iconIndex = iconIndex == 1 ? 0 : 1
				inputTypeConfig.password.type = iconIndex == 1 ? 'password' : "text"
			}
		}
	});

	// 处理输入事件，更新父组件的 modelValue
	const handleInput = (event) => {
		emit('updateValue', {
			key: props.prop,
			value: event.detail.value,
			role: props.role
		});
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