<template>
    <!--个人信息组件-->
    <div class="box" style="width:100%; height:100%;position:fixed; background-color:#fff;overflow-x: hidden;overflow-y: scroll;">
      <div class="topbar">
        <van-nav-bar title="修改服务器（节点）" fixed="true"  right-text="远程调试"  @click-right="devtools" left-arrow @click-left="back" />
      </div>
      <div class="logo">
        <div style="text-align:center;padding-top: 80px;">
            <span>切换不同的服务器节点，可能须重新注册或登录！</span><br/>
            <img v-image-preview :src="url" alt="" width="200" height="200"/><br/>
            <input text="text" placeholder="输入服务器节点名称" v-model="changetext" class="input" list="web3namesList"/>
            <datalist id="web3namesList">
                <option v-for="(item,index) in web3names" :value="item.web3name"></option>
            </datalist><br/>
        </div>
      </div>
      <van-divider />
      <div class="change">
        <div style="text-align:center;">
          <span>历史纪录：</span><span v-for="(item,index) in history" style="padding: 3px;margin-right: 10px;" @click="clickLabel(item.web3name)"><font color=green v-if="item.alive_status">{{ item.web3name }}</font><font v-else>{{ item.web3name }}</font></span>
          <br/>
          <span>所有节点：</span>
          <span v-for="(item,index) in web3names" style="padding: 3px;margin-right: 10px;" @click="clickLabel(item.web3name)"><font color=green v-if="item.alive_status">{{ item.web3name }}</font><font v-else>{{ item.web3name }}</font></span>
        </div>
        <button @click="confirm" style="width:85px; height:30px; font-size:13px; line-height:29px; background-color:#15a0e7; margin-top:20px; border-radius:3px;">确认切换</button>
      </div>
      <van-divider />
      <div v-if="goodList" style="padding: 0px;">
        <center><h3>精选节点</h3></center>
        <section>
          <div v-for="(item,index) in goodList" style="width: 100%;margin: 10px 0 10px 0;position: relative">
            <p style="padding:0 10px 0 10px;width:100%;float: left;line-height: 20px;font-size: 14px;" v-html="item.xmsg" ></p>
            <x-msg-viewer :item="item" :show_xmsg="false" style="padding:0 10px 0 10px;width:100%;float: left;"></x-msg-viewer>
            <van-divider style="float: left;width: 100%;"/>
          </div>
        </section>
      </div>
    </div>
  </template>
  <script>
