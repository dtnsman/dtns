<template>
    <div>
        <MyBox title="待支付订单" @back="$router.go(-1)">
       <template slot="content">
           <div class="content">
                <div class="card address">
                    <!-- <van-steps :active="active"  active-color="#12ACF4">
                        <van-step>待支付</van-step>
                        <van-step>待发货</van-step>
                        <van-step>待收货</van-step>
                        <van-step>待评价</van-step>
                        <van-step>已完成</van-step>
                    </van-steps>
                    <van-cell-group>
                    <van-cell :title="'快递单号: '+num" icon="location-o" :center="true">
                        <template #icon>
                            <svg style="padding-right:8px" t="1590801779432" class="icon" viewBox="0 0 1398 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2963" width="20" height="20"><path d="M554.869356 791.651293a118.510673 118.510673 0 0 1 9.480853 56.885123v9.480854h317.608603v-9.480854a237.021345 237.021345 0 0 1 9.480854-56.885123z" p-id="2964"></path><path d="M1057.354608 1023.932212a170.655369 170.655369 0 0 1-175.395796-175.395796 175.395796 175.395796 0 0 1 175.395796-175.395795 180.136222 180.136222 0 0 1 175.395795 175.395795 175.395796 175.395796 0 0 1-175.395795 175.395796z m0-284.425615a109.029819 109.029819 0 1 0 0 218.059638 109.029819 109.029819 0 1 0 0-218.059638zM388.954414 1023.932212a175.395796 175.395796 0 0 1-175.395796-175.395796 180.136222 180.136222 0 0 1 175.395796-175.395795 175.395796 175.395796 0 0 1 175.395795 175.395795 170.655369 170.655369 0 0 1-175.395795 175.395796z m0-284.425615a109.029819 109.029819 0 1 0 0 218.059638 109.029819 109.029819 0 1 0 0-218.059638z" p-id="2965"></path><path d="M1365.482357 0h-900.681113a33.182988 33.182988 0 0 0-33.182988 33.182988v365.012872h-189.617076L14.460688 554.629948a28.442561 28.442561 0 0 0-14.221281 28.442562v241.761772a33.182988 33.182988 0 0 0 33.182989 33.182988h184.876649a14.221281 14.221281 0 0 1-4.740427-9.480854 237.021345 237.021345 0 0 1 9.480854-56.885123H66.605384v-194.357503l203.838357-132.731953h161.174515v213.319211a175.395796 175.395796 0 0 1 66.365977 33.182988V66.365977h834.315135v725.285316h-109.029819a237.021345 237.021345 0 0 1 9.480854 56.885123v9.480854h132.731954a33.182988 33.182988 0 0 0 33.182988-33.182988V33.182988a33.182988 33.182988 0 0 0-33.182988-33.182988z" p-id="2966"></path></svg>
                        </template>
                    </van-cell> -->
                     <van-cell @click="userAddress" :title="addressList.name+' '+addressList.phone" icon="location-o" :center="true"
                     :label="addressList.address"
                     >
                        <template #icon>
                            <svg style="padding-right:8px" t="1590801901330" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3208" width="20" height="20"><path d="M512 232.269512a160.060264 160.060264 0 1 0 160.060264 159.845993A160.274534 160.274534 0 0 0 512 232.269512z m0 277.052103a117.20611 117.20611 0 1 1 117.20611-117.20611A117.20611 117.20611 0 0 1 512 509.321615z" p-id="3209"></path><path d="M512 0A407.114459 407.114459 0 0 0 104.885541 407.114459c0 219.627537 376.259469 586.887633 392.115505 602.315129l14.998954 14.570412 14.998954-14.570412C542.854991 994.002092 919.114459 626.741996 919.114459 407.114459A407.114459 407.114459 0 0 0 512 0z m0 964.218456C441.719188 892.86629 147.739694 585.387738 147.739694 407.114459a364.260306 364.260306 0 0 1 728.520612 0c0 178.273279-293.979494 485.751831-364.260306 557.103997z" p-id="3210"></path></svg>
                            <div v-if="addlist.length == 0">点击选择或者添加地址</div>
                        </template>
                        <svg t="1592039187607" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3612" width="10" height="10"><path d="M667.137993 512.122192L270.535221 69.645282A41.703762 41.703762 0 0 1 332.256788 13.762241l420.373916 468.75028v2.919264a41.703762 41.703762 0 0 1 0 54.631927L333.924938 1008.396955a41.703762 41.703762 0 1 1-62.138605-55.466003z" p-id="3613"></path></svg>
                    </van-cell>
                    <!-- </van-cell-group> -->
                </div>
                
                <div class="card order-card">
                    <van-cell title="商品信息" style="font-size:15px;font-weight:bold" class="order-title"></van-cell>
                     <div class="orderList" @click="shopOrder">
                        <van-card v-for="good in data" :key="good.product_id"
                        class="van-hairline--bottom"
                        :thumb="good.product_img"
                        >
                            <template slot="price">
                                ×{{good.number}}
                            </template>
                             <template slot="num">
                                <span style="color:#000">￥{{good.product_price}}</span>
                            </template>
                             <template slot="title">
                            <span class="van-ellipsis title">{{good.product_ad}}</span>
                            </template>
                            <template slot="desc">
                                <div class="van-multi-ellipsis--l2 desc">
                                    {{good.product_desc}}
                                </div>
                            </template>
                        </van-card>
                    </div>
                </div>

                <!-- <div class="card" v-if="state != 3">
                    <van-cell title="订单信息" style="font-size:15px;font-weight:bold"></van-cell>
                    <van-cell title="商品金额" :value="'￥'+countPrice"></van-cell>
                    <van-cell title="运费" :value="'+￥'+freight"></van-cell>
                    <van-cell title="总额" :value="'￥'+(countPrice+freight)"></van-cell>
               
                </div> -->
                <div class="card" style="margin-bottom:50px">
                     <van-cell class="order-ps" title="配送方式" value="包邮"></van-cell>
                      <van-field v-model="remark" class="order-bz" label="备注:" placeholder="如需备注，请输入" />
                </div>
                 <!-- <van-submit-bar :price="(mun)*100" button-text="提交订单" @submit="onSubmit" /> -->
                 <van-submit-bar :price="(count)*100" button-text="提交订单" @submit="onSubmit" />
           </div>
       </template>
   </MyBox>
    </div>
