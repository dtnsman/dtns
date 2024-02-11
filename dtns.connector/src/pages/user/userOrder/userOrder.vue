<template>
   <MyBox title="订单管理" @back="$router.go(-1)">
       <!-- <template slot="rightContent">
           <div @click="$router.push(`/shopBroadcast/putawaygoods/${$route.params.chatid}`)">货架</div>
       </template> -->
       
       <template slot="content">
          <div class="content">
              <van-tabs v-model="activeName" @click="onClick" title-active-color="#12acf4" color="#12acf4">
                <van-tab  title="待支付" name="0">
                   <div class="listContent" v-for="(item,j) in orderlist" :key="j">
                     <div class="items">
                         <div class="item" style="border-bottom:1px solid #F5F5F5 ">
                            <div >
                                <span>下单时间:</span>
                                <span>{{item.create_time_i | formatDate}}</span>
                            </div>
                            <div >
                            </div>
                        </div>
                        <div class="item">
                            <div >
                                <span>订单号:{{item.order_id}}</span>
                            </div>
                            <div >
                               <van-button size="mini" :color="item.order_status===4?'#12ACF4':''" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,item.order_status)">查看订单</van-button>
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
                                    <van-button @click="deleteOrderInfo(item.order_id,item.shop_id)" size="mini" plain class="isPink" style="margin-right:10px;padding:0 5px 0 5px;">取消订单</van-button>
                                    <van-button @click="shopPay(item.order_id)" size="mini" plain class="isBlue" style=";padding:0 5px 0 5px;">马上付款</van-button>
                               </div>
                            </div>
                        </div> 
                     </div>
                     <!-- <van-empty v-if="orderlist.length === 0" description="没有更多订单" /> -->
                   </div>
                </van-tab>
                <van-tab title="待发货" name="1">
                    <div class="listContent" v-for="(item,k) in sendlist" :key="k">
                     <div class="items">
                         <div class="item" style="border-bottom:1px solid #F5F5F5 ">
                            <div >
                                <span>下单时间:</span>
                                <span>{{item.create_time_i | formatDate}}</span>
                            </div>
                            <div >
                            </div>
                        </div>
                        <div class="item">
                            <div >
                                <span>订单号:{{item.order_id}}</span>
                            </div>
                            <div >
                               <!-- <van-button v-if="item.order_status === 0 || item.order_status === 4" size="mini" :color="item.order_status===4?'#12ACF4':''" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.id,item.order_status)">查看订单</van-button> -->
                               <van-button  color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handlewlOrder(item.order_id,name)">物流信息</van-button>
                                <!-- <van-button  v-else-if="item.order_status === 2" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,item.order_status)">确认收货</van-button> -->
                                <!-- <van-button  v-else-if="item.order_status === 3" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,item.order_status)">评价订单</van-button> -->
                            </div>
                        </div>
                        <div class=" van-hairline--top van-hairline--bottom order-cc" style="padding:10px 0" v-for="goods in item.goods" :key="goods.product_id">
                            <van-image
                                radius="5"
                                width="50px"
                                height="50px"
                                :src="img+goods.product_image"
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
                            <!-- <div>
                               <div v-if="item.order_status === 0">
                                    <van-button size="mini" plain class="isPink" style="margin-right:10px;padding:0 5px 0 5px;">取消订单</van-button>
                                    <van-button @click="shopPay" size="mini" plain class="isBlue" style=";padding:0 5px 0 5px;">马上付款</van-button>
                               </div>
                            </div> -->
                        </div> 
                     </div>
                     <!-- <van-empty v-if="sendlist.length === 0" description="没有更多订单" /> -->
                   </div>
                </van-tab>
                <van-tab title="待收货" name="2">
                    <div class="listContent" v-for="(item,i) in collectlist" :key="i">
                     <div class="items">
                         <div class="item" style="border-bottom:1px solid #F5F5F5 ">
                            <div >
                                <span>下单时间:</span>
                                <span>{{item.create_time_i | formatDate}}</span>
                            </div>
                            <div >
                            </div>
                        </div>
                        <div class="item">
                            <div >
                                <span>订单号:{{item.order_id}}</span>
                            </div>
                            <div >
                               <van-button size="mini" :color="item.order_status===4?'#12ACF4':''" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,name)">查看订单</van-button>
                               <!-- <van-button  v-else-if="item.order_status === 1" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,item.order_status)">物流信息</van-button> -->
                                <!-- <van-button  color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handevaOrder(item.order_id,item.shop_id)">确认收货</van-button> -->
                                <!-- <van-button  v-else-if="item.order_status === 3" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,item.order_status)">评价订单</van-button> -->
                            </div>
                        </div>
                        <div class=" van-hairline--top van-hairline--bottom order-cc" style="padding:10px 0" v-for="goods in item.goods" :key="goods.product_id">
                            <van-image
                                radius="5"
                                width="50px"
                                height="50px"
                                :src="img+goods.product_image"
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
                               <div>
                                    <van-button @click="handevaOrder(item.order_id,item.shop_id)" size="mini" plain class="isBlue" style=";padding:0 5px 0 5px;">确认收货</van-button>
                               </div>
                            </div>
                        </div> 
                     </div>
                     <van-empty v-if="collectlist.length === 0" description="没有更多订单" />
                   </div>
                </van-tab>
                <van-tab title="待评价" name="3">
                    <div class="listContent" v-for="(item,index1) in evalist" :key="index1">
                     <div class="items">
                         <div class="item" style="border-bottom:1px solid #F5F5F5 ">
                            <div >
                                <span>下单时间:</span>
                                <span>{{item.create_time_i | formatDate}}</span>
                            </div>
                            <div >
                            </div>
                        </div>
                        <div class="item">
                            <div >
                                <span>订单号:{{item.order_id}}</span>
                            </div>
                            <div >
                               <!-- <van-button v-if="item.order_status === 0 || item.order_status === 4" size="mini" :color="item.order_status===4?'#12ACF4':''" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.id,item.order_status)">查看订单</van-button> -->
                               <!-- <van-button  v-else-if="item.order_status === 1" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,item.order_status)">物流信息</van-button> -->
                                <!-- <van-button  v-else-if="item.order_status === 2" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,item.order_status)">确认收货</van-button> -->
                                <van-button color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,name)">评价订单</van-button>
                            </div>
                        </div>
                        <div class=" van-hairline--top van-hairline--bottom order-cc" style="padding:10px 0" v-for="goods in item.goods" :key="goods.product_id">
                            <van-image
                                radius="5"
                                width="50px"
                                height="50px"
                                :src="img+goods.product_image"
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
                        </div> 
                     </div>
                     <van-empty v-if="evalist.length === 0" description="没有更多订单" />
                   </div>
                </van-tab>
                <van-tab title="已完成" name="4">
                    <div class="listContent" v-for="(item,index) in finishlist" :key="index">
                     <div class="items">
                         <div class="item" style="border-bottom:1px solid #F5F5F5 ">
                            <div >
                                <span>下单时间:</span>
                                <span>{{item.create_time_i | formatDate}}</span>
                            </div>
                            <div >
                            </div>
                        </div>
                        <div class="item">
                            <div >
                                <span>订单号:{{item.order_id}}</span>
                            </div>
                            <div >
                               <van-button size="mini" :color="item.order_status===4?'#12ACF4':''" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handlefinsOrder(item.order_id,item.order_status)">查看订单</van-button>
                               <!-- <van-button  v-else-if="item.order_status === 1" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,item.order_status)">物流信息</van-button> -->
                                <!-- <van-button  v-else-if="item.order_status === 2" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,item.order_status)">确认收货</van-button> -->
                                <!-- <van-button  v-else-if="item.order_status === 3" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item.order_id,item.order_status)">评价订单</van-button> -->
                            </div>
                        </div>
                        <div class=" van-hairline--top van-hairline--bottom order-cc" style="padding:10px 0" v-for="goods in item.goods" :key="goods.product_id">
                            <van-image
                                radius="5"
                                width="50px"
                                height="50px"
                                :src="img+goods.product_image"
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
                        </div> 
                     </div>
                     <van-empty v-if="finishlist.length == 0" description="没有更多订单" />
                   </div>
                </van-tab>
                <van-empty description="没有更多订单" />
            </van-tabs>
          </div>
       </template>
   </MyBox>
