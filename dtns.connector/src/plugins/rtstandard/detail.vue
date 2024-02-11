<template>
    <div class="box">
        <van-nav-bar :title="title" :fixed="true" left-arrow @click-left="back" right-text="卖委托" @click-right="order" />
      <div style="position:fixed;overflow-x:hidden;overflow-y:scroll;top:50px;bottom:0px;left:0;right:0;">
        <div style="width: 100%;text-align: center;line-height: 100px;float: left;">
            <h1 style="color:green"><span style="background-color:#f0f0f0;width:220px;height:220px; border-radius:60px;padding:20px;">{{ price }}</span></h1>
        </div>
        <div style="width: 100%;float: left;text-align: center;font-size: 16px;">
            <span @click="number--">-</span>&nbsp; <input v-model="number" style="text-align: center; padding: 2px;width: 80px;height: 28px;">&nbsp; <span @click="number++">+</span><br/>
            <button @click.stop="buy" style="width: 100px;margin-top: 10px;">{{ btnTips }}</button>
        </div>
        <div v-if="orderInfo" style="width: 100%;float: left;margin-top: 20px;">
            <span style="width: 100%;text-align: left;padding-left: 15px;float: left;">成交结果：</span>
            <div class="listLeft" v-for="(item,index) in orderResults" :key="index" >
                <div class="itemLeft" @click="goUserInfo(item.user_info)"><img v-lazy="item.user_info.logo" width="15px" height="15px">{{item.user_info.user_name}}</div><div class="itemRight">{{item.total}}</div>
            </div>
        </div>
        <div v-if="orders" style="width: 100%;float: left;margin-top: 20px; padding-left:15px;font-size: 14px;width:100%;border-top: solid 1px #f0f0f0;">
            <span @click.stop="queryOrders">下单纪录：</span> 
            <div class="listLeft" v-for="(item,index) in orders" :key="index" >
                <div class="itemLeft" @click.stop="cancel(item)">{{item.is_canceled ? '[已撤单]' :(item.ok_orders ?(item.is_processed? '[已成交]': '[成交中]'):'[待成交]')}} {{item.number}}/{{item.price}}</div><div class="itemRight">{{item.total}}</div>
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
            markInfo:null,
            price:0,
            title:'标准市场-'+this.$route.params.mark,
            recordList:[],
            order_id:window.g_rtstandard_buy_order_id,
            number:1,
            btnTips:window.g_rtstandard_buy_order_id?'待成交':'下单',
            orderResults:null,
            orders:null,
            orderInfo:null,
        };
    },
    watch: {
        // 利用watch方法检测路由变化：
        number(oldVal,newVal) {
            console.log('number-oldVal:',oldVal,newVal,this.markInfo)
            if(newVal<=0) this.number = 1
            //单数量(!number或number<=1)
            if(this.markInfo && (!this.markInfo.number || this.markInfo.number<1)) this.number = 1 
            //限购数量
            if(this.markInfo && this.markInfo.number && this.markInfo.number>0 && newVal > this.markInfo.number) this.number = this.markInfo.number 
        }
    },
    created()
    {
        console.log('into rtmarket-detail.vue created()')
        this.bindNotifyFunc()
    },
    async mounted() {
        // let focusRet = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtchannel/focus',{channel:'rtmarket-channel'})
        // console.log('rtmarket-mounted-focusRet:',focusRet)
        let ret =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/info',{mark:this.mark})
        if(ret && ret.ret){
            this.price = ret.std_price
            this.markInfo=ret
        } 
        //重新订阅
        if(this.order_id)
        {
            let focusRet = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtchannel/focus',{channel:'rtstandard-channel:'+this.order_id})
            console.log('rtmarket-mounted-focusRet:',focusRet,this.order_id)
            if(focusRet && focusRet.ret)
            {
                console.log('standard-market-focus-old-order-id-success!',focusRet,this.order_id,this.markInfo)
            }else{
                this.order_id = null
                window.g_rtstandard_buy_order_id = null //清理掉
                this.btnTips = '下单'
                this.$toast('无法订阅order-id，请重新下单！')
            }
        }

        this.queryOrders()

        // ret =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/list/all',{mark:this.mark})
        // if(ret && ret.ret && ret.result){
        //     this.leftList = ret.result.buy_list
        //     this.rightList= ret.result.sell_list
        // }
        // else this.$toast('查询委托列表失败！原因：'+(ret?ret.msg:'未知网络原因'))

        // ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/price/list',{mark:this.mark,begin:0,len:100})
        // this.recordList = ret && ret.ret && ret.prices  ? ret.prices:[]
    },
    async activated(){
        console.log('into rtmarket-detail.vue activated()')
        this.queryOrders()
        this.bindNotifyFunc()
    },
    methods: {
        back()
        {
            this.$router.go(-1)
            g_pop_event_bus.removeListener('rtstandard-channel',this.notify_func)
            this.notify_func = null
        },
        viewItem(){
          this.$router.push('/rtm/order/'+this.mark+'/info')
        },
        order()
        {
            // if(confirm('请选择哪一种委托？\n确定：买委托；\n取消：卖委托'))
            //     this.buy()
            // else
                this.sell()
        },
        goUserInfo(userInfo)
        {
            this.$router.push(`/index/GroupInformation/GroupOwner/${userInfo.user_id}`)
        },
        async buy()
        {
            if(this.order_id) {
                if(!(this.orderInfo && this.orderResults && this.orderResults.length>0))   return this.$toast('已在订单状态，请稍候！')
                this.order_id = window.g_rtstandard_buy_order_id = null
                this.$toast('重新下单！')
            }
            if(this.number<=0) return this.$toast('购买数量不能小于等于0！')
            if(this.markInfo.number && this.number>this.markInfo.number) return this.$toast('购买数量不能大于'+this.markInfo.number+'！')
            // this.$router.push('/rtm/order/'+this.mark+'/buy')
            let ret =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtstandard/buy',{mark:this.mark,number:this.number})
            if(!ret || !ret.ret) return this.$toast('买委托失败！原因：'+(ret?ret.msg:'未知网络原因'))

            window.g_rtstandard_buy_order_id = ret.order_id
            this.order_id = ret.order_id
            this.btnTips = '待成交'
            this.orderResults = null
            this.orderInfo = null
            await rpc_client.sleep(500)//500ms后查询
            this.queryOrders()
        },
        sell()
        {
            this.$router.push('/rtm/order/'+this.mark+'/sell')
        },
        async queryOrderInfo()
        {
            if(!this.order_id) return this.$toast('未知错误：order_id为空！')
            let ret =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/order/info',{order_id:this.order_id})
            if(!ret || !ret.ret) return this.$toast('查询订单成交纪录失败！原因：'+(ret?ret.msg:'未知网络原因'))
            if(!ret.ok_orders || ret.ok_orders.length<=0)  return this.$toast('订单未成交！')
            this.orderResults = ret.ok_orders
            this.orderInfo = ret
            console.log('this.orderInfo:',this.orderInfo)
            this.btnTips = '已成交'
            //不再强制order_id为此！
            window.g_rtstandard_buy_order_id = null
            this.order_id = null
            //成交播放mp3音乐
            if(typeof bgMp3!=null) bgMp3.play()
        },
        async queryOrders(mark,type='buy')
        {
            mark = this.mark
            this.orders = null
            let ret  =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/list/'+type+'/my',{mark,begin:0,len:30})
            if(!ret ||!ret.ret || !ret.list){
              this.orders = null
              return this.$toast('查询委托交易纪录失败！原因：'+(ret?ret.msg:'未知网络原因'))
            } 
            else this.orders = ret.list
        },
        async viewOrder(item)
        {
          let ret =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/order/info',{order_id:item.order_id})
          if(!ret || !ret.ret) return this.$toast('查询订单成交纪录失败！原因：'+(ret?ret.msg:'未知网络原因'))
          if(!ret.ok_orders || ret.ok_orders.length<=0)  return this.$toast('该订单未成交！')
          //显示在成交结果页面
          this.orderResults = ret.ok_orders
          this.orderInfo = ret
        },
        async cancel(item)
        {
            if(!item ||!item.order_id) return this.$toast('订单号不存在！')
            if(item.is_canceled){
              if(item.ok_orders) this.viewOrder(item)
                return this.$toast('该订单已被撤消！')
            } 
            if(item.ok_orders) {
              this.viewOrder(item)
              if(item.is_processed) return true
              //处理中，亦可继续cancel
            }
            if(!confirm('确定撤消该委托单吗？')) return false
            let ret  =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/cancel',{order_id:item.order_id})
            if(!ret ||!ret.ret) return this.$toast('撤消委托单失败！原因：'+(ret?ret.msg:'未知网络原因'))
            if(this.order_id == item.order_id || window.g_rtstandard_buy_order_id == item.order_id)
            {
              this.order_id = window.g_rtstandard_buy_order_id = null
              this.btnTips = '下单'
            }
            this.$toast('撤消委托单成功！')
        },
        bindNotifyFunc()
        {
            console.log('into rtstandar-detail-bindNotifyFunc()')
            let This = this
            // window.g_rtstandard_notify_callback 
            if(this.notify_func) return 
            this.notify_func =async function(data)
            {
                console.log('g_rtstandard_notify_callback-data:',data)
                console.log('g_rtstandard_notify_callback-this.order_id:',This.order_id)
                if(data.notify_type=='sell-order')
                {
                }
                if(data.notify_type=='buy-order')
                {
                    if(data.xobj.order_id == This.order_id)
                    {
                        //查询该订单信息，并返回数据。
                        await This.queryOrderInfo()
                        This.queryOrders()
                    }
                }
            }
            g_pop_event_bus.on('rtstandard-channel',this.notify_func)
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
    width:70%;
    line-height:20px;
    padding-left:15px;
    color:black;
    font-size:14px;
  }
  .itemRight{
    float:left;
    width:30%;
    text-align: right;
    line-height:20px;
    padding-right: 15px;
    color: green;
    font-size:14px;
  }
  .box button {color: rgb(255, 255, 255); border-radius: 2px; font-size: 14px; height: 23px; background-color: rgb(18, 173, 245); border: none;}
  </style>
  