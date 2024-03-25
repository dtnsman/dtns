<template>
    <div class="box" style="width:100%; height:100%; position:absolute;overflow-y: auto;overflow-x: hidden;">
      <van-nav-bar :title="walletStr" left-arrow  @click-left="back" fixed="true"/>
      <div style="width:100%;padding-top: 46px;">
        <div @click="getbalance" style="width:100%; height:44px; border-bottom:1px solid #f5f5f5;">
          <img src="../../../assets/images/mony.png" alt="" style="width:20px; float:left;margin-top:12px; margin-left:15px;">
          <div style="float:left; padding-left:8px; font-size:14px; padding-top:13px;">{{ accountNumberStr }}</div>
          <van-icon name="arrow" style="float:right; top:15px; margin-right:15px;" />
          <div style="float:right; font-size:14px; padding-right:5px; padding-top:13px;">{{rmb}}∫</div>
        </div>
        <div @click="getintegral" style="width:100%; height:44px; border-bottom:1px solid #f5f5f5; margin:0; padding:0;">
          <img src="../../../assets/images/zhifen.png" alt="" style="width:20px; float:left; margin-top:12px; margin-left:15px;">
          <div style="float:left; padding-left:8px; font-size:14px; padding-top:13px;">{{ integralStr }}</div>
          <van-icon name="arrow" style="float:right; top:15px; margin-right:15px;" />
          <div style="float:right; font-size:14px; padding-top:13px; padding-right:5px;">{{gsb}}GSB</div>
        </div>
        <div style="text-align: center;font-size: 14px;color: aqua;margin-top: 15px;">
          <span @click="importKeys">{{ importKeysStr }}(JSON)</span>&nbsp; &nbsp;<span @click="exportKeys">{{ exportKeysStr }}(JSON)</span>
        </div>
        <div style="text-align: center;width:100%;font-size: 14px;color: black;margin-top: 25px;" @click="send">
          <h3>{{ myWalletQrcodeStr }}</h3>
          <span v-if="dtns_id && false">{{accountStr}}：{{ dtns_id }}<br/></span>
          <img :src="code" width="250px" height="250px"/><br/>
          <span>{{ transferByQRCodeStr }}</span>
        </div>
        <div v-if="goodList" style="padding: 0px;width:100%;margin-top: 25px;border-top:solid 5px #f0f0f0;">
          <center><h3 style="margin-top: 10px;">{{ walletAppStr }}</h3></center>
          <section>
            <div v-for="(item,index) in goodList" style="width: 100%;margin: 10px 0 10px 0;position: relative;">
              <p style="padding:0 10px 0 10px;width:100%;float: left;line-height: 20px;font-size: 14px;" v-html="item.xmsg" ></p>
              <x-msg-viewer :item="item" :show_xmsg="false" style="padding:0 10px 0 10px;width:100%;float: left;"></x-msg-viewer>
              <div style="float: left;width: 100%;height: 2px;background-color: #f0f0f0;"></div>
            </div>
          </section>
        </div>
    </div>
  </div>
</template>

