<template>
	<view class="background">
		<!-- <view class="flex-row justify-between items-center head-info">
			<view class="items-center"><image src="./images/clock.png" mode="aspectFit"/>02:00</view>
			<view class="items-center" @tap="open">交卷</view>
		</view> -->
		<!-- 滑动页面区域 -->
		<view class="slide-area" :key="index"
		v-for="(item,index) in topic" v-if="index==nth || newIndex==index" 
		@touchstart="touchStart" @touchend="touchEnd($event,index)"
		:class="upOrDown=='up'?'toRight':'toLeft'">
		<!-- :animation="animationData"> -->
			<exam-item :examItem="item" @answ="answ" :total="total" :current="current" :currentType="currentType" :oneAnswer="oneAnswer"></exam-item>
		</view>
		<PopupAnswCard ref="popupAnswCard" :topic="topic" :paperAnsw="paperAnsw" :questionList="quesMainList"
		@intoQues="intoQues"></PopupAnswCard>
	</view>
</template>

<script>
	import ExamItem from './components/exam-item.vue'
	import PopupAnswCard from './components/popup-answ-card.vue'
	export default{
		components:{
			ExamItem,
			PopupAnswCard
		},
		data() {
			return {
				startX: 0, // 滑动开始x轴位置
				moveX: 0, // 滑动的x轴距离
				nth: 0, // 当前第几题（以下标计算）
				newIndex: 0, // 滑动到第几题（以下标计算）
				topic: [],
				animation:'',
				animationData: {} ,// 动画
				questionJson:[],
				currentIndex:0,
				coverIndex:[],
				currentType:'',
				width:0,
				SystemInfo:'',
				upOrDown:'down',
				paperAnsw:[],
				quesMainList:[]
			}
		},
		computed:{
			total(){
				return this.topic.length-this.coverIndex.length
			},
			current(){
				const inx = this.coverIndex.filter(cv=>this.newIndex==cv)
				if(inx.length>0){
					this.currentType = this.topic[inx].name
				}
				
				const arr = this.coverIndex.filter(cv=>this.newIndex>cv)
				if(arr.length!=0){
					return this.newIndex+1-arr.length
				}else{
					return 0
				}
			},
			oneAnswer(){
				if(this.paperAnsw.length>0){
					if(this.paperAnsw[this.current]){
						console.log(this.paperAnsw[this.current],'oneAnswer-------')
						return this.paperAnsw[this.current]
					}
				}
				return {}
			}
		},
		async onLoad(option) {
		    // 创建动画实例
		    this.animation = uni.createAnimation({ timingFunction: 'ease', duration: 100 })
			this.getListData(option.id)
			this.SystemInfo = await this.getSystemInfo();
			this.$nextTick(() => {
				this.width = this.SystemInfo.windowWidth 
			})
			
		},
		methods: {
			// 获取设备信息
			getSystemInfo(){
				return new Promise((req, rej) => {
					uni.getSystemInfo({
					    success: function (res) {
					        req(res)
					    }
					});
				})
			},
			touchStart(e) { // 手指触摸屏幕时触发，有一个手指放在屏幕上也会触发
				// 获取触摸时的原点
				this.startX = e.changedTouches[0].pageX // 触摸目标在页面中的X坐标
				//console.log('开始触摸：', this.startX);
			},
			touchEnd(e,index) { // 手指离开屏幕时触发
				// 获取滑动距离
				const moveX = e.changedTouches[0].pageX - this.startX
				// 判断滑动方向
				if (moveX < -100 && index<this.topic.length-1) { // 下一题 判断大幅度左滑且不是最后一题
					
					this.downOne()
				}
				else if (moveX > 100 && index!= 0) { // 上一题 判断大幅度右滑且不是第一题
					
					this.upOne()
				}
			},
			downOne(){
				this.upOrDown = 'down'
				this.newIndex=this.newIndex+1
				this.nth= this.nth+1
			},
			upOne(){
				this.upOrDown = 'up'
				this.newIndex=this.newIndex-1
				this.nth= this.nth-1
			},
			intoQues(tpNum){
				this.newIndex=tpNum
				this.nth= tpNum
			},
			answ(rs){
				this.handlerArr(rs)
				if(this.newIndex<this.topic.length-1){
					//this.downOne()
				}else{
					uni.showToast({
						title:'这是最后一题了',
						icon:'error'
					})
				}
			},
			handlerArr(rs){
				this.$set(this.paperAnsw, rs.key,  rs)
				console.log('答题结果是：',rs,this.paperAnsw)
			},
			open(){
				this.$refs.popupAnswCard.$refs.popup.open('bottom')
				//最后一题正好是多选情况
				// if(this.current==this.quesMainList.length){
				// 	this.multipueSub()
				//}
			},
			getListData(id){
				//模拟api请求
				this.topic = [
					// {
					// 	name:'常识',
					// 	request:'答题规则：按要求作答，下列各题的备选答案中，只有一项最符合题意，请根据题干要求选择正确答案。',
					// 	cover:true
					// },
					{	
						id:1,
						type:0,
						topic:'题目1：IGSO卫星总是覆盖地球上某一个区域，可与GEO卫星搭配，形成良好的几何构型，一定程度上克服GEO在高纬度地区仰角过低带来的影响。',
						optionJson:[
							"正确",
							"错误"
						],
						answer:"A"
					},
					{
						id:2,
						type:0,
						topic:'题目2：测控中心不仅要确定卫星的轨道和位置，还是卫星在天上保持正确轨道、正确姿态的总指挥。',
						optionJson:[
							"正确",
								"错误"
							],
							answer:"A"
					},
					{
						id:3,
						type:0,
						topic:'题目3：北斗卫星导航系统采用了空间自主导航方式，它是在没有地面控制的情况下，自己调整自己的位置，在短时间（通常是几天到几十天）内能够维持轨道构型。',
						optionJson:[
							"正确",
								"错误"
							],
							answer:"A"
					},
					{
						id:4,
						type:0,
						topic:'题目4：北斗卫星导航系统采用的空间自主导航大大减少了卫星对地面站的依赖，实现了“可视”范围外的卫星控制，也降低了系统的运行管理成本。',
						optionJson:[
							"正确",
								"错误"
							],
							answer:"A"
					},
					{
						id:5,
						type:0,
						topic:'题目5：2002年，机构间空间碎片协调委员会（IADC）通过《IADC空间碎片减缓指南》，为废弃卫星推到废弃轨道提供了原则指导。',
						optionJson:[
							"正确",
								"错误"
							],
							answer:"A"
					},
					{
						id:6,
						type:0,
						topic:'题目6：IGSO卫星，倾角不为0°，运行周期与地球自转周期相同。',
						optionJson:[
							"正确",
								"错误"
							],
							answer:"A"
					},
					{
						id:7,
						type:0,
						topic:'题目7：IGSO卫星因有倾角，星下点轨迹呈现“8”字形。',
						optionJson:[
							"正确",
								"错误"
							],
							answer:"A"
					},
					{
						id:8,
						type:0,
						topic:'题目8：GEO卫星倾角不为0°。',
						optionJson:[
							"正确",
								"错误"
							],
							answer:"B"
					},
					{
						id:9,
						type:0,
						topic:'题目9：GEO卫星星下点轨迹呈现“8”字形。',
						optionJson:[
							"正确",
								"错误"
							],
							answer:"B"
					},
					{
						id:10,
						type:0,
						topic:'题目10：IGSO卫星运行周期与地球自转周期不同。',
						optionJson:[
							"正确",
								"错误"
							],
							answer:"B"
					},
					{
						id:11,
						type:0,
						topic:'题目11：对于已经达到寿命的卫星，一般不需要把它机动到废弃轨道。',
						optionJson:[
							"正确",
								"错误"
							],
							answer:"B"
					},
					{
						id:12,
						type:0,
						topic:'题目12：如果是地球静止轨道和低轨卫星，要保证废弃轨道不会穿越地球静止轨道保护区域，同时废弃轨道应该让穿越低轨保护区域的时间最短（不超过25年）。',
						optionJson:[
							"正确",
								"错误"
							],
							answer:"A"
					},
					// {
					// 	name:'判断题',
					// 	request:'答题规则：按要求作答，下列各题的备选答案中，只有一项最符合题意，请根据题干要求选择正确答案。',
					// 	cover:true
					// },
					{	
						id:13,
						type:4,
						topic:'题目13：如果是其它轨道卫星，需要实施轨道机动来减小轨道寿命，寿命参考低轨卫星限制寿命，如果卫星对其它正在工作的卫星造成干扰，那么处置办法另议。',
						optionJson:[
							"正确",
								"错误"
							],
							answer:"A"
					},
		
					{
						id:14,
						type:4,
						topic:'题目14：导航信号的三要素是___、测距码、导航电文。',
						optionJson:[
							"载波",
							"随机码",
							"上行信号",
							"二维码"
							],
							answer:"A"
					},
					{
						id:15,
						type:4,
						topic:'题目15：国际无线电联盟分配给无线电导航___、S频段、C频段',
						optionJson:[
							"X频段",
							"Ku频段",
							"Ka频段",
							"L频段"
							],
							answer:"D"
					},
					{
						id:16,
						type:4,
						topic:'题目16：___就是将信号从低频（信息）转换到高频（载波）。',
						optionJson:[
							"信号调制",
							"信道编码",
							"信号解调",
							"信道译码"
							],
							answer:"A"
					},
					{
						id:17,
						type:4,
						topic:'题目17：导航信号产生时，___在发送端对原数据添加额外的信息（冗余信息）。',
						optionJson:[
							"信号调制",
							"信道编码",
							"信号解调",
							"信道译码"
							],
							answer:"B"
					},
					{
						id:18,
						type:4,
						topic:'题目18：北斗具有多种功能，其中___功能是北斗信号最基本的功能。',
						optionJson:[
							"全球短报文通信",
							"导航𶓱位服务",
							"星基增强",
							"精密单点定位"
							],
							answer:"B"
					},
					{
						id:19,
						type:4,
						topic:'题目19：北斗系统的“独门绝技”是___。',
						optionJson:[
							"星基增强",
							"国际搜救",
							"北斗短报文",
							"精密单点定位"
							],
							answer:"C"
					},
					{
						id:20,
						type:4,
						topic:'题目20：在浩瀚的宇宙中，连接2颗小小卫星的“高速路”，铺路用的是发射接收设备、天线、网络协议实现信号的捕获与跟踪。',
						optionJson:[
							"正确",
								"错误"
							],
							answer:"A"
					},
				]
				
				if(this.topic.length>0){
					this.currentType = this.topic[0].name
				}
				this.topic.forEach((t,index)=>{
					if(t.cover){
						this.coverIndex.push(index)
					}else{
						this.quesMainList.push(t)
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.background{
		background-color: #fff;
		width: 100vw;
		min-height: 100vh;
		padding-top: 1rpx;
		box-sizing: border-box;
		
		.head-info{
			background-color: #f7f7f7;
			box-sizing: border-box;
			padding: 20rpx 40rpx;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.items-center{
				display: flex;
				align-items: center;
			}
			
			image{
				width: 60rpx;
				height: 60rpx;
			}
			.head-current{
				font-size: 40rpx;
				color: #333333;
				text-align: right;
				font-weight: 500;
			}
			.head-total{
				font-size: 28rpx;
				color: #C4C8D8;
				font-weight: 300;
			}
			
			.ques-type{
				height: 17px;
				background: rgba(87,118,243,0.10);
				border-radius: 85px;
			}
		}
		
		.slide-area{
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.topic-box{
				width: 80%;
				height: 900rpx;
				background-color: #fff;
				border: 10rpx solid black;
			}
		}
	}
	
	@keyframes toRight {
	// 0% { opacity: 1; transform:translateX(100%)}
	// 50%{ opacity: 1; transform:translateX(0)}
	// 100%{ opacity: 1; transform:translateX(0)}
	  0% { opacity: 1; transform:translateX(-100%)}
	  50%{ opacity: 1; transform:translateX(0)}
	  100%{ opacity: 1; transform:translateX(0)}
	}
	.toRight {
	  animation-name: toRight;
	  animation-duration: 1.3s;
	  animation-timing-function: ease-in-out;
	}
	
	@keyframes toLeft {
		0% { opacity: 1; transform:translateX(100%)}
		50%{ opacity: 1; transform:translateX(0)}
		100%{ opacity: 1; transform:translateX(0)}
	}
	.toLeft {
	  animation-name: toLeft;
	  animation-duration: 1.3s;
	  animation-timing-function: ease-in-out;
	}
</style>