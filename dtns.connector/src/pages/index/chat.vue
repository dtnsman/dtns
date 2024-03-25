<template>
  <div class="page" :style="{backgroundColor:backColor}" id="box">
    <div :style="{opacity:iconx}" style="width:100%; height:100%;">
      <header class="topbar" style="border-bottom:1px solid #eee; height:46px; position:fixed; top:0; background-color:#fff; margin:0 auto; align:center; z-index:999;">
      <div style="margin:0 auto;height:46px;" align="center">
        <svg v-if="imgStatus == true " style="width:17px;height:17px;top:13px; position:absolute;" t="1590975627508" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5496" width="17" height="17"><path d="M514.752467 0.007392a511.992334 511.992334 0 1 0 509.254407 511.992334A511.992334 511.992334 0 0 0 514.752467 0.007392z m375.095988 528.419896A752.929903 752.929903 0 0 1 659.862593 574.972045a301.171961 301.171961 0 0 1-101.303296-16.427561c-8.213781 128.682565-161.537688 276.530619-183.441103 295.696107a21.903415 21.903415 0 0 1-19.165489 5.475854 30.117196 30.117196 0 0 1-19.165488-8.213781 27.379269 27.379269 0 0 1 2.737927-38.330977c54.758538-52.020611 188.916957-199.868665 161.537688-290.220253-71.1861-62.972319-262.840984-5.475854-331.289157 21.903415a27.379269 27.379269 0 0 1-35.59305-16.427561 24.641342 24.641342 0 0 1 13.689635-35.59305c24.641342-8.213781 224.510007-84.875734 347.716718-38.330977 8.213781-128.682565 147.848054-268.316838 167.013542-287.482327a30.117196 30.117196 0 0 1 38.330977 2.737927 27.379269 27.379269 0 0 1 0 38.330977c-49.282685 49.282685-169.751469 191.654884-150.58598 282.006473 73.924027 60.234392 254.627203 10.951708 320.337449-13.689635a27.379269 27.379269 0 1 1 19.165489 52.020612z" fill="#1afa29" p-id="5497"></path></svg>
        <svg v-if="imgStatus == false " style="width:17px;height:17px;top:13px; position:absolute;" t="1590976113043" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5679" width="17" height="17"><path d="M514.752467 0.007392a511.992334 511.992334 0 1 0 509.254407 511.992334A511.992334 511.992334 0 0 0 514.752467 0.007392z m375.095988 528.419896A752.929903 752.929903 0 0 1 659.862593 574.972045a301.171961 301.171961 0 0 1-101.303296-16.427561c-8.213781 128.682565-161.537688 276.530619-183.441103 295.696107a21.903415 21.903415 0 0 1-19.165489 5.475854 30.117196 30.117196 0 0 1-19.165488-8.213781 27.379269 27.379269 0 0 1 2.737927-38.330977c54.758538-52.020611 188.916957-199.868665 161.537688-290.220253-71.1861-62.972319-262.840984-5.475854-331.289157 21.903415a27.379269 27.379269 0 0 1-35.59305-16.427561 24.641342 24.641342 0 0 1 13.689635-35.59305c24.641342-10.951708 224.510007-84.875734 347.716718-38.330977 8.213781-128.682565 147.848054-268.316838 167.013542-287.482327a30.117196 30.117196 0 0 1 38.330977 2.737927 27.379269 27.379269 0 0 1 0 38.330977c-49.282685 49.282685-169.751469 191.654884-150.58598 282.006473 73.924027 60.234392 254.627203 10.951708 320.337449-13.689635a27.379269 27.379269 0 1 1 19.165489 52.020612z" fill="#F00945" p-id="5680"></path></svg>
        <span style="margin-left:24px; font-size:16px; line-height:43px;">{{chatText}}{{ chatWeb3Key?'🔒':'' }}</span>
      </div>
      <div @click="back" style="position:absolute; top:0; left:15px;">
        <van-icon name="arrow-left" />
      </div>
      <div style="position:absolute; top:0; right:15px;z-index:999">
        <van-icon @click="pageset(token)" name="ellipsis" slot="right" />
      </div>
    </header>
    <div id="chatBox" ref="chatBox" @scroll="handleScroll($event)"  style="position:fixed;z-index:99;overflow-y:scroll;overflow-x:hidden;top:0;bottom:0;left:0;right:0;" :style="{backgroundImage:'url(' + backgroundUrl + ')',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',height:bodyHeight+'px',filter:darkMode ? 'invert(1) hue-rotate(180deg)':''}">
        <div style="height:50px;"></div>
        <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :style="{filter:darkMode ? 'invert(1) hue-rotate(180deg)':''}"> -->
        <van-list v-model="isLoading" direction="up" immediate-check="false" :finished="finished"  finished-text="没有更多了" @load="onLoad" @refresh="onRefresh" :style="{filter:darkMode ? 'invert(1) hue-rotate(180deg)':'',paddingBottom:'30px'}">
          <div >
            <div v-if="state === true">
              <div v-for="(item,index) in chatRexord"  :key="index" style="padding:20px 0px 0px 0px;width:100%;float:left; margin-bottom:15px;position:relative;">
                <div style="width:100%;">
                  <!-- 头像 -->
                  <!-- <img v-if="item.texts!== 3"  @click="chat(item.user_id)" :src="item.url" alt="" style="width:40px; height:40px; border-radius:6px; float:left; margin-left:15px;margin-top:5px;"> -->
                  <img v-if="item.msg_info.user_id && item.msg_info.user_id.indexOf('_')<0  && (item.msg_info.status !== 0 || item.msg_info.type === 'text' || item.msg_info.type === 'img' || item.msg_info.type === 'file' || item.msg_info.type === 'video' || item.msg_info.type === 'record' || item.msg_info.type === 'name_card')"  :src="item.url" alt="" style="width:40px; height:40px; border-radius:6px; float:left; margin-left:15px;margin-top:5px;"></img>
                  <img v-if="item.msg_info.user_id && item.msg_info.user_id.indexOf('_')>=0 && (item.msg_info.status !== 0 || item.msg_info.type === 'text' || item.msg_info.type === 'img' || item.msg_info.type === 'file' || item.msg_info.type === 'video' || item.msg_info.type === 'record' || item.msg_info.type === 'name_card')"  @click="chat(item.user_id)" v-lazy="item.url" alt="" style="width:40px; height:40px; border-radius:6px; float:left; margin-left:15px;margin-top:5px;">
                  <!-- 名字 -->
                  <div v-if="item.msg_info.status !== 0 || item.msg_info.type === 'text' || item.msg_info.type === 'img' || item.msg_info.type === 'file' || item.msg_info.type === 'video' || item.msg_info.type === 'record' || item.msg_info.type === 'name_card'" style="font-size:12px; position:absolute; left:71px;line-height:20px;">{{item.user_name}}</div>
                  <div style="position:absolute; text-align:center; width:100%; font-size:12px;top:0px">
                    <!-- 时间 -->
                    <p @click="gotouchstart(item)" style="display: inline-block">{{ GetDateTimeFormat(item.msg_info.time_i) }}</p>
                  </div>
                  <!-- 文字消息 -->
                  
                  <div class="fullDiv" v-if="item.texts === 0 && item.msg_info.msg_obj && item.msg_info.msg_obj.notice_msg_type" style="padding-left:69px;padding-top: 25px;">
                    <k-form-build ref="KFB" :value="jsonDataNotice" :defaultValue="item.msg_info.msg_obj" @submit="handleSubmit" style="word-wrap:break-word; word-break:break-all; overflow: hidden;"></k-form-build>
                  </div>
                  <div class="fullDiv" v-else-if="item.texts === 0 && item.msg_info.msg_obj && item.msg_info.msg_obj.chatnotice" style="padding-left:69px;padding-top: 25px;">
                    <k-form-build ref="KFB" :value="chatnoticeJSONData" :defaultValue="item.msg_info.msg_obj" @submit="handleSubmit" style="white-space: pre-wrap;" ></k-form-build>
                  </div>
                  <div class="fullDiv" v-else-if="item.texts === 0 && item.msg_info.msg_obj" style="padding-left:69px;padding-top: 25px;">
                    <div width="100%" height="100%">
                      <json-viewer
                              :value="item.msg_info.msg_obj"
                              :expand-depth=5
                              copyable
                              boxed
                              sort></json-viewer>
                      </div>
                  </div>
                  <div class="fullDiv" v-else-if="item.texts === 0 && item.msg_info.xmsg" style="padding-left:69px;padding-top: 25px;">
                    <x-msg-viewer :item="item.msg_info.xmsg" :xzoom="0.65" :show_xmsg="true" style="width:100%"></x-msg-viewer>
                    <button v-if="item.msg_info.xmsg.xprice" class="buybtn" @click.stop="openCommentWindow(item,'rels')">购买头榜（{{item.msg_info.xmsg.xprice}}∫）</button>
                    <p v-if="item.msg_info.xmsg.xbuyed" class="buyedp" style="color:red;line-height:50px;font-size:18px">已购该头榜（花费{{item.msg_info.xmsg.xbuyed_xprice}}∫）</p>
                    <div class="retweet" v-if="item.msg_info.xmsg.p_xmsgid && item.msg_info.xmsg.p_xmsg_info" @click="gotoSubXmsg(item.msg_info.xmsg.p_xmsg_info)">
                      <p>
                        <!-- :href="item.mblog.retweeted_status.user.profile_url" -->
                        <a class="retweet-user">@{{item.msg_info.xmsg.p_xmsg_info.user_name}}</a>：<span v-html="item.msg_info.xmsg.p_xmsg_info.xmsg"></span>
                      </p>
                      <x-msg-viewer :item="item.msg_info.xmsg.p_xmsg_info" :show_xmsg="false" style="width:100%"></x-msg-viewer>
                      <button v-if="item.msg_info.xmsg.p_xmsg_info.xprice" class="buybtn" @click.stop="openCommentWindow(item.msg_info.xmsg.p_xmsg_info,'rels')">购买头榜（{{item.msg_info.xmsg.p_xmsg_info.xprice}}∫）</button>
                      <p v-if="item.msg_info.xmsg.p_xmsg_info.xbuyed" class="buyedp" style="color:red;line-height:50px;font-size:18px">已购该头榜（花费{{item.msg_info.xmsg.p_xmsg_info.xbuyed_xprice}}∫）</p>
                    </div>
                  </div>
                  <div v-else-if="item.texts === 0" style="padding-left:69px;"  v-on:dblclick="copyTxt(item)">
                    <div class="record">{{item.msg_info.msg}}</div>
                  </div>
                  <!--图片消息v-image-preview   :src="item.msg_info.url"-->
                  <div v-else-if="item.texts === 1" style="padding-left:69px;">
                    <div>
                      <img v-lazy="item.msg_info.body.img_id" alt="" id="imgss" style="left:62px; margin-top:25px;">
                    </div>
                  </div>
                  <!-- 文件消息 -->
                  <div v-else-if="item.texts === 2" style="padding-left:69px;">
                    <div class="record" style="width:60%;word-break:break-all;">
                        <div :href="iframeUrl" @click="download(item)" :download="urlname" style="color:#111;">
                          <div>
                            <div style="width:70%;float:left; padding-top:3px; padding-left:3px;">
                              {{item.msg_info.body.filename}} 
                            </div>
                            <div style="width:30%;float:left; text-align:center;padding-top:4px; position:relative;">
                              <div style="position:absolute;font-size:12px; color:#000;width:100%; text-align:center; top:20px; color:#fff; z-index999">
                                <div>{{item.msg_info.body.filename.split('.')[1]}}</div>
                              </div>
                              <svg v-if="item.msg_info.body.filename.split('.')[1][0] === 'a'" t="1587622940022" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2312" width="38" height="38"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#F3C346" p-id="2313"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#C1932B" p-id="2314"></path></svg>
                              <svg v-else-if="item.msg_info.body.filename.split('.')[1][0] === 'b'" t="1587623071394" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2444" width="38" height="38"><path d="M510.462462 0H119.927928v1024h777.993994V372.084084" fill="#F446A4" p-id="2445"></path><path d="M513.537538 0l3.075075 372.084084h387.459459L513.537538 0z" fill="#BC2A85" p-id="2446"></path></svg>
                              <svg v-else-if="item.msg_info.body.filename.split('.')[1][0] === 'c'" t="1587623134223" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2840" width="38" height="38"><path d="M510.462462 0H119.927928v1024h777.993994V372.084084" fill="#FF7D02" p-id="2841"></path><path d="M513.537538 0l3.075075 372.084084h387.459459L513.537538 0z" fill="#D55D03" p-id="2842"></path></svg>
                              <svg v-else-if="item.msg_info.body.filename.split('.')[1][0] === 'd'" t="1587622890499" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2182" width="38" height="38"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#2599F7" p-id="2183"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#2A73DD" p-id="2184"></path></svg>
                              <svg v-else-if="item.msg_info.body.filename.split('.')[1][0] === 'e'" t="1587622837875" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2050" width="38" height="38"><path d="M510.462462 0H119.927928v1024h777.993994V372.084084" fill="#66A924" p-id="2051"></path><path d="M513.537538 0l3.075075 372.084084h387.459459L513.537538 0z" fill="#54831C" p-id="2052"></path></svg>
                              <svg v-else-if="item.msg_info.body.filename.split('.')[1][0] === 'h'" t="1587623334311" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3368" width="38" height="38"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#F37746" p-id="3369"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#D05C3D" p-id="3370"></path></svg>
                              <svg v-else-if="item.msg_info.body.filename.split('.')[1][0] === 'i'" t="1587623447702" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3632" width="38" height="38"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#F3C346" p-id="3633"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#C1932B" p-id="3634"></path></svg>
                              <svg v-else-if="item.msg_info.body.filename.split('.')[1][0] === 'j'" t="1587623178388" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2972" width="38" height="38"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#E52940" p-id="2973"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#B52533" p-id="2974"></path></svg>
                              <svg v-else-if="item.msg_info.body.filename.split('.')[1][0] === 'm'" t="1587623490323" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3764" width="38" height="38"><path d="M510.462462 0H119.927928v1024h777.993994V372.084084" fill="#D146F4" p-id="3765"></path><path d="M513.537538 0l3.075075 372.084084h387.459459L513.537538 0z" fill="#9C31C4" p-id="3766"></path></svg>
                              <svg v-else-if="item.msg_info.body.filename.split('.')[1][0] === 'p'" t="1587623230401" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3104" width="38" height="38"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#EE4B4B" p-id="3105"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#C84343" p-id="3106"></path></svg>
                              <svg v-else-if="item.msg_info.body.filename.split('.')[1][0] === 'r'" t="1587623609597" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4024" width="38" height="38"><path d="M510.462462 0H119.927928v1024h777.993994V372.084084" fill="#3D42FF" p-id="4025"></path><path d="M513.537538 0l3.075075 372.084084h387.459459L513.537538 0z" fill="#2A36D1" p-id="4026"></path></svg>
                              <svg v-else-if="item.msg_info.body.filename.split('.')[1][0] === 'z'" t="1587622940022" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2312" width="38" height="38"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#F3C346" p-id="2313"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#C1932B" p-id="2314"></path></svg>
                              <svg v-else t="1587623540548" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3894" width="38" height="38"><path d="M513.537538 0H123.003003v1024h777.993994V372.084084" fill="#7F46F3" p-id="3895"></path><path d="M513.537538 0l3.075075 372.084084h384.384384L513.537538 0z" fill="#5634D0" p-id="3896"></path></svg>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                   <!-- <iframe :src="iframeUrl" frameborder="0" width="0" height="0"></iframe> -->
                  <!-- 语音消息 -->
                  <div v-else-if="item.texts === 4" style="padding-left:69px;">
                    <div class="recordx" style="disply:flex;background-color:#12adf5; width:134px;" @click="handleClickPlayAudio(item)">
                        <svg  v-if="play==true || item.sign!==sign" style="cursor: pointer;padding-top:2px;" t="1588670530486" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2878" width="16" height="16"><path d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m216 528l-372 216h-20a32 32 0 0 1-8-20V300a32 32 0 0 1 8-20h20l372 216a20 20 0 0 1 0 32z" fill="#FFFFFF" p-id="2879"></path></svg>
                        <svg v-if="suspend==true && item.sign==sign" style="padding-top:2px;cursor: pointer;" t="1588671664887" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3073" width="16" height="16"><path d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m-76 684a44 44 0 0 1-40 40h-40a44 44 0 0 1-40-40V340a40 40 0 0 1 40-40h40a40 40 0 0 1 40 40z m272 0a44 44 0 0 1-40 40h-40a44 44 0 0 1-40-40V340a40 40 0 0 1 40-40h40a40 40 0 0 1 40 40z" fill="#FFFFFF" p-id="3074"></path></svg>
                        <img v-if="gif==true &&item.sign==sign" src="../../assets/images/yuyin.gif" style="position:absolute; top:0px; left:26px; width:70px; height:34px;">
                        <span style="float:right; color:#fff; padding-top:2px;">{{item.msg_info.body.time_sec | filterTime_sec}}”</span>
                    </div>
                  </div>
                  <!-- 视频消息 -->
                  <div v-else-if="item.texts === 5" style="padding-left:69px;">
                    <div style="padding-top:28px;float:left;">
                        <!-- <video id="video" controls :poster="item.videolook">
                          <source :src="item.msg_info.body.url" type="video/mp4">
                          <source :src="item.msg_info.body.url" type="video/webm">
                          <source :src="item.msg_info.body.url" type="video/ogg">
                        你的浏览器不支持该功能
                      </video> -->

                      <videoplay :url="item.msg_info.body.url" :poster="item.videolook"></videoplay>
                      <!-- <video id="my-player" class="video-js vjs-default-skin vjs-big-play-centered" controls
                            :poster="item.videolook" width="500" height="400" data-setup='{}'>
                            <source :src='item.msg_info.body.url +"&flv=1"' type='rtmp/flv'/>
                            <source :src="item.msg_info.body.url" type="video/mp4">
                        </video> -->
                    </div>
                  </div>

                  <!-- 联系人名片 padding-top: 25px; -->
                  <div class="fullDiv" v-else-if="item.texts === 6" style="padding-left:69px;">
                     <!-- @click="clickFull"> -->
                    <!-- <div v-if="typeof msgItem !='undefined'"
                        class="canvas"
                        :style="{
                            ...getCanvasStyle(msgItem.style),
                            width: msgItem.style.width + 'px',
                            height: msgItem.style.height + 'px',
                            zoom: msgItem.style.width > (fullWidth-69)  && !isFull ? (fullWidth-100)*1.0 /msgItem.style.width :1 ,
                            'transform-origin': 'left top'
                        }">
                          <ComponentWrapper
                              v-for="(item, index) in msgItem.data"
                              :key="index"
                              :config="item"
                          />
                    </div>
                    <div v-else>
                      [Error]ComponentWrapper-data-item is null
                    </div> -->
