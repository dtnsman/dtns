export default (Vue) => {
    //初始化数据
    var init            = {
      default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAj0AAAAFCAYAAACuJ13oAAAAKElEQVRoBe3BAQEAAAABIP6fNkTVAAAcaAAADjQAAAcaAIADDQDAgQGzJAAGgN9bXgAAAABJRU5ErkJggg=='//'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII=',
    }
    var imageCatcheList = [];
    var scrollFuncs = []
    var imgInfoMap = new Map()
    var isLogoMap = new Map() 
    const clearImageLazyData = function(){
      for(let i=0;i<imageCatcheList.length;i++)
      {
        imageDb.delCache(imageCatcheList[i])
      }
      imageCatcheList = []
      scrollFuncs =[]
      imgInfoMap = new Map()
      isLogoMap = new Map()
    }
    window.clearImageLazyData = clearImageLazyData

    const setLazyImgInfo = function (img_id,imgInfo)
    {
      imgInfoMap.set(img_id,imgInfo)
    }
    window.g_setLazyImgInfo = setLazyImgInfo

    const setLogoMap = function (img_id)
    {
      isLogoMap.set(img_id,'')
    }
    window.g_setLogoMap = setLogoMap

    var observer = new IntersectionObserver(changes => {
      for (const change of changes) {
        // console.log(change.time);               // 发生变化的时间
        // console.log(change.rootBounds);         // 根元素的矩形区域的信息
        // console.log(change.boundingClientRect); // 目标元素的矩形区域的信息
        // console.log(change.intersectionRect);   // 目标元素与视口（或根元素）的交叉区域的信息
        // console.log(change.intersectionRatio);  // 目标元素与视口（或根元素）的相交比例
        // console.log(change.target);      
        // 被观察的目标元素
        if(change.isIntersecting){//intersectionRatio>0){
          if(!change.target.is_show_flag){
            isCanShow(change.target,change.target.dst_src)
            // 停止观察某个目标元素
            //observer.unobserve(change.target);
            change.target.is_clear_flag = false
            change.target.is_show_flag = true
          }
        }else{
          if(!change.target.is_clear_flag && !isLogoMap.has(change.target.dst_src))
          {
            console.log('show defult img , and clear the image cache')
            // let w = change.target.width ,h = change.target.height
            change.target.src = init.default
			//2023-5-31不再改变占位图的宽高
            // change.target.width = w
            // change.target.height = h
            imageDb.delCache(change.target.dst_src)
            change.target.is_clear_flag = true
            change.target.is_show_flag = false
          }
        }
      }
    }, {//rootMargin:'500px 0px 500px 0px',
      threshold:[0, 0.25, 0.5, 0.75, 1]});
    
    // // 开始观察某个目标元素
    // observer.observe(target);
    
    // // 停止观察某个目标元素
    // observer.unobserve(target);
  
    
    //是否已下载
    const hasLoad       = (src) => {
      if (imageCatcheList.indexOf(src) > -1) {
        return true;
      }
      else {
        return false;
      }
    }
    const fullFunc = function(el){
      //全屏显示图片的代码
      let full = async function(){
        el.onclick = null
        
        //自动识别二维码
        let codeUrl = await TCQrcode.decodeFromBase64(el.src)
        console.log('img-fullscreen-qrcode-codeUrl:',codeUrl)
        let msgCodeUrl = codeUrl.indexOf("msg_");
        let userCodeUrl = codeUrl.indexOf("user_");
        let dtnsUrl = codeUrl.indexOf("dtns_");
        let dtnsCodeUrl = codeUrl.indexOf('dtns://')
        if(msgCodeUrl ==0 || userCodeUrl==0 || dtnsCodeUrl == 0 || dtnsUrl==0)
        {
          let tips = msgCodeUrl==0 ? '群聊链接':(userCodeUrl == 0 ? '联系人' : dtnsUrl==0?'收款账户':'IB3.0智体节点')
          let jumpFlag = confirm('识别出'+tips+'，确定跳转？')
          if(jumpFlag){
            if(dtnsUrl==0)
            {
              localStorage.setItem('poster_type','dtns')
              localStorage.setItem('poster_value',codeUrl.trim())//值
              g_gotoPage('/poster/dtns')
            }
            else if(dtnsCodeUrl!=0)
            g_gotoPage(msgCodeUrl==0 ? `/index/scanGroup/${codeUrl}` :
                   `/index/GroupInformation/GroupOwner/${codeUrl}`)
            else{
              let tmpClient =await g_dtnsManager.connect(codeUrl)
              if(tmpClient){
                let switchRet = await g_dchatManager.switchIB3(tmpClient.roomid,null)
                console.log('switchRet:',switchRet)
              }else{
                console.log('codeUrl-tmpClient is null',codeUrl,tmpClient)
              }
            }
            return 
          }
        }
        el.requestFullscreen()
        document.onclick = function(){
          document.exitFullscreen()
          document.onclick = null
          el.onclick = full
        }
      }
      // let exitFull = function(){
      //   document.exitFullscreen()
      //   document.onclick = null
      // }
      if(!el.lzlogo_flag) //2023-7-11新增
      el.onclick = full
    }
    //图片下载处理
    const imageLoad     = async (el, src) => {
      console.log('imageLoad-src:'+src)
    //   var image    = new Image();
    //   image.onload = function () {
    //     el.src = src;
    //     imageCatcheList.push(src);
    //   }
    //   image.src    = src;
        let img_id = src
        let params = img_id && img_id.startsWith('dtns://') ? {}:{user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'}
        let reqUrl = img_id && img_id.startsWith('dtns://')  ? img_id.replace('&amp;','&') :'dtns://web3:'+rpc_client.roomid+'/image/view'
        let isBaseUrl = img_id && img_id.startsWith('data:image/')

        let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
        let body = imgInfoMap.get(img_id)
        let aes_web3key =body ? body.aes_web3key :null
        let is_encrypted =body? body.is_encrypted:null
        console.log('lazy-load-img:'+img_id,is_encrypted)
        el.src = init.default
        if(item){ el.src = item.data;imageCatcheList.push(src)}
        else if(isBaseUrl){
          el.src = img_id
        }
        else{
            // queryImg(reqUrl,params).then(async (data)=>{
            g_dtnsManager.run(reqUrl,params).then(async (data)=>{
              let tmpData = data.data 
              if(is_encrypted)
              {
                console.log('into lazy-img-decrypt:',body)
                // binary = binary.slice(0,)
                let deBinary = null
                if(aes_web3key)
                {
                  let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(aes_web3key)
                  console.log('aeskey:',aeskey,iv,aes_web3key)

                  let binary = rpc_client.dataURLtoBinary(tmpData)
                  console.log('lazy-img-binary:',binary)
                  if(binary)
                  try{
                    deBinary= await sign_util.decryptMessage(await sign_util.importSecretKey(aeskey),iv,binary.buffer,false)
                    console.log('img-aes-decrypted:',deBinary)
                  }catch(ex){
                    console.log('decryptMessage-exception:'+ex)
                    deBinary = binary
                  }
                }else{
                  console.log('is_encrypted:',is_encrypted,' but aes_web3key is null:',aes_web3key)
                }
                if(deBinary)
                {
                  let myBlob = new Blob([deBinary], { type: body.url });
                  // var myUrl = URL.createObjectURL(myBlob)
                  // el.src = myUrl
                  // console.log('img-aes-decrypted:myurl:',myUrl)

                  var reader=new FileReader();
                  reader.readAsDataURL(myBlob);
                  reader.onload=function(e)
                  {
                      let base64 = this.result
                      console.log('img-aes-decrypted:base64:',base64)
                      imageDb.addData({img_id,data:base64 })
                      el.src = base64
                  }
                }else{
                  el.src  = 'data:image/png;base64,undefined'
                }
              }
              else{
                el.src ='data:image/png;base64,'+data.data
                imageDb.addData({img_id,data:el.src })
              }
  
              if(imageCatcheList.indexOf(src)<0) imageCatcheList.push(src)
            //setTimeout(()=>This.chatRexord =  This.chatRexord,100)
            }).catch((ex)=>{
                console.log('load img error'+ex)
                el.src = init.default
            })
        //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
        }
        fullFunc(el)
    }
    //是否可以展示
    const isCanShow     =async (el, src) => {
      // console.log('into isCanShow src:'+src)
      // console.log('rect:',el.getBoundingClientRect())
      let rect = el.getBoundingClientRect()
      //节点离浏览器顶部的距离
      var offsetTop    = el.offsetTop;
      //页面可视区域的高度
      var windowHeight = window.innerHeight;
      var scroll       = windowHeight + window.scrollY;
      var offsetHeigth = el.offsetHeight;
      //if (rect.top>0 ) //scroll > offsetTop && (window.scrollY - offsetTop) < offsetHeigth) 
      {
        //查询图片是否已加载过，是则直接加载，否则先load
        if (hasLoad(src)) {
        //   el.src = src;
            let img_id = src
            let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'}
            let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
            el.src = init.default
            if(item) el.src = item.data
            else{
                queryImg('',params).then((data)=>{
                  if(data && data.data)
                  {
                    el.src ='data:image/png;base64,'+data.data
                    imageDb.addData({img_id,data:el.src })
                  }
                  else el.src = init.default
                //setTimeout(()=>This.chatRexord =  This.chatRexord,100)
                }).catch((ex)=>{
                    console.log('load img error',ex)
                    el.src = init.default
                })
            //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
            }
            fullFunc(el)
        }
        else {
          imageLoad(el, src);
        }
      }
    }
  
    const addListener = (el, bind) => {
      var imageSrc = bind.value;
      let changeFlag = !el.dst_src ? false : el.dst_src!=imageSrc
      console.log('img-v-lazy-bind-value:',imageSrc,changeFlag)
      //赋值默认值
      el.src       = init.default;
      el.dst_src = imageSrc
      el.onerror = function(){
        console.log('addListener-img-el-onerror-called')
        el.src = init.default
      }

       // 开始观察某个目标元素
      observer.observe(el);
      if(changeFlag){
        isCanShow(el,el.dst_src)
      }
  
      // isCanShow(el, imageSrc);


      // //window.addEventListener('scroll',
      // if(!hasLoad(imageSrc)) 
      // scrollFuncs.push(
      // function (event) {
      //   isCanShow(el, imageSrc, event);
      // });
      // window.scrollFuncs = scrollFuncs
      // window.imageCatcheList = imageCatcheList
    }

    const addLZLogoListener = (el, bind) => {
      var imageSrc = bind.value;
      // let changeFlag = !el.dst_src ? false : el.dst_src!=imageSrc
      //赋值默认值
      el.src       = init.default;
      el.dst_src = imageSrc
      el.lzlogo_flag = true
      el.onerror = function(){
        console.log('addLZLogoListener-img-el-onerror-called')
        el.src = init.default
      }

       // 开始观察某个目标元素
      observer.observe(el);
      // if(changeFlag){
      //   isCanShow(el,el.dst_src)
      // }
    }
  
    Vue.directive('lazy', {
      inserted: addListener,
      updated : addListener,
    })
    Vue.directive('lzlogo', {
      inserted: addLZLogoListener,
      updated : addLZLogoListener,
    })
  }