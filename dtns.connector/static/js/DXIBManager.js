/**
 * date:2023-11-7
 * DXIBManager是多文件构建的分布式dxib超级智体，后缀dxib
 * 为dxib的play协议（1-内部跳转；2-跳转外部的dxib应用）
 */
const dxibJsonExample = {
    "main":"@main", //入口main-action
    "index":"index.json",//索引index.json
    "name":"xstory测试test",//在这里,name与xmsg的函数一致
    "xmsg":"xstory测试test", //utf-8名称，兼容xmsg协议
    "logo":"dtns://", // or @xxxx-folder/yyyy.png 资源文件（显示图标）
    "xtype":"dxib",//执行类型为dxib、xstory（故事板）
    "dxib_url":"dtns://",//由url定义或直接是本zip文件夹（里面包含了xstore.json---即actions-list以及其它的资源文件）
    "player":"xvideo",//入口程序执行由xvideo执行（也可由其他的来执行之）---或者由index=main之actions定义
    "actions_type":"json",//由json类型定义，或者由poplang、minicard来进行
    // "actions_url":"dtns://",//由dtns协议来访问 ----由url指定了的
    "actions": //actilns-map（这个可定义，也可不定义）
    [
        {
            "name":"@main", //核心建议不以action-name作为索引，建议以url作为索引【待考虑与浏览器兼容性】
            "url":"xxxx.webm",
            "xtype":"video",
            "ended":"@main_ended", //例如xvideo有结束事件（无如，则代表则个actions结束），将启动结束的mini-card进行交互
            "history":true //代表是否可以被历史纪录保存
        },
        {
            "name":"@main_ended",
            "url":"xxxx.pop.json",//@folder/file.json @开头代表着使用当前的dxib-zip文件中的资源
            "xtype":"minicard", //xtype类型，指示例如何种技术打开url
            "new":"",//new代表着是否进入新的窗口播放，还是当前窗口
            "history":false,  //代表是否可以被历史纪录保存----mini-card这里是弹窗提示，不被保存
            "deps":["@good1","@good2"] //依赖的actions，以供预加载
        },
        {
            "name":"@good",
            "url":"dtns://",//跳转的目标协议（由新的打开
            "xtype":"dxib", //xtype类型---打开新的，xstory
            "new":"",//new代表着是否进入新的窗口播放，还是当前窗口
            "history":false  //代表是否可以被历史纪录保存----mini-card这里是弹窗提示，不被保存
        }
    ]
}

// const dxibIndexJsonName = 'index.json'
/**
 * 命名：DXIBManager
 * 用途：用于dxib的story-actions的【管理与控制】，并且加载res-files或者dtns-url指向的远程的资源
 * 注意：play等返回的是actionInfo，由宿主程序进行【渲染】执行，DXIBManager主要是控制管理
 */