<!-- 2023-9-21
                    <k-form-build ref="KFB" :value="jsonData4"  @submit="handleSubmit" ></k-form-build>
 -->


                    <!-- <div @click="isFull=!isFull">切换缩放状态</div> -->
                    <div class="record" style="height:80px;width:200px;padding:0px 10px 0px 15px;" @click="card_name(item)">
                      <div style="border-bottom:1px solid #f5f5f5;line-height:30px;font-size:12px;color:#999999">联系人</div>
                      <div style="float:left;"><img :src="item.msg_info.body.card_url" style="width:30px; height:30px; border-radius:5px;margin-top:9px;" alt=""></div>
                      <div style="width:140px;float:left;padding-left:12px;font-size:15px;padding-top:13px;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">{{item.msg_info.body.card_name}}</div>
                    </div>
                  </div>


                   <!-- 系统消息 -->
                   <!-- <div v-else-if="item.texts === 3" style="text-align:center;"> -->
                    <!-- todo -->
                  <div v-else-if="item.msg_info.status === 0" style="text-align:center;">
                    <div style="font-size:12px; color:#555; padding-top:0px; text-aling:center;word-wrap:break-word; word-break:break-all; overflow: hidden;">
                      <div>{{item.msg_info.msg}}</div>
                    </div>
                  </div>

                </div>
                <div v-if="index == chatRexord.length-1" style="height:60px;width:100%;"></div>
              </div>
            </div>

            
            <!-- <div style="height:150px;width:100%;"></div> -->
            <!-- <div style="height:80px; padding:0; margin:0; width:100%;float:left;" v-show="zhanwei1"></div> -->
          </div>
          <!-- <div style="height:60px;width:100%;"></div> -->
        </van-list>
        <!-- </van-pull-refresh> -->
        <!-- <div style="height:150px;width:100%;"></div> -->
    </div>

    <!-- <van-tabbar v-model="active" style="position:fixed; top:45px; z-index:100;" :style="{opacity:opacityNav}">
      <van-tabbar-item @click="nav_button" v-model="activex" style="width:100%;">
        <div style="text-align:center; margin:0; padding:0; margin-top:-7px; margin-bottom:3px;">
          <svg v-if="active !== 0" t="1587960164461" class="icon" viewBox="0 0 1190 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2154" width="17" height="17"><path d="M849.85052 279.506393H343.717321a26.439794 26.439794 0 0 0 0 52.879588h234.181033v449.476497a26.439794 26.439794 0 0 0 26.439794 26.439794 30.216907 30.216907 0 0 0 26.439794-26.439794V332.385981h219.072578a26.439794 26.439794 0 0 0 0-52.879588z" p-id="2155"></path><path d="M596.783921 0C268.175053 0 0 226.626805 0 506.133199a449.476497 449.476497 0 0 0 94.427836 271.952166 256.843713 256.843713 0 0 1-3.777114 90.650722c-7.554227 60.433815-18.885567 120.86763 22.662681 147.307424a41.548248 41.548248 0 0 0 30.216907 7.554226 343.717321 343.717321 0 0 0 109.536289-30.216907 215.295465 215.295465 0 0 1 86.873609-30.216907 721.428664 721.428664 0 0 0 256.843713 49.102474c328.608868 0 593.006807-226.626805 593.006807-506.133198S925.392788 0 596.783921 0z m0 959.386809a600.561034 600.561034 0 0 1-234.181032-45.325361c-30.216907-11.33134-67.988042 3.777113-132.19897 30.216908a483.470518 483.470518 0 0 1-86.873609 30.216907c-11.33134-11.33134-3.777113-67.988042 0-98.204949s15.108454-101.982062-7.554227-128.421856a415.482476 415.482476 0 0 1-83.096495-241.735259c0-249.289486 241.735259-453.253611 543.904333-453.253611s540.127219 203.964125 540.127219 453.253611-241.735259 453.253611-540.127219 453.25361z" p-id="2156"></path></svg>
          <svg v-if="active == 0 && active !== ''" t="1588044838553" class="icon" viewBox="0 0 1190 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3048" width="17" height="17"><path d="M849.85052 279.506393H343.717321a26.439794 26.439794 0 0 0 0 52.879588h234.181033v449.476497a26.439794 26.439794 0 0 0 26.439794 26.439794 30.216907 30.216907 0 0 0 26.439794-26.439794V332.385981h219.072578a26.439794 26.439794 0 0 0 0-52.879588z" fill="#12ACF4" p-id="3049"></path><path d="M596.783921 0C268.175053 0 0 226.626805 0 506.133199a449.476497 449.476497 0 0 0 94.427836 271.952166 256.843713 256.843713 0 0 1-3.777114 90.650722c-7.554227 60.433815-18.885567 120.86763 22.662681 147.307424a41.548248 41.548248 0 0 0 30.216907 7.554226 343.717321 343.717321 0 0 0 109.536289-30.216907 215.295465 215.295465 0 0 1 86.873609-30.216907 721.428664 721.428664 0 0 0 256.843713 49.102474c328.608868 0 593.006807-226.626805 593.006807-506.133198S925.392788 0 596.783921 0z m0 959.386809a600.561034 600.561034 0 0 1-234.181032-45.325361c-30.216907-11.33134-67.988042 3.777113-132.19897 30.216908a483.470518 483.470518 0 0 1-86.873609 30.216907c-11.33134-11.33134-3.777113-67.988042 0-98.204949s15.108454-101.982062-7.554227-128.421856a415.482476 415.482476 0 0 1-83.096495-241.735259c0-249.289486 241.735259-453.253611 543.904333-453.253611s540.127219 203.964125 540.127219 453.253611-241.735259 453.253611-540.127219 453.25361z" fill="#12ACF4" p-id="3050"></path></svg>
        </div>
        <div style="opacity:1;">
          文字
        </div>
      </van-tabbar-item>
      <van-tabbar-item  @click="nav_button" v-model="activey" style="width:100%;">
        <div style="text-align:center; margin:0; padding:0; margin-top:-5px; margin-bottom:4px;">
          <svg v-if="active !== 1" t="1587960236078" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2809" width="15" height="15"><path d="M850.252708 0H173.747292A173.747292 173.747292 0 0 0 0 173.747292V850.252708a177.444043 177.444043 0 0 0 173.747292 173.747292H850.252708a177.444043 177.444043 0 0 0 173.747292-173.747292V173.747292A177.444043 177.444043 0 0 0 850.252708 0zM173.747292 51.754513H850.252708a121.99278 121.99278 0 0 1 121.992779 121.992779v447.30686c-11.090253 25.877256-66.541516 155.263538-162.657039 170.050541s-144.173285-44.361011-225.501805-155.263538-184.837545-184.837545-288.346571-184.837545-192.231047 73.935018-243.985559 125.689531V173.747292a121.99278 121.99278 0 0 1 121.992779-121.992779zM850.252708 972.245487H173.747292A121.99278 121.99278 0 0 1 51.754513 850.252708v-192.231047C73.935018 628.447653 170.050542 506.454874 295.740072 502.758123s170.050542 55.451264 247.682311 162.657039 170.050542 177.444043 251.379061 177.444044h22.180505a266.166065 266.166065 0 0 0 155.263538-110.902527V850.252708a121.99278 121.99278 0 0 1-121.992779 121.992779z" p-id="2810"></path><path d="M731.956679 373.371841a136.779783 136.779783 0 0 0 0-273.559567 140.476534 140.476534 0 0 0-136.779784 136.779784 140.476534 140.476534 0 0 0 136.779784 136.779783z m0-221.805054a85.025271 85.025271 0 0 1 85.02527 85.025271 85.025271 85.025271 0 0 1-85.02527 85.025271 85.025271 85.025271 0 0 1 0-170.050542z" p-id="2811"></path></svg>
          <svg v-if="active == 1" t="1588044563881" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2223" width="15" height="15"><path d="M850.252708 1024H173.747292A177.444043 177.444043 0 0 1 0 850.252708V173.747292A173.747292 173.747292 0 0 1 173.747292 0H850.252708a177.444043 177.444043 0 0 1 173.747292 173.747292V850.252708a177.444043 177.444043 0 0 1-173.747292 173.747292zM173.747292 51.754513a121.99278 121.99278 0 0 0-121.992779 121.992779V850.252708a121.99278 121.99278 0 0 0 121.992779 121.992779H850.252708a121.99278 121.99278 0 0 0 121.992779-121.992779V173.747292A121.99278 121.99278 0 0 0 850.252708 51.754513z" fill="#12ACF4" p-id="2224"></path><path d="M731.956679 373.371841a140.476534 140.476534 0 0 1-136.779784-136.779783 140.476534 140.476534 0 0 1 136.779784-136.779784 136.779783 136.779783 0 0 1 0 273.559567z m0-221.805054a85.025271 85.025271 0 0 0 0 170.050542 85.025271 85.025271 0 0 0 85.02527-85.025271 85.025271 85.025271 0 0 0-85.02527-85.025271zM794.801444 842.859206c-81.32852 0-166.353791-59.148014-251.379061-177.444044s-158.960289-162.65704-247.682311-162.657039-247.68231 158.960289-247.68231 162.657039l-44.361011-29.574007c7.393502-7.393502 121.99278-181.140794 292.043321-184.837545 103.509025 0 199.624549 59.148014 288.346571 184.837545s158.960289 162.65704 225.501805 155.263538 162.65704-170.050542 162.657039-173.747292l48.057762 18.483754c-3.696751 7.393502-70.238267 188.534296-203.3213 207.018051z" fill="#12ACF4" p-id="2225"></path></svg>
        </div>
        <div style="opacity:1;">
          图片
        </div>
      </van-tabbar-item>
      <van-tabbar-item @click="nav_button" v-model="activez"  style="width:100%;">
        <div style="text-align:center; margin:0; padding:0; margin-top:-7px; margin-bottom:3px;">
          <svg v-if="active == 2" t="1590832429800" class="icon" viewBox="0 0 1210 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6274" width="16" height="16"><path d="M1143.663097 292.721056h-53.183875V143.141408a66.479844 66.479844 0 0 0-66.479844-66.479844H638.416285l-33.239921-59.831859a36.563914 36.563914 0 0 0-29.91593-16.619961H33.449709a29.91593 29.91593 0 0 0-33.239922 33.239922v930.71781a66.479844 66.479844 0 0 0 66.479844 59.831859h1076.973466a66.479844 66.479844 0 0 0 66.479843-59.831859V352.552915a63.155851 63.155851 0 0 0-66.479843-59.831859z m-119.663719-149.579648v149.579648h-269.243366l-79.775813-149.579648z m119.663719 814.378084H66.689631V66.689587h488.62685l152.90364 275.891351a29.91593 29.91593 0 0 0 26.591938 16.619961h408.851038z" p-id="6275" fill="#12adf5"></path></svg>
          <svg v-if="active !== 2" t="1590832389934" class="icon" viewBox="0 0 1210 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5971" width="16" height="16"><path d="M1143.663097 292.721056h-53.183875V143.141408a66.479844 66.479844 0 0 0-66.479844-66.479844H638.416285l-33.239921-59.831859a36.563914 36.563914 0 0 0-29.91593-16.619961H33.449709a29.91593 29.91593 0 0 0-33.239922 33.239922v930.71781a66.479844 66.479844 0 0 0 66.479844 59.831859h1076.973466a66.479844 66.479844 0 0 0 66.479843-59.831859V352.552915a63.155851 63.155851 0 0 0-66.479843-59.831859z m-119.663719-149.579648v149.579648h-269.243366l-79.775813-149.579648z m119.663719 814.378084H66.689631V66.689587h488.62685l152.90364 275.891351a29.91593 29.91593 0 0 0 26.591938 16.619961h408.851038z" p-id="5972" fill="#222222"></path></svg>
        </div>
        <div style="opacity:1;">
          文件
        </div>
      </van-tabbar-item>
      <van-tabbar-item @click="nav_button" v-model="activev" style="width:100%;">
        <div style="text-align:center; margin:0; padding:0; margin-top:-7px; margin-bottom:3px;">
          <svg v-if="active !== 3" t="1587960221619" class="icon" viewBox="0 0 1147 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2633" width="16" height="16"><path d="M1079.565891 0H67.472868A71.44186 71.44186 0 0 0 0 67.472868v889.054264a71.44186 71.44186 0 0 0 67.472868 67.472868h1012.093023a71.44186 71.44186 0 0 0 67.472869-67.472868V67.472868A71.44186 71.44186 0 0 0 1079.565891 0z m11.906977 956.527132a11.906977 11.906977 0 0 1-11.906977 11.906977H67.472868a11.906977 11.906977 0 0 1-11.906977-11.906977V67.472868a11.906977 11.906977 0 0 1 11.906977-11.906977h1012.093023a11.906977 11.906977 0 0 1 11.906977 11.906977z" p-id="2634"></path><path d="M821.581395 488.186047L420.713178 257.984496c-11.906977-7.937984-19.844961-7.937984-27.782945 0a19.844961 19.844961 0 0 0-15.875969 23.813954v460.4031a19.844961 19.844961 0 0 0 15.875969 23.813954h27.782945l400.868217-230.201551a27.782946 27.782946 0 0 0 11.906977-23.813953 23.813953 23.813953 0 0 0-11.906977-23.813953z m-388.96124 206.387596V329.426357l317.51938 182.573643z" p-id="2635"></path></svg>
          <svg v-if="active == 3" t="1588044764551" class="icon" viewBox="0 0 1147 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2718" width="16" height="16"><path d="M1079.565891 0H67.472868A71.44186 71.44186 0 0 0 0 67.472868v889.054264a71.44186 71.44186 0 0 0 67.472868 67.472868h1012.093023a71.44186 71.44186 0 0 0 67.472869-67.472868V67.472868A71.44186 71.44186 0 0 0 1079.565891 0z m11.906977 956.527132a11.906977 11.906977 0 0 1-11.906977 11.906977H67.472868a11.906977 11.906977 0 0 1-11.906977-11.906977V67.472868a11.906977 11.906977 0 0 1 11.906977-11.906977h1012.093023a11.906977 11.906977 0 0 1 11.906977 11.906977z" fill="#12ACF4" p-id="2719"></path><path d="M821.581395 488.186047L420.713178 257.984496c-11.906977-7.937984-19.844961-7.937984-27.782945 0a19.844961 19.844961 0 0 0-15.875969 23.813954v460.4031a19.844961 19.844961 0 0 0 15.875969 23.813954h27.782945l400.868217-230.201551a27.782946 27.782946 0 0 0 11.906977-23.813953 23.813953 23.813953 0 0 0-11.906977-23.813953z m-388.96124 206.387596V329.426357l317.51938 182.573643z" fill="#12ACF4" p-id="2720"></path></svg>
        </div>
        <div style="opacity:1;">
          视频
        </div>
      </van-tabbar-item>
      <van-tabbar-item @click="nav_button" v-model="activew" style="width:100%;">
        <div style="text-align:center; margin:0; padding:0; margin-top:-7px; margin-bottom:3px;">
          <svg v-if="active !== 4" t="1590832959140" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3482" width="17" height="17"><path d="M902.838077 481.721536a25.960139 25.960139 0 0 0-28.844599-28.844599 28.844599 28.844599 0 0 0-28.844599 28.844599 331.71289 331.71289 0 0 1-98.071637 236.525713 320.175051 320.175051 0 0 1-233.641253 98.071637A334.59735 334.59735 0 0 1 178.838638 484.605996a25.960139 25.960139 0 0 0-28.844599-28.844599 25.960139 25.960139 0 0 0-28.844599 28.844599 389.402089 389.402089 0 0 0 363.441949 386.517628v95.187178H291.332575a25.960139 25.960139 0 0 0-28.844599 28.844599 28.844599 28.844599 0 0 0 28.844599 28.844599h441.322367a28.844599 28.844599 0 0 0 28.844599-28.844599 25.960139 25.960139 0 0 0-28.844599-28.844599h-190.374354v-95.187178a389.402089 389.402089 0 0 0 360.557489-389.402088z" p-id="3483" fill="#222222"></path><path d="M510.551529 755.745228h5.768919a250.948013 250.948013 0 0 0 250.948013-253.832473V253.849202A250.948013 250.948013 0 0 0 516.320448 0.01673h-5.768919a250.948013 250.948013 0 0 0-253.832473 253.832472v248.063553a250.948013 250.948013 0 0 0 253.832473 253.832473zM314.408254 253.849202A193.258814 193.258814 0 0 1 510.551529 57.705928h5.768919a193.258814 193.258814 0 0 1 193.258815 196.143274v248.063553a193.258814 193.258814 0 0 1-193.258815 196.143275h-5.768919a193.258814 193.258814 0 0 1-196.143275-196.143275z" p-id="3484" fill="#222222"></path></svg>
          <svg v-if="active == 4" t="1590999331403" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4342" width="17" height="17"><path d="M902.838077 481.721536a25.960139 25.960139 0 0 0-28.844599-28.844599 28.844599 28.844599 0 0 0-28.844599 28.844599 331.71289 331.71289 0 0 1-98.071637 236.525713 320.175051 320.175051 0 0 1-233.641253 98.071637A334.59735 334.59735 0 0 1 178.838638 484.605996a25.960139 25.960139 0 0 0-28.844599-28.844599 25.960139 25.960139 0 0 0-28.844599 28.844599 389.402089 389.402089 0 0 0 363.441949 386.517628v95.187178H291.332575a25.960139 25.960139 0 0 0-28.844599 28.844599 28.844599 28.844599 0 0 0 28.844599 28.844599h441.322367a28.844599 28.844599 0 0 0 28.844599-28.844599 25.960139 25.960139 0 0 0-28.844599-28.844599h-190.374354v-95.187178a389.402089 389.402089 0 0 0 360.557489-389.402088z" p-id="4343" fill="#12adf5"></path><path d="M510.551529 755.745228h5.768919a250.948013 250.948013 0 0 0 250.948013-253.832473V253.849202A250.948013 250.948013 0 0 0 516.320448 0.01673h-5.768919a250.948013 250.948013 0 0 0-253.832473 253.832472v248.063553a250.948013 250.948013 0 0 0 253.832473 253.832473zM314.408254 253.849202A193.258814 193.258814 0 0 1 510.551529 57.705928h5.768919a193.258814 193.258814 0 0 1 193.258815 196.143274v248.063553a193.258814 193.258814 0 0 1-193.258815 196.143275h-5.768919a193.258814 193.258814 0 0 1-196.143275-196.143275z" p-id="4344" fill="#12adf5"></path></svg>
        </div>
        <div style="opacity:1;">
          语音
        </div>
      </van-tabbar-item>
    </van-tabbar> -->

  

    <!-- 底部输入框 -->
    
      <div class="foot" style="background-color:#fff;"> 
        <footer v-if="backColor=='#f5f5f5'" class="footer" style="display:flex;justify-content:space-between;align-items:center;box-sizing:border-box;padding:0 10px">
            <span id="sound" style="padding:0;margin:0">
              <svg v-if="iconyy == true" t="1589172760157" class="icon" @click="handClickCutChatMode" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3186" width="25" height="25"><path d="M512 0A512 512 0 1 0 1024 512 512.398444 512.398444 0 0 0 512 0z m0 944.311284A432.311284 432.311284 0 1 1 944.311284 512 433.108171 433.108171 0 0 1 512 944.311284z" fill="#999999" p-id="3187"></path><path d="M278.910506 375.333852a39.844358 39.844358 0 0 0-6.773541 56.180545 127.900389 127.900389 0 0 1 0 159.377432A39.844358 39.844358 0 0 0 278.910506 648.666148a39.844358 39.844358 0 0 0 25.101945 8.765759 39.844358 39.844358 0 0 0 31.0786-15.140856 208.385992 208.385992 0 0 0 0-260.582102A39.844358 39.844358 0 0 0 278.910506 375.333852zM435.897276 300.028016a39.844358 39.844358 0 0 0-7.171984 55.782101c5.179767 6.773541 125.509728 166.150973 0 310.785992a39.844358 39.844358 0 0 0 4.382879 56.180545 39.844358 39.844358 0 0 0 25.898833 9.961089 39.844358 39.844358 0 0 0 30.281712-13.945525c133.478599-155.79144 58.96965-337.880156 0-411.990662a39.844358 39.844358 0 0 0-53.39144-6.77354zM611.610895 244.245914a39.844358 39.844358 0 0 0-5.179767 56.180545 336.286381 336.286381 0 0 1 0 424.342413 39.844358 39.844358 0 0 0 7.171985 55.782101 39.844358 39.844358 0 0 0 24.305058 8.367315 39.844358 39.844358 0 0 0 31.477043-15.5393c207.589105-270.144747 0-521.562646 0-523.953307a39.844358 39.844358 0 0 0-57.774319-5.179767z" fill="#999999" p-id="3188"></path></svg>
              <svg v-if="iconyy == false" t="1589172690551" class="icon" @click="handClickCutChatMode" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3022" width="25" height="25"><path d="M512 0a512 512 0 0 0 0 1024 512 512 0 0 0 0-1024z m0 944a432 432 0 1 1 432-432 432 432 0 0 1-432 432z" fill="#989898" p-id="3023"></path><path d="M280 332H228a40 40 0 0 0-40 40 44 44 0 0 0 40 40H280a44 44 0 0 0 40-40 40 40 0 0 0-40-40zM404 412h52a44 44 0 0 0 40-40 40 40 0 0 0-40-40h-52a40 40 0 0 0-40 40 44 44 0 0 0 40 40zM628 332h-52a40 40 0 0 0-40 40 44 44 0 0 0 40 40h52a40 40 0 0 0 40-40 36 36 0 0 0-40-40zM744 412h48a40 40 0 0 0 40-40 36 36 0 0 0-40-40h-48a36 36 0 0 0-40 40 40 40 0 0 0 40 40zM280 492H228a40 40 0 0 0-40 40 44 44 0 0 0 40 40H280a44 44 0 0 0 40-40 40 40 0 0 0-40-40zM456 572a44 44 0 0 0 40-40 40 40 0 0 0-40-40h-52a40 40 0 0 0-40 40 44 44 0 0 0 40 40zM628 492h-52a40 40 0 0 0-40 40 44 44 0 0 0 40 40h52a40 40 0 0 0 40-40 36 36 0 0 0-40-40zM792 492h-48a36 36 0 0 0-40 40 40 40 0 0 0 40 40h48a40 40 0 0 0 40-40 36 36 0 0 0-40-40zM592 692h-160a36 36 0 0 0-40 40 40 40 0 0 0 40 40h160a44 44 0 0 0 40-40 40 40 0 0 0-40-40z" fill="#989898" p-id="3024"></path></svg>
              <!-- <img src="../../assets/images/chat1.png" @click="handClickCutChatMode" alt="" style="width:28px; height:28px;"> -->
            </span>
            <div style="flex:1;box-sizing:border-box;padding:0 10px;display:flex;align-items:center">
              <textarea @change="inputHeight" @keyup.enter="text" v-if="!isShowAudioContent" @blur="sendOutsBlur"  @focus="sendOuts" v-model="txt" rows="3"  style="overflowY:hidden;  resize: none;width:100%;"></textarea>
              <div v-else style="display:flex;width:100%;box-sizing:border-box;height:36px;line-height:36px;background:#f5f5f5;text-align:center">
                    <div @touchstart.prevent="touchRecordStart" @touchmove.prevent="move" @touchend="touchRecordEnd" style="pointer-events:nonefont-size:14px; width:100%; background-color:#f5f5f5; border:none;touch-action: none;" type="button">
                      <div>{{valueVoice}}</div>
                    </div>
              </div>
            </div>
          
            <div v-if="!isShowAudioContent" >
                <span v-show="More" id="sound" @click="adds">
                  <svg t="1591241385919" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4302" width="25" height="25"><path d="M796.88716 473.749416h-239.066148V227.511284a39.844358 39.844358 0 0 0-79.688716 0v246.238132H228.308171a39.844358 39.844358 0 0 0 0 79.688716H478.132296V796.88716a39.844358 39.844358 0 0 0 79.688716 0v-243.050584h239.066148a39.844358 39.844358 0 0 0 0-79.688716z" p-id="4303" fill="#989898"></path><path d="M512 0A512 512 0 1 0 1024 512 512.398444 512.398444 0 0 0 512 0z m0 944.311284A432.311284 432.311284 0 1 1 944.311284 512 433.108171 433.108171 0 0 1 512 944.311284z" p-id="4304" fill="#989898"></path></svg>
                </span>
                <div v-show="sendOut" style="text-align:center;">
                <button @mouseleave="text" style="width:45px; color:#fff; border-radius:4px;  font-size:13px; height:28px;  background-color:#12adf5; border:none;">{{ sendMsgBtnStr }}</button>
                </div>
            </div>
          </footer>
        <div style="background-color:#fff;" v-show="add">
          <van-row style="text-align:center; padding-top:16px;">
            <van-col span="6">
              <van-uploader :after-read="SendPictures" accept="image/*">
              <div style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;">
                <svg style="width:24px; height:24px; margin-top:9px;" t="1589178689127" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3668" width="24" height="24"><path d="M912.59709 0H111.40291a107.948556 107.948556 0 0 0-107.948556 107.948556v808.102888a107.948556 107.948556 0 0 0 107.948556 107.948556h801.19418a107.948556 107.948556 0 0 0 107.948556-107.948556V107.948556a107.948556 107.948556 0 0 0-107.948556-107.948556zM111.40291 43.179422h801.19418a64.769133 64.769133 0 0 1 64.769134 64.769134v518.153067c-9.067679 21.589711-67.359899 159.547965-166.240776 172.71769-69.302973 9.499473-145.946447-43.179422-227.98735-158.46848-86.358845-121.550074-182.433059-183.080751-282.609319-183.080751h-4.749736c-111.834704 2.158971-200.784314 80.313725-249.145267 134.072106V107.948556a64.769133 64.769133 0 0 1 64.769134-64.769134z m801.19418 937.641156H111.40291a64.769133 64.769133 0 0 1-64.769134-64.769134V659.565676c19.214843-26.555345 119.175206-156.741303 250.008855-159.332069h3.670251c86.358845 0 169.047438 55.485558 247.633987 165.161291C632.578537 783.274721 715.914822 841.998735 795.364959 841.998735a178.331014 178.331014 0 0 0 21.589711-1.51128c73.620915-10.147164 126.947502-69.734767 160.411554-121.981868v196.682269a64.769133 64.769133 0 0 1-64.769134 65.632722z" p-id="3669"></path><path d="M734.697871 368.320472a133.424415 133.424415 0 1 0-132.560827-133.424415 132.992621 132.992621 0 0 0 132.560827 133.424415z m0-223.669407a90.244993 90.244993 0 1 1-89.381405 90.244992 89.813198 89.813198 0 0 1 89.381405-90.244992z" p-id="3670"></path></svg>
                <p style="font-size:12px;">{{ pictureStr }}</p>
              </div>
              </van-uploader>
            </van-col>
            <van-col span="6">
              <!-- <van-uploader :after-read="changeVideo" accept="video/*"> -->
              <div @click="gotoRTCChat" style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;">
                <svg style="width:24px; height:24px; margin-top:9px;" t="1589178597653" class="icon" viewBox="0 0 1588 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3391" width="24" height="24"><path d="M1569.185185 18.962963a23.703704 23.703704 0 0 0-33.185185 0l-440.888889 251.259259v-142.222222A128 128 0 0 0 967.111111 0H128A128 128 0 0 0 0 128v768a128 128 0 0 0 128 128h839.111111a128 128 0 0 0 128-128v-142.222222l440.888889 256h33.185185c9.481481-9.481481 18.962963-18.962963 18.962963-28.444445V47.407407a33.185185 33.185185 0 0 0-18.962963-28.444444zM1028.740741 896a61.62963 61.62963 0 0 1-61.62963 61.62963H128a61.62963 61.62963 0 0 1-61.62963-61.62963V128a61.62963 61.62963 0 0 1 61.62963-61.62963h839.111111a61.62963 61.62963 0 0 1 61.62963 61.62963z m493.037037 28.444444l-426.666667-246.518518v-331.851852l426.666667-241.777778z" p-id="3392"></path></svg>
                <p style="font-size:12px;">{{ videoChatStr }}</p>
              </div>
              <!-- </van-uploader> -->
            </van-col>
            <!-- <van-col span="6">
              <van-uploader :after-read="SendPictures" capture="camera" >
              <div style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;">
                <svg style="width:24px; height:24px; margin-top:9px;" t="1589178731442" class="icon" viewBox="0 0 1128 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3839" width="24" height="24"><path d="M1009.48616 159.186891h-195.354693L724.977852 11.058274a23.03711 23.03711 0 0 0-19.811915-11.057813H425.034679a23.03711 23.03711 0 0 0-19.811914 11.057813L316.069149 158.95652H118.871488C53.446095 159.186891 0 219.083377 0 293.0325v596.89152c0 73.949123 53.446095 134.07598 118.871488 134.07598h890.614672c65.655763 0 118.871488-60.126857 118.871488-134.07598V293.0325c0.460742-73.949123-53.215724-133.845609-118.871488-133.845609zM1082.74417 889.92402c0 48.608302-32.712696 88.00176-72.797268 88.00176H118.871488C78.786916 977.92578 46.07422 938.532322 46.07422 889.92402V293.0325c0-48.377931 32.712696-87.771389 72.797268-87.771389h210.328814a23.03711 23.03711 0 0 0 19.811914-11.288184L437.70509 46.074681h253.40821l89.153616 147.898246a23.03711 23.03711 0 0 0 19.581543 11.057813h207.33399c40.084571 0 72.797268 39.393458 72.797268 87.771389z" p-id="3840"></path><path d="M564.178824 340.258575a240.046686 240.046686 0 0 0-234.748151 244.193366A239.816315 239.816315 0 0 0 564.178824 829.336421a239.816315 239.816315 0 0 0 234.748151-244.88448 240.046686 240.046686 0 0 0-234.748151-244.193366z m0 442.082141a193.742095 193.742095 0 0 1-188.673931-197.888775 193.972466 193.972466 0 0 1 188.673931-198.119146 193.972466 193.972466 0 0 1 188.673931 198.119146A193.742095 193.742095 0 0 1 564.178824 783.262201z" p-id="3841"></path></svg>
                <p style="font-size:12px;">拍摄</p>
              </div>
              </van-uploader>
            </van-col> -->
            <van-col span="6">
              <van-uploader  :after-read="handFile" accept="/*">
              <div style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;">
                <svg style="width:24px; height:24px; margin-top:9px;" t="1589178890729" class="icon" viewBox="0 0 1230 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4471" width="24" height="24"><path d="M1106.151108 1024H124.78528A125.822798 125.822798 0 0 1 0.00234 897.657273V126.342727A125.562833 125.562833 0 0 1 124.78528 0h548.005077a124.78294 124.78294 0 0 1 120.363544 94.367098h311.95735a125.562833 125.562833 0 0 1 124.782939 126.342727v675.907591a125.562833 125.562833 0 0 1-123.743082 127.382584zM51.995231 800.170602v97.486671a73.829906 73.829906 0 0 0 72.790049 74.349835h981.365828a73.829906 73.829906 0 0 0 72.790049-74.349835v-675.90759a73.569942 73.569942 0 0 0-72.790049-74.349835H746.620263v-24.436659A73.829906 73.829906 0 0 0 672.790357 51.992892H124.78528A73.569942 73.569942 0 0 0 51.995231 126.342727z" p-id="4472"></path></svg>
                <p style="font-size:12px;">{{ sendFileStr }}</p>
              </div>
              </van-uploader>
            </van-col>
            <van-col span="6">
              <div  @click="openRecordVideo">
              <div style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;">
                <svg style="width:24px; height:24px; margin-top:9px;" t="1589178731442" class="icon" viewBox="0 0 1128 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3839" width="24" height="24"><path d="M1009.48616 159.186891h-195.354693L724.977852 11.058274a23.03711 23.03711 0 0 0-19.811915-11.057813H425.034679a23.03711 23.03711 0 0 0-19.811914 11.057813L316.069149 158.95652H118.871488C53.446095 159.186891 0 219.083377 0 293.0325v596.89152c0 73.949123 53.446095 134.07598 118.871488 134.07598h890.614672c65.655763 0 118.871488-60.126857 118.871488-134.07598V293.0325c0.460742-73.949123-53.215724-133.845609-118.871488-133.845609zM1082.74417 889.92402c0 48.608302-32.712696 88.00176-72.797268 88.00176H118.871488C78.786916 977.92578 46.07422 938.532322 46.07422 889.92402V293.0325c0-48.377931 32.712696-87.771389 72.797268-87.771389h210.328814a23.03711 23.03711 0 0 0 19.811914-11.288184L437.70509 46.074681h253.40821l89.153616 147.898246a23.03711 23.03711 0 0 0 19.581543 11.057813h207.33399c40.084571 0 72.797268 39.393458 72.797268 87.771389z" p-id="3840"></path><path d="M564.178824 340.258575a240.046686 240.046686 0 0 0-234.748151 244.193366A239.816315 239.816315 0 0 0 564.178824 829.336421a239.816315 239.816315 0 0 0 234.748151-244.88448 240.046686 240.046686 0 0 0-234.748151-244.193366z m0 442.082141a193.742095 193.742095 0 0 1-188.673931-197.888775 193.972466 193.972466 0 0 1 188.673931-198.119146 193.972466 193.972466 0 0 1 188.673931 198.119146A193.742095 193.742095 0 0 1 564.178824 783.262201z" p-id="3841"></path></svg>
                <!-- <p style="font-size:12px;">拍摄</p> -->
                <p style="font-size:12px;">{{ viewChatDWebStr }}</p>
              </div>
              </div>
            </van-col>
            <!-- <van-col span="6">
              <div @click="Geography" style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;">
                <svg style="width:24px; height:24px; margin-top:9px;" t="1589178771495" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4050" width="24" height="24"><path d="M512 232.269512a160.060264 160.060264 0 1 0 160.060264 159.845993A160.274534 160.274534 0 0 0 512 232.269512z m0 277.052103a117.20611 117.20611 0 1 1 117.20611-117.20611A117.20611 117.20611 0 0 1 512 509.321615z" p-id="4051"></path><path d="M512 0A407.114459 407.114459 0 0 0 104.885541 407.114459c0 219.627537 376.259469 586.887633 392.115505 602.315129l14.998954 14.570412 14.998954-14.570412C542.854991 994.002092 919.114459 626.741996 919.114459 407.114459A407.114459 407.114459 0 0 0 512 0z m0 964.218456C441.719188 892.86629 147.739694 585.387738 147.739694 407.114459a364.260306 364.260306 0 0 1 728.520612 0c0 178.273279-293.979494 485.751831-364.260306 557.103997z" p-id="4052"></path></svg>
                <p style="font-size:12px;">位置</p>
              </div>
            </van-col> -->
          </van-row>
          <van-row style="text-align:center; padding-top:16px; padding-bottom:16px;">
            <!-- <van-col span="6">
              <div style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;">
                <svg style="width:24px; height:24px; margin-top:9px;" t="1589178771495" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4050" width="24" height="24"><path d="M512 232.269512a160.060264 160.060264 0 1 0 160.060264 159.845993A160.274534 160.274534 0 0 0 512 232.269512z m0 277.052103a117.20611 117.20611 0 1 1 117.20611-117.20611A117.20611 117.20611 0 0 1 512 509.321615z" p-id="4051"></path><path d="M512 0A407.114459 407.114459 0 0 0 104.885541 407.114459c0 219.627537 376.259469 586.887633 392.115505 602.315129l14.998954 14.570412 14.998954-14.570412C542.854991 994.002092 919.114459 626.741996 919.114459 407.114459A407.114459 407.114459 0 0 0 512 0z m0 964.218456C441.719188 892.86629 147.739694 585.387738 147.739694 407.114459a364.260306 364.260306 0 0 1 728.520612 0c0 178.273279-293.979494 485.751831-364.260306 557.103997z" p-id="4052"></path></svg>
                <p style="font-size:12px;">位置</p>
              </div>
            </van-col> -->
            <van-col span="6">
              <div @click="Geography" style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;">
                <svg style="width:24px; height:24px; margin-top:9px;" t="1589178854006" class="icon" viewBox="0 0 1085 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4261" width="24" height="24"><path d="M953.949191 1024H130.753654A130.983854 130.983854 0 0 1 0 893.246346c0-69.060028 92.080038-134.897255 167.815869-177.254072 48.11182-26.703211 194.28888-84.253234 230.200094-98.06524a95.993439 95.993439 0 0 0-8.977804-89.778037 281.534715 281.534715 0 1 1 268.64351 1.611401 92.080038 92.080038 0 0 0-2.992601 87.015635c35.220614 14.042206 185.771476 73.66403 235.955097 98.755841 58.470824 29.005212 194.058679 104.280643 194.058679 176.793672a130.983854 130.983854 0 0 1-130.753653 131.674454zM525.546815 46.3402a235.724896 235.724896 0 0 0-109.805445 444.055982 23.020009 23.020009 0 0 1 8.057003 6.906002c2.302001 3.222801 55.017823 78.958632 9.208004 151.471662a21.178409 21.178409 0 0 1-11.049604 8.977804c-1.841601 0-180.937274 70.211029-231.811495 98.52564C101.288041 806.000511 46.040019 857.795532 46.040019 893.246346a84.713635 84.713635 0 0 0 84.713635 84.713635h823.195537a84.713635 84.713635 0 0 0 84.713634-84.713635c0-29.695812-71.822429-87.245836-168.506469-135.587855-53.866822-26.933411-237.566497-99.216241-239.408098-99.906841a23.020009 23.020009 0 0 1-10.819404-8.517403 139.501257 139.501257 0 0 1 1.6114-148.939461 23.020009 23.020009 0 0 1 8.747604-7.596604A235.494696 235.494696 0 0 0 525.546815 46.3402z" p-id="4262"></path></svg>
                <p style="font-size:12px;">{{ sendContactStr }}</p>
              </div>
            </van-col>
            <van-col span="6">
              <div  @click="openForm">
              <div style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;">
                <svg style="width:24px; height:24px; margin-top:9px;" t="1589178731442" class="icon" viewBox="0 0 1128 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3839" width="24" height="24"><path d="M1009.48616 159.186891h-195.354693L724.977852 11.058274a23.03711 23.03711 0 0 0-19.811915-11.057813H425.034679a23.03711 23.03711 0 0 0-19.811914 11.057813L316.069149 158.95652H118.871488C53.446095 159.186891 0 219.083377 0 293.0325v596.89152c0 73.949123 53.446095 134.07598 118.871488 134.07598h890.614672c65.655763 0 118.871488-60.126857 118.871488-134.07598V293.0325c0.460742-73.949123-53.215724-133.845609-118.871488-133.845609zM1082.74417 889.92402c0 48.608302-32.712696 88.00176-72.797268 88.00176H118.871488C78.786916 977.92578 46.07422 938.532322 46.07422 889.92402V293.0325c0-48.377931 32.712696-87.771389 72.797268-87.771389h210.328814a23.03711 23.03711 0 0 0 19.811914-11.288184L437.70509 46.074681h253.40821l89.153616 147.898246a23.03711 23.03711 0 0 0 19.581543 11.057813h207.33399c40.084571 0 72.797268 39.393458 72.797268 87.771389z" p-id="3840"></path><path d="M564.178824 340.258575a240.046686 240.046686 0 0 0-234.748151 244.193366A239.816315 239.816315 0 0 0 564.178824 829.336421a239.816315 239.816315 0 0 0 234.748151-244.88448 240.046686 240.046686 0 0 0-234.748151-244.193366z m0 442.082141a193.742095 193.742095 0 0 1-188.673931-197.888775 193.972466 193.972466 0 0 1 188.673931-198.119146 193.972466 193.972466 0 0 1 188.673931 198.119146A193.742095 193.742095 0 0 1 564.178824 783.262201z" p-id="3841"></path></svg>
                <p style="font-size:12px;">{{ intoFormEngineStr }}</p>
              </div>
              </div>
            </van-col>
            <van-col span="6">
              <div  @click="openFORK">
              <div style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;">
                <svg style="width:24px; height:24px; margin-top:9px;" t="1589178731442" class="icon" viewBox="0 0 1128 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3839" width="24" height="24"><path d="M1009.48616 159.186891h-195.354693L724.977852 11.058274a23.03711 23.03711 0 0 0-19.811915-11.057813H425.034679a23.03711 23.03711 0 0 0-19.811914 11.057813L316.069149 158.95652H118.871488C53.446095 159.186891 0 219.083377 0 293.0325v596.89152c0 73.949123 53.446095 134.07598 118.871488 134.07598h890.614672c65.655763 0 118.871488-60.126857 118.871488-134.07598V293.0325c0.460742-73.949123-53.215724-133.845609-118.871488-133.845609zM1082.74417 889.92402c0 48.608302-32.712696 88.00176-72.797268 88.00176H118.871488C78.786916 977.92578 46.07422 938.532322 46.07422 889.92402V293.0325c0-48.377931 32.712696-87.771389 72.797268-87.771389h210.328814a23.03711 23.03711 0 0 0 19.811914-11.288184L437.70509 46.074681h253.40821l89.153616 147.898246a23.03711 23.03711 0 0 0 19.581543 11.057813h207.33399c40.084571 0 72.797268 39.393458 72.797268 87.771389z" p-id="3840"></path><path d="M564.178824 340.258575a240.046686 240.046686 0 0 0-234.748151 244.193366A239.816315 239.816315 0 0 0 564.178824 829.336421a239.816315 239.816315 0 0 0 234.748151-244.88448 240.046686 240.046686 0 0 0-234.748151-244.193366z m0 442.082141a193.742095 193.742095 0 0 1-188.673931-197.888775 193.972466 193.972466 0 0 1 188.673931-198.119146 193.972466 193.972466 0 0 1 188.673931 198.119146A193.742095 193.742095 0 0 1 564.178824 783.262201z" p-id="3841"></path></svg>
                <p style="font-size:12px;">{{ intoForklistStr }}</p>
              </div>
              </div>
            </van-col>
            <van-col span="6">
              <div  @click="shareChat">
              <div style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;">
                <svg style="width:24px; height:24px; margin-top:9px;" t="1589178854006" class="icon" viewBox="0 0 1085 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4261" width="24" height="24"><path d="M953.949191 1024H130.753654A130.983854 130.983854 0 0 1 0 893.246346c0-69.060028 92.080038-134.897255 167.815869-177.254072 48.11182-26.703211 194.28888-84.253234 230.200094-98.06524a95.993439 95.993439 0 0 0-8.977804-89.778037 281.534715 281.534715 0 1 1 268.64351 1.611401 92.080038 92.080038 0 0 0-2.992601 87.015635c35.220614 14.042206 185.771476 73.66403 235.955097 98.755841 58.470824 29.005212 194.058679 104.280643 194.058679 176.793672a130.983854 130.983854 0 0 1-130.753653 131.674454zM525.546815 46.3402a235.724896 235.724896 0 0 0-109.805445 444.055982 23.020009 23.020009 0 0 1 8.057003 6.906002c2.302001 3.222801 55.017823 78.958632 9.208004 151.471662a21.178409 21.178409 0 0 1-11.049604 8.977804c-1.841601 0-180.937274 70.211029-231.811495 98.52564C101.288041 806.000511 46.040019 857.795532 46.040019 893.246346a84.713635 84.713635 0 0 0 84.713635 84.713635h823.195537a84.713635 84.713635 0 0 0 84.713634-84.713635c0-29.695812-71.822429-87.245836-168.506469-135.587855-53.866822-26.933411-237.566497-99.216241-239.408098-99.906841a23.020009 23.020009 0 0 1-10.819404-8.517403 139.501257 139.501257 0 0 1 1.6114-148.939461 23.020009 23.020009 0 0 1 8.747604-7.596604A235.494696 235.494696 0 0 0 525.546815 46.3402z" p-id="4262"></path></svg>
                <p style="font-size:12px;">{{ sendChat2DWebStr }}</p>
              </div>
              </div>
            </van-col>
          </van-row>
        </div>

        <!-- 撤回消息 -->
        <van-popup get-container="body" v-model="Longpress" style="width:200px; height:140px; border-radius:5px;overflow:hidden;">
          <div style="font-size:15px; text-align:center; padding-top:10px;">
            {{ undoSendMsgStr }}
          </div>
          <div style="font-size:14px; padding-left:15px;padding-top:20px;">
            {{ undoSendMsgTipsStr }}
          </div>
          <div style="width:100%; position:fixed; bottom:0; height:45px; border-top:1px solid #eee;">
            <div @click="cancels"  style="float:left; width:50%; font-size:15px; border-right:1px solid #eee; height:45px; text-align:center; line-height:40px;">
              {{ cancelStr }}
            </div>
            <div @click="confirms" style="float:left; width:50%; font-size:15px; text-align:center; line-height:40px;">
              {{ okStr }}
            </div>
          </div>
        </van-popup>

        <van-popup v-model="show" style="width:280px; height:360px; border-radius:4px;">
            <div style="width:100%; height:100%; position:relative;">
              <div style="display:flex; justify-content:center; align-items:center; padding-top:55px;">
                <svg t="1587175410587" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1500" width="65" height="65"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="1501"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="1502"></path></svg>
              </div>
              <div style="font-size:17px; font-weight:bold; text-align:center; margin-top:18px;">
                VIP{{chat_vip_level}}
              </div>
              <div style="font-size:14px; margin-top:30px; padding:0 15px 0 15px;word-wrap:break-word; word-break:break-all; overflow: hidden;">
                {{yourVipTipsStr}}{{user_vip_level}}{{visitGroupVipStr}}{{chat_vip_level}}{{forkOkTipsStr}}{{forkids}})，{{ pleaseBuyVipTipsStr }}
              </div>
              <div style="width:100%; height:42px;position:fixed; bottom:23px; float:left; font-size:15px;">
                  <div @click="Determine" style="width:50%; float:left;height:40px; text-align:center; line-height:42px;color:#111;">
                    <button style="background-color:#12adf5; color:#fff; border:none; width:110px; border-radius:4px;">{{ buyVipNowStr }}</button>
                  </div>
                  <div @click="cancel" style="width:50%; float:left; height:40px;text-align:center; line-height:42px; color:#12adf5;">
                    <button style="background-color:#f5f5f5; color:#000; border:none; width:110px; border-radius:4px;">{{cancelStr}}</button>
                  </div>
              </div>
            </div>
          </van-popup>

          <van-popup get-container="body" v-model="showss" style="width:280px; height:360px; border-radius:4px;">
            <div style="width:100%; height:100%; position:relative;">
              <div style="display:flex; justify-content:center; align-items:center; padding-top:55px;">
                <svg t="1587175410587" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1500" width="65" height="65"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="1501"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="1502"></path></svg>
              </div>
              <div style="font-size:17px; font-weight:bold; text-align:center; margin-top:18px;">
                VIP{{user_vip_level}}
              </div>
              <div style="font-size:14px; margin-top:50px; padding:0 15px 0 15px;">
                {{yourVipTipsStr}}{{user_vip_level}}{{sendMsgNeedVipTipsStr}}{{send_vip_level}}{{ needSendVipStr }}
              </div>
              <div style="width:100%; height:42px;position:fixed; bottom:23px; float:left; font-size:15px;">
                  <div @click="Determine" style="width:50%; float:left;height:40px; text-align:center; line-height:42px;color:#111;">
                    <button style="background-color:#12adf5; color:#fff; border:none; width:110px; border-radius:4px;">{{buyVipNowStr}}</button>
                  </div>
                  <div @click="cancel" style="width:50%; float:left; height:40px;text-align:center; line-height:42px; color:#12adf5;">
                    <button style="background-color:#f5f5f5; color:#000; border:none; width:110px; border-radius:4px;">{{ cancelStr }}</button>
                  </div>
              </div>
            </div>
          </van-popup>
      </div>
    </div>
      <div v-show="audioxx">
        <div style="position:fixed; z-index:9999; height:120px; width:100%; bottom:160px;  margin:auto;">
          <div style="width:100px; height:100px; border-radius:10px;" :style="{background:audiocolor}">
            <div style="text-align:center;padding-top:13px;">
              <svg style="" oncontextmenu="return false;" onselectstart="return false;" t="1589019865638" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2296" width="50" height="50"><path d="M689.929569 459.960656v-97.363935l-47.003279 77.219672v20.144263a130.937705 130.937705 0 0 1-90.64918 127.580328l-33.573771 50.360655a177.940984 177.940984 0 0 0 171.22623-177.940983zM223.254159 970.281967a16.786885 16.786885 0 0 0 10.072131 16.786885H253.470552l13.429508-10.072131 567.396722-906.491803a23.501639 23.501639 0 0 0 3.357377-16.786885 33.57377 33.57377 0 0 0-13.429509-16.786885h-16.786885a33.57377 33.57377 0 0 0-16.786885 13.429508L226.611536 953.495082a13.429508 13.429508 0 0 0-3.357377 16.786885zM401.195142 604.327869l26.859017-40.288525a124.222951 124.222951 0 0 1-53.718033-104.078688V177.940984a134.295082 134.295082 0 0 1 134.295082-130.937705h3.357377a130.937705 130.937705 0 0 1 130.937705 130.937705v40.288524l43.645901-70.504918A177.940984 177.940984 0 0 0 511.988585 0h-3.357377a181.298361 181.298361 0 0 0-181.298361 177.940984v282.019672A177.940984 177.940984 0 0 0 401.195142 604.327869zM330.690224 721.836066l23.50164-40.288525a325.665574 325.665574 0 0 1-154.439345-275.304918 23.501639 23.501639 0 0 0-23.501639-23.501639 23.501639 23.501639 0 0 0-23.501639 23.501639 365.954098 365.954098 0 0 0 177.940983 315.593443z" fill="#FFFFFF" p-id="2297"></path><path d="M871.227929 406.242623a23.501639 23.501639 0 1 0-47.003279 0 315.593443 315.593443 0 0 1-312.236065 318.95082H468.342683l-26.859016 43.645901 47.003279 3.357377v204.8H374.336126a23.501639 23.501639 0 1 0 0 47.003279h275.304918a23.501639 23.501639 0 0 0 0-47.003279h-114.15082V772.196721a362.596721 362.596721 0 0 0 335.737705-365.954098z" fill="#FFFFFF" p-id="2298"></path></svg>
            </div>
            <div style="color:#fff; font-size:14px; text-align:center;">
              松开 取消
            </div>
          </div>
        </div>
        <div style="position:fixed; z-index:10000; height:50px;width:100%;bottom:65px;text-align:center;">
          <div style="font-size:14px; color:#fff;">{{timeX}}</div>
          <div style="font-size:14px; color:#fff;">松开 发送</div>
        </div>
        <div style="background-color:#666;height:60px;">
          <div style="position:fixed; z-index:10000; height:60px; width:100%; background-color:#12adf5; bottom:0; border-top-left-radius:50%; border-top-right-radius:50%;">
          <div style="text-align:center; padding-top:22px;">
            <svg style="" t="1589172095420" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2461" width="25" height="25"><path d="M508.642623 641.259016h3.357377a181.298361 181.298361 0 0 0 177.940984-181.29836V177.940984A177.940984 177.940984 0 0 0 512 0h-3.357377a181.298361 181.298361 0 0 0-181.298361 177.940984v282.019672a181.298361 181.298361 0 0 0 181.298361 181.29836z m-134.295082-463.318032a134.295082 134.295082 0 0 1 134.295082-130.937705h3.357377a130.937705 130.937705 0 0 1 130.937705 130.937705v282.019672a130.937705 130.937705 0 0 1-130.937705 134.295082h-3.357377a134.295082 134.295082 0 0 1-134.295082-134.295082z" fill="#FFFFFF" p-id="2462"></path><path d="M871.239344 406.242623a23.501639 23.501639 0 1 0-47.003278 0 315.593443 315.593443 0 0 1-312.236066 318.95082 315.593443 315.593443 0 0 1-312.236066-318.95082 23.501639 23.501639 0 0 0-23.501639-23.501639 23.501639 23.501639 0 0 0-23.501639 23.501639A362.596721 362.596721 0 0 0 488.498361 772.196721v204.8H374.347541a23.501639 23.501639 0 1 0 0 47.003279h275.304918a23.501639 23.501639 0 0 0 0-47.003279h-114.15082V772.196721a362.596721 362.596721 0 0 0 335.737705-365.954098z" fill="#FFFFFF" p-id="2463"></path></svg>
          </div>
        </div>
        </div>
      </div>
    
     <recordVideo ref="recordVideo" @sendVideo="changeVideo"></recordVideo>
  </div>
