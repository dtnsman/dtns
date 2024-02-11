<template>
   <MyBox title="订单详情" @back="$router.go(-1)">
       <template slot="content">
           <div class="content">
                <div class="card address">
                    <van-steps :active="state"  active-color="#12ACF4">
                        <van-step>待支付</van-step>
                        <van-step>待发货</van-step>
                        <van-step>待收货</van-step>
                        <van-step>待评价</van-step>
                        <van-step>已完成</van-step>
                    </van-steps>
                    <!-- <van-cell-group> -->
                    <van-cell v-if="state == 0" :title="'订单号: '+num" icon="location-o" :center="true">
                        <template #icon>
                            <svg style="padding-right:8px" t="1590801779432" class="icon" viewBox="0 0 1398 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2963" width="20" height="20"><path d="M554.869356 791.651293a118.510673 118.510673 0 0 1 9.480853 56.885123v9.480854h317.608603v-9.480854a237.021345 237.021345 0 0 1 9.480854-56.885123z" p-id="2964"></path><path d="M1057.354608 1023.932212a170.655369 170.655369 0 0 1-175.395796-175.395796 175.395796 175.395796 0 0 1 175.395796-175.395795 180.136222 180.136222 0 0 1 175.395795 175.395795 175.395796 175.395796 0 0 1-175.395795 175.395796z m0-284.425615a109.029819 109.029819 0 1 0 0 218.059638 109.029819 109.029819 0 1 0 0-218.059638zM388.954414 1023.932212a175.395796 175.395796 0 0 1-175.395796-175.395796 180.136222 180.136222 0 0 1 175.395796-175.395795 175.395796 175.395796 0 0 1 175.395795 175.395795 170.655369 170.655369 0 0 1-175.395795 175.395796z m0-284.425615a109.029819 109.029819 0 1 0 0 218.059638 109.029819 109.029819 0 1 0 0-218.059638z" p-id="2965"></path><path d="M1365.482357 0h-900.681113a33.182988 33.182988 0 0 0-33.182988 33.182988v365.012872h-189.617076L14.460688 554.629948a28.442561 28.442561 0 0 0-14.221281 28.442562v241.761772a33.182988 33.182988 0 0 0 33.182989 33.182988h184.876649a14.221281 14.221281 0 0 1-4.740427-9.480854 237.021345 237.021345 0 0 1 9.480854-56.885123H66.605384v-194.357503l203.838357-132.731953h161.174515v213.319211a175.395796 175.395796 0 0 1 66.365977 33.182988V66.365977h834.315135v725.285316h-109.029819a237.021345 237.021345 0 0 1 9.480854 56.885123v9.480854h132.731954a33.182988 33.182988 0 0 0 33.182988-33.182988V33.182988a33.182988 33.182988 0 0 0-33.182988-33.182988z" p-id="2966"></path></svg>
                        </template>
                    </van-cell>
                    <van-cell v-else :title="'快递单号: '+kd_number" icon="location-o" :center="true">
                        <template #icon>
                            <svg style="padding-right:8px" t="1590801779432" class="icon" viewBox="0 0 1398 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2963" width="20" height="20"><path d="M554.869356 791.651293a118.510673 118.510673 0 0 1 9.480853 56.885123v9.480854h317.608603v-9.480854a237.021345 237.021345 0 0 1 9.480854-56.885123z" p-id="2964"></path><path d="M1057.354608 1023.932212a170.655369 170.655369 0 0 1-175.395796-175.395796 175.395796 175.395796 0 0 1 175.395796-175.395795 180.136222 180.136222 0 0 1 175.395795 175.395795 175.395796 175.395796 0 0 1-175.395795 175.395796z m0-284.425615a109.029819 109.029819 0 1 0 0 218.059638 109.029819 109.029819 0 1 0 0-218.059638zM388.954414 1023.932212a175.395796 175.395796 0 0 1-175.395796-175.395796 180.136222 180.136222 0 0 1 175.395796-175.395795 175.395796 175.395796 0 0 1 175.395795 175.395795 170.655369 170.655369 0 0 1-175.395795 175.395796z m0-284.425615a109.029819 109.029819 0 1 0 0 218.059638 109.029819 109.029819 0 1 0 0-218.059638z" p-id="2965"></path><path d="M1365.482357 0h-900.681113a33.182988 33.182988 0 0 0-33.182988 33.182988v365.012872h-189.617076L14.460688 554.629948a28.442561 28.442561 0 0 0-14.221281 28.442562v241.761772a33.182988 33.182988 0 0 0 33.182989 33.182988h184.876649a14.221281 14.221281 0 0 1-4.740427-9.480854 237.021345 237.021345 0 0 1 9.480854-56.885123H66.605384v-194.357503l203.838357-132.731953h161.174515v213.319211a175.395796 175.395796 0 0 1 66.365977 33.182988V66.365977h834.315135v725.285316h-109.029819a237.021345 237.021345 0 0 1 9.480854 56.885123v9.480854h132.731954a33.182988 33.182988 0 0 0 33.182988-33.182988V33.182988a33.182988 33.182988 0 0 0-33.182988-33.182988z" p-id="2966"></path></svg>
                        </template>
                    </van-cell>
                    <van-cell v-if="state == 0" @click="userAddress" :title="zfAddress.name+' '+zfAddress.phone" icon="location-o" :center="true"
                     :label="zfAddress.address"
                     >
                        <template #icon>
                            <svg style="padding-right:8px" t="1590801901330" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3208" width="20" height="20"><path d="M512 232.269512a160.060264 160.060264 0 1 0 160.060264 159.845993A160.274534 160.274534 0 0 0 512 232.269512z m0 277.052103a117.20611 117.20611 0 1 1 117.20611-117.20611A117.20611 117.20611 0 0 1 512 509.321615z" p-id="3209"></path><path d="M512 0A407.114459 407.114459 0 0 0 104.885541 407.114459c0 219.627537 376.259469 586.887633 392.115505 602.315129l14.998954 14.570412 14.998954-14.570412C542.854991 994.002092 919.114459 626.741996 919.114459 407.114459A407.114459 407.114459 0 0 0 512 0z m0 964.218456C441.719188 892.86629 147.739694 585.387738 147.739694 407.114459a364.260306 364.260306 0 0 1 728.520612 0c0 178.273279-293.979494 485.751831-364.260306 557.103997z" p-id="3210"></path></svg>
                        </template>
                        <svg t="1592039187607" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3612" width="10" height="10"><path d="M667.137993 512.122192L270.535221 69.645282A41.703762 41.703762 0 0 1 332.256788 13.762241l420.373916 468.75028v2.919264a41.703762 41.703762 0 0 1 0 54.631927L333.924938 1008.396955a41.703762 41.703762 0 1 1-62.138605-55.466003z" p-id="3613"></path></svg>
                    </van-cell>
                    <van-cell v-else :title="name+' '+phone" icon="location-o" :center="true"
                     :label="address"
                     >
                        <template #icon>
                            <svg style="padding-right:8px" t="1590801901330" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3208" width="20" height="20"><path d="M512 232.269512a160.060264 160.060264 0 1 0 160.060264 159.845993A160.274534 160.274534 0 0 0 512 232.269512z m0 277.052103a117.20611 117.20611 0 1 1 117.20611-117.20611A117.20611 117.20611 0 0 1 512 509.321615z" p-id="3209"></path><path d="M512 0A407.114459 407.114459 0 0 0 104.885541 407.114459c0 219.627537 376.259469 586.887633 392.115505 602.315129l14.998954 14.570412 14.998954-14.570412C542.854991 994.002092 919.114459 626.741996 919.114459 407.114459A407.114459 407.114459 0 0 0 512 0z m0 964.218456C441.719188 892.86629 147.739694 585.387738 147.739694 407.114459a364.260306 364.260306 0 0 1 728.520612 0c0 178.273279-293.979494 485.751831-364.260306 557.103997z" p-id="3210"></path></svg>
                        </template>
                    </van-cell>
                </div>
                <div v-if="shopInfo" class="card" @click="come">
                    <van-cell title="小店信息" style="font-size:15px;font-weight:bold" class="order-title"></van-cell>
                    <div style="line-height: 20px;font-size: 15px;padding: 10px;">
                        <img v-lazy="shopInfo.logo" style="width: 20px;height: 20px;"/><span style="margin-left: 5px;">{{ shopInfo.chatname }}</span>
                    </div>
                </div>
                <div class="card">
                    <!-- <div class="van-hairline--bottom" style="padding:10px 0;font-size:14px">商品信息</div> -->
                    <van-cell title="商品信息" style="font-size:15px;font-weight:bold" class="order-title"></van-cell>
                    <div class="orderList">
                        <div class="orderList" @click="shopOrder(item.product_id)" v-for="(item, index) in data" :key="index">
                        <van-card
                        class="van-hairline--bottom"
                        :num="item.number"
                        :price="item.product_price"
                        :desc="item.product_desc"
                        :title="item.product_ad"
                        :thumb="item.product_img"
                        >
                            <template slot="price">
                                ×{{item.number}}
                            </template>
                             <template slot="num">
                                <span style="color:#000">￥{{item.product_price}}</span>
                            </template>
                             <template slot="title">
                            <span class="van-ellipsis title">{{item.product_ad}}</span>
                            </template>
                            <template slot="desc">
                                <div class="van-multi-ellipsis--l2 desc">
                                    {{item.product_desc}}
                                </div>
                            </template>
                        </van-card>
                    </div>
                        <div style="width:100%">
                            <!-- 待收货特有 -->
                            <div style="display:flex;justify-content:flex-end;margin:15px 10px 0 0" v-if="state == 2">
                                <van-button @click="uprecvOrder(orderId,state)" color="#12ACF4" plain="" size="small"  style="border-radius:5px">确认收货</van-button>
                            </div>
                            <!-- 评价页面特有的 -->
                            <div v-if="state == 3">
                                <!-- 评价 -->
                               <div>
                                    <div>
                                        <van-cell title="评价" style="font-size:16px"></van-cell>
                                    </div>
                                    <div class="radios">
                                        <van-radio-group v-model="radio"  direction="horizontal"> 
                                            <van-radio name="3" checked-color="#07c160">好评</van-radio>
                                            <van-radio name="2" checked-color="#07c160">中评</van-radio>
                                            <van-radio name="1" checked-color="#07c160">差评</van-radio>
                                        </van-radio-group>
                                    </div>
                               </div>
                               <div>
                                    <div>
                                        <div>
                                        <van-cell title="评论" style="font-size:16px"></van-cell>
                                       </div>
                                        <div style="border:1px solid #e8e8e8;border-radius:5px;padding:5px;margin: 0 13px">
                                          <van-field
                                                v-model="evaluate"
                                                rows="3"
                                                :autosize="{maxHeight: 60}"
                                                :border="false"
                                                type="textarea"
                                                placeholder="请输入评论"
                                            />
                                            <van-uploader>
                                                 <div class="uploadContent">
                                                    <van-icon name="plus" color="#929292" />
                                                 </div>
                                            </van-uploader>
                                        </div>
                                          <div style="text-align:center;margin: 14px 0">
                                                <van-button plain color="#12ACF4" @click="handpingjia" size="small" style="border-radius:5px">提交评价</van-button>
                                            </div>
                                    </div>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" v-if="state != 3">
                    <van-cell title="订单信息" style="font-size:15px;font-weight:bold"></van-cell>
                    <van-cell title="商品金额" :value="'￥'+mun"></van-cell>
                    <van-cell title="运费" :value="'包邮'"></van-cell>
                    <!-- <van-cell title="运费" :value="'+￥'+freight"></van-cell> -->
                    <van-cell title="总额" :value="'￥'+mun"></van-cell>
               
                </div>
                <div class="card" v-if="state == 0" style="margin-bottom:50px">
                     <van-cell title="配送方式" value="包邮"></van-cell>
                      <van-field v-model="remark" label="备注:" placeholder="如需备注，请输入" />
                </div>
                 <!-- <van-submit-bar v-if="state == 0"  :price="(mun+freight)*100" button-text="提交订单" @submit="onSubmit" /> -->
                 <van-submit-bar :price="mun*100" v-if="state == 0 && is_me" button-text="立即支付" @submit="onSubmit" />
           </div>
       </template>
   </MyBox>
