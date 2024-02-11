<template>
    <div class="otc-detail">
       <van-row>
           <van-nav-bar
                 title="订单详情"
                  right-text=""
                   left-arrow
                   :border="false"
                   @click-left="onClickLeft"
            />
        </van-row>
<!--        <h2>挂单详情</h2>-->
        <van-row>
            <van-cell-group>

                <van-field
                        v-model="otcOrder.type"
                        label="类型"
                        readonly
                        :border="false"
                />
                <van-field
                        v-model="otcOrder.orderUser"
                        label="订单"
                        readonly
                        :border="false"
                />
                <van-field
                        v-model="otcOrder.createdTime"
                        label="时间"
                        readonly
                        :border="false"
                />
                <van-field
                        v-model="otcOrder.count"
                        label="购买数量"
                        readonly
                        :border="false"
                />
                <van-field
                        v-model="otcOrder.price"
                        label="价格"
                        readonly
                        :border="false"
                />
                <!-- <van-field
                        v-model="otcOrder.state"
                        label="状态"
                        readonly
                        :border="false"
                />
                <van-field
                        v-model="otcOrder.payType"
                        label="支付类型"
                        readonly
                        :border="false"
                />
                <van-field
                        v-model="otcOrder.handlingFee"
                        label="手续费"
                        readonly
                        :border="false"
                />
                <van-field
                        v-model="otcOrder.acceptUser"
                        label="接单人"
                        readonly
                        :border="false"
                />
                <van-field
                        v-model="otcOrder.mark"
                        label="备注"
                        readonly
                        :border="false"
                /> -->
                <!--<van-field
                        v-model="otcOrder.payAccount"
                        label="支付账号"
                        readonly
                        :border="false"
                />
                <van-field
                        v-model="otcOrder.actualArrive"
                        label="实际到账"
                        readonly
                        :border="false"
                />-->

                <!-- <van-cell title=" " value="" :border="false"></van-cell> -->
            </van-cell-group>
            <!-- <van-cell title=" " value="" :border="false"></van-cell> -->
        </van-row>
        <van-row type="flex" style="padding:0 20px 15px 15px; text-align:right;">
                <van-col span="12"></van-col>
                <van-col span="12">
                    <van-button @click="buyClick" type="primary" size="small" style="font-size:15px; background-color:#086cef; height:35px;">申诉</van-button>
                </van-col>
        </van-row>
        <!-- <van-row type="flex" justify="center">
            <van-col span="8"><van-button type="primary" v-show="showBtn" :disabled="confirmBtn"  size="large" @click="confirmRecharge">{{otcOrder.btnName}}</van-button></van-col>
        </van-row> -->
        <van-row type="flex" justify="end">
            <van-col span="24"> <van-cell title=" " value="" :border="false"></van-cell></van-col>
        </van-row>
        <!--<van-row type="flex" justify="end">
            <van-col span="12" @click="clickAppeal"><span style="font-size: 14px">遇到问题？点击申诉</span></van-col>
        </van-row>-->
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Row, Col, Cell, CellGroup, Icon, Toast, Dialog,
        NavBar, GoodsAction, GoodsActionIcon, GoodsActionButton,
        Sku, Swipe, SwipeItem ,Panel ,Image, Field, Button
    } from 'vant';


    Vue.use(Swipe).use(SwipeItem).use(Cell).use(Row).use(Col)
        .use(CellGroup).use(Icon).use(GoodsAction).use(GoodsActionIcon)
        .use(GoodsActionButton).use(Swipe).use(SwipeItem).use(Field)
        .use(Sku).use(NavBar).use(Panel).use(Image ).use(Button)
        .use(Toast).use(Dialog);

    export default {
        data(){
            return{
                userInfo:"",
                showBtn:true,
                confirmBtn:false,
                orderId:"",
                otcOrder:{
                    type:"待卖家确认订单",
                    orderUser:"",
                    createdTime:"",
                    count:"",
                    price:"",
                    state:"",
                    acceptUser:"",
                    payType:"",
                    payAccount:"",
                    btnName:"",
                    handlingFee:"",
                    actualArrive:"",
                    mark:""
                }
            }
        },
        mounted(){
            this.orderId = this.$route.params.id;
            let self = this;
           this.confirmRecharge()
        },
        methods:{
            onClickLeft(){
                //返回上一页
                this.$router.go(-1);//返回上一层
            },
             async buyClick(){
                    let Data = JSON.parse(localStorage.getItem('userInfo'));
                    let Random = Math.round(Math.random());
                    let userInfo = {
                        user_id:Data.user_id,
                        s_id:Data.s_id,
                        random:Random,
                        order_id:this.$route.params.id
                    }
                    let res = await this.$api.network.OTCappealBuy(userInfo);
                    this.notCredential = res.list;
                    console.log(res)
                },
           async confirmRecharge(){
              let userInfo = {
                  order_id:this.$route.params.id
              }
              let res = await this.$api.network.OTCquerone(userInfo);
              this.otcOrder.count = res.list.ret.number
              this.otcOrder.orderUser = res.list.ret.this_order_id
              this.otcOrder.createdTime = res.list.ret.time
              console.log(res)
                //
                /*
                * 如果挂单类型是出售的话，对应的操作就是买入
                * 这时候就应该让用户输入买入数量
                *
                * */
                let id=this.orderId;
                // Toast.success('联系客服')

                /*Dialog.confirm({
                    title: '确认',
                    message: '你是否确认已给官方转账？'
                }).then(() => {
                    let msg = "确认成功，等待到账";
                    Dialog({ message: msg});
                    this.rechargeInfo.state = "已确认, 等待到账";
                    this.confirmBtn = true
                    // on confirm
                }).catch(() => {
                    // on cancel
                });*/

            },
            clickAppeal(){
                // let msg = "请联系客服QQ：12345864654524";
                // Dialog({ message: msg});
            }
        }
    }
</script>
`