</template>

<script>

import { getStyle, getCanvasStyle } from '@/utils/style'
import { changeStyleWithScale } from '@/utils/translate'
import ComponentWrapper from '@/components/Item/ComponentWrapper'
// import { toPng, getFontEmbedCSS } from 'html-to-image'
// // import domtoimage from 'dom-to-image'
// import { deepCopy } from '@/utils/utils'


import imgOnline from "../../assets/images/onLine.png";
import imgOffline from "../../assets/images/offLine.png";
import { ImagePreview } from 'vant';
import Recorder  from 'js-audio-recorder';
import { Notify } from 'vant';

import recordVideo from '../../components/recordVideo/recordVideo.vue'
import videoplay from '../../components/videoplay/videoplay.vue'
Vue.use(Notify);

//自定义的图片懒加载
// import imageLazyLoad from '../../api/imageLazyLoad'
// Vue.use(imageLazyLoad)

function GetDateTimeFormat(timestr) {
        var data = new Date();;
        if (timestr) {
            data = new Date(timestr * 1000);
        }
        let t = data.getFullYear() + "-" + (data.getMonth() < 9 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1))
            + "-" + (data.getDate() < 10 ? '0' + data.getDate() : data.getDate()) +
            " "+(data.getHours() < 10 ? '0' + data.getHours() : data.getHours()) +":"
            +(data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes()) //+"."+data.getSeconds();

        return t;
    }


let const_chatid = null;
let user_keepalive =0;
let websock = null;
let keepalive_id = null;
let exitFlag = false;
const restart_time = 1000;
let timeOutEvent = 0;


import { Dialog } from 'vant';
import iblogo from '../../assets/images/smile2.png'
import quserlogo from '../../assets/images/1.png'

import chatNoticeJson from './datajson/chatNotice.json'
import chatEccNoticeJson from './datajson/chatEccNotice.json'

import XMsgViewer from '@/components/Item/XMsgViewer'

