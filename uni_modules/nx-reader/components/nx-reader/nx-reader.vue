<template>
	<view class="nx-reader">
		<view
			id="nx-font-size-calculate-title" 
			class="nx-font-size-calculate"
			:style="{
				fontSize: `${fontSize + 2}px`,
			}"
		>楠</view>
		<view 
			id="nx-font-size-calculate-text"
			class="nx-font-size-calculate"
			:style="{
				fontSize: `${fontSize}px`,
			}"
		>昕</view>
		<view class="nx-reader-container">
			<nx-turn
				:initPage="page"
				:pageCount="pageContent.length"
				:custom-style="pageThemeStyles[theme]"
				@init-completed="init"
				@turning="handleTurning"
				@turned="handleTurned"
				@click-center="handleClickCenter"
			>
				<template v-slot:page-content="{ page }">
					<view
						class="nx-reader-page-content-spacing"
						:style="{
							padding: `${pageSpacing}px`
						}"
					>
						<view
							class="nx-reader-page-content"
							:style="{
								fontSize: `${fontSize}px`,
								lineHeight: `${fontSize * lineHeight}px`
							}"
						>
							<!-- <rich-text :nodes="pageContent[page] ? pageContent[page].content : []"></rich-text> -->
							<!-- <uv-parse :content="pageContent[page] ? pageContent[page].htmlContent : ''"></uv-parse> -->
							<nx-reader-rich-text :nodes="pageContent[page] ? pageContent[page].content : []"></nx-reader-rich-text>
						</view>
					</view>
				</template>
				<template v-slot:next-page-content="{ page }">
					<view
						class="nx-reader-page-content-spacing"
						:style="{
							padding: `${pageSpacing}px`
						}"
					>
						<view
							class="nx-reader-page-content"
							:style="{
								fontSize: `${fontSize}px`,
								lineHeight: `${fontSize * lineHeight}px`
							}"
						>
							<!-- <rich-text :nodes="pageContent[page + 1] ? pageContent[page + 1].content : []"></rich-text> -->
							<!-- <uv-parse :content="pageContent[page + 1] ? pageContent[page + 1].htmlContent : ''"></uv-parse> -->
							<nx-reader-rich-text :nodes="pageContent[page] ? pageContent[page].content : []"></nx-reader-rich-text>
						</view>
					</view>
				</template>
			</nx-turn>
		</view>
		<uv-popup 
			ref="bottom-popup" 
			mode="bottom" 
			z-index="200" 
			:overlay="false" 
			:custom-style="popupThemeStyles[theme]"
		>
			<view class="nx-reader-popup-content">
				<uni-row class="nx-reader-popup-content-row">
					<uni-col class="nx-reader-popup-content-col" :span="8" v-for="(menu, index) in menuList" :key="index">
						<view class="nx-reader-popup-content-col-item" @click="menuClick(index, menu)">
							<uni-icons 
								:type="menu.fontFamily ? '' : menu.icon" 
								size="30" 
								:font-family="menu.fontFamily"
								:color="index == activeMenu ? popupThemeStyles[theme].activeColor : popupThemeStyles[theme].color"
							>{{ menu.fontFamily ? menu.unicode : "" }}</uni-icons>
							<text :style="{
								color: index == activeMenu ? popupThemeStyles[theme].activeColor : popupThemeStyles[theme].color
							}">{{ menu.name }}</text>
						</view>
					</uni-col>
				</uni-row>
			</view>
		</uv-popup>
		<uv-popup 
			ref="chapter-list-popup" 
			mode="bottom" 
			z-index="150" 
			round="15" 
			@maskClick="showChapter = false; activeMenu = -1"
			:custom-style="popupThemeStyles[theme]"
		>
			<view
				class="nx-reader-popup-menu-content nx-reader-chapter-list-popup" 
				:style="{
					height: `${pageRect.height * 0.9}px`
				}"
			>
				<nx-reader-chapter-list
					:chapter-list="chapterList"
					:chapter-index="chapterIndex"
					:theme-style="popupThemeStyles[theme]"
					@chapter-click="chapterClick"
				></nx-reader-chapter-list>
			</view>
		</uv-popup>
		<uv-toast ref="chapter-toast"></uv-toast>
		<uv-popup 
			ref="tune-popup" 
			mode="bottom" 
			z-index="150" 
			round="15" 
			@maskClick="showTune = false; activeMenu = -1"
			:custom-style="popupThemeStyles[theme]"
		>
			<view
				class="nx-reader-popup-menu-content" 
			>
				<view 
					class="nx-reader-tune-popup-content uv-border-bottom" 
				>
					<view 
						class="nx-reader-tune-popup-content-button" 
						:style="{
							color: chapterIndex == 0 ? popupThemeStyles[theme].colorLight : popupThemeStyles[theme].color
						}"
						@click="previousChapter"
					>上一章</view>
					<view class="nx-reader-tune-popup-content-slider">
						<slider 
							:value="chapterIndex" 
							:min="0" 
							:max="chapterList.length - 1"
							@changing="chapterChanging"
							@change="chapterChange"
						></slider>
					</view>
					<view 
						class="nx-reader-tune-popup-content-button" 
						:style="{
							color: chapterIndex == chapterList.length - 1 ? popupThemeStyles[theme].colorLight : popupThemeStyles[theme].color
						}"
						@click="nextChapter"
					>下一章</view>
				</view>
			</view>
		</uv-popup>
		<uv-popup 
			ref="settings-popup" 
			mode="bottom" 
			z-index="150" 
			round="15" 
			@maskClick="showSettings = false; activeMenu = -1"
			:custom-style="popupThemeStyles[theme]"
		>
			<view
				class="nx-reader-popup-menu-content" 
			>
				<view class="nx-reader-settings-popup-content uv-border-bottom" >
					<view class="nx-reader-settings-popup-content-item">
						<text>字号</text>
						<view class="nx-reader-settings-font-size">
							<uv-button 
								shape="circle" 
								text="A-"
								:customStyle="{
									width: '80px'
								}"
								:customTextStyle="{
									color: popupThemeStyles[theme].color
								}"
								:color="popupThemeStyles[theme].backgroundColorDark"
								:disabled="fontSize == 12"
								@click="decreaseFontSize"
							></uv-button>
							<view class="nx-reader-settings-font-size-info">{{ fontSize }}</view>
							<uv-button 
								shape="circle" 
								text="A+"
								:customStyle="{
									width: '80px'
								}"
								:customTextStyle="{
									color: popupThemeStyles[theme].color
								}"
								:color="popupThemeStyles[theme].backgroundColorDark"
								:disabled="fontSize == 40"
								@click="increaseFontSize"
							></uv-button>
						</view>
					</view>
					<view class="nx-reader-settings-popup-content-item">
						<text>行间距</text>
						<view class="nx-reader-settings-line-height">
							<view 
								class="nx-reader-settings-line-height-item"
								v-for="(item, index) in lineHeightOptions"
								:key="index"
							>
								<uv-tags
									size="large"
									shape="circle" 
									:text="`${item}倍`" 
									:plain="lineHeight != item" 
									:name="item" 
									:bgColor="item == lineHeight ? popupThemeStyles[theme].activeBackgroundColor : ''"
									:borderColor="item == lineHeight ? popupThemeStyles[theme].activeColor : popupThemeStyles[theme].colorLight"
									:color="item == lineHeight ? popupThemeStyles[theme].activeColor : popupThemeStyles[theme].colorLight"
									@click="lineHeightChange(item)">
								</uv-tags>
							</view>
						</view>
					</view>
					<view class="nx-reader-settings-popup-content-item">
						<view class="nx-reader-settings-theme">
							<view
								v-for="(item, index) in themeOptions"
								:key="index"
								:class="item == theme ? 'active' : ''"
								class="nx-reader-settings-theme-item"
								:style="[pageThemeStyles[item], {
									borderColor: item == theme ? popupThemeStyles[theme].activeColor : pageThemeStyles[item].borderColor
								}]"
								@click="themeChange(item)"
							></view>
						</view>
					</view>
				</view>
			</view>
		</uv-popup>
	</view>
