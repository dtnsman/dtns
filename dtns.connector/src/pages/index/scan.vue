
<template>
  <div style="position:fixed; width:100%; height:100%; background-color:#fff;" class="box">
    <van-nav-bar  title="扫一扫" left-arrow  @click-left="cancelScan">
      <template #right>
        <van-uploader :after-read="Album" accept="image/*" >
          <span style="font-size:16px; color:#222;">相册</span>
        </van-uploader>
      </template>
    </van-nav-bar>
    <div class="mui-content">
      <div class="scan">
        <div id="bcid">
          <div class="content"></div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script  type='text/ecmascript-6'>
// import qrcodeDecorder from 'qrcode-decoder'
  let scan = null;
  //点手机虚拟返回键
     document.addEventListener("plusready", function() {
        // 注册返回按键事件
        plus.key.addEventListener('backbutton', function() {
            // 事件处理
            scan.close();//关闭条码识别控件
            window.history.back();
        }, false);
    });
    
  export default{
      data(){
        return{
          codeUrl: '',
          isShow:true,
          show:false,
          scan:'',
        }
      },
    //   components:{
    //         topbar
    //     },
      mounted () {
        this.startScan()//进入页面就调取扫一扫
      },
      created(){
        this.startRecognize();
        this.startScan();
      },
      methods: {
      //创建扫描控件
      startRecognize() {
        let that = this;
        if (!window.plus) return;
        that.isShow=false;
        // 创建条码扫描识别控件
        scan = new plus.barcode.Barcode('bcid',[plus.barcode.QR,plus.barcode.EAN8,plus.barcode.EAN13],{frameColor:'#00FF00',scanbarColor:'#00FF00'});
        // 条码识别成功
        console.log(this)
        scan.onmarked = onmarked;
        this.scan = scan
        async function onmarked(type, result, file) {
          switch (type) {
            case plus.barcode.QR:
              type = 'QR';
              break;
            case plus.barcode.EAN13:
              type = 'EAN13';
              break;
            case plus.barcode.EAN8:
              type = 'EAN8';
              break;
            default:
              type = '其它' + type;
              break;
          }
          result = result.replace(/\n/g, '');
          // console.log(this)
          that.codeUrl = result;//扫描后返回值
          console.log('scan.vue-result:',result)
          // console.log(this.codeUrl)
          let msgCodeUrl = that.codeUrl.indexOf("msg_");
          let userCodeUrl = that.codeUrl.indexOf('user_');
          if(msgCodeUrl == 0)
          {
            // alert('这是聊天室id' + that.codeUrl)
            scan.cancel();//关闭扫描
            scan.close();//关闭条码识别控件
            that.$router.push(`/index/scanGroup/${that.codeUrl}`);//扫码进入群聊
          }else if(userCodeUrl == 0)
          {
            // alert('这是用户userid' + that.codeUrl)
            scan.cancel();//关闭扫描
            scan.close();//关闭条码识别控件
            that.$router.push(`/index/GroupInformation/GroupOwner/${that.codeUrl}`);//扫码添加好友
          }
          else if(that.codeUrl.indexOf('dtns_')==0)
          {
            scan.cancel();//关闭扫描
            scan.close();//关闭条码识别控件
            // that.$toast('识别出收款账户，正在跳转..')
            // that.$toast.success('识别出收款账户，正在跳转..')
            localStorage.setItem('poster_type','dtns')
            localStorage.setItem('poster_value',that.codeUrl.trim())//值
            that.$router.push('/poster/dtns')
          }
          else if(that.codeUrl.indexOf('dtns://')==0)
          {
            scan.cancel();//关闭扫描
            scan.close();//关闭条码识别控件
            let tmpClient =await g_dtnsManager.connect(that.codeUrl)
            //正确识别带参数的that.codeUrl
            let web3appInfo = await g_dtnsManager.nslookup(that.codeUrl)
            if(tmpClient){
              let switchRet = await g_dchatManager.switchIB3(tmpClient.roomid,null,true,
                    web3appInfo & web3appInfo.params ? web3appInfo.params.invite_code:null)
              console.log('switchRet:',switchRet)
            }else{
              alert('识别出未知的ib3.0智体节点：'+that.codeUrl)
              console.log('codeUrl-tmpClient is null',codeUrl,tmpClient)
            }
          }
          else
          {
            alert('识别出未知内容：'+that.codeUrl);
            // alert('无法识别该二维码')
            scan.cancel();//关闭扫描
            scan.close();//关闭条码识别控件
            that.$router.push('/index');
          }
        }
        
      },
      async Album(data){ //点击调用手机相册
        if (window.plus)
        {
        scan.cancel();//关闭扫描
        scan.close();//关闭条码识别控件
        }
        let img_kind = data.file;

        
        // .then(function (result) {
        //     console.log(result);
        // })
        // let formData = new FormData();
        // formData.append("img_kind", "open");
        // formData.append("file", img_kind);
        // let config = {
        //   headers: {
        //     enctype: "multipart/form-data"
        //   }
        // };
        // let res = await this.$api.network.imgScan(formData)//this.$axios.post(`${this.$baseUrl}/qrcode/scan`, formData, config)//上传图片
        // console.log(res)
        // this.codeUrl = res.data.qrcode_data
        // if(!res.data.ret)
        // {
        //   alert('无法识别该图片，请上传有效的二维码')
        //   return;
        // }
        console.log('img_kind',img_kind)
        let rurl = await TCQrcode.decodeFromFile(img_kind)
        this.codeUrl = rurl;
        console.log('scan.vue-rurl:',rurl)

        let msgCodeUrl = this.codeUrl.indexOf("msg_");
        let userCodeUrl = this.codeUrl.indexOf("user_");
        console.log(msgCodeUrl)
          if(msgCodeUrl == 0)
          {
            this.$toast.success('识别成功')
            this.$router.push(`/index/scanGroup/${this.codeUrl}`);//扫码进入群聊
          }else if(userCodeUrl == 0)
          {
            this.$toast.success('识别成功')
            this.$router.push(`/index/GroupInformation/GroupOwner/${this.codeUrl}`);//扫码添加好友
          }
          else if(this.codeUrl.indexOf('dtns_')==0)
          {
            // this.$toast.success('识别出收款账户，正在跳转..')
            localStorage.setItem('poster_type','dtns')
            localStorage.setItem('poster_value',this.codeUrl.trim())//值
            this.$router.push('/poster/dtns')
          }
          else if(this.codeUrl.indexOf('dtns://')==0)
          {
            let tmpClient =await g_dtnsManager.connect(this.codeUrl)
            //正确识别带参数的this.codeUrl
            let web3appInfo = await g_dtnsManager.nslookup(this.codeUrl)
            if(tmpClient){
              let switchRet = await g_dchatManager.switchIB3(tmpClient.roomid,null,true,
                    web3appInfo & web3appInfo.params ? web3appInfo.params.invite_code:null)
              console.log('switchRet:',switchRet)
            }else{
              alert('识别出未知的ib3.0智体节点：'+this.codeUrl)
              console.log('codeUrl-tmpClient is null',codeUrl,tmpClient)
            }
          }
          else
          {
            alert('识别出未知内容：'+this.codeUrl)
          }

        },
         getObjectURL(file) {
                let url = null;
                url = window.createObjectURL(file);
                // if (window.createObjectURL !== undefined) { // basic

                //     url = window.createObjectURL(file);

                // } else if (window.URL !== undefined) { // mozilla(firefox)

                //     url = window.URL.createObjectURL(file);

                // } else if (window.webkitURL !== undefined) { // webkit or chrome

                //     url = window.webkitURL.createObjectURL(file);
                // }

                return url;
            },

      startScan() {
        if (!window.plus) return;
        this.startRecognize()//创建控件
        scan.start();
      },

      cancelScan(){//点击返回
        if (!window.plus)
        {
          this.$router.go(-1)
        }else
        {
          scan.cancel();//关闭扫描
          scan.close();//关闭条码识别控件
          this.$router.go(-1)
        }
      }
    }
  };
</script>
<style scoped>
.box >>> .van-nav-bar__arrow{
  color:#000;
  font-size:1.1rem;
}
 .mui-content{
  padding: 44px 0 60px 0;/*px*/
  box-sizing: border-box;
  margin-top: 60px;/*px*/
}
.scan {
    height: 100%;
}
.scan #bcid {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 50px;/*px*/
      bottom:3rem;
      text-align: center;
      color: #000;
      background: #fff;
}
.scan footer {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: 1rem;
      width: 100%;
      height: 1rem;
      /*line-height: 2rem;*/
      z-index: 2;
      display: flex;
      justify-content: center;
}
.scan footer button{
  width: 45%;
  font-size: 30px;/*px*/
}
.clickBtn,.cancelBtn{
  margin-top:20px;/*px*/
  width: 150px;/*px*/
  height: 60px;/*px*/
  text-align: center;;
}
.cancelBtn{
  margin-left: 20px;/*px*/
}
</style>