export default {
  name: 'chat',
   components: {
     recordVideo,
     videoplay,
     ComponentWrapper,
     XMsgViewer,
  },
  data() {
    return {
      is_identity:false,
      chat_type:'',
      backgroundUrl:'',
      isLoading: false,
      iconyy:true,
      backColor:'#f5f5f5',
      audiocolor:'#08435f',
      audioxx:false,
      iconx:1,
      error:[],
      audio:null,
      sign:'',
      gif:false,
      suspend:false,
      play:true,
      playx:0,
      timeX:'',
      cancelText:'#000',
      moveY:0,
      endY:0,
      startY:0,
      VoiceTime:false,
      cancelx:false,
      valueVoice:'按住 说话',
      texta:false,
      imga:false,
      filea:false,
      videoa:false,
      recorda:false,
      state:true,
      active:'',
      activev:0,
      activew:0,
      activex:0,
      activey:0,
      activez:0,
      iframeUrl:'',
      user_vip_level:'0',
      show:false,
      show1:false,
      showss:false,
      images:'',
      sendOut:false,
      More:true,
      chat_vip_level:'',
      send_vip_level:'',
      forkids:'暂无该设置',
      imgStatus:true,
      chatText:'聊天',
      texts:'',
      add:false,
      zhanwei1:true,
      zhanwei2:false,
      msgid:'',
      txt:"",
      chatRexord:[],
      token:'',
      Longpress:false,
      withdraw:'',
      urlname:'',
      textz:[],
      imgz:[],
      qxtime:'',
      filez:[],
      videoz:[],
      recordz:[],
      begin:0,
      len:1000000,
      page_len:20,
      p_begin:0,
      p_end:0,
      is_first_page:true,
      finished:false,
      listtime:false,
      heightx:true,
      rollheight:'',
      rollheightx:'',
      record: null,
      isShowAudioContent: false,
      recordTime: 0,
      vidoeKye: true,
      create_img:'',
      create_user_id:'',
      player:null,
      cnt:0,
      opacityNav:'0.7',
      bodyHeight:'',
      footerd:true,
      darkMode:false,
      lastSendHeightMap:new Map(),
      pctx:{},
      chatid:this.$route.params.token_y,
      ibapp_chat:false,
      iblogo:iblogo,
      quserlogo:quserlogo,
      img_q:0.5, 
      msgItem:null,
      fullWidth:window.fullWidth,
      isFull: false,
      chatWeb3Key:null,
      publicKeyNoticeMap:new Map(),
      chatnoticeJSONData:chatNoticeJson,
      jsonDataNotice:chatEccNoticeJson,
      sendMsgBtnStr:'发送',
      chatTitleStr:'聊天',
      ibchatStr:'智体IB',
      mechatStr:'我',
      pictureStr:'照片',
      videoChatStr:'视频聊天',
      sendFileStr:'文件',
      viewChatDWebStr:'头榜',
      sendContactStr:'联系人',
      intoFormEngineStr:'表单',
      intoForklistStr:'福刻FORK',
      sendChat2DWebStr:'推头榜',
      undoSendMsgStr:'撤回消息',
      undoSendMsgTipsStr:'是否撤回该消息?',
      cancelStr:'取消',
      okStr:'确定',
      yourVipTipsStr:'你的会员等级为VIP',
      visitGroupVipStr:'本群访问权限需要VIP',
      forkOkTipsStr:'以上（或需要福刻访问权限：',
      pleaseBuyVipTipsStr:'请您开通会员',
      buyVipNowStr:'充值会员',
      sendMsgNeedVipTipsStr:'本群发送消息权限需要VIP',
      needSendVipStr:'以上，请您开通会员',
    };
    
  },
  methods: {
    getStyle,
    getCanvasStyle,
    changeStyleWithScale,
    GetDateTimeFormat(time_i){
        return str_filter.GetDateTimeFormat(time_i)
    },
    g_img_q(img_q){
      rpc_client.img_q = !img_q ? 0.5 : img_q//parseFloat(img_q)
      this.img_q = rpc_client.img_q
      return this.img_q
    },
    save_img_q(){
      rpc_client.img_q = this.img_q
      return rpc_client.img_q
    },
    handleSubmit(p) {
          // 通过表单提交按钮触发，获取promise对象
          p().then(res => {
            // 获取数据成功
            alert(JSON.stringify(res))
          })
            .catch(err => {
              console.log(err, '校验失败')
            })
        },
        getData() {
          // 通过函数获取数据
          this.$refs.KFB.getData().then(res => {
            // 获取数据成功
            alert(JSON.stringify(res))
          })
            .catch(err => {
              console.log(err, '校验失败')
            })
        },
    clickFull(e){
      let This = this
      // console.log('This:',This)
      let el = e.target 
      if(el.isFull) return 
      //全屏显示图片的代码
      el.isFull = true
      This.isFull=true
      el.requestFullscreen()
      console.log('This.isFull:'+This.isFull)
      document.onclick = function(){
        if(!document.fullscreenElement) return 
        document.exitFullscreen()
        el.isFull = false
        This.isFull=false
        console.log('after-exitFullscreen-This.isFull:'+This.isFull)
        document.onclick = null
      }
    },
    handleScroll(e){
      let x= e.srcElement.scrollTop + e.srcElement.offsetHeight 
      let y =  e.srcElement.scrollHeight
      // console.log('x:'+x+' y:'+y)
      if(typeof scrollFuncs !='undefined' && scrollFuncs.length>0)
      for(let i=0;i<scrollFuncs.length;i++){
        scrollFuncs[i](e)
      }
    },
    rollHeight(){//获取滚动条高度
      this.rollheight = document.getElementById('chatBox').scrollHeight// 移动端获取对象
      // this.rollheight = document.documentElement.scrollHeight // 浏览器滚动高度
      // console.log(this.rollheight)
    },///

    card_name(item){///点击进入名片联系人的个人信息
      console.log(item)
      this.$router.push(`/index/GroupInformation/GroupOwner/${item.msg_info.body.name}`)
    },
    openCommentWindow(item,xtype) {
      localStorage.setItem('poster_type','xmsg')
      localStorage.setItem('poster_value',xtype)//类型
      // if(this.now_xmsg_info && this.now_xmsg_info.xmsgid && this.now_xmsg_info.xmsgid.indexOf('xmsgl')>0)
      // {
      //   localStorage.setItem('from_label_type',this.now_xmsg_info.xmsgid)
      // }
      // else if( this.now_chat_info )
      // {
      //   localStorage.setItem('from_label_type',this.now_chat_info.label_type)
      // }
      if(xtype=='rels')
      {
        localStorage.setItem('dweb_p_xmsg_info',JSON.stringify( item))
      }
      this.$router.push('/poster/'+item.xmsgid)
    },
    gotoSubXmsg(item)
    {
      localStorage.setItem('dweb-into-xmsg-info',JSON.stringify(item))
      this.$router.push('/dweb')
    },
    onLoad(){
      if(this.ibapp_chat){
        console.log('no onLoad')
        this.finished = false
        this.isLoading = false
        return 
      }
      console.log('chat-onLoad:',(Date.now()-this.create_time),this.create_time)
      if(Date.now()-this.create_time < 3000)
      {
        this.isLoading = false;
        return 
      }
      let This = this
      // if(this.is_first_page){
      //   this.isLoading = false
      //   return ;
      // } 

      this.rollHeight()
      // console.log(this.rollheight)
      this.heightx = false
      this.listtime = false


      let begin = this.p_begin- this.page_len >=0 ? this.p_begin - this.page_len:0
      let end = this.msgList.length
      if(begin == this.p_begin){
        this.finished = true

        this.$toast('没有更多数据可供加载..')
        this.isLoading = false;
        // this.heightx = true


        return 
      }
      this.isLoading = true
      {this.listtime=true}
      this.expandUserData(this.msgList.slice(this.p_begin =  begin,this.p_end =  end));
      setTimeout(()=>This.isLoading = false,500)
      if(this.p_begin == 0) this.finished = true


      let i = 0
      console.log(this.listtime)
      console.log(i)
      let timex = setInterval(() => {
        i++;
        console.log(i)
        console.log(this.listtime)
        
        clearInterval(timex);
        // this.isLoading = false;
        i=0;
        this.heightx = true
        this.rollheightx = document.getElementById('chatBox').scrollHeight
        console.log(this.rollheight + '----')
        console.log(this.rollheightx +  '++++')
        document.getElementById('chatBox').scrollTop = this.rollheightx - this.rollheight// 移动端获取对象
        // document.documentElement.scrollTop = this.rollheightx - this.rollheight // 浏览器滚动高度
      
      }, 1000);
    },
    onRefresh() {//下拉加载更多数据
      console.log('chat-onRefresh:',(Date.now()-this.create_time),this.create_time)
      if(Date.now()-this.create_time < 3000)
      {
        this.isLoading = false;
        return 
      }
      this.rollHeight()
      // console.log(this.rollheight)
      this.heightx = false
      this.listtime = false
      // this.len += 20
      if(!(this.chatRexord && this.chatRexord.length >0 && this.chatRexord.length%this.len ==0))
      {
        console.log('no more chatRexord, len:'+(this.chatRexord ? this.chatRexord.length:0))
        this.$toast('没有更多数据可供加载..')
        this.isLoading = false;
        this.heightx = true
        return 
      }
      this.begin +=this.len
      this.news()
      console.log(this.begin)
      console.log(this.len)
      let i = 0
      console.log(this.listtime)
      console.log(i)
      let timex = setInterval(() => {
        i++;
        console.log(i)
        console.log(this.listtime)
        if(this.listtime ==true){
          clearInterval(timex);
          this.isLoading = false;
          i=0;
          this.heightx = true
          this.rollheightx = document.getElementById('chatBox').scrollHeight
          console.log(this.rollheight + '----')
          console.log(this.rollheightx +  '++++')
          document.getElementById('chatBox').scrollTop = this.rollheightx - this.rollheight// 移动端获取对象
          // document.documentElement.scrollTop = this.rollheightx - this.rollheight // 浏览器滚动高度
        }else if(i >=6){
          clearInterval(timex);
          this.$toast('当前网络不佳，请重试')
          this.isLoading = false;
          i=0;
          this.heightx = true
        }
      }, 1000);
    },///

    Geography(){//发送联系人名片
      this.$router.push(`/index/ChatFunction/contacts/${this.$route.params.token_y}`)
    },///

    mounteds(){//获取屏幕高度
              this.bodyHeight=document.documentElement.clientHeight
              // console.log(this.bodyHeight)
            },

    nav_button(){//点击切换浏览效果
    console.log(this.activex)
    // this.activex = 0
     if(this.active == 0 && this.activex == 0)
     {
       this.texta = true;
       this.imga = false;
       this.filea = false;
       this.state = false;
       this.videoa = false;
       this.recorda = false;
       this.activex = 1;
     }else if(this.active == 1 && this.activey == 0)
     {
       this.texta = false;
       this.imga = true;
       this.filea = false;
       this.state = false;
       this.videoa = false;
       this.recorda = false;
       this.activey = 1;
     }else if(this.active == 2 && this.activez == 0)
     {
       this.texta = false;
       this.imga = false;
       this.filea = true;
       this.state = false;
       this.videoa = false;
       this.recorda = false;
       this.activez = 1;
     }else if(this.active == 3 && this.activev == 0)
     {
       this.texta = false;
       this.imga = false;
       this.filea = false;
       this.state = false;
       this.videoa = true;
       this.recorda = false;
       this.activev = 1;
     }else if(this.active == 4 && this.activew == 0)
     {
       this.texta = false;
       this.imga = false;
       this.filea = false;
       this.state = false;
       this.videoa = false;
       this.recorda = true;
       this.activew = 1;
     }else
     {
       this.texta = false;
       this.imga = false;
       this.filea = false;
       this.state = true;
       this.videoa = false;
       this.recorda = false;
       this.active = ''
       this.activev = 0
       this.activew = 0
       this.activex = 0
       this.activey = 0
       this.activez = 0
     }
    },
    showOrBaned(res){
      if(!res){
        console.log('showOrBaned-res is empty',res)
      }
      console.log('showOrBaned-res:',res)
      this.user_vip_level = res.user_vip_level ? res.user_vip_level : '0'
      if(res.msg == 'msg list is empty'){
        return;
      }else if(res.msg == 'visit pm judge: your vip-level less than groupchat-vip-level'){
        if(this.user_vip_level >= this.chat_vip_level)
        {
          if(confirm('没有本群访问权限，请前往查看群所需的访问权限？'))
          {
            this.$router.push(`/index/new_file/${this.$route.params.token_y}`);
          }
          //
        }
        else this.show = true
      }else if (res.msg == "chatroom is alread baned")
      {
        this.msg = "chatroom is alread baned"
        Dialog.alert({
            title: '该群已被封禁',
            message: '如有疑问，请联系客服',
          }).then(() => {
            // on close
          });
          
      }
    },
    async news(refresh = true){//所有消息列表
      if(this.ibapp_chat){
        console.log('do not get news()')
        return 
      }
      console.log('这是聊天id' + this.$route.params.token_y)
      let roomid = this.$route.params.token_y
      let random = Math.random()
              let user = {
                user_id:localStorage.user_id,
                s_id:localStorage.s_id,
                chatid:this.$route.params.token_y,
                begin:this.begin,
                len:this.len,
              }
      // let res =  await this.$api.network.ChatmsgList(user)
      /*.catch(e => {
        console.log(e)
        let array = JSON.parse(localStorage.getItem('error'))
        array.push(e)
        localStorage.setItem('error',JSON.stringify(array))
      })*/
      // localStorage.getItem('chatroom_msgs_cached-'+roomid)
      let res = null ,chatroom_msgs_cached =this.begin>0 ? null: await imDb.getDataByKey('chatroom_msgs_cached-'+roomid),This = this,fromNetFlag = false
      if(chatroom_msgs_cached && chatroom_msgs_cached.data)
      {
        try{
          res = chatroom_msgs_cached.data
          if(refresh)
          this.$api.network.ChatmsgList(user).then((d)=>{
            if(d && d.ret){
              // let xstr = JSON.stringify(d)
              // if(xstr.length!=chatroom_msgs_cached_str.length && chatroom_msgs_cached_str!=xstr)
              {
                if(d.list) d.list = d.list.reverse()
                imDb.addData({key:'chatroom_msgs_cached-'+roomid,data:d})
                //localStorage.setItem('chatroom_msgs_cached-'+roomid,xstr)
                This.news(false)
                //setTimeout(()=>This.news(false),300)
              }
            }else{
              // This.$toast.fail('更新消息列表失败')
              console.log('chat.vue:更新消息列表失败')
              This.showOrBaned(d)
            }
          })
        }catch(ex){
          // console.log('[Error]parse chatroom_msgs_cached_str error')
          //localStorage.removeItem('chatroom_msgs_cached-'+roomid)
          imDb.deleteDataByKey('chatroom_msgs_cached-'+roomid)
          //通过网络获取
          res = await this.$api.network.ChatmsgList(user)
          if(res && res.ret && res.list ) res.list = res.list.reverse()
          fromNetFlag = true
        }
      }
      else{
        res = await this.$api.network.ChatmsgList(user),fromNetFlag=true
        if(res && res.ret && res.list ) res.list = res.list.reverse()
      } 

      console.log('chatlist-recentmsgs:',res)
      if(!res || !res.ret )
      {
        console.log('【Error】无法获取群消息列表')
        //{"ret":false,"msg":"visit pm judge: your vip-level less than groupchat-vip-level","user_vip_level":0,"is_vip":false,"is_vip_timeout":false,"chat_vip_level":1
        //return ;
      }
      // console.log(res.list)
      // if(res.ret)
      // this.isLoading = true;
      {this.listtime=true}
      this.showOrBaned(res)
      
      if(!res || !res.ret || !res.list.length) return ;

      console.log('[room]----fromNetFlag:'+fromNetFlag)//+' cached-str-length:'+(''+chatroom_msgs_cached_str).length)
      console.log('chatroom_msgs_cached:',chatroom_msgs_cached)

      if(fromNetFlag){
        imDb.addData({key:'chatroom_msgs_cached-'+roomid,data:res})
        //localStorage.setItem('chatroom_msgs_cached-'+roomid,JSON.stringify(res))
      }
      
      if(res && res.list && res.list.length)
        this.updateReadedHeight(res.list[res.list.length-1].height)
      else return 

      let msgList = res.list//.reverse()
      this.msgList = msgList
      // for(let i=res.list.length-1;i>=0;i--) 
      console.log("msgList",msgList);
      // console.log(this.chatRexord)
      // console.table(res.list.reverse())
      // console.log(this.chatRexord)
      // this.typex(); 
      let begin = this.msgList.length - this.page_len >=0 ? this.msgList.length - this.page_len:0
      let end = this.msgList.length

      this.is_first_page = true;
      this.expandUserData(this.msgList.slice(this.p_begin =  begin,this.p_end =  end));
      this.isLoading = false
   },

    // textx(){//点击关闭输入框
    //   this.sendOut = false
    //   this.More = true
    //   this.add = false
    // },
    gotouchstart(item){
      // alert()
      // let that = this;
      // clearTimeout(timeOutEvent);//清除定时器
      // timeOutEvent = 0;
      // timeOutEvent = setTimeout(() =>{
      //执行长按要执行的内容，
        console.log("聊天室信息列表:");
        console.log(this.chatRexord);
        console.log("您点击的该消息为：");
        console.log(item)
        if(item.msg_obj == null || item.msg_obj == undefined || item.msg_obj == ''){
          this.withdraw = item.msg_info.msgid
        }else{
          this.withdraw = item.msg_obj.msgid
        }
        // this.withdraw = item
        this.Longpress = true
        // console.log(this.withdraw)
      // },600);//这里设置定时
      },
      //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    // gotouchend(){
    //   clearTimeout(timeOutEvent);
    //   if(timeOutEvent!=0){
    //     // this.Longpress = true
    //   //这里写要执行的内容（尤如onclick事件）
    //   }
    //   },
    //   //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    // gotouchmove(){
    //   clearTimeout(timeOutEvent);//清除定时器
    //   this.Longpress = false
    //   timeOutEvent = 0;
    //   },
    cancels(){//取消测回消息
      this.Longpress = false
    },
    async confirms(){//确定撤回消息
      let random = Math.random()
      let user = {
        user_id:localStorage.user_id,
        s_id:localStorage.s_id,
        chatid:this.$route.params.token_y,
        msgid:this.withdraw,
        random:random
      }
      let ress =  await this.$api.network.ChatMsgRecall(user)
      // console.log(ress)
      if(ress.ret)
      {
        this.$toast.success('撤回成功')
        this.Longpress = false
        this.news()
      }else if(ress.msg == "no permision to recall msg!")
      {
        this.$toast.fail('撤回失败，只能撤回自己发送的消息')
        this.Longpress = false
      }else
      {
        this.$toast.fail('撤回失败' + ress.msg)
        this.Longpress = false
      }

      
    },

    oFFimg(){
      this.show1 = false
    },
    back() {//返回首页
      if(this.audio!=null){//销毁已经播放的音频
            this.audio.pause();
            this.audio = null;
          }
      clearInterval(this.timer)//销毁定时器
      this.$router.push('/');
      document.body.style.backgroundColor = '#f5f5f5'
    },
    cancel(){//取消前往充值
      this.show = false
      this.showss = false
    },
    Determine(){//确认前往充值
      this.$router.push('/cancel')
    },
    stopWSToken()
    {
      let chatid = this.chatid
      let token = this.ws_token
      rpc_client.setWs(token,function(data){
        console.log('[unbond]chat-ws-recved:',data,'chatid:',chatid,"token:",token)
      })
    },
    async initWebSocket(){
      let This = this
      if(rpc_client.qWS(this.$route.params.token_y))
      {
        console.log('alread do webscoket-link:'+rpc_client.qWS(this.$route.params.token_y))

        let token = rpc_client.qWS(this.$route.params.token_y)
        this.ws_token = token
        rpc_client.setWs(token,function(data){
          console.log('chat-ws-recved:',data)
          This.websocketonmessage(data)
          })
        // rpc_client.setPeerRefreshCallback(function(){
        //     This.initWebSocket();
        // })
        This.$api.network.setRetInitChatWebsocketFunc(function()
        {
          console.log('reInitChatWebsocket now')
          This.initWebSocket();
        })
        // websock  = true
        websock = {ws_token:token}

          return ;
      }

      // if(websock) return ///////不依赖这个作为判断标准  
      // console.log('into initWebSocket function')
      
      if(!const_chatid)  return ;
      
      // if(typeof(WebSocket) === "undefined"){
      //   console.error("您的浏览器不支持WebSocket")
      //   return false
      // }

      try{
          let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,chatid:this.$route.params.token_y};
          let tokenRet = await this.$api.network.getChatRoomWebSocketListenToken(  params);//token

          if(tokenRet && tokenRet.ret && tokenRet.listen_token)
          {
            ///groupchat/ws/svr?token=
             // let wsuri = this.$api.network.createWSChatListenUrl(tokenRet.listen_token)
             rpc_client.setWs(tokenRet.listen_token,function(data){
              console.log('chat-ws-recved--now:',data)
              This.websocketonmessage(data)
             })
            //  rpc_client.setPeerRefreshCallback(function(){
            //     This.initWebSocket();
            // })
            This.$api.network.setRetInitChatWebsocketFunc(function()
            {
              console.log('reInitChatWebsocket now')
              This.initWebSocket();
            })
            rpc_client.setWs(this.$route.params.token_y,tokenRet.listen_token)//一个聊天室只建立一次，除非peer断开。
             rpc_client.send('/groupchat/ws/svr',{token:tokenRet.listen_token})

             websock = {ws_token:tokenRet.listen_token}

            //  rpc_client.setWs(tokenRet.listen_token,websocketonmessage)
            // rpc_client.setPeerRefreshCallback(function(){
            //     initWebSocket();
            // })
            // rpc_client.send('/userchatlist/ws/svr',{token:tokenRet.listen_token})

              // websock = {}//new WebSocket(wsuri)
              // websock.onopen = this.websocketonopen
              // websock.onmessage = this.websocketonmessage
              // websock.onerror = this.websocketonerror
              // websock.onclose = this.websocketclose
          }else{
              console.log('initWebSocket-get-ws-token failed:'+JSON.stringify(tokenRet))
              if(tokenRet.chat_vip_level && tokenRet.msg && tokenRet.msg.indexOf('less'))
              {
                console.log('visit pm failed')
                websock  = null;
                exitFlag = true;
                return ;
              }
              websock  = null;
              if(!exitFlag) setTimeout(this.initWebSocket,restart_time);
          }   
      }catch(ex){
          console.log('start websocket-exception:'+ex)
          /*
          let array = JSON.parse(localStorage.getItem('error'))
          array.push(ex.message)
          localStorage.setItem('error',JSON.stringify(array))
          */
          if(!exitFlag) setTimeout(this.initWebSocket,restart_time);
      }

    },
    // callKeepAlive()
    // {
    //     this.killKeepAlive();
    //     keepalive_id = setInterval(function(){
    //         if(websock) websock.send('keepalive')
    //     },9000)

    //     if(websock) websock.send('keepalive')
    // },
    // killKeepAlive()
    // {
    //     if(keepalive_id) clearInterval(keepalive_id)
    //     keepalive_id = null;
    // },
    //连接成功
    // async websocketonopen(){ 
    //   console.log('WebSocket连接成功')
    //   this.imgStatus = true;
    //   this.callKeepAlive();
    // },
    //接收后端返回的数据
    // isEncrypted(msg)
    // {
    //   if(msg && msg.indexOf('aes256|')==0 
    //         && msg.indexOf('|') != msg.lastIndexOf('|'))
    //   {
    //     let lastStr = msg.substring('aes256|'.length,msg.length)
    //     let aes256Hash = lastStr.substring(0,lastStr.indexOf('|'))
    //     return aes256Hash && aes256Hash.length>10 
    //   }else{
    //     return false;
    //   }
    // },
    // async getDecryptWeb3Key(msg)
    // {
    //   // console.log('getDecryptWeb3Key-msg:',msg)
    //   if(msg && msg.indexOf('aes256|')==0 
    //         && msg.indexOf('|') != msg.lastIndexOf('|'))
    //   {
    //     let lastStr = msg.substring('aes256|'.length,msg.length)
    //     let aes256Hash = lastStr.substring(0,lastStr.indexOf('|'))
    //     if(aes256Hash && aes256Hash.length>10 )
    //     {
    //       if(this.chatWeb3Key && aes256Hash == await sign_util.hashVal(this.chatWeb3Key) )
    //       {
    //         return this.chatWeb3Key 
    //       }else{
    //         let web3key = await iWalletDb.getDataByKey('web3key_hash:'+aes256Hash)
    //         if(web3key)
    //         {
    //           web3key = web3key.data
    //           return web3key
    //         }else{//从网络中同步和获取
    //           console.log('【notice】aes-web3key do not in iWalletDb, need load from network ')
    //           this.$toast('【notice】aes-web3key do not in iWalletDb, need load from network ')
    //           return null
    //         }
    //       }
    //     }
    //   }
    //   return null
    // },
    // async decryptMsgInfo(msg)
    // {
    //   // console.log('decryptMsgInfo-msg:',msg)
    //   if(msg && msg.indexOf('aes256|')==0 
    //         && msg.indexOf('|') != msg.lastIndexOf('|'))
    //   {
    //     let lastStr = msg.substring('aes256|'.length,msg.length)
    //     let aes256Hash = lastStr.substring(0,lastStr.indexOf('|'))
    //     let xmsg = lastStr.substring(lastStr.indexOf('|')+1,lastStr.length)
    //     if(aes256Hash && aes256Hash.length>10 )
    //     {
    //       if(this.chatWeb3Key && aes256Hash == await sign_util.hashVal(this.chatWeb3Key) )
    //       {
    //         let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(this.chatWeb3Key)
    //         let text = await sign_util.decryptMessage(await sign_util.importSecretKey(aeskey),iv,xmsg)
    //         msg = text
    //         return msg
    //       }else{
    //         let web3key = await iWalletDb.getDataByKey('web3key_hash:'+aes256Hash)
    //         if(web3key)
    //         {
    //           web3key = web3key.data
    //           //this.chatWeb3Key = web3key
    //           let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(web3key)
    //           let text = await sign_util.decryptMessage(await sign_util.importSecretKey(aeskey),iv,xmsg)
    //           msg = text
    //           return msg
    //         }else{//从网络中同步和获取
    //           console.log('【notice】aes-web3key do not in iWalletDb, need load from network ')
    //           this.$toast('【notice】aes-web3key do not in iWalletDb, need load from network ')
    //           return msg
    //         }
    //       }
    //     }
    //   }
    //   return msg
    // },
    async websocketonmessage(e,isRet=false,mustShow = false){ 
      let This = this
      if(!isRet) console.log('chat-websocketonmessage:',e)
      else console.log('from-sendFunction-chat-websocketonmessage:',e)
      let data =e// e.data;
      if ((''+data).indexOf('mem_alive_cnt') !== -1) {
        this.cnt = (''+data).split(':')[1]
      }
      this.imgStatus = true;
      let dataJson = data;
      if(data && !data.msg)
      try{
          dataJson = JSON.parse(data)
          // if(newMsgObjFunc) newMsgObjFunc(dataJson)
          // dataJson = 
      }catch(ex){
          console.log('dataJson parse failed:'+ex)
          return ;
      }
      console.log(dataJson)
      //{"ws":true,"ws_token":"fd44c909db4354814cd09c053a55cb0e1ba812d5589bf35caa45c41704cded97",
      //"data":{"type":"text","msg":"缺","time_i":1671535960,"time":"2022-12-20 06:32",
      //"from":"msg_z5NKz6cMDQ4FvjHi","to":"msg_chat012wjy58iwMF",
      //"body":null,"is_encrypted":false,"encrypt_method":"aes256",
      //"status":0,"user_id":"user_z5NKz6cMDQ4FvjHi","msgid":"msg_msg31QFkN7q8Z1Yi",
      //"token":"msg_chat012wjy58iwMF","height":213}}
      let obj = dataJson
      if(!obj) return 
      //let list = this.chatRexord;
      let isExists =  this.lastSendHeightMap.has(''+obj.height)//false;

      // for(let i=0;this.chatRexord && i<this.chatRexord.length;i++){
      //   //高度一致的话，就不重复了
      //   if(obj.height == this.chatRexord[i].height) {
      //     isExists = true;
      //     break;
      //   }
      // }
      if(!isExists || mustShow)
      {
        this.lastSendHeightMap.set(''+obj.height,'1')
        if(true || obj.type=='text')
        {
          this.add = false
          let UserInfo = null;
          if(this.ibapp_chat) {
            UserInfo = obj.user_id == 'ib' ? {user_name:this.ibchatStr,logo:this.iblogo} : 
              {user_name:this.mechatStr,logo:this.quserlogo}
          }else {
            UserInfo = await This.$api.network.s_queryUserInfo(obj.user_id)//JSON.parse(localStorage.getItem('userInfo'))//'userinfo_cache_'+obj.user_id))
          }
          if(!UserInfo){
            UserInfo = obj.user_id == 'ib' ? {user_name:this.ibchatStr,logo:this.iblogo} : 
              {user_name:this.mechatStr,logo:this.quserlogo}
          }
          UserInfo = UserInfo ? UserInfo :{logo:null}
          obj.url = UserInfo.logo//await imageDb.getDataByKey(UserInfo.logo)
          if(typeof g_setLogoMap == 'function')
          g_setLogoMap(UserInfo.logo)
          // obj.url = obj.url ? obj.url.data :'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
          //obj.texts = 0   if(list[i].msg_info.type == 'text'){//如果状态为img会话框隐藏
          switch(obj.type){
            case 'text':obj.texts = 0;break
            case 'img':obj.texts = 1;break
            case 'file':obj.texts = 2 ;break
            case 'chat_mod':obj.texts = 3;break
            case 'msg_recall':obj.texts = 3 ;break
            case 'record':obj.texts = 4 ;break
            case 'video':obj.texts = 5;break
            case 'name_card':obj.texts =6;break
            default: obj.texts = 0
          }
          obj.user_name = UserInfo.user_name;
          obj.user_id = obj.user_id
          obj.msg_info = Object.assign({},obj)

          obj.msg_info.msg =await g_dchatManager.decryptMsgInfo(obj.msg_info.msg,this.chatWeb3Key)
          if(obj.texts == 0 && !obj.msg_info.msg_obj && obj.msg_info.msg.trim().substring(0,1)=='{') //obj.msg_info.msg.length>120 && obj.msg_info.msg.indexOf('notice_msg_type')>0) //
          {
            try{
              obj.msg_info.msg_obj = JSON.parse(obj.msg_info.msg)
            }catch(ex){
              console.log('JSON.parse(msg_info.msg)-exception:'+ex)
            }
            //对xmsg消息进行处理 2023-10-10新增
            if( obj.msg_info.msg_obj ){
              if(obj.msg_info.msg_obj.xmsg && obj.msg_info.msg_obj.xtype)
              {
                obj.msg_info.xmsg = obj.msg_info.msg_obj
                delete obj.msg_info.msg_obj
              }
            }
          }

          if(obj.msg_info.type == 'file'){
            obj.msg_info.body.filename =await g_dchatManager.decryptMsgInfo(obj.msg_info.body.filename,this.chatWeb3Key)
            if(obj.msg_info.body.filename && obj.msg_info.body.filename.indexOf('.')<0)
            {
              obj.msg_info.body.filename = obj.msg_info.body.filename+'.default'
            }
          }

          if(obj.msg_info.type == 'img'){
            let body = Object.assign({},obj.msg_info.body)
            body.is_encrypted = g_dchatManager.isEncrypted(body.img_name,this.chatWeb3Key)
            if(body.is_encrypted)
            {
              body.aes_web3key = await g_dchatManager.getDecryptWeb3Key(body.img_name,this.chatWeb3Key)
              body.img_name = await g_dchatManager.decryptMsgInfo(body.img_name,this.chatWeb3Key)
            }
            g_setLazyImgInfo(body.img_id,body)
          //   let tmp = obj
          // //list[i].msg_info.url =`${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+`&s_id=`+localStorage.s_id+`&filename=`+list[i].msg_info.body.img_id+`&img_kind=`+`open`+`&img_p=`+`min3000`
          //   let img_id = obj.msg_info.body.img_id
          //   let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'}
          //   let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
          //   // .then((item)=>{
          //   tmp.msg_info.url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
          //   if(item) tmp.msg_info.url  = item.data
          //   else{
          //     This.$api.network.getImg(params).then((data)=>{
          //       tmp.msg_info.url  ='data:image/png;base64,'+data.data
          //       // This.chatRexord =  This.chatRexord
          //       // This.chatRexord =  Object.assign({}, This.chatRexord)
          //       This.heightx = true
          //       This.chatRexord = This.chatRexord// Array.from(This.chatRexord)
          //       // setTimeout(()=>This.sendOuts(),200)
          //       imageDb.addData({img_id,data:tmp.msg_info.url })
          //     //setTimeout(()=>This.chatRexord =  This.chatRexord,100)
          //     }).catch((ex)=>{
          //       console.log('load img error',ex)
          //     })
          //     //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
          //   }
            
          }
          // obj.msg_ = Object.assign({},obj)
          console.log('typeOf this.chatRexord:'+(typeof this.chatRexord))
          this.is_first_page = true
          this.heightx = true
          this.chatRexord.push(obj)


          imDb.addData({key:'chatroom_msgs_cached-'+obj.token,data:{ret:true,list:this.chatRexord}})
          // let cached = await imDb.getDataByKey('chatroom_msgs_cached-'+obj.token)
          // if(cached){
          //   try{
          //     let xjson = cached.data //JSON.parse(cachedStr)
          //     if(xjson.list){
          //       xjson.list = this.chatRexord.reverse()
          //       //let xjsonStr= JSON.stringify(xjson)
          //       console.log('update-room-msgs-list-cached:',xjsonStr)
          //       //localStorage.setItem('chatroom_msgs_cached-'+obj.token,xjsonStr)
          //       imDb.addData({key:'chatroom_msgs_cached-'+obj.token,data:xjson})
          //       console.log('save chatroom-msgs-cached success on websocket-onmessag')
          //     }
          //   }catch(Ex){
          //     console.log('save chatroom-msgs-cached failed on websocket-onmessage',Ex)
          //   }
          // }
          // this.sendOutsBlur()
          this.updateReadedHeight(obj.height)
          // this.expandUserData()
        }
        else{
        //This.chatRexord.push(obj)
          this.updateReadedHeight(dataJson.height)
          this.news();
          // this.expandUserData();
          return
        }
      }
      // }
        
    
      // let tmp_chatRexord = this.chatRexord
      // setTimeout(function(){
      //     tmp_chatRexord[tmp_chatRexord.length-1] = obj;
      // },10)

      //console.log('chatRexord:'+JSON.stringify(this.chatRexord))
      //this.chatRexord = list;

     

      // if(newMsgObjFunc) newMsgObjFunc(dataJson)

      // 在这里使用后端返回的数据，对数据进行处理渲染
    },
    //连接建立失败重连
    // async websocketonerror(e){
    //   console.log(`连接失败的信息：`, e)
    //   //this.initWebSocket() // 连接失败后尝试重新连接
    //   this.imgStatus = false
    //   websock  = null;
    //   this.killKeepAlive();
    //   if(!exitFlag) setTimeout(this.initWebSocket,restart_time);
    // },
    // //关闭连接
    // async websocketclose(e){ 
    //   console.log('断开连接',e)
    //   websock  = null;
    //   this.imgStatus = false
    //   setTimeout(this.initWebSocket,restart_time);
    //   this.killKeepAlive();
    // },
    updateReadedHeight(height)
    {
      let param = {user_id:localStorage.user_id,chatid:this.$route.params.token_y,readed_height:height}
      if(websock){
          //websock.send(JSON.stringify(param));
          rpc_client.ws_send(websock.ws_token,JSON.stringify(param))
      }
      localStorage.setItem('readed_height_'+localStorage.user_id+'_'+this.$route.params.token_y,height) 
    },
    chat(user_id){//点击聊天头像跳转个人信息页面
      this.$router.push(`/index/GroupInformation/GroupOwner/${user_id}`)
    },
    adds() {
      if(this.add){
        this.add = false
      }else{
        this.add = true
      }
    },
    // change(user_keepalive){//判断是否掉线
    //   if(user_keepalive==0)
    //   {
    //     this.img1 = imgx;
    //   }else{
    //     this.img1 = imgy;
    //   }
    // },
   pageset(token) {//跳转群基本信息页面
      if(this.msg == 'chatroom is alread baned')
      {
        Dialog.alert({
          title: '该群已被封禁',
          message: '如有疑问，请联系客服',
        }).then(() => {
          // on close
        });
      }else
      {
        this.$router.push(`/index/new_file/${this.$route.params.token_y}`);
      }
      
    },
    async SendPictures(data){ //发送图片
      let random = Math.random();
      // let img_kind = data.file;
      // console.log(img_kind);
      // let formData = new FormData();
      // formData.append("user_id",localStorage.user_id);
      // formData.append("s_id", localStorage.s_id);
      // formData.append("random", random);
      // formData.append("img_kind", "open");
      // formData.append("file", img_kind);
      // let config = {
      //   headers: {
      //     enctype: "multipart/form-data"
      //   }
      // };
      //  console.log(this.$baseUrl)
      // console.log('before-data.file',data.file)
      // data.file = await new Promise((res)=>{
      //   let options = {"strict":true,"checkOrientation":true,"maxWidth":1000,"minWidth":0,"minHeight":0,"resize":"none","quality":0.5,"mimeType":"image/webp","convertTypes":"image/png","convertSize":5000000}
      //   options.success = function(result){
      //     res(result)
      //   }
      //   options.error = function(err){
      //     console.log(err.message);
      //     res(null)
      //   }
      //   new Compressor(data.file, options);
      // })
      // console.log('end-data.file',data.file)
      if(!this.chatWeb3Key)
      {
        this.$toast.fail('【安全风险】聊天密钥为空，禁止发送任何消息！')
        return ;
      }
      let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:data.file.name,
                                mimetype:data.file.type,filename:data.file.name,path:'file-path',
                                size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
                                img_kind:'open',random,
                                data:data.file,img_q:this.img_q}
      if(this.chatWeb3Key)
      {
        console.time()
        let web3KeyHash = await sign_util.hashVal(this.chatWeb3Key)
        let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(this.chatWeb3Key)
        console.log('import-key:',await sign_util.importSecretKey(aeskey))
        let en1 = await sign_util.encryptMessage(await sign_util.importSecretKey(aeskey),iv,fileInfo.filename)
        fileInfo.filename = 'aes256|'+web3KeyHash+'|'+en1
        fileInfo.originalname = fileInfo.filename
        console.log('fileInfo.filename:',fileInfo.filename)
        console.timeEnd()
      }
      let res = await new Promise((resolve)=>{
        rpc_client.sendImage(fileInfo,function(udata){
            console.log('sendFile-callback-data:'+JSON.stringify(udata))
            resolve(udata)
        })
      })
      console.log('upload-file-ret:'+JSON.stringify(res))
      if(!res.data.ret){
        this.$toast.fail('上传失败' +res.data.msg,3000)
      }
      // let res = await this.$axios.post(`${this.$baseUrl}/image/upload`, formData, config)
      // console.log(res)
      // if(!res.data.ret)
      // {
      //   this.$toast.fail('上传失败' + res.data.msg)
      //   return;
      // }
      
      let user = {
        user_id:localStorage.user_id,
        s_id:localStorage.s_id,
        chatid:this.$route.params.token_y,
        img_name:res.data.originalname,
        img_id:res.data.filename,
        img_fmt:res.data.fmt,
        url:res.data.mimetype,
        random:random,
        msg:res.data.msg
      }
      let ress =  await this.$api.network.ChatMsgSendImg(user)
      if(ress.ret){
        this.$toast.success("发送成功")
        this.add = false


        if(ress.msg_info)
        {
          ress.msg_info.token = ress.msg_info.chatid
          ress.msg_info.height = ress.height
          this.websocketonmessage(ress.msg_info,true)
        } 
        

        // let res = ress
        // let UserInfo = JSON.parse(localStorage.getItem('userInfo'))//'userinfo_cache_'+data.user_id))
        // res.url =await imageDb.getDataByKey(UserInfo.logo)
        // res.url = res.url ? res.url.data :'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
        // res.texts = 1
        // res.user_name = UserInfo.user_name;
        // res.user_id = data.user_id
        // console.log('typeOf this.chatRexord:'+(typeof this.chatRexord))
        // // this.chatRexord.push(res)
        // // this.sendOutsBlur()
        // let isExists = this.lastSendHeightMap.has(''+res.height)
        // if(!isExists)
        // {
        //   this.lastSendHeightMap.set(''+res.height,'1')
        //   this.chatRexord.push(res)
        //   this.updateReadedHeight(res.height)
        // }
        // this.chatRexord.push(ress)
        // this.updateReadedHeight(ress.height)
        // this.news()
        // this.expandUserData();
        
      }else{
        this.$toast.fail("发送失败" + ress.msg)
      }
      // console.log(ress)
    },
    ////
    async handFile(data){ //发送文件
      let random = Math.random();
      let file_kind = data.file;
      console.log('upload-file-now',file_kind)
      // let formData = new FormData();
      // formData.append("user_id",localStorage.user_id);
      // formData.append("s_id", localStorage.s_id);
      // formData.append("file", file_kind);
      // formData.append("file_kind", "file");
      // formData.append("random", random);
      // let config = {
      //   headers: {
      //     enctype: "multipart/form-data"
      //   }
      // };
      if(!this.chatWeb3Key)
      {
        this.$toast.fail('【安全风险】聊天密钥为空，禁止发送任何消息！')
        return ;
      }
      let fileInfo = {fieldname:"file",encoding:'fromfile_binary',originalname:data.file.name,
                                mimetype:data.file.type,filename:data.file.name,path:'file-path',
                                size:data.file.size,user_id:localStorage.user_id,s_id:localStorage.s_id,
                                file_kind:'file',random,
                                data:data.file}
      if(this.chatWeb3Key)
      {
        console.time()
        console.log('encrypt file:')
        let web3KeyHash = await sign_util.hashVal(this.chatWeb3Key)
        let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(this.chatWeb3Key)
        console.log('import-key:',await sign_util.importSecretKey(aeskey))
        let en1 = await sign_util.encryptMessage(await sign_util.importSecretKey(aeskey),iv,fileInfo.filename)
        fileInfo.filename = 'aes256|'+web3KeyHash+'|'+en1
        fileInfo.originalname = fileInfo.filename
        console.log('fileInfo.filename:',fileInfo.filename)

        console.log('old-file.size:',fileInfo.size)

        var binaryData = await new Promise((res)=>{
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            res(e.target.result);
                        }
                        reader.readAsArrayBuffer(fileInfo.data);
                    })
        fileInfo.data = await sign_util.encryptMessage(await sign_util.importSecretKey(aeskey),iv,binaryData,false)
        fileInfo.data = new Blob([fileInfo.data ], { type: 'application/octet-stream' });
        fileInfo.size = fileInfo.data.size
        console.log('new-file.size:',fileInfo.size)
        
        console.timeEnd()
      }
      let res = await new Promise((resolve)=>{
        rpc_client.sendFile(fileInfo,function(udata){
            console.log('sendFile-callback-data:'+JSON.stringify(udata))
            resolve(udata)
        })
      })
      //let res = await this.$axios.post(`${this.$baseUrl}/file/upload`, formData, config)
      if(!res.data.ret){
        this.$toast.fail('上传失败' +res.data.msg,3000)
      }
      console.log(res)
      let user = {
        user_id:localStorage.user_id,
        s_id:localStorage.s_id,
        chatid:this.$route.params.token_y,
        file_id:res.data.filename,
        random:random,
        msg:res.data.msg,
        title:res.data.encoding,
        fmt:res.data.file_kind,
        filename:res.data.originalname

      }
      let ress =  await this.$api.network.ChatMsgSendFile(user)
      // console.log(ress)
      if(ress.ret){
        this.$toast.success("发送成功")
        this.add = false
        this.zhanwei2 = false
        this.zhanwei1 = true
        // this.chatRexord.push(ress)

        if(ress.msg_info)
        {
          ress.msg_info.token = ress.msg_info.chatid
          ress.msg_info.height = ress.height
          this.websocketonmessage(ress.msg_info,true)
        } 
        // this.expandUserData();
        // this.updateReadedHeight(ress.height)
        // this.news()
      }else{
        this.$toast.fail("发送失败")
      }

    },
    ///
    async download(item){//下载文件
      // this.iframeUrl = item.fileUrl
      //   console.log(item)
      // this.urlname = item.msg_info.body.filename
      ///file/download?user_id=`+localStorage.user_id+`&s_id=`+localStorage.s_id+`&filename=`+
      //list[i].msg_info.body.file_id+'&file_kind='+list[i].msg_info.body.fmt
      let This = this
      let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,
        filename:item.msg_info.body.file_id,file_kind:item.msg_info.body.fmt}
      
      let cachedFileItem = await ifileDb.getDataByKey(params.filename)
      if(!cachedFileItem){
        rpc_client.download(params,async function(data){
          console.log('rpc_client.download-file-data:',data.data,data.data.buffer)
          if(data && data.data){
            console.log('download----data-len:'+data.data.length)
            let aesWeb3key = await g_dchatManager.getDecryptWeb3Key(data.fileInfo.filename,This.chatWeb3Key)
            let filename =await g_dchatManager.decryptMsgInfo(data.fileInfo.filename,This.chatWeb3Key)
            if(aesWeb3key && data.data)
            {
              console.log('into-file-aes-decrypt:')
              let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(aesWeb3key)
              data.data = await sign_util.decryptMessage(await sign_util.importSecretKey(aeskey),iv,data.data.buffer,false)
              console.log('download-aes-decrypted-len-new:'+data.data?data.data.length:0)
            }
            ifileDb.addData({key:params.filename,data:{filename,filedata:data.data,fileInfo:data.fileInfo}})//添加到缓存
            // data.fileInfo.filename = filename
            // ifileDb.addData({key:params.filename+'-fileInfo',data:data.fileInfo})
            //浏览器直接打开（pdf文件、图片等）
            // const e = new Blob([data.data], {
            //     type:data.fileInfo.mimetype//'application/'+cachedFileItem.data.fileInfo.fmt
            // })
            // // 将 Blob 对象转为 url
            // const link = window.URL.createObjectURL(e)
            // window.open(link,filename)

            rpc_client.downloadFileByBinary(filename,data.data)
          }else{
            This.$toast.fail('下载失败')
          }
        })
      }else{
        console.log('download fast by ifileDb:',cachedFileItem)
        // //浏览器直接打开（pdf文件、图片等）
        // const e = new Blob([cachedFileItem.data.filedata], {
        //     type:cachedFileItem.data.fileInfo.mimetype//'application/'+cachedFileItem.data.fileInfo.fmt
        // })
        // // 将 Blob 对象转为 url
        // const link = window.URL.createObjectURL(e)
        // window.open(link,cachedFileItem.data.filename)

        if(cachedFileItem.data.fileInfo.mimetype.indexOf('pdf')>0)
        {
          localStorage.setItem('pdf-filename',params.filename)
          This.$router.push('/pdf')
        }
        else if(cachedFileItem.data.fileInfo.mimetype.indexOf('sheet')>0 || cachedFileItem.data.fileInfo.mimetype.indexOf('excel')>0 )
        {
          localStorage.setItem('excel-filename',params.filename)
          This.$router.push('/excel')
        }

        else if(cachedFileItem.data.fileInfo.mimetype.indexOf('msword')>0 || cachedFileItem.data.fileInfo.mimetype.indexOf('word')>0 )
        {
          localStorage.setItem('docx-filename',params.filename)
          This.$router.push('/docx')
        }

        else if(cachedFileItem.data.fileInfo.mimetype.indexOf('presentation')>0)
        {
          localStorage.setItem('pptx-filename',params.filename)
          This.$router.push('/pptx')
        }

        else if(cachedFileItem.data.fileInfo.mimetype.indexOf('image')>=0 )
        {
          localStorage.setItem('img-filename',params.filename)
          This.$router.push('/image')
        }
        else if(cachedFileItem.data.filename.indexOf('.md')>0 )
        {
          localStorage.setItem('md-filename',params.filename)
          This.$router.push('/md')
        }
        else if(cachedFileItem.data.fileInfo.mimetype.indexOf('text')==0 )
        /*
        cachedFileItem.data.filename.indexOf('.json')>0||cachedFileItem.data.filename.indexOf('.txt')>0||
        cachedFileItem.data.filename.indexOf('.html')>0||cachedFileItem.data.filename.indexOf('.js')>0||
        cachedFileItem.data.filename.indexOf('.htm')>0 ||cachedFileItem.data.filename.indexOf('.java')>0*/
        {
          localStorage.setItem('text-filename',params.filename)
          This.$router.push('/text')
        }
        else if(cachedFileItem.data.fileInfo.mimetype.indexOf('video')>=0  
          || cachedFileItem.data.fileInfo.mimetype.indexOf('audio')>=0)
        {
          localStorage.setItem('video-filename',params.filename)
          This.$router.push('/video')
        }
        //再次判断是否是文本内容
        else if(cachedFileItem.data.filedata.byteLength<=1024*1024*7)
        {
          let utf8decoder = new TextDecoder()
          let text =  utf8decoder.decode(cachedFileItem.data.filedata)
          let encoder = new TextEncoder()
          let uint8Array = encoder.encode(text)
          console.log('text-coder-encoder:',text.length,uint8Array,cachedFileItem.data.filedata)
          //经检测为文本
          if(uint8Array.length == cachedFileItem.data.filedata.byteLength)
          {
            localStorage.setItem('text-filename',params.filename)
            This.$router.push('/text')
          }else{
            rpc_client.downloadFileByBinary(cachedFileItem.data.filename,cachedFileItem.data.filedata)
          }
        }else{
          rpc_client.downloadFileByBinary(cachedFileItem.data.filename,cachedFileItem.data.filedata)
        }
        // let blob = new Blob([cachedFileItem.data.filedata], { type: cachedFileItem.data.fileInfo.minetype });
        // // this.src  = URL.createObjectURL(blob);
        // let src = URL.createObjectURL(blob);
        
        // var dtask = plus.downloader.createDownload(src, {}, function(d, status){
        //   // 下载完成
        //   if(status == 200){ 
        //     console.log("Download success: " + d.filename);
        //   } else {
        //     console.log("Download failed: " + status); 
        //   }  
        // });
        // //dtask.addEventListener("statechanged", onStateChanged, false);
        // dtask.start(); 
              

        // let a = document.createElement('a');
        // a.target='_blank'
        // a.href = link;
        // a.download = cachedFileItem.data.filename;
        // a.click();
        // let fileInfo = await ifileDb.getDataByKey(params.filename+'-fileInfo')
        // fileInfo = fileInfo ? fileInfo.data: null
        // console.log('download fast by ifileDb:fileInfo:',fileInfo)
        // rpc_client.downloadFileByBinary(fileInfo ?fileInfo.filename: params.filename,cachedFileItem.data)
      }
      return false
   },
    //
    sendOuts(){//点击输入框的时候执行
      this.sendOut = true
      this.More = false
      this.add = false
    },
    sendOutsBlur () {//失去焦点事件
        this.sendOut = false
        this.More = true
        this.add = false
    },
    inputHeight(){//监听输入框换行
      console.log('我动了')
    },

    copyTxt(item){
      this.txt = item.msg_info.msg
    },
    async sayPoplang(txt,res = null){
      let originTxt = txt
      let popFlagStr = ';'//'!pop:'
      let results = null
      let resIsEmpty = res ? false:true
      console.log('resIsEmpty:'+resIsEmpty,res)
      let ibres = {"ret":true,"msg":"success","txid":"txid_9WSWbtWMmKpRfAtq",
        "token":"msg_chat02GFpM86ouge",
        "create_time_i":1684897079,
        "create_time":"2023-05-24 10:57",
        "msg_obj":
          {"msgid":"msg_msgFe19LvGASNGWr",
          "msg":"","type":"text",
          "time_i":1684897079},
        "msg_info":{"type":"text",
          "msg":"",
          "time_i":parseInt(Date.now()/1000),"time":GetDateTimeFormat(parseInt(Date.now()/1000)),
          "from":"user","to":"ib",
          "body":null,"is_encrypted":false,"encrypt_method":"aes256",
          "status":0,"user_id":"user",
          "msgid":"msg_msgFe19LvGASNGWr"},"height":101,
          "msgid":"msg_msgFe19LvGASNGWr"}
      res = res ? res :ibres
        
      if(resIsEmpty) {
        res.msg_info.msg = originTxt
        res.msg_info.from="user"
        res.msg_info.user_id = res.msg_info.from
        this.websocketonmessage(Object.assign({}, res.msg_info),true,true)
        this.txt = ''
      }

      if(txt.startsWith(popFlagStr)){
        txt = txt.substring(popFlagStr.length,txt.length)
        console.log('txt---:'+txt)
        // console.log('poplang-$$:',this.poplang.$$)
        results = await this.poplang.runScript(this,txt,true)
        console.log('poplang-results:'+stringify(results))
        console.log('poplang-context:'+JSON.stringify(this.pctx),this.pctx)
      }
      else if(txt.startsWith('network'))
      {
        localStorage.setItem('poster_type','DTNSNetwork')
        localStorage.setItem('poster_value',txt.indexOf(':') >0 ? txt.split(':')[1]:'')
        this.$router.push('/poster/dtnsnetworkconfig')
      }
      else if(txt.startsWith('fe'))
      {
        let params = null
        if(txt.indexOf(' ')>0) params = txt.split(' ')
        else if(txt.indexOf(':')>0) params = txt.split(':')
        else if(txt.indexOf('-')>0) params = txt.split('-')
        console.log('form-engine-params:',params)
        let formTemplate =  await this.$api.network.formengineTemplate({user_id:localStorage.user_id,
            s_id:localStorage.s_id,name:params[1]})
        this.txt = ""
        results = formTemplate
        console.log('formTemplate-ret:',formTemplate)
        if(!formTemplate||!formTemplate.ret)
        {
          this.$toast('查询表单模板失败，原因：'+(formTemplate ? formTemplate.msg:'未知网络原因'))
        }
        else imDb.addData({key:'form-engine-'+params[1],data:formTemplate.template})

        localStorage.setItem('poster_type','formengine')
        localStorage.setItem('poster_value',params[1])
        this.$router.push('/poster/formengine')
      }
      else if(txt == '3s' )
      {
        localStorage.setItem('poster_type','3s')
        this.$router.push('/poster/3s')
      }
      else if(txt ==  'ibapp' || txt=='web3app')
      {
        localStorage.setItem('poster_type','ibapp')
        this.$router.push('/poster/ibapp')
      }
      else if(txt ==  'appkey')
      {
        localStorage.setItem('poster_type','appkey')
        this.$router.push('/poster/appkey')
      }
      else if(txt == 'dweb' )
      {
        this.$router.push('/dweb')
      }
      else if(txt == 'connect')
      {
        this.$router.push('/connect')
      }
      else if(txt == 'popview' || txt=='pv' )
      {
        this.$router.push('/popview')
      }
      else if(txt == 'minipaint' || txt=='mp' || txt=='de' || txt=='design' || txt=='pd' ) //用于产品设计领域
      {
        this.$router.push('/design')
      }
      else if(txt == 'news' )
      {
        localStorage.setItem('poster_type','news')
        this.$router.push('/poster/news')
      }
      else if(txt == 'minicard' || txt=='mc' || txt=='ib3')
      {
        localStorage.setItem('poster_type','minicard')
        this.$router.push('/poster/minicard')
      }
      else if(txt == 'fork')
      {
        this.$router.push('/fork')
      }
      else if(['game','3d','3x','2x','form','creator','fx','face','pose','xverse','3dtest'].indexOf(txt)>=0)
      {
        this.$router.push('/3d/'+txt)
      }
      else if(['3de'].indexOf(txt)>=0)
      {
        this.$router.push('/3de')
      }
      else if(['3dp'].indexOf(txt)>=0)
      {
        this.$router.push('/3dp')
      }
      else if(['xdoc'].indexOf(txt)>=0)
      {
        this.$router.push('/xdoc')
      }
      else if(['fabric'].indexOf(txt)>=0)
      {
        this.$router.push('/fabric')
      }
      else if(['xdraw'].indexOf(txt)>=0)
      {
        this.$router.push('/xdraw')
      }
      else if(['xcad'].indexOf(txt)>=0)
      {
        this.$router.push('/xcad')
      }
      else if(['lm','location','marker','amap','xmap','loc','pick'].indexOf(txt)>=0)//高德地图标注系统
      {
        this.$router.push('/lm')
      }
      else if(['cd','disk','clouddisk','ddisk','dx','files','fs','folder','fo'].indexOf(txt)>=0)
      {
        // this.$router.push('/folder')
        this.$router.push({name:"folder",params:{noCache:true}});
      }
      else if(txt.startsWith('start'))
      {
        let cmds = txt.split(' ')
        if(cmds[0]=='start')
        {
          localStorage.setItem('app-dev-roomid',cmds[1])
          if(typeof g_start_dtns_network=='function')
          {
            g_start_dtns_network()
            this.$toast('启动ib3.hub节点成功！')
          }
        }
      }
      else if(txt == 'install')//txt.startsWith('install'))
      {
        // let cmds = txt.split(' ')
        let roomid ='svr'  //''+cmds[1]
        let installed = localStorage.getItem('dtns-app-installed')
        if(installed) return this.$toast('已经安装过了，不能再安装！')

        let binData = await new Promise((resolve)=>{
          const a = document.createElement('input')
          a.setAttribute('type', 'file')      
          a.addEventListener('change', async function selectedFileChanged() {
              console.log('data:' + this.files)
              if (this.files.length == 0) return alert('请选择文件')
              console.log('dtns-data-files:' + JSON.stringify(this.files[0].name))

              let fileReader = new FileReader();
              fileReader.onload =async e => {
                  let result = new Uint8Array(e.target.result)
                  resolve(result)
              }
              fileReader.readAsArrayBuffer(this.files[0]);
          })
          a.click()
        })
        // if(!dtnsDataJson || !dtnsDataJson.zip_data) return this.$toast('加载的dtns-data文件数据为空！')
        // let zip_data =rpc_client.dataURLtoBinary( dtnsDataJson.zip_data )
        let zip = new JSZip();
        let fileZip = await zip.loadAsync(binData)//zip_data)
        let zipResMap = new Map()
        for (let zfile in fileZip.files) {
            let file =fileZip.files[zfile] ;
            console.log('jszip-unzip-dtns-data-file:',file)
            zipResMap.set(file.name,file) 
            // let fileData = await zipResMap.get('index.json').async('uint8array')
            if(file.name && file.name.startsWith('file_temp/'))
            {
              let dst_name = file.name.substring('file_temp/'.length,file.name.length)
              let data =await file.async('uint8array')
              ifileDb.addData({key:dst_name,data})
              console.log('add-dtns-files:',dst_name,data)
            }else if(file.name && file.name.endsWith('.db')){
              let token_name = file.name.split('.')[0]
              let save_name = token_name+'-'+Date.now()+'.db'
              let data =await file.async('uint8array')
              ifileDb.addData({key:save_name,data})
              //roomid+'_'+TOKEN_NAME+'_last_db'
              localStorage.setItem(roomid+'_'+token_name+'_last_db',save_name)
              if(token_name == 'dtns')
              {
                localStorage.setItem('dtns.network_'+token_name+'_last_db',save_name)
              }
              console.log('add-dtns-dbs:',save_name,data)
            }
        }
        localStorage.setItem('dtns-app-installed',roomid)
      }
      else if(txt=='unstall')
      {
        localStorage.removeItem('dtns-app-installed')
        return this.$toast('卸载成功！')
      }
      else if(txt.startsWith('manager'))
      {
        let cmds = txt.split(' ')
        localStorage.setItem('manager_uid-svr',cmds[1])
        // localStorage.setItem('app-dev-manager',cmds[1])//这里须index.html启动时设置INIT_CONSOLE_USER
        console.log('manager:set:',cmds[1])
        return this.$toast('设置管理员成功！')
      }
      else if(txt == 'save')
      {
        // if( window.ib3_hub_node_instance_iframe ){
        //   window.ib3_hub_node_instance_iframe.contentWindow.save()
        // }else{
        //   this.$toast('未启动任何节点！')
        // }
        this.sayPoplang(';/chat/console/db/save')//以api命令的方式执行之
      }
      else if(txt.startsWith('download'))
      {
        let cmds = txt.split(' ')
        let res = await g_axios_download_file(cmds[1])
        console.log('res-download:',res)
        if(!res) this.$toast('无法下载文件！')
        else this.$toast('下载文件成功！')
      }
      else if(txt.startsWith('ihub'))
      {
        let roomid ='svr' 
        let installed = localStorage.getItem('dtns-app-installed')
        if(installed) return this.$toast('已经安装过了，不能再安装！')
        let cmds = txt.split(' ')
        let unzipFunc =async function(res)
        {
          let zip = new JSZip();
            let fileZip = await zip.loadAsync(res)//zip_data)
            let zipResMap = new Map()
            for (let zfile in fileZip.files) {
                let file =fileZip.files[zfile] ;
                console.log('jszip-unzip-dtns-data-file:',file)
                zipResMap.set(file.name,file) 
                // let fileData = await zipResMap.get('index.json').async('uint8array')
                if(file.name && file.name.startsWith('file_temp/'))
                {
                  let dst_name = file.name.substring('file_temp/'.length,file.name.length)
                  let data =await file.async('uint8array')
                  ifileDb.addData({key:dst_name,data})
                  console.log('add-dtns-files:',dst_name,data)
                }else if(file.name && file.name.endsWith('.db')){
                  let token_name = file.name.split('.')[0]
                  let save_name = token_name+'-'+Date.now()+'.db'
                  let data =await file.async('uint8array')
                  ifileDb.addData({key:save_name,data})
                  //roomid+'_'+TOKEN_NAME+'_last_db'
                  localStorage.setItem(roomid+'_'+token_name+'_last_db',save_name)
                  if(token_name == 'dtns')
                  {
                    localStorage.setItem('dtns.network_'+token_name+'_last_db',save_name)
                  }
                  console.log('add-dtns-dbs:',save_name,data)
                }
            }
            localStorage.setItem('dtns-app-installed',roomid)
        }

        if(cmds[1] && cmds[1].startsWith('http'))
        {
          let res = await g_axios_download_file(cmds[1])
          console.log('res-download:',res)
          if(res){
            unzipFunc(res)
          }else{
            this.$toast('无法下载文件！')
          }
        }
        else if(cmds[1] && cmds[1].startsWith('dtns://'))
        {
          let This = this
          let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,file_kind:'file'}
          let file_url = cmds[1]
          let cachedFileItem = await ifileDb.getDataByKey(file_url)
          if(!cachedFileItem){
            console.log('ihub-dtns-download-files-begin',file_url)
            g_downManager.download(file_url,params,async function(data){
              console.log('ihub-dtns-download-files-ended:',data)
              if(!data ||!data.data) return This.$toast('下载文件失败-2！')
              let filedata = data.data
              unzipFunc(filedata)
            })
          }
          else{
            let result = cachedFileItem.data//{fileInfo:cachedFileItem.data.fileInfo}
            if(!result.filedata) return this.$toast('读取文件缓存失败！')
            unzipFunc(result.filedata)
          }
        }else
        {
          this.$toast('无法下载文件！URL错误：'+cmds[1])
        }
      }
      else if(['change','切换','ch','qh'].indexOf(txt)>=0)
      {
        this.$router.push('/changeSvrNode')
      }
      else if(typeof g_ib3_words!='undefined'&& g_ib3_words.has(txt.trim()))
      {
        let path = g_ib3_words.get(txt.trim())
        this.$router.push(path)
      }
      else if(!this.ibapp_chat) //如果都不是，并且不是ibapp_chat，退出sayPoplang
      {
        return 
      }
      if(results){
        // res.height =res.height+0.1
        // res.msg_info.height = res.height
        res = ibres
        res.msg_info.from="ib"
        res.msg_info.user_id = res.msg_info.from
        res.msg_info.msg = JSON.stringify(results)
        this.websocketonmessage(Object.assign({}, res.msg_info),true,true)
      }else{
        //进行智体查询
        let ibchatWeb3Name = typeof g_ibchat_roomid !='undefined' ? g_ibchat_roomid : rpc_client.roomid//'ld'
        ibchatWeb3Name = ibchatWeb3Name ? ibchatWeb3Name  : rpc_client.roomid// :'ld'
        let sessionInfo =await iSessionDb.getDataByKey('session:'+ibchatWeb3Name)
        if(!sessionInfo || !sessionInfo.data){
          res = ibres
          res.msg_info.from="ib"
          res.msg_info.user_id = res.msg_info.from
          res.msg_info.msg = '未登录或未注册ibapp:'+ibchatWeb3Name+'的账户！'
          this.websocketonmessage(Object.assign({}, res.msg_info),true,true)
          return 
        }
        sessionInfo = sessionInfo.data
        let params = {user_id:sessionInfo.user_id,s_id:sessionInfo.s_id,prompt:txt,random:Math.random()}
        let qFlag = true

        //先将结果反馈到列表
        res = ibres
        res.msg_info.from="ib"
        res.msg_info.user_id = res.msg_info.from
        res.msg_info.msg ='反应中...'
        let talkMsgInfo = Object.assign({}, res.msg_info)
        this.websocketonmessage(talkMsgInfo,true,true)

        let tmpClient = await g_dtnsManager.connect('dtns://ibapp:'+ibchatWeb3Name) 
        if(!tmpClient || !tmpClient.client || !tmpClient.pingpong_flag)
        {
          talkMsgInfo.msg = '反应失败，原因：ibchat（ibapp:'+ibchatWeb3Name+'）网络可能未连接！'
          this.chatRexord.pop()
          this.websocketonmessage(talkMsgInfo,true,true)
          console.log('unconnected:talkMsgInfo.msg:',talkMsgInfo.msg)
          return 
        }

        //每0.5秒循环查询1次结果。
        let lastStep = -1
        let This = this
        let updateTime = Date.now();
        let qresFunc = async function(){
          while(qFlag){
            let nowRes =await g_dtnsManager.run('dtns://ibapp:'+ibchatWeb3Name+'/ibchat/talk/res',params)
            console.log('ibchat-talk-params:',params,'nowRes:',nowRes)
            if(nowRes && nowRes.ret){
              talkMsgInfo.msg = nowRes.lastMsg // !nowRes.lastMsg ? '': nowRes.lastMsg.replace('\n','<br/>')
    
              if(This.chatRexord[This.chatRexord.length-1] == talkMsgInfo)
              {
                This.chatRexord.pop()
                This.websocketonmessage(talkMsgInfo,true,true)
              }
              else{
                This.websocketonmessage(talkMsgInfo,true,true)
              }
            }
            let newStep = (nowRes ? nowRes.lastStep :-2)
            if(lastStep != newStep){
              updateTime = Date.now()
            }
            if( (Date.now()-updateTime)>10000 || ( newStep && lastStep>0 && lastStep>newStep) )
            {
              console.log('[break] nowRes is end by lastStep = old-lastStep')
              break;
            }
            lastStep = newStep
            await rpc_client.sleep(1000)
          }
        }
        //开始循环请求查询状态。
        qresFunc()

        let result =await g_dtnsManager.run('dtns://ibapp:'+ibchatWeb3Name+'/ibchat/talk',params)
        console.log('talk-result:',result)
        qFlag = false
        if(result && result.ret)
          talkMsgInfo.msg = result.lastOutput //!result.lastOutput ? '': result.lastOutput.replace('\n','<br/>')
        else
          talkMsgInfo.msg = '反应出错，原因：'+(result ? result.msg:'未知网络原因')
        // this.chatRexord.push(talkMsgInfo)
        if(this.chatRexord[this.chatRexord.length-1] == talkMsgInfo)
        {
          this.chatRexord.pop()
          this.websocketonmessage(talkMsgInfo,true,true)
        }else{
          this.websocketonmessage(talkMsgInfo,true,true)
        }
      }
    },
    ///
    async text(){//发送消息
    console.log(this.txt)
      if(this.txt == '' || this.txt == null || this.txt == undefined || (this.txt.length>0 && this.txt.trim().length == 0))
      {
        return
      }
      if(!this.chatWeb3Key && !this.ibapp_chat)
      {
        this.$toast.fail('【安全风险】聊天密钥为空，禁止发送任何消息！')
        return ;
      }
      let sendMsg = this.txt.trim()
      if(sendMsg.substring(0,'chatnotice'.length) =='chatnotice')
      {
        sendMsg = JSON.stringify( {chatnotice:sendMsg.substring('chatnotice'.length,sendMsg.length)} )
      }

      if(this.ibapp_chat){
        this.sayPoplang(sendMsg)
        return 
      }

      let data = JSON.parse(localStorage.getItem('userInfo'));//
      let random = Math.random()
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
              chatid:this.$route.params.token_y,
              msg:sendMsg,//this.txt,
              random:random
            }
      if(this.chatWeb3Key)
      {
        console.time()
        let web3KeyHash = await sign_util.hashVal(this.chatWeb3Key)
        let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(this.chatWeb3Key)
        console.log('import-key:',await sign_util.importSecretKey(aeskey))
        let en1 = await sign_util.encryptMessage(await sign_util.importSecretKey(aeskey),iv,user.msg)
        user.msg = 'aes256|'+web3KeyHash+'|'+en1
        console.log('user.msg:',user.msg)
        console.timeEnd()
      }
      let res =  await this.$api.network.ChatSendText(user)
      if(res.ret){
        // this.sendOut = false
        // this.More = true
        this.add = false

        if(res.msg_info)
        {
          res.msg_info.token = res.msg_info.chatid
          res.msg_info.height = res.height
          this.websocketonmessage(Object.assign({}, res.msg_info),true)

          let txt = sendMsg;// ''+this.txt.trim('')
          let results = null;
          this.sayPoplang(txt,res)
        } 
        // let UserInfo = JSON.parse(localStorage.getItem('userInfo'))//'userinfo_cache_'+data.user_id))
        // res.url =await imageDb.getDataByKey(UserInfo.logo)
        // res.url = res.url ? res.url.data :'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
        // res.texts = 0
        // res.user_name = UserInfo.user_name;
        // res.user_id = data.user_id
        // console.log('typeOf this.chatRexord:'+(typeof this.chatRexord))
        // // this.chatRexord.push(res)
        // // this.sendOutsBlur()

        // let isExists = this.lastSendHeightMap.has(''+res.height)
        // if(!isExists)
        // {
        //   this.lastSendHeightMap.set(''+res.height,'1')
        //   this.chatRexord.push(res)
        //   this.updateReadedHeight(res.height)
        // }
        // this.news()
        // this.expandUserData();
      }else if(res.msg == "send pm judge: your vip-level less than groupchat-vip-level") 
      {
        this.user_vip_level = res.user_vip_level
        this.showss = true
        return;
      }else if (res.msg == "visit pm judge: your vip-level less than groupchat-vip-level")
      {
        this.$toast.fail('您的VIP访问权限不足')
        return;
      }else{
        this.$toast.fail('发送失败' + res.msg)
        this.sendOut = true
        this.More = false
        this.add = false
        return;
      }
      this.txt = ''
    },
    compress(
      base64,        // 源图片
      img_id,
      rate,          // 缩放比例
      callback       // 回调
      ) {
        console.log('into compress')
        // return callback(base64)
        let This = this
        //处理缩放，转格式
        var _img = new Image();
        _img.src = base64;
        _img.onload = function() {
            var _canvas = document.createElement("canvas");
            var w = this.width / rate;
            var h = this.height / rate;
            _canvas.setAttribute("width", w);
            _canvas.setAttribute("height", h);
            _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
            var base64 = _canvas.toDataURL("image/jpeg");
            try{
              localStorage.setItem('img-'+img_id,base64)
            }catch(ex){
              console.log('compress-img-failed',ex)
              This.compress(base64,img_id, rate, callback);
              return ;
            }
            console.log('compress ok:'+base64)
            callback(base64);
            // if(base64.length > dstSize){        //如果还大，继续压缩
            //     This.compress(base64,dstSize, rate, callback);
            // }else{
            //     callback(base64);
            // }
            // _canvas.toBlob(function(blob) {
            //     if(blob.size > 750*1334){        //如果还大，继续压缩
            //         This.compress(base64, rate, callback);
            //     }else{
            //         callback(base64);
            //     }
            // }, "image/jpeg");
        }
    },
  async expandUserData(msgList=null)
  {
    let This = this
    let list = msgList ? msgList :this.chatRexord
    // console.log(list)
    let i = 0;
    for(i; i<list.length; i++){
      // console.log(res.list[i].msg_info.body.img_id)
      if(list[i].msg_info.from === null){
        return
      }
      let msg =  list[i].msg_info.from.split('_')[1]
      let user = 'user_' + msg
      let s_userInfo = null;
      let tmp = list[i];
      this.$api.network.s_queryUserInfo(user,async function(infoRet){
        //s_userInfo = res;
        //tmp.url = 'http://182.61.13.123:9000/image/view?user_id='+localStorage.user_id+'&s_id='+localStorage.s_id+'&filename='+infoRet.logo+'&img_kind=open&img_p=min1000'
        
        tmp.user_name = infoRet.user_name;
        tmp.user_id = infoRet.user_id

        let img_id = infoRet.logo
        tmp.url = img_id
        if(typeof g_setLogoMap == 'function')
          g_setLogoMap(img_id)
        // let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:infoRet.logo,img_kind:'open',img_p:'min200'}
        // // tmp.url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='//require('./static/images/white.png')
        // tmp.url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAMSURBVBhXY/j69SsABcIC4AScsbQAAAAASUVORK5CYII='
        // //console.log('tmp.url:'+tmp.url)
        // let item = await imageDb.getDataByKey(infoRet.logo)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
        // if(item) tmp.url  = item.data
        // else{
        //   // let data = await This.$api.network.getImg(params)
        //   // tmp.url  ='data:image/png;base64,'+data.data
        //   // imageDb.addData({img_id:infoRet.logo,data:tmp.url })
        //   This.$api.network.getImg(params).then((data)=>{
        //     tmp.url  ='data:image/png;base64,'+data.data
        //     // This.chatRexord =  This.chatRexord
        //     // This.chatRexord = Object.assign({}, This.chatRexord)
        //     This.heightx = true
        //     This.chatRexord = This.chatRexord//Array.from(This.chatRexord)
        //     // setTimeout(()=>This.sendOuts(),200)
        //     imageDb.addData({img_id,data:tmp.url })
        //   }).catch((ex)=>{
        //     console.log('load img error',ex)
        //   })
        // }
          
          //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
        
        // let item = localStorage.getItem('chatlogo-'+infoRet.logo)
        // if(item) tmp.url = item
        // else
        // This.$api.network.getImg(params).then((data)=>{
        //   tmp.url ='data:image/png;base64,'+data.data//'+data.fileInfol.fmt+'
        //   localStorage.setItem('chatlogo-'+infoRet.logo,tmp.url)
        // }).catch((err)=>console.log('load img error',err))
        // console.log(infoRet)
      });

      let types = '';
      list[i].msg_info.msg =await g_dchatManager.decryptMsgInfo(list[i].msg_info.msg,this.chatWeb3Key)
      if(list[i].msg_info.type == 'file'){
        // console.log('list[i].msg_info-----file:',list[i])
        list[i].msg_info.body.filename =await g_dchatManager.decryptMsgInfo(list[i].msg_info.body.filename,this.chatWeb3Key)
        if(list[i].msg_info.body.filename.indexOf('.')<0)
        {
          list[i].msg_info.body.filename = list[i].msg_info.body.filename+'.default'
        }
      }
      if(list[i].msg_info.type == 'img'){
        let body = Object.assign({},list[i].msg_info.body)
        body.is_encrypted = g_dchatManager.isEncrypted(body.img_name,this.chatWeb3Key)
        if(body.is_encrypted)
        {
          body.aes_web3key =await g_dchatManager.getDecryptWeb3Key(body.img_name,this.chatWeb3Key)
          body.img_name = await g_dchatManager.decryptMsgInfo(body.img_name,this.chatWeb3Key)
        }
        g_setLazyImgInfo(body.img_id,body)
         //list[i].msg_info.url =`${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+`&s_id=`+localStorage.s_id+`&filename=`+list[i].msg_info.body.img_id+`&img_kind=`+`open`+`&img_p=`+`min3000`
        // let img_id = list[i].msg_info.body.img_id
        // let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'}
        // let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
        // // .then((item)=>{
        // if(! tmp.msg_info.url )
        // {
        //   if(item) tmp.msg_info.url  = item.data
        //   else{
        //     This.$api.network.getImg(params).then((data)=>{
        //       tmp.msg_info.url  ='data:image/png;base64,'+data.data
        //       // This.chatRexord =  This.chatRexord
        //       // This.chatRexord =  Object.assign({}, This.chatRexord)
        //       This.heightx = true
        //       This.chatRexord = This.chatRexord//Array.from(This.chatRexord)
        //       // setTimeout(()=>This.sendOuts(),200)
        //       imageDb.addData({img_id,data:tmp.msg_info.url })
        //     //setTimeout(()=>This.chatRexord =  This.chatRexord,100)
        //     }).catch((ex)=>{
        //       console.log('load img error',ex)
        //     })
        //     //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
        //   }
        // }
        // })
        
        // this.chatRexord =  This.chatRexord
        // setTimeout(()=>this.chatRexord =  This.chatRexord,100)
        // let item = localStorage.getItem('img-'+img_id)
        // if(item) list[i].msg_info.url = item
        // else
        // {
        //   let data = await This.$api.network.getImg(params)
        //   tmp.msg_info.url ='data:image/png;base64,'+data.data
        //   try{
        //   localStorage.setItem('img-'+img_id,tmp.msg_info.url)
        //   }catch(ex){
        //     console.log('save-img2localStroage error:',ex)
        //     This.compress(
        //       tmp.msg_info.url,img_id,//"data:image/jgp;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/7SPYUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAA0scAVoAAxslRxwBWgADGyVHHA",
        //         1.5,
        //         function(base64){
        //             //console.log(base64);
        //             localStorage.setItem('img-'+img_id,base64)
        //         }
        //     )

        //   }
          // this.chatRexord =  This.chatRexord
        
        //  This.$api.network.getImg(params).then((data)=>{
        //   tmp.msg_info.url ='data:image/png;base64,'+data.data//'+data.fileInfol.fmt+'
        //   localStorage.setItem('img-'+img_id,tmp.msg_info.url)
        // }).catch((err)=>console.log('load img error',err))
      }//

      if(list[i].msg_info.type == 'video'){
        let img_id =  list[i].msg_info.body.preview_img
        //list[i].videolook =`http://182.61.13.123:9000/image/view?user_id=`+localStorage.user_id+`&filename=`+list[i].msg_info.body.preview_img+`&img_kind=`+`open`+`&img_p=`+`min2000`
        let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'}
        if(!list[i].videolook){
        let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
        if(item) list[i].videolook   = item.data
        else{
          // let data = await this.$api.network.getImg(params)
          // list[i].videolook  ='data:image/png;base64,'+data.data
          // imageDb.addData({img_id,data:list[i].videolook  })
          this.$api.network.getImg(params).then((data)=>{
            list[i].videolook ='data:image/png;base64,'+data.data
            //This.chatRexord =  Object.assign({}, This.chatRexord)//This.chatRexord
            // This.heightx = true
            // This.chatRexord = This.chatRexord//Array.from(This.chatRexord)
            // setTimeout(()=>This.sendOuts(),200)
            imageDb.addData({img_id,data:list[i].videolook })
          }).catch((ex)=>{
            console.log('load img error',ex)
          })
        }
          
          //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
        }
        // let item = localStorage.getItem('img-'+img_id)
        // if(item) list[i].videolook = item
        // else
        //  This.$api.network.getImg(params).then((data)=>{
        //   tmp.videolook ='data:image/png;base64,'+data.data//'+data.fileInfol.fmt+'
        //   localStorage.setItem('img-'+img_id,tmp.videolook)
        // }).catch((err)=>console.log('load img error',err))
      }//

      if(list[i].msg_info.type == 'name_card'){
        //list[i].msg_info.body.card_url = `${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+`&s_id=`+localStorage.s_id+`&filename=`+list[i].msg_info.body.logo+`&img_kind=`+`open`+`&img_p=`+`min2000`
        let img_id = list[i].msg_info.body.logo
        if(!list[i].msg_info.body.card_url){
        let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'}
        let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
        if(item) list[i].msg_info.body.card_url  = item.data
        else{
          let data = await this.$api.network.getImg(params)
          list[i].msg_info.body.card_url  ='data:image/png;base64,'+data.data
          // This.chatRexord =  Object.assign({}, This.chatRexord)//This.chatRexord
          // This.heightx = true
          // This.chatRexord = This.chatRexord//Array.from(This.chatRexord)
          // setTimeout(()=>This.sendOuts(),200)
          imageDb.addData({img_id,data:list[i].msg_info.body.card_url })
          //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
        }}
        //let item = localStorage.getItem('img-'+img_id)
        // if(item) list[i].msg_info.body.card_url = item
        // else
        //  This.$api.network.getImg(params).then((data)=>{
        //   tmp.msg_info.body.card_url ='data:image/png;base64,'+data.data//'+data.fileInfol.fmt+'
        //   localStorage.setItem('img-'+img_id,tmp.msg_info.body.card_url)
        // }).catch((err)=>console.log('load img error',err))
      }//

      if(list[i].msg_info.type == 'text'){//如果状态为img会话框隐藏
           list[i].texts = 0
            let obj = list[i]
            //显示最近的50条即可（2023-4-21），如全部转化，费时
            if( //i>=(list.length-50) && i<list.length && 
              !obj.msg_info.msg_obj && obj.msg_info.msg.trim().substring(0,1)=='{') //obj.msg_info.msg.length>120 && obj.msg_info.msg.indexOf('notice_msg_type')>0) //
            {
              try{
                obj.msg_info.msg_obj = JSON.parse(obj.msg_info.msg)
              }catch(ex){
                console.log('JSON.parse(msg_info.msg)-exception:'+ex)
              }
              //对xmsg消息进行处理 2023-10-10新增
              if( obj.msg_info.msg_obj ){
                if(obj.msg_info.msg_obj.xmsg && obj.msg_info.msg_obj.xtype)
                {
                  obj.msg_info.xmsg = obj.msg_info.msg_obj
                  delete obj.msg_info.msg_obj
                }
              }
            }
          }else if (list[i].msg_info.type == 'img'){//图片
           list[i].texts = 1
          }else if (list[i].msg_info.type == 'file'){//文件
            list[i].texts = 2
          }else if (list[i].msg_info.type == 'chat_mod' || list[i].msg_info.type == "msg_recall"){//系统提示
            list[i].texts = 3
          }else if (list[i].msg_info.type === 'record') {//语音
            list[i].texts = 4
          }else if (list[i].msg_info.type === 'video') {//视频
            list[i].texts = 5
          }else if (list[i].msg_info.type === 'name_card'){//名片
            list[i].texts = 6
          }
      if(list[i].msg_info.body !== null){
        list[i].fileUrl = `${this.$baseUrl}/file/download?user_id=`+localStorage.user_id+`&s_id=`+localStorage.s_id+`&filename=`+list[i].msg_info.body.file_id+'&file_kind='+list[i].msg_info.body.fmt
        }
      // console.log(list)
      if(list[i].msg_info.body !== null){
        list[i].audioUrl = `${this.$baseUrl}/file/download?user_id=`+localStorage.user_id+`&s_id=`+localStorage.s_id+`&filename=`+list[i].msg_info.body.record_id+'&file_kind='+list[i].msg_info.body.fmt
        }
    }
    This.heightx = true
    This.chatRexord = list //Array.from(list)
    // this.chatRexord = list
    console.log('expand-chatRexord:',this.chatRexord.length)
    this.typex()

    // let old = list
    // setTimeout(()=>This.sendOuts(),200)
    // setTimeout(()=>This.sendOutsBlur,250)
  },
  async gotoRTCChat()
  {
    localStorage.setItem('chatid',this.chatid)
    this.$router.push('/rtcchat')
  },
 
   async changeVideo(data){//发送长视频
    // this.$router.push('/video')
    let random = Math.random();
      let file_kind = data.file;
      console.log(file_kind)
      let formData = new FormData();
      formData.append("user_id",localStorage.user_id);
      formData.append("s_id", localStorage.s_id);
      formData.append("file", file_kind);
      formData.append("file_kind", "file");
      formData.append("random", random);
      let config = {
        headers: {
          enctype: "multipart/form-data"
        }
      };
      let res = await this.$axios.post(`${this.$baseUrl}/file/upload`, formData, config)
      let videoUrl = `${this.$baseUrl}/file/download?user_id=`+localStorage.user_id+`&s_id=`+localStorage.s_id+`&filename=`+res.data.filename+`&file_kind=`+res.data.file_kind
      console.log(res)
      let user = {
        user_id:localStorage.user_id,
        s_id:localStorage.s_id,   
        chatid:this.$route.params.token_y,
        msg:'视频消息',
        time_sec:res.data.save_time,
        video_id:res.data.filename,
        fmt:res.data.file_kind,
        url:videoUrl,
        name:res.data.originalname,
        random:random,
      }
      let ress =  await this.$api.network.ChatMsgSendVideo(user)
      if(ress.ret)
      {
        this.add = false
        this.zhanwei2 = false
        this.zhanwei1 = true
        this.$toast.success('发送成功')
        console.log('upload-ress:'+JSON.stringify(ress))
        // this.chatRexord.push(ress)
        // console.log(this.chatRexord)
        // this.expandUserData();
        // this.updateReadedHeight(ress.height)
      }else
      {
        this.$toast.fail("发送失败" + ress.msg)
      }
      
   },
    async changeVideoSmall(data){//发送短视频
    // this.$router.push('/video')
    let random = Math.random();
      let file_kind = data.file;
      console.log(file_kind)
      let formData = new FormData();
      formData.append("user_id",localStorage.user_id);
      formData.append("s_id", localStorage.s_id);
      formData.append("file", file_kind);
      formData.append("file_kind", "file");
      formData.append("random", random);
      let config = {
        headers: {
          enctype: "multipart/form-data"
        }
      };
      let res = await this.$axios.post(`${this.$baseUrl}/file/upload`, formData, config)
      let videoUrl = `${this.$baseUrl}/file/download?user_id=`+localStorage.user_id+`&s_id=`+localStorage.s_id+`&filename=`+res.data.filename+`&file_kind=`+res.data.file_kind
      console.log(res)
      let user = {
        user_id:localStorage.user_id,
        s_id:localStorage.s_id,   
        chatid:this.$route.params.token_y,
        msg:'短视频消息',
        time_sec:res.data.save_time,
        video_id:res.data.filename,
        fmt:res.data.file_kind,
        url:videoUrl,
        name:res.data.originalname,
        random:random,
      }
      let ress =  await this.$api.network.ChatMsgSendVideoSmall(user)
      if(ress.ret)
      {
        this.add = false
        this.zhanwei2 = false
        this.zhanwei1 = true
        this.$toast.success('发送成功')
        // this.chatRexord.push(ress)
        // console.log(this.chatRexord)
        // this.expandUserData();
        // this.updateReadedHeight(ress.height)
      }else
      {
        this.$toast.fail("发送失败" + ress.msg)
      }
      
   },
   ///
   async Administration(){//查看群信息
      if(this.ibapp_chat){
        return 
      }
      let This = this
      let users = {
              user_id:localStorage.user_id,
              s_id:localStorage.s_id,   
              chatid:this.$route.params.token_y,
            }
      let ress =  await this.$api.network.ChatInfo(users)//群信息
      if(!await imDb.getDataByKey(this.$route.params.token_y))
      {
        if(ress && ress.ret) await imDb.addData({key:this.$route.params.token_y,data:ress})
      }
      if(!ress || !ress.ret) return false

      this.chat_vip_level = ress.vip_level
      this.send_vip_level = ress.send_vip_level
      this.forkids = ress.forkids ? ress.forkids: this.forkids
      this.chat_type = ress.chat_type
      // this.backgroundUrl = `${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+`&filename=`+ress.backgroup_img+`&img_kind=`+`open`+`&img_p=`+`min5000`
      let img_id = ress.backgroup_img
      let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'}
      
      this.backgroundImgid = img_id
      let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
        if(item) This.backgroundUrl  = item.data
        else{
          this.$api.network.getImg(params).then((data)=>{
            This.backgroundUrl  ='data:image/png;base64,'+data.data
            imageDb.addData({img_id,data:This.backgroundUrl })
          }).catch((ex)=>{
            console.log('load img error',ex)
          })
          
          //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
        }
      // let item = localStorage.getItem('img-'+img_id)
      // if(item) this.backgroundUrl = item
      // else
      //   This.$api.network.getImg(params).then((data)=>{
      //     This.backgroundUrl ='data:image/png;base64,'+data.data//'+data.fileInfol.fmt+'
        
      //   try{
      //     localStorage.setItem('img-'+img_id,This.backgroundUrl)
      //     }catch(ex){
      //       console.log('save-img2localStroage error:',ex)
      //       This.compress(
      //         This.backgroundUrl,img_id,//"data:image/jgp;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/7SPYUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAA0scAVoAAxslRxwBWgADGyVHHA",
      //           1.5,
      //           function(base64){
      //               //console.log(base64);
      //               localStorage.setItem('img-'+img_id,base64)
      //           }
      //       )

      //     }
      // }).catch((err)=>console.log('load img error',err))

      console.log(ress)
      let is_manager = ress.is_manager
      let is_owner = ress.is_owner
      if(is_manager==true || is_owner ==true){
        this.is_identity = true
      }else{
        this.is_identity = false
      }
      let user = {
              user_id:localStorage.user_id,
              s_id:localStorage.s_id,
              dst_user_id :ress.create_user_id
            }
      let res =  await this.$api.network.UserInfoto(user)
      this.create_user_id = res.user_id
      // this.create_img = `${this.$baseUrl}/image/view?user_id=`+res.user_id+`&filename=`+res.logo+`&img_kind=`+`open`+`&img_p=`+`min1000`
      {
        let img_id = res.logo
        let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img_id,img_kind:'open'}//,img_p:'min200'}
        let item = await imageDb.getDataByKey(img_id)//localStorage.getItem('chatlogo-'+chatInfo.chatlogo)
        if(item) This.create_img   = item.data
        else{
          this.$api.network.getImg(params).then((data)=>{
            This.create_img  ='data:image/png;base64,'+data.data
            imageDb.addData({img_id,data:This.create_img })
          }).catch((ex)=>{
            console.log('load img error',ex)
          })
          //localStorage.setItem('chatlogo-'+chatInfo.chatlogo,chatInfo.img)
        }
        // let item = localStorage.getItem('img-'+img_id)
        // if(item) this.create_img = item
        // else
        //  This.$api.network.getImg(params).then((data)=>{
        //   This.create_img ='data:image/png;base64,'+data.data//'+data.fileInfol.fmt+'
        //   localStorage.setItem('img-'+img_id,This.create_img)
        // }).catch((err)=>console.log('load img error',err))
      }
      // console.log(res)
   },
   //////////////////////////////////////
    move(e){//手指按下拖动
      console.log(e)
      e.preventDefault();
      var moveY = this.endY + (e.touches[0].clientY - this.startY);
      this.moveY = moveY

      if(this.moveY <= -150)
      {
        console.log('触发了')
        this.audiocolor = 'red'
      }else
      {
        this.cancelText = '#000'
        this.audiocolor = '#08435f'
      }
      console.log(moveY)
    },
  
   async deleteRecord () {
        if (!this.record){
          this.$toast({type:'fail',message: '还没录音'})
          return;
        } 
        this.record.stop()
        this.record.destroy().then(()=> {
        this.record = null
         })
      },
      
   ///是否显示录音按钮
   handClickCutChatMode () {
    //  console.log(123456)
    this.add= false
    if(this.iconyy){
      this.iconyy = false
    }else{
      this.iconyy = true
    }
     this.isShowAudioContent = !this.isShowAudioContent
     if(!this.isShowAudioContent && this.record) {
        this.record.stop()
        this.record.destroy().then(()=>{
          this.record = null
        
        })
     }
   },
   
   ///开始录音
   touchRecordStart(e) {
     console.log(e)
     e.preventDefault();
     document.body.style.backgroundColor = '#666'
     this.audioxx = true
     this.iconx = '0.4'
     this.backColor = '#666'
     this.cancelText = '#000'
     this.startY = e.touches[0].clientY;
     console.log(this.startY)
     let that = this
        that.record = new Recorder({
          sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
          sampleRate: 48000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
          numChannels: 1,         // 声道，支持 1 或 2， 默认是1
          compiling: true,       // 是否边录边转换，默认是false
      });
      that.record.start().then(()=> {
                console.log('开始录音')
                // this.$toast.success('开始录音')
                this.cancelx = true
                this.Time();
            }).catch((error)=> {
              alert("录音失败,麦克风权限未打开 " + error)
              document.body.style.backgroundColor = '#f5f5f5'
              this.audiocolor = '#08435f'
              this.backColor = '#f5f5f5'
              this.iconx = '1'
              this.audioxx = false
              console.log(this.moveY)
              clearInterval(this.timer)
              this.cancelx = false
              this.valueVoice = "按住 说话"
              this.moveY = 0
              return;
            })
            that.initTime= null
   },
  async touchRecordEnd(e) {//发送语音
    document.body.style.backgroundColor = '#f5f5f5'
    this.audiocolor = '#08435f'
    this.backColor = '#f5f5f5'
    this.iconx = '1'
    this.audioxx = false
    console.log(this.moveY)
    clearInterval(this.timer)
    this.cancelx = false
    // this.valueVoice = "按住 说话"
    if(this.moveY <= -150)
    {
      this.deleteRecord()
      console.log('录音已取消')
      this.moveY = 0
      return;
    }
    let that = this
    if (!that.record) {
      that.$toast({
            type: 'fail',
            message: '还没开始录音'
      })
      return
    }
    //  if (!this.vidoeKye)
    //  {
    //   this.$toast('正在发送,请稍后')
    //   return;
    //  }   
     this.vidoeKye = false
     let type = 'mp3'
     let random = Math.random()
     let recordFile =  that.record.getWAVBlob()
    //  that.record.downloadWAV([recordFile])
     let recordTime =  that.record.duration
     console.log(recordTime)
     if (Math.floor(recordTime) < 1) {
          this.deleteRecord()
          that.$toast({
          type: 'mp3',
          message: '发送语音太短了'
        })
        return;
     } 
     console.log(recordFile)
    //  /bob转化为文件对象类型,必须放在数组中
    let filename = 'audio.mp3'
     let file =  new window.File([recordFile],filename,{
       type: 'audio/mpeg'
     })
     //  that.record.downloadWAV([fi])
     console.log(file)
    let params = new FormData()
    params.append("user_id",localStorage.user_id);
     params.append("s_id", localStorage.s_id);
     params.append("file", file);
     params.append("file_kind",'file');
     params.append("random", random);
      let config = {
        headers: {
          enctype: "multipart/form-data"
        }
      };
     let res = await this.$axios.post(`${this.$baseUrl}/file/upload`,params, config)
     res = res.data
      console.log(res)
      ///发送语音参数
      //{"fieldname":"file","originalname":"语音","encoding":"7bit","mimetype":"audio/mp3","destination":"/data/node-project/groupchat/file_temp/","path":"/data/node-project/groupchat/file_temp/c24c289f016e76cce9ff70a131b4d670","size":163840,"obj_id":"obj_filemp328ArbXKM6","user_id":"user_24uAvubbLmgx7Q5n","file_kind":"mp3","save_time":1587700503,"filename":"obj_filemp328ArbXKM6","ret":true,"msg":"success"}
    let setRecordMsg = {
        user_id:res.user_id,
        s_id:localStorage.s_id,
        chatid:this.$route.params.token_y,
        record_id:res.filename,
        random:random,
        msg:res.msg,
        time_sec: recordTime,
        title:res.encoding,
        fmt:'file',
        record_name:res.originalname,
    }
    let recordRes = await this.$api.network.ChatMsgSendRecord(setRecordMsg)
    this.vidoeKye = true
    if(recordRes.ret)
    {
      this.moveY = 0
      this.$toast.success('发送成功')
      // this.chatRexord.push(recordRes)
      this.expandUserData();
      this.updateReadedHeight(recordRes.height)
    }else
    {
      this.moveY = 0
      this.$toat.fail('发送失败' + recordRes.msg)
    }
    this.deleteRecord()
   },
   
   ////播放语音
    async handleClickPlayAudio(data) {
      // console.log(this.sign)
      // console.log(data.sign)
      let that = this
      if(this.audio!==null && this.sign == data.sign){//销毁已经播放的音频
            this.audio.pause();
            this.audio = null;
            that.suspend = false
            that.play = true
            that.gif = false
            return;
          }else if(this.audio!==null){
            this.audio.pause();
            this.audio = null;
          }
      this.sign = data.sign
      // console.log(this.sign)
      let second = data.msg_info.body.time_sec
      this.audio = new Audio();
      this.audio.src = data.audioUrl
      this.audio.play()
      // this.audio.volume = 1
      this.suspend = true
      this.play = false
      this.gif = true
      this.audio.onended = function(){
        that.suspend = false
        that.play = true
        that.gif = false
        that.sign = ''
      }
   },
   //停止播放
  ClickPlayAudio(){
    this.audio.pause()
    this.suspend = false
    this.play = true
    this.gif = false
  },
  typex(){//聊天室分类
    let i = 0;
    for(i; i<this.chatRexord.length; i++)
    {
        // console.log(this.chatRexord)
      if(this.chatRexord[i].msg_info.type === 'text')
      {
        this.textz.push(this.chatRexord[i])
        // console.log(this.textz)
      }else if(this.chatRexord[i].msg_info.type === 'img')
      {
        this.imgz.push(this.chatRexord[i])
        // console.log(this.imgz)
      }else if(this.chatRexord[i].msg_info.type === "file")
      {
        this.filez.push(this.chatRexord[i])
        // console.log(this.imgz)
      }else if(this.chatRexord[i].msg_info.type === 'video')
      {
        this.videoz.push(this.chatRexord[i])
        // console.log(this.videoz)
      }else if(this.chatRexord[i].msg_info.type === 'record')
      {
        this.recordz.push(this.chatRexord[i])
      }
    }
  },
    async Time(){
        let count = 0
        let timer = null //timer变量记录定时器setInterval的返回值
        let that = this
        this.timer = setInterval(function() {
                    count++;
                        // 需要改变页面上时分秒的值
                    let SS = (count / 60)
                    // let S = (parseInt(count / 10) % 60)
                    // let M = (parseInt(count / 60) % 60)
                    // console.log(SS)
                   let timeS = SS.toString().split('.').join(':')
                   that.timeX = timeS.slice(0,4);
                    // console.log(that.timeX)
                }, 10);
      },
      initVideo () {
        this.$nextTick(function(){
          let that = this
          if(!that.$refs.video) return
           let videoList = that.$refs.video
           console.log(videoList)
           videoList.forEach(item=> {
             that.$video(item, {
                 //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            controls: true,
            //自动播放属性,muted:静音播放
            // autoplay: "muted",
            //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
            // preload: "auto",
            //设置视频播放器的显示宽度（以像素为单位）
            width: "100px",
            //设置视频播放器的显示高度（以像素为单位）
            height: "400px"
             })
           })
        },100)
      },
      openRecordVideo () {
        //2023-10-20 修改为群头榜
        // this.$refs.recordVideo.open()
        let chatInfo = {... this.chatInfo }
        chatInfo.label_type = this.chatInfo.token_y
        if(this.chatInfo.token_y && this.chatInfo.token_y.indexOf('chat01')>0)
        {
          return this.$toast('私信无头榜内容！')
        }
        console.log('chat-into_dweb:',chatInfo)
        localStorage.setItem('dweb-into-chat-info',JSON.stringify(chatInfo))
        this.$router.push('/dweb')
      },
      openForm () {
        this.$router.push('/form');
      },
      openFORK(){
        this.$router.push('/fork')
      },

      async shareChat()
      {
        if(this.chatInfo.chat_type=='single'){
          this.$toast('分享失败：私信群不能分享！')
          return ;
        }
        let sharechat = {share_chatid:this.$route.params.token_y,img:this.chatInfo.chatlogo,chat_type:this.chatInfo.chat_type,
            title:this.chatText,desc:'这是一个不错的群，欢迎加入！',share_user_id:localStorage.user_id}
        let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,xtype:'chat',
          xmsg:'我分享了一个群：',xobj:JSON.stringify(sharechat),random:Math.random()}
        let ret = await this.$api.network.sendXMSG(params)
        if(!ret || !ret.ret) return this.$toast('分享失败，原因：'+(ret && ret.msg ? ret.msg:'未知网络原因'))
        this.$toast('分享成功！1秒后将自动跳转至头榜...')
        localStorage.setItem('newDWebFlag','1')
        setTimeout(()=>this.$router.push('/dweb'),1000)
      },
      startIB()
      {
        this.poplang = new PopRuntime({}) //避免rpc_client未初始化，导致poplang未能有效初始化
        this.ibapp_chat = ['ib','IB','ai','AI'].indexOf(this.$route.params.token_y)>=0 //(''+this.chatid).toLowerCase() == 'ib' || (''+this.chatid).toLowerCase() == 'ai'
        // console.log('ibapp_chat:',this.chatid,this.$route.params.token_y,(this.chatid in ['ib','IB','ai','AI']))
        // // this.ibapp_chat = this.$route.params.token_y in  ['ib','IB','ai','AI'] === true
        console.log('ibapp_chat:',this.ibapp_chat)
        if(this.ibapp_chat){
          console.log('may be dtns.ai.engine')
          this.chatText = this.ibchatStr//'智体IB'

          //每次进入，都重新测试一次
          if(typeof g_connectIBChatSvr == 'function') g_connectIBChatSvr()
          return true
        }
        return false
      },
      async start(){
        await this.Administration()//查看群信息 2023-12-19  single-contact-chat点击联系人聊天
         //重新获得全屏宽度，以便zoom计算MsgItem的宽度缩放比
        let This = this
        this.onresize = () => {
          return (() => {
            window.fullWidth = document.documentElement.clientWidth;
            This.fullWidth = fullWidth
            console.log('window.fullWidth:'+fullWidth)
            console.log('this.isFull:'+This.isFull)
          })();
        };
        this.onresize()
        window.addEventListener('resize',this.onresize,true)

        let items = [window.msgItem , window.newsItem ,window.imgsItem , 
                      window.newsObj,window.ifilesItem ]
        this.msgItem = items[ Math.floor(Math.random()*133333333) % items.length ]  
        this.darkMode = localStorage.getItem('dark_mode') ? parseInt(localStorage.getItem('dark_mode')):0
        console.log('chat-created--------websock:',websock)
        let that = this
        await this.news();
        exitFlag = false;
        const_chatid = this.$route.params.token_y
        try {
          that.initWebSocket();
        } catch (error) {
          // alert(error)
          let array = JSON.parse(localStorage.getItem('error'))
          array.push(error.message)
          localStorage.setItem('error',JSON.stringify(array))
        }
        //显示聊天室名称-------使用了缓存
        let chatInfo = await imDb.getDataByKey(this.$route.params.token_y)//localStorage.getItem(this.$route.params.token_y)
        try{
          chatInfo = chatInfo?chatInfo.data :null;// JSON.parse(chatInfo)
        }catch(ex)
        {
          console.log('parse-ChatInfo-exception:'+ex)
          // let array = JSON.parse(localStorage.getItem('error'))
          // array.push(ex.message)
          // localStorage.setItem('error',JSON.stringify(array))
          chatInfo = null
          // return ;
        }
        console.log('chatInfo:'+JSON.stringify(chatInfo))
        if(!chatInfo) return 
        if(chatInfo.chat_type=='single')
        {
          let dst_user_id = localStorage.user_id == chatInfo.user_a ? chatInfo.user_b: chatInfo.user_a;
          this.$api.network.s_queryUserInfo(dst_user_id,function(qUserInfo){
            chatInfo.chatname = qUserInfo.user_name;
          })
        }else{
          let chatparams = {
                  user_id:localStorage.user_id,
                  s_id:localStorage.s_id,   
                  chatid:this.$route.params.token_y,
                }
          let ress =  await this.$api.network.ChatInfo(chatparams)//群信息
          chatInfo.chatname =await g_dchatManager.decryptMsgInfo(ress.chatname) // ress.chatname
        }
        this.chatText = chatInfo.chatname;
        this.chatInfo = chatInfo

        //关于web3-key（按聊天室chatRoom获取---主要用于发送聊天时加密，如是解密（亦是复杂度重点之一），则需要获取聊天室历史的aes_web3key）
        // let chatWeb3KeyHashData = await iWalletDb.getDataByKey('chat_web3key_hash:'+this.$route.params.token_y)
        // console.log('chatWeb3KeyData',chatWeb3KeyData)
        // let chatWeb3Key_hash = chatWeb3KeyHashData? chatWeb3KeyHashData.data: null;
        // if(!chatWeb3Key_hash)
        // {
        //查询room是否已经拥有了web3key_hash（用于解析得到chatWeb3Key--聊天室的加密与解密）
        let web3keyInfoRet = await this.$api.network.queryChatWeb3key({list_id:this.$route.params.token_y,user_id:localStorage.user_id,
                  s_id:localStorage.s_id})
        console.log('web3keyInfoRet:',web3keyInfoRet)
        if(!web3keyInfoRet || !web3keyInfoRet.ret)
        {
          //设置新的aes-key
          let res =  await this.$api.network.ChatMamList({chatid:this.$route.params.token_y,
                user_id:localStorage.user_id,
                s_id:localStorage.s_id,
                begin:0,
                len:20})//群所有成员列表
          let users = []
          console.log('query-chat-mems:',res)
          if(res.ret){
            for(let i=0; i<res.list.length; i++) {
              users.push(res.list[i].user_id)
            }
          }
          if(users.length<=0){
            console.log('[Error]chat-mems-list is empty',users)
            return
          }
          let userPubkeysRet = await this.$api.network.queryUsersPubkeys({users:JSON.stringify(users),user_id:localStorage.user_id,
                  s_id:localStorage.s_id})
          console.log('userPubkeysRet',userPubkeysRet)
          if(!userPubkeysRet || !userPubkeysRet.ret || !userPubkeysRet.list) return ;
          let pubkeys = userPubkeysRet.list
          let web3key = sign_util.getWeb3keyAes256()
          let web3key_hash = await sign_util.hashVal(web3key)
          console.log('getWeb3keyAes256-web3Key:',web3key)
          let need_set_flag = false
          for(let i=0;i<pubkeys.length;i++)
          {
            if(pubkeys[i] && pubkeys[i].public_key)
            {
              pubkeys[i].encrptoKeyText =await sign_util.encryptSomethingInfo(web3key,pubkeys[i].public_key)
              need_set_flag = pubkeys[i].encrptoKeyText ? true :false
            }else{
              console.log('pubkeys-i:'+i+'.public_key is empty:',pubkeys[i])
            }
          }

          if(!need_set_flag)
          {
            this.$toast('【注意】设置聊天室相应的chatWeb3Key失败！')
            return ;
          }

          //设置密钥
          let setWeb3keysRet = await this.$api.network.setUsersWeb3keys(
            {list_id:this.$route.params.token_y,list:JSON.stringify(pubkeys),user_id:localStorage.user_id,
                  s_id:localStorage.s_id,web3key_hash,set_chat_web3key_hash_flag:true})
          //{user_id,s_id,list,list_id} 
          console.log('setWeb3keysRet',setWeb3keysRet)
          if(setWeb3keysRet && setWeb3keysRet.ret){
            iWalletDb.addData({key:'web3key_hash:'+web3key_hash,data:web3key})//添加到iwallet
            this.chatWeb3Key = web3key
          }else{
            console.log('【错误】批量设置user-web3keys失败！出错信息：'+JSON.stringify(setWeb3keysRet))
            this.$toast('【错误】批量设置user-web3keys失败！出错信息：'+JSON.stringify(setWeb3keysRet))
          }
        }else{//同步新的aes-key
          let chat_web3key_hash = web3keyInfoRet.web3key_hash
          //先在本地查询
          let localKeyData = await g_dchatManager.getWeb3Key(chat_web3key_hash) //iWalletDb.getDataByKey('web3key_hash:'+chat_web3key_hash)
          if(localKeyData)
          {
            // this.chatWeb3Key = localKeyData.data
            this.chatWeb3Key = localKeyData
            console.log('get-chat-web3key from iWalletDb.web3key_hash:'+chat_web3key_hash,this.chatWeb3Key)
            return 
          }

          let userWeb3keyInfo = await this.$api.network.queryUsersWeb3key({web3key_hash:chat_web3key_hash,
                  user_id:localStorage.user_id,
                  s_id:localStorage.s_id})
          console.log('userWeb3keyInfo:',userWeb3keyInfo)
          if(!userWeb3keyInfo || !userWeb3keyInfo.ret) {
            console.log('[Error] user-map-chat-web3key is lost-time, may be user-data-sync-not-ended or something error?')
            console.log('[Error][help] need other user sync the aes-web3key to you! or update the chat-web3key')
            return 
          } 
          let {public_key,encrptoKeyText,web3key_hash,list_id} = userWeb3keyInfo
          if(list_id == this.$route.params.token_y) //判断用户保存的是否为最新
          {
            //在iWalletDb中查找，如果找到则直接解析
            let keys = await iWalletDb.getAllDatas()
            console.log('keys:',keys)
            for(let i=0;i<keys.length;i++)
            {
              if(keys[i].data && keys[i].data.public_key == public_key)
              {
                let private_key = keys[i].data.private_key
                console.log('finded private-key from iWalletDb:'+private_key)
                this.chatWeb3Key = await sign_util.decryptSomethingInfo(encrptoKeyText,private_key)
                let tmpHashVal = await sign_util.hashVal(this.chatWeb3Key)
                console.log('tmpHashVal:'+tmpHashVal)
                if(tmpHashVal==chat_web3key_hash)
                {
                  iWalletDb.addData({key:'web3key_hash:'+chat_web3key_hash,data:this.chatWeb3Key})
                }else{
                  this.chatWeb3Key = null
                  console.log('[Error]decrypt web3-key failed? tmpHashVal!=chat_web3key_hash',tmpHashVal,chat_web3key_hash)
                }
                break;
              }
            }
            //如果本地无法解析，则在网络中获取。
            if(!this.chatWeb3Key)
            {
              if(this.publicKeyNoticeMap.has(public_key))
              {
                console.log('public_key is already notice! ',public_key)
                return 
              }
              this.publicKeyNoticeMap.set(public_key,'')
              let This = this
              g_dchatManager.sendNotice(async function(nowDeviceInfo){
                if(!nowDeviceInfo) return 
                nowDeviceInfo.need_public_key = public_key
                nowDeviceInfo.notice_msg_type = 'query_ecc_keys_notice'
                try{
                  nowDeviceInfo.decrypt_public_key = g_mywallet ? g_mywallet.public_key :null
                  if(!nowDeviceInfo.decrypt_public_key)
                  {
                    nowDeviceInfo.decrypt_public_key = key_util.getPublicKey( g_mywallet.private_key )
                  }
                }catch(ee){}
                nowDeviceInfo.s_id = null//没必要暴露这个session-id(安全起见)
              },function(msg){
                This.$toast(msg)
                This.publicKeyNoticeMap.delete(public_key)
              },function(){
                console.log('sendNotice success!')
              })
            }
          }else{
            console.log('[Error]web3key_hash-list-id not equal chatid, something map error!')
          }
        }
      },
      async start2(){
        // this.poplang = new PopRuntime({}) //避免rpc_client未初始化，导致poplang未能有效初始化
        //2023-10-7新增poplang版本的切换ib3
        // let initFlag = g_dchatManager.initAppRuntime(this.poplang)
        // console.log('initFlag:',initFlag)
        // let This = this
        // this.poplang.binderAddOpcode('ib3.switch',async function(context,opcode,token_x,token_y,opval,extra_data){
        //   context['$ret'] = await g_dchatManager.switchIB3(context[token_x] ?context[token_x]:token_x ,This)
        //   console.log('g_dchatManager.switchIB3--ret:',context['$ret'])
        //   return context['$ret']
        // })

        // await this.Administration()//查看群信息 2023-12-19
        await this.mounteds()
        this.rollHeight();   
        
        //跟随全局的img_q设置
        if(typeof rpc_client.img_q !='undefined'){
          this.g_img_q(rpc_client.img_q)
        }
      }
      ,
    translate()
    {
      // sendMsgBtnStr:'发送',
      // chatTitleStr:'聊天',
      // ibchatStr:'智体IB',
      // mechatStr:'我',
      // pictureStr:'照片',
      // videoChatStr:'视频聊天',
      // sendFileStr:'文件',
      // viewChatDWebStr:'头榜',
      // sendContactStr:'联系人',
      // intoFormEngineStr:'表单',
      // intoForklistStr:'福刻FORK',
      // sendChat2DWebStr:'推头榜',
      // undoSendMsgStr:'撤回消息',
      // undoSendMsgTipsStr:'是否撤回该消息?',
      // cancelStr:'取消',
      // okStr:'确定',
      // yourVipTipsStr:'你的会员等级为VIP',
      // visitGroupVipStr:'本群访问权限需要VIP',
      // forkOkTipsStr:'以上（或需要福刻访问权限：',
      // pleaseBuyVipTipsStr:'请您开通会员',
      // buyVipNowStr:'充值会员',
      // sendMsgNeedVipTipsStr:'本群发送消息权限需要VIP',
      // needSendVipStr:'以上，请您开通会员',

        this.sendMsgBtnStr = g_dtnsStrings.getString('/index/msg/send')
        this.chatTitleStr=g_dtnsStrings.getString('/index/chat/title')
        this.chatText = this.chatTitleStr
        this.ibchatStr=g_dtnsStrings.getString('/index/chat/ibchat')
        this.mechatStr=g_dtnsStrings.getString('/index/chat/mechat')
        this.pictureStr = g_dtnsStrings.getString('/index/chat/picture/send')
        this.videoChatStr = g_dtnsStrings.getString('/index/chat/videochat')
        this.sendFileStr = g_dtnsStrings.getString('/index/chat/file/send')
        this.viewChatDWebStr = g_dtnsStrings.getString('/index/chat/dweb/view')
        this.sendContactStr = g_dtnsStrings.getString('/index/chat/contact/send')
        this.intoFormEngineStr = g_dtnsStrings.getString('/index/chat/formengine/into')
        this.intoForklistStr=g_dtnsStrings.getString('/index/chat/forklist/into')
        this.sendChat2DWebStr = g_dtnsStrings.getString('/index/chat/dweb/send')
        this.undoSendMsgStr = g_dtnsStrings.getString('/index/chat/undo')
        this.undoSendMsgTipsStr = g_dtnsStrings.getString('/index/chat/undo/tips')
        this.cancelStr = g_dtnsStrings.getString('/index/cancel')
        this.okStr = g_dtnsStrings.getString('/index/ok')
        this.yourVipTipsStr = g_dtnsStrings.getString('/index/chat/vip/your')
        this.visitGroupVipStr = g_dtnsStrings.getString('/index/chat/vip/visit')
        this.forkOkTipsStr = g_dtnsStrings.getString('/index/chat/fork/tips')
        this.pleaseBuyVipTipsStr = g_dtnsStrings.getString('/index/chat/vip/buy/please')
        this.buyVipNowStr = g_dtnsStrings.getString('/index/vip/buy/now')
        this.sendMsgNeedVipTipsStr = g_dtnsStrings.getString('/index/chat/send/msg/vip/need')
        this.needSendVipStr = g_dtnsStrings.getString('/index/chat/send/msg/vip/need/tips')
    }
   
    },
  async created() {
    if(typeof g_pop_event_bus!='undefined')
    {
      g_pop_event_bus.on('update_dtns_loction',this.translate)
    }
    this.translate()

    this.create_time  = Date.now()
    this.imgStatus = window.rpc_client ? rpc_client.pingpong_flag :false
    this.startIB()
    this.start()
    // }else{
    //   this.aes_web3key = chatWeb3Key //拿到了，就设置，以便解析数据。
    //   this.aes_web3key_hash =await sign_util.hashVal(chatWeb3Key)
    // }
  },
  beforeRouteLeave(to,from,next){
    exitFlag =true;
    let scrollTop = this.$refs.chatBox.scrollTop
    console.log('scroll-val:'+scrollTop)//document.documentElement.scrollTop)//this.$refs.listScroll.scrollTop)
    this.scrollTop = scrollTop//document.documentElement.scrollTop// this.$refs.listScroll.scrollTop
    next();
  },
  activated(){
    console.log('into chat.vue activated:',this.$route.params.token_y)
    this.translate()
    this.imgStatus = window.rpc_client ? rpc_client.pingpong_flag :false
    this.create_time = Date.now()
    // this.chatid = this.$route.params.token_y
    if(this.$route.params.token_y!=this.chatid)
    {
      this.stopWSToken()
      this.chatWeb3Key = null

      this.is_identity = false
      this.chat_type = ''
      this.backgroundUrl = ''
      this.isLoading = false
      this.sign = ''
      this.playx =0
      this.timeX =''
      this.chat_vip_level = ''
      this.send_vip_level = ''
      this.forkids = '暂无该设置'
      this.imgStatus = true
      this.chatText = '聊天'
      this.texts = ''
      this.add = false
      this.msgid=''
      this.txt = ""
      this.chatRexord = []
      this.token = ''
      this.begin = 0
      this.len = 1000000
      this.page_len = 20,
      this.p_begin = 0,
      this.p_end = 0 
      this.is_first_page = true 
      this.finished = false
      this.listtime = false
      this.heightx = true
      this.rollheight = ''
      this.rollheightx=''
      this.create_img = ''
      this.create_user_id = ''
      this.chatid = this.$route.params.token_y
      this.ibapp_chat = false
      this.img_q = 0.5
      this.msgItem = null
      this.fullWidth = window.fullWidth
      this.isFull = false
      this.chatWeb3Key = null
      this.publicKeyNoticeMap = new Map()
      this.chatnoticeJSONData = chatNoticeJson
      this.jsonDataNotice = chatEccNoticeJson

      this.start()
      this.start2()
    }else{
      console.log('this.scrollTop:'+this.scrollTop)
      this.$refs.chatBox.scrollTop = this.scrollTop
    }
    let flag = this.startIB()
  },

   beforeRouteEnter(to, form, next) {
     let that = this 
    next()
  },
  // beforeRouteLeave(to, form, next) {
  //   exitFlag =true;
  //   //if(websock) websock.close();
  //   next()
  // },

  

  async mounted() {//执行
    this.start2()
  },
  watch: {
    chatRexord () {
        let This = this
        if(this.heightx == true && this.is_first_page)
        {
          this.$nextTick(() => {
          document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight// 移动端获取对象
          // console.log(document.getElementById('chatBox').scrollHeight)
          // console.log(document.getElementById('chatBox').scrollTop)
          // document.documentElement.scrollTop = document.documentElement.scrollHeight // 浏览器滚动高度
          // console.log("这是移动端滚动高度" + document.getElementById('chatBox').scrollHeight)
          // console.log("这是浏览器滚动高度" + document.documentElement.scrollTop)
          // this.initVideo()
          })
            
        }
        this.is_first_page = false
    },
    textz () {
       this.$nextTick(() => {
            
       })
    }
  },
  beforeDestroy () {
    console.log('into beforeDestroy()')
    if(typeof g_pop_event_bus!='undefined')
    {
      g_pop_event_bus.removeListener('update_dtns_loction',this.translate)
    }
    //
    for(let i=0;this.chatRexord&&i<this.chatRexord.length;i++){
      let item = this.chatRexord[i]
      if(item.msg_info &&item.msg_info.type == 'img')
      {
        if(item.msg_info.body) imageDb.delCache(item.msg_info.body.img_id)
        item.msg_info.url = null
      }
    }
    for(let i=0;this.imgz&&i<this.imgz.length;i++)
    {
      let item = this.imgz[i]
      if(item.msg_info &&item.msg_info.type == 'img')
      {
        if(item.msg_info.body) imageDb.delCache(item.msg_info.body.img_id)
        item.msg_info.url = null
      }
    }
    this.imgz = [] 
    this.chatRexord = []
    this.backgroundUrl = null
    imageDb.delCache(this.backgroundImgid)

    if (this.record) {
      this.record.destroy().then(()=> {
        this.record = null
      })
    }
    if(typeof clearImageLazyData =='function')  clearImageLazyData()
  },
  computed: {
    isRecord () {
      if (this.record) return '点击取消录音'
      return '开始录音'
    },
  },
  filters: {
    filterTime_sec (time) {
      return Math.floor(time)
    }
  }
};
</script>

