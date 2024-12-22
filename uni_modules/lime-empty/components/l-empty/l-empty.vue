<template>
	<view class="l-empty">
		<image class="l-empty__image" :style="[styles]" mode="widthFix" v-if="image" :src="imageUrl"></image>
		<text class="l-empty__description" v-if="description">{{description}}</text>
		<view class="l-empty__bottom">
			<slot></slot>
		</view>
	</view>
</template>
<script lang="ts">
	import { computed, defineComponent, type PropType} from "@/uni_modules/lime-shared/vue";
	import { addUnit} from "@/uni_modules/lime-shared/addUnit";
	import { type Numeric } from './types'
	export default defineComponent({
		name: 'l-empty',
		props: {
			description: String,
			imageSize: {
				type: [String, Number, Array] as PropType<Numeric | [Numeric, Numeric]>,
			},
			image: {
				type: String,
				default: 'default',
			},
		},
		setup(props) {
			
			const PRESETS = ['error', 'search', 'default', 'network','cart','404','message', 'coupon', 'comment', 'express', 'order','address']
			const imageUrl = computed(() : string => {
				if (PRESETS.includes(props.image)) {
					return '/uni_modules/lime-empty/static/' + props.image + '.png';
				}
				return props.image
			})
			
			const styles = computed(() => {
				const style:Record<string, any> = {}
				const imageSize = props.imageSize
				if(imageSize == null) {
					return style
				}
				if(Array.isArray(imageSize) && (imageSize as any[]).length > 0) {
					const width = addUnit(imageSize[0])
					const height = addUnit(imageSize[1])
					style['width'] = width
					style['height'] = addUnit(imageSize[1])
					
					return style
				}
				const width = addUnit(imageSize as Numeric)
				style['width'] = width
				return style
			})
			
			return {
				styles,
				imageUrl
			}
		}
	})
</script>
<style lang="scss">
	@import './index';
</style>