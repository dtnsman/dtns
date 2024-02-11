<template>
    <div class="box">
        <van-nav-bar title="标准市场rtstandard" :fixed="true" left-arrow @click-left="back" right-text="充值账户" @click-right="charge" />
      <div style="position:fixed;overflow-x:hidden;overflow-y:scroll;top:50px;bottom:0px;left:0;right:0;">
        <div class="list" v-for="(item,index) in marksList" :key="index" @click="detail(item)">
            <div class="itemLeft"><h3>{{item.name ? item.name+'（'+item.mark+'）':item.mark}}</h3></div><div class="itemRight">{{item.std_price}}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
        return {
            marks:null,
            marksList:null,
        };
    },
    created()
    {
        console.log('into rtmarket-created()')
        this.bindNotifyFunc()
    },
    async mounted() {
        // let focusRet = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtchannel/focus',{channel:'rtmarket-channel'})
        // console.log('rtmarket-mounted-focusRet:',focusRet)

        let ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtstandard/list')
        if(ret && ret.ret){
          this.marks = ret.list
          localStorage.setItem('std_marks', JSON.stringify(this.marks))
        } 
        else return this.$toast('mark列表为空！')

        this.marksList = this.marks
    },
    async activated(){
        console.log('into rtmarket.vue activated()')
        this.bindNotifyFunc()
    },
    methods: {
        back()
        {
            this.$router.go(-1)
        },
        charge()
        {
            this.$router.push('/rtm/order/account/charge')
        },
        detail(item)
        {
            this.$router.push('/rtstd/detail/'+item.mark)
        },
        bindNotifyFunc()
        {
            console.log('into rtstandar-bindNotifyFunc()')
            let This = this
            window.g_rtstandard_notify_callback = function(data)
            {
                console.log('g_rtstandard_notify_callback-data:',data)
                if(data.notify_type=='sell-order')
                {
                }
                if(data.notify_type=='buy-order')
                {
                }
            }
        }
    }
  };
  </script>
  <style lang="stylus" scoped>
  .box {
    width:100%;
    height 100%;
    background-color:#fff;
    position fixed
  }
  .box >>> .van-nav-bar__text{
    color #000
    font-size 15px
  }
  
  * {
    touch-action: pan-y;
  }
  
  .textarea >>> .van-cell {
    width: 350px;
    margin:30px auto;
  }
  
  .submit >>> .van-button {
    display: block;
    margin: 0 auto;
    background-color: #15a0e7;
    border:none;
  
  }
  .logo {
    text-align center;
    font-size:20px;
  }
  .info >>> .van-cell{
    background-color:#f5f5f5;
  }

  .list{padding:10 15 10 15;width:100%;float:left;border-bottom:solid 1px #f0f0f0;}
  .itemLeft{
    float:left;
    width:50%;
    line-height:42px;
    padding-left:30px;
    color:black;
    font-size:22px;
  }
  .itemRight{
    float:left;
    width:50%;
    text-align: right;
    line-height:42px;
    padding-right: 15px;
    color: green;
    font-size:16px;
  }
  </style>
  