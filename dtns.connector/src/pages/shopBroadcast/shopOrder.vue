<template>
   <MyBox title="订单管理" @back="$router.go(-1)">
       <template slot="rightContent">
           <!-- <div @click="getHuo">货架</div> -->
           <!-- <div @click="$router.push(`/shopBroadcast/putawaygoods/${$route.params.chatid}`)">货架</div> -->
       </template>
       <template slot="content">
          <div class="content">
             <van-tabs offset-top="46" v-model="active" sticky swipeable @click="onClick" title-active-color="#12acf4" color="#12acf4">
                <van-tab v-for="item of titles" :title="item.label" :name="item.value" :key="item.value" >
                   <div :style="{'height':!item.list.length?getHeight():''}" class="listContent">

                     <div class="items" v-for="(item1,index) of item.list" :key="index">
                         <div class="item" style="">
                            <div >
                                <span>下单时间:</span>
                                <span>{{item1.create_time_i | formatDate}}</span>
                            </div>
                            
                            <div >
                                <span v-if="item1.order_status == 0" style="color:#F00945">待支付</span>
                                <span v-if="item1.order_status == 1" style="color:#12acf4">待发货</span>
                                <span v-if="item1.order_status == 2" style="color:#12acf4">待收货</span>
                                <span v-if="item1.order_status == 3" style="color:#12acf4">待评价</span>
                            </div>
                        </div>
                        <!-- <div v-if="item1.order_status == 2" class="item2" style="margin-top:0;padding-top:10px;border-top:1px solid #ebedf0;">
                                <span>快递公司:</span>
                                <span>{{item1.kd_company}}</span>
                            </div>
                            <div v-if="item1.order_status == 2" class="item2" style="margin-top:0;padding-top:10px;border-top:1px solid #ebedf0;">
                                <span>快递单号:</span>
                                <span>{{item1.kd_number}}</span>
                            </div> -->
                        <div class="item" style="margin-top:0;padding-top:10px;border-top:1px solid #ebedf0;">
                            <div >
                                <span>订单号:{{item1.order_id}}</span>
                            </div>
                            <div>
                               <van-button size="mini" @click="handleSelectOrder(item1.order_id,item1.order_status)" plain style="border:1px solid #ccc;border-radius:5px;padding:0 3px 0 3px;">查看订单</van-button>
                            </div>
                        </div>
                        <div v-for="im of item1.goods" :key="im.product_id">
                           <div class=" van-hairline--top van-hairline--bottom order-cc" style="padding:10px 0">
                                <img
                                    radius="5"
                                    width="50px"
                                    height="50px"
                                    v-lazy="im.product_image"
                                />
                                <div class="order-dd">
                                    <span class="van-ellipsis title">{{im.product_ad}}</span>
                                    <div class="order-dd-aa">
                                        <div class="desc">{{im.product_desc}}</div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div class="item">
                                <div >
                                    <span class="price">合计:￥{{item1.total_money}}</span>
                                </div>
                                <div>
                                    <van-button v-if="item1.order_status == 0 || item1.order_status == 2" @click="ShoppingOrderDel(item1.order_id,item1.shop_id)" size="mini" plain class="isRed">结束订单</van-button>
                                    <van-button v-if="item1.order_status == 1" @click="ShoppingOrderSend(item1.order_id,item1.shop_id)" size="mini" plain class="isBlue">立即发货</van-button>
                                </div>
                            </div>  
                     </div>
                     <van-empty v-if="!item.list.length" description="没有更多商品" />
                   </div>
                </van-tab>
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
        return formatDate(date, 'yyyy-MM-dd hh:mm') 
      }
    },
    data () {
        return {
         active: this.$route.query.active,
         img:'',
          titles: [
              {
                  label: '所有订单',
                  value: 0,
                  list: []
              },
              {
                  label: '待支付',
                  value: 1,
                  list: []
              },
              {
                  label: '待发货',
                  value: 2,
                  list: []
              },
              {
                  label: '待收货',
                  value: 3,
                  list: []
              },
              {
                  label: '待评价',
                  value: 4,
                  list: []
              },
              {
                  label: '已完成',
                  value: 5,
                  list: []
              },
              {
                  label: '已退款',
                  value: 6,
                  list: []
              }
          ]
        }
    },
    methods: {
        getHuo(){
            let chatid = this.$route.params.chatid
            let shopid ='obj_'+chatid.split('_')[1]
            this.$router.push(`/shopBroadcast/managegoods/${shopid}/${this.$route.params.chatid}`)
        },
      onClick(name, title) {
          console.log(name,title)
      },
      getHeight () {
          let height = document.documentElement.clientHeight? document.documentElement.clientHeight: document.body.clientHeight;
          height -=90
          console.log(height)
          return height + 'px'
      },
      handleAdd () {
          console.log('添加')
      },
      handleDel () {
           console.log('删除')
      },
      async queryShopOrderList(){//获取订单列表
          let shopid = localStorage.getItem('shopid')
          let params ={
                shop_id:shopid,
                user_id:localStorage.user_id,
                s_id: localStorage.s_id,
                order_status:'all',
                begin:'1',
                len:'1000',
          }
          let res = await this.$api.network.ShoppingOrderList(params)
          console.log(res)
          console.table(res.list)
          if(res.ret){
              this.titles[0].list = res.list
        //   console.table(this.titles[0].list)
          this.img=this.$img
          let orderList = res.list
          let zfList = []
          let fhList = []
          let shList = []
          let pjList = []
          let wcList = []
          for(var i=0;i<orderList.length;i++){
              let state = orderList[i].order_status
              if(state == 0){
                    zfList.push(orderList[i])
                }else if(state == 1){
                    fhList.push(orderList[i])
                }else if(state == 2){
                    shList.push(orderList[i])
                }else if(state == 3){
                    pjList.push(orderList[i])
                }else if(state == 4){
                    wcList.push(orderList[i])
                }else{
                
                }
          }
          this.titles[2].list=fhList
          this.titles[1].list=zfList
          this.titles[3].list=shList
          this.titles[4].list=pjList
          this.titles[5].list=wcList
          console.log(this.titles[2].list);
          }else if(res.msg == 'update shopinfo no pm'){
              this.$toast.fail('你的权限不足')
              this.$router.go(-1)
          }else if(res.msg == 'order-list is empty'){
              this.$toast.fail('暂时还没有订单')
          }else{
              this.$toast.fail('获取订单列表失败')
          }
      },
      handleSelectOrder (orderId,state) {//查看订单详情
        //   console.log(orderId,state)
          this.$router.push(`/userShopDetail/${orderId}/${state}`)
      },
      async ShoppingOrderDel(orderId,shopid){//结束订单，删除订单
          let params ={
                shop_id:shopid,
                user_id:localStorage.user_id,
                s_id: localStorage.s_id,
                order_id:orderId
          }
          let res = await this.$api.network.ShoppingOrderDel(params)
          console.log(res)
          if(res.ret){
            this.$toast.success('结束订单成功')
            this.queryShopOrderList()
          }else{
              this.$toast.fail('结束订单失败')
          }
      },
      async ShoppingOrderSend(orderId,shopId){//立即发货
        this.$router.push(`/sendShop/${orderId}/${shopId}`)
      },
    },
    created(){
        this.queryShopOrderList();
    }
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
   font-weight bolder
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
    margin 12px 0
}
.item2 {
    display flex
    justify-content flex-start
    align-items center
    margin 12px 0
}
.price {
    color #F00945
    font-weight bold
}
.isBlue {
    border:1px solid #37b8f5;
    border-radius:5px;
    color:#37b8f5
    padding 0 3px 0 3px;
}
.isRed {
    border:1px solid #F00945;
    border-radius:5px;
    color:#F00945
    padding 0 3px 0 3px;
}
.isPink {
    border:1px solid #F00945;
    border-radius:5px;
    color:#F00945
    padding 0 3px 0 3px;
}
/deep/ .van-button--mini{
    min-width: 70px;
    height: 25px;
    font-size: 12px;
}
/deep/ .van-button__text{
    margin-bottom 2px;
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