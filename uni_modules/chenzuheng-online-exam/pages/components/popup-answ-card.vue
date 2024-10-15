<template>
	<uni-popup ref="popup" :animation="false" :isMaskClick="1===0" :maskClick="1===0">
		<view class="justify-center close-view" @tap="close">
			<image src="../images/card-close.png" mode="aspectFit"></image>
		</view>	
		<view class="popup-content">
			<view class="popup-content-main">
				<view class="popup-content-ques">
					<template v-for="(tp,inx) in topic">
						<view class="ques-title" v-if="tp.name" :key="inx">{{tp.name}}</view>
						<view v-if="tp.topic" class="ques-item justify-center items-center" :class="isAnsw(tp)==1?'active':''"
							@click="intoQues(2,tp)">
								{{num(tp)}}
						</view>
					</template> 
				</view>
				<view class="btn-view flex-row justify-center">
					<button plain="true" class="btn-style btn-light-style items-center justify-center" @click="close()">继续作答</button>
					<button plain="true" class="btn-style items-center justify-center" @click="dialogToggle('success')">交卷</button>
				</view>
			</view>
		</view>
		<view>
			<!-- 交卷 -->
			<!-- <uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog cancelText="继续作答" confirmText="交卷" title="温馨提醒" content="确定要交卷吗？" @confirm="dialogConfirm"
					@close="dialogClose"></uni-popup-dialog>
			</uni-popup> -->
			<uni-popup ref="alertDialog" :is-mask-click="false" class="customer_popup">
				<view class="icon_view" @click="dialogClose"><image src="../images/card-close.png"></image></view>
				<view class="content_view">
					<text class="text_view">确定要交卷吗？</text>
					<view class="button_view">
						<button plain="true" @click="dialogClose" class="left_btn">继续作答</button>
						<button plain="true" @click="dialogConfirm" class="right_btn">交卷</button>
					</view>
				</view>
			</uni-popup>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name:"popup-answ-card",
		props:{
			// maskClick
			isMaskClick: {
				type: Boolean,
				default: null
			},
			// TODO 2 个版本后废弃属性 ，使用 isMaskClick
			maskClick: {
				type: Boolean,
				default: null
			},
			topic:{
				type:Array,
				default:[]
			},
			paperAnsw:{
				type:Array,
				default:[]
			},
			questionList:{
				type:Array,
				default:[]
			},
			paperId:{
				type: Number,
				default: 0
			},
			paperType:{
				type:String,
				default: null
			},
			progressId:{
				type: Number,
				default: 0
			}
		},
		watch:{
			
		},
		data() {
			return {
				
			};
		},
		methods:{
			close(){
				this.$refs.popup.close()
			},
			findIndex(question){
				let index = -1
				const first = this.questionList.map((q,inx)=>{
					if(q.id == question.id){
						return inx
					}else{
						return -1
					}
				})
				const arr = first.filter(a=>a!=-1)
				if(arr.length>0){
					index = arr[0]
				}
				return index;
			},
			num(question) {
				let index = this.findIndex(question)
				return index > -1 ? index + 1 : 0;
			},
			isAnsw(question){
				let index = this.findIndex(question)
				const arr = this.paperAnsw.filter((pp,ix)=>pp&&pp.key==index+1)
				return arr.length==0?0:1
			},
			dialogToggle(type) {
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				const questionDtos = this.paperAnsw.filter((item)=>item)  //过滤空值
				uni.showLoading({
					title: '生成报告中'
				});
				let formdata = {
					"paperId":this.paperId,
					"paperType":this.paperType,
					"progressId":this.progressId,
					"questionDtos":questionDtos
				};
				this.$api.generateReport(formdata).then(res => {
					uni.hideLoading();
					if(res.code == 10001){
						let progressId = res.data;
						if('random' == this.paperType){
							uni.navigateTo({
							  url: '/pages-learning/report/reportRandom?progressId='+progressId
							})
						}else{
							uni.navigateTo({
							  url: '/pages-learning/report/reportReal?progressId='+progressId
							})
						}
						
					}else{
						this.$util.showInfo(res.message);
					}
				})
				.catch(e => {
					uni.hideLoading();
				});
				//this.$refs.alertDialog.close()
			},
			dialogClose() {
				this.$refs.alertDialog.close()
			},
			intoQues(t,question){
				if(t==2){
					let index = this.topic.indexOf(question);
					this.$emit('intoQues',index,index)
				}
				this.close()
			}
		}
	}
</script>

<style lang="scss">
	::v-deep .close-view{
		height: 130rpx;
		image{
			width: 100rpx;
			height: 100rpx;
		}
	}
	::v-deep .popup-content{
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		background-color: #fff;
		padding: 1rpx;
		width: 100vw;
		.popup-content-main{
			margin: 50rpx auto 30rpx;
			.popup-content-ques{
				height: 55vh;
				overflow-y: scroll;
				.ques-title{
					margin-left: 40rpx;
					margin-bottom: 35rpx;
					font-size: 33rpx;
					color: #7F8BB4;
					text-align: left;
					font-weight: 500;
				}
				.ques-item{
					width: 90rpx;
					height: 90rpx;
					background: #F4F6F9;
					border-radius: 50%;
					margin: 0 0 45rpx;
					margin-left: 30rpx;
					font-size: 36rpx;
					color: #333333;
					font-weight: 400;
					display: inline-block;
					text-align: center;
					line-height: 90rpx;
				}
				.ques-item + .ques-item{
					margin-left: 30rpx ;
				}
				.active{
					background-color:#5776F3;
					color:#fff;
				}
			}
			.btn-view{
				box-sizing: border-box;
				padding: 0 30rpx;
			}
			.btn-style{
				background-image: linear-gradient(138deg, #89A0FF 0%, #5776F3 100%);
				color:#fff;
				font-size: 32rpx;
				font-weight: 400;
				padding: 10rpx 0rpx;
				margin-top: 50rpx;
				margin-bottom: 30rpx;
				width: 330rpx;
				height: 90rpx;
				border-radius: 50rpx;
			}
			.btn-light-style{
				background: #EEF1FD;
				color: #5776F3;
				font-size: 33rpx;
			}
		}
	}
	::v-deep .uni-button-color{
		color:#5776F3;
	}
	button[plain=true]{
		border: 0;
	}
	.customer_popup{
		.icon_view{
			text-align: center;
			image{
				width: 85rpx;
				height: 85rpx;
			}
		}
		.content_view{
			background-color: #fff;
			border-radius: 20rpx;
			padding: 80rpx;
			margin-top: 20rpx;
			.text_view{
				display: block;
				width: 100%;
				font-size: 32rpx;
				color: #333333;
				text-align: center;
			}
			.button_view{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 56rpx;
				align-items: center;
				.left_btn{
					background: rgba(87,118,243,0.10);
					border-radius: 44rpx;
					font-size: 32rpx;
					color: #5776F3;
					padding: 0rpx 40rpx;
					margin: 0;
					min-width: 200rpx;
					margin-right: 50rpx;
				}
				.right_btn{
					border-radius: 44rpx;
					background-image: linear-gradient(153deg, #89A0FF 5%, #5776F3 100%);
					font-size: 32rpx;
					color: #FFFFFF;
					padding: 0rpx 40rpx;
					margin: 0;
					min-width: 200rpx;
				}
			}
		}
	}
</style>