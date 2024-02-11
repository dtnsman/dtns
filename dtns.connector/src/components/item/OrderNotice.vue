<template>
<div class="listContent">
    <div class="items" @click="gotoOrderList">
        <div class="item" style="border-bottom:1px solid #F5F5F5 ">
           <div >
               <span>下单时间:</span>
               <span>{{item.create_time}}</span>
           </div>
           <div >
           </div>
       </div>
       <div class="item"  @click="handleSelectOrder(item.order_id,item.order_status)">
           <div >
               <span>订单号:{{item.order_id}}（查看订单）</span>
           </div>
           <div >
              <!-- <van-button size="mini" :color="item.order_status===4?'#12ACF4':''" plain style="border:0px solid #ccc;border-radius:5px;padding:0px;">查看订单</van-button> -->
              <!-- <van-button  v-else-if="item.order_status === 1" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,item.order_status)">物流信息</van-button>
               <van-button  v-else-if="item.order_status === 2" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,item.order_status)">确认收货</van-button>
               <van-button  v-else-if="item.order_status === 3" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,item.order_status)">评价订单</van-button> -->
           </div>
       </div>
       <div class=" van-hairline--top van-hairline--bottom order-cc" style="padding:10px 0" v-for="goods in item.goods" :key="goods.product_id">
           <img
               radius="5"
               width="50px"
               height="50px"
               v-lazy="goods.product_image"
            />
           <div class="order-dd">
               <span class="van-ellipsis title">{{goods.product_ad}}</span>
               <div class="order-dd-aa">
                   <div class="desc">{{goods.product_desc}}</div>
               </div>
           </div>
       </div>
       <div class="item">
           <div >
               <span class="price">合计:￥{{item.total_money}}</span>
           </div>
           <div>
              <div v-if="item.order_status === 0">
                待付款
                   <!-- <van-button @click="deleteOrderInfo(item.order_id,item.shop_id)" size="mini" plain class="isPink" style="margin-right:10px;padding:0 5px 0 5px;">取消订单</van-button>
                   <van-button @click="shopPay(item.order_id)" size="mini" plain class="isBlue" style=";padding:0 5px 0 5px;">马上付款</van-button> -->
              </div>
              <div v-if="item.order_status === 1">待发货</div>
              <div v-if="item.order_status === 2">待收货</div>
              <div v-if="item.order_status === 3">已收货（待评价）</div>
              <div v-if="item.order_status === 4">已完成</div>
              <div v-if="item.order_status === 5">已完成订单</div>
           </div>
       </div> 
    </div>
    <div v-if="shopInfo" style="line-height: 20px;font-size: 15px;" @click="come">
        <img v-lazy="shopInfo.logo" style="width: 20px;height: 20px;"/><span style="margin-left: 5px;">{{ shopInfo.chatname }}</span>
    </div>
    <!-- <van-empty v-if="orderlist.length === 0" description="没有更多订单" /> -->
  </div>
</template>
<script>
export default {
    name: 'OrderNotice',
    components: {
      },
    props: {
        orderid:{
            type:String,
            required:false,
            default:null
        }
    },
    data() {
        return {
            errMsg:'',
            order_id:'',
            item:null,
            shopInfo:null,
        }
    },
    beforeCreate() {
    },
    async created() {
        console.log('into orderNotice.created')
        this.order_id = this.orderid
        let orderid = this.order_id
        let that = this
        
        let params = {
            user_id:localStorage.user_id,
            s_id: localStorage.s_id,
            order_id:orderid
        }
        //查询订单信息
        let res = await that.$api.network.UserShoppingOrderInfo(params)
        console.log('OrderNotice.vue---query-order-info:',res,params)
        if(!res || !res.ret || !res.shop_id) return false
        let shop_id = res.shop_id
        this.item = res
        this.item.create_time = str_filter.GetDateFormat(this.item.create_time_i)

        params = {
            user_id:localStorage.user_id,
            s_id:localStorage.s_id,   
            chatid:shop_id.replace('obj_','msg_'),
        }
        //查询根据订单的shop-id商铺信息
        let shopRet =  await that.$api.network.ChatInfo(params)
        console.log('OrderNotice.vue-chatinfo-ret:',shopRet,params)
        if(!shopRet || !shopRet.ret || !shopRet.create_user_id){
            return false
        }
        shopRet.chatid = params.chatid
        this.shopInfo = shopRet
    },
    beforeMount() {
        // this.poplang.op(null, 'beforeMount')
    },
    async mounted() {
        console.log('orderNotice-mounted...')
    },
    beforeDestroy() {
        // this.poplang.op(null, 'beforeDestroy')
    },
    destroyed() {
        // this.poplang.op(null, 'destroyed')
    },
    methods: {
        handleSelectOrder (orderId,state) {
            //   this.order_id=orderId
            console.log('OrderNotice.vue-handleSelectOrder:',orderId,state)
            this.$router.push(`/userShopDetail/${orderId}/${state}`)
            this.click_time = Date.now()
        },
        gotoShop(){
            console.log('orderNotice.vue--gotoShop:',this.shopInfo)
            this.$router.push(`/LiveBroadcast/videoChat/${this.shopInfo.chatid}/`)
        },
        gotoOrderList(){
            if(this.click_time && Date.now()- this.click_time <1000){
                return 
            }
            let url = '/shopBroadcast/shopOrder/'+this.shopInfo.shop_id
            console.log('orderNotice-gotoOrderList:',url)
            localStorage.setItem('shopid',this.shopInfo.shop_id)
            this.$router.push(url)
        },
        //跳转进入聊天室（店铺）
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
    },
}
</script>

<style lang="stylus" scoped>
.listContent {
    box-sizing border-box
    padding-bottom 20px
    font-size 13px
 //    color: #505050
 //    font-weight bolder
 }
 .items {
     box-sizing border-box
     background-color #fff
     padding 0 15px
     padding-bottom 0
     margin-bottom 10px
     border-radius 5px
     display flex
     flex-flow column
    
 }
 .items:last-child {
      margin-bottom 0
 }
 .item {
     display flex
     justify-content space-between
     align-items center
     padding 12px 0
 }
 .price {
     color #F00945
     font-weight bold
 }
 .isBlue {
     border:1px solid #37b8f5;
     border-radius:5px;
     color:#37b8f5
 }
 .isPink {
     border:1px solid #F00945;
     border-radius:5px;
     color:#F00945
 }
 .order-cc{
     display flex
     width 100%
     justify-content space-between
 }
 .order-dd{
     width 80%
     overflow: hidden;
     min-width 0
     height 54px
     padding-left: 6px;
 }
 .order-dd-aa{
     min-width: 0;
     text-overflow: ellipsis;
     overflow: hidden;
     -webkit-line-clamp: 2;
     height 40px
 }
 .desc{
     height 40px
 }
</style>
