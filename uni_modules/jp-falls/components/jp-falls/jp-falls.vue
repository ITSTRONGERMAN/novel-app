<template>
	<div class="list">
		<div class="list_item">
			<div ref="listLeft">
				<slot name="left" :left="leftList"></slot>
			</div>
		</div>
		<div class="list_item">
			<div ref="listRight">
				<slot name="right" :right="rightList"> </slot>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "jp-falls",
		props: {
			routesList: Array,
		},
		data() {
			return {
				list: [],
				leftList: [],
				rightList: []
			};
		},
		watch:{
			routesList(){
				if(this.routesList.length>0){
					let list = [...this.routesList]
					list.splice(0,(this.leftList.length+this.rightList.length))
					this.list = [...list]
				}else{
					this.list = [...this.routesList]
					this.leftList = [];
					this.rightList = [];
				}
				if (this.list.length > 0) {
					this.setList()
				}
			}
		},
		activated() {},
		mounted() {
			this.list = [...this.routesList]
			this.leftList = [];
			this.rightList = [];
			if (this.list.length > 0) {
				this.setList()
			}
		},
		methods: {
			remove(index, type) {
				if (type == 'left') {
					this.leftList.splice(index, 1)
				} else {
					this.rightList.splice(index, 1)
				}
			},
			async setList() {
				let that = this;
				let item = this.list[0] //取第一个数据
				let left = that.$refs.listLeft.clientHeight; //查左边的高度
				let right = that.$refs.listRight.clientHeight; //查右边的高度
				if (right >= left) { //右边高则忘左边加数据
					this.leftList.push(item);
				} else {
					this.rightList.push(item);
				}
				// 移除临时列表的第一项
				this.list.splice(0, 1);
				// 如果临时数组还有数据，继续循环
				if (this.list.length > 0) {
					setTimeout(() => {
						this.setList();
					}, 50)
				}
			},
		},
		computed: {},
	};
</script>
<style scoped lang="scss">
	.list {
		display: flex;
		justify-content: space-between;

		.list_item {
			flex: 1;
		}
	}
</style>