class DXIBManager
{
    //stateParams为外部指定参数
    constructor(dxibObj,stateParams = null)
    {
        this.history = [] //用于记录当前加载播放的进度（例如哪一个）
        this.now_pos = -1 //用于历史纪录的回退和前进
        // this.dtnsUrl = dtnsUrl //播放的是哪一个dxib
        this.dxibObj = dxibObj
        // this.actionCallback = actionCallback //用于执行特定的action时的回调
        this.zip = null //一个zip包，用于管理zip资源文件（默认是zip类型的资源）
        this.dxibFileData = null
        this.zipResMap = new Map()
        this.indexJson = null //包含了actions的入口文件
        this.actions = null
        this.actionsH= null
        this.resCacheMap = new Map() 
        this.stateParams = stateParams
        //根据dxibObj加载url资源（包含了actions等的zip文件--为.dxib文件）
        // loadRes()----创建instance之后，由外部手工调用loadRes
    }
    getDXIBObj()
    {
        return this.dxibObj
    }
    getDXIBFileData()
    {
        return this.dxibFileData
    }
    getIndexJson()
    {
        return this.indexJson
    }
    getActions()
    {
        return this.actions
    }
    //完成资源文件的加载，通过xtype判断类型，通过res_url完成加载（主要是xmsg协议格式）
    async loadRes()
    {
        if(!this.dxibObj) return -10
        //判断支持的类型
        if(['dxib','xstory'].indexOf(this.dxibObj.xtype) <0) return -1
        let fileData = await g_dchatManager.queryXFileInfo(this.dxibObj.dxib_url)//?this.dxibObj.dxib_url:this.dxibObj.res_url)//通过res_url/url来查找
        console.log('loadRes-fileData:',fileData,this.dxibObj.dxib_url)//,this.dxibObj.res_url)
        this.dxibFileData = fileData
        if(!fileData) return -2
        this.zip = new JSZip();
        let fileZip = await this.zip.loadAsync(fileData)//zip.file("tmp.txt",oldData)
        console.log('fileZip:',fileZip)
        // //添加文件夹和文件
        // zip.folder("images");
        // zip.folder("css").file("style.css", "body {background: #FF0000}");
        // // or specify an absolute path (using forward slashes)
        // zip.file("css/font.css", "body {font-family: sans-serif}")
        // zip.file("images/1.test.img", "img{testtet}")

        let file = null;
        let cnt = 0
        for (let zfile in fileZip.files) {
            file =fileZip.files[zfile] ;
            console.log('jszip-unzip-file:',file)
            this.zipResMap.set(file.name,file) //保存在this.zipResMap中，以便通过res来查找
            // break;
            cnt++
        }

        //得到actions
        try{
            if(this.zipResMap.has(this.dxibObj.index))
            {
                let fileData = await this.zipResMap.get(this.dxibObj.index).async('uint8array')
                let utf8decoder = new TextDecoder()
                let text =  utf8decoder.decode(fileData)
                this.indexJson = JSON.parse(text)
            }
        }catch(ex)
        {
            console.log('load-indexJson-exception:'+ex,ex)
        }
        // this.indexJson = this.zipResMap.has(this.dxibObj.index) ?  this.zipResMap.get(this.dxibObj.index) :null //入口文件
        this.actions = this.indexJson ? this.indexJson.actions :[]
        console.log('actions:',this.actions,this.indexJson)

        //仅保存能被索引的（目录）
        if(this.actions && this.actions.length>0)
        {
            this.actionsH = []
            for(let i=0;i<this.actions.length;i++)
            {
                if(this.actions[i].history)
                    this.actionsH.push(this.actions[i])
            }
        }

        let loadStateFlag = await this.loadState()
        console.log('loadStateFlag:',loadStateFlag,this.history,this.now_pos)

        return cnt
    }
    //得到当前action的位置
    findActionPos(urlOrName)
    {
        if(!urlOrName) return null
        let isNameFlag = urlOrName.startsWith('@') 
        if(!this.actionsH || this.actionsH.length <=0) return null
        for(let i=0;i<this.actionsH.length;i++)
        {
            if(isNameFlag)
            {
                if(this.actionsH[i].name == urlOrName) return i
            }
            else{
                if(this.actionsH[i].url == urlOrName) return i
            }
        }
        return -1
    }
    //由urlOrName查询ActionInfo--------------------wait for fix bug （主要是file-url与dtns-url的问题）
    findActionInfo(urlOrName)
    {
        if(!urlOrName) return null
        //@name开头的，代表了使用name
        if(!urlOrName.startsWith('@')){
        // if(urlOrName.startsWith('dtns://') || urlOrName.startsWith('@') 
        //         || urlOrName.startsWith('/') || urlOrName.startsWith('./'))
            return this.findActionInfoByUrl(urlOrName)
        }
        else
        {
            //第一个@仅是提示符？-----更改为，所有的name必须首字符是@---因为还有deps
            return this.findActionInfoByName(urlOrName)//.substring('@'.length,urlOrName.length))
        }
    }
    //根据actionName查询
    findActionInfoByName(name)
    {
        if(!name) return null
        if(!this.actions || this.actions.length <=0) return null
        for(let i=0;i<this.actions.length;i++)
        {
            if(this.actions[i].name == name) ///this.actions[i].xmsg == name || 
                return this.actions[i]
        }
        return null
    }
    //根据url来获得actionInfo
    findActionInfoByUrl(url)
    {
        if(!url) return null
        if(!this.actions || this.actions.length <=0) return null
        for(let i=0;i<this.actions.length;i++)
        {
            if(this.actions[i].url == url)
                return this.actions[i]
        }
        return null
    }
    //进入启动函数(由this.dxibObj.main入口指定)
    play()
    {
        if(!this.dxibObj) // || !this.dxibObj.main
            return null
        if(this.now_pos>=0)
        {
            if(!this.history || this.history.length<=0 || this.now_pos >= this.history.length)
                return null
            //直接由历史纪录启动--默认情况下
            return this.playActionByName(this.history[this.now_pos])
        }
        //启动首页
        return this.playActionByName(this.dxibObj.main)
    }
    //执行动作
    playAction(urlOrName,history = true)
    {
        let actionInfo = this.findActionInfo(urlOrName)
        if(!actionInfo) return null
        //if(typeof this.actionCallback == 'function') this.actionCallback(name,params)//告诉宿主方，正在执行特定的action
        let actionName = actionInfo.name ? actionInfo.name :actionInfo.xmsg
        if(history && actionInfo.xtype!='dxib' && actionInfo.history && (this.history.length<=0 || this.history[this.history.length-1] != actionName))
            this.history.push(actionName)
        //执行动作
        return {actionInfo,context:this} //由宿主进行操作
    }
    //加载网络资源或本地缓存，进入目标路径开启运行
    //#1 视频 ---有ended事件--是否支持多个事件（例如点击、双击、触屏等--亦或是由xmsg直接进行）
    //#2 xdoc、pdf（有ended事件）、md、txt等
    //#3 xpaint等
    //#4 xverse 3D模型
    //#5 xdraw 2D绘画
    playActionByUrl(url = null)//已经在构造函数中运行
    {
        if(!url) return null
        let actionInfo = this.findActionInfoByUrl(url)
        if(!actionInfo) return null
        //if(typeof this.actionCallback == 'function') this.actionCallback(name,params)//告诉宿主方，正在执行特定的action
        let actionName = actionInfo.name ? actionInfo.name :actionInfo.xmsg
        if(actionInfo.history && actionInfo.xtype!='dxib' && (this.history.length<=0 || this.history[this.history.length-1] != actionName))
            this.history.push(actionName)
        //执行动作
        return {actionInfo,context:this} //由宿主进行操作
    }
    //执行动作---由poplang绑定，以便执行到目标的action（内部跳转）
    playActionByName(name)
    {
        if(!name) return null
        let actionInfo = this.findActionInfoByName(name)
        if(!actionInfo) return null
        //if(typeof this.actionCallback == 'function') this.actionCallback(name,params)//告诉宿主方，正在执行特定的action
        let actionName = actionInfo.name ? actionInfo.name :actionInfo.xmsg
        if(actionInfo.history && actionInfo.xtype!='dxib' && (this.history.length<=0 || this.history[this.history.length-1] != actionName))
            this.history.push(actionName)
        //执行动作
        return {actionInfo,context:this} //由宿主进行操作
    }
    //退出函数
    exit()
    {
        this.saveState() //将当前进度保存至ifileDb中（其它不做处理---可迅速恢复现场）
    }
    //在history数组中，结合now_pos来定位执行哪一个action----导航之前进回退、刷新refresh
    go(pos)//-1,0,1
    {
        this.now_pos += pos
        if(!this.history || this.history.length<=0) return this.now_pos = -1

        this.now_pos = (this.now_pos>=this.history.length) ? this.history.length-1:this.now_pos
        this.now_pos = (this.now_posM<0) ? 0:this.now_pos

        // if(this.history[this.history.length-1] != this.history[this.now_pos])
        //     this.history.push(this.history[this.now_pos]) //只能追加，不能真正退出
        return this.now_pos
    }
    //进入队列末尾
    refresh()
    {
        this.now_pos = this.history ? this.history.length-1: -1
        this.go(0) //进入末尾
    }
    //当前游标的actionInfo（用于使用导航时，指示当前位置的ActionInfo，以便不以play的方式进行play播放出来出来）
    nowActionInfo()
    {
        let pos = this.go(0)
        if(pos <0 || !this.history || this.history.length<=pos)
            return null
        return this.findActionInfo(this.history[pos])
    }
    //保存历史纪录至ifileDb中，包含当前的now_pos的state状态（以便下次打开时恢复）
    saveState(stateParams = null)
    {
        if(!this.dxibObj || !this.dxibObj.dxib_url)
            return false
        ifileDb.deleteDataByKey('dxib-history:'+this.dxibObj.dxib_url )
        ifileDb.addData({key:'dxib-history:'+this.dxibObj.dxib_url,data:{history:this.history,now_pos:this.now_pos,stateParams}} )
        return true
    }
    //从ifileDb中恢复过来（histor和now_post对应的state等）
    async loadState()
    {
        if(!this.dxibObj || !this.dxibObj.dxib_url)
            return false
        let stateItem = await ifileDb.getDataByKey('dxib-history:'+this.dxibObj.dxib_url )
        console.log('loadState-stateItem:',stateItem)
        if(!stateItem || !stateItem.data ) return false
        //更新当前状态
        this.history = stateItem.data.history
        this.now_pos = stateItem.data.now_pos

        //可能包含了当前的播放进度等状态参数
        if(!this.stateParams) this.stateParams = stateItem.data.stateParams //可能包含了当前的播放进度等状态参数
        return true
    }
    //------------------------以下进行playAction之后，再直接await loadActionResFile加载得到目标资源文件
    //预加载资源
    async preLoadActionDepsFile(actionInfo)
    {
        if(!actionInfo || !actionInfo.deps || actionInfo.deps.length<=0) return false
        let deps = actionInfo.deps
        let cnt = 0
        for(let i=0;i<deps.length;i++)
        {
            if(!deps[i]) continue
            let actionInfo = this.findActionInfo(deps[i]) //deps[i]可以是@name、非dtns-url的本地res资源或dtns-url的远程资源
            let fileData = await this.loadActionResFile(actionInfo) //异步加载中
            console.log('preLoadActionDepsFile-deps-'+i,deps[i],fileData,actionInfo)
            cnt += fileData ? 1:0
        }
        console.log('preLoadActionDepsFile-success-cnt:',cnt,actionInfo)
        return cnt>0
    }
    //加载特定的action---由网络加载，或者从zip文件中加载
    async loadActionResFile(actionInfo,preLoadDeps = true)
    {
        if(!actionInfo ||!actionInfo.url)
            return null

        // if(actionInfo.xtype == 'dxib')
        // {
        //     //启动一个远程的dxib-----加载资源，但是并不解析执行---在play时进行相应的跳转。。
        //     return null 
        // }

        //统一预加载资源,10秒之后
        let This = this
        if(preLoadDeps)
        setTimeout(async ()=>{
            let preLoadRet = await This.preLoadActionDepsFile(actionInfo)
            console.log('loadActionResFile-preLoadRet:',preLoadRet,actionInfo)
        },100)//从10s减少至100ms（加快预加载资源）

        if(this.resCacheMap.has(actionInfo.url)) return this.resCacheMap.get(actionInfo.url)

        //非dtns资源的都是本地res-url资源
        if(actionInfo.url.startsWith('dtns://'))
        {
            let fileData = await g_dchatManager.queryXFileInfo(actionInfo.url)
            console.log('loadActionResFile from dtnsUrl:',fileData,actionInfo.url)
            //uint8array
            if(fileData) this.resCacheMap.set(actionInfo.url,fileData)
            return fileData
        }else{
            if(this.zipResMap.has(actionInfo.url))
            {
                let fileData = await this.zipResMap.get(actionInfo.url).async('uint8array')
                console.log('loadActionResFile from zipRes-files:',fileData,actionInfo.url)
                if(fileData) this.resCacheMap.set(actionInfo.url,fileData)
                return fileData
            }else{
                return null
            }
        }
    }   
    /**为poplang追加一系列的opcode */
    initDXIBRuntime(poplang,dxib)
    {
        if(!poplang || !dxib) return false
        let that = this
        //添加函数list....
        poplang.binderAddOpcode('dxib.play',async function(context,opcode,token_x,token_y,opval,extra_data){
            return context['$ret'] = await that.start(dxib.viewThis,context[token_x] ?context[token_x]:token_x )
        })

        //go -1 0 1 etc
        poplang.binderAddOpcode('dxib.go',async function(context,opcode,token_x,token_y,opval,extra_data){
            let stepCnt = context[token_x] ?context[token_x]:token_x 
            that.go(isFinite(stepCnt) ? stepCnt :0)
            console.log('dxib.go-that.now_pos:',that.now_pos)
            return context['$ret'] = await that.start(dxib.viewThis, null ,true,true )
        })

        //刷新
        poplang.binderAddOpcode('dxib.refresh',async function(context,opcode,token_x,token_y,opval,extra_data){
            that.refresh()
            console.log('dxib.refresh-that.now_pos:',that.now_pos)
            return context['$ret'] = await that.start(dxib.viewThis, null ,true,true )
        })

        //购买头榜
        poplang.binderAddOpcode('dxib.pay',async function(context,opcode,token_x,token_y,opval,extra_data)
        {
            let xmsgid= context[token_x] ?context[token_x]:token_x 
            localStorage.setItem('poster_type','xmsg')
            localStorage.setItem('poster_value','rels')//购买头榜
            dxib.viewThis.$router.push('/poster/'+xmsgid)
            return context['$ret'] = true
        })

        //下一个（相册类操作）
        poplang.binderAddOpcode('dxib.next',async function(context,opcode,token_x,token_y,opval,extra_data){
            let lastActionInfo = that.lastActionInfo
            let dstPos = -1
            if(lastActionInfo) dstPos = that.findActionPos(lastActionInfo.name) + 1
            if(that.actionsH && that.actionsH.length>0)
                dstPos = dstPos<0 ? 0 :( dstPos>=0 && dstPos < that.actionsH.length ? dstPos : that.actionsH.length-1)
            else
                return context['$ret']=false

            return context['$ret'] = await that.start(dxib.viewThis, that.actionsH[dstPos].name ,true,true )
        })
        //上一个（相册类操作）
        poplang.binderAddOpcode('dxib.pre',async function(context,opcode,token_x,token_y,opval,extra_data){
            let lastActionInfo = that.lastActionInfo
            let dstPos = -1
            if(lastActionInfo) dstPos = that.findActionPos(lastActionInfo.name) - 1
            if(that.actionsH && that.actionsH.length>0)
                dstPos = dstPos<0 ? 0 :( dstPos>=0 && dstPos < that.actionsH.length ? dstPos : that.actionsH.length-1)
            else
                return context['$ret']=false

            return context['$ret'] = await that.start(dxib.viewThis, that.actionsH[dstPos].name ,true,true )
        })
        //打开或者关闭vtips（以便支持按照进度来showVtips）
        poplang.binderAddOpcode('dxib.vtips',async function(context,opcode,token_x,token_y,opval,extra_data){
            if(!(dxib.viewThis && typeof dxib.viewThis.showVTIPS =='function'))
            {
                console.log('DXIBManager-call dxib.viewThis.showVTIPS function unexists!')
                return context['$ret'] = null 
            }

            //判断是否是关闭
            let closeOp = context[token_y] ?context[token_y]:token_y 
            if(closeOp == 'close') {
                console.log('DXIBManager-call dxib.viewThis.showVTIPS(close)')
                dxib.viewThis.showVTIPS(null)//调用了更新函数(如果页面未发生变化)
                return context['$ret'] = true
            }

            //如果是打开，则获取相应的actionInfo以及对应的资源文件
            let actionInfoW = that.playAction(context[token_x] ?context[token_x]:token_x , false ) //追加使用了history=false（show-vtips不显示在history中）
            console.log('dxib.vtips-actionInfo:',actionInfoW,context[token_x] ?context[token_x]:token_x)
            if(!actionInfoW) return context['$ret'] = null 

            let resFileData = await that.loadActionResFile(actionInfoW.actionInfo)
            console.log('dxib.vtips-loadActionResFile-resFileData:',resFileData)
            if(!resFileData) return context['$ret'] = null 

            let vtipsJson = null
            try{
                let utf8decoder = new TextDecoder()
                let text =  utf8decoder.decode(resFileData)
                vtipsJson = JSON.parse(text)
            }catch(ex)
            {
                console.log('dxib.vtips-parse-resFileData-exception:'+ex,ex)
                return context['$ret'] = null 
            }
            console.log('dxib.vtips-parse-result-vtipsJson:',vtipsJson)
            if(!vtipsJson) return context['$ret'] = null 

            console.log('DXIBManager-call dxib.viewThis.showVTIPS(true)',vtipsJson)
            dxib.viewThis.showVTIPS(vtipsJson)//调用了更新函数(如果页面未发生变化)

            return context['$ret'] = actionInfoW.actionInfo
        })
        return true
    }
    //刷新dxibViewer子组件内容
    setDXIBViewerUpdateFunc(func,dxibViewer)
    {
        if(typeof func !='function') return false
        this.dxibViewerUpdateFunc = func
        this.dxibViewer = dxibViewer
        return true
    }
    /**
     * start
     */
    async start(viewThis,name=null,dxibFlag = true,needDXIBUpdate = false)
    {
        let actionInfoW = name ? this.playActionByName(name):  this.play()
        console.log('DXIBManager-start-actionInfoW:',actionInfoW)
        if(!actionInfoW) return false

        //如果xtype==dxib---直接跳转/dxib
        if(actionInfoW.actionInfo.xtype == 'dxib')
        {
            //默认以index.json来启动，如果不行，则下载文件
            let strs = ['','1','2','3','4','5']
            let flag = false
            for(let i=0;i<strs.length;i++)
            {
              try{
                let dxibItem = {index:'index'+strs[i]+'.json',xtype:'dxib',dxib_url:actionInfoW.actionInfo.url,xmsg:actionInfoW.actionInfo.xmsg,name:actionInfoW.actionInfo.name}
                let dxibManager =  new DXIBManager(dxibItem)
                let cnt = await dxibManager.loadRes()
                console.log('new-DXIBManager-instance-loadRes-cnt:',cnt)
                if(!dxibManager.getIndexJson()) continue
                dxibManager.dxibObj = Object.assign({},dxibItem,{...dxibManager.getIndexJson()})
                delete dxibManager.dxibObj.actions //清理掉无关紧要的
                dxibManager.dxibObj.dxib_url = actionInfoW.actionInfo.url

                //是在dxibViewer中
                if(this.dxibViewer)
                {
                    //退出上一个、进入新一个dxib实例
                    this.dxibViewer.exit()
                    window.g_now_action_info = dxibManager.play() //这里很关键，不是直接取actionInfoW（严重BUG）
                    setTimeout(()=>window.g_now_action_info=null,500)
                    this.dxibViewer.updateActionInfo()
                    return true
                }else//不在dxibViewer中，首个action直接跳转目标
                {
                    let ret = await dxibManager.start(viewThis)
                    console.log('dxib-new-instance-Item-'+i+'ret:',ret)
                    if(ret) return true
                }
                break
              }catch(ex)
              {
                console.log('load-dxibManager-new-instance-exception-ex:'+ex,ex)
              }
            }
            console.log('call-dxib-new-instance failed!')
            viewThis.$toast('启动新的DXIB应用失败！')
            return false
        }//end if xtype='dxib'
    
        this.lastActionInfo = actionInfoW.actionInfo //保存这个位置，以便进行tool-banner的next和pre操作（例如相册/文件库等）

        if(name) this.refresh() //更新位置（如是由dxib.play启动的，更新位置）
        console.log('DXIBManager-start()-play-actionInfoW:',actionInfoW)
        if(!actionInfoW)
        {
            //viewThis.$toast
           console.log('无法加载dxib-start入口action!')
           return false
        }

        //前移。避免loadActionResFile导致问题
        window.g_now_action_info = actionInfoW//包含了context
        setTimeout(()=>window.g_now_action_info=null,500)//500ms后自动取消，主要是避免以其它方式进入相关页面fileItem.vue
        //进入目标页面再行加载resfile---避免等待时间过长，导致页面加载崩溃
        // let dxibActionFileData = await this.loadActionResFile(actionInfoW.actionInfo)
        // console.log('DXIBManager-start()-dxibActionFileData:',dxibActionFileData,actionInfoW)
        let updateFlag =viewThis && viewThis.dxib ?  actionInfoW.actionInfo.xtype == viewThis.dxib.actionInfo.xtype :false
        if(updateFlag && !needDXIBUpdate)
        {
            console.log('DXIBManager-start--call viewThis.updateActionInfo()')
            viewThis.updateActionInfo()//调用了更新函数(如果页面未发生变化)
            return true
        }

        //如果是dxibViewer，则无须使用$router进行replace或push切换路由，直接由上级进行处理即可！
        if(typeof this.dxibViewerUpdateFunc =='function')
        {
            console.log('DXIBManager-start call dxibViewerUpdateFunc')
            this.dxibViewerUpdateFunc( needDXIBUpdate ? true:false)
            return true
        }

        if(dxibFlag)
        {
            console.log('DXIBManager-start dxibFlag:',dxibFlag,'push /dxib page now!')
            viewThis.$router.push('/dxib')
            return true
        }

        let replace = viewThis && viewThis.dxib ? true :false
        console.log('start-replace:',replace,actionInfoW.actionInfo.xtype )
        
        let path = null
        if(actionInfoW.actionInfo.xtype == 'video')
            path = '/video' //viewThis.$router.push({path:'/video'})
        else if(actionInfoW.actionInfo.xtype == 'xcard' || actionInfoW.actionInfo.xtype == 'minicard')
            path = '/xcard' //viewThis.$router.push({path:'/xcard',replace})//'/3d/3d'
        else if(actionInfoW.actionInfo.xtype == 'xverse')
            path = '/3dp' //viewThis.$router.push({path:'/3dp',replace})
        else
            path = '/3de' //viewThis.$router.push('/3de')//'/3d/3d'
        if(replace) viewThis.$router.replace(path)
        else viewThis.$router.push(path)
        return true
    }
}