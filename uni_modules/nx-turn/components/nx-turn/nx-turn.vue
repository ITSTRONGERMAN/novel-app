<template>
	<view class="nx-turn">
		<view
			class="nx-turn-page-wrapper turn"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
			@touchcancel="touchCancel"
		>
			<view
				class="nx-turn-page-content-wrapper"
				:style="[{
					width: `${pageContentWrapperWidth}px`,
					height: `${pageContentWrapperWidth}px`
				}, transformStyle.wrapper]"
			>
				<view
					class="nx-turn-page-content-box"
					:class="customClass"
					:style="[{
						width: `${pageWrapperInfo.width}px`,
						height: `${pageWrapperInfo.height}px`
					}, customStyle, transformStyle.content]"
				>
					<slot name="page-content" :page="page"></slot>
				</view>
			</view>
			<view
				class="nx-turn-page-content-wrapper nx-turn-page-content-wrapper-b"
				:style="[{
					width: `${pageContentWrapperWidth}px`,
					height: `${pageContentWrapperWidth}px`
				}, transformStyle.bwrapper]"
			>
				<view
					class="nx-turn-page-content-box nx-turn-page-content-b-box"
					:class="customClass"
					:style="[{
						width: `${pageWrapperInfo.width}px`,
						height: `${pageWrapperInfo.height}px`
					}, customStyle, transformStyle.bcontent]"
				>
					<view
						class="nx-turn-page-content-wrapper-b-shadow"
						:style="[{
							width: `${pageWrapperInfo.width}px`,
							height: `${pageWrapperInfo.height}px`
						}, transformStyle.bgradient]"
					></view>
					<view class="nx-turn-page-content-b"></view>
				</view>
			</view>
			<view
				:style="[{
					width: `${pageWrapperInfo.width}px`,
					height: `${pageWrapperInfo.height}px`
				}, transformStyle.gradient]"
			></view>
		</view>
		<view 
			class="nx-turn-page-wrapper next" 
			:class="customClass" 
			:style="customStyle"
		>
			<slot name="next-page-content" :page="page + 1"></slot>
		</view>
	</view>
</template>

<script>
	import {
		getPageDiagonalLength,
		point2D,
		touchStartEvent,
		touchMoveEvent,
		touchEndEvent,
		setPageNumber,
		setPageCount
	} from './js/nx-turn.js';
	export default {
		name:"nx-turn",
		props: {
			/**
			 * 初始页码，从0开始
			 */
			initPage: {
				type: Number,
				default: 0
			},
			/**
			 * 页数
			 */
			pageCount: {
				type: Number,
				default: -1
			},
			customClass: {
				type: String,
				default: 'nx-turn-theme'
			},
			customStyle: {
				type: Object,
				default: () => { return {} }
			}
		},
		data() {
			return {
				// 起始触摸点X坐标
				touchStartX: 0,
				// 起始触摸点Y坐标
				touchStartY: 0,
				// 书页内容包装外框宽度（等于书页对角线长度）
				pageContentWrapperWidth: 0,
				// 书页包装外框信息
				pageWrapperInfo: { width: 0, height: 0 },
				// 变换样式
				transformStyle: {},
				// 当前页码
				page: 0,
				mouseIsDown: false
			};
		},
		created() {
			this.setPage();
			setPageCount(this.pageCount);
		},
		mounted() {
			this.$nextTick(() => {
				this.init();
			});
		},
		watch: {
			initPage() {
				this.setPage();
			},
			pageCount(newValue) {
				setPageCount(newValue);
			}
		},
		methods: {
			init() {
				const query = uni.createSelectorQuery().in(this);
				query
					.select('.nx-turn-page-wrapper.turn')
					.boundingClientRect(async (data) => {
						this.pageWrapperInfo = data;
						this.pageContentWrapperWidth = getPageDiagonalLength(data);
						this.$emit('init-completed', this.pageWrapperInfo);
					})
					.exec();
			},
			setPage() {
				this.page = this.initPage;
				setPageNumber(this.page);
			},
			touchStart(e) {
				this.touchStartX = e.touches[0].clientX;
				this.touchStartY = e.touches[0].clientY;
				touchStartEvent(this.pageWrapperInfo, point2D(this.touchStartX, this.touchStartY));
			},
			mouseDown(e) {
				this.mouseIsDown = true;
				this.touchStart(e);
			},
			touchMove(e) {
				// this.closeMenu();
				const point = e.touches[0];
				const { style, pageNumber } = touchMoveEvent(point2D(point.clientX, point.clientY));
				this.transformStyle = style;
				this.page = pageNumber;
				this.$emit('turning');
			},
			mouseMove(e) {
				if(this.mouseIsDown) {
					this.touchMove(e);
				}
			},
			touchEnd(e) {
				e.preventDefault();
				const point = e.changedTouches[0];
				this.handleTouchEnd(point2D(point.clientX, point.clientY));
			},
			mouseUp(e) {
				this.mouseIsDown = false;
				this.touchEnd(e);
			},
			touchCancel(e) {
				this.handleTouchEnd(point2D(this.touchStartX, this.touchStartY));
			},
			handleTouchEnd(point) {
				touchEndEvent(
					point,
					({ style, pageNumber }) => {
						// this.closeMenu();
						this.transformStyle = style;
						this.page = pageNumber;
						this.$emit('turning');
					},
					({ style, pageNumber, isFirst, isLast }) => {
						this.transformStyle = style;
						this.page = pageNumber;
						this.$emit('turned', { pageNumber, isFirst, isLast });
					},
					() => {
						this.$emit('click-center');
					}
				);
			},
		}
	}
</script>

<style lang="scss">
	.nx-turn {
		width: 100%;
		height: 100%;
		&-page {
			&-wrapper {
				position: absolute;
				overflow: hidden;
				height: 100%;
				width: 100%;
				perspective: 1000px;
				&.turn {
					z-index: 20;
				}
				&.next {
					z-index: 10;
				}
			}
			&-content {
				height: 100%;
				&-wrapper {
					position: absolute;
					top: 0px;
					left: 0px;
					overflow: hidden;
					z-index: auto;
					transform-origin: 0% 100%;
					&-b {
						transform: translate(-100%, 0);
						&-shadow {
							position: absolute;
							top: 0px;
							left: 0px;
							overflow: hidden;
							z-index: 1;
						}
					}
				}
				&-box {
					position: absolute;
				}
			}
		}
		&-theme {
			background-color: #EBD6B1;
			color: mix(#000000, #EBD6B1, 70%);
			border-color: mix(#FFFFFF, #EBD6B1, 70%);
		}
	}
</style>