<script>
import XMsgViewer from '@/components/Item/XMsgViewer'
  export default {
    components: {
        XMsgViewer,
    },
  data(){
    return{
      rmb : 0,
      gsb:0,
      code:null,
      dtns_id:'',
      goodList:null,
      walletStr:'钱包',
      accountNumberStr:'账户余额',
      accountStr:'账户',
      integralStr:'积分',
      importKeysStr:'导入密钥',
      exportKeysStr:'导出密钥',
      myWalletQrcodeStr:'我的收款二维码',
      transferByQRCodeStr:'扫码转账',
      walletAppStr:'钱包应用'
    }
  },

  methods: {
      back(){
        // this.$router.push('/user');
        this.$router.go(-1)
      },
      showCode()
      {
        let This = this
        try{
          let dtns_int_id = JSON.parse(localStorage.getItem('userInfo')).dtns_int_id
          this.dtns_id = dtns_int_id
          console.log('dtns_int_id:',dtns_int_id)
          QRCode.toDataURL(dtns_int_id, { errorCorrectionLevel: 'H' })
            .then(url => {
              //console.log(url)
              This.code = url
            })
            .catch(err => {
              console.error(err)
            })
        }catch(ex)
        {
          console.log('get-dtns-int-id-exception:'+ex,ex)
        }
      },
      send()
      {
        localStorage.setItem('poster_type','dtns')
        localStorage.setItem('poster_value',this.dtns_id)//值
        this.$router.push('/poster/dtns')
      },
      exportKeys(){
        g_dchatManager.exportWalletKeys()
      },
      importKeys(){
        g_dchatManager.importWalletKeys()
      },
      getbalance(){
          this.$router.push('/rmb');
      },
      getintegral(){
          this.$router.push('/integral');
      },
      async account(refresh = true){
        let random = Math.random()
        console.log(random)
        let user = {
          user_id:localStorage.user_id,
          s_id:localStorage.s_id,
          random:random
        }
        let res = null ,userInfo =await imDb.getDataByKey('accountInfo'),fromNetFlag = false,This = this
        //await this.$api.network.ChatAccountInfo(user)
        if(userInfo && userInfo.data){
          res = userInfo.data
          if(refresh)
          this.$api.network.ChatAccountInfo(user).then((res)=>{
            if(res && res.ret){
              imDb.addData({key:'accountInfo',data:res})
              This.account(false)
            }else{
              console.log('[wallet-error]load account info from netword failed')
            }
          })
        }else res = await this.$api.network.ChatAccountInfo(user),fromNetFlag = true
        if(!res || !res.ret) return 
        if(fromNetFlag){
          imDb.addData({key:'accountInfo',data:res})
        }
        if(res)
        {
          this.rmb = res.rmb
          this.gsb = res.gsb
        }
        console.log('wallet-account-info:',res)
        },
        /**
         * 获得精选节点的xmsg-label
         * @param {*} web3name 
         */
         async queryIB3LabelXMsg(web3name='dtns')
        {
          let labelsRet = await g_dtnsManager.run('dtns://web3:'+web3name+'/dweb/xmsg/list',{begin:0,len:1000000,label_type:'list'})
          if(labelsRet && labelsRet.ret && labelsRet.list && labelsRet.list.length>0)
          {
            for(let i=0;i<labelsRet.list.length;i++)
            {
              let ret = labelsRet.list[i]
              if(ret && ret.xmsgid && ret.xmsgid.indexOf('xmsgl')>0 
                && ret.xmsg.replace('<p>','').replace('</p>','') =='钱包应用')
              {
                return ret
              }
            }
          }
          return {xmsgid:null}
        },
        async queryIB3GoodList(label_type,web3name = 'dtns')
        {
          if(!label_type) return []
          const xmsgListRet = await g_dtnsManager.run('dtns://web3:'+web3name+'/dweb/xmsg/list',{label_type,begin:0,len:100})
          if(xmsgListRet && xmsgListRet.ret && xmsgListRet.list) return xmsgListRet.list
          return []
        },
        /**
         * 汇总【精选节点】
         */
        async queryGoodList()
        {
          // let dtnsLabelObj = await this.queryIB3LabelXMsg('dtns')
          let nowLabelObj = await this.queryIB3LabelXMsg(rpc_client.roomid)
          // let dtnsGoodList = await this.queryIB3GoodList(dtnsLabelObj?dtnsLabelObj.xmsgid:null,'dtns')
          let nowGoodList = await this.queryIB3GoodList(nowLabelObj.xmsgid,rpc_client.roomid) 
          // console.log('dtnsLabelObj:',dtnsLabelObj,'dtnsGoodList:',dtnsGoodList)
          console.log('nowLabelObj:',nowLabelObj,'nowGoodList:',nowGoodList)
          this.goodList = nowGoodList// dtnsGoodList.concat(nowGoodList)
          console.log('this.goodList',this.goodList)
        },
    translate()
    {
      this.walletStr = g_dtnsStrings.getString('/index/wallet')
      this.accountNumberStr = g_dtnsStrings.getString('/index/account/number')
      this.accountStr = g_dtnsStrings.getString('/index/account')
      this.integralStr       = g_dtnsStrings.getString('/index/integral')
      this.importKeysStr       = g_dtnsStrings.getString('/index/keys/import')
      this.exportKeysStr       = g_dtnsStrings.getString('/index/keys/export')
      this.myWalletQrcodeStr       = g_dtnsStrings.getString('/index/wallet/qrcode')
      this.transferByQRCodeStr       = g_dtnsStrings.getString('/index/qrcode/send')
      this.walletAppStr       = g_dtnsStrings.getString('/index/wallet/app')
    }
},
 mounted(){
    this.account()
    this.showCode()
    this.queryGoodList()
  },
  created(){
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
}
</script>
<style lang="stylus" scoped>
.van-nav-bar__title{
  font-size:16px;
  font-weight:bold;
}
*[data-v-29a9d548][data-v-29a9d548]{
  color #222
}
.box >>> .van-nav-bar .van-icon{
  font-size 1.2rem
  color #222
}

* {
  background-color: #fff;
  touch-action: pan-y;
}

.topbar >>> .van-nav-bar {
  height: 60px;
  margin-bottom: 10px;
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

.topbar >>> .van-nav-bar .van-icon {
  color: #7c7f84;
}

</style>
