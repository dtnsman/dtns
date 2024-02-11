<template>
    <div class="box" style="width:100%;height:100%;overflow-x: hidden;overflow-y: scroll;">
    <van-nav-bar :title="title" left-arrow @click-left="back" :right-text="okTips" @click-right="getData" />
        <div class="kbox">
            <k-form-build v-if="formJson" ref="KFB" :value="formJson" :defaultValue="formValue" @submit="handleSubmit"  ></k-form-build>
        </div>
        <div v-if="step=='charge'" style="padding-left:15px;font-size: 14px;width:100%;border-top: solid 1px #f0f0f0;">
            <span>账户流水（{{accountMark}}）</span> 
            <span style="margin-left:15px;margin-right:15px"  v-for="(item,index) in marks" @click.stop="queryHistory(item)" :key="index">{{ item }}</span>
            <div class="list" v-for="(item,index) in accountHistory" :key="index">
                <span>{{item.add_op?'+':'-'}}{{item.opval}}&nbsp; &nbsp; 余额：{{ item.token_state }}</span>
            </div>
        </div>
        <div v-if="orderInfo" style="width: 100%;float: left;margin-bottom: 20px;">
            <span style="width: 100%;text-align: left;padding-left: 15px;float: left;">成交结果：</span>
            <div class="listLeft" v-for="(item,index) in orderResults" :key="index" >
                <div class="itemLeft" @click="goUserInfo(item.user_info)"><img v-lazy="item.user_info.logo" width="15px" height="15px">{{item.user_info.user_name}}</div><div class="itemRight">合计：{{item.total}}</div>
            </div>
        </div>
        <div v-if="step!='charge' && step!='info' && step!='create'" style="padding-left:15px;font-size: 14px;width:100%;border-top: solid 1px #f0f0f0;">
            <span>委托纪录（{{accountMark}}）</span> 
            <span style="margin-left:15px;margin-right:15px"  v-for="(item,index) in marks" @click.stop="queryOrders(item,step)" :key="index">{{ item }}</span>
            <div class="list" v-for="(item,index) in orders" :key="index">
                <span @click.stop="cancel(item)">{{item.is_canceled ? '[已撤单]' :(item.ok_orders ?(item.is_processed? '[已成交]': '[成交中]'):'[待成交]')}}{{item.price}}&nbsp; &nbsp; 数量：{{ item.number }}&nbsp; &nbsp; 合计：{{ item.total }}</span>
            </div>
        </div>
        <div @click.stop="createItem" style="position:fixed;left: 0;right: 0;bottom: 2px;height: 30px;text-align: center;">
        ⚙️创建mark⚙️
      </div>
    </div>
