<template>
    <div class="box" style="width:100%;height:100%;overflow-x: hidden;overflow-y: scroll;">
    <van-nav-bar :title="title" left-arrow @click-left="back" :right-text="okTips" @click-right="getData" />
        <div class="kbox">
            <k-form-build v-if="formJson" ref="KFB" :value="formJson" :defaultValue="formValue" @submit="handleSubmit"  ></k-form-build>
        </div>
    </div>
</template>
<script>
import fintechsdkCCYJson from './fintechsdkCCY.json'
import fintechsdkQRCodeJson from './fintechsdkQRCode.json'
import fintechsdkTXIDJson from './fintechsdkTXID.json'
export default {
  name: 'fintech',
  data()
  {
    return {
        title:'fintech充值',
        okTips:'确认',
        step:this.$route.params.step,
        formJson:null,
        formValue:null,
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
  created() {
    console.log('step:',this.step,this.$route.params.step)
    this.updateForm()
  },
  methods:{
    back(){
        this.$router.go(-1)
    },
    gotoB(){
        this.$router.push('/fintech/xb')
    },
    updateForm()
    {
        switch(this.step)
        {
            case 'ccy':
                this.okTips = '确认'
                this.title  = '选择币种'
                this.formJson = fintechsdkCCYJson
                break;
            case 'qrcode':
                let ccy = localStorage.getItem('goto-ccy')
                if(!ccy) {
                    this.$toast('未选择ccy，请重新选择！')
                    return setTimeout(()=>this.$router.push('/fintech/ccy'),1000)
                } 
                this.okTips = '下一步'
                this.title  = '充值地址-'+ccy
                this.formJson = null
                this.queryAddrs()
                // this.formJson = fintechsdkQRCodeJson
                break
            case 'txid':
                this.okTips = '确认'
                this.title = '充值确认'
                this.formJson = fintechsdkTXIDJson
                break;
            default:
                return 
        }
    },
    async getQRCode(addr)
    {
        return new Promise((res)=>{
            QRCode.toDataURL(addr)
            .then(url => {
                console.log('getQRCode:',addr,url)
                res(url)
            })
            .catch(err => {
                console.log('getQRCode-err:'+err,addr,err)
                res(null)
            })
        })
    },
    async queryAddrs()
    {
        let ccy = localStorage.getItem('goto-ccy')
        if(!ccy) {
            this.$toast('未选择ccy，请重新选择！')
            return setTimeout(()=>this.$router.push('/fintech/ccy'),1000)
        } 
        let ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/fintechsdk/addr',{ccy:ccy})
        console.log('queryAddrs-ret:',ret)
        if(!ret ||!ret.ret) return this.$toast('查询充值地址失败！')

        let formJson = Object.assign({},fintechsdkQRCodeJson)
        let templateJson = formJson.list[0].columns[0]
        let oldTemplateJsonStr =  JSON.stringify(templateJson) 
        formJson.list[0].columns = []

        let addrs = ret.addr ? ret.addr :ret.addrs
        if(addrs)
        {
            addrs = addrs.reverse() //倒序过来
            for(let i=0;i<addrs.length;i++)
            {
                //addr:"0x78a937468f81994030802f7b75c34cb03cd04388"  ccy:"USDT" chain:"USDT-OKTC"
                let tmpJson = JSON.parse(oldTemplateJsonStr)//恢复模板
                tmpJson.label = addrs[i].chain
                tmpJson.value = ''+(i+1)
                tmpJson.list[0].options.defaultValue = addrs[i].addr//地址
                tmpJson.list[1].options.defaultValue = await this.getQRCode(addrs[i].addr)//二维码图片
                formJson.list[0].columns.push(tmpJson)
            }
        }
        this.formJson = formJson
    },
    async post(res)
    {
        if(this.step=='ccy')
        {
            if(!res.ccy)return this.$toast('请选择ccy！')
            localStorage.setItem('goto-ccy',res.ccy)
            this.$router.push('/fintech/qrcode')
        }
        else if(this.step == 'qrcode')
        {
            this.$router.push('/fintech/txid')
        }
        else if(this.step == 'txid')
        {
            if(!res.txid) return this.$toast('请输入txid，以便确认收款！')
            let ret = await g_dtnsManager.run('dtns://web3:'+rpc_client.roomid+'/fintechsdk/txid/notice',{txid:res.txid})
            if(ret && (ret.ret || ret.equal_flag))
            {
                this.$toast('提交成功，如转账确认会自动充值至您的账户！')
            }else{
                this.$toast('提交失败，原因：'+(ret ?ret.msg:'未知网络原因'))
            }
        }
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
</style>

