<template>
  <div class="coner" style="width:100%; height:100%; background-color:#fff;overflow-y:scroll">
    <div style="margin-bottom:46px;">
      <van-nav-bar style="z-index:999" :title="accountHistoryStr" left-arrow  @click-left="back" :fixed="true"/>
    </div>
    <van-tabs v-model="active">
      <van-tab :title="allOrderStr">
        <!-- <div style="padding-left:15px; padding-top:10px; border-bottom:1px solid #eee;height:32px; font-weight:bold;">全部订单</div> -->
        <div v-for="(item,index) in whole" :key="index" style="height:55px; border-bottom:1px solid #f5f5f5; padding:0px 15px 5px 15px; position:relative">
          <!-- <van-icon style="float:right; top:20px;"  /> -->
          <p style="font-size:13px; float:right; color:#222; padding-right:5px; margin-top:8px;">{{(item.token == item.txjson.token_x ? '-' : '+')+item.opval }}∫</p>
          <p style="font-size:15px; color:#222; padding:8px 0 5px 0; margin:0;">{{item.order_name}}</p>
          <p style="font-size:12px; color:#777; padding:0; margin:0;">{{ GetDateTimeFormat( item.create_time_i) }}</p>
          <p style="font-size:12px; color:#777; padding:0; margin:0; position:absolute; right:20px; top:33px;">{{balanceStr}} {{item.val}}</p>
        </div>
      </van-tab>
      <van-tab :title="payoutsStr">
        <div style="padding:5px 15px 5px 15px; border-bottom:1px solid #f5f5f5; height:35px;">
          <van-row style="margin-top:5px; font-size:15px;">
            <van-col span="12">{{ allPayoutsStr }}</van-col>
            <van-col @click="CashRmb" style="text-align:right; color:#2385ff" span="12">{{ applyPayoutsStr }}</van-col>
          </van-row>
        </div>
        <div v-for="(item,index) in rmbOrderList" :key="index" style="height:55px; border-bottom:1px solid #f5f5f5; padding:0px 15px 0px 15px; position:relative;">
          <!-- <van-icon style="float:right; top:20px;"  /> -->
          <p style="font-size:13px; float:right; color:#222; padding-right:5px; margin-top:8px;">{{item.money}}{{ oneDollarEmojiStr }}</p>
          <p style="font-size:15px; color:#222; padding:8px 0 5px 0; margin:0;">{{item.order_name}}</p>
          <p style="font-size:12px; color:#777; padding:0; margin:0;">{{item.save_time}}</p>
          <p :style="{color:item.text_color}" style="font-size:12px; color:#777; padding:0; margin:0; position:absolute; right:20px; top:30px;">{{item.order_status_name}}</p>
        </div>
      </van-tab>
      <van-tab :title="rechargeStr">
        <div v-for="(item,index) in list" @click="Recharge(item)" :key="index" style="position:relative; border:1px solid #fff;border-bottom:1px solid #f5f5f5; height:58px;">
            <svg t="1586833829791" style="position:absolute; left:15px; top:18px; z-index:1" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1586" width="20" height="20"><path d="M513.839521 0a512 512 0 1 0 513.532934 512A513.532934 513.532934 0 0 0 513.839521 0z m0 981.077844a468.464671 468.464671 0 1 1 469.997605-469.077844A469.997605 469.997605 0 0 1 513.839521 981.077844z" p-id="1587"></path><path d="M799.578443 435.65988h-229.633533L740.713772 275.928144a21.767665 21.767665 0 0 0 0-30.658683 22.074251 22.074251 0 0 0-30.658682 0l-201.120958 187.017964L308.732934 245.269461a21.767665 21.767665 0 0 0-30.658683 0 22.074251 22.074251 0 0 0 0 30.658683l170.768863 158.811976H227.794012a21.767665 21.767665 0 1 0 0 43.535329h260.905389v125.394012H306.586826a21.767665 21.767665 0 0 0 0 43.535329h183.952096v173.834731a21.767665 21.767665 0 0 0 43.535329 0v-172.91497h190.083833a21.767665 21.767665 0 0 0 0-43.535329h-190.083833v-125.394012h267.343713a21.767665 21.767665 0 1 0 0-43.53533z" p-id="1588"></path></svg>
            <van-cell :title="rechargeNumberStr" is-link :value="item.number + oneDollarEmojiStr" style="margin-top:6px; padding-left:42px; font-size:13px;" />
        </div>
        <div style="font-size:13px; color:#222; margin:20px 0; text-align:center;">
            {{ rechargeTipsStr }}
        </div>
        <van-popup v-model="show" closeable  position="bottom" style="height: 30% ;">
            <div style="width:100%; height:100px; backaround-color:#393d49;">
                <!-- <div style="font-size:16px; width:90%; margin:0; padding-top:20px;padding-left:5%;">你确定充值{{vip}}会员，为期1年吗？</div> -->
                <!-- <div style="font-size:14px; padding-left:15px; margin-top:5px;">权益:{{vip_rights}}</div> -->
                <div style="font-size:16px; width:90%; margin:0 auto; padding-top:20px;">{{ rechargeToAccountStr }} : {{prace}}{{ oneDollarEmojiStr }}</div>
            </div>
            <div style="margin-top:10px; text-align:center;">
                <van-button @click="payRmb" style="width:90%;color:#fff; background-color:#12adf5; margin-top:20px; font-weight:bold; font-size:15px; border-radius:5px;">{{ confirmRechargeStr }}</van-button>
            </div>
        </van-popup>
        <!-- <van-popup v-model="show1" closeable  position="bottom" style="height: 30% ;"> -->
        <iframe @load="Inpayment" v-show="show1" :src="rmb" frameborder="0" scrolling="no" width="0" height="0"></iframe>
        <!-- </van-popup> -->
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { NavBar,Button } from "vant";
export default {
  data() {
      return {
        cloud_pay_order_id:'',
            rmb:'',
            order_id:'',
            show1:false,
            RmbUrl:'',
            show:false,
            prace:'',
            show:false,
        rmb:'',
        active:'',
        whole:[],
        rmbOrderList:[],
        list:[
                {number:10},
                {number:30},
                {number:50},
                {number:100},
                {number:200},
                {number:300},
                {number:500},
            ],
        accountHistoryStr:'余额明细',
        allOrderStr:'全部订单',
        payoutsStr:'提现',
        allPayoutsStr:'所有提现',
        applyPayoutsStr:'申请提现',
        rechargeStr:'充值',
        balanceStr:'余额',
        oneDollarEmojiStr:'元',
        rechargeNumberStr:'充值金额',
        rechargeTipsStr:'充值后可用于购买会员，进入会员群',
        rechargeToAccountStr:'充值到余额',
        confirmRechargeStr:'确认充值',
      }
  },
  methods:{
      CashRmb(){//跳转提现页面
        this.$router.push('user/wallet/CashWithdrawal')
      },
      // come(){
      //   this.$router.push('/user/wallet/RmbRecharge');
      // },
      back(){
          // this.$router.push('/wallet');
          this.$router.go(-1)
      },
      GetDateTimeFormat(time_i){
        return str_filter.GetDateTimeFormat(time_i)
      },
      async account(){//查看全部交易记录
        let random = Math.random()
        let user = {
          user_id:localStorage.user_id,
          s_id:localStorage.s_id,
          begin:1,
          len:10000,
          random:random
        }
        let res = await this.$api.network.ChatRmbList(user)
        this.whole = res.list
        console.log(res)
      },
      async CashoutOrderList(){//查看提现记录
        let random = Math.random()
        let user = {
          user_id:localStorage.user_id,
          s_id:localStorage.s_id,
          begin:1,
          len:100,
          // random:random
        }
        let res = await this.$api.network.userCashoutOrderList(user)
        console.log(res)
        let i = 0;
        for(i; i<res.length; i++)
        {
          if(res.list[i].order_status == 0)
          {
            res.list[i].order_status_name = '未冻结款项'
            res.list[i].text_color = '#000'

          }else if(res.list[i].order_status ==1)
          {
            res.list[i].order_status_name = '待审核'
            res.list[i].text_color = '#000'
          }else if(res.list[i].order_status ==2)
          {
            res.list[i].order_status_name = '成功'
            res.list[i].text_color = '#2bed33'
          }else if(res.list[i].order_status == 3)
          {
            res.list[i].order_status_name = '被反驳'
            res.list[i].text_color = 'red'
          }
        }
        this.rmbOrderList = res.list
        // console.log(res.list)
      },

      // 充值
      async Recharge(item){//创建人民币充值订单
            this.prace = item.number
            // console.log(this.prace)
            let random = Math.random()
            let user = {
                order_name:'余额充值',
                order_type:'rmb',
                pay_money:item.number,
                pay_type:'rmb',
                user_id:localStorage.user_id,
                s_id:localStorage.s_id,
                extra_data:'充值余额' + item.number + '元',
                random:random
            }
            let res =  await this.$api.network.ChatRmbNew(user)
            console.log(res)
            if(!res || !res.ret){
              this.$toast.success('创建充值订单失败',1000)
              return 
            }
            this.order_id = res.order_id
            // this.cloud_pay_order_id = res.go_url.split('?')[1]
            // this.RmbUrl = res.go_url
            // this.show = true
            //将接口返回的Form表单显示到页面
            document.querySelector('body').innerHTML = res.pay_url;
              //调用submit 方法
            document.forms[0].submit()
            
        },
        async payRmb(){//确认充值
            this.rmb = this.RmbUrl
            console.log(this.rmb)
            this.show = false
            this.show1 = true
            this.RmbResult()
            // if(this.rmb !== '')
            // {
            //     this.time =   setInterval(() => {
            //         this.RmbResult()
            //     }, 1000);
            // }
        },
        Inpayment(){
            setTimeout(()=>{
                this.rmb = ''
           },3000)
        },
        async RmbResult(){//充值结果
            let user = {
                order_id:this.order_id,
                cloud_pay_order_id:this.cloud_pay_order_id,
            }
            let res =  await this.$api.network.ChatWxQuery(user)
            if(res.ret){
                this.$toast.success('充值成功',1000)
                clearInterval(this.time)
            }
        },
        translate()
        {
        //   accountHistoryStr:'余额明细',
        // allOrderStr:'全部订单',
        // payoutsStr:'提现',
        // allPayoutsStr:'所有提现',
        // applyPayoutsStr:'申请提现',
        // rechargeStr:'充值',
        // balanceStr:'余额',
        // oneDollarEmojiStr:'元',
        // rechargeNumberStr:'充值金额',
        // rechargeTipsStr:'充值后可用于购买会员，进入会员群',
        // rechargeToAccountStr:'充值到余额',
        // confirmRechargeStr:'确认充值',


            this.accountHistoryStr = g_dtnsStrings.getString('/index/wallet/account/history')
            this.allOrderStr = g_dtnsStrings.getString('/index/wallet/account/order/all')
            this.payoutsStr = g_dtnsStrings.getString('/index/wallet/account/payouts')
            this.allPayoutsStr = g_dtnsStrings.getString('/index/wallet/account/payouts/all')
            this.applyPayoutsStr       = g_dtnsStrings.getString('/index/wallet/account/payouts/apply')
            this.balanceStr     = g_dtnsStrings.getString('/index/wallet/account/balance')
            this.oneDollarEmojiStr      = g_dtnsStrings.getString('/index/order/dollar/emoji')
            this.rechargeStr     = g_dtnsStrings.getString('/index/wallet/account/recharge')
            this.rechargeNumberStr      = g_dtnsStrings.getString('/index/wallet/account/recharge/number')
            this.rechargeTipsStr       = g_dtnsStrings.getString('/index/wallet/account/recharge/tips')
            this.rechargeToAccountStr          = g_dtnsStrings.getString('/index/wallet/account/recharge/2/account')
            this.confirmRechargeStr          = g_dtnsStrings.getString('/index/wallet/account/recharge/confirm')
        }
    },
    created(){//进入页面就执行
      this.translate()
        try{
        this.account()
        }catch(ex){}
        this.VIPinformation()
        if(typeof g_pop_event_bus!='undefined')
        {
            g_pop_event_bus.on('update_dtns_loction',this.translate)
        }
    },
    beforeDestroy () {
        console.log('into beforeDestroy()')
        if(typeof g_pop_event_bus!='undefined')
        {
            g_pop_event_bus.removeListener('update_dtns_loction',this.translate)
        }
    },
  mounted(){
    this.account();
    this.CashoutOrderList();
  },
  components: {
    [NavBar.name]: NavBar,
    [Button.name]: Button
  }
};
</script>
<style lang="stylus" scoped>
.coner >>> .van-nav-bar__text{
  color:#222;
  font-size:1rem;
  cursor:pointer;
}
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
.coner >>> .van-nav-bar__arrow{
  fon-size 1.1rem
  color #222
}
.coner >>> .van-nav-bar__title{
  font-size 16px
  color #000

}
* {
  touch-action: pan-y;
}

.topbar >>> .van-nav-bar {
  height: 60px;
}


.topbar >>> .van-icon-arrow-left {
  height: 60px;
  line-height: 60px;
}

.topbar >>> .van-nav-bar__right {
  height: 60px;
  line-height: 60px;
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