</template>
<script>
import orderFormJson from './orderForm.json'
import chargeFormJson from './chargeForm.json'
import viewFormJson from './viewForm.json'
import createFormJson from './createForm.json'
export default {
  name: 'rtmaretOrder',
  data()
  {
    return {
        title:'买卖委托（'+this.$route.params.mark+'）',
        okTips:'确认',
        step:this.$route.params.step,
        mark:this.$route.params.mark,
        formJson:null,
        formValue:null,
        accountHistory:null,
        accountMark:null,
        marks:null,
        orders:null,
        markInfo:null,
        is_stdmark:false,
        orderInfo:null,
        orderResults:null,
    }
  },
  watch: {
    // 利用watch方法检测路由变化：
    $route: function(to, from) {
      if (to.path !== from.path) {
        this.step = to.params.step // 获取参数 这里的mainTpe是我的路由参数
        console.log('update-step:',this.step)
        this.updateForm()
      }
    }
  },
  async created() {
    console.log('step:',this.step,this.$route.params.step)
    
    let markInfoRet = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/info',{mark:this.mark})
    console.log('markInfoRet:',markInfoRet)
    if(markInfoRet && markInfoRet.ret){
        this.markInfo = markInfoRet
        if(this.markInfo.std_price)
        {
            this.is_stdmark = true
        }
    } 


    if(localStorage.getItem('marks')) {
        let marks = JSON.parse(localStorage.getItem('marks'))
        marks = this.step == 'charge' ?  ['price'].concat(marks) :marks
        this.marks = marks 
    } 
    //查询Marks
    await this.queryMarks()

    this.updateForm()
  },
  methods:{
    back(){
        this.$router.go(-1)
    },
    gotoB(){
        this.$router.push('/fintech/xb')
    },
    createItem()
    {
        this.formJson = null
        this.formValue= null
        this.step = 'create'
        setTimeout(()=>this.$router.push('/rtm/order/'+this.mark+'/create'),1000)
    },
    goUserInfo(userInfo)
    {
        this.$router.push(`/index/GroupInformation/GroupOwner/${userInfo.user_id}`)
    },
    async queryMarks()
    {
        let marks = []
        let ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/list')
        if(ret && ret.ret && ret.marks && ret.marks.length>0){
          marks = ret.marks
          localStorage.setItem('marks', JSON.stringify(marks))
        }

        ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtstandard/list')
        if(ret && ret.list)
        {
            let tmps = []
            for(let i=0;i<ret.list.length;i++) tmps.push(ret.list[i].mark)
            marks = marks.concat(tmps)
        }
        marks = this.step == 'charge' ?  ['price'].concat(marks) :marks
        this.marks = marks
    },
    async queryHistory(mark)
    {
        this.accountMark = mark
        this.accountHistory = null
        let ret  =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/account/history',{mark,begin:0,len:100})
        if(!ret ||!ret.ret || !ret.list) return this.$toast('查询历史流水失败！原因：'+(ret?ret.msg:'未知网络原因'))
        else this.accountHistory = ret.list
    },
    async queryOrders(mark,type='sell')
    {
        this.orders = null
        this.accountMark = mark
        let ret  =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/list/'+type+'/my',{mark,begin:0,len:100})
        if(!ret ||!ret.ret || !ret.list) return this.$toast('查询委托交易纪录失败！原因：'+(ret?ret.msg:'未知网络原因'))
        else this.orders = ret.list
    },
    async queryInfo()
    {
        let ret  =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/info',{mark:this.mark})
        if(!ret ||!ret.ret) return this.$toast('查询mark-info失败！原因：'+(ret?ret.msg:'未知网络原因'))
        this.markInfo = Object.assign({}, ret)
        this.markInfo.pics =ret.logo ?  [{name:'logo.jpg',type:'img',url:ret.logo,status:'done',uid:'vc-upload-'+Date.now()}] :[]
        this.formValue = this.markInfo
        return ret
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
        this.orderInfo = null
        this.orderResults= null
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
        this.$toast('撤消委托单成功！')
    },
    async updateForm()
    {
        switch(this.step)
        {
            case 'buy':
                this.okTips = '确认'
                this.title  = '买委托单（'+this.$route.params.mark+'）'
                this.formJson = orderFormJson
                if(this.is_stdmark)
                this.formValue = {price:this.markInfo.std_price,number:this.markInfo.number ? 1:1}
                this.queryOrders(this.mark,this.step)
                break;
            case 'sell':
                this.title  = '卖委托单（'+this.$route.params.mark+'）'
                this.formJson = orderFormJson
                if(this.is_stdmark)
                this.formValue = {price:this.markInfo.std_price,number:this.markInfo.number ? 1:1}
                this.queryOrders(this.mark,this.step)
                break
            case 'charge':
                this.title  = '充值账户（'+rpc_client.roomid+'）'
                this.formJson = chargeFormJson
                this.queryHistory('price')
                break
            case 'info':
                this.title = '查看资料'
                this.okTips = '修改'
                await this.queryInfo()
                this.formJson = viewFormJson
                break
            case 'create':
                this.title = '创建mark'
                this.okTips= '确认'
                this.formValue= {}
                this.formJson = createFormJson
                break
            default:
                return 
        }
    },
    validateSTDMarkInfo(res)
    {
        if(this.markInfo && this.markInfo.std_price)
        {
            if(res.price != this.markInfo.std_price){
                this.$toast('标准单不能修改价格！')
                return false
            }
            if(!this.markInfo.number && res.number!=1)
            {
                this.$toast('该标准单数量只能是1')
                return false
            }
            if(res.number> this.markInfo.number )
            {
                this.$toast('该标准单数量不能大于'+this.markInfo.number)
                return false
            }
            if(res.number<=0 )
            {
                this.$toast('该标准单数量不为小于等于0')
                return false
            }
        }
        return true
    },
    async post(res)
    {
        if(['buy','sell'].indexOf(this.step)>=0 && !this.validateSTDMarkInfo(res))
        {
            return console.log('validateSTDMarkInfo-ret-false:',res,this.markInfo)
        }
        if(this.step=='buy')
        {
            if(!res.price || !isFinite(res.price) || res.price<0)return this.$toast('请输入正确的价格，不能为0或负数！')
            if(!res.number || !isFinite(res.number) || res.number<0)return this.$toast('请输入正确的数量，不能为0或负数！')
           
            let ret  =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/buy',{mark:this.mark,number:res.number,price:res.price})
            if(!ret ||!ret.ret) return this.$toast('买委托下单失败！原因：'+(ret?ret.msg:'未知网络原因'))
        }
        else if(this.step == 'sell')
        {
            if(!res.price || !isFinite(res.price) || res.price<0)return this.$toast('请输入正确的价格，不能为0或负数！')
            if(!res.number || !isFinite(res.number) || res.number<0)return this.$toast('请输入正确的数量，不能为0或负数！')
           
            let ret  =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/sell',{mark:this.mark,number:res.number,price:res.price})
            if(!ret ||!ret.ret) return this.$toast('卖委托下单失败！原因：'+(ret?ret.msg:'未知网络原因'))
        }
        else if(this.step == 'charge')
        {
            if(!res.number || !isFinite(res.number) || res.number<0)return this.$toast('请输入正确的数量，不能为0或负数！')
           
            let ret  =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/transfer',{number:res.number})
            if(!ret ||!ret.ret) return this.$toast('充值失败！原因：'+(ret?ret.msg:'未知网络原因'))
            else return this.$toast('充值成功！')
        }
        else if(this.step=='info')
        {
            if(res.pics && res.pics.length>0)
            {
                res.logo = res.pics[0].url
            }
            delete res.pics
            let ret  =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/set',res)
            if(!ret ||!ret.ret) return this.$toast('修改失败！原因：'+(ret?ret.msg:'未知网络原因'))
            else return this.$toast('修改成功！')
        }
        else if(this.step=='create')
        {
            if(res.pics && res.pics.length>0)
            {
                res.logo = res.pics[0].url
            }
            delete res.pics
            let ret  =await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/rtmarket/mark/create',res)
            if(!ret ||!ret.ret) return this.$toast('创建失败！原因：'+(ret?ret.msg:'未知网络原因'))
            else return this.$toast('创建成功！')
        }
        this.$toast('下单成功！')
    },
    getData() {
        let This = this
        // 通过函数获取数据
        this.$refs.KFB.getData().then(res => {
        // 获取数据成功
        //alert(JSON.stringify(res))
            This.post(res)
        })
        .catch(err => {
            console.log(err, '校验失败')
        })
    },
  }
}
</script>
<style scoped>
.kbox{padding:10px}
.mybtnbox{padding:0 10px 10px 10px}
.mybtnbox button {color: rgb(255, 255, 255); border-radius: 4px; font-size: 13px; height: 28px; background-color: rgb(18, 173, 245); border: none;}

.listLeft{
float:left;
width:100%;
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