//   import Clipboard from 'clipboard';
// import { sign } from 'crypto';
import XMsgViewer from '@/components/Item/XMsgViewer'
  export default {
    components: {
        XMsgViewer,
    },
     data() {
              return {
                filename:'',
                url: "",
                changetext: "",
                head:'',
                // show:true,
                arr:[],
                logo:'',
                web3names:[],
                history:[],
                url:null,
                goodList:null,
              }
          },
    mounted() {
    },
    methods: {
      devtools(){
        console.log('into devtools now:')
        let This = this
        let devtools_url = null
        if(typeof g_devtools_rpc !='undefined')
        {
          devtools_url = g_devtools_rpc.devtools_url
        }else{
          devtools_url = 'devtools'+sign_util.newTXID().split('_')[1]
          window.g_devtools_rpc = new RTCClient(devtools_url+'::host')
          // g_devtools_rpc.init()
          g_devtools_rpc.devtools_url = devtools_url
          console.log('new-devtools-url:',devtools_url)
        }
        console.log('devtools-url:',devtools_url,g_devtools_rpc)
        This.$dialog.confirm({
          title: '远程调试[***]',
          message: '请使用pop-devtools进行远程调试'+
          '<br/>调试URL：'+devtools_url+
          '<br/>功能：1-日志（重点支持）;2-远程调试命令（暂无）;3-远程控制设备（暂无）;',
          messageAlign:'left'
        })
          .then(() => {
            try{
              navigator.clipboard.writeText(devtools_url);
              This.$toast("远程调试URL已复制",5000);
            }catch(ex){
                console.log('copy-exception:'+ex)
                This.$toast("远程调试URL复制失败，原因（可能无复制权限）",5000);
            }
          })
          .catch(() => {
            // on cancel
          });
      },
      back() {
        this.$router.go(-1);
      },
        async confirm() {//切换节点
            if(!this.changetext ||this.changetext.length<=0){
                return this.$toast.fail('[Error]请输入正确的服务器节点ID（不能为空）')
            }
            if(this.changetext == rpc_client.roomid){
                return this.$toast.fail('[Error]目标节点ID为-当前-服务器节点ID，没有发生改变！')
            }
            this.changetext = this.changetext.trim()

            try{
              let ret = await g_dchatManager.switchIB3(this.changetext,this)//不设置为this => null<否则首次加载时，会切换崩溃
              console.log('g_dchatManager.switchIB3--ret:',ret)
            }catch(ex){
              console.log('changeSvrNode.vue-confirm()-exception:'+ex,ex)
            }
            return 
            // let This = this
            //保存历史sesion（登录时已经保存过一次了）
            // let session = iSessionDb.addData({key:'session:'+rpc_client.roomid,data:)

            let storage = window.localStorage;
            let dark_mode = localStorage.getItem('dark_mode')
            storage.clear() //清理掉登录信息
            imDb.clear()  //清理掉配置信息。
            if(dark_mode)  localStorage.setItem('dark_mode',dark_mode)

            //切换一下rpc_client
            let oldWeb3name = rpc_client.roomid
            // g_dtnsManager.removeRPCClient(oldWeb3name)
            // rpc_client.roomid = this.changetext
            // rpc_client.init()
            // g_dtnsManager.addRPCClient(rpc_client)
            let client = await g_dtnsManager.connect('dtns://web3:'+this.changetext)
            if(client)
            {
              window.rpc_client = client  //切换（旧的并不关闭和清理--连接需要【网络代价】）
              console.log('new-rpc_client:',client)
            }else{
              console.log('[Error]use new rpc-client failed!')
              this.$toast('切换RPCCLient失败')
              await rpc_client.sleep(1000)
              this.$router.push('/connect')
              return ;
            }

            localStorage.setItem('now_roomid',this.changetext)
            this.$toast.success('切换节点成功！')
            let sessionInfo = await iSessionDb.getDataByKey('session:'+this.changetext)
            if(sessionInfo && sessionInfo.data)
            {
              //等待连接成功---由于不进行登录测试，故而没必要进行浪费时间的等待
              // let iCnt =0 ,flag = true;
              // while(iCnt<=3 && flag)
              // {
              //   if(rpc_client.pingpong_flag)
              //   {
              //     flag = false
              //   }
              //   if(!flag){
              //     //await rpc_client.sleep(50)
              //   }else{
              //     await rpc_client.sleep(500)
              //   }
              //   iCnt++
              // }

              let res = sessionInfo.data
              // let userInfo = await g_dtnsManager.run('dtns://web3:'+this.changetext+'/user/info',
              //     {user_id:res.user_id,s_id:res.s_id,dst_user_id:res.user_id})
              // if(!userInfo || !userInfo.ret){
              //   console.log('connect to web3app and get userInfo failed:',userInfo)
              //   this.$toast.success("登录失败",1000);
              //   await rpc_client.sleep(30)
              //   this.$router.push('/connect')
              // }else
              //直接使用旧session，而不进行登录测试（这个登录测试可能会有问题）
              {
                // if(typeof g_connectIBChatSvr == 'function') g_connectIBChatSvr()
                localStorage.setItem('newDWebFlag','1')
                    
                localStorage.setItem("s_id", res.s_id);
                localStorage.setItem("user_id", res.user_id);
                localStorage.setItem("userInfo",JSON.stringify(res))
                this.$toast.success("登录成功",1000);

                this.$api.network.startWebSocket();

                //以下是错误的设置'mywallet:'+oldWeb3name的wallet的代码（因无delete操作，故而可能没生效没导致更多的错误）删除之
                // window.g_mywallet = rpc_client.mywallet
                // console.log('g_mywallet:',g_mywallet)
                // iWalletDb.addData({key:'mywallet:'+oldWeb3name,data:rpc_client.mywallet})
                let new_mywallet = rpc_client.mywallet // await iWalletDb.getDataByKey('mywallet:'+this.changetext)
                console.log('new_mywallet:',new_mywallet)
                // new_mywallet = new_mywallet ? new_mywallet.data:null
                if(new_mywallet)
                {
                  iWalletDb.deleteDataByKey('g_mywallet')
                  iWalletDb.addData({key:'g_mywallet',data:new_mywallet})
                  window.g_mywallet = rpc_client.mywallet
                }
                // console.log(s_id);
                await rpc_client.sleep(30)//500)
                //this.$router.push('/index')
                this.$router.push({name:"index",params:{noCache:true}});//清理掉缓存
              }
            }
            else{
              await g_dchatManager.switchAppNow(this.changetext,this)
              // if(await g_dchatManager.switchApp(this.changetext))
              // {
              //   console.log('g_dchatManager.switchApp is true')
              //   //
              //   let sessionInfo = await iSessionDb.getDataByKey('session:'+this.changetext)
              //   if(sessionInfo && sessionInfo.data)
              //   {
              //     let res = sessionInfo.data
              //     {
              //       // if(typeof g_connectIBChatSvr == 'function') g_connectIBChatSvr()
              //       localStorage.setItem('newDWebFlag','1')
                        
              //       localStorage.setItem("s_id", res.s_id);
              //       localStorage.setItem("user_id", res.user_id);
              //       localStorage.setItem("userInfo",JSON.stringify(res))
              //       this.$toast.success("登录成功",1000);

              //       this.$api.network.startWebSocket();
              //       let new_mywallet = rpc_client.mywallet // await iWalletDb.getDataByKey('mywallet:'+this.changetext)
              //       console.log('new_mywallet:',new_mywallet)
              //       // new_mywallet = new_mywallet ? new_mywallet.data:null
              //       if(new_mywallet)
              //       {
              //         iWalletDb.deleteDataByKey('g_mywallet')
              //         iWalletDb.addData({key:'g_mywallet',data:new_mywallet})
              //         window.g_mywallet = rpc_client.mywallet
              //       }
              //       // console.log(s_id);
              //       await rpc_client.sleep(30)//500)
              //       //this.$router.push('/index')
              //       this.$router.push({name:"index",params:{noCache:true}});//清理掉缓存
              //     }
              //     return true
              //   }else{
              //     console.log('g_dchatManager.switchApp session is null')
              //   }
              // }
              // await rpc_client.sleep(30)
              // this.$router.push('/connect')
            }
        },
        clickLabel(labelName){
          this.changetext = labelName
          this.showQRCode()
        },
        showQRCode(){
          let This = this
          QRCode.toDataURL('dtns://web3:'+this.changetext, { errorCorrectionLevel: 'H' })
          .then(url => {
            //console.log(url)
            This.url = url
          })
          .catch(err => {
            console.error(err)
          })
        },
        /**
         * 查询所有的ib3.node节点
         * 包含了历史的
         */
        async queryAllIB3()
        {
          let result = await g_dchatManager.getWalletIB3List()
          console.log('g_dchatManager.getWalletIB3List-result:',result)
          {
            let tmpResult = []
            for(let i=0;i<result.length;i++)
            {
              let info = {web3name:result[i],alive_status:false}
              tmpResult.push(info)
            }
            this.history = tmpResult
          }
          // console.log(data)
          let iCnt = 30
          while(!g_dtnsManager.web3apps && iCnt>=0) {
            await rpc_client.sleep(100)
            iCnt -- 
          }
          this.allIbappsStatus = null;
          try{
            this.allIbappsStatus = await g_dtnsManager.queryIBAppListStatus()
          }catch(ex){
            console.log('changeSvrNode-queryIBAppListStatus:exception:'+ex,ex)
          }
          this.allIbappsStatus = this.allIbappsStatus ? this.allIbappsStatus : {}
          for(let i=0;g_dtnsManager.web3apps && i<g_dtnsManager.web3apps.length;i++)
          {
            let info = g_dtnsManager.web3apps[i]
            info.alive_status = this.allIbappsStatus ? this.allIbappsStatus['web3:'+info.web3name] : false
          }
          if(typeof g_dtnsManager!='undefined')  this.web3names = g_dtnsManager.web3apps
          console.log('created-web3names:',this.web3names)

          // let result = await g_dchatManager.getWalletIB3List()
          console.log('g_dchatManager.getWalletIB3List-result:',result)
          let tmpResult = []
          for(let i=0;i<result.length;i++)
          {
            let info = {web3name:result[i],alive_status:false}
            info.alive_status =  this.allIbappsStatus ? this.allIbappsStatus['web3:'+result[i]] : false
            tmpResult.push(info)
          }
          this.history = tmpResult
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
                && ret.xmsg.replace('<p>','').replace('</p>','') =='精选节点')
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
        async queryGoodIB3Nodes()
        {
          let dtnsLabelObj = await this.queryIB3LabelXMsg('dtns')
          let nowLabelObj = await this.queryIB3LabelXMsg(rpc_client.roomid)
          let dtnsGoodList = await this.queryIB3GoodList(dtnsLabelObj?dtnsLabelObj.xmsgid:null,'dtns')
          let nowGoodList = (rpc_client.roomid != 'dtns') ? await this.queryIB3GoodList(nowLabelObj?nowLabelObj.xmsgid:null,rpc_client.roomid) :[]
          console.log('dtnsLabelObj:',dtnsLabelObj,'dtnsGoodList:',dtnsGoodList)
          console.log('nowLabelObj:',nowLabelObj,'nowGoodList:',nowGoodList)
          this.goodList = dtnsGoodList.concat(nowGoodList)
          console.log('this.goodList',this.goodList)
        } 
    },
    async created(){//进入页面就执行
        //   let nodeItemName = localStorage.getItem('now_roomid')
          this.changetext = rpc_client.roomid//nodeItemName && nodeItemName.length>=1 ? nodeItemName: rtc_client.roomid
          this.showQRCode()
          await this.queryAllIB3()
          await this.queryGoodIB3Nodes()
        },
  };
  </script>
  
  <style lang="stylus" scoped>
  .input {
  width:90%; height:29px; padding-bottom:2px; padding-left:5px; border:1px solid #eeeeee; font-size:13px;
  }
  .logo[data-v-16247baa] .van-button__text{
    background-color rgb(21, 160, 231)
  }
  * {
    background-color: #fff;
    touch-action: pan-y;
  }
  .van-divider{
    border-top-width 5px
  }
  .topbar >>> .van-nav-bar {
    height: 44px;
    margin-bottom: 40px;
    background-color #fff
  }
  .logo[data-v-287f5d15]{
    margin-bottom 0
  }
  
  .topbar[data-v-287f5d15] .van-nav-bar__title {
    background-color #fff
  }
  .box >>> .van-nav-bar__arrow{
    color:#000
  }
  .logo {
    margin-bottom: 50px;
    text-align:center;
  }
  
  .logo >>> .van-uploader {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .logo >>> .van-button--primary {
    background-color: #07c160;
    color: #999;
    margin: 0 auto;
  }
  
  .logo >>> .van-button {
    margin: 0 auto;
  }
  
  .logo >>> .van-button__icon {
    background-color: #07c160;
    color: #fff;
  }
  
  .logo >>> .van-button__text {
    background-color: #07c160;
    color: #fff;
  }
  
  .hr >>> .van-divider {
    margin-bottom: 40px;
  }
  
  .change >>> .van-cell {
    border: 1px solid #eee;
    width: 300px;
    margin: 0 auto;
  }
  
  .change button {
    display: block;
    margin: 40px auto;
    background-color: #07c160;
    color: #fff;
    border: none;
    width: 100px;
    height: 40px;
  }
  .img{
    position:relative;
    width:200px;
  }
  .img >>> p{
    position:absolute;
    top:30px;
    left:43px;
    font-size:22px;
    background-color :#f44
  }
  </style>
  