<style lang="stylus" scoped>
.fullDiv:fullscreen {
  background-color: #f0f0f0;
  font-size: 150%;
  overflow:scroll;
}
.canvas {
  background: #fff;
  display:inline-block
  position: relative;
  margin:0px 35px 0px 0;
}
.page >>> .van-tabbar-item__text{
  font-size 13px;
}
*{
  box-sizing border-box;
}
#imgss{
  width 50%
  height:50%;
  max-width:500px;
}
#video {
  max-height 300px;
  max-width 200px;
}
.topbar {
  position fixed
  top 0
  width 100%
  z-index 99
}
.page{
  width:100%;
  height:100%;
  position:relative;
}
*{
  padding 0
  margin 0 auto
}
.record{
			background-color: #fff;
			padding: 8px 8px;
			border-radius: 4px;
      display:inline-block
			position: relative;
      font-size:14px;
      margin:25px 35px 0px 0;
      word-break: break-all
      word-wrap: break-word
      // white-space: pre-wrap
		}
.record::after{
			content: '';
			border: 8px solid #ffffff00;
			border-right: 8px solid #fff;
			position: absolute;
			top: 6px;
			left: -16px;
      
		}
.recordx{
			background-color: #12adf5;
			padding: 8px 8px;
			border-radius: 4px;
      display:inline-block
			position: relative;
      font-size:14px;
      margin:25px 35px 0px 0;
      word-break: break-all
      word-wrap: break-word
      // white-space: pre-wrap
		}
