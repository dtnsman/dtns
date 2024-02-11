<template>
    <div class="box">
        <van-nav-bar :title="title" :fixed="true" left-arrow @click-left="back" right-text="买卖委托" @click-right="order" />
      <div style="position:fixed;overflow-x:hidden;overflow-y:scroll;top:50px;bottom:0px;left:0;right:0;">
        <div style="width: 100%;text-align: center;line-height: 100px;float: left;">
            <h1 style="color:green">{{ price }}</h1>
        </div>
        <div style="width: 100%;float: left;">
          <div style="width: 50%;float: left;" @click.stop="buy">
              <span style="width: 100%;text-align: left;padding-left: 15px;">买方</span>
              <div class="listLeft" v-for="(item,index) in leftList" :key="index" >
                  <div class="itemLeft">{{item.last_num}}</div><div class="itemRight">{{item.price}}</div>
              </div>
          </div>
          <div style="width: 50%;float: left;" @click.stop="sell">
              <span style="width: 100%;text-align: left;padding-left: 15px;">卖方</span>
              <div class="listRight" v-for="(item,index) in rightList" :key="index">
                  <div class="itemLeft" style="color:green">{{item.price}}</div><div class="itemRight"  style="color:black">{{item.last_num}}</div>
              </div>
          </div>
        </div>
        <div style="width: 100%;float: left;border-top: solid 1px #f0f0f0;margin-top: 15px;">
          <span style="width: 100%;text-align: left;padding-left: 15px;">成交纪录</span>
          <div class="listLeft" v-for="(item,index) in recordList" :key="index">
                  <div class="itemLeft" style="color:green">{{item.price}}</div><div class="itemRight"  style="color:black">{{item.total}}</div>
            </div>
        </div>
      </div>
      <div @click.stop="viewItem" style="position:fixed;left: 0;right: 0;bottom: 2px;height: 30px;text-align: center;">
        ⚙️资料⚙️
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
        return {
            leftList:null,
            rightList:null,
            mark:this.$route.params.mark,
            price:0,
            title:'实时交易市场rtmarket-'+this.$route.params.mark,
            recordList:[],
        };
    },
    created()
    {
        console.log('into rtmarket-detail.vue created()')
        this.bindNotifyFunc()
    },
    async mounted() {
        let focusRet = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtchannel/focus',{channel:'rtmarket-channel'})
        console.log('rtmarket-mounted-focusRet:',focusRet)

        let ret =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/price',{mark:this.mark})
        if(ret && ret.ret) this.price = ret.price

        ret =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/list/all',{mark:this.mark})
        if(ret && ret.ret && ret.result){
            this.leftList = ret.result.buy_list
            this.rightList= ret.result.sell_list
        }
        else this.$toast('查询委托列表失败！原因：'+(ret?ret.msg:'未知网络原因'))

        ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/price/list',{mark:this.mark,begin:0,len:100})
        this.recordList = ret && ret.ret && ret.prices  ? ret.prices:[]
    },
    async activated(){
        console.log('into rtmarket-detail.vue activated()')
        this.bindNotifyFunc()
    },
    methods: {
        back()
        {
            this.$router.go(-1)
            g_pop_event_bus.removeListener(this.notify_func)
            this.notify_func = null
        },
        viewItem(){
          this.$router.push('/rtm/order/'+this.mark+'/info')
        },
        order()
        {
            if(confirm('请选择哪一种委托？\n确定：买委托；\n取消：卖委托'))
                this.buy()
            else
                this.sell()
        },
        buy()
        {
            this.$router.push('/rtm/order/'+this.mark+'/buy')
        },
        sell()
        {
            this.$router.push('/rtm/order/'+this.mark+'/sell')
        },
        bindNotifyFunc()
        {
            console.log('into rtmarket-detail-bindNotifyFunc()')
            let This = this
            // window.g_rtmarket_notify_callback = 
            if(this.notify_func) return 
            this.notify_func = function(data)
            {
                console.log('g_rtmarket_notify_callback-recv-data:',data)
                if(data.notify_type=='realtime_price')
                {
                    if(This.mark == data.xobj.mark)
                    {
                        This.price = data.xobj.price
                        console.log('update-price:',data.xobj)
                        This.recordList = [data.xobj].concat(This.recordList && This.recordList.length>0 ? This.recordList:[])
                    }
                }
                else if(data.notify_type=='realtime_orders')
                {
                    if(data.xobj.mark == This.mark)
                    {
                        This.leftList = data.xobj.buy_list
                        This.rightList= data.xobj.sell_list
                    }
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

  .list{padding:10 15 10 15}
  .listLeft{
    float:left;
    width:100%;
  }
  .listRight{
    float:left;
    width:100%;
    background: #f0f0f0
  }
  .itemLeft{
    float:left;
    width:50%;
    line-height:20px;
    padding-left:15px;
    color:black;
    font-size:14px;
  }
  .itemRight{
    float:left;
    width:50%;
    text-align: right;
    line-height:20px;
    padding-right: 15px;
    color: green;
    font-size:14px;
  }
  </style>
  