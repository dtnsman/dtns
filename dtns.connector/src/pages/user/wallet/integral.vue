<template>
  <div class="coner" style="width:100%; height:100%; background-color:#fff;">
    <van-nav-bar title="积分明细" left-arrow  @click-left="back" @click-right="come" />
    <!-- <van-tabs v-model="active"> -->
      <!-- <van-tab title="全部"> -->
        <div style="padding-left:15px; padding-top:10px; border-bottom:1px solid #eee;height:32px; font-size:15px; font-weight:bold;">全部订单</div>
        <div v-for="(item,index) in whole" :key="index" style="height:55px; border-bottom:1px solid #f5f5f5; padding:0px 15px 0px 15px; position:relative;">
          <!-- <van-icon name="arrow" style="float:right; top:20px;"  /> -->
          <p style="font-size:13px; float:right; color:#222; padding-right:5px; margin-top:9px;">{{item.send_val}}</p>
          <p style="font-size:15px; color:#222; padding:8px 0 5px 0; margin:0;">{{item.txjson.extra_data.invite_order_name}}</p>
          <p style="font-size:12px; color:#777; padding:0; margin:0;">{{item.order_time}}</p>
          <p style="font-size:12px; color:#777; padding:0; margin:0; position:absolute; right:21px; top:33px;">积分余额 {{item.val}}</p>
        </div>
        <div style="height:40px; width:100%;padding-top:10px; padding-left:15px; font-size:14px; color:#555;" v-show="show">
            {{lenghtout}}
        </div>
      <!-- </van-tab> -->
      <!-- <van-tab title="收入">
        <div v-for="(item,index) in whole" :key="index" style="height:55px; border-bottom:1px solid #f5f5f5; padding:0px 15px 0px 15px">
          <van-icon name="arrow" style="float:right; top:20px;"  />
          <p style="font-size:13px; float:right; color:#222; padding-right:5px; margin-top:19px;">-5.00</p>
          <p style="font-size:15px; color:#222; padding:8px 0 5px 0; margin:0;">购买会员</p>

          <p style="font-size:12px; color:#777; padding:0; margin:0;">2017-20-12</p>
        </div>
      </van-tab>
      <van-tab title="支出">
        <div v-for="(item,index) in whole" :key="index" style="height:55px; border-bottom:1px solid #f5f5f5; padding:0px 15px 0px 15px">
          <van-icon name="arrow" style="float:right; top:20px;"  />
          <p style="font-size:13px; float:right; color:#222; padding-right:5px; margin-top:19px;">-5.00</p>
          <p style="font-size:15px; color:#222; padding:8px 0 5px 0; margin:0;">购买会员</p>

          <p style="font-size:12px; color:#777; padding:0; margin:0;">2017-20-12</p>
        </div>
      </van-tab>
    </van-tabs> -->
  </div>
</template>
<script>
import { NavBar,Button } from "vant";
export default {
  data() {
      return {
        show:false,
        rmb:'',
        active:'',
        whole:[],
        income:'1,2',
        expenditure:'1,2',
        lenghtout:'',

      }
  },
  methods:{
      recharge(){
        this.$router.push('/self/wallet/balance/balance_recharge');
      },
      come(){
        this.$router.push('/self/wallet/balance/balance_data');
      },
      back(){
          // this.$router.push('/wallet');
          this.$router.go(-1)

      },
      async account(){
        let random = Math.random()
        let user = {
          user_id:localStorage.user_id,
          s_id:localStorage.s_id,
          begin:1,
          len:100,
          random:random
        }
        let res = await this.$api.network.ChatGsbList(user)
        this.whole = res.list
        console.log(res)
        if(res.msg == "gsb order is empty")
        {
          this.show = true
          this.lenghtout = '暂无记录'
        }else
        {
          this.show = false
        }
      }
  },
  mounted(){
    this.account();
  },
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  }
};
</script>
<style lang="stylus" scoped>
.coner >>> .van-tabs__line{
  background-color:#3385ff
}
.van-icon[data-v-e277ecee]::before {
  font-size 16px
  color #555
}
.sub-page {
  background-color #fff
}
.coner >>> .van-nav-bar__arrow {
  font-size 1.1rem
  color #222
}
.van-nav-bar__title{
  font-size 16px
  font-weight bold
}
* {
  touch-action: pan-y;
}

.topbar >>> .van-nav-bar {
  height: 60px;
}

.topbar >>> .van-nav-bar__title {
  line-height: 60px;
  height: 60px;
  letter-spacing: 2px;
  font-weight: bold;
}

.topbar >>> .van-icon-arrow-left {
  height: 60px;
  line-height: 60px;
}

.topbar >>> .van-nav-bar__right {
  height: 60px;
  line-height: 60px;
}

.topbar >>> .van-nav-bar__text {
  color: #fff;
}

.topbar >>> .van-nav-bar .van-icon {
  color: #7c7f84;
}

.show {
  height: 300px;
  display: -webkit-flex;
  display: flex;
  flex-flow column;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  background-color: #6c99dc;
}
.show .show_balance{
  background-color: #6c99dc;
  font-size:50px
  color: #fff
  margin-top:20px
}
.show .show_title{
  background-color: #6c99dc;
    font-size:16px
  color: #fff
}
.cash >>> .van-button{

    margin 20px auto
    display block
    border radius 2px
}
.placeholder{
    height:30px
}
</style>
