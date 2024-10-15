<template>
	<scroll-view class="nx-reader-chapter-list" lower-threshold="300" :scroll-y="true" @scrolltolower="scrollBottom">
		<uv-list :border="false" :customStyle="themeStyle">
			<uv-list-item
				v-for="(chapter, index) in chapterRenderList"
				:key="index"
				:index="index"
				border
				clickable
				:customStyle="themeStyle"
				@click="chapterClick(index)"
			>
				<template #body>
					<uv-text
						:text="chapter.name"
						:lines="1"
						:color="index == chapterIndex ? themeStyle.activeColor : themeStyle.color"
					></uv-text>
				</template>
			</uv-list-item>
		</uv-list>
	</scroll-view>
</template>
<script>
export default {
	name: 'nx-reader-chapter-list',
	props: {
		chapterList: {
			type: Array,
			default: () => []
		},
		// 章节下标
		chapterIndex: {
			type: Number,
			default: -1
		},
		themeStyle: {
			type: Object,
			default: () => {
				return {};
			}
		}
	},
	data() {
		return {
			// 章节
			chapterRenderList: [],
			rendering: false,
			renderIndex: 0
		};
	},
	created() {},
	mounted() {
		this.renderIndex = 0;
		this.chapterRenderList = [];
		this.renderChapterList();
	},
	watch: {
		chapterList() {
			this.renderIndex = 0;
			this.chapterRenderList = [];
			this.renderChapterList();
		}
	},
	methods: {
		// setChapterList(chapterList, chapterIndex) {
		// 	this.renderChapterList();
		// },
		async renderChapterList() {
			this.rendering = true;
			const renderEndIndex = this.renderIndex + 100;
			this.chapterRenderList = this.chapterRenderList.concat(
				this.chapterList.slice(this.renderIndex, renderEndIndex)
			);
			this.renderIndex = renderEndIndex;
			this.rendering = false;
		},
		scrollBottom() {
			if (!this.rendering) {
				this.renderChapterList();
			}
		},
		chapterClick(index) {
			this.$emit('chapter-click', index);
		},
	}
};
</script>

<style lang="scss" scoped>
.nx-reader {
	&-chapter-list {
		height: 100%;
		box-sizing: border-box;
	}
}
</style>