</template>
<script>
export default {
    props: {
        orderId: '',
        state: ''
    },
    data () {
        return {
            isShowBottom: true,
            ///当前步骤
            // active: '',
            product_id:'',
            address: '',
            num: '',
            name: '',
            phone:'',
            mun:'',
            kd_number:'',
            data:'',
            zfAddress:{
                address:'',
                name:'',
                phone:'',
                num:''
            },
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
            remark:'',
            orderUserList:[],
            shopInfo:null,
            is_me:true
        }
    },
    created () {
        // this.orderInfo();
        // this.defaultAddress();
        // this.orderInfo();
        // this.countmun();
        this.queryOrderinfo();
        this.takeAddrss();
    },
    methods: {
        async onSubmit(){ //支付订单
          let random = Math.random()
          let params ={
                user_id:localStorage.user_id,
                s_id: localStorage.s_id,
                order_id:this.orderId,
                random:random
          }
          let res = await this.$api.network.UserShoppingOrderPay(params)
          if(res.ret == true){
              this.$toast.success('付款成功')
            //   this.activeName = '1'
            //   this.name = '1'
              this.active=1
              this.$router.push({path:"/userOrder",query:{activeName:'1'}})

              //2023-10-18 自动发送【私信通知】至【店长】
            let sendNoticeRet =await g_dchatManager.sendOrderNotice(this.orderId,'我已付款成功！',this)
            console.log('userOrder.vue-sendSuccessedNoticeRet:',sendNoticeRet)
          }else{
            this.$toast.fail('付款失败，余额不足！')

            let sendNoticeRet =await g_dchatManager.sendOrderNotice(this.orderId,'我付款失败：余额不足！',this)
            console.log('userOrder.vue-sendFailedNoticeRet:',sendNoticeRet)
          }
          console.log(res)
        },
        async uprecvOrder(orderid){//确定收货
            let shopid = JSON.parse(localStorage.getItem('shopid'))
            let params = {
                shop_id:shopid,
                user_id:localStorage.user_id,
                s_id: localStorage.s_id,
                order_id:orderid
            }
            let res = await this.$api.network.UserShoppingOrderRecv(params)
            console.log(res)
            if(res.ret){
                this.$toast.success('收货成功')
                this.$router.push({path:"/userOrder",query:{activeName:'3'}})
            }else{
                this.$toast.fail('收货失败')
            }
        },
        async handpingjia(){//评价订单
          let shopid = this.orderUserList.shop_id
          let orderId = this.orderUserList.order_id
          let params ={
                user_id:localStorage.user_id,
                shop_id:shopid,
                s_id: localStorage.s_id,
                order_id:orderId,
                rank:this.radio,
                comment:this.evaluate,
          }
          let res = await this.$api.network.UserShoppingOrderComment(params)
          console.log(res)
          if(res.ret){
              this.$toast.success('评价成功')
              this.$router.push({path:"/userOrder",query:{activeName:'4'}})
          }else{
              this.$toast.fail('评价失败')
          }
      },
        shopOrder(product_id){
            this.$router.push(`/shopDetail/${product_id}`)
        },
        userAddress(){
            this.$router.push({path:"/userAddress"})
        },
        async takeAddrss(){//获取地址
            let paramss = {
                user_id:localStorage.user_id,
                s_id: localStorage.s_id,
                begin:'1',
                len:'10'
            }
            let ress = await this.$api.network.queryAddressList(paramss)
            console.log(ress)
            if(ress.ret){
                this.zfAddress.address=ress.list[0].province+ress.list[0].city+ress.list[0].district+ress.list[0].address_detail,
                this.zfAddress.num=ress.list[0].mail_code,
                this.zfAddress.name=ress.list[0].user_name,
                this.zfAddress.phone=ress.list[0].phone
            }else{
                // this.$toast.fail('获取地址失败')
            }
            
        },
        async queryOrderinfo(){//查询订单信息
            console.log(this.orderId)
            let params = {
                user_id:localStorage.user_id,
                s_id: localStorage.s_id,
                order_id:this.orderId
            }
            let res = await this.$api.network.UserShoppingOrderInfo(params)
            console.log('query-order-info:',res)
            this.orderUserList = res
            if(res.ret){
                this.img=this.$img
                this.address=res.address_info.province+res.address_info.city+res.address_info.district+res.address_info.address_detail,
                this.num=res.order_id,
                this.name=res.address_info.user_name,
                this.phone=res.address_info.phone,
                this.mun=res.total_money
                res.list = res.goods
                for(let i=0;i<res.list.length;i++)
                {
                  //加载图片
                  let info = res.list[i]
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
                this.data=res.goods
                this.remark = res.note
                this.kd_number = res.kd_number
                this.is_me = res.user_id == localStorage.user_id
                console.log('userShopDetail.vue-order-info---is_me:',this.is_me)


                let shop_id = res.shop_id
                let params = {
                    user_id:localStorage.user_id,
                    s_id:localStorage.s_id,   
                    chatid:shop_id.replace('obj_','msg_'),
                }
                //查询根据订单的shop-id商铺信息
                let shopRet =  await this.$api.network.ChatInfo(params)
                console.log('userShopDetail.vue-chatinfo-ret:',shopRet,params)
                if(!shopRet || !shopRet.ret || !shopRet.create_user_id){
                    return false
                }
                shopRet.chatid = params.chatid
                this.shopInfo = shopRet
            }else{
                this.$toast.fail('获取失败')
            }
            
        },
        async come(item = null) 
        {
          item = this.shopInfo
          console.log('orderNotice.vue-come:',item)
          item.title = this.shopInfo.chatname

          let shop_id = item.shop_id
          localStorage.setItem('shopid',shop_id)
          let chatname = item.title
          localStorage.setItem("chatname",chatname)

          let random = Math.random()
          let params = {
            user_id:localStorage.user_id,
            s_id:localStorage.s_id,   
            chatid:item.chatid,
            random,
          }
          let res =  await this.$api.network.Chatjoin(params)
          console.log('orderNotice.vue:这是加入群聊',res)
          if(!res || !res.ret)
          {
              this.$toast.fail('加入失败:' + res.msg)
              return 
          }

          // imDb.addData({key:item.token_y,data:item})
          if(item.chat_type =='group_live' || item.chat_type == "group_shop"){
            this.$router.push(`/LiveBroadcast/videoChat/${item.chatid}`)
          }
          else{
            this.$router.push(`/index/chat/${item.chatid}`)
          }
        },
        async UserShoppingRecv(){
          
          
      }
    },
    computed: {
        // countPrice () {
        //     if (this.orderList.length == 1) {
        //         return this.orderList[0].price*this.orderList[0].num
        //    }
        //     return this.orderList.reduce((a,b)=> {
        //          return a.price*a.num +b.price*b.num
        //     })
        // }
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
    padding 10px 15px 0px 15px
}
.content >>> .van-steps__items div:first-child .van-step__title {
    transform translateX(-13px)
}
.content >>> .van-steps__items div:last-child .van-step__title {
   transform translateX(13px)
}
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