.recordx::after{
			content: '';
			border: 8px solid #ffffff00;
			border-right: 8px solid #12adf5;
			position: absolute;
			top: 6px;
			left: -16px;
}  
.page .van-nav-bar__title {
  font-size 16px
  font-weight bold
}
.topbar[data-v-42f19472] .van-nav-bar__title {
  color:#000;
  font-size:16px;
}
.van-icon-ellipsis::before{
  color:#000;
  font-size:1.2rem;
}
* {
  // touch-action: pan-y;
  // 
  
}

.none {
  height: 250px;
  background-color: #f5f5f5;
  display: block;
}

.none >>> van-button__text {
  width: 100%;
  height: 100%;
}

.none input {
  width: 100%;
  height: 100%;
  background: #fff;
  display: block;
  opacity: 0;
}

.topbar >>> .van-nav-bar {
  background-color: #fff;
}


.topbar >>> .van-nav-bar .van-icon {
  color: #000;
}

.topbar >>> .van-nav-bar__arrow+.van-nav-bar__text {
  line-height: 44px;
  color: #000;
  font-size: 16px;
}

.topbar >>> .van-icon {
  line-height: 44px;
  color: #000;
  font-size: 1.2rem;
}

.topbar >>> .van-nav-bar__text {
  line-height: 44px;
  color: #000;
  font-size: 16px;
}

