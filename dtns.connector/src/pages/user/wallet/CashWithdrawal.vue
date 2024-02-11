<template>
    <div class="box">
      <van-nav-bar
        title="提现"
        left-arrow
        @click-left="onClickLeft"
      />

      <div style="margin-top:10px; border-bottom:1px solid #f5f5f5; padding-bottom:10px;">
        <van-radio-group v-model="radio" direction="horizontal" style="padding-left:15px;">
        <van-radio name="支付宝" shape="square">支付宝</van-radio>
        <van-radio name="微信" shape="square">微信</van-radio>
        <van-radio name="银行卡" shape="square">银行卡 </van-radio>
      </van-radio-group>
      </div>
      <van-field v-model="account" label="提现账户" placeholder="接收提现转账的账号" />
      <van-field v-model="name" label="账户姓名" placeholder="请填写账号对应的真实姓名" />
      <van-field v-model="Remarks" label="账户备注" placeholder="附加信息: 如银行账户支行名称,等" />
      <van-field v-model="phone" type="tel" label="手机号码" placeholder="请输入你的联系号码" />
      <van-field v-model="number" type="number" label="提现金额" placeholder="请输入提现金额" />
      <div style="width:100%; margin:0 auto; text-align:center; margin-top:20px;">
        <van-button type="info" @click="CashWithdrawal" style="width:90%; border-radius:5px;">确认提现</van-button>
      </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
          radio:'',
          account:'',
          name:'',
          Remarks:'',
          phone:'',
          number:'',
        }
    },
    methods:{
        onClickLeft(){//点击返回上一步
          this.$router.go(-1)
        },
        async CashWithdrawal(){//确认提现
          let random = Math.random()
          let user = {
            user_id:localStorage.user_id, 
            s_id:localStorage.s_id, 
            // shop_id:,
            money:this.number, 
            account_kind:this.radio,
            account:this.account,
            account_name:this.name,
            account_note:this.Remarks,
            phone:this.phone,
            random:random,
          }
          let res = await this.$api.network.userCashoutNew(user)
          console.log(res)
          if(res.ret)
          {
            this.$toast.success('提现申请成功，请等待审核处理')
            this.$router.push('/rmb')
          }else
          {
            this.$toast.fail('提现申请失败' + res.msg)
          }
        }
    },
    created(){//进入页面就加载

    },
}
</script>
<style lang="stylus" scoped>
.box {
  position:absolute; height:100%; background-color:#fff; width:100%;
}
.box >>> .van-nav-bar__arrow {
  color #000
}
*{
    box-sizing:border-box
}
.van-nav-bar__arrow{
    color:#000
    font-size:1.05rem
}
</style>