<template>
    <MyBox title="填写快递单号" @back="$router.go(-1)">
    <template slot="content">
        <div class="content" v-for="(item, index) in data" :key="index">
            <van-cell  @click="" :title="addressInfo.name+' '+addressInfo.phone" icon="location-o"
                :label="addressInfo.address"
                >
                <template #icon>
                    <svg style="padding-right:8px;padding-top:8px;" t="1590801901330" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3208" width="30" height="30"><path d="M512 232.269512a160.060264 160.060264 0 1 0 160.060264 159.845993A160.274534 160.274534 0 0 0 512 232.269512z m0 277.052103a117.20611 117.20611 0 1 1 117.20611-117.20611A117.20611 117.20611 0 0 1 512 509.321615z" p-id="3209"></path><path d="M512 0A407.114459 407.114459 0 0 0 104.885541 407.114459c0 219.627537 376.259469 586.887633 392.115505 602.315129l14.998954 14.570412 14.998954-14.570412C542.854991 994.002092 919.114459 626.741996 919.114459 407.114459A407.114459 407.114459 0 0 0 512 0z m0 964.218456C441.719188 892.86629 147.739694 585.387738 147.739694 407.114459a364.260306 364.260306 0 0 1 728.520612 0c0 178.273279-293.979494 485.751831-364.260306 557.103997z" p-id="3210"></path></svg>
                </template>
                <!-- <svg t="1592039187607" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3612" width="10" height="10"><path d="M667.137993 512.122192L270.535221 69.645282A41.703762 41.703762 0 0 1 332.256788 13.762241l420.373916 468.75028v2.919264a41.703762 41.703762 0 0 1 0 54.631927L333.924938 1008.396955a41.703762 41.703762 0 1 1-62.138605-55.466003z" p-id="3613"></path></svg> -->
            </van-cell>
            <div class="card" >
                    <!-- <div class="van-hairline--bottom" style="padding:10px 0;font-size:14px">商品信息</div> -->
                    <van-cell title="商品信息" style="font-size:15px;font-weight:bold" class="order-title"></van-cell>
                    <div class="orderList">
                        <div class="orderList" @click="shopOrder(item1.product_id)" v-for="item1 in item.goods" :key="item1.product_id">
                        <van-card
                        class="van-hairline--bottom"
                        :num="item1.number"
                        :price="item1.product_price"
                        :desc="item1.product_desc"
                        :title="item1.product_ad"
                        :thumb="img+item1.product_image"
                        >
                            <template slot="price">
                                ×{{item1.number}}
                            </template>
                             <template slot="num">
                                <span style="color:#000">￥{{item1.product_price}}</span>
                            </template>
                             <template slot="title">
                            <span class="van-ellipsis title">{{item1.product_ad}}</span>
                            </template>
                            <template slot="desc">
                                <div class="van-multi-ellipsis--l2 desc">
                                    {{item1.product_desc}}
                                </div>
                            </template>
                        </van-card>
                    </div>
                    </div>
                    <div >
                        <van-field class="beizhu" readonly v-if="item.note == ''" label="备注:" placeholder="无"></van-field>
                        <van-field class="beizhu" readonly v-else v-model="item.note" label="备注:" placeholder="如需备注，请输入"></van-field>
                    </div>
                </div>
                <div >
                    <van-cell title="填写快递单号" style="font-size:15px;font-weight:bold" class="order-title"></van-cell>
                    <van-field class="beizhu1" required v-model="express" label="快递公司:" placeholder="请填写快递公司"></van-field>
                    <van-field class="beizhu1" required v-model="expressNum" label="快递单号:" placeholder="请填写快递单号"></van-field>
                </div>
                <van-button type="info" @click="sendKD(item.order_id,item.shop_id)" style="margin-top:20px" block>确定发货</van-button>
        </div>
    </template>
    </MyBox>
</template>
<script>
export default {
    props: {
        orderId: '',
        shopId: '',
        
    },
    data () {
        return {
            data:[],
            addressInfo:{
                name:'',
                phone:'',
                address:''
            },
            img:'',
            express:'',
            expressNum:'',
            remark:''
        }
    },
    methods: {
        async ShoppingOrderInfo(){//立即发货
          let params ={
                user_id:localStorage.user_id,
                s_id: localStorage.s_id,
                order_id:this.$route.params.orderId
          }
          let res = await this.$api.network.ShoppingOrderInfo(params)
          console.log(res)
          this.img=this.$img
          if(res.ret){
              this.data.push(res)
              this.addressInfo= {
                  name : res.address_info.user_name,
                  phone : res.address_info.phone,
                  address : res.address_info.province+res.address_info.city+res.address_info.district+res.address_info.address_detail
              }
              console.log(this.data);
          }else{
          }
      },
        async sendKD(orderId,shopId){//立即发货
            if(!this.express && !this.expressNum){
                this.$toast.fail('请输入正确的快递信息')
                return
            }
          let params ={
                shop_id:shopId,
                user_id:localStorage.user_id,
                s_id: localStorage.s_id,
                order_id:orderId,
                kd_company:this.express,
                kd_number:this.expressNum
          }
          let res = await this.$api.network.ShoppingOrderSend(params)
          console.log(res)
        
          if(res.ret){
            this.$toast.success('发货成功')
            this.$router.push({path:`/shopBroadcast/shopOrder/${shopId}`,query:{active:3}})
          }else{
              this.$toast.fail('发货失败')
          }
      },

    },
    created(){
        this.ShoppingOrderInfo()
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
.beizhu >>> .van-field__label{
    width 50px
}
.beizhu1 >>> .van-field__label{
    width 70px
}
</style>