<template>
    <div class="box">
        <van-nav-bar :left-text="locStr" @click-left="showLocationFlag=true" :right-text="loginBackinStr" @click-right="refresh" />
      <div style="position:fixed;overflow-x:hidden;overflow-y:scroll;top:50px;bottom:0px;left:0;right:0;">
        <div class="logo" style="text-align: center; padding-left:15px; margin-top:20px; font-size:24px;">
          <img :src="imgUrl" width="117px" height="85px" style="border:2px solid #e0e0e0;margin-bottom: 18px;"><br/>
          {{connectToStr}}DTNS.network
        </div>
        <div v-if="loadding" style="text-align: center;width: 100%;font-size:15px;">加载中Loading...</div>
        <div v-if="!loadding">
          <div style="text-align: left; padding-left:15px; margin-top:20px; font-size:13px;" @click.stop="showInputBox(setSalt)">{{saltTipsStr}}：{{ salt }}<span v-if="!salt">{{ setSaltTipsStr }}</span></div>
          <div style="text-align: left; padding-left:15px; margin-top:10px; font-size:13px;">{{deviceStr}}：{{ deviceInfo }}</div>
          <div style="text-align: left; padding-left:15px; margin-top:10px; font-size:13px;">{{pubKeyStr}}：{{ public_key }}</div>
          <div style="text-align: left; padding-left:15px; margin-top:10px; font-size:13px;">{{signStr}}：{{ sign }}</div>
          <div style="text-align: left; padding-left:15px; margin-top:10px; font-size:13px;-moz-user-select: text;-webkit-user-select: text;user-select: text;">{{sumaryStr}}：<br/>{{ copyData }}</div>
          <div style="text-align: left; padding-left:15px; margin-top:10px; font-size:13px;-moz-user-select: text;-webkit-user-select: text;user-select: text;" @click="showInputBox(loginByPrivateKey)">{{click2inputSecretKeyStr}}</div>
          <!-- <div style="text-align: left; padding-left:15px; margin-top:20px; font-size:16px;">发送：{{ phones }}（任意发送1个手机号码即可）</div> -->
          <div style="text-align: left; padding-left:15px; margin-top:10px; font-size:13px;" v-show="notPhone || true">
            {{scanByPhoneTipsStr}}：{{ phone }}
            <div style="text-align:center;width:100%; height:213px;margin:0 auto;background-color:#fff;">
            <img :src="url" alt="" height="165px" width="165px" style="margin-top:15px;" @click="copy"><br/>
            {{ click2copyStr }}
          </div>
          </div>

          <div style="text-align:center;">
            <van-button type="primary" @click="connect" style="width:95%; border-radius:5px; font-size:16px; background-color:#15a0e7; margin-top:15px; border:none;">{{ sendSumaryBtnStr }}</van-button><br/>
            <van-button type="primary" @click="ok" style="width:95%; border-radius:5px; font-size:16px; background-color:#15a0e7; margin-top:15px; border:none;" v-show="true">{{ checkSendedStr }}</van-button><br/>
            <van-button  @click="change" style="width:95%; border-radius:5px; font-size:16px;  margin-top:15px; border:none;">{{ changeStr }}</van-button>
          </div>
        </div>
      </div>
      <van-popup v-model="showInputBoxFlag" style="height:110px;width:350px;border-radius:5px;overflow-y: auto;overflow-x: hidden;padding: 5px;">
            <h3>{{pleaseTips}}</h3>
            <input type="text" v-model="boxInputVal" style="width: 100%;"/><br/>
            <span @click="showInputBoxFlag=false,boxInputVal=null">{{ cancelStr }}</span>&nbsp; &nbsp; <span @click="okInput">{{ okStr }}</span>
      </van-popup>
      <van-popup v-model="showLocationFlag" style="height:400px;width:300px;border-radius:5px;overflow-y: auto;overflow-x: hidden;padding: 5px;">
            <h3>{{locStr}}</h3>
            <div v-for="(item,index) in locs" :key="index" @click="setLoc(item)" style="width:100%;line-height: 35px;height: 35px;border-bottom: 0.5px solid #909090;">
                <span>{{ item.key }}（{{ item.location }}）</span>
            </div>
        </van-popup>
    </div>
  </template>
  
  <script>
