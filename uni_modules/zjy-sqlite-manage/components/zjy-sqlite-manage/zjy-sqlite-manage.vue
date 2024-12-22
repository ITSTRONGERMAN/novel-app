<template>
	<view>
		<view class="container" style="padding: 10px;">
			<button type="primary" @click="initDb" class="but-top">初始化数据库</button>
			<button type="primary" @click="getTabAll" class="but-top">刷新表列表</button>
		</view>
		<uni-section title="所有表" type="line">
			<uni-list>
				<uni-list-item v-for="tab in tables" clickable :show-extra-icon="true" showArrow :extra-icon="extraIcon"
					:title="tab.tbl_name" @click="getDataList(tab)">
					<template v-slot:footer>
						<uni-icons type="trash-filled" size="30" color="red" @click="delTab(tab.tbl_name)"></uni-icons>
					</template>
				</uni-list-item>
			</uni-list>
		</uni-section>
		<uni-drawer ref="showLeft" mode="left" :width="420" @change="change($event,'showLeft')">
			<view class="infoBtns">
				<button type="primary" @click="addInfoShow()" size="mini"><text
						class="word-btn-white">添加记录</text></button>
				<button type="warn" @click="structureShow()" size="mini"><text
						class="word-btn-white">查看表结构</text></button>
				<button @click="closeDrawer('showLeft')" size="mini"><text class="word-btn-white">关闭</text></button>
			</view>
			<uni-list>
				<uni-list-item v-for="item in dataList" :title="item.id" :note="JSON.stringify(item)"
					:show-extra-icon="true" showArrow :extra-icon="extraIcon">
					<template v-slot:footer>
						<uni-icons type="trash-filled" size="30" color="red" @click="delDataById(item.id)"></uni-icons>
					</template>
				</uni-list-item>
			</uni-list>
		</uni-drawer>
		
		<!-- 添加信息-弹窗 -->
		<uni-popup ref="popup" background-color="#fff" @change="change" style="z-index: 99999;">
			<view class="popup-content" style="width: 300px;padding: 10px;">
				<text style="margin: 0px auto;">添加信息</text>
				<uni-easyinput type="textarea" v-model="addInfoStr" placeholder="格式示例: { id : '1', name : '张三' }"
					autoHeight style="margin: 5px auto;"> </uni-easyinput>
				<button type="primary" @click="addInfo" class="but-top">确定</button>
			</view>
		</uni-popup>
		
		<!-- 查看表结构-弹窗 -->
		<uni-popup ref="structure" background-color="#fff" @change="change" style="z-index: 99999;">
			<view class="popup-content" style="width: 300px;padding: 10px;">
				<text style="margin: 0px auto;">{{table.sql}}</text>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import dbUtils from './dbUtils.js'
	export default {
		props: {
			dbName: {
				type: String,
				default: 'testDb'
			},
			tableSqls: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				//数据库名称
				tabName: '',
				table: '',
				tables: [],
				dataList: [],
				addInfoStr: '',
				extraIcon: {
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				}
			}
		},
		created() {
			if (this.dbName) {
				dbUtils.openDb(this.dbName)
				this.getTabAll();
			}
		},
		methods: {
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				this[type] = e
			},
			getDataList(table) {
				this.tabName = table.tbl_name;
				this.table = table;
				dbUtils.selectDataList(this.dbName, this.tabName, {}, 'createTime', 'desc').then(res => {
					this.dataList = res;
					console.info(res)
					this.showDrawer('showLeft')
				});
			},
			delTab(tabName) {
				dbUtils.delTable(this.dbName, tabName).then(res => {
					uni.showToast({
						title: "删除成功",
						duration: 2000
					})
					this.getTabAll();
				});
			},
			addInfo() {
				// {id:'11',name:'张三'}
				let data = eval('(' + this.addInfoStr + ')'); // jsonstr是json字符串
				dbUtils.addTabItem(this.dbName, this.tabName, data).then(res => {
					console.info("添加记录：",res)
					this.getDataList(this.tabName)
				})
			},
			addInfoShow() {
				this.$refs.popup.open('center')
			},
			structureShow() {
				this.$refs.structure.open('center')
			},
			delDataById(id) {
				dbUtils.delData(this.dbName, this.tabName, {
					id: id
				}).then(res => {
					this.getDataList(this.tabName)
				})
			},
			getTabAll() {
				dbUtils.getTable(this.dbName).then(res => {
					this.tables = res;
					console.info("tables", this.tables);
				});
			},
			initDb() {
				dbUtils.init(this.dbName,this.tableSqls);
				let _this = this;
				setTimeout(function() {
					_this.getTabAll();
				}, 500)
			},
		}
	}
</script>

<style lang="scss">
	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}

	.but-top {
		margin-bottom: 5px;
	}

	.infoBtns {
		display: flex;
		justify-content: space-around;
		padding: 5px;
	}
</style>