.content {
  height: auto;
}
.foot {
  border-top: 1px solid #E5E5E5;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index:99;
  width: 100%;
}
.van-nav-bar .van-icon{
  color:#000
}
.footer {
  height:50px;
  width: 100%;
  display: flex;
  width: 100%;
}
.none >>> .van-icon{
  margin:9px;
}
.footer >>> .van-popup .van-popup--bottom{
  height:10%;
}
.height {
  @media (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) {
    height: 50px;
  }

  @media (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) {
    height: 50px;
  }
}

.footer span {
  font-size: 30px;
  color: #000312;
  width: 30px;
  height: 30px;
  margin: auto 4%;
  line-height: 30px;
}

.footer textarea {
  margin: auto;
  width: 65%;
  height:36px;
  border:none;
  background-color:#f5f5f5;
  border:none; 
  padding-left:5px;
  font-size:15px;
  line-height:36px;
}

.text {
  width: 30px;
  height: 30px;
  border: 1px solid black;
}

.txt {
  font-size: 30px;
}

img {
  width: 50px;
  height: 50px;
}
.nav_text {
  width:20%; 
  float:left; 
  // border:1px solid; 
  margin:auto; 
  align:center; 
  text-align:center;
  padding-top:6px;
}
.live_tips{
  width: 100px
  position: absolute;
  top:25%;
  left:50%;
  transform: translateX(-40%)
  color: #fff;
  z-index: 6
}
.retweet{
  padding: .625rem;
  margin:.4375rem -.75rem -.75rem;
  background-color:#f7f7f7;
  overflow: hidden;
}
.buybtn{
  padding: 8px;
  // color: #F5C400; 
  // border-radius: 0px; font-size: 13px; height: auto; background-color: rgb(18, 173, 245); border: none;
}
.buyedp{
  padding-left:10px;
  height:50px;
  width:100%;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.1) 0px,
      rgba(0, 0, 0, 0.1) 1px,
      transparent 1px,
      transparent 100px
    ),
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.1) 0px,
      rgba(0, 0, 0, 0.1) 1px,
      transparent 1px,
      transparent 100px
    );
  background-size: 5px 5px;
  z-index: -1;
}
</style>
<!-- <style scoped rc="../../../static/js/lib/k-form-design.css" >
</style> -->