</template>
<script>

import {formatDate} from '@/common/date.js'
export default {
    filters: {
      formatDate(time) {
        time = time * 1000
        let date = new Date(time)
        // console.log(new Date(time))
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    data () {
        return {
         activeName: this.$route.query.activeName,
         value:this.$route.query.value,
        //  orderlist:{
        //     create_time_i: '',
        //     goods: [],
        //     order_id: '',
        //     order_status: '',
        //     price: '',
        //     user_id: "",
        //     img:'',
        //  },
         name:'0',
         img:'',
        //  status:'',
         order_id:'',
         goodslist:[],
         orderlist:[],//待支付
         sendlist:[],//待发货
         collectlist:[],//待收货
         evalist:[],//待评价
         finishlist:[],//已完成

        }
    },
    
    methods: {
      onClick(name, title) {
          this.name = name
          console.log(this.name)
          console.log(name,title)
      },
      async shopPay(orderid){ //支付订单
          let random = Math.random()
          let params ={
                user_id:localStorage.user_id,
                s_id: localStorage.s_id,
                order_id:orderid,
                random:random
          }
          let res = await this.$api.network.UserShoppingOrderPay(params)
          if(res.ret == true){
            this.$toast.success('付款成功')
            this.activeName = '1'
            this.name = '1'
            this.UserShoppingOrderList();

            //2023-10-18 自动发送【私信通知】至【店长】
            let sendNoticeRet =await g_dchatManager.sendOrderNotice(orderid,'我已付款成功！',this)
            console.log('userOrder.vue-sendSuccessedNoticeRet:',sendNoticeRet)
          }else{
            let sendNoticeRet =await g_dchatManager.sendOrderNotice(orderid,'我付款失败：余额不足！',this)
            console.log('userOrder.vue-sendFailedNoticeRet:',sendNoticeRet)

              this.$toast.fail('付款失败，余额不足！')
          }
          console.log(res)
      },
      ///获取高度
      getHeight () {
          let height = document.documentElement.clientHeight? document.documentElement.clientHeight: document.body.clientHeight;
          height -=90
          console.log(height)
          return height + 'px'
      },
    ///查看订单详情
      handleSelectOrder (orderId,state) {
        //   this.order_id=orderId
          this.$router.push(`/userShopDetail/${orderId}/${state}`)
      },
      handlefinsOrder (orderId,state) {
        //   this.order_id=orderId
        console.log(orderId,state);
          this.$router.push(`/userShopDetail/${orderId}/${state}`)
      },
      handlewlOrder (orderId,state) {
        //   this.order_id=orderId
          this.$router.push(`/userShopDetail/${orderId}/${state}`)
      },
      async handevaOrder(orderId,shopid){//确认收货
          let params ={
                user_id:localStorage.user_id,
                shop_id:shopid,
                s_id: localStorage.s_id,
                order_id:orderId,
          }
          let res = await this.$api.network.UserShoppingOrderRecv(params)
          console.log(res)
          if(res.ret){
              this.$toast.success('收货成功')
              this.UserShoppingOrderList();
              this.activeName = '3'
              this.name = '3'
          }else{
              this.$toast.fail('收货失败')
          }
      },
      hesdOrder(){
          let orderShuz = JSON.parse(localStorage.getItem('orderShuz'))
          console.log(orderShuz)
          let order_status = orderShuz.order_status
          let goodsList=orderShuz.goods
            this.orderlist=orderShuz
            this.status=orderShuz.order_status,
            this.img=this.$img
            console.log(this.orderlist)
      },
    
      async deleteOrderInfo(orderid,shopid){//删除订单
          let params ={
                user_id:localStorage.user_id,
                shop_id:shopid,
                s_id: localStorage.s_id,
                order_id:orderid,
          }
          let res = await this.$api.network.UserShoppingOrderDel(params)
          console.log(res)
          if(res.ret){
              this.$toast.success('成功取消订单')
              this.UserShoppingOrderList();
          }else{
              this.$toast.fail('取消订单失败')
          }
          
      },
    //   async queryOrders(){//查询用户订单清单
    //     //   let shopid = JSON.parse(localStorage.getItem('shopid'))
    //       let params ={
    //             user_id:localStorage.user_id,
    //             s_id: localStorage.s_id,
    //             begin:'1',
    //             len:'10',
    //       }
    //       let res = await this.$api.network.queryOrders(params)
    //     //   console.log(res)
    //       this.img=this.$img
    //     //   this.sendlist = res.list
    //   },
      async UserShoppingOrderList(){//查询用户订单清单
        //   let shopid = JSON.parse(localStorage.getItem('shopid'))
          let params ={
                user_id:localStorage.user_id,
                s_id: localStorage.s_id,
                begin:0,
                len:1000,
          }
          let res = await this.$api.network.UserShoppingOrderList(params)
        //   console.table(res.list)
          console.log('query-user-order-list:',res)
          this.img=this.$img
          if(res.ret){
              let orderUserList = res.list
              for(var i=0;i<orderUserList.length;i++){
                  let orderStatus = orderUserList[i].order_status
                  if(orderStatus == 0){
                      this.orderlist.push(orderUserList[i])
                  }else if(orderStatus == 1){
                      this.sendlist.push(orderUserList[i])
                  }else if(orderStatus == 2){
                      this.collectlist.push(orderUserList[i])
                  }else if(orderStatus == 3){
                      this.evalist.push(orderUserList[i])
                  }else if(orderStatus == 4){
                      this.finishlist.push(orderUserList[i])
                  }
              }
          }else if(res.msg == 'order-list is empty'){
              this.$toast.fail('你还没有订单')
          }else(
              this.$toast.fail('获取订单失败')
          )
      },
    },
    created(){
        this.UserShoppingOrderList();
    },
}
</script>
<style lang="stylus" scoped>
.content {
    box-sizing border-box
    background-color #f5f5f5
    
}
.listContent {
   box-sizing border-box
   padding 15px
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