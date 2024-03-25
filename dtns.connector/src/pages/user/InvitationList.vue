<template>
  <!--个人信息组件-->
  <div class="box">
    <van-nav-bar
      :title="邀请明细"
      left-arrow
      @click-left="onClickLeft"
    />
    <div v-for="(item,index) in list" :key="index" style="padding:10px 15px;position:relative; border-bottom:1px solid #f5f5f5;">
      <img :src="item.imgUrl" width="50px" height="50px" style="border-radius:50%;" alt="">
      <div style="font-size:15px;position:absolute;top:8px; left:75px;">{{item.invite_order_name}}</div>
      <div style="font-size:12px;position:absolute;top:30px; left:75px;color:#555;">{{item.user_name}}</div>
      <div style="font-size:12px;position:absolute;top:15px; right:15px;color:#555;">人民币+{{item.txjson.opval.rmb}}</div>
      <div style="font-size:12px;position:absolute;top:40px; right:15px;color:#555;">积分+{{item.gsb}}</div>
      <div style="font-size:12px;position:absolute;top:47px; left:75px;color:#555;">{{item.invite_time}}</div>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard';
export default {
   data() {
            return {
              list:[],
              inviteListStr:'邀请明细'
            }
        },
  mounted() {
  },
  methods: {
    onClickLeft(){//返回上一层
      this.$router.push('/user/QRcode')
    },///

    async lnvitationList(){//邀请列表
      let random = Math.random()
      let user = {
        user_id:localStorage.user_id,
        s_id:localStorage.s_id,
        random:random,
        begin:1,
        len:100,
      }
      let res =  await this.$api.network.ChatUserInvites(user)
      let i =0
      for(i; i<res.list.length;i++){
        if(res.list[i].txjson.opval.logo !==null){
          res.list[i].imgUrl = `${this.$baseUrl}/image/view?user_id=`+res.list[i].txjson.opval.user_id+'&filename='+res.list[i].txjson.opval.logo+'&img_kind='+'open'+'&img_p='+'min1000'
        }
      }
      this.list = res.list
      console.log(this.list)
    },///
    translate()
    {
        this.inviteListStr = g_dtnsStrings.getString('/index/my/invite/list')
    }
  },
  created(){//进入页面就执行
    this.lnvitationList()
    if(typeof g_pop_event_bus!='undefined')
    {
        g_pop_event_bus.on('update_dtns_loction',this.translate)
    }
    this.translate()
  },
  beforeDestroy () {
      console.log('into beforeDestroy()')
      if(typeof g_pop_event_bus!='undefined')
      {
          g_pop_event_bus.removeListener('update_dtns_loction',this.translate)
      }
  }
};
</script>

<style lang="stylus" scoped>
.box {
  width 100%;
  height 100%;
  position fixed;
  background-color #fff;
}
.box >>> .van-nav-bar__arrow {
  color:#000;
}
</style>