</template>
<script>
export default {
    props: {
        orderId: 0,
        state: 0
    },
    data () {
        return {
            isShowBottom: true,
            ///当前步骤
            product_id:'',
            active: this.state,
            countPrice:'',
            count:'',
            img:'',
            numArr:'',
            order_id:'',
            orderShuz:'',
            data:{},
            addressList:{
                address: '',
                num: '',
                name: '',
                phone:'',
            },
            addlist:[],
            orderList: [
                {
                    num: "",
                    price: "",
                    desc: "",
                    title: "",
                    img: "",
                }
            ],
            // 运费
            freight: 15,
            radio: "3",
            ///评价
            evaluate:'',
            ///备注
            remark:''
        }
    },
    methods: {
        // onSubmit () {
        //     // this.$toast('提交成功')
        //     this.$dialog.alert({
        //         title: "前往支付", //加上标题
        //         message: "是否前往支付订单？", //改变弹出框的内容
        //         showCancelButton: true,//展示取水按钮
        //         width: 300
        // })
        // .then(() => { //点击确认按钮后的调用
                
        // })
        // .catch(() => { //点击取消按钮后的调用
        //     //   this.$router.push({path:"/userOrder"}) 
        //     this.$toast('你取消了订单') 
        // })
        // },
        userAddress(){
            this.$router.push({path:"/userAddress"})
        },
        shopOrder(){
            this.$router.push({path:"/shopDetail/"+this.product_id})
        },
        async onSubmit () {
            let goods = JSON.parse(localStorage.getItem('goods'))
            console.log(goods)
            let addlistes = this.addlist
            let shopid = localStorage.getItem('shopid')
            let random = Math.random()
            let params =  {
                user_id:localStorage.user_id,
                s_id: localStorage.s_id,
                shop_id: shopid,
                address_info: JSON.stringify(addlistes),
                goods: JSON.stringify(goods),
                note: this.remark,
                random:random
            }
            let res = await this.$api.network.createOrder(params)
            console.log(res)
            if(res.ret){
                this.$toast.success('提交成功')
                this.$router.push({path:"/userOrder"})  
            }else{
                this.$toast.fail('提交失败')
            }
        },
        countSum () {//总价
             let count = 0
             this.data.forEach(item=> {
            //    console.log(item)
               let itemCount = 0
               itemCount = item.number*item.product_price
               count +=itemCount//价格
            //    console.log(count)
            })
            this.count = count
        },
    //    async comfirmOrder () {
    //       let goodsList = localStorage.getItem('goodsList')
    //       console.log(goodsList)
    //       let shopid = JSON.parse(localStorage.getItem('shopid'))
    //         let arr=[]
    //         let goods=[]
    //         let good=[]
    //         let random = Math.random()
    //         for(var i=0;i<goodsList.length;i++){
    //             goodsList[i].index = i;
    //             good={
    //                 product_id: goodsList[i].product_id,
    //                 product_image: goodsList[i].product_image,
    //                 product_name: goodsList[i].product_name,
    //                 product_price: goodsList[i].product_price,
    //                 product_vip_price: goodsList[i].product_price,
    //                 number:goodsList[i].number
    //             }
    //             goods.push(good)
    //             this.goods=goods
    //         }
    //         let addlistes = this.addlist
    //         console.log(addlistes)
    //         // console.log(goods)
    //         let params =  {
    //             user_id:localStorage.user_id,
    //             s_id: localStorage.s_id,
    //             shop_id: shopid,
    //             address_info: JSON.stringify(this.addlistes),
    //             goods: JSON.stringify(this.goods),
    //             note: "楼上的快乐付款",
    //             random:random
    //         }
    //         let res = await this.$api.network.createOrder(params)
    //         console.log(res)
    //         this.order_id=res.order_id
    //         console.log(this.order_id)
    //         localStorage.setItem('orderId',this.order_id)
    //     },
        async queryAddress(){//地址列表
            let params = {
                user_id:localStorage.user_id,
                s_id: localStorage.s_id,
                begin:0,
                len:10
            }
            let res = await this.$api.network.queryAddressList(params)
            console.log(res)
            if(res.ret){
                this.addlist = res.list[0]
                this.addressList = {
                    address:res.list[0].province+res.list[0].city+res.list[0].district+res.list[0].address_detail,
                    num:res.list[0].mail_code,
                    name:res.list[0].user_name,
                    phone:res.list[0].phone,
                }
            }else if(res.msg == 'address-list is empty'){
                // this.$toast.fail('请先添加地址')
            }else{}
            
        },
        async goodsInfo(){
            let goods = JSON.parse(localStorage.getItem('goods'))

            for(let i=0;i<goods.length;i++)
            {
                //加载图片
                let info = goods[i]
                info.product_img = null;
                let imgdata =  await  imageDb.getDataByKey(info.product_image)
                if(imgdata && imgdata.data) info.product_img = imgdata.data
                else{
                let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:info.product_image,img_kind:'open'}//,img_p:'min200'}
                    queryImg('',params).then((data)=>{
                    if(data && data.data){
                        info.product_img ='data:image/png;base64,'+data.data
                        imageDb.addData({img_id,data:info.product_img })
                    }
                    }).catch((ex)=>{
                        console.log('load img error',ex)
                    })
                }
            }
            this.data = goods
            this.img=this.$img
            this.countSum()
            // console.log(this.data)
            // console.log(goods)
        }
        // async queryOrderList(){
        //     let orderId = localStorage.getItem('orderId')
        //     console.log(orderId)
        //     let params = {
        //         user_id:localStorage.user_id,
        //         s_id: localStorage.s_id,
        //         order_id:orderId
        //     }
        //     let res = await this.$api.network.UserShoppingOrderInfo(params)
        //     console.log(res)
        //     let arr=[]
        //     arr.push(res)
        //     this.data=arr
        //     this.img=this.$img
        //     this.mun=res.total_money
        //     console.log(this.data)
        //     localStorage.setItem('goodsList',this.data)
        // }
    },
    computed: {
        
    },
    created () {
        // this.comfirmOrder();
        this.queryAddress();
        this.goodsInfo()
        this.countSum()
        // this.queryOrderList();
    },
    mounted () {
        // console.log( this.orderList[0].price*this.orderList[0].num)
    }
}
</script>
<style lang="stylus" scoped>
.content {
    // width 100%;
    // height 100%
    overflow hidden
    box-sizing border-box
    padding  15px
    padding-bottom 18px
}
.card {
    background-color #fff
    border-radius 5px
    padding 6px
    margin-bottom 10px
}
.content >>> .van-card {
    background-color #fff
    padding-left 0
    margin-left 16px
}
.orderList {
    margin-top 10px
}
.title {
     display block
    font-size: 16px
    // font-weight bolder
    margin-bottom 4px
}
.radios {
    margin 16px 0
    margin-left 14px
}
.uploadContent {
    background-color #F5F5F5
    width  20vw
    height 20vw
    text-align center
    display flex
    align-items center
    justify-content center
}
.content >>> .van-steps--horizontal {
    padding 10px 30px
}
// .content >>> .van-steps__items div:first-child .van-step__title {
//     transform translateX(-13px)
// }
// .content >>> .van-steps__items div:last-child .van-step__title {
//    transform translateX(13px)
// }
/deep/ .van-cell__value{
    flex none
    -webkit-flex none
}
/deep/ .van-button--round{
    border-radius 5px
}
/deep/ .van-field__label{
    width 40px
}
.order-card >>> .van-cell{
    padding 4px 10px 10px 10px;
}
/deep/ .van-cell::after{
    left 10px;
}
.orderList .van-card {
    margin-left 10px;
    padding 0 10px 8px 0;
}
/deep/ .van-hairline--bottom::after {
    border-bottom-width: 0px;
}
/deep/ .van-cell{
    padding 10px 10px;
}
.order-ps{
    padding 4px 10px 10px 10px;
}
.order-bz{
    padding 10px 10px 4px 10px;
}
</style>