<template>
	<view class="background">
		<!-- <view class="flex-row justify-between items-center head-info" style="background-color: #fff;">
			<view class="items-center current-type">{{currentType}} <text class="ques-type" v-if="typeName">{{typeName}}</text></view>
			<view class=""><text class="head-current">{{current}}</text><text class="head-total">/{{total}}</text></view>
		</view> -->
		<view class="ques-cover" v-if="examItem.cover">
			<!-- <view class="ques-type">常识判断</view> -->
			<view>
				<view class="ques-type-strong">{{examItem.name}}</view>
				<view class="ques-type-rule">{{examItem.request}}</view>
				<view class="point-tip justify-center"><image src="../images/pointtip.png" mode="aspectFit"></image></view>
			</view>
		</view>
		<view v-else>
			<view>
				<view class="exam-ques-topic"><text>{{examItem.topic}}</text></view>
				<view class="exam-ques-opt items-center" :class="(oneAnswer.value==String.fromCharCode(65 + index)&&oneAnswer.id==examItem.id)||currentAnsw==index&&isAnsw?'exam-ques-opt-active':''" @click="answ(current,index,examItem)" v-for="(opt,index) in examItem.optionJson">
					<view class="items-center exam-opt-view">
						{{String.fromCharCode(65 + index)}}<text class="flex-wrap exam-opt-text">{{opt}}</text>
					</view>
				</view>
				<view v-if="rst===1" class="rst-style right">答对了</view>
				<view v-if="rst===2" class="rst-style wrong">答错了</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			examItem:{
				type:Object,
				default:()=>{
					return {}
				}
			},
			total:{
				type:Number,
				default:0
			},
			current:{
				type:Number,
				default:0
			},
			currentType:{
				type:String,
				default:''
			},
			oneAnswer:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				currentAnsw:'',
				isAnsw:false,
				rst:-1
			}
		},
		computed:{
			typeName(){
				if(this.examItem.type===0){
					return "单选"
				}if(this.examItem.type===1){
					return "不定项"
				}if(this.examItem.type===3){
					return "多选"
				}if(this.examItem.type===4){
					return "判断"
				}
			}
		},
		components:{
			
		},
		onLoad(option){
			
		},
		methods: {
			answ(cur,index,it){
				let opt = String.fromCharCode(65 + index)
				this.currentAnsw = index
				this.isAnsw = true
				if(opt===it.answer){
					this.rst = 1
				}else{
					this.rst = 2
				}
				setTimeout(()=>{
					let item = {
						'id':this.examItem.id,
						'key':cur,  //题号
						'value':opt  ,//选择项
						'ans':this.examItem.answer
					}
					this.$emit('answ',item)
					this.currentAnsw = ''
					this.isAnsw = false
				},500)
			}
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
			
			image{
				width: 60rpx;
				height: 60rpx;
			}
			.current-type{
				font-size: 34rpx;
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
				padding: 5rpx 30rpx;
				background: rgba(87,118,243,0.10);
				border-radius: 85px;
				
				font-size: 19rpx;
				color: #5776F3;
				font-weight: 400;
				margin-left: 20rpx;
			}
		}
		
		.ques-cover{
			box-sizing: border-box;
			padding: 30rpx 40rpx;
			height: calc(100vh - 100rpx);
			background-color: #fff;
			.ques-type{
				font-size: 32rpx;
				color: #7F8BB4;
				font-weight: 400;
			}
			
			.ques-type-strong{
				font-size: 40rpx;
				color: #333333;
				font-weight: 600;
				text-align: center;
				margin-top: 60rpx;
			}
			.ques-type-rule{
				font-size: 30rpx;
				color: #7F8BB4;
				text-align: center;
				line-height: 40rpx;
				margin-top: 50rpx;
			}
			.point-tip{
				image{
					width: 150rpx;
					height: 130rpx;
					margin-top: 80rpx;
				}
			}
		}
		
		.exam-ques-topic{
			padding: 10rpx 40rpx;
			font-size: 38rpx;
			color: #333333;
			line-height: 80rpx;
			font-weight: 400;
			box-sizing: border-box;
		}
		.exam-ques-opt{
			margin: 30rpx 40rpx;
			// height: 140rpx;
			background: #F8FAFF;
			border-radius: 30rpx;
			font-size: 33rpx;
			color: #333333;
			padding: 40rpx 0;
			padding-left: 60rpx;
			width: calc(100% - 80rpx);
			box-sizing: border-box;
			
			.exam-opt-view{
				width: 100%;
				.exam-opt-text{
					display: inline-block;
					width: 80%;
					margin-left: 30rpx;
				}
			}
		}
		.exam-ques-opt-active{
			background: #F8FBF9;
			border: 1px solid #2CB870;
			color: #2CB870;
		}
	}
	.rst-style{
		font-size: 40rpx;
		text-align: center;
		width: 100%;
	}
	.right{
		color: #2CB870;
	}
	.wrong{
		color: firebrick;
	}
</style>