</template>

<script>
import nxReaderRichText from './components/nx-reader-rich-text'
import nxReaderChapterList from './components/nx-reader-chapter-list.vue'
import parseHtml from './js/html-parser.js';
import { mixColor } from './js/color.js';
import uvUI from '@/uni_modules/uv-ui-tools'
import background0 from './static/book-background/background0.jpg'
export default {
	name: 'nx-reader',
	components: {
	  nxReaderRichText,
	  nxReaderChapterList
	},
	props: {
		getChapterContentApi: {
			type: Function
		},
		toolbarMenu: {
			type: Array,
			default: () => [
				{
					name: '目录',
					icon: 'list'
				},
				{
					name: '进度',
					icon: 'tune'
				},
				{
					name: '设置',
					icon: 'settings'
				}
			]
		}
	},
	data() {
		return {
			pageRect: {},
			// 书页边距
			pageSpacing: 20,
			// 初始页码
			initPage: 0,
			// 当前页码
			page: 0,
			// 分页数据
			pageContent: [],
			// 章节
			chapterList: [],
			chapterRenderList: [],
			rendering: false,
			renderIndex: 0,
			// 章节下标
			chapterIndex: -1,
			// 字大小
			fontSize: uni.getStorageSync("NX_READER_FONT_SIZE") || 16,
			// 单行字数
			lineWordCount: 0,
			// 章节标题单行字数
			titleLineWordCount: 0,
			// 行高
			lineHeight: uni.getStorageSync("NX_READER_LINE_HEIGHT") || 1.5,
			// 单页行数
			pageLine: 0,
			loadNext: false,
			loadPrevious: false,
			menuList: [
				{
					name: '目录',
					icon: 'list',
					active: false
				},
				{
					name: '进度',
					icon: 'tune',
					active: false
				},
				{
					name: '设置',
					icon: 'settings',
					active: false
				}
			],
			showMenu: false,
			activeMenu: -1,
			showChapter: false,
			showTune: false,
			showSettings: false,
			lineHeightOptions: [1.5, 2, 2.5],
			theme: uni.getStorageSync("NX_READER_THEME") || 'paper',
			themeOptions: ['paper', 'white', 'almond', 'brown', 'carmine', 'green', 'blue', 'purple', 'grey'],
			pageThemeStyles: {
				paper: {
					backgroundImage: "url(" + background0 + ")",
					backgroundSize: '100% 100%',
					backgroundColor: '#EBD6B1',
					color: mixColor('#000000', '#EBD6B1', 0.7),
					borderColor: mixColor('#FFFFFF', '#EBD6B1', 0.7),
				},
				white: {
					backgroundColor: '#FAFAFA',
					color: '#303133',
					borderColor: mixColor('#FFFFFF', '#FAFAFA', 0.7),
				},
				almond: {
					backgroundColor: '#FAF9DE',
					color: mixColor('#000000', '#FAF9DE', 0.5),
					borderColor: mixColor('#FFFFFF', '#FAF9DE', 0.7),
				},
				brown: {
					backgroundColor: '#FFF2E2',
					color: mixColor('#000000', '#FFF2E2', 0.5),
					borderColor: mixColor('#FFFFFF', '#FFF2E2', 0.7),
				},
				carmine: {
					backgroundColor: '#FDE6E0',
					color: mixColor('#000000', '#FDE6E0', 0.5),
					borderColor: mixColor('#FFFFFF', '#FDE6E0', 0.7),
				},
				green: {
					backgroundColor: '#E3EDCD',
					color: mixColor('#000000', '#E3EDCD', 0.5),
					borderColor: mixColor('#FFFFFF', '#E3EDCD', 0.7),
				},
				blue: {
					backgroundColor: '#DCE2F1',
					color: mixColor('#000000', '#DCE2F1', 0.5),
					borderColor: mixColor('#FFFFFF', '#DCE2F1', 0.7),
				},
				purple: {
					backgroundColor: '#E9EBFE',
					color: mixColor('#000000', '#E9EBFE', 0.5),
					borderColor: mixColor('#FFFFFF', '#E9EBFE', 0.7),
				},
				grey: {
					backgroundColor: '#EAEAEF',
					color: mixColor('#000000', '#EAEAEF', 0.5),
					borderColor: mixColor('#FFFFFF', '#EAEAEF', 0.7),
				},
			},
			popupThemeStyles: {
				paper: {
					backgroundColor: mixColor('#FFFFFF', '#EBD6B1', 0.3),
					color: mixColor('#000000', '#EBD6B1', 0.7),
					backgroundColorDark: mixColor('#000000', '#EBD6B1', 0.01),
					colorLight: mixColor('#000000', '#EBD6B1', 0.1),
					activeColor: mixColor('#996600', '#EBD6B1', 0.8),
					activeBackgroundColor: mixColor('#000000', '#EBD6B1', 0.01),
				},
				white: {
					backgroundColor: mixColor('#FFFFFF', '#FAFAFA', 0.3),
					color: '#3A3A3A',
					backgroundColorDark: mixColor('#000000', '#FAFAFA', 0.05),
					colorLight: mixColor('#000000', '#FAFAFA', 0.1),
					activeColor: '#2979ff',
					activeBackgroundColor: mixColor('#FFFFFF', '#2979ff', 0.9),
				},
				almond: {
					backgroundColor: mixColor('#FFFFFF', '#FAF9DE', 0.3),
					color: mixColor('#000000', '#FAF9DE', 0.5),
					backgroundColorDark: mixColor('#000000', '#FAF9DE', 0.03),
					colorLight: mixColor('#000000', '#FAF9DE', 0.1),
					activeColor: mixColor('#999900', '#FAF9DE', 0.8),
					activeBackgroundColor: mixColor('#000000', '#FAF9DE', 0.03),
				},
				brown: {
					backgroundColor: mixColor('#FFFFFF', '#FFF2E2', 0.3),
					color: mixColor('#000000', '#FFF2E2', 0.5),
					backgroundColorDark: mixColor('#000000', '#FFF2E2', 0.03),
					colorLight: mixColor('#000000', '#FFF2E2', 0.1),
					activeColor: mixColor('#332211', '#FFF2E2', 0.5),
					activeBackgroundColor: mixColor('#332211', '#FFF2E2', 0.03),
				},
				carmine: {
					backgroundColor: mixColor('#FFFFFF', '#FDE6E0', 0.3),
					color: mixColor('#000000', '#FDE6E0', 0.5),
					backgroundColorDark: mixColor('#000000', '#FDE6E0', 0.01),
					colorLight: mixColor('#000000', '#FDE6E0', 0.1),
					activeColor: mixColor('#442211', '#FDE6E0', 0.5),
					activeBackgroundColor: mixColor('#000000', '#FDE6E0', 0.01),
				},
				green: {
					backgroundColor: mixColor('#FFFFFF', '#E3EDCD', 0.3),
					color: mixColor('#000000', '#E3EDCD', 0.5),
					backgroundColorDark: mixColor('#000000', '#E3EDCD', 0.01),
					colorLight: mixColor('#000000', '#E3EDCD', 0.1),
					activeColor: mixColor('#334411', '#E3EDCD', 0.5),
					activeBackgroundColor: mixColor('#000000', '#E3EDCD', 0.01),
				},
				blue: {
					backgroundColor: mixColor('#FFFFFF', '#DCE2F1', 0.3),
					color: mixColor('#000000', '#DCE2F1', 0.5),
					backgroundColorDark: mixColor('#000000', '#DCE2F1', 0.01),
					colorLight: mixColor('#000000', '#DCE2F1', 0.1),
					activeColor: mixColor('#112266', '#DCE2F1', 0.5),
					activeBackgroundColor: mixColor('#000000', '#DCE2F1', 0.01),
				},
				purple: {
					backgroundColor: mixColor('#FFFFFF', '#E9EBFE', 0.3),
					color: mixColor('#000000', '#E9EBFE', 0.5),
					backgroundColorDark: mixColor('#000000', '#E9EBFE', 0.01),
					colorLight: mixColor('#000000', '#E9EBFE', 0.1),
					activeColor: mixColor('#112266', '#E9EBFE', 0.5),
					activeBackgroundColor: mixColor('#000000', '#E9EBFE', 0.01),
				},
				grey: {
					backgroundColor: mixColor('#FFFFFF', '#EAEAEF', 0.3),
					color: mixColor('#000000', '#EAEAEF', 0.5),
					backgroundColorDark: mixColor('#000000', '#EAEAEF', 0.03),
					colorLight: mixColor('#000000', '#EAEAEF', 0.1),
					activeColor: mixColor('#000011', '#E9EBFE', 0.5),
					activeBackgroundColor: mixColor('#000000', '#EAEAEF', 0.03),
				},
			}
		};
	},
	methods: {
		async init(pageWrapperInfo) {
			this.menuList = this.menuList.map((item, index) => {
				if(this.toolbarMenu[index]) {
					return {
						...this.toolbarMenu[index],
						active: false
					}
				}
				return item;
			})
			this.pageRect = {
				width: pageWrapperInfo.width - this.pageSpacing * 2,
				height: pageWrapperInfo.height - this.pageSpacing * 2
			};
			await this.initPageRect();
			this.$emit('init-completed', {
				setChapterList: this.setChapterList
			});
		},
		initPageRect() {
			return new Promise((resolve, reject) => {
				// 每行字数
				// this.lineWordCount = parseInt(this.pageRect.width / this.fontSize);
				const query = uni.createSelectorQuery().in(this);
				query
					.select('#nx-font-size-calculate-title')
					.boundingClientRect((data) => {
						// 章节标题每行字数
						this.titleLineWordCount = parseInt(this.pageRect.width / data.width);
					})
					.select('#nx-font-size-calculate-text')
					.boundingClientRect((data) => {
						// 每行字数
						this.lineWordCount = parseInt(this.pageRect.width / data.width);
					})
					.exec((datas) => {
						// 章节标题每行字数
						// this.titleLineWordCount = parseInt(this.pageRect.width / (this.fontSize + 2));
						// 每页行数
						this.pageLine = parseInt(this.pageRect.height / (this.fontSize * this.lineHeight));
						resolve(datas);
					});
			})
			
		},
		setChapterList(chapterList, chapterIndex, pIndex) {
			this.chapterList = chapterList;
			this.chapterIndex = chapterIndex ? (chapterIndex < 0 ? 0 : chapterIndex) : 0;
			this.initPageContent(pIndex);
			// this.renderChapterList();
		},
		async renderChapterList() {
			this.rendering = true;
			const renderEndIndex = this.renderIndex + 100;
			this.chapterRenderList = this.chapterRenderList.concat(this.chapterList.slice(this.renderIndex, renderEndIndex));
			this.renderIndex = renderEndIndex;
			this.rendering = false;
		},
		scrollBottom() {
			if (!this.rendering) {
				this.renderChapterList();
			}
		},
		async initPageContent(pIndex) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			this.pageContent = [];
			await this.getPageContent(this.chapterIndex, true, pIndex);
			uni.hideLoading();
		},
		async getChapterContent(chapterInfo) {
			let content = chapterInfo.content || '';
			if (!content) {
				if (this.getChapterContentApi) {
					content = await this.getChapterContentApi(chapterInfo);
				}
				chapterInfo.content = content;
			}
			const paragraphContents = parseHtml(content);
			const paragraphs = [];
			paragraphContents.forEach((p) => {
				let wordCount = 0;
				if (p.type == 'text') {
					// p.text = p.text.replaceAll(' ', '');
					p.text = '　　' + uni.$uv.trim(p.text);
					wordCount = p.text.length;
				} else {
				}
				paragraphs.push({
					wordCount: wordCount,
					content: p
				});
			});
			chapterInfo.contentNode = paragraphs;
		},
		async getPageContent(chapterIndex, next = true, pIndex = 0) {
			next ? (this.loadNext = true) : (this.loadPrevious = true);
			if (this.chapterList && this.chapterList.length && chapterIndex >= 0) {
				const chapterInfo = this.chapterList[chapterIndex];
				if (chapterInfo) {
					if (!chapterInfo.contentNode) {
						await this.getChapterContent(chapterInfo);
					} else {
						// 解决小程序不渲染，无意义
						await chapterInfo.contentNode;
					}
					const titleFontSize = this.fontSize + 2;
					const pageArr = [
						{
							chapterIndex: chapterIndex,
							topPIndexForChapter: 0,
							content: [
								{
									name: 'div',
									attrs: {
										style: `font-size: ${titleFontSize}px; font-weight: bold;`
									},
									children: [
										{
											type: 'text',
											text: chapterInfo.name
										},
										{
											name: 'br'
										},
										{
											name: 'br'
										}
									]
								}
							],
							htmlContent: `<div style="font-size: ${titleFontSize}px; font-weight: bold;">
								${chapterInfo.name}
								<br />
								<br />
							</div>`
						}
					];
					// 计算标题所占高度
					const titleHeight =
						(Math.ceil(chapterInfo.name.length / this.titleLineWordCount) + 1) *
						titleFontSize *
						this.lineHeight;
					// 章节首页页行数
					const indexPageLine = parseInt(
						(this.pageRect.height - titleHeight) / (this.fontSize * this.lineHeight)
					);
					const content = chapterInfo.contentNode;
					// 解析计算章节内容
					for (let i = 0, l = 0, page = 0; i < content.length; i++) {
						let paragraphLine = 0;
						if (content[i].wordCount == 0) {
							if (content[i].content.name == 'br' && content[i - 1].content.name == 'br') {
								// 如果是连续<br />，需要占一行
								paragraphLine = 1;
							}
						} else {
							// 计算段落所占行数
							paragraphLine = Math.ceil(content[i].wordCount / this.lineWordCount);
						}
						// 页面剩余行数
						let surplusLine = (page == 0 ? indexPageLine : this.pageLine) - l;
						if (paragraphLine > surplusLine) {
							// 如果当前行数 > 页面剩余行数
							if (content[i].content.type == 'text') {
								// 如果是文本段落
								if (surplusLine > 0) {
									// 如果页面剩余行数 > 0
									// 将剩余行数补齐
									pageArr[page].content.push({
										...content[i].content,
										text: content[i].content.text.substring(0, surplusLine * this.lineWordCount)
									});
									pageArr[page].htmlContent += content[i].content.text.substring(0, surplusLine * this.lineWordCount);
								}
								// 页码 + 1，对下一页进行计算
								page++;
								// 将剩余文字存入下一页
								pageArr[page] = {
									chapterIndex: chapterIndex,
									topPIndexForChapter: i,
									content: [
										{
											...content[i].content,
											text: content[i].content.text.substring(surplusLine * this.lineWordCount)
										}
									],
									htmlContent: content[i].content.text.substring(surplusLine * this.lineWordCount)
								};
								// 重新计算页面已占用行数
								l = paragraphLine - surplusLine;
								/**
								 * 找到指定段落所在页
								 * 当页面剩余行数 > 0：指定段落index > 当前段落index，将页码+1
								 * 反之：指定段落index >= 当前段落index，将页码+1
								 */
								if(surplusLine > 0 ? pIndex > i : pIndex >= i) {
									this.page++;
								}
							} else {
								pageArr[page].htmlContent += `<${content[i].content.name} />`;
							}
						} else {
							pageArr[page].content.push(content[i].content);
							if (content[i].content.type == 'text') {
								pageArr[page].htmlContent += content[i].content.text;
							} else {
								pageArr[page].htmlContent += `<${content[i].content.name} />`;
							}
							l += paragraphLine;
						}
					}
					if (next) {
						this.pageContent = this.pageContent.concat(pageArr);
					} else {
						this.pageContent = pageArr.concat(this.pageContent);
						this.page += pageArr.length;
					}
					if (this.pageContent.length == 1) {
						if (chapterIndex > 0) {
							await this.getPageContent(chapterIndex - 1, false);
						}
						await this.getPageContent(chapterIndex + 1);
					} else if(this.page == 0) {
						await this.getPageContent(chapterIndex - 1);
					} else if(this.page >= this.pageContent.length - 1) {
						await this.getPageContent(chapterIndex + 1);
					}
					this.page = Math.min(this.page, this.pageContent.length - 1);
				}
			}
			next ? (this.loadNext = false) : (this.loadPrevious = false);
			uni.hideLoading();
		},
		handleTurning() {
			this.closeMenu();
		},
		handleTurned({ pageNumber, isFirst, isLast }) {
			this.chapterIndex = this.pageContent[pageNumber].chapterIndex;
			this.page = pageNumber;
			if (pageNumber == this.pageContent.length - 1 && !this.loadNext) {
				this.getPageContent(this.pageContent[pageNumber].chapterIndex + 1);
			}
			if (pageNumber == 0 && !this.loadPrevious) {
				this.getPageContent(this.pageContent[pageNumber].chapterIndex - 1, false);
			}
			if (isFirst) {
				if (this.loadPrevious) {
					uni.showLoading({
						title: '加载中...',
						mask: true
					});
				} else {
					uni.showToast({
						title: '已经是第一页了',
						icon: 'none'
					});
				}
			}
			if (isLast) {
				if (this.loadNext) {
					uni.showLoading({
						title: '加载中...',
						mask: true
					});
				} else {
					uni.showToast({
						title: '已经是最后一页了',
						icon: 'none'
					});
				}
			}
			this.emitPageChange();
		},
		emitPageChange() {
			this.$emit('page-change', {
				chapterIndex: this.chapterIndex,
				topPIndexForChapter: this.pageContent[this.page].topPIndexForChapter
			});
		},
		handleClickCenter() {
			this.showMenu ? this.$refs['bottom-popup'].close() : this.$refs['bottom-popup'].open();
			this.showMenu = !this.showMenu;
			this.activeMenu = -1;
		},
		closeMenu() {
			this.$refs['bottom-popup'].close();
			this.showMenu = false;
			this.activeMenu = -1;
		},
		menuClick(index, menu) {
			if (index == 0) {
				this.chapterListClick(index);
			} else if(index == 1) {
				this.tuneClick(index);
			} else if(index == 2) {
				this.settingsClick(index);
			}
		},
		chapterListClick(index) {
			if(this.showChapter) {
				this.closeChapterList();
			} else {
				this.closeTuneList();
				this.closeSettingsList();
				this.$refs['chapter-list-popup'].open();
				this.showChapter = true;
			}
			this.activeMenu = this.showChapter ? index : -1;
		},
		tuneClick(index) {
			if(this.showTune) {
				this.closeTuneList();
			} else {
				this.closeChapterList();
				this.closeSettingsList();
				this.$refs['tune-popup'].open();
				this.showTune = true;
			}
			this.activeMenu = this.showTune ? index : -1;
		},
		settingsClick(index) {
			if(this.showSettings) {
				this.closeSettingsList();
			} else {
				this.closeChapterList();
				this.closeTuneList();
				this.$refs['settings-popup'].open();
				this.showSettings = true;
			}
			this.activeMenu = this.showSettings ? index : -1;
		},
		closeChapterList() {
			this.$refs['chapter-list-popup'].close();
			this.showChapter = false;
		},
		closeTuneList() {
			this.$refs['tune-popup'].close();
			this.showTune = false;
		},
		closeSettingsList() {
			this.$refs['settings-popup'].close();
			this.showSettings = false;
		},
		async resetPageContent() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			await this.initPageRect();
			this.pageContent = [];
			await this.getPageContent(this.chapterIndex);
			uni.hideLoading();
		},
		toChapter() {
			this.resetPageContent();
			this.page = 0;
			this.emitPageChange();
		},
		previousChapter() {
			if(this.chapterIndex == 0) {
				return;
			}
			this.chapterIndex--;
			this.showChapterToast();
			this.toChapter();
		},
		chapterClick(index) {
			this.chapterIndex = index;
			this.toChapter();
			this.closeChapterList();
			this.closeMenu();
		},
		nextChapter() {
			if(this.chapterIndex == this.chapterList.length - 1) {
				return;
			}
			this.chapterIndex++;
			this.showChapterToast();
			this.toChapter();
		},
		chapterChanging(e) {
			this.chapterIndex = e.detail.value;
			this.showChapterToast();
		},
		chapterChange(e) {
			if(this.chapterIndex != e.detail.value) {
				this.chapterIndex = e.detail.value;
			}
			this.toChapter();
		},
		showChapterToast() {
			this.$refs['chapter-toast'].show({
				type: 'default',
				message: this.chapterList[this.chapterIndex].name,
				overlay: false,
			})
			
		},
		decreaseFontSize() {
			if(this.fontSize == 12) {
				return;
			}
			this.fontSize -= 2;
			uni.setStorageSync("NX_READER_FONT_SIZE", this.fontSize);
			this.resetPageContent();
		},
		increaseFontSize() {
			if(this.fontSize == 40) {
				return;
			}
			this.fontSize += 2;
			uni.setStorageSync("NX_READER_FONT_SIZE", this.fontSize);
			this.resetPageContent();
		},
		lineHeightChange(lineHeight) {
			this.lineHeight = lineHeight;
			uni.setStorageSync("NX_READER_LINE_HEIGHT", this.lineHeight);
			this.resetPageContent();
		},
		themeChange(theme) {
			this.theme = theme;
			uni.setStorageSync("NX_READER_THEME", theme);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/uni_modules/uni-scss/theme.scss';
.nx-font-size-calculate {
	position: fixed;
	top: -1000px;
}
.nx-reader {
	width: 100%;
	height: 100%;
	&-container {
		width: 100%;
		height: 100%;
		position: relative;
	}
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
				&-b {
					// box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 20px;
				}
			}
			&-spacing {
				padding: 15px;
				box-sizing: border-box;
				height: 100%;
			}
		}
	}
	&-popup {
		&-content {
			&-row {
			}
			&-col {
				&-item {
					height: 70px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-size: 12px;
					cursor: pointer;
				}
			}
		}
		&-menu-content {
			padding-bottom: 70px;
			overflow: hidden;
			box-sizing: border-box;
			border-radius: 15px 15px 0 0;
		}
	}
	&-chapter-list-popup {
		&-content {
			height: 100%;
			// overflow: auto;
			box-sizing: border-box;
		}
	}
	&-tune-popup-content {
		display: flex;
		height: 70px;
		align-items: center;
		padding: 0 10px;
		&-slider {
			flex: 1;
			padding: 0 10px;
		}
		&-button {
			flex: none;
			&.disabled {
				color: #C4C6C9;
			}
		}
	}
	&-settings {
		&-popup-content {
			&-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 5px 10px;
				height: 50px;
			}
		}
		&-font-size {
			display: flex;
			align-items: center;
			&-info {
				padding: 0 10px;
			}
		}
		&-line-height {
			display: flex;
			align-items: center;
			&-item {
				padding: 0 5px;
			}
		}
		&-theme {
			display: flex;
			align-items: center;
			&-item {
				margin: 0 5px;
				height: 30px;
				width: 30px;
				border-radius: 50%;
				box-sizing: border-box;
				border-width: 1px;
				border-style: solid;
				&.active {
					border-width: 2px;
				}
			}
		}
	}
	/* #ifdef VUE3 */
	::v-deep 
	/* #endif */
	/* #ifdef VUE2 */
	/deep/ 
	/* #endif */
	&-theme {
		&-paper {
			background: url('@/uni_modules/nx-reader/components/nx-reader/static/book-background/background0.jpg');
			background-size: 100% 100%;
			color: mix(#000000, #EBD6B1, 70%);
			border-color: mix(#FFFFFF, #EBD6B1, 70%);
		}
		&-white {
			background-color: #FAFAFA;
			color: #303133;
			border-color: mix(#FFFFFF, #FAFAFA, 70%);
			// border-color: $uni-primary;
		}
		&-almond {
			background-color: #FAF9DE;
			color: mix(#000000, #FAF9DE, 50%);
			border-color: mix(#FFFFFF, #FAF9DE, 70%);
		}
		&-brown {
			background-color: #FFF2E2;
			color: mix(#000000, #FFF2E2, 50%);
			border-color: mix(#FFFFFF, #FFF2E2, 70%);
		}
		&-carmine {
			background-color: #FDE6E0;
			color: mix(#000000, #FDE6E0, 50%);
			border-color: mix(#FFFFFF, #FDE6E0, 70%);
		}
		&-green {
			background-color: #E3EDCD;
			color: mix(#000000, #E3EDCD, 50%);
			border-color: mix(#FFFFFF, #E3EDCD, 70%);
		}
		&-blue {
			background-color: #DCE2F1;
			color: mix(#000000, #DCE2F1, 50%);
			border-color: mix(#FFFFFF, #DCE2F1, 70%);
		}
		&-purple {
			background-color: #E9EBFE;
			color: mix(#000000, #E9EBFE, 50%);
			border-color: mix(#FFFFFF, #E9EBFE, 70%);
		}
		&-grey {
			background-color: #EAEAEF;
			color: mix(#000000, #EAEAEF, 50%);
			border-color: mix(#FFFFFF, #EAEAEF, 70%);
		}
	}
}
</style>