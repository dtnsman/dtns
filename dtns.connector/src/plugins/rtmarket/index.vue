<template>
    <div class="box">
        <van-nav-bar title="实时交易市场rtmarket" :fixed="true" left-arrow @click-left="back" right-text="充值账户" @click-right="charge" />
      <div style="position:fixed;overflow-x:hidden;overflow-y:scroll;top:50px;bottom:0px;left:0;right:0;">
        <div class="list" v-for="(item,index) in marksList" :key="index" @click="detail(item)">
            <div class="itemLeft"><h3>{{item.name ? item.name+'（'+item.mark+'）':item.mark}}</h3></div><div class="itemRight">{{item.price}}</div>
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
        let focusRet = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtchannel/focus',{channel:'rtmarket-channel'})
        console.log('rtmarket-mounted-focusRet:',focusRet)

        let ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/list')
        if(ret && ret.ret){
          this.marks = ret.marks
          localStorage.setItem('marks', JSON.stringify(this.marks))
        } 
        else return this.$toast('mark列表为空！')
        let qApis = []
        for(let i=0;this.marks&& i<this.marks.length;i++)
        {
            qApis.push(g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/price',{mark:this.marks[i]}))
        }
        let rets = await Promise.all(qApis)
        if(!rets ||rets.length<=0) return this.$toast('查询价格列表为空！')
        let results = []
        for(let i=0;rets&& i<rets.length;i++)
        {
            let ret = rets[i]
            if(ret && ret.ret) results.push({mark:this.marks[i],price: rets[i].price})
            else results.push({mark:this.marks[i],price: 0})
        }
        this.marksList = results
    },
    async activated(){
        console.log('into rtmarket.vue activated()')
        this.bindNotifyFunc()
    },
    methods: {
        back()
        {
            this.$router.go(-1)
            g_pop_event_bus.removeListener('rtmarket-channel',this.notify_func)
            this.notify_func = null
        },
        charge()
        {
            this.$router.push('/rtm/order/account/charge')
        },
        detail(item)
        {
            this.$router.push('/rtm/detail/'+item.mark)
        },
        bindNotifyFunc()
        {
            console.log('into rtmarket-bindNotifyFunc()')
            let This = this
            //window.g_rtmarket_notify_callback = 
            if(this.notify_func) return 
            this.notify_func =  function(data)
            {
                console.log('g_rtmarket_notify_callback-recv-data:',data)
                if(data.notify_type=='realtime_price')
                {
                    for(let i=0;This.marksList && i<This.marksList.length;i++)
                    {
                        if(This.marksList[i].mark == data.xobj.mark)
                        {
                            This.marksList[i].price = data.xobj.price
                            console.log('update-price:',data.xobj)
                            break
                        }
                    }
                    //更新列表
                    This.marksList = This.marksList ? This.marksList.slice(0,This.marksList.length) : []
                }
            }
            g_pop_event_bus.on('rtmarket-channel',this.notify_func)
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
  