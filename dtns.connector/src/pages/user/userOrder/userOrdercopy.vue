<template>
   <MyBox title="订单管理" @back="$router.go(-1)">
       <!-- <template slot="rightContent">
           <div @click="$router.push(`/shopBroadcast/putawaygoods/${$route.params.chatid}`)">货架</div>
       </template> -->
       <template slot="content">
          <div class="content">
             <van-tabs offset-top="46" v-model="active" sticky swipeable @click="onClick" title-active-color="#12acf4" color="#12acf4">
                <van-tab v-for="item of titles" :title="item.label" :name="item.value" :key="item.value" >
                   <div :style="{'height':!item.list.length?getHeight():''}" class="listContent">

                     <div class="items" v-for="(item1,index) of item.list" :key="index">
                         <div class="item" style="border-bottom:1px solid #F5F5F5 ">
                            <div >
                                <span>下单时间:</span>
                                <span>{{item1.time}}</span>
                            </div>
                            <div >
                                <!-- <span style="color:#f88ba7">待支付</span> -->
                            </div>
                        </div>
                        <div class="item">
                            <div >
                                <span>订单号:{{item1.id}}</span>
                                <!-- <span>{{item1.time}}</span> -->
                            </div>
                            <div >
                               <van-button v-if="item.value === 0 || item.value === 4" size="mini" :color="item.value===4?'#12ACF4':''" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item1.id,item.value)">查看订单</van-button>
                               <van-button  v-else-if="item.value === 1" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item1.id,item.value)">物流信息</van-button>
                                <van-button  v-else-if="item.value === 2" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item1.id,item.value)">确认收货</van-button>
                                <van-button  v-else-if="item.value === 3" color="#12ADF5" size="mini" plain style="border:1px solid #ccc;border-radius:5px;padding:0 5px 0 5px;" @click="handleSelectOrder(item1.id,item.value)">评价订单</van-button>
                            </div>
                        </div>
                        <div class=" van-hairline--top van-hairline--bottom" style="padding:10px 0">
                            <van-image
                                radius="5"
                                width="50px"
                                height="50px"
                                src="https://img.yzcdn.cn/vant/cat.jpeg"
                             />
                        </div>
                        <div class="item">
                            <div >
                                <span class="price">合计:￥{{item1.price}}</span>
                            </div>
                            <div>
                                <!-- {{item1.state}} -->
                               <div v-if="item.value === 0">
                                    <van-button size="mini" plain class="isPink" style="margin-right:10px;padding:0 5px 0 5px;">取消订单</van-button>
                                    <van-button size="mini" plain class="isBlue" style=";padding:0 5px 0 5px;">马上付款</van-button>
                               </div>
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
export default {
    data () {
        return {
         active: 0,
        //  label:['待付款','待发货','待收货','待评价','已完成'],
          titles: [
              {
                  label: '待付款',
                  value: 0,
                //   假设0是待付款订单，1是待发货订单 2是待收货订单 3是待评价订单
                  list: [
                      {
                          id: '123456',
                          time: '2019-06-13 12:17',
                          price:58,
                          imgUrl: '',
                        
                      },
                       
                  ]
              },
              {
                  label: '待发货',
                  value: 1,
                  list: [
                       {
                          id: '123456',
                          time: '2019-06-13 12:17',
                          price:58,
                          imgUrl: '',
                        
                      },
                       
                  ]
              },
              {
                  label: '待收货',
                  value: 2,
                  list: [
                       {
                          id: '123456',
                          time: '2019-06-13 12:17',
                          price:58,
                          imgUrl: '',
                        
                      },
                       
                  ]
              },
              {
                  label: '待评价',
                  value: 3,
                  list: [
                       {
                          id: '123456',
                          time: '2019-06-13 12:17',
                          price:58,
                          imgUrl: '',
                        
                      },
                      
                  ]
              },
              {
                  label: '已完成',
                  value: 4,
                  list: [
                       {
                          id: '123456',
                          time: '2019-06-13 12:17',
                          price:58,
                          imgUrl: '',
                        
                      },
                       
                  ]
              }
          ]
        }
    },
    methods: {
      onClick(name, title) {
          console.log(name,title)
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
          console.log(orderId,state)
          this.$router.push(`/userShopDetail/${orderId}/${state}`)
      }
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
</style>