import imgUrl from "../../../static/images/connect-mini.jpg"
  export default {
    data() {
      return {
        public_key: "",
        private_key: "",
        sign:'',
        keyPair:null,
        deviceInfo:'',
        copyData:'',
        smsUrl:'',
        url:'',
        phones:[],
        phone:'',
        notPhone:false,
        imgUrl:imgUrl,
        ib3id:this.$route.params.ib3id,
        invite_code:this.$route.params.incode,
        loadding:true,
        salt:null,
        showInputBoxFlag:false,
        boxInputVal:'',
        showLocationFlag:false,
        locs:[],
        locStr:'zh（中文简体）',
        pleaseTips:'请输入',
        loginBackinStr:'重新登录',
        connectToStr:'连接',
        saltTipsStr:'隐私',
        setSaltTipsStr:'设置隐私通道（务必记住）',
        deviceStr:'设备',
        pubKeyStr:'公钥',
        signStr:'签名',
        sumaryStr:'汇总',
        scanByPhoneTipsStr:'请使用手机扫一扫复制内容，发送至手机号码',
        click2copyStr:'注意：点击图片可复制短信内容',
        sendSumaryBtnStr:'连接DTNS（发送汇总）',
        checkSendedStr:'确认已发送（短信）',
        changeStr:'切换',
        click2inputSecretKeyStr:'直接以密钥登录',
        pleaseInputPrivateKeyStr:'请输入密钥',
        pleaseInputSaltTipsStr:'请输入隐私通道',
        okStr:'确定',
        cancelStr:'取消',
      };
    },
    async mounted() {
      console.log('connect-params-ib3id:',this.ib3id,this.incode)
      if(this.ib3id)
      {
        while(!iWalletDb.db)  await rpc_client.sleep(100)
        while(!imageDb.db)  await rpc_client.sleep(100)
        while(!imDb.db)  await rpc_client.sleep(100)
        let iCnt = 100
        while(!rpc_client.pingpong_flag && iCnt>=0) {
          await rpc_client.sleep(50)
          iCnt -- 
        }

        let switchRet = await g_dchatManager.switchIB3(this.ib3id,this,false,this.invite_code)
        console.log('connect-switchRet:',switchRet)
        if(switchRet){
          console.log('switchIB3 return true')
          return 
        }else{
          //失败了就继续当前的连接（这个g_dchatManager.switchIB3接口会影响到rpc_client）
          this.loadding = false
        }
      }
      this.loadding = false
        await this.connectInfo()
    },
    async activated(){
      // this.ok()
    },
    methods: {
      setSalt()
      {
        let old = this.salt
        // this.salt = prompt("请输入隐私通道(salt)：",this.salt ? this.salt:'');
        this.salt = this.boxInputVal
        this.salt = !this.salt ? null : this.salt.substring(0,10)//限制为10个字符
        if(this.salt!=old)
        {
          this.connectInfo()
        }
      },
      async refresh()
      {
        // this.ok('yes')
        //直接使用changeSvrNode.vue带过来的源码2023-6-16
        let web3name = rpc_client.roomid
        let sessionInfo = await iSessionDb.getDataByKey('session:'+web3name)
        if(sessionInfo && sessionInfo.data)
        {
          let res = sessionInfo.data
          {
            // if(typeof g_connectIBChatSvr == 'function') g_connectIBChatSvr()
            localStorage.setItem('newDWebFlag','1')
                
            localStorage.setItem("s_id", res.s_id);
            localStorage.setItem("user_id", res.user_id);
            localStorage.setItem("userInfo",JSON.stringify(res))
            this.$toast.success("登录成功",1000);

            this.$api.network.startWebSocket();

            let new_mywallet = rpc_client.mywallet // await iWalletDb.getDataByKey('mywallet:'+this.changetext)
            console.log('new_mywallet:',new_mywallet)
            if(new_mywallet)
            {
              iWalletDb.deleteDataByKey('g_mywallet')
              iWalletDb.addData({key:'g_mywallet',data:new_mywallet})
              window.g_mywallet = rpc_client.mywallet
            }
            await rpc_client.sleep(30)//500)
            this.$router.push({name:"index",params:{noCache:true}});//清理掉缓存
          }
        }else{
          this.$toast.success("登录失败，原因：会话session不存在",1000);
        }
      },
      showInputBox(nowFunc)
      {
        if(nowFunc == this.loginByPrivateKey)
        {
          this.pleaseTips = this.pleaseInputPrivateKeyStr
        }else if(nowFunc == this.setSalt)
        {
          this.pleaseTips = this.pleaseInputSaltTipsStr
        }
        this.boxInputVal = ''
        this.showInputBoxFlag=true
        this.boxInputOkFunc = nowFunc
      },
      okInput()
      {
        this.showInputBoxFlag = false
        this.boxInputOkFunc()
      },
      loginByPrivateKey()
      {
        // let private_key = prompt(this.pleaseInputPrivateKeyStr+'：')
        let private_key = this.boxInputVal
        private_key = private_key ? private_key.trim() :''
        if(private_key.length<=10) return this.$toast(this.pleaseInputPrivateKeyStr)
        let public_key = key_util.getPublicKey(private_key)
        this.private_key = private_key
        this.public_key  = public_key
        console.log('loginByPrivateKey-ok-wallet:',this.private_key,this.public_key)
        // window.g_mywallet = {private_key:this.private_key,public_key:this.public_key,
        //       web3name:rpc_client.roomid}
        this.ok()
      },
      async ok(xflag = false){
        let This = this
        if(xflag == 'yes'){
          window.g_mywallet =null// rpc_client.init()会读取缓存
          rpc_client.setWallet(g_mywallet)//读取缓存
          window.g_mywallet = rpc_client.mywallet//g_mywallet设置为跟缓存一样
        }
        else {
          window.g_mywallet = {private_key:this.private_key,public_key:this.public_key,
              web3name:rpc_client.roomid}
          rpc_client.setWallet(g_mywallet)
        }
        console.log('connect-ok() -> xflag',xflag,'g_mywallet:',g_mywallet)
        let flag = true
        // while(flag){
          // rpc_client.setWallet(g_mywallet)
          rpc_client.init()

          //使用检测技术实现连接，以提升用户交互体验---避免无法预知的错误而浪费时间 2023-6-16
          let iCnt = 0
          while(iCnt<30 && !rpc_client.pingpong_flag){
            iCnt ++ 
            if(iCnt%10==0)  this.$toast("连接服务节点重试中",800);
            await rpc_client.sleep(100)
          }
          if(iCnt>=30){
            this.$toast("连接服务节点失败",2000);
            return 
          }
          // rpc_client.setPeerRefreshCallback(async function(){

            let web3name =  rpc_client.roomid ? rpc_client.roomid : 'dtns'
            let timestamp = parseInt( Date.now()/1000)
            let hash = await key_util.hashVal(web3name+':'+timestamp)
            let sign = await key_util.signMsg(hash,rpc_client.mywallet.private_key)

            let res =  await This.$api.network.userLoginBySafeDevice({web3name,sign,timestamp})
              .then(res => {
                console.log('ok->userLoginBySafeDevice-res:',res);
                if (res.ret == true) {
                  // alert("登陆成功");
                  // console.log(res.data.user_id)
                  // console.log(res.data.s_id)
                  // console.log(res);
                  // if(typeof g_connectIBChatSvr == 'function') g_connectIBChatSvr()
                  localStorage.setItem('newDWebFlag','1')
                  
                  localStorage.setItem("s_id", res.s_id);
                  localStorage.setItem("user_id", res.user_id);
                  localStorage.setItem("userInfo",JSON.stringify(res))
                  This.$toast.success("登录成功",1000);

                  This.$api.network.startWebSocket();

                  console.log('[ok]session:'+web3name+' save now:',res)
                  iSessionDb.deleteDataByKey('session:'+web3name)
                  iSessionDb.addData({key:'session:'+web3name,data:res}) 
                  iSessionDb.addData({key:'session:'+web3name+':'+Date.now(),data:res})

                  window.g_mywallet = rpc_client.mywallet
                  iWalletDb.deleteDataByKey('g_mywallet')
                  iWalletDb.addData({key:'g_mywallet',data:rpc_client.mywallet})
                  iWalletDb.addData({key:'g_mywallet:'+Date.now(),data:rpc_client.mywallet})

                  //更新 mywallet
                  iWalletDb.deleteDataByKey('mywallet:'+web3name)
                  iWalletDb.addData({key:'mywallet:'+web3name,data:rpc_client.mywallet})
                  iWalletDb.addData({key:'mywallet:'+web3name+':'+Date.now(),data:rpc_client.mywallet})

                  // console.log(s_id);
                  setTimeout(function(){
                    //This.$router.push("/index");
                    This.$router.push({name:"index",params:{noCache:true}});
                  },500)
                  flag = false
                } else {
                  //DTNS.network数据未同步
                  This.$toast("登录失败！原因："+(res && res.msg ? res.msg:'未知网络原因'),20000);
                }
              });
          // })
          // await rpc_client.sleep(10000)
        // }
      },
        copy(){
            try{
                navigator.clipboard.writeText(this.copyData);
                this.$toast("短信内容已复制",5000);
            }catch(ex){
                console.log('copy-exception:'+ex)
                this.$toast("短信内容复制失败，原因（可能无权限）",5000);
            }
        },
      async connectInfo(){
        this.notPhone = device.type!='mobile'
        this.deviceInfo = device.os +'-'+device.type +
                '('+ (Math.floor(new Date().getTime()/1000)).toString(36) +')'+  (this.invite_code?'@'+this.invite_code:'' )
        this.keyPair = eccryptoJS.generateKeyPair()
        this.private_key = bs58.encode( this.keyPair.privateKey)
        this.public_key = bs58.encode( eccryptoJS.getPublicCompressed(this.keyPair.privateKey))
        const msg = eccryptoJS.utf8ToBuffer(this.deviceInfo);
        let hash = await eccryptoJS.sha256(msg)
        this.sign = bs58.encode( await eccryptoJS.sign(this.keyPair.privateKey,hash,true))

        let splitStr = '|'
        this.copyData = splitStr+this.sign+splitStr
            +this.public_key.substring(this.public_key.length-4,this.public_key.length)
            +splitStr+this.deviceInfo+ splitStr+rpc_client.roomid+splitStr+(this.salt?this.salt+splitStr:'')
        console.log('copyData:'+this.copyData)

        this.phones = null;
        if(typeof g_axios !='undefined' && rpc_client.web3appInfo && rpc_client.web3appInfo.network_info 
          && rpc_client.web3appInfo.network_info.phones_urls && rpc_client.web3appInfo.network_info.phones_urls.length>0)
        {
          let phonesUrl =  rpc_client.web3appInfo.network_info.phones_urls[parseInt(Math.random()*1599999)%rpc_client.web3appInfo.network_info.phones_urls.length]
          let phonesRet = await g_axios.get(phonesUrl+'?random='+Math.random())
          this.phones = phonesRet && phonesRet.data ?phonesRet.data :phonesRet
          console.log('phonesUrl:',phonesUrl,phonesRet)
        }else{
          this.phones =  await this.$api.network.queryPopSafeSmsPhones()
        }
        console.log('phones:'+this.phones)
        if(!this.phones || this.phones.length<=0 )
        {
            this.$toast("无法获取connect-url（原因：上行通道的手机号码列表为空）",5000);
            return 
        }

        this.phone = this.phones[parseInt(Math.floor( Math.random()*199999999))%this.phones.length]
        let url = 'sms:'+this.phone+'?'+this.copyData
        console.log('connect-url:'+url)
        this.smsUrl= url

        let This = this
        QRCode.toDataURL(this.copyData)
            .then(url => {
            //console.log(url)
            This.url = url
            })
            .catch(err => {
                console.error(err)
            })
      },
      change(){
        this.$router.push("/changeSvrNode");
      },
      async connect() {
        if(!this.phones || this.phones.length<=0 )
        {
            this.$toast("无法获取connect-url（原因：上行通道的手机号码列表为空）",5000);
            return 
        }
        
        var a = document.createElement("a")//创建a标签触发点击下载
        a.setAttribute("href",this.smsUrl)//附上
        a.setAttribute("target","_blank")
        let clickEvent = document.createEvent("MouseEvents");
        clickEvent.initEvent("click", true, true);
        a.dispatchEvent(clickEvent);
      },
      setLoc(item){
            if(!item) return false
            localStorage.setItem('dtns-location',item.key)
            this.$toast('切换成功！所选区域为：'+item.key+'（'+item.location+'）')
            if(typeof g_pop_event_bus !=undefined){
                g_pop_event_bus.emit('update_dtns_loction',item)
            }
            this.showLocationFlag = false
        },
        translate()
        {
        //   loginBackinStr:'重新登录',
        // connectToStr:'连接',
        // saltTipsStr:'隐私',
        // setSaltTipsStr:'设置隐私通道（务必记住）',
        // deviceStr:'设备',
        // pubKeyStr:'公钥',
        // signStr:'签名',
        // sumaryStr:'汇总',
        // scanByPhoneTipsStr:'请使用手机扫一扫复制内容，发送至手机号码',
        // click2copyStr:'注意：点击图片可复制短信内容',
        // sendSumaryBtnStr:'连接DTNS（发送汇总）',
        // checkSendedStr:'确认已发送（短信）',
        // changeStr:'切换',
        // click2inputSecretKeyStr:'直接以密钥登录',
        // pleaseInputPrivateKeyStr:'请输入密钥',
        //pleaseInputSaltTipsStr:'请输入隐私通道',
        // okStr:'确定',
        // cancelStr:'取消',


            this.loginBackinStr = g_dtnsStrings.getString('/index/login/backin')
            this.connectToStr = g_dtnsStrings.getString('/index/connect/to')
            this.saltTipsStr = g_dtnsStrings.getString('/index/connect/salt')
            this.setSaltTipsStr = g_dtnsStrings.getString('/index/connect/salt/tips')
            this.deviceStr       = g_dtnsStrings.getString('/index/connect/device')
            this.pubKeyStr     = g_dtnsStrings.getString('/index/connect/pubkey')
            this.signStr      = g_dtnsStrings.getString('/index/connect/sign')
            this.sumaryStr       = g_dtnsStrings.getString('/index/connect/sumary')
            this.scanByPhoneTipsStr          = g_dtnsStrings.getString('/index/connect/scan/tips')
            this.click2copyStr     = g_dtnsStrings.getString('/index/connect/click2copy')
            this.sendSumaryBtnStr      = g_dtnsStrings.getString('/index/connect/sumary/send')
            this.checkSendedStr       = g_dtnsStrings.getString('/index/connect/check')
            this.changeStr          = g_dtnsStrings.getString('/index/connect/change')
            this.click2inputSecretKeyStr=g_dtnsStrings.getString('/index/connect/login-private-key')
            this.pleaseInputPrivateKeyStr=g_dtnsStrings.getString('/index/connect/input-private-key/please')
            this.pleaseInputSaltTipsStr=g_dtnsStrings.getString('/index/connect/input-salt/please')
            this.okStr              = g_dtnsStrings.getString('/index/ok')
            this.cancelStr          = g_dtnsStrings.getString('/index/cancel')
            this.locStr     = g_dtnsStrings.getString('/index/locations/change')  
        }
      },
      created(){//进入页面就执行
        this.locs = g_dtnsStrings.getLocations()
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
      },
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
  </style>
  