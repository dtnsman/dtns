<!--
 * @Descripttion:
 * @version:
 * @Author: hengzi
 * @Date: 2020-03-02 10:42:23
 * @LastEditors: hengzi
 * @LastEditTime: 2020-03-10 17:49:44
 -->
<template>
    <!--设置 组件-->
    <div class="setting">
        <header>
            <van-nav-bar
            :title="settingStr"
            left-arrow
            @click-left="onClickLeft"
            />
        </header>
        <div style="position:relative; width:100%;">
            <svg t="1587087743105" style="position:absolute; top:11px; left:15px; z-index:1;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1671" width="20" height="20"><path d="M880.213513 501.167842h-74.236389v-193.823413A301.27842 301.27842 0 0 0 511.631285 0a301.27842 301.27842 0 0 0-294.634697 307.344429v193.823413H143.337914a28.885755 28.885755 0 0 0-28.885755 28.885755v465.060648a28.885755 28.885755 0 0 0 28.885755 28.885755h736.875599a28.885755 28.885755 0 0 0 28.885755-28.885755V529.475882a28.885755 28.885755 0 0 0-28.885755-28.30804zM258.880932 307.344429a259.971791 259.971791 0 0 1 254.19464-266.904373 259.971791 259.971791 0 0 1 253.905783 266.904373v193.823413H258.880932zM868.081496 982.115656H154.892216V541.607898h713.18928z" p-id="1672"></path><path d="M511.631285 911.345557a148.761636 148.761636 0 0 0 103.988716-42.173202 20.220028 20.220028 0 0 0 0-28.885754 19.931171 19.931171 0 0 0-28.885754 0 108.610437 108.610437 0 1 1 18.77574-133.741044 144.428773 144.428773 0 0 1 7.799154 16.46488h-3.177433a19.642313 19.642313 0 0 0-14.15402 14.15402 21.086601 21.086601 0 0 0 5.199436 19.642313L634.395742 791.758533a20.220028 20.220028 0 0 0 14.154019 5.777151h5.488294a20.508886 20.508886 0 0 0 14.15402-14.442877l12.420874-46.794923a20.797743 20.797743 0 0 0-5.488293-19.642313 19.642313 19.642313 0 0 0-19.353456-4.910578h-4.621721a170.137094 170.137094 0 0 0-12.132017-26.574894 149.050494 149.050494 0 1 0-127.963892 225.597743z" p-id="1673"></path></svg>
            <van-cell to="/checking" :title="findpwdStr" is-link style="padding-left:43px;" />

            <svg t="1587087396379" style="position:absolute; top:56px; left:15px; z-index:1;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1500" width="20" height="20"><path d="M988.65715 610.734958a202.209195 202.209195 0 0 0-2.211663-27.803764C970.647894 258.132675 764.015373 0 511.885783 0S53.755577 258.132675 37.642031 582.615242a206.632521 206.632521 0 0 0-2.211663 28.119716 176.617093 176.617093 0 0 0 169.666153 181.988276 176.301142 176.301142 0 0 0 169.3502-181.988276 176.301142 176.301142 0 0 0-169.3502-181.988275 162.083308 162.083308 0 0 0-109.319346 42.969454C145.69757 225.905585 313.152059 44.233261 511.885783 44.233261s366.504165 181.672323 416.424561 427.482876a162.083308 162.083308 0 0 0-109.319346-42.969454 175.98519 175.98519 0 0 0-169.350201 181.988275 176.301142 176.301142 0 0 0 169.350201 181.988276 157.975933 157.975933 0 0 0 82.463437-23.380439c-31.595187 78.672015-90.046282 168.402345-186.727553 189.57112a35.070657 35.070657 0 1 0-20.22092 63.190374 35.702561 35.702561 0 0 0 31.595187-20.852823c146.601666-35.702561 213.583462-194.62635 240.439371-287.516199 5.687134-19.589016 10.11046-37.28232 13.901882-51.816106a195.890157 195.890157 0 0 0 8.214748-51.184203zM205.096521 473.9278a132.06788 132.06788 0 0 1 126.380747 137.755014 132.06788 132.06788 0 0 1-126.380747 137.755014 130.804073 130.804073 0 0 1-124.485036-130.172169v-29.383524A129.540265 129.540265 0 0 1 205.096521 473.9278z m488.777538 137.755014a132.06788 132.06788 0 0 1 126.380746-137.755014 129.540265 129.540265 0 0 1 123.53718 117.534094v28.435668a130.804073 130.804073 0 0 1-124.485035 129.540266 132.06788 132.06788 0 0 1-125.432891-138.70287z" p-id="1501"></path></svg>
            <van-cell @click="ChatSingle" :title="callStr" style="padding-left:43px;" is-link />

            <svg t="1587087820359" style="position:absolute; top:100px; left:15px; z-index:1;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1801" width="20" height="20"><path d="M512 0a512 512 0 1 0 512.306403 512A512.612807 512.612807 0 0 0 512 0z m0 980.490724A469.103531 469.103531 0 1 1 980.490724 512 469.409934 469.409934 0 0 1 512 980.490724z" p-id="1802"></path><path d="M512 365.539198a21.448235 21.448235 0 0 0-21.448235 21.448235v405.678037a21.448235 21.448235 0 0 0 42.89647 0V386.987433a21.448235 21.448235 0 0 0-21.448235-21.448235zM512 231.028127a27.269898 27.269898 0 1 0 27.269898 27.269898 26.963495 26.963495 0 0 0-27.269898-27.269898z" p-id="1803"></path></svg>
            <van-cell to="/user/AboutSoftwar" :title="aboutStr" style="padding-left:43px;" is-link />
            
            <svg t="1589179115836" style="position:absolute; top:144px; left:15px; z-index:1;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2354" width="20" height="20"><path d="M818.196078 0H205.803922A60.235294 60.235294 0 0 0 148.915033 56.888889v910.222222a60.235294 60.235294 0 0 0 56.888889 56.888889H818.196078a56.888889 56.888889 0 0 0 56.888889-56.888889V56.888889A56.888889 56.888889 0 0 0 818.196078 0z m10.039216 967.111111a10.039216 10.039216 0 0 1-10.039216 10.039216H205.803922a10.039216 10.039216 0 0 1-10.039216-10.039216V56.888889a10.039216 10.039216 0 0 1 10.039216-10.039216H818.196078a10.039216 10.039216 0 0 1 10.039216 10.039216z" p-id="2355"></path><path d="M727.843137 321.254902H302.849673a23.424837 23.424837 0 0 0-23.424836 23.424837 26.771242 26.771242 0 0 0 23.424836 23.424836h424.993464a26.771242 26.771242 0 0 0 23.424837-23.424836 23.424837 23.424837 0 0 0-23.424837-23.424837zM627.45098 491.921569H302.849673a23.424837 23.424837 0 0 0 0 46.849673h324.601307a23.424837 23.424837 0 1 0 0-46.849673zM510.326797 655.895425H296.156863a23.424837 23.424837 0 1 0 0 46.849673h214.169934a23.424837 23.424837 0 0 0 0-46.849673z" p-id="2356"></path></svg>
            <!-- <svg t="1587087820359" style="position:absolute; top:144px; left:15px; z-index:1;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1801" width="20" height="20"><path d="M512 0a512 512 0 1 0 512.306403 512A512.612807 512.612807 0 0 0 512 0z m0 980.490724A469.103531 469.103531 0 1 1 980.490724 512 469.409934 469.409934 0 0 1 512 980.490724z" p-id="1802"></path><path d="M512 365.539198a21.448235 21.448235 0 0 0-21.448235 21.448235v405.678037a21.448235 21.448235 0 0 0 42.89647 0V386.987433a21.448235 21.448235 0 0 0-21.448235-21.448235zM512 231.028127a27.269898 27.269898 0 1 0 27.269898 27.269898 26.963495 26.963495 0 0 0-27.269898-27.269898z" p-id="1803"></path></svg> -->
            <van-cell to="/user/ErrorLog" :title="viewlogStr" style="padding-left:43px;" is-link />

            <!-- <svg t="1589179115836" style="position:absolute; top:144px; left:15px; z-index:1;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2354" width="20" height="20"><path d="M818.196078 0H205.803922A60.235294 60.235294 0 0 0 148.915033 56.888889v910.222222a60.235294 60.235294 0 0 0 56.888889 56.888889H818.196078a56.888889 56.888889 0 0 0 56.888889-56.888889V56.888889A56.888889 56.888889 0 0 0 818.196078 0z m10.039216 967.111111a10.039216 10.039216 0 0 1-10.039216 10.039216H205.803922a10.039216 10.039216 0 0 1-10.039216-10.039216V56.888889a10.039216 10.039216 0 0 1 10.039216-10.039216H818.196078a10.039216 10.039216 0 0 1 10.039216 10.039216z" p-id="2355"></path><path d="M727.843137 321.254902H302.849673a23.424837 23.424837 0 0 0-23.424836 23.424837 26.771242 26.771242 0 0 0 23.424836 23.424836h424.993464a26.771242 26.771242 0 0 0 23.424837-23.424836 23.424837 23.424837 0 0 0-23.424837-23.424837zM627.45098 491.921569H302.849673a23.424837 23.424837 0 0 0 0 46.849673h324.601307a23.424837 23.424837 0 1 0 0-46.849673zM510.326797 655.895425H296.156863a23.424837 23.424837 0 1 0 0 46.849673h214.169934a23.424837 23.424837 0 0 0 0-46.849673z" p-id="2356"></path></svg> -->
            <svg t="1589179115836" style="position:absolute; top:188px; left:15px; z-index:1;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2354" width="20" height="20"><path d="M818.196078 0H205.803922A60.235294 60.235294 0 0 0 148.915033 56.888889v910.222222a60.235294 60.235294 0 0 0 56.888889 56.888889H818.196078a56.888889 56.888889 0 0 0 56.888889-56.888889V56.888889A56.888889 56.888889 0 0 0 818.196078 0z m10.039216 967.111111a10.039216 10.039216 0 0 1-10.039216 10.039216H205.803922a10.039216 10.039216 0 0 1-10.039216-10.039216V56.888889a10.039216 10.039216 0 0 1 10.039216-10.039216H818.196078a10.039216 10.039216 0 0 1 10.039216 10.039216z" p-id="2355"></path><path d="M727.843137 321.254902H302.849673a23.424837 23.424837 0 0 0-23.424836 23.424837 26.771242 26.771242 0 0 0 23.424836 23.424836h424.993464a26.771242 26.771242 0 0 0 23.424837-23.424836 23.424837 23.424837 0 0 0-23.424837-23.424837zM627.45098 491.921569H302.849673a23.424837 23.424837 0 0 0 0 46.849673h324.601307a23.424837 23.424837 0 1 0 0-46.849673zM510.326797 655.895425H296.156863a23.424837 23.424837 0 1 0 0 46.849673h214.169934a23.424837 23.424837 0 0 0 0-46.849673z" p-id="2356"></path></svg>
            <van-cell :title="darkModeText" style="padding-left:43px;" is-link @click="changeMode" />

            <svg t="1589179115836" style="position:absolute; top:232px; left:15px; z-index:1;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2354" width="20" height="20"><path d="M818.196078 0H205.803922A60.235294 60.235294 0 0 0 148.915033 56.888889v910.222222a60.235294 60.235294 0 0 0 56.888889 56.888889H818.196078a56.888889 56.888889 0 0 0 56.888889-56.888889V56.888889A56.888889 56.888889 0 0 0 818.196078 0z m10.039216 967.111111a10.039216 10.039216 0 0 1-10.039216 10.039216H205.803922a10.039216 10.039216 0 0 1-10.039216-10.039216V56.888889a10.039216 10.039216 0 0 1 10.039216-10.039216H818.196078a10.039216 10.039216 0 0 1 10.039216 10.039216z" p-id="2355"></path><path d="M727.843137 321.254902H302.849673a23.424837 23.424837 0 0 0-23.424836 23.424837 26.771242 26.771242 0 0 0 23.424836 23.424836h424.993464a26.771242 26.771242 0 0 0 23.424837-23.424836 23.424837 23.424837 0 0 0-23.424837-23.424837zM627.45098 491.921569H302.849673a23.424837 23.424837 0 0 0 0 46.849673h324.601307a23.424837 23.424837 0 1 0 0-46.849673zM510.326797 655.895425H296.156863a23.424837 23.424837 0 1 0 0 46.849673h214.169934a23.424837 23.424837 0 0 0 0-46.849673z" p-id="2356"></path></svg>
            <van-cell :title="changeStr" style="padding-left:43px;" is-link to="/changeSvrNode" />
            
            <svg t="1589179115836" style="position:absolute; top:276px; left:15px; z-index:1;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2354" width="20" height="20"><path d="M818.196078 0H205.803922A60.235294 60.235294 0 0 0 148.915033 56.888889v910.222222a60.235294 60.235294 0 0 0 56.888889 56.888889H818.196078a56.888889 56.888889 0 0 0 56.888889-56.888889V56.888889A56.888889 56.888889 0 0 0 818.196078 0z m10.039216 967.111111a10.039216 10.039216 0 0 1-10.039216 10.039216H205.803922a10.039216 10.039216 0 0 1-10.039216-10.039216V56.888889a10.039216 10.039216 0 0 1 10.039216-10.039216H818.196078a10.039216 10.039216 0 0 1 10.039216 10.039216z" p-id="2355"></path><path d="M727.843137 321.254902H302.849673a23.424837 23.424837 0 0 0-23.424836 23.424837 26.771242 26.771242 0 0 0 23.424836 23.424836h424.993464a26.771242 26.771242 0 0 0 23.424837-23.424836 23.424837 23.424837 0 0 0-23.424837-23.424837zM627.45098 491.921569H302.849673a23.424837 23.424837 0 0 0 0 46.849673h324.601307a23.424837 23.424837 0 1 0 0-46.849673zM510.326797 655.895425H296.156863a23.424837 23.424837 0 1 0 0 46.849673h214.169934a23.424837 23.424837 0 0 0 0-46.849673z" p-id="2356"></path></svg>
            <van-cell :title="locStr" style="padding-left:43px;" @click="showLocation=true"/>
        </div>
        <!-- <van-divider />
        <a href="../../../OfficialHomepage/OfficialChat.html">
            <div style="width:100%; height:46px; background-color:#fff; text-align:center; line-height:44px; font-size:15px;">
            前往官网
        </div>
        </a> -->
        <van-divider />
        <div style="width:100%; height:46px; background-color:#fff; text-align:center; line-height:44px; font-size:15px;" @click="Signoutx">
            {{ logoutStr }}
        </div>

        <!-- 弹出层 -->
        <van-popup v-model="show" style="height:90px;width:260px;border-radius:5px;">
            <div style="width:100%;height:45px;border-bottom:1px solid #f5f5f5;text-align:center;line-height:40px;font-size:15px;">确认退出当前登录？</div>
            <div style="width:100%;height:45px;text-align:center;">
                <div @click="cancel" style="width:50%;height:45px;float:left;border-right:1px solid #f5f5f5;line-height:40px;font-size:15px;">取消</div>
                <div @click="Signout" style="width:50%;height:45px;float:left;line-height:40px;font-size:15px;">确定</div>
            </div>
        </van-popup>
        <van-popup v-model="showLocation" style="height:400px;width:300px;border-radius:5px;overflow-y: auto;overflow-x: hidden;padding: 5px;">
            <h3>{{locStr}}</h3>
            <div v-for="(item,index) in locs" :key="index" @click="setLoc(item)" style="width:100%;line-height: 35px;height: 35px;border-bottom: 0.5px solid #909090;">
                <span>{{ item.key }}（{{ item.location }}）</span>
            </div>
        </van-popup>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                user_id:'',
                token_y:'',
                show:false,
                darkModeText:'暗黑模式',
                showLocation:false,
                locs:[],
                settingStr:'设置',
                findpwdStr:'找回密码',
                callStr:'联系客服',
                aboutStr:'关于',
                viewlogStr:'查看日志',
                modeStr:'正常模式（当前）',
                darkmodeStr:'暗黑模式（当前）',
                changeStr:'切换节点',
                locStr:'切换语言',
                logoutStr:'退出登录'
            }
        },
        methods:{
            onClickLeft(){
                this.$router.push('/user')
            },
            cancel(){
                this.show = false
            },
            setLoc(item){
                if(!item) return false
                localStorage.setItem('dtns-location',item.key)
                this.$toast('切换成功！所选区域为：'+item.key+'（'+item.location+'）')
                if(typeof g_pop_event_bus !=undefined){
                    g_pop_event_bus.emit('update_dtns_loction',item)
                }
                this.showLocation = false
            },
            async changeMode(){
                let dark_mode =localStorage.getItem('dark_mode') ? parseInt(localStorage.getItem('dark_mode')):0//localStorage.getItem('dark_mode')//await imDb.getDataByKey('dark_mode')/
                // dark_mode = dark_mode ? dark_mode.data : 0 
                console.log('changeMode:'+dark_mode)
                dark_mode = dark_mode ? 0 :1
                localStorage.setItem('dark_mode',dark_mode)
                // imDb.addData({key:'dark_mode',data:dark_mode})
                this.darkModeText = dark_mode ? this.darkmodeStr : this.modeStr// '极黑模式（当前）':'正常模式（当前）'
                if(dark_mode){
                    darkModeStyleEle.innerHTML = darkModeStyleHtml
                }else{
                    darkModeStyleEle.innerHTML = ''
                }
            },
            Signoutx(){
                this.show = true;
            },
            Signout(){//退出登录删除缓存
                this.show = false
                let storage = window.localStorage;
                storage.removeItem('user_id')
                storage.removeItem('s_id')
                storage.removeItem('userInfo')
                storage.removeItem('user_logo')
                storage.removeItem('invite_code')
                storage.removeItem('error')
                // if(typeof window.g_saveAppItemsData == 'function') window.g_saveAppItemsData()//2024-3-14新增（用于dev-mode的ib3.hub）
                // let dark_mode = localStorage.getItem('dark_mode')
                // storage.clear() //清理掉登录信息
                // // imDb.clear()  //清理掉配置信息。
                // if(dark_mode)  localStorage.setItem('dark_mode',dark_mode)
                // if(typeof window.g_recoverAppItemsData == 'function')  g_recoverAppItemsData()//2024-3-14新增（用于dev-mode的ib3.hub）

                this.$api.network.stopWebSocket();
                rpc_client.leave()


                this.$router.push('/login')
             },
            async ChatSingle (){//创建单聊
                if(this.user_id == ''){
                    this.$toast.fail('客服繁忙，请稍后重试')
                    return;
                }
                let random = Math.random()
                let use = {
                    user_id:localStorage.user_id,
                    s_id:localStorage.s_id,
                    user_b:this.user_id,
                    random:random
                }
                let res = await this.$api.network.ChatSingle(use)
                if(res.ret){
                    this.token_y = res.chatid
                    this.$router.push(`/index/chat/${this.token_y}`)
                }else{
                    this.$toast.fail("失败" + res.msg)
                }
            },
            async ChatConsole_user(){//联系客服
                let use = {
                    begin:0,
                    len:10,
                }
                let res = await this.$api.network.ChatConsole_user(use)
                this.user_id = res.list[0].user_id
                console.log(this.user_id)
            },
            async ChatQuery() {//关于软件信息
                // alert()
                let res = await this.$api.network.ChatConsoleQuery({})
                console.log(res)
             },
            translate()
            {
                this.settingStr = g_dtnsStrings.getString('/index/settting')
                this.findpwdStr = g_dtnsStrings.getString('/index/findpwd')
                this.callStr    = g_dtnsStrings.getString('/index/callservice')
                this.aboutStr   = g_dtnsStrings.getString('/index/software/about')
                this.viewlogStr = g_dtnsStrings.getString('/index/log/view')
                this.modeStr    = g_dtnsStrings.getString('/index/mode/normal')
                this.darkmodeStr= g_dtnsStrings.getString('/index/mode/black')
                this.changeStr  = g_dtnsStrings.getString('/index/node/change')
                this.locStr     = g_dtnsStrings.getString('/index/locations/change')  
                this.logoutStr  = g_dtnsStrings.getString('/index/logout')  

                let dark_mode = localStorage.getItem('dark_mode') ? parseInt(localStorage.getItem('dark_mode') ) :0
                this.darkModeText = dark_mode ? this.darkmodeStr: this.modeStr// '极黑模式（当前）':'正常模式（当前）'
            }

        },
        created(){//进入页面就执行
            // let dark_mode = localStorage.getItem('dark_mode') ? parseInt(localStorage.getItem('dark_mode') ) :0
            // this.darkModeText = dark_mode ? this.darkmodeStr: this.modeStr// '极黑模式（当前）':'正常模式（当前）'
            this.ChatQuery();
            this.ChatConsole_user();  
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
    }
</script>
<style lang="stylus" scoped>
.setting {
    position fixed
    width 100%
    height 100%
    background-color #f5f5f5
}
*{
    box-sizing:border-box;
}
.van-divider{
    padding 0
    margin 0
    border-bottom-width 5px
}
.setting >>> .van-nav-bar__arrow{
    color #000
}
</style>
