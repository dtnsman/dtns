<template>
    <div class="box">
      <header class="topbar" style="" :style="{opacity:headerTou}">
        <div style="margin:0 auto;height:46px;" align="center">
          <svg v-if="imgStatus == true " style="width:17px;height:17px;top:13px; position:absolute;" t="1590975627508" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5496" width="17" height="17"><path d="M514.752467 0.007392a511.992334 511.992334 0 1 0 509.254407 511.992334A511.992334 511.992334 0 0 0 514.752467 0.007392z m375.095988 528.419896A752.929903 752.929903 0 0 1 659.862593 574.972045a301.171961 301.171961 0 0 1-101.303296-16.427561c-8.213781 128.682565-161.537688 276.530619-183.441103 295.696107a21.903415 21.903415 0 0 1-19.165489 5.475854 30.117196 30.117196 0 0 1-19.165488-8.213781 27.379269 27.379269 0 0 1 2.737927-38.330977c54.758538-52.020611 188.916957-199.868665 161.537688-290.220253-71.1861-62.972319-262.840984-5.475854-331.289157 21.903415a27.379269 27.379269 0 0 1-35.59305-16.427561 24.641342 24.641342 0 0 1 13.689635-35.59305c24.641342-8.213781 224.510007-84.875734 347.716718-38.330977 8.213781-128.682565 147.848054-268.316838 167.013542-287.482327a30.117196 30.117196 0 0 1 38.330977 2.737927 27.379269 27.379269 0 0 1 0 38.330977c-49.282685 49.282685-169.751469 191.654884-150.58598 282.006473 73.924027 60.234392 254.627203 10.951708 320.337449-13.689635a27.379269 27.379269 0 1 1 19.165489 52.020612z" fill="#1afa29" p-id="5497"></path></svg>
          <svg v-if="imgStatus == false " style="width:17px;height:17px;top:13px; position:absolute;" t="1590976113043" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5679" width="17" height="17"><path d="M514.752467 0.007392a511.992334 511.992334 0 1 0 509.254407 511.992334A511.992334 511.992334 0 0 0 514.752467 0.007392z m375.095988 528.419896A752.929903 752.929903 0 0 1 659.862593 574.972045a301.171961 301.171961 0 0 1-101.303296-16.427561c-8.213781 128.682565-161.537688 276.530619-183.441103 295.696107a21.903415 21.903415 0 0 1-19.165489 5.475854 30.117196 30.117196 0 0 1-19.165488-8.213781 27.379269 27.379269 0 0 1 2.737927-38.330977c54.758538-52.020611 188.916957-199.868665 161.537688-290.220253-71.1861-62.972319-262.840984-5.475854-331.289157 21.903415a27.379269 27.379269 0 0 1-35.59305-16.427561 24.641342 24.641342 0 0 1 13.689635-35.59305c24.641342-10.951708 224.510007-84.875734 347.716718-38.330977 8.213781-128.682565 147.848054-268.316838 167.013542-287.482327a30.117196 30.117196 0 0 1 38.330977 2.737927 27.379269 27.379269 0 0 1 0 38.330977c-49.282685 49.282685-169.751469 191.654884-150.58598 282.006473 73.924027 60.234392 254.627203 10.951708 320.337449-13.689635a27.379269 27.379269 0 1 1 19.165489 52.020612z" fill="#F00945" p-id="5680"></path></svg>
          <span style="margin-left:24px; font-size:16px; line-height:43px;">{{chatText}}</span>
          <svg v-if="chat_type == 'group_shop'" style="width:16px;height:16px;top:14px; position:absolute;margin-left:5px;" t="1591320734595" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3569" width="16" height="16"><path d="M1008.995228 367.590465L840.204205 15.004772a26.256381 26.256381 0 0 0-22.50547-15.003647H210.051051a30.007293 30.007293 0 0 0-26.256381 15.003647L18.754558 367.590465a153.787377 153.787377 0 0 0-18.754558 71.267321c0 97.523702 105.025526 172.541935 232.556521 172.541935a296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205 296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205c131.281907 0 232.556521-75.018233 232.556521-172.541935a153.787377 153.787377 0 0 0-18.754558-71.267321zM660.160447 648.908837a243.809256 243.809256 0 0 1-146.285554 48.761851 255.061991 255.061991 0 0 1-146.285553-48.761851 236.307433 236.307433 0 0 1-146.285554 48.761851 277.567461 277.567461 0 0 1-123.780084-33.758204v326.329311a30.007293 30.007293 0 0 0 26.256382 33.758205h780.189619a30.007293 30.007293 0 0 0 26.256381-33.758205v-326.329311a262.563814 262.563814 0 0 1-123.780084 33.758204 243.809256 243.809256 0 0 1-146.285553-48.761851z" fill="#12ADF5" p-id="3570"></path></svg>
        </div>
        <div @click="onClickLeft" style="position:fixed; top:0px; left:15px;">
          <van-icon name="arrow-left" />
        </div>
        <div style="position:fixed;top:11px;right:50px;z-idnex:99">
          <svg v-if="groud_str"  @click="group_live_ConfigureLive" t="1589883019797" class="icon" viewBox="0 0 1451 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2642" width="20" height="20"><path d="M911.266055 93.944954a93.944954 93.944954 0 0 0-93.944954-93.944954H93.944954a93.944954 93.944954 0 0 0-93.944954 93.944954v836.110092a93.944954 93.944954 0 0 0 93.944954 93.944954h723.376147a93.944954 93.944954 0 0 0 93.944954-93.944954V352.293578zM1427.963303 84.550459a42.275229 42.275229 0 0 0-46.972477 0l-403.963303 230.165137v394.568808l403.963303 234.862385h46.972477a56.366972 56.366972 0 0 0 23.486238-42.275229V122.12844a46.972477 46.972477 0 0 0-23.486238-37.577981z" fill="#12adf5" p-id="2643"></path></svg>
        </div>
        <div style="position:fixed; top:0px; right:15px;z-index:99">
          <van-icon @click="pageset(token)" name="ellipsis" slot="right" />
        </div>
      </header>
      <!-- 直播聊天室开始 -->
      <div v-if="groud_str">
        <div style="position:fixed;height:100%;width:100%;background-position:right top;z-index:1;"  :style="{backgroundImage:'url(' + backgroundUrl + ')',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',filter:darkMode ? 'invert(1) hue-rotate(180deg)':''}"></div>
        <!-- 直播 -->
        <div v-show="videoPlay" id="videobox" style="width:100%;position:fixed;left:0;right:0;top:0;bottom:0;z-index:4;overflow:hidden;" :style="{height:bodyHeight+'px'}">
            <video id="myVideo" :style="{height:bodyHeight+'px'}" style="width:100%;"  class="video-js vjs-default-skin vjs-big-play-centered" preload="auto">
                <source id="source" type="application/x-mpegURL">
            </video>
        </div>
        <!-- 报错提示 -->
        <div style="position:fixed;z-index:3;">
          <div v-if="loading == true" class="live_tips_img">
            <div style="font-family:Segoe UI Semibold;padding-left:70px;">z</div>
            <div style="font-family:Segoe UI Semibold;padding-left:50px;">Z</div>
            <div >
              <svg t="1590738784925" class="icon" viewBox="0 0 1131 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2865" width="35" height="35"><path d="M1131.354839 499.612903v-206.451613c0-37.16129-53.677419-70.193548-115.612904-70.193548h-276.645161l111.483871-177.548387a28.903226 28.903226 0 0 0-12.387097-41.290323 28.903226 28.903226 0 0 0-37.16129 8.258065l-132.129032 210.580645h-210.580645L330.322581 12.387097a33.032258 33.032258 0 0 0-41.290323-8.258065 33.032258 33.032258 0 0 0-8.258064 41.290323l111.483871 177.548387H115.612903C53.677419 222.967742 0 256 0 293.16129V949.677419c0 41.290323 53.677419 74.322581 115.612903 74.322581h900.129032c61.935484 0 115.612903-33.032258 115.612904-74.322581V499.612903z m-338.580645 144.516129l-326.193549 189.935484h-28.903226a24.774194 24.774194 0 0 1-12.387096-24.774193v-375.741936a20.645161 20.645161 0 0 1 12.387096-20.645161 20.645161 20.645161 0 0 1 28.903226 0l326.193549 185.806451a24.774194 24.774194 0 0 1 12.387096 24.774194 20.645161 20.645161 0 0 1-12.387096 20.645161z" fill="#FFFFFF" p-id="2866"></path></svg>
            </div>
          </div>
          <div v-if="loading == false" class="live_tips_loading"><van-loading type="spinner" color="#ffffff" /></div>
          <div class="live_tips">{{isLive}}</div>
        </div>

        <!-- 字幕 -->
        <div style="position:fixed;z-index:4;width:100%;overflow:hidden;" :style="{height:bodyHeight+'px'}">
          <div style="position:absolute;color:#ff6600;bottom:65px;left:15px;font-size:15px;">当前观看人数{{cnt}}人</div>
            <div style="position:absolute;width:245px;left:10px;bottom:75px;height:175px;">
              <div>
                <div style="font-size:12px;background-color:rgba(50, 50, 50,0.3);padding:5px 8px;border-radius:5px;color:#e87c46;">
                  <div>直播提倡绿色直播，严谨涉政，涉恐，涉黄，聚众闹事，返现等内容，网警24小时巡查。请忽参与直播间非官方的奖励活动，游戏，请忽私下交易，以防被骗。</div>
                </div>
                <div id="zhiboGD" style="height:74px;overflow:hidden;">
                  <div v-for="(item,index) in chatRexord" v-if="item.msg_info.type == 'text'" :key="index" style="padding-top:5px;" >
                    <div>
                      <div style="display:inline-block;width:fit-content;font-size:12px;background-color:rgba(50, 50, 50,0.3);border-radius:5px;color:#e87c46;border-radius:25px;padding: 5px 8px;">
                        <div style="float:left;display:inline-block">{{item.user_name}}&nbsp</div>
                        <div style="display:inline-block;float:left;">{{item.msg_info.msg}}</div>
                      </div>
                    </div>
                </div>
                </div>
              </div>
            </div>
        </div>  
      </div>
      <!-- 直播聊天室结束 -->

      <!-- 小店聊天室开始 -->
      <div v-if="chat_type == 'group_shop'">
        <template>
            <div class="content" v-if="footerNav == false" style="position:fixed;z-index:10;">
              <van-tabs offset-top="46" v-model="activeShop" sticky swipeable @click="onClick" 
              title-active-color="#12acf4" color="#12acf4" @change="handChange">
                  <div style="height:46px;"></div>
                  <van-tab v-for="item of classifyList" 
                  :title="item.label" :name="item.value"
                  :key="item.value" 
                  style="overflow-y:scroll;"
                  :style="{height:bodyHeight_shop + 'px'}" >
                    <div :style="{'height':!item.list.length?getHeight():''}" class="listContent" >
                    <van-pull-refresh v-model="item.refreshing" @refresh="onRefreshx(item)"  :style="{filter:darkMode ? 'invert(1) hue-rotate(180deg)':''}">
                          <van-list
                          :immediate-check="false"
                              v-model="item.loading"
                              :finished="item.finished"
                              finished-text="没有更多了"
                              @load="onLoad(item)"
                              >
                              <van-card
                                @click="clickShopDetail(item1.product_id)"
                                :centered="false"
                                class="van-hairline--bottom card"
                                v-for="(item1,index1) of item.list"
                                :key="item1.product_id"
                                :thumb="item1.product_img">
                              <template  slot="title">
                                  <span class="van-ellipsis title">{{item1.product_name}}</span>
                              </template>
                              <template slot="desc">
                                  <div class="van-multi-ellipsis--l2 desc">
                                      {{item1.product_desc}}
                                  </div>
                              </template>
                              <template slot="price">
                                  
                                  <span>
                                      <span class="num price">￥{{item1.product_price}}</span>
                                  </span>
                                  <span style="margin-left:0px">
                                      <span><svg style="transform:translateY(2px)" t="1590561013246" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2974" width="14" height="14"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="2975"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="2976"></path></svg></span>
                                      <span class="num vprice" style="padding-left:0">￥{{item1.product_price - (item1.product_price * (Number(item1.product_vip_rate)/100)).toFixed(1)}}</span>
                                      
                                  </span>
                              </template>
                              <!-- <template slot="num">
                                  <div style="display:flex;flex-direction:column;justify-content:center;position:relative;">
                                          <div>
                                          <svg  @click="handleAdd" t="1590560281620" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="19" height="19"><path d="M515.06377 0.009143a511.992381 511.992381 0 1 0 508.944807 511.992381A511.992381 511.992381 0 0 0 515.06377 0.009143z m323.042812 533.325397h-301.709796v301.709796a24.38059 24.38059 0 0 1-21.333016 21.333016 21.333016 21.333016 0 0 1-21.333016-21.333016v-301.709796h-304.75737a24.38059 24.38059 0 0 1-21.333016-21.333016 21.333016 21.333016 0 0 1 21.333016-21.333016h304.75737v-304.75737a21.333016 21.333016 0 0 1 21.333016-21.333016 24.38059 24.38059 0 0 1 21.333016 21.333016v304.75737h301.709796a21.333016 21.333016 0 0 1 21.333015 21.333016 24.38059 24.38059 0 0 1-21.333015 21.333016z" fill="#60F009" p-id="2585"></path></svg>
                                          </div>
                                          <div>
                                              <svg @click="handleDel(item,item1,index1)" t="1590560294988" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2833" width="19" height="19"><path d="M515.06377 0.009143a511.992381 511.992381 0 1 0 508.944807 511.992381A511.992381 511.992381 0 0 0 515.06377 0.009143z m323.042812 533.325397H188.973384a24.38059 24.38059 0 0 1-21.333016-21.333016 21.333016 21.333016 0 0 1 21.333016-21.333016h649.133198a21.333016 21.333016 0 0 1 21.333015 21.333016 24.38059 24.38059 0 0 1-21.333015 21.333016z" fill="#F00945" p-id="2834"></path></svg>
                                          </div>
                                  </div>
                              </template> -->
                          </van-card>
                          </van-list>
                    </van-pull-refresh>
                      <van-empty v-if="!item.list.length" description="没有更多商品" />
                      
                    </div>

                  </van-tab>
              </van-tabs>
            </div>
        </template>
       </div>
      <!-- 小店聊天室结束 -->
      
      <!-- 右边按钮 -->
      <div style="position:fixed;width:80px;top:0; right:0;z-index:10;" :style="{height:bodyHeight+'px'}">
        <div v-if="videoPlay" @click="fullScreen" style="width:45px; height:45px;position:absolute;top:55px;border-radius:50%;right:2px;">
          <svg style="margin-top:10px;margin-left:11px;" t="1590830343985" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2703" width="17" height="17"><path d="M385.849099 962.51015h-307.449249a15.372462 15.372462 0 0 1-15.372463-15.372462v-307.449249a30.744925 30.744925 0 0 0-61.489849 0v307.449249a76.862312 76.862312 0 0 0 76.862312 76.862312h307.449249a30.744925 30.744925 0 0 0 30.744925-30.744925 33.819417 33.819417 0 0 0-30.744925-30.744925zM945.406732 0.194h-304.374756a27.670432 27.670432 0 0 0-30.744925 30.744925 27.670432 27.670432 0 0 0 30.744925 30.744925h304.374756a15.372462 15.372462 0 0 1 15.372463 15.372463v307.449249a30.744925 30.744925 0 0 0 30.744925 30.744925 33.819417 33.819417 0 0 0 30.744925-30.744925v-307.449249A76.862312 76.862312 0 0 0 945.406732 0.194z" p-id="2704" fill="#ffffff"></path></svg> 
        </div>
        <div @click="group_live_user" style="width:45px; height:45px;position:absolute;bottom:245px;border-radius:50%;right:15px;">
          <img style="border-radius:50%;" :src="create_img" width="100%" height="100%"> 
        </div>
        <div @click="group_live_gli" style="width:45px; height:45px;position:absolute;bottom:185px;border-radius:50%;right:15px; background-color:#ff6795;">
          <svg style="margin-top:10px;margin-left:11px;" t="1592274530524" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3749" width="22" height="22"><path d="M1008.995228 367.590465L840.204205 15.004772a26.256381 26.256381 0 0 0-22.50547-15.003647H210.051051a30.007293 30.007293 0 0 0-26.256381 15.003647L18.754558 367.590465a153.787377 153.787377 0 0 0-18.754558 71.267321c0 97.523702 105.025526 172.541935 232.556521 172.541935a296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205 296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205c131.281907 0 232.556521-75.018233 232.556521-172.541935a153.787377 153.787377 0 0 0-18.754558-71.267321zM660.160447 648.908837a243.809256 243.809256 0 0 1-146.285554 48.761851 255.061991 255.061991 0 0 1-146.285553-48.761851 236.307433 236.307433 0 0 1-146.285554 48.761851 277.567461 277.567461 0 0 1-123.780084-33.758204v326.329311a30.007293 30.007293 0 0 0 26.256382 33.758205h780.189619a30.007293 30.007293 0 0 0 26.256381-33.758205v-326.329311a262.563814 262.563814 0 0 1-123.780084 33.758204 243.809256 243.809256 0 0 1-146.285553-48.761851z" fill="#FFFFFF" p-id="3750"></path></svg>
          <!-- <svg style="margin-top:10px;margin-left:11px;" t="1589885385821" class="icon" viewBox="0 0 1214 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2873" width="23" height="23"><path d="M1168.286967 217.220698h-136.667532V164.317137A167.527942 167.527942 0 0 0 952.264094 18.832345a176.345203 176.345203 0 0 0-163.119312 4.40863 383.550816 383.550816 0 0 0-136.667532 141.076162 149.893422 149.893422 0 0 0-26.451781 52.903561h-35.26904l-26.451781-52.903561C484.949307 27.649605 352.690405-34.071216 260.109174 18.832345a167.527942 167.527942 0 0 0-79.355341 145.484792 216.022873 216.022873 0 0 0 4.40863 52.903561H44.086301a44.086301 44.086301 0 0 0-44.086301 44.086301v242.474653a48.494931 48.494931 0 0 0 44.086301 44.086301h1124.200666a44.086301 44.086301 0 0 0 44.086301-44.086301V261.306999a39.677671 39.677671 0 0 0-44.086301-44.086301zM705.38081 195.177548a260.109174 260.109174 0 0 1 114.624382-114.624382 105.807122 105.807122 0 0 1 101.398492-8.81726A105.807122 105.807122 0 0 1 969.898614 168.725767a198.388353 198.388353 0 0 1-4.40863 48.494931h-273.335064zM242.474654 168.725767a127.850272 127.850272 0 0 1 48.49493-96.989861l39.677671-8.81726c61.720821 0 132.258902 52.903561 180.753833 132.258902 4.40863 4.40863 4.40863 13.22589 8.81726 22.04315H246.883284a198.388353 198.388353 0 0 1-4.40863-48.494931zM88.172601 653.675074v326.238625a44.086301 44.086301 0 0 0 44.086301 44.086301h445.271637v-414.411226H132.258902a44.086301 44.086301 0 0 0-44.086301 44.0863zM1080.114366 609.588774h-440.863006v414.411226h440.863006a44.086301 44.086301 0 0 0 44.086301-44.086301v-326.238625a44.086301 44.086301 0 0 0-44.086301-44.0863z" fill="#FFFFFF" p-id="2874"></path></svg> -->
        </div>
        <div @click="SwitchChat" style="width:45px; height:45px;position:absolute;bottom:125px;border-radius:50%;right:15px;background-color:#888888;">
          <svg v-if="chatlogo == 1 && chat_type == 'group_live'" style="margin-top:10px;margin-left:11px;" t="1590224964574" class="icon" viewBox="0 0 1131 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3198" width="23" height="23"><path d="M1131.354839 499.612903v-206.451613c0-37.16129-53.677419-70.193548-115.612904-70.193548h-276.645161l111.483871-177.548387a28.903226 28.903226 0 0 0-12.387097-41.290323 28.903226 28.903226 0 0 0-37.16129 8.258065l-132.129032 210.580645h-210.580645L330.322581 12.387097a33.032258 33.032258 0 0 0-41.290323-8.258065 33.032258 33.032258 0 0 0-8.258064 41.290323l111.483871 177.548387H115.612903C53.677419 222.967742 0 256 0 293.16129V949.677419c0 41.290323 53.677419 74.322581 115.612903 74.322581h900.129032c61.935484 0 115.612903-33.032258 115.612904-74.322581V499.612903z m-338.580645 144.516129l-326.193549 189.935484h-28.903226a24.774194 24.774194 0 0 1-12.387096-24.774193v-375.741936a20.645161 20.645161 0 0 1 12.387096-20.645161 20.645161 20.645161 0 0 1 28.903226 0l326.193549 185.806451a24.774194 24.774194 0 0 1 12.387096 24.774194 20.645161 20.645161 0 0 1-12.387096 20.645161z" fill="#ffffff" p-id="3199"></path></svg>
          <svg v-else-if="chatlogo == 0 && chat_type == 'group_live'" style="margin-top:9px;margin-left:10px;" t="1590650311293" class="icon" viewBox="0 0 1187 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4921" width="25" height="25"><path d="M591.781013 0C267.976308 0 0 227.035483 0 506.17747a461.514752 461.514752 0 0 0 93.047329 271.698201 212.14791 212.14791 0 0 1-3.721893 81.88165c-7.443786 59.550291-18.609466 126.544368 26.053252 156.319513a59.550291 59.550291 0 0 0 37.218932 7.443786 294.02956 294.02956 0 0 0 107.934901-33.497038 394.520675 394.520675 0 0 1 81.88165-26.053252 707.159701 707.159701 0 0 0 249.366842 48.384611c327.526598 0 595.502906-227.035483 595.502906-506.177471S919.307612 0 591.781013 0zM338.692278 591.781013a74.437863 74.437863 0 0 1 0-148.875726 74.437863 74.437863 0 1 1 0 148.875726z m256.810628 0a74.437863 74.437863 0 1 1 78.159757-70.71597 74.437863 74.437863 0 0 1-78.159757 70.71597z m256.810629 0A74.437863 74.437863 0 1 1 930.473291 521.065043a70.71597 70.71597 0 0 1-78.159756 70.71597z" fill="#ffffff" p-id="4922"></path></svg>
          <svg v-else-if="chatshop == 0 && chat_type == 'group_shop'" style="margin-top:10px;margin-left:10px;" t="1591323174884" class="icon" viewBox="0 0 1202 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3708" width="23" height="23"><path d="M1194.629095 167.496442a13.382826 13.382826 0 0 0-13.382827-6.691413h-970.254904L170.842885 23.63106a40.148479 40.148479 0 0 0-33.457065-23.419946H33.668916a30.111359 30.111359 0 0 0-33.457066 33.457066 30.111359 30.111359 0 0 0 33.457066 33.457065h80.296958l214.12522 695.906966a30.111359 30.111359 0 0 0 30.111359 23.419946h672.48702a33.457066 33.457066 0 0 0 33.457066-33.457065 36.802772 36.802772 0 0 0-33.457066-33.457066H384.968106l-23.419946-76.951251h685.869846a23.419946 23.419946 0 0 0 16.728533-13.382826l133.828262-448.32468a20.074239 20.074239 0 0 0-3.345706-13.382827zM465.265063 843.329169a90.334077 90.334077 0 1 0 0 177.322448 90.334077 90.334077 0 0 0 0-177.322448zM923.626863 843.329169a90.334077 90.334077 0 1 0 90.334077 90.334077 90.334077 90.334077 0 0 0-90.334077-90.334077z" fill="#FFFFFF" p-id="3709"></path></svg>
          <svg v-else="chat_type == 'group_shop'" style="margin-top:9px;margin-left:10px;" t="1590650311293" class="icon" viewBox="0 0 1187 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4921" width="25" height="25"><path d="M591.781013 0C267.976308 0 0 227.035483 0 506.17747a461.514752 461.514752 0 0 0 93.047329 271.698201 212.14791 212.14791 0 0 1-3.721893 81.88165c-7.443786 59.550291-18.609466 126.544368 26.053252 156.319513a59.550291 59.550291 0 0 0 37.218932 7.443786 294.02956 294.02956 0 0 0 107.934901-33.497038 394.520675 394.520675 0 0 1 81.88165-26.053252 707.159701 707.159701 0 0 0 249.366842 48.384611c327.526598 0 595.502906-227.035483 595.502906-506.177471S919.307612 0 591.781013 0zM338.692278 591.781013a74.437863 74.437863 0 0 1 0-148.875726 74.437863 74.437863 0 1 1 0 148.875726z m256.810628 0a74.437863 74.437863 0 1 1 78.159757-70.71597 74.437863 74.437863 0 0 1-78.159757 70.71597z m256.810629 0A74.437863 74.437863 0 1 1 930.473291 521.065043a70.71597 70.71597 0 0 1-78.159756 70.71597z" fill="#ffffff" p-id="4922"></path></svg>
          <!-- <svg v-else-if="chat_type == 'group_shop'" style="margin-top:10px;margin-left:10px;" t="1591323174884" class="icon" viewBox="0 0 1202 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3708" width="23" height="23"><path d="M1194.629095 167.496442a13.382826 13.382826 0 0 0-13.382827-6.691413h-970.254904L170.842885 23.63106a40.148479 40.148479 0 0 0-33.457065-23.419946H33.668916a30.111359 30.111359 0 0 0-33.457066 33.457066 30.111359 30.111359 0 0 0 33.457066 33.457065h80.296958l214.12522 695.906966a30.111359 30.111359 0 0 0 30.111359 23.419946h672.48702a33.457066 33.457066 0 0 0 33.457066-33.457065 36.802772 36.802772 0 0 0-33.457066-33.457066H384.968106l-23.419946-76.951251h685.869846a23.419946 23.419946 0 0 0 16.728533-13.382826l133.828262-448.32468a20.074239 20.074239 0 0 0-3.345706-13.382827zM465.265063 843.329169a90.334077 90.334077 0 1 0 0 177.322448 90.334077 90.334077 0 0 0 0-177.322448zM923.626863 843.329169a90.334077 90.334077 0 1 0 90.334077 90.334077 90.334077 90.334077 0 0 0-90.334077-90.334077z" fill="#FFFFFF" p-id="3709"></path></svg> -->
        </div>
        <div @click="group_live_GroupSharing" style="width:45px; height:45px;position:absolute;bottom:65px;border-radius:50%;right:15px;background-color:#888888;">
          <svg style="margin-top:10px;margin-left:11px;" t="1589885465150" class="icon" viewBox="0 0 1050 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2996" width="23" height="23"><path d="M1038.755002 378.319821L626.418154 7.980245c-11.453801-7.635868-19.089669-11.453801-30.54347-3.817934a19.089669 19.089669 0 0 0-15.271735 22.907603v209.986358A534.510728 534.510728 0 0 0 11.730816 645.575186a542.146596 542.146596 0 0 0 49.633139 362.703708 19.089669 19.089669 0 0 0 22.907603 15.271735h7.635868a30.54347 30.54347 0 0 0 19.089668-26.725536 347.431973 347.431973 0 0 1 11.453802-87.812477 446.698252 446.698252 0 0 1 458.152053-347.431974v206.168424a19.089669 19.089669 0 0 0 15.271735 22.907603h11.453801l19.089669-7.635868 412.336848-370.339576a22.907603 22.907603 0 0 0 0-38.179337z" fill="#FFFFFF" p-id="2997"></path></svg>
        </div>
      </div>
       <!-- 聊天记录 -->
       <div v-if="chatStact" id="chatBox" style="position:fixed;z-index:5;overflow-y:scroll;top:0;bottom:0;left:0;right:0;" :style="{backgroundImage:'url(' + backgroundUrl + ')',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',height:bodyHeight+'px',filter:'invert(1) hue-rotate(180deg)'}" >
          <div :style="{height:chatHeight}"></div>
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div >
              <div v-if="state === true">
                <div v-for="(item,index) in chatRexord"  :key="index" style="padding:20px 0px 0px 0px;width:100%;float:left; margin-bottom:15px;position:relative;">
                  <div style="width:100%;">
                    <img v-if="item.texts !== 3"  @click="chat(item.user_id)" :src="item.url" alt="" style="width:40px; height:40px; border-radius:6px; float:left; margin-left:15px;margin-top:5px;">
                    <div v-if="item.texts !== 3" style="font-size:12px; position:absolute; left:71px;line-height:20px;">{{item.user_name}}</div>
                    <div style="position:absolute; text-align:center; width:100%; font-size:12px;top:0px;">
                      <p @click="gotouchstart(item)" style="display: inline-block">{{item.msg_info.time}}</p>
                    </div>
                    <!-- 文字消息 -->
                    <div v-if="item.texts === 0" style="padding-left:69px;">
                      <div class="record">{{item.msg_info.msg}}</div>
                    </div>
                    <!--图片消息 -->
                    <div v-else-if="item.texts === 1" style="padding-left:69px;">
                      <div>
                        <img v-image-preview :src="item.msg_info.url" alt="" id="imgss" style="left:62px; margin-top:25px;">
                      </div>
                    </div>

                    <!-- 文件消息 -->
                    <div v-else-if="item.texts === 2" style="padding-left:69px;">
                      <div class="record" style="width:60%;word-break:break-all;">
                          <a :href="iframeUrl" @click="download(item)" :download="urlname" style="color:#111;">
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
                          <!-- <iframe :src="iframeUrl" frameborder="0" width="0" height="0"></iframe> -->
                          </a>
                      </div>
                    </div>
                    <!-- 系统消息 -->
                    <div v-else-if="item.texts === 3" style="text-align:center;">
                      <div style="font-size:12px; color:#555; padding-top:0px; text-aling:center;">
                        <div>{{item.msg_info.msg}}</div>
                      </div>
                    </div>
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
                      <div style="padding-top:28px;cursor: pointer;float:left;">
                          <!-- <video id="video" controls :poster="item.videolook">
                            <source :src="item.msg_info.body.url" type="video/mp4">
                            <source :src="item.msg_info.body.url" type="video/webm">
                            <source :src="item.msg_info.body.url" type="video/ogg">
                          你的浏览器不支持该功能
                        </video> -->

                        <videoplay  :url="item.msg_info.body.url" :poster="item.videolook"></videoplay>
                        <!-- <video id="my-player" class="video-js vjs-default-skin vjs-big-play-centered" controls
                              :poster="item.videolook" width="500" height="400" data-setup='{}'>
                              <source :src='item.msg_info.body.url +"&flv=1"' type='rtmp/flv'/>
                              <source :src="item.msg_info.body.url" type="video/mp4">
                          </video> -->
                      </div>
                    </div>
                    <!-- 联系人名片 -->
                    <div v-else-if="item.texts === 6" style="padding-left:69px;">
                      <div class="record" style="height:80px;width:200px;padding:0px 10px 0px 15px;" @click="card_name(item)">
                        <div style="border-bottom:1px solid #f5f5f5;line-height:30px;font-size:12px;color:#999999">联系人</div>
                        <div style="float:left;"><img :src="item.msg_info.body.card_url" style="width:30px; height:30px; border-radius:5px;margin-top:9px;" alt=""></div>
                        <div style="width:140px;float:left;padding-left:12px;font-size:15px;padding-top:13px;overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">{{item.msg_info.body.card_name}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              

              <div  v-else-if="texta === true">
                <!-- 只显示文字聊天信息 -->
                <div v-for="(item,index) in textz" :key="index" style="padding:20px 0px 0px 0px;width:100%;float:left; margin-bottom:15px;position:relative;">
                    <img  @click="chat(item.user_id)" :src="item.url" alt="" style="width:40px; height:40px; border-radius:6px; float:left; margin-left:15px;margin-top:5px;">
                    <div style="font-size:12px; position:absolute; left:71px;line-height:20px;">{{item.user_name}}</div>
                    <div style="position:absolute; text-align:center; width:100%; font-size:12px;top:0px;">
                      <p @click="gotouchstart(item)" style="display: inline-block">{{item.msg_info.time}}</p>
                    </div>
                    <div style="padding-left:69px;">
                      <div class="record">{{item.msg_info.msg}}</div>
                    </div>
                </div>
              </div>
              <!-- 只显示图片聊天信息 -->
              <div v-else-if="imga === true">
                <div v-for="(item,index) in imgz" :key="index" style="padding:20px 0px 0px 0px;width:100%;float:left; margin-bottom:15px;position:relative;">
                  <img   @click="chat(item.user_id)" :src="item.url" alt="" style="width:40px; height:40px; border-radius:6px; float:left; margin-left:15px;margin-top:5px;">
                    <div style="font-size:12px; position:absolute; left:71px;line-height:20px;">{{item.user_name}}</div>
                    <div style="position:absolute; text-align:center; width:100%; font-size:12px;top:0px;">
                      <p @click="gotouchstart(item)" style="display: inline-block">{{item.msg_info.time}}</p>
                    </div>
                    <div style="padding-left:69px;">
                      <div>
                        <img v-image-preview :src="item.msg_info.url" alt="" id="imgss" style="left:62px; margin-top:25px;">
                      </div>
                    </div>
                </div>
              </div>
              <!-- 只显示文件聊天信息 -->
              <div v-else-if="filea === true">
                <div v-for="(item,index) in filez" :key="index" style="padding:20px 0px 0px 0px;width:100%;float:left; margin-bottom:15px;position:relative;">
                  <img  @click="chat(item.user_id)" :src="item.url" alt="" style="width:40px; height:40px; border-radius:6px; float:left; margin-left:15px;margin-top:5px;">
                  <div style="font-size:12px; position:absolute; left:71px;line-height:20px;">{{item.user_name}}</div>
                  <div style="position:absolute; text-align:center; width:100%; font-size:12px;top:0px;">
                    <p @click="gotouchstart(item)" style="display: inline-block">{{item.msg_info.time}}</p>
                  </div>
                    <div style="padding-left:69px;">
                      <div class="record" style="width:60%;word-break:break-all;">
                          <a :href="iframeUrl" @click="download(item)" :download="urlname" style="color:#111;">
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
                          </a>
                      </div>
                    </div>
                </div>
              </div>
              <!-- 只显示视频聊天信息 -->
              <div v-else-if="videoa === true">
                <div v-for="(item,index) in videoz" :key="index" style="padding:20px 0px 0px 0px;width:100%;float:left; margin-bottom:15px;position:relative;">
                  <img   @click="chat(item.user_id)" :src="item.url" alt="" style="width:40px; height:40px; border-radius:6px; float:left; margin-left:15px;margin-top:5px;">
                    <div style="font-size:12px; position:absolute; left:71px;line-height:20px;">{{item.user_name}}</div>
                    <div style="position:absolute; text-align:center; width:100%; font-size:12px;top:0px;">
                      <p @click="gotouchstart(item)" style="display: inline-block">{{item.msg_info.time}}</p>
                    </div>
                  <div style="padding-left:69px;">
                      <div style="padding-top:28px;cursor: pointer;float:left;">
                            <videoplay :url="item.msg_info.body.url" :poster="item.videolook"></videoplay>
                      </div>
                  </div>
                </div>
              </div>
              <!-- 只显示语音聊天信息 -->
              <div v-else-if="recorda === true">
                <div v-for="(item,index) in recordz" :key="index" style="padding:20px 0px 0px 0px;width:100%;float:left; margin-bottom:15px;position:relative;">
                  <img   @click="chat(item.user_id)" :src="item.url" alt="" style="width:40px; height:40px; border-radius:6px; float:left; margin-left:15px;margin-top:5px;">
                    <div style="font-size:12px; position:absolute; left:71px;line-height:20px;">{{item.user_name}}</div>
                    <div style="position:absolute; text-align:center; width:100%; font-size:12px;top:0px;">
                      <p @click="gotouchstart(item)" style="display: inline-block">{{item.msg_info.time}}</p>
                    </div>
                  <div style="padding-left:69px;">
                      <div class="recordx" style="disply:flex;background-color:#12adf5; width:134px;" @click="handleClickPlayAudio(item)">
                          <svg v-if="play==true || item.sign!==sign" style="padding-top:2px;cursor: pointer;" t="1588670530486" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2878" width="16" height="16"><path d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m216 528l-372 216h-20a32 32 0 0 1-8-20V300a32 32 0 0 1 8-20h20l372 216a20 20 0 0 1 0 32z" fill="#FFFFFF" p-id="2879"></path></svg>
                          <svg v-if="suspend==true && item.sign==sign" style="padding-top:2px;cursor: pointer;" t="1588671664887" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3073" width="16" height="16"><path d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0z m-76 684a44 44 0 0 1-40 40h-40a44 44 0 0 1-40-40V340a40 40 0 0 1 40-40h40a40 40 0 0 1 40 40z m272 0a44 44 0 0 1-40 40h-40a44 44 0 0 1-40-40V340a40 40 0 0 1 40-40h40a40 40 0 0 1 40 40z" fill="#FFFFFF" p-id="3074"></path></svg>
                          <img v-if="gif==true &&item.sign==sign" src="../../assets/images/yuyin.gif" style="position:absolute; top:0px; left:26px; width:70px; height:34px;">
                          <span style="float:right; color:#fff;">{{item.msg_info.body.time_sec | filterTime_sec}}”</span>
                      </div>
                  </div>
                </div>
              </div>
            <!-- <div style="height:80px; padding:0; margin:0; width:100%;float:left;" v-show="zhanwei1"></div> -->
          </div>
        </van-pull-refresh>
              <div style="height:50px;width:100%;float:left;"></div>
      </div>

      <!-- 头部导航栏 -->
      <!-- <van-tabbar v-if="footerNav == true" v-model="active" style="position:fixed; top:45px; z-index:999;" :style="{opacity:opacityNav}">
        <van-tabbar-item @click="nav_button" v-model="activex" style="width:100%;">
          <div style="text-align:center; margin:0; padding:0; margin-top:-7px; margin-bottom:3px;">
            <svg v-if="active !== 0" t="1587960164461" class="icon" viewBox="0 0 1190 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2154" width="16" height="16"><path d="M849.85052 279.506393H343.717321a26.439794 26.439794 0 0 0 0 52.879588h234.181033v449.476497a26.439794 26.439794 0 0 0 26.439794 26.439794 30.216907 30.216907 0 0 0 26.439794-26.439794V332.385981h219.072578a26.439794 26.439794 0 0 0 0-52.879588z" p-id="2155"></path><path d="M596.783921 0C268.175053 0 0 226.626805 0 506.133199a449.476497 449.476497 0 0 0 94.427836 271.952166 256.843713 256.843713 0 0 1-3.777114 90.650722c-7.554227 60.433815-18.885567 120.86763 22.662681 147.307424a41.548248 41.548248 0 0 0 30.216907 7.554226 343.717321 343.717321 0 0 0 109.536289-30.216907 215.295465 215.295465 0 0 1 86.873609-30.216907 721.428664 721.428664 0 0 0 256.843713 49.102474c328.608868 0 593.006807-226.626805 593.006807-506.133198S925.392788 0 596.783921 0z m0 959.386809a600.561034 600.561034 0 0 1-234.181032-45.325361c-30.216907-11.33134-67.988042 3.777113-132.19897 30.216908a483.470518 483.470518 0 0 1-86.873609 30.216907c-11.33134-11.33134-3.777113-67.988042 0-98.204949s15.108454-101.982062-7.554227-128.421856a415.482476 415.482476 0 0 1-83.096495-241.735259c0-249.289486 241.735259-453.253611 543.904333-453.253611s540.127219 203.964125 540.127219 453.253611-241.735259 453.253611-540.127219 453.25361z" p-id="2156"></path></svg>
            <svg v-if="active == 0 && active !== ''" t="1588044838553" class="icon" viewBox="0 0 1190 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3048" width="16" height="16"><path d="M849.85052 279.506393H343.717321a26.439794 26.439794 0 0 0 0 52.879588h234.181033v449.476497a26.439794 26.439794 0 0 0 26.439794 26.439794 30.216907 30.216907 0 0 0 26.439794-26.439794V332.385981h219.072578a26.439794 26.439794 0 0 0 0-52.879588z" fill="#12ACF4" p-id="3049"></path><path d="M596.783921 0C268.175053 0 0 226.626805 0 506.133199a449.476497 449.476497 0 0 0 94.427836 271.952166 256.843713 256.843713 0 0 1-3.777114 90.650722c-7.554227 60.433815-18.885567 120.86763 22.662681 147.307424a41.548248 41.548248 0 0 0 30.216907 7.554226 343.717321 343.717321 0 0 0 109.536289-30.216907 215.295465 215.295465 0 0 1 86.873609-30.216907 721.428664 721.428664 0 0 0 256.843713 49.102474c328.608868 0 593.006807-226.626805 593.006807-506.133198S925.392788 0 596.783921 0z m0 959.386809a600.561034 600.561034 0 0 1-234.181032-45.325361c-30.216907-11.33134-67.988042 3.777113-132.19897 30.216908a483.470518 483.470518 0 0 1-86.873609 30.216907c-11.33134-11.33134-3.777113-67.988042 0-98.204949s15.108454-101.982062-7.554227-128.421856a415.482476 415.482476 0 0 1-83.096495-241.735259c0-249.289486 241.735259-453.253611 543.904333-453.253611s540.127219 203.964125 540.127219 453.253611-241.735259 453.253611-540.127219 453.25361z" fill="#12ACF4" p-id="3050"></path></svg>
          </div>
          <div style="opacity:1;">
            文字
          </div>
        </van-tabbar-item>
        <van-tabbar-item  @click="nav_button" v-model="activey" style="width:100%;">
          <div style="text-align:center; margin:0; padding:0; margin-top:-7px; margin-bottom:3px;">
            <svg v-if="active !== 1" t="1587960236078" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2809" width="15" height="15"><path d="M850.252708 0H173.747292A173.747292 173.747292 0 0 0 0 173.747292V850.252708a177.444043 177.444043 0 0 0 173.747292 173.747292H850.252708a177.444043 177.444043 0 0 0 173.747292-173.747292V173.747292A177.444043 177.444043 0 0 0 850.252708 0zM173.747292 51.754513H850.252708a121.99278 121.99278 0 0 1 121.992779 121.992779v447.30686c-11.090253 25.877256-66.541516 155.263538-162.657039 170.050541s-144.173285-44.361011-225.501805-155.263538-184.837545-184.837545-288.346571-184.837545-192.231047 73.935018-243.985559 125.689531V173.747292a121.99278 121.99278 0 0 1 121.992779-121.992779zM850.252708 972.245487H173.747292A121.99278 121.99278 0 0 1 51.754513 850.252708v-192.231047C73.935018 628.447653 170.050542 506.454874 295.740072 502.758123s170.050542 55.451264 247.682311 162.657039 170.050542 177.444043 251.379061 177.444044h22.180505a266.166065 266.166065 0 0 0 155.263538-110.902527V850.252708a121.99278 121.99278 0 0 1-121.992779 121.992779z" p-id="2810"></path><path d="M731.956679 373.371841a136.779783 136.779783 0 0 0 0-273.559567 140.476534 140.476534 0 0 0-136.779784 136.779784 140.476534 140.476534 0 0 0 136.779784 136.779783z m0-221.805054a85.025271 85.025271 0 0 1 85.02527 85.025271 85.025271 85.025271 0 0 1-85.02527 85.025271 85.025271 85.025271 0 0 1 0-170.050542z" p-id="2811"></path></svg>
            <svg v-if="active == 1" t="1588044563881" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2223" width="15" height="15"><path d="M850.252708 1024H173.747292A177.444043 177.444043 0 0 1 0 850.252708V173.747292A173.747292 173.747292 0 0 1 173.747292 0H850.252708a177.444043 177.444043 0 0 1 173.747292 173.747292V850.252708a177.444043 177.444043 0 0 1-173.747292 173.747292zM173.747292 51.754513a121.99278 121.99278 0 0 0-121.992779 121.992779V850.252708a121.99278 121.99278 0 0 0 121.992779 121.992779H850.252708a121.99278 121.99278 0 0 0 121.992779-121.992779V173.747292A121.99278 121.99278 0 0 0 850.252708 51.754513z" fill="#12ACF4" p-id="2224"></path><path d="M731.956679 373.371841a140.476534 140.476534 0 0 1-136.779784-136.779783 140.476534 140.476534 0 0 1 136.779784-136.779784 136.779783 136.779783 0 0 1 0 273.559567z m0-221.805054a85.025271 85.025271 0 0 0 0 170.050542 85.025271 85.025271 0 0 0 85.02527-85.025271 85.025271 85.025271 0 0 0-85.02527-85.025271zM794.801444 842.859206c-81.32852 0-166.353791-59.148014-251.379061-177.444044s-158.960289-162.65704-247.682311-162.657039-247.68231 158.960289-247.68231 162.657039l-44.361011-29.574007c7.393502-7.393502 121.99278-181.140794 292.043321-184.837545 103.509025 0 199.624549 59.148014 288.346571 184.837545s158.960289 162.65704 225.501805 155.263538 162.65704-170.050542 162.657039-173.747292l48.057762 18.483754c-3.696751 7.393502-70.238267 188.534296-203.3213 207.018051z" fill="#12ACF4" p-id="2225"></path></svg>
          </div>
          <div style="opacity:1;">
            图片
          </div>
        </van-tabbar-item>
        <van-tabbar-item @click="nav_button" v-model="activez"  style="width:100%;">
          <div style="text-align:center; margin:0; padding:0; margin-top:-7px; margin-bottom:3px;">
            <svg v-if="active !== 2" t="1587960201104" class="icon" viewBox="0 0 1171 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2462" width="15" height="15"><path d="M1045.142861 1024H122.278663a122.205761 122.205761 0 0 1-122.205761-126.419753V130.633745A126.419753 126.419753 0 0 1 122.278663 0h518.320988a117.99177 117.99177 0 0 1 113.777778 92.707819h290.765432a130.633745 130.633745 0 0 1 126.419753 130.633745v674.238683a126.419753 126.419753 0 0 1-126.419753 126.419753zM122.278663 58.995885a67.423868 67.423868 0 0 0-63.209876 71.63786v766.946502a67.423868 67.423868 0 0 0 63.209876 67.423868h922.864198a67.423868 67.423868 0 0 0 67.423868-67.423868v-674.238683a71.63786 71.63786 0 0 0-67.423868-71.63786h-341.333333V126.419753a67.423868 67.423868 0 0 0-63.209877-67.423868z" p-id="2463"></path></svg>
            <svg v-if="active == 2" t="1588045101277" class="icon" viewBox="0 0 1171 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3251" width="15" height="15"><path d="M1045.142861 1024H122.278663a122.205761 122.205761 0 0 1-122.205761-126.419753V130.633745A126.419753 126.419753 0 0 1 122.278663 0h518.320988a117.99177 117.99177 0 0 1 113.777778 92.707819h290.765432a130.633745 130.633745 0 0 1 126.419753 130.633745v674.238683a126.419753 126.419753 0 0 1-126.419753 126.419753zM122.278663 58.995885a67.423868 67.423868 0 0 0-63.209876 71.63786v766.946502a67.423868 67.423868 0 0 0 63.209876 67.423868h922.864198a67.423868 67.423868 0 0 0 67.423868-67.423868v-674.238683a71.63786 71.63786 0 0 0-67.423868-71.63786h-341.333333V126.419753a67.423868 67.423868 0 0 0-63.209877-67.423868z" fill="#12ACF4" p-id="3252"></path></svg>
          </div>
          <div style="opacity:1;">
            文件
          </div>
        </van-tabbar-item>
        <van-tabbar-item @click="nav_button" v-model="activev" style="width:100%;">
          <div style="text-align:center; margin:0; padding:0; margin-top:-7px; margin-bottom:3px;">
            <svg v-if="active !== 3" t="1587960221619" class="icon" viewBox="0 0 1147 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2633" width="15" height="15"><path d="M1079.565891 0H67.472868A71.44186 71.44186 0 0 0 0 67.472868v889.054264a71.44186 71.44186 0 0 0 67.472868 67.472868h1012.093023a71.44186 71.44186 0 0 0 67.472869-67.472868V67.472868A71.44186 71.44186 0 0 0 1079.565891 0z m11.906977 956.527132a11.906977 11.906977 0 0 1-11.906977 11.906977H67.472868a11.906977 11.906977 0 0 1-11.906977-11.906977V67.472868a11.906977 11.906977 0 0 1 11.906977-11.906977h1012.093023a11.906977 11.906977 0 0 1 11.906977 11.906977z" p-id="2634"></path><path d="M821.581395 488.186047L420.713178 257.984496c-11.906977-7.937984-19.844961-7.937984-27.782945 0a19.844961 19.844961 0 0 0-15.875969 23.813954v460.4031a19.844961 19.844961 0 0 0 15.875969 23.813954h27.782945l400.868217-230.201551a27.782946 27.782946 0 0 0 11.906977-23.813953 23.813953 23.813953 0 0 0-11.906977-23.813953z m-388.96124 206.387596V329.426357l317.51938 182.573643z" p-id="2635"></path></svg>
            <svg v-if="active == 3" t="1588044764551" class="icon" viewBox="0 0 1147 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2718" width="15" height="15"><path d="M1079.565891 0H67.472868A71.44186 71.44186 0 0 0 0 67.472868v889.054264a71.44186 71.44186 0 0 0 67.472868 67.472868h1012.093023a71.44186 71.44186 0 0 0 67.472869-67.472868V67.472868A71.44186 71.44186 0 0 0 1079.565891 0z m11.906977 956.527132a11.906977 11.906977 0 0 1-11.906977 11.906977H67.472868a11.906977 11.906977 0 0 1-11.906977-11.906977V67.472868a11.906977 11.906977 0 0 1 11.906977-11.906977h1012.093023a11.906977 11.906977 0 0 1 11.906977 11.906977z" fill="#12ACF4" p-id="2719"></path><path d="M821.581395 488.186047L420.713178 257.984496c-11.906977-7.937984-19.844961-7.937984-27.782945 0a19.844961 19.844961 0 0 0-15.875969 23.813954v460.4031a19.844961 19.844961 0 0 0 15.875969 23.813954h27.782945l400.868217-230.201551a27.782946 27.782946 0 0 0 11.906977-23.813953 23.813953 23.813953 0 0 0-11.906977-23.813953z m-388.96124 206.387596V329.426357l317.51938 182.573643z" fill="#12ACF4" p-id="2720"></path></svg>
          </div>
          <div style="opacity:1;">
            视频
          </div>
        </van-tabbar-item>
        <van-tabbar-item @click="nav_button" v-model="activew" style="width:100%;">
          <div style="text-align:center; margin:0; padding:0; margin-top:-7px; margin-bottom:3px;">
            <svg v-if="active !== 4" t="1590832959140" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3482" width="16" height="16"><path d="M902.838077 481.721536a25.960139 25.960139 0 0 0-28.844599-28.844599 28.844599 28.844599 0 0 0-28.844599 28.844599 331.71289 331.71289 0 0 1-98.071637 236.525713 320.175051 320.175051 0 0 1-233.641253 98.071637A334.59735 334.59735 0 0 1 178.838638 484.605996a25.960139 25.960139 0 0 0-28.844599-28.844599 25.960139 25.960139 0 0 0-28.844599 28.844599 389.402089 389.402089 0 0 0 363.441949 386.517628v95.187178H291.332575a25.960139 25.960139 0 0 0-28.844599 28.844599 28.844599 28.844599 0 0 0 28.844599 28.844599h441.322367a28.844599 28.844599 0 0 0 28.844599-28.844599 25.960139 25.960139 0 0 0-28.844599-28.844599h-190.374354v-95.187178a389.402089 389.402089 0 0 0 360.557489-389.402088z" p-id="3483" fill="#222222"></path><path d="M510.551529 755.745228h5.768919a250.948013 250.948013 0 0 0 250.948013-253.832473V253.849202A250.948013 250.948013 0 0 0 516.320448 0.01673h-5.768919a250.948013 250.948013 0 0 0-253.832473 253.832472v248.063553a250.948013 250.948013 0 0 0 253.832473 253.832473zM314.408254 253.849202A193.258814 193.258814 0 0 1 510.551529 57.705928h5.768919a193.258814 193.258814 0 0 1 193.258815 196.143274v248.063553a193.258814 193.258814 0 0 1-193.258815 196.143275h-5.768919a193.258814 193.258814 0 0 1-196.143275-196.143275z" p-id="3484" fill="#222222"></path></svg>
            <svg v-if="active == 4" t="1590999331403" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4342" width="16" height="16"><path d="M902.838077 481.721536a25.960139 25.960139 0 0 0-28.844599-28.844599 28.844599 28.844599 0 0 0-28.844599 28.844599 331.71289 331.71289 0 0 1-98.071637 236.525713 320.175051 320.175051 0 0 1-233.641253 98.071637A334.59735 334.59735 0 0 1 178.838638 484.605996a25.960139 25.960139 0 0 0-28.844599-28.844599 25.960139 25.960139 0 0 0-28.844599 28.844599 389.402089 389.402089 0 0 0 363.441949 386.517628v95.187178H291.332575a25.960139 25.960139 0 0 0-28.844599 28.844599 28.844599 28.844599 0 0 0 28.844599 28.844599h441.322367a28.844599 28.844599 0 0 0 28.844599-28.844599 25.960139 25.960139 0 0 0-28.844599-28.844599h-190.374354v-95.187178a389.402089 389.402089 0 0 0 360.557489-389.402088z" p-id="4343" fill="#12adf5"></path><path d="M510.551529 755.745228h5.768919a250.948013 250.948013 0 0 0 250.948013-253.832473V253.849202A250.948013 250.948013 0 0 0 516.320448 0.01673h-5.768919a250.948013 250.948013 0 0 0-253.832473 253.832472v248.063553a250.948013 250.948013 0 0 0 253.832473 253.832473zM314.408254 253.849202A193.258814 193.258814 0 0 1 510.551529 57.705928h5.768919a193.258814 193.258814 0 0 1 193.258815 196.143274v248.063553a193.258814 193.258814 0 0 1-193.258815 196.143275h-5.768919a193.258814 193.258814 0 0 1-196.143275-196.143275z" p-id="4344" fill="#12adf5"></path></svg>
          </div>
          <div style="opacity:1;">
            语音
          </div>
        </van-tabbar-item>
      </van-tabbar> -->

      <!-- 底部输入框 -->
      <div :style="{opacity:headerTou}" class="foot" style="background-color:#fff;"> 
      <footer v-if="backColor=='#f5f5f5'" class="footer" style="display:flex;justify-content:space-between;align-items:center;box-sizing:border-box;padding:0 10px">
          <span id="sound" style="padding:0;margin:0">
              <svg v-if="iconyy == true" t="1589172760157" class="icon" @click="handClickCutChatMode" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3186" width="25" height="25"><path d="M512 0A512 512 0 1 0 1024 512 512.398444 512.398444 0 0 0 512 0z m0 944.311284A432.311284 432.311284 0 1 1 944.311284 512 433.108171 433.108171 0 0 1 512 944.311284z" fill="#999999" p-id="3187"></path><path d="M278.910506 375.333852a39.844358 39.844358 0 0 0-6.773541 56.180545 127.900389 127.900389 0 0 1 0 159.377432A39.844358 39.844358 0 0 0 278.910506 648.666148a39.844358 39.844358 0 0 0 25.101945 8.765759 39.844358 39.844358 0 0 0 31.0786-15.140856 208.385992 208.385992 0 0 0 0-260.582102A39.844358 39.844358 0 0 0 278.910506 375.333852zM435.897276 300.028016a39.844358 39.844358 0 0 0-7.171984 55.782101c5.179767 6.773541 125.509728 166.150973 0 310.785992a39.844358 39.844358 0 0 0 4.382879 56.180545 39.844358 39.844358 0 0 0 25.898833 9.961089 39.844358 39.844358 0 0 0 30.281712-13.945525c133.478599-155.79144 58.96965-337.880156 0-411.990662a39.844358 39.844358 0 0 0-53.39144-6.77354zM611.610895 244.245914a39.844358 39.844358 0 0 0-5.179767 56.180545 336.286381 336.286381 0 0 1 0 424.342413 39.844358 39.844358 0 0 0 7.171985 55.782101 39.844358 39.844358 0 0 0 24.305058 8.367315 39.844358 39.844358 0 0 0 31.477043-15.5393c207.589105-270.144747 0-521.562646 0-523.953307a39.844358 39.844358 0 0 0-57.774319-5.179767z" fill="#999999" p-id="3188"></path></svg>
              <svg v-if="iconyy == false" t="1589172690551" class="icon" @click="handClickCutChatMode" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3022" width="25" height="25"><path d="M512 0a512 512 0 0 0 0 1024 512 512 0 0 0 0-1024z m0 944a432 432 0 1 1 432-432 432 432 0 0 1-432 432z" fill="#989898" p-id="3023"></path><path d="M280 332H228a40 40 0 0 0-40 40 44 44 0 0 0 40 40H280a44 44 0 0 0 40-40 40 40 0 0 0-40-40zM404 412h52a44 44 0 0 0 40-40 40 40 0 0 0-40-40h-52a40 40 0 0 0-40 40 44 44 0 0 0 40 40zM628 332h-52a40 40 0 0 0-40 40 44 44 0 0 0 40 40h52a40 40 0 0 0 40-40 36 36 0 0 0-40-40zM744 412h48a40 40 0 0 0 40-40 36 36 0 0 0-40-40h-48a36 36 0 0 0-40 40 40 40 0 0 0 40 40zM280 492H228a40 40 0 0 0-40 40 44 44 0 0 0 40 40H280a44 44 0 0 0 40-40 40 40 0 0 0-40-40zM456 572a44 44 0 0 0 40-40 40 40 0 0 0-40-40h-52a40 40 0 0 0-40 40 44 44 0 0 0 40 40zM628 492h-52a40 40 0 0 0-40 40 44 44 0 0 0 40 40h52a40 40 0 0 0 40-40 36 36 0 0 0-40-40zM792 492h-48a36 36 0 0 0-40 40 40 40 0 0 0 40 40h48a40 40 0 0 0 40-40 36 36 0 0 0-40-40zM592 692h-160a36 36 0 0 0-40 40 40 40 0 0 0 40 40h160a44 44 0 0 0 40-40 40 40 0 0 0-40-40z" fill="#989898" p-id="3024"></path></svg>
              <!-- <img src="../../assets/images/chat1.png" @click="handClickCutChatMode" alt="" style="width:28px; height:28px;"> -->
          </span>
          <div style="flex:1;box-sizing:border-box;padding:0 10px;display:flex;align-items:center">
            <textarea v-if="!isShowAudioContent" @blur="sendOutsBlur"  @focus="sendOuts" v-model="txt" rows="3"  style="overflowY:hidden;  resize: none;width:100%;"></textarea>
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
              <button @mouseleave="text" style="width:45px; color:#fff; border-radius:4px;  font-size:13px; height:28px;  background-color:#12adf5; border:none;"> 发送</button>
              </div>
          </div>
        </footer>
      <div style="background-color:#fff;margin:0 auto;" v-show="add">
        <van-row style="text-align:center; padding-top:16px;margin:0 auto;">
          <van-col span="6">
            <van-uploader :after-read="SendPictures" accept="image/*">
            <div style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;margin:0 auto;">
              <svg style="width:24px; height:24px; margin-top:9px;" t="1589178689127" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3668" width="24" height="24"><path d="M912.59709 0H111.40291a107.948556 107.948556 0 0 0-107.948556 107.948556v808.102888a107.948556 107.948556 0 0 0 107.948556 107.948556h801.19418a107.948556 107.948556 0 0 0 107.948556-107.948556V107.948556a107.948556 107.948556 0 0 0-107.948556-107.948556zM111.40291 43.179422h801.19418a64.769133 64.769133 0 0 1 64.769134 64.769134v518.153067c-9.067679 21.589711-67.359899 159.547965-166.240776 172.71769-69.302973 9.499473-145.946447-43.179422-227.98735-158.46848-86.358845-121.550074-182.433059-183.080751-282.609319-183.080751h-4.749736c-111.834704 2.158971-200.784314 80.313725-249.145267 134.072106V107.948556a64.769133 64.769133 0 0 1 64.769134-64.769134z m801.19418 937.641156H111.40291a64.769133 64.769133 0 0 1-64.769134-64.769134V659.565676c19.214843-26.555345 119.175206-156.741303 250.008855-159.332069h3.670251c86.358845 0 169.047438 55.485558 247.633987 165.161291C632.578537 783.274721 715.914822 841.998735 795.364959 841.998735a178.331014 178.331014 0 0 0 21.589711-1.51128c73.620915-10.147164 126.947502-69.734767 160.411554-121.981868v196.682269a64.769133 64.769133 0 0 1-64.769134 65.632722z" p-id="3669"></path><path d="M734.697871 368.320472a133.424415 133.424415 0 1 0-132.560827-133.424415 132.992621 132.992621 0 0 0 132.560827 133.424415z m0-223.669407a90.244993 90.244993 0 1 1-89.381405 90.244992 89.813198 89.813198 0 0 1 89.381405-90.244992z" p-id="3670"></path></svg>
              <p style="font-size:12px;">照片</p>
            </div>
            </van-uploader>
          </van-col>
          <van-col span="6">
            <van-uploader :after-read="changeVideo" accept="video/*">
            <div style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;margin:0 auto;">
              <svg style="width:24px; height:24px; margin-top:9px;" t="1589178597653" class="icon" viewBox="0 0 1588 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3391" width="24" height="24"><path d="M1569.185185 18.962963a23.703704 23.703704 0 0 0-33.185185 0l-440.888889 251.259259v-142.222222A128 128 0 0 0 967.111111 0H128A128 128 0 0 0 0 128v768a128 128 0 0 0 128 128h839.111111a128 128 0 0 0 128-128v-142.222222l440.888889 256h33.185185c9.481481-9.481481 18.962963-18.962963 18.962963-28.444445V47.407407a33.185185 33.185185 0 0 0-18.962963-28.444444zM1028.740741 896a61.62963 61.62963 0 0 1-61.62963 61.62963H128a61.62963 61.62963 0 0 1-61.62963-61.62963V128a61.62963 61.62963 0 0 1 61.62963-61.62963h839.111111a61.62963 61.62963 0 0 1 61.62963 61.62963z m493.037037 28.444444l-426.666667-246.518518v-331.851852l426.666667-241.777778z" p-id="3392"></path></svg>
              <p style="font-size:12px;">视频</p>
            </div>
            </van-uploader>
          </van-col>
          <!-- <van-col span="6">
            <van-uploader :after-read="SendPictures" capture="camera" >
            <div style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;margin:0 auto;">
              <svg style="width:24px; height:24px; margin-top:9px;" t="1589178731442" class="icon" viewBox="0 0 1128 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3839" width="24" height="24"><path d="M1009.48616 159.186891h-195.354693L724.977852 11.058274a23.03711 23.03711 0 0 0-19.811915-11.057813H425.034679a23.03711 23.03711 0 0 0-19.811914 11.057813L316.069149 158.95652H118.871488C53.446095 159.186891 0 219.083377 0 293.0325v596.89152c0 73.949123 53.446095 134.07598 118.871488 134.07598h890.614672c65.655763 0 118.871488-60.126857 118.871488-134.07598V293.0325c0.460742-73.949123-53.215724-133.845609-118.871488-133.845609zM1082.74417 889.92402c0 48.608302-32.712696 88.00176-72.797268 88.00176H118.871488C78.786916 977.92578 46.07422 938.532322 46.07422 889.92402V293.0325c0-48.377931 32.712696-87.771389 72.797268-87.771389h210.328814a23.03711 23.03711 0 0 0 19.811914-11.288184L437.70509 46.074681h253.40821l89.153616 147.898246a23.03711 23.03711 0 0 0 19.581543 11.057813h207.33399c40.084571 0 72.797268 39.393458 72.797268 87.771389z" p-id="3840"></path><path d="M564.178824 340.258575a240.046686 240.046686 0 0 0-234.748151 244.193366A239.816315 239.816315 0 0 0 564.178824 829.336421a239.816315 239.816315 0 0 0 234.748151-244.88448 240.046686 240.046686 0 0 0-234.748151-244.193366z m0 442.082141a193.742095 193.742095 0 0 1-188.673931-197.888775 193.972466 193.972466 0 0 1 188.673931-198.119146 193.972466 193.972466 0 0 1 188.673931 198.119146A193.742095 193.742095 0 0 1 564.178824 783.262201z" p-id="3841"></path></svg>
              <p style="font-size:12px;">拍摄</p>
            </div>
            </van-uploader>
          </van-col> -->
          <van-col span="6">
            <van-uploader  :after-read="handFile" accept="/*">
            <div style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;margin:0 auto;">
              <svg style="width:24px; height:24px; margin-top:9px;" t="1589178890729" class="icon" viewBox="0 0 1230 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4471" width="24" height="24"><path d="M1106.151108 1024H124.78528A125.822798 125.822798 0 0 1 0.00234 897.657273V126.342727A125.562833 125.562833 0 0 1 124.78528 0h548.005077a124.78294 124.78294 0 0 1 120.363544 94.367098h311.95735a125.562833 125.562833 0 0 1 124.782939 126.342727v675.907591a125.562833 125.562833 0 0 1-123.743082 127.382584zM51.995231 800.170602v97.486671a73.829906 73.829906 0 0 0 72.790049 74.349835h981.365828a73.829906 73.829906 0 0 0 72.790049-74.349835v-675.90759a73.569942 73.569942 0 0 0-72.790049-74.349835H746.620263v-24.436659A73.829906 73.829906 0 0 0 672.790357 51.992892H124.78528A73.569942 73.569942 0 0 0 51.995231 126.342727z" p-id="4472"></path></svg>
              <p style="font-size:12px;">文件</p>
            </div>
            </van-uploader>
          </van-col>
          <van-col span="6">
            <div  @click="openRecordVideo">
            <div style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;margin:0 auto;">
              <svg style="width:24px; height:24px; margin-top:9px;" t="1589178731442" class="icon" viewBox="0 0 1128 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3839" width="24" height="24"><path d="M1009.48616 159.186891h-195.354693L724.977852 11.058274a23.03711 23.03711 0 0 0-19.811915-11.057813H425.034679a23.03711 23.03711 0 0 0-19.811914 11.057813L316.069149 158.95652H118.871488C53.446095 159.186891 0 219.083377 0 293.0325v596.89152c0 73.949123 53.446095 134.07598 118.871488 134.07598h890.614672c65.655763 0 118.871488-60.126857 118.871488-134.07598V293.0325c0.460742-73.949123-53.215724-133.845609-118.871488-133.845609zM1082.74417 889.92402c0 48.608302-32.712696 88.00176-72.797268 88.00176H118.871488C78.786916 977.92578 46.07422 938.532322 46.07422 889.92402V293.0325c0-48.377931 32.712696-87.771389 72.797268-87.771389h210.328814a23.03711 23.03711 0 0 0 19.811914-11.288184L437.70509 46.074681h253.40821l89.153616 147.898246a23.03711 23.03711 0 0 0 19.581543 11.057813h207.33399c40.084571 0 72.797268 39.393458 72.797268 87.771389z" p-id="3840"></path><path d="M564.178824 340.258575a240.046686 240.046686 0 0 0-234.748151 244.193366A239.816315 239.816315 0 0 0 564.178824 829.336421a239.816315 239.816315 0 0 0 234.748151-244.88448 240.046686 240.046686 0 0 0-234.748151-244.193366z m0 442.082141a193.742095 193.742095 0 0 1-188.673931-197.888775 193.972466 193.972466 0 0 1 188.673931-198.119146 193.972466 193.972466 0 0 1 188.673931 198.119146A193.742095 193.742095 0 0 1 564.178824 783.262201z" p-id="3841"></path></svg>
               <!-- <p style="font-size:12px;">拍摄</p> -->
               <p style="font-size:12px;">头榜</p>
            </div>
            </div>
          </van-col>
          <!-- <van-col span="6">
            <div @click="Geography" style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;margin:0 auto;">
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
          <!-- <van-col span="6">
            <div @click="Geography" style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;margin:0 auto;">
              <svg style="width:24px; height:24px; margin-top:9px;" t="1589178854006" class="icon" viewBox="0 0 1085 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4261" width="24" height="24"><path d="M953.949191 1024H130.753654A130.983854 130.983854 0 0 1 0 893.246346c0-69.060028 92.080038-134.897255 167.815869-177.254072 48.11182-26.703211 194.28888-84.253234 230.200094-98.06524a95.993439 95.993439 0 0 0-8.977804-89.778037 281.534715 281.534715 0 1 1 268.64351 1.611401 92.080038 92.080038 0 0 0-2.992601 87.015635c35.220614 14.042206 185.771476 73.66403 235.955097 98.755841 58.470824 29.005212 194.058679 104.280643 194.058679 176.793672a130.983854 130.983854 0 0 1-130.753653 131.674454zM525.546815 46.3402a235.724896 235.724896 0 0 0-109.805445 444.055982 23.020009 23.020009 0 0 1 8.057003 6.906002c2.302001 3.222801 55.017823 78.958632 9.208004 151.471662a21.178409 21.178409 0 0 1-11.049604 8.977804c-1.841601 0-180.937274 70.211029-231.811495 98.52564C101.288041 806.000511 46.040019 857.795532 46.040019 893.246346a84.713635 84.713635 0 0 0 84.713635 84.713635h823.195537a84.713635 84.713635 0 0 0 84.713634-84.713635c0-29.695812-71.822429-87.245836-168.506469-135.587855-53.866822-26.933411-237.566497-99.216241-239.408098-99.906841a23.020009 23.020009 0 0 1-10.819404-8.517403 139.501257 139.501257 0 0 1 1.6114-148.939461 23.020009 23.020009 0 0 1 8.747604-7.596604A235.494696 235.494696 0 0 0 525.546815 46.3402z" p-id="4262"></path></svg>
              <p style="font-size:12px;">联系人</p>
            </div>
          </van-col> -->
          <van-col span="6">
            <div @click="shareChat" style="width:60px; height:60px; border-radius:5px; background-color:#f5f5f5;margin:0 auto;">
              <svg style="width:24px; height:24px; margin-top:9px;" t="1589178854006" class="icon" viewBox="0 0 1085 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4261" width="24" height="24"><path d="M953.949191 1024H130.753654A130.983854 130.983854 0 0 1 0 893.246346c0-69.060028 92.080038-134.897255 167.815869-177.254072 48.11182-26.703211 194.28888-84.253234 230.200094-98.06524a95.993439 95.993439 0 0 0-8.977804-89.778037 281.534715 281.534715 0 1 1 268.64351 1.611401 92.080038 92.080038 0 0 0-2.992601 87.015635c35.220614 14.042206 185.771476 73.66403 235.955097 98.755841 58.470824 29.005212 194.058679 104.280643 194.058679 176.793672a130.983854 130.983854 0 0 1-130.753653 131.674454zM525.546815 46.3402a235.724896 235.724896 0 0 0-109.805445 444.055982 23.020009 23.020009 0 0 1 8.057003 6.906002c2.302001 3.222801 55.017823 78.958632 9.208004 151.471662a21.178409 21.178409 0 0 1-11.049604 8.977804c-1.841601 0-180.937274 70.211029-231.811495 98.52564C101.288041 806.000511 46.040019 857.795532 46.040019 893.246346a84.713635 84.713635 0 0 0 84.713635 84.713635h823.195537a84.713635 84.713635 0 0 0 84.713634-84.713635c0-29.695812-71.822429-87.245836-168.506469-135.587855-53.866822-26.933411-237.566497-99.216241-239.408098-99.906841a23.020009 23.020009 0 0 1-10.819404-8.517403 139.501257 139.501257 0 0 1 1.6114-148.939461 23.020009 23.020009 0 0 1 8.747604-7.596604A235.494696 235.494696 0 0 0 525.546815 46.3402z" p-id="4262"></path></svg>
              <p style="font-size:12px;">推头榜</p>
            </div>
          </van-col>
        </van-row>
      </div>

      <!-- 撤回消息 -->
      <van-popup get-container="body" v-model="Longpress" style="width:200px; height:140px; border-radius:5px;overflow:hidden;">
        <div style="font-size:15px; text-align:center; padding-top:10px;">
          撤回消息
        </div>
        <div style="font-size:14px; padding-left:15px;padding-top:20px;">
          是否测回该消息?
        </div>
        <div style="width:100%; position:fixed; bottom:0; height:45px; border-top:1px solid #eee;">
          <div @click="cancels"  style="float:left; width:50%; font-size:15px; border-right:1px solid #eee; height:45px; text-align:center; line-height:40px;">
            取消
          </div>
          <div @click="confirms" style="float:left; width:50%; font-size:15px; text-align:center; line-height:40px;">
            确定
          </div>
        </div>
      </van-popup>

      <van-popup get-container="body" v-model="show" style="width:280px; height:360px; border-radius:4px;">
          <div style="width:100%; height:100%; position:relative;">
            <div style="display:flex; justify-content:center; align-items:center; padding-top:55px;">
              <svg t="1587175410587" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1500" width="65" height="65"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="1501"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="1502"></path></svg>
            </div>
            <div style="font-size:17px; font-weight:bold; text-align:center; margin-top:18px;">
              VIP{{chat_vip_level}}
            </div>
            <div style="font-size:14px; margin-top:50px; padding:0 15px 0 15px;">
              你的会员等及为VIP{{user_vip_level}}本群访问权限需要VIP{{chat_vip_level}}以上，请您开通会员
            </div>
            <div style="width:100%; height:42px;position:fixed; bottom:23px; float:left; font-size:15px;">
                <div @click="Determine" style="width:50%; float:left;height:40px; text-align:center; line-height:42px;color:#111;">
                  <button style="background-color:#12adf5; color:#fff; border:none; width:110px; border-radius:4px;">充值会员</button>
                </div>
                <div @click="cancel" style="width:50%; float:left; height:40px;text-align:center; line-height:42px; color:#12adf5;">
                  <button style="background-color:#f5f5f5; color:#000; border:none; width:110px; border-radius:4px;">取消</button>
                </div>
            </div>
          </div>
        </van-popup>

        <van-popup v-model="showss" style="width:280px; height:360px; border-radius:4px;">
          <div style="width:100%; height:100%; position:relative;">
            <div style="display:flex; justify-content:center; align-items:center; padding-top:55px;">
              <svg t="1587175410587" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1500" width="65" height="65"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="1501"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="1502"></path></svg>
            </div>
            <div style="font-size:17px; font-weight:bold; text-align:center; margin-top:18px;">
              VIP{{user_vip_level}}
            </div>
            <div style="font-size:14px; margin-top:50px; padding:0 15px 0 15px;">
              你的会员等及为VIP{{user_vip_level}}本群发送消息权限需要VIP{{send_vip_level}}以上，请您开通会员
            </div>
            <div style="width:100%; height:42px;position:fixed; bottom:23px; float:left; font-size:15px;">
                <div @click="Determine" style="width:50%; float:left;height:40px; text-align:center; line-height:42px;color:#111;">
                  <button style="background-color:#12adf5; color:#fff; border:none; width:110px; border-radius:4px;">充值会员</button>
                </div>
                <div @click="cancel" style="width:50%; float:left; height:40px;text-align:center; line-height:42px; color:#12adf5;">
                  <button style="background-color:#f5f5f5; color:#000; border:none; width:110px; border-radius:4px;">取消</button>
                </div>
            </div>
          </div>
        </van-popup>
    </div>
    <div v-show="audioxx">
      <div style="position:fixed; z-index:9999; height:120px; width:100%; bottom:160px;  margin:auto;">
        <div style="width:100px; height:100px; border-radius:10px;" :style="{background:audiocolor}">
          <div style="text-align:center;padding-top:13px;">
            <svg  t="1589019865638" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2296" width="50" height="50"><path d="M689.929569 459.960656v-97.363935l-47.003279 77.219672v20.144263a130.937705 130.937705 0 0 1-90.64918 127.580328l-33.573771 50.360655a177.940984 177.940984 0 0 0 171.22623-177.940983zM223.254159 970.281967a16.786885 16.786885 0 0 0 10.072131 16.786885H253.470552l13.429508-10.072131 567.396722-906.491803a23.501639 23.501639 0 0 0 3.357377-16.786885 33.57377 33.57377 0 0 0-13.429509-16.786885h-16.786885a33.57377 33.57377 0 0 0-16.786885 13.429508L226.611536 953.495082a13.429508 13.429508 0 0 0-3.357377 16.786885zM401.195142 604.327869l26.859017-40.288525a124.222951 124.222951 0 0 1-53.718033-104.078688V177.940984a134.295082 134.295082 0 0 1 134.295082-130.937705h3.357377a130.937705 130.937705 0 0 1 130.937705 130.937705v40.288524l43.645901-70.504918A177.940984 177.940984 0 0 0 511.988585 0h-3.357377a181.298361 181.298361 0 0 0-181.298361 177.940984v282.019672A177.940984 177.940984 0 0 0 401.195142 604.327869zM330.690224 721.836066l23.50164-40.288525a325.665574 325.665574 0 0 1-154.439345-275.304918 23.501639 23.501639 0 0 0-23.501639-23.501639 23.501639 23.501639 0 0 0-23.501639 23.501639 365.954098 365.954098 0 0 0 177.940983 315.593443z" fill="#FFFFFF" p-id="2297"></path><path d="M871.227929 406.242623a23.501639 23.501639 0 1 0-47.003279 0 315.593443 315.593443 0 0 1-312.236065 318.95082H468.342683l-26.859016 43.645901 47.003279 3.357377v204.8H374.336126a23.501639 23.501639 0 1 0 0 47.003279h275.304918a23.501639 23.501639 0 0 0 0-47.003279h-114.15082V772.196721a362.596721 362.596721 0 0 0 335.737705-365.954098z" fill="#FFFFFF" p-id="2298"></path></svg>
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
          <svg style=""  t="1589172095420" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2461" width="25" height="25"><path d="M508.642623 641.259016h3.357377a181.298361 181.298361 0 0 0 177.940984-181.29836V177.940984A177.940984 177.940984 0 0 0 512 0h-3.357377a181.298361 181.298361 0 0 0-181.298361 177.940984v282.019672a181.298361 181.298361 0 0 0 181.298361 181.29836z m-134.295082-463.318032a134.295082 134.295082 0 0 1 134.295082-130.937705h3.357377a130.937705 130.937705 0 0 1 130.937705 130.937705v282.019672a130.937705 130.937705 0 0 1-130.937705 134.295082h-3.357377a134.295082 134.295082 0 0 1-134.295082-134.295082z" fill="#FFFFFF" p-id="2462"></path><path d="M871.239344 406.242623a23.501639 23.501639 0 1 0-47.003278 0 315.593443 315.593443 0 0 1-312.236066 318.95082 315.593443 315.593443 0 0 1-312.236066-318.95082 23.501639 23.501639 0 0 0-23.501639-23.501639 23.501639 23.501639 0 0 0-23.501639 23.501639A362.596721 362.596721 0 0 0 488.498361 772.196721v204.8H374.347541a23.501639 23.501639 0 1 0 0 47.003279h275.304918a23.501639 23.501639 0 0 0 0-47.003279h-114.15082V772.196721a362.596721 362.596721 0 0 0 335.737705-365.954098z" fill="#FFFFFF" p-id="2463"></path></svg>
        </div>
      </div>
      </div>
    </div>
     <recordVideo ref="recordVideo" @sendVideo="changeVideo"></recordVideo>
    </div>
</template>

<script>
import imgOnline from "../../assets/images/onLine.png";
import imgOffline from "../../assets/images/offLine.png";
import create_img from "../../assets/images/header/header02.png";
import { ImagePreview } from 'vant';
import Recorder  from 'js-audio-recorder';
import { Notify } from 'vant';
import recordVideo from '../../components/recordVideo/recordVideo.vue'
import videoplay from '../../components/videoplay/videoplay.vue'
Vue.use(Notify);

let const_chatid = null;
let user_keepalive =0;
let websock = null;
let keepalive_id = null;
let exitFlag = false;
const restart_time = 1000;
let timeOutEvent = 0;

    export default {
      components: {
        recordVideo,
        videoplay
      },
        data(){
            return{
              imgStatus:true,
              chatText:'',
              txt:'',
              chatRexord:[],
              textz:[],
              create_img:create_img,
              live_cdn_url:'',
              send_vip_level:'',
              backgroundUrl:'',
              is_identity:false,
              videoChat:true,
              chatOpacity:'0',
              headerTou:'0.7',
              player:null,
              cnt:0,
              bodyHeight:0,
              chatlogo:0,
              chatshop:0,
              isLive:'主播已经下线，请稍等片刻...',
              videoPlay:false,
              chatStact:false,
              footerNav:false,
              loading:true,
              streamx:false,
              groud_str:false,
              chat_type:'',
              chatHeight:'100px',

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
              user_vip_level:'',
              show:false,
              show1:false,
              showss:false,
              images:'',
              sendOut:false,
              More:true,
              chat_vip_level:'',
              texts:'',
              add:false,
              zhanwei1:true,
              zhanwei2:false,
              msgid:'',
              token:'',
              Longpress:false,
              withdraw:'',
              urlname:'',
              imgz:[],
              filez:[],
              videoz:[],
              recordz:[],
              begin:0,
              len:20,
              listtime:false,
              heightx:true,
              rollheight:'',
              rollheightx:'',
              record: null,
              isShowAudioContent: false,
              recordTime: 0,
              vidoeKye: true,
              create_user_id:'',
              video_zhibo:false,
              Chatstast:'1',
              video_chat:true,
              videoOpacity: "1",
              bgOpacity:"1",
              opacityNav:'0.7',
              liveinfo:{},

              // 小店开始
              userInfo: JSON.parse(localStorage.userInfo),
              activeShop: 0,
              classifyList: [],
              shop_id:'',
              // 小店结束
            }
        },
        methods: {
          // 小店开始
          async fetchClassifyList() {
            let that = this
            let params = {
                    user_id:that.userInfo.user_id,
                    s_id: that.userInfo.s_id,
                    shop_id: that.shop_id,
                }
                let res = await this.$api.network.ClassifyList(params)
                console.log(res)
                if (res.ret) {
                    that.classifyList = res.list.map(item=> {
                    return {
                            value: item.classify_id,
                            label: item.classify_name,
                            list:[],
                            begin:1,
                            len: 10,
                            finished: false,
                            loading: false,
                            refreshing: false
                    }
                    })
                    that.activeShop = that.classifyList[0].value
                    console.log(that.activeShop)
                    await that.fectchProuct (this.activeShop)
                }
                
                console.log(that.activeShop)
          },
          async fectchProuct (classify_id) {
              console.log(classify_id)
              let that = this
              let classifyItem = that.classifyList.find(item=> item.value == classify_id)
              console.log(classifyItem)
              let params = {
                    user_id:that.userInfo.user_id,
                    s_id: that.userInfo.s_id,
                    shop_id: that.shop_id,
                    classify_id:classifyItem.value,
                    secret_key:classifyItem.value,
                    begin: classifyItem.begin,
                    len: classifyItem.len
                  
              }
              let res = await that.$api.network.ClassifyProductList(params)
              if (res.ret && res.list.length) {


                for(let i=0;i<res.list.length;i++)
                {
                  //加载图片
                  let info = res.list[i]
                  info.product_img = null;
                  let imgdata =  await  imageDb.getDataByKey(info.product_image)
                  if(imgdata && imgdata.data) info.product_img = imgdata.data
                  else{
                    let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:info.product_image,img_kind:'open'}//,img_p:'min200'}
                      queryImg('',params).then((data)=>{
                        if(data && data.data){
                          info.product_img ='data:image/png;base64,'+data.data
                          imageDb.addData({img_id:info.product_image,data:info.product_img })
                        }
                      }).catch((ex)=>{
                          console.log('load img error',ex)
                      })
                  }
                }


                  console.log(res)
                  classifyItem.list = classifyItem.list.concat(res.list)
                  classifyItem.begin+=classifyItem.len
              }
              return {
                  length: res.list.length,
                  list: res.list
              }
              console.log(res)
          },
          onClick(value,label) {
            //   console.log(name,title)
            let that = this
            let classify = that.classifyList.find(item=> item.value === value)
            console.log(classify)
            if(!classify.list.length) {
                that.fectchProuct(value)
            }
          },
          handChange(name,title) {
              console.log(name,title)
          }, 
          async onLoad (item) {
            let finished = await this.fectchProuct(item.value)
            if (!finished.length) {
                item.finished = true
            }
          },
          async onRefreshx (item) {
              let that = this
              item.finished = false
              item.begin = 1
              item.len = 10
            //    item.loading = true
            let res =  await that.fectchProuct(this.active)
            if (!res.length) {
                item.finished = true
            }else {
                  item.list = res.list
            }
            item.refreshing = false
            item.loading = false
          },
          getHeight () {
            let height = document.documentElement.clientHeight? document.documentElement.clientHeight: document.body.clientHeight;
            height -=90
            console.log(height)
            return height + 'px'
        },
          // 小店结束
          card_name(item){///点击进入名片联系人的个人信息
            console.log(item)
            this.$router.push(`/index/GroupInformation/GroupOwner/${item.msg_info.body.name}`)
          },
            async SwitchChat(){//直播切换按钮、购物车按钮
              if(this.chat_type == 'group_live'){//直播聊天室
                if(this.videoChat == true){
                  // this.player.pause()
                  this.videoChat = false
                  this.chatOpacity = '0.9'
                  this.headerTou = '1'
                  this.chatlogo = 1
                  this.chatStact = true
                  this.footerNav = true
                }else{
                  // this.player.play()
                  this.videoChat = true
                  this.chatOpacity = '0'
                  this.headerTou = '0.7'
                  this.chatlogo = 0
                  this.chatStact = false
                  this.footerNav = false
                }
                this.$nextTick(() => {
                    document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight// 移动端获取对象
                })
                router.beforeEach((to, from, next)=> {
                  let userInfo = localStorage.getItem('userInfo')
                  let list = ['login','checking','register','phoneLogi']
                  if (userInfo || list.indexOf(to.name) !== -1) {

                    next()
                  }
                  else {
                    next({
                      name:'login'
                    })
                  }
                    // next()
                })
              }else{//小店聊天室
                if(this.videoChat == true){
                                  // this.player.pause()



                                //2023-9-22优化店铺的消息显示（不再进行消息交互）
                                //   this.videoChat = false
                                //   this.chatOpacity = '0.9'
                                //   this.headerTou = '1'
                                //   this.chatshop = 0
                                //   this.chatStact = true
                                //   this.footerNav = true
                                // }else{



                                  // this.player.play()
                                  this.videoChat = true
                                  this.chatOpacity = '0'
                                  this.headerTou =  '0.7'
                                  this.chatshop = 1
                                  this.chatStact = false
                                  this.footerNav = false
                                }
                                //2023-9-22  不再显示聊天信息
                                // this.$nextTick(() => {
                                //     document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight// 移动端获取对象
                                // })




                                // router.beforeEach((to, from, next)=> {
                                //   let userInfo = localStorage.getItem('userInfo')
                                //   let list = ['login','checking','register','phoneLogi']
                                //   if (userInfo || list.indexOf(to.name) !== -1) {

                                //     next()
                                //   }
                                //   else {
                                //     next({
                                //       name:'login'
                                //     })
                                //   }
                                // })
                // this.$router.push('/userShoppingCart')
              }
            },

            pageset(token) {
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

            group_live_user(){//直播间跳转群主信息页面
              this.$router.push(`/index/GroupInformation/GroupOwner/${this.create_user_id}`)
            },///

            group_live_gli(){//直播间跳转直播管理页面

              if(!this.is_identity ){
                this.$toast('您不是管理员，无此操作权限！u are not manager, on pm to operate it!')
                console.log('您不是管理员，无此操作权限！u are not manager, on pm to operate it!')
                return 
              }
              let chat_sid = localStorage.getItem('chat_sid')
              console.log(chat_sid);
              let liveInfo = this.liveinfo
              if(this.chat_type == 'group_live')
              {
                if('shop_id' in liveInfo){
                  let shopid = liveInfo.shop_id
                  let chat_shopid = 'msg_' + shopid.split('_')[1]
                  this.$router.push(`/LiveBroadcast/videoChat/${chat_shopid}`)
                  // location.reload()
                  // this.$router.push(`/LiveBroadcast/SuccessBroadcast/${this.$route.params.token_y}`)
                  console.log('1');
                }else{
                  // location. reload()
                  this.$router.push(`/LiveBroadcast/SuccessBroadcast/${this.$route.params.token_y}`)
                  console.log('2');
                }
              }else
              {
                this.$router.push(`/shopBroadcast/SuccessSetShop/${this.$route.params.token_y}`)
              }
            },

            group_live_ConfigureLive(){//直播间跳转配置直播间页面
              console.log(this.is_identity)
              if(this.is_identity == true){
                this.$router.push(`/LiveBroadcast/ConfigureLive/${this.$route.params.token_y}`)
              }else{
                this.$toast.fail('您没有该权限')
              }
            },

            group_live_GroupSharing(){//直播间跳转分享页面
              this.$router.push(`/index/GroupSharing/${this.$route.params.token_y}`)
            },

            fullScreen(){//点击播放全屏
              if (this.player.requestFullscreen) {
                 this.player.requestFullscreen();
              } else if (this.player.mozRequestFullScreen) {
                 this.player.mozRequestFullScreen();
              } else if (ele .webkitRequestFullScreen) {
                this.player.webkitRequestFullScreen();
              }
            },

            onClickLeft() {//返回首页
              this.$router.push('/')
              if(this.audio!=null){//销毁已经播放的音频
                    this.audio.pause();
                    this.audio = null;
                  }
              if(this.player != null){
                this.player.pause()
                this.player.dispose();
              }
              clearInterval(this.timer)//销毁定时器
              this.$router.push('/');
              document.body.style.backgroundColor = '#f5f5f5'
            },///

            sendOuts(){//点击输入框的执行
              this.sendOut = true
              this.More = false
              this.add = false
              if(this.chat_type == 'group_live'){
                if(this.videoChat == true){
                  this.chatOpacity = '0.9'
                  this.headerTou = '1'
                  this.chatStact = true
                  // this.chatlogo = 1
                }
                router.beforeEach((to, from, next)=> {
                  let userInfo = localStorage.getItem('userInfo')
                  let list = ['login','checking','register','phoneLogi']
                  if (userInfo || list.indexOf(to.name) !== -1) {

                    next()
                  }
                  else {
                    next({
                      name:'login'
                    })
                  }
                    // next()
                })
              }else{
                //2023-9-22
                // this.chatStact = true
                // this.footerNav = true
              }
              this.$nextTick(() => {
                      document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight// 移动端获取对象
                  })
            },

            sendOutsBlur () {//失去焦点事件
              this.sendOut = false
              this.More = true
              this.add = false
              if(this.chat_type == 'group_live'){
                if(this.videoChat == true){
                  this.chatOpacity = '0'
                  this.headerTou = '0.7'
                  this.chatStact = false
                  // this.chatlogo = 0
                }
              }else{
                // this.chatStact = false
                this.footerNav = false
              }
            },

            async text(){//发送消息
              console.log(this.txt)
                if(this.txt == '' || this.txt == null || this.txt == undefined || (this.txt.length>0 && this.txt.trim().length == 0))
                {
                  return
                }
                let data = JSON.parse(localStorage.getItem('userInfo'));//
                let random = Math.random()
                      let user = {
                        user_id:data.user_id,
                        s_id:data.s_id,
                        chatid:this.$route.params.token_y,
                        msg:this.txt,
                        random:random
                      }
                let res =  await this.$api.network.ChatSendText(user)
                this.txt = ''
                if(res.ret){
                  this.sendOut = false
                  this.More = true
                  this.add = false
                  // this.chatRexord.push(res)
                  this.expandUserData();
                  this.updateReadedHeight(res.height)
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
              },

              async news(){//最新消息
                // console.log('这是聊天id' + this.$route.params.token_y)
                let random = Math.random()
                        let user = {
                          user_id:localStorage.user_id,
                          s_id:localStorage.s_id,
                          chatid:this.$route.params.token_y,
                          begin:this.begin,
                          len:this.len,
                        }
                let res =  await this.$api.network.ChatmsgList(user).catch(e => {
                  console.log(e)
                  let array = JSON.parse(localStorage.getItem('error'))
                  array.push(e)
                  localStorage.setItem('error',JSON.stringify(array))
                })
                console.log('videoChat-news-res:',res)
                if(res.ret){this.listtime=true}
                // console.log(res)
                this.user_vip_level = res.user_vip_level
                if(res.msg == 'msg list is empty'){
                  return;
                }else if(res.msg == 'visit pm judge: your vip-level less than groupchat-vip-level'){
                  this.show = true
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
                if(!res || !res.ret || !res.list.length) return ;
                
                if(res && res.list && res.list.length)
                  this.updateReadedHeight(res.list[0].height)
                this.chatRexord = res.list.reverse()
                // console.log(this.chatRexord )
                // console.log(this.chatRexord)
                this.expandUserData();
                this.typex(); 
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

            async Administration(){//查看群信息
              let users = {
                      user_id:localStorage.user_id,
                      s_id:localStorage.s_id,   
                      chatid:this.$route.params.token_y,
                    }
              let ress =  await this.$api.network.ChatInfo(users)//群信息
              // console.log(ress)
              this.chat_type = ress.chat_type
              if(ress.chat_type == "group_live"){
                this.groud_str = true
                this.chatHeight = '100px'
              }else if (ress.chat_type == 'group_shop'){
                this.shop_id = ress.shop_id
                this.headerTou = '1'
              }
              this.chatText = ress.chatname;
              this.chat_vip_level = ress.vip_level
              this.send_vip_level = ress.send_vip_level
              this.live_cdn_url = ress.live_cdn_url
              this.backgroundUrl = `${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+`&filename=`+ress.backgroup_img+`&img_kind=`+`open`+`&img_p=`+`min5000`
              console.log(ress)
              this.liveinfo = ress
              let chat_shopid = ress.shop_id
              console.log(chat_shopid)
              localStorage.setItem('chat_sid',chat_shopid)
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
              //this.create_img = res.logo//`${this.$baseUrl}/image/view?user_id=`+res.user_id+`&filename=`+res.logo+`&img_kind=`+`open`+`&img_p=`+`min1000`
              console.log(res)
          },

           async playVideo(){//直播视频
              console.log(this.streamx + '666666')
              console.log(this.live_cdn_url)
              let that = this
              hwplayerloaded(function () {
              let player = new HWPlayer('myVideo')
                player.pause();
                player.dispose();
                document.getElementById('videobox').innerHTML = '';
                let str2 = `<video id="myVideo" style="width:100%;height:100%;" class="video-js vjs-default-skin vjs-big-play-centered" preload="auto">
                              <source  type="application/x-mpegURL">
                            </video>`;
                document.getElementById('videobox').innerHTML = str2;
                let width = window.screen.width
                let height = window.screen.height
                // console.log(width)
                // console.log(height)
                let options = {
                  //是否显示控制栏，包括进度条，播放暂停按钮，音量调节等组件
                  width: width,
                  height: height,
                  autoplay:'autoplay',
                  sources: [{src: that.live_cdn_url, type: 'application/x-mpegURL'}]
                };
                that.player = new HWPlayer('myVideo', options, function () {
                  that.player.on('loadedmetadata',function(){
                    if(that.timexz !==null){
                      clearInterval(that.timexz)
                    }
                    console.log('视频加载完了')
                    that.loading = false
                    that.isLive = '直播正在加载，请稍等片刻...'
                  })

                  that.player.on('fullscreenchange',function(){
                    console.log('全屏了')
                    // that.loading = false
                    // that.isLive = '视频正在加载，请稍等片刻...'
                  })

                  that.player.on('loadeddata',function(){
                    console.log('视频第一帧加载完毕')
                    if(that.timexz !==null){
                      clearInterval(that.timexz)
                    }
                    that.streamx = true
                    that.player.play();
                    that.videoChat = true
                    that.videoPlay = true
                    that.isLive = ''
                  })
                  // 使用事件监听
                  that.player.on('error', function () {
                    console.log(that.streamx + '77777')
                    console.log('视频报错了')
                    if(that.streamx){
                      that.loading = false
                      that.isLive = '直播正在加载，请稍等片刻...'
                      that.videoPlay = false
                    }else{
                      that.isLive = '主播已经下线，请稍等片刻...'
                      that.loading = true
                      that.videoPlay = false
                    }
                    });
                  that.player.on('ended', function() {
                    console.log('视频播放结束了')
                    that.isLive = '主播已经下线，请稍等片刻...'
                    that.videoPlay = false
                    that.loading = true
                  })
                  });
              });
            },

            async CharStreamInfo(){///查询直播是否在线
              let user = {
                chatid:this.$route.params.token_y,
                // user_id:localStorage.user_id,
                // s_id:localStorage.s_id,
              }
              let res =  await this.$api.network.CharStreamInfo(user)
              console.log(res.ret+ '555555555')
              console.log(res)
              if(res.ret){
                this.streamx = true
                this.loading = false
                this.isLive = '直播正在加载，请稍等片刻...'
                this.timexz =   setInterval(() => {
                    this.playVideo()
                }, 2000);
              }else{
                this.streamx = false
              }
            },
            
            gotouchstart(item){
                // console.log('执行了')
                if(item.msg_obj == null || item.msg_obj == undefined || item.msg_obj == ''){
                  this.withdraw = item.msg_info.msgid
                }else{
                  this.withdraw = item.msg_obj.msgid
                }
                this.Longpress = true
              },
            cancels(){//取消测回消息
              this.Longpress = false
            },
            async confirms(){//确定测回消息
              let random = Math.random()
              let user = {
                user_id:localStorage.user_id,
                s_id:localStorage.s_id,
                chatid:this.$route.params.token_y,
                msgid:this.withdraw,
                random:random
              }
              let ress =  await this.$api.network.ChatMsgRecall(user)
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

            rollHeight(){//获取滚动条高度
                this.rollheight = document.getElementById('chatBox').scrollHeight// 移动端获取对象
              // this.rollheight = document.documentElement.scrollHeight // 浏览器滚动高度
              // console.log(this.rollheight)
            },///

            onRefresh() {//下拉加载更多数据
              this.rollHeight()
              // console.log(this.rollheight)
              this.heightx = false
              this.listtime = false
              this.len += 20
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
                }else if(i >=10){
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
              this.bodyHeight_shop = this.bodyHeight - 140 // 220//on 2023-11-15 modify
              
              // console.log(this.bodyHeight)
              // console.log(this.bodyHeight_shop)
            },

            cancel(){//取消前往充值
              this.show = false
              this.showss = false
            },
            Determine(){//确认前往充值
              this.$router.push('/cancel')
            },
            adds() {
              if(this.add){
                this.add = false
              }else{
                this.add = true
              }
            },

            async SendPictures(data){ //发送图片
              let random = Math.random();
              let img_kind = data.file;
              // console.log(img_kind);
              let formData = new FormData();
              formData.append("user_id",localStorage.user_id);
              formData.append("s_id", localStorage.s_id);
              formData.append("random", random);
              formData.append("img_kind", "open");
              formData.append("file", img_kind);
              let config = {
                headers: {
                  enctype: "multipart/form-data"
                }
              };
              console.log(this.$baseUrl)
              let res = await this.$axios.post(`${this.$baseUrl}/image/upload`, formData, config)
              console.log(res)
              if(!res.data.ret)
              {
                this.$toast.fail('上传失败' + res.data.msg)
                return;
              }
              
              let user = {
                user_id:localStorage.user_id,
                s_id:localStorage.s_id,
                chatid:this.$route.params.token_y,
                img_name:res.data.file_info.originalname,
                img_id:res.data.filename,
                img_fmt:res.data.file_info.fmt,
                url:res.data.file_info.mimetype,
                random:random,
                msg:res.data.msg
              }
              let ress =  await this.$api.network.ChatMsgSendImg(user)
              if(ress.ret){
                this.$toast.success("发送成功")
                this.add = false
                // this.chatRexord.push(ress)
                this.expandUserData();
                this.updateReadedHeight(ress.height)
              }else{
                this.$toast.fail("发送失败" + ress.msg)
              }
              // console.log(ress)
            },
            ////
            async handFile(data){ //发送文件
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
              if(!res.data.ret){
                this.$toast.fail('上传失败' +res.data.msg,3000)
              }
              console.log(res)
              let user = {
                user_id:res.data.user_id,
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
              console.log(ress)
              if(ress.ret){
                this.$toast.success("发送成功")
                this.add = false
                this.zhanwei2 = false
                this.zhanwei1 = true
                // this.chatRexord.push(ress)
                this.expandUserData();
                this.updateReadedHeight(ress.height)
              }else{
                this.$toast.fail("发送失败")
              }

            },
            ///
            download(item){//下载文件
              this.iframeUrl = item.fileUrl
                console.log(item)
              this.urlname = item.msg_info.body.filename
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
                // this.chatRexord.push(ress)
                // console.log(this.chatRexord)
                this.expandUserData();
                this.updateReadedHeight(ress.height)
              }else
              {
                this.$toast.fail("发送失败" + ress.msg)
              }
              
          },
          async shareChat()
          {
            if(this.chat_type=='single'){
              this.$toast('分享失败：私信群不能分享！')
              return ;
            }
            let desc = '这是一个不错的群，欢迎光临！'
            let tips = '群'
            switch(this.chat_type){// this.chatInfo.desc 
              case 'group_live': desc =desc.replace('群','直播间');tips='直播间'; break;//'这是一个不错的直播间，欢迎加入！'; break;
              case 'group_shop': desc= desc.replace('群','小店') ;tips='小店';break;
            }
            let sharechat = {share_chatid:this.$route.params.token_y,img:this.chatInfo.chatlogo,chat_type:this.chatInfo.chat_type,
                title:this.chatText,desc,shop_id:this.shop_id,share_user_id:localStorage.user_id}
            let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,xtype:'chat',
              xmsg:'我分享了一个'+tips+'：',xobj:JSON.stringify(sharechat),random:Math.random()}
            let ret = await this.$api.network.sendXMSG(params)
            if(!ret || !ret.ret) return this.$toast('分享失败，原因：'+(ret && ret.msg ? ret.msg:'未知网络原因'))
            this.$toast('分享成功！1秒后将自动跳转至头榜...')
            localStorage.setItem('newDWebFlag','1')
            setTimeout(()=>this.$router.push('/dweb'),1000)
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
                this.expandUserData();
                this.updateReadedHeight(ress.height)
              }else
              {
                this.$toast.fail("发送失败" + ress.msg)
              }
          },

          move(e){//手指按下拖动
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
            this.deleteRecord()
            // this.chatRexord.push(recordRes)
            this.expandUserData();
            this.updateReadedHeight(recordRes.height)
          }else
          {
            this.deleteRecord()
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
          console.log('chat-into_dweb:',chatInfo)
          localStorage.setItem('dweb-into-chat-info',JSON.stringify(chatInfo))
          this.$router.push('/dweb')
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



            // async initWebSocket(){//websocket/////////////////////////////////////////////////////////////////////////////////
            //   // console.log('into initWebSocket function')
            //   return //202023-9-26
            //   if(websock )
            //   {
            //       return ;
            //   }
            //   if(!const_chatid)  return ;
              
            //   if(typeof(WebSocket) === "undefined"){
            //     console.error("您的浏览器不支持WebSocket")
            //     return false
            //   }

            //   try{
            //       let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,chatid:this.$route.params.token_y};
            //       let tokenRet = await this.$api.network.getChatRoomWebSocketListenToken(  params);//token

            //       if(tokenRet && tokenRet.ret && tokenRet.listen_token)
            //       {
            //           let wsuri = this.$api.network.createWSChatListenUrl(tokenRet.listen_token)
            //           websock = new WebSocket(wsuri)
            //           websock.onopen = this.websocketonopen
            //           websock.onmessage = this.websocketonmessage
            //           websock.onerror = this.websocketonerror
            //           websock.onclose = this.websocketclose
            //       }else{
            //           console.log('initWebSocket-get-ws-token failed:'+JSON.stringify(tokenRet))
            //           if(tokenRet.chat_vip_level && tokenRet.msg && tokenRet.msg.indexOf('less'))
            //           {
            //             console.log('visit pm failed')
            //             websock  = null;
            //             exitFlag = true;
            //             return ;
            //           }
            //           websock  = null;
            //           if(!exitFlag) setTimeout(this.initWebSocket,restart_time);
            //       }   
            //   }catch(ex){
            //       console.log('start websocket-exception:'+ex)
            //       let array = JSON.parse(localStorage.getItem('error'))
            //       array.push(ex.message)
            //       localStorage.setItem('error',JSON.stringify(array))
            //       if(!exitFlag) setTimeout(this.initWebSocket,restart_time);
            //   }

            // },
            async initWebSocket(){
              let This = this
              if(rpc_client.qWS(this.$route.params.token_y))
              {
                console.log('alread do webscoket-link:'+rpc_client.qWS(this.$route.params.token_y))

                let token = rpc_client.qWS(this.$route.params.token_y)
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
            callKeepAlive()
            {
                this.killKeepAlive();
                keepalive_id = setInterval(function(){
                    if(websock) websock.send('keepalive')
                },9000)

                if(websock) websock.send('keepalive')
            },
            killKeepAlive()
            {
                if(keepalive_id) clearInterval(keepalive_id)
                keepalive_id = null;
            },
            //连接成功
            async websocketonopen(){ 
              console.log('WebSocket连接成功')
              this.imgStatus = true;
              this.callKeepAlive();
            },
            //接收后端返回的数据
            async websocketonmessage(e){ 
              console.log('websocketonmessage-msg:',e)
              return 
              let data = e.data;
              // console.log('chat.vue-websocketonmessage:'+data)
              // if ()
              // console.log(e)
              // console.log(e.data)
              if (e.data.indexOf('mem_alive_cnt') !== -1) {
                this.cnt = e.data.split(':')[1]
              }
              if(e.data.indexOf('开始了直播') !== -1){
                this.CharStreamInfo()
                this.streamx = true
              }
              if(e.data.indexOf('结束了直播') !== -1){
                this.streamx = false
              }
              this.imgStatus = true;

              let dataJson = null;
              try{
                  dataJson = JSON.parse(data)
              }catch(ex){
                  // console.log('dataJson parse failed:'+ex)
                  // this.errorx()
                  // let array = JSON.parse(localStorage.getItem('error'))
                  //  console.log(array)
                  // array.push(ex.message)
                  // console.log(array)
                  // localStorage.setItem('error',JSON.stringify(array))
                  return ;
              }

              // console.log(dataJson)

              let obj = {
                token :this.$route.params.token_y,
                height:dataJson.height,
                create_time_i : dataJson.time_i,
                create_time :dataJson.time,
                msg_info:dataJson,
                user_id:dataJson.from,
                //msg_obj:dataJson
              }

              //let list = this.chatRexord;
              let isExists = false;
              for(let i=0;this.chatRexord && i<this.chatRexord.length;i++)
              {
                //高度一致的话，就不重复了
                if(obj.height == this.chatRexord[i].height) {
                  isExists = true;
                  break;
                }
              }
              if(!isExists)
              {
                this.chatRexord.push(obj)
                this.expandUserData();
                this.updateReadedHeight(dataJson.height)
              }
            
            },
            //连接建立失败重连
            async websocketonerror(e){
              console.log(`连接失败的信息：`, e)
              //this.initWebSocket() // 连接失败后尝试重新连接
              // this.imgStatus = false
              websock  = null;
              this.killKeepAlive();
              if(!exitFlag) setTimeout(this.initWebSocket,restart_time);
            },
            //关闭连接
            async websocketclose(e){ 
              console.log('断开连接',e)
              websock  = null;
              // this.imgStatus = false
              setTimeout(this.initWebSocket,restart_time);
              this.killKeepAlive();
            },
            updateReadedHeight(height)
            {
              // let param = {user_id:localStorage.user_id,chatid:this.$route.params.token_y,readed_height:height}
              // if(websock){
              //     websock.send(JSON.stringify(param));
              // }
              console.log('videoChat-updateReadedHeight:',height)
              let param = {user_id:localStorage.user_id,chatid:this.$route.params.token_y,readed_height:height}
              if(websock){
                  //websock.send(JSON.stringify(param));
                  rpc_client.ws_send(websock.ws_token,JSON.stringify(param))
              }
              localStorage.setItem('readed_height_'+localStorage.user_id+'_'+this.$route.params.token_y,height) 
              // localStorage.setItem('readed_height_'+localStorage.user_id+'_'+this.$route.params.token_y,height) 
            },
            chat(user_id){//点击聊天头像跳转个人信息页面
              this.$router.push(`/index/GroupInformation/GroupOwner/${user_id}`)
            },
            async expandUserData()
              {
                let list = this.chatRexord
                // console.log(list)
                let i = 0;
                for(i; i<list.length; i++){
                  // console.log(res.list[i].msg_info.body.img_id)
                  if(list[i].msg_info.from == null){
                    return
                  }
                  let msg =  list[i].msg_info.from.split('_')[1]
                  let user = 'user_' + msg
                  let s_userInfo = null;
                  let tmp = list[i];
                  this.$api.network.s_queryUserInfo(user,function(infoRet){
                    //s_userInfo = res;
                    tmp.url = 'http://182.61.13.123:9000/image/view?user_id='+localStorage.user_id+'&s_id='+localStorage.s_id+'&filename='+infoRet.logo+'&img_kind=open&img_p=min1000'
                    tmp.user_name = infoRet.user_name;
                    tmp.user_id = infoRet.user_id
                    // console.log(infoRet)
                  });

                  let types = '';
                  if(list[i].msg_info.type == 'img'){
                    list[i].msg_info.url =`${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+`&s_id=`+localStorage.s_id+`&filename=`+list[i].msg_info.body.img_id+`&img_kind=`+`open`+`&img_p=`+`min3000`
                  }
                  if(list[i].msg_info.type == 'video'){
                    list[i].videolook =`${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+`&filename=`+list[i].msg_info.body.preview_img+`&img_kind=`+`open`+`&img_p=`+`min2000`
                  }
                  if(list[i].msg_info.type == 'name_card'){
                    list[i].msg_info.body.card_url = `${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+`&s_id=`+localStorage.s_id+`&filename=`+list[i].msg_info.body.logo+`&img_kind=`+`open`+`&img_p=`+`min2000`
                  }//
                  if(list[i].msg_info.type == 'text'){//如果状态为img会话框隐藏
                      list[i].texts = 0
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
                    // console.log(this.chatRexord)
                }
              },

              ///商品详情
              clickShopDetail (product_id) {
                  console.log(product_id)
                  let chatid = this.$route.params.token_y
                  console.log(chatid)
                  // this.$router.push('/shopDetail/'+product_id)
                  this.$router.push({path:'/shopDetail/'+product_id,query:{chatid:this.$route.params.token_y}})
                  // this.$router.push({name:'shopDetail',params:{chatid:this.chatid}})
              }
        },
        async created(){
          this.imgStatus = window.rpc_client ? rpc_client.pingpong_flag :false
          this.darkMode = localStorage.getItem('dark_mode') ? parseInt(localStorage.getItem('dark_mode')):0
          await this.news()
          await this.Administration()
          if(this.chat_type =='group_shop'){
            await this.fetchClassifyList()
            this.chatStact = true
          }
          exitFlag = false;
          const_chatid = this.$route.params.token_y
          try {
            this.initWebSocket();
          } catch (error) {
            // alert(error)
            let array = JSON.parse(localStorage.getItem('error'))
            array.push(error.message)
            localStorage.setItem('error',JSON.stringify(array))
          }
          //显示聊天室名称-------使用了缓存
          // let chatInfo = localStorage.getItem(this.$route.params.token_y)
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
          this.chatInfo = chatInfo
          if(chatInfo.chat_type=='single')
          {
            let dst_user_id = localStorage.user_id == chatInfo.user_a ? chatInfo.user_b: chatInfo.user_a;
            this.$api.network.s_queryUserInfo(dst_user_id,function(qUserInfo){
              chatInfo.chatname = qUserInfo.user_name;
            })
          }else{}
        },
        beforeRouteEnter(to, form, next) {
          let that = this 
          next()
        },
        beforeRouteLeave(to, form, next) {
          exitFlag =true;
          // if(websock) websock.close();
          next()
        },   

       async mounted(){//这时候请求后端数据
          // console.log(this.chat_type)
          this.mounteds()
          if(this.chat_type == 'group_live'){
            await this.CharStreamInfo()
            this.playVideo()
          }
          
        },

        watch: {
          $route (to, from) {
            this.$router.go(0)
          },
          chatRexord () {
                this.$nextTick(() => {
                  if(document.getElementById('chatBox')){
                    document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight// 移动端获取对象
                  }
                  // console.log(document.getElementById('chatBox').scrollTop)
                  // console.log(document.getElementById('chatBox').scrollHeight)
                  // document.documentElement.scrollTop = document.documentElement.scrollHeight // 浏览器滚动高度
                  // console.log("这是移动端滚动高度" + document.getElementById('chatBox').scrollHeight)
                  // console.log("这是浏览器滚动高度" + document.documentElement.scrollTop)
                  if(document.getElementById('zhiboGD')){
                    document.getElementById('zhiboGD').scrollTop  =  document.getElementById('zhiboGD').scrollHeight
                  }
                  // this.initVideo()
                })
              }
          },
          beforeDestroy () {
            if (this.record) {
              this.record.destroy().then(()=> {
                this.record = null
              })
            }
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
    }
</script>
<style scoped lang="stylus">
.box {
  width 100%
  height 100%
  background-color:#f5f5f5
  margin:0;
  padding:0;
}
/deep/ .van-tabs__content{
  height 570px
}
.topbar {
  position fixed
  top 0
  width 100%
  z-index 99
  border-bottom:1px solid #eee; height:46px; background-color:#fff; margin:0; align:center;
}
.box >>> .van-icon{
  font-size:18px;
}
.box >>> .van-nav-bar__arrow{
  color:#000;
}
.live_tips{
  width: 200px
  position: fixed;
  top:40%;
  left:50%;
  transform: translateX(-45%)
  color: #fff;
  font-size:15px;
}
.live_tips_loading{
  width: 200px
  position: fixed;
  top:33%;
  left:50%;
  transform: translateX(-45%)
  text-align:center;
}
.live_tips_img{
  width: 200px
  position: fixed;
  text-align:center;
  top:26%;
  left:49.5%;
  transform: translateX(-45%)
  color: #fff;
  font-size:15px;
}
.page >>> .van-tabbar-item__text{
  font-size 13px;
}
*{
  box-sizing border-box;
  // touch-action:auto;
}
#imgss{
  width 35%
  height:35%;
  max-width:350px;
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
  margin 0
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
.none {
  height: 250px;
  background-color: #eeeeee;
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

// 小店开始
.content {
    box-sizing border-box
    background-color #f5f5f5
    width:100%;
}
.content >>> .van-card {
    margin-top: 0
    padding 15px
    background-color:#ffffff
    // border:1px solid;
  
}
.title {
    display block
    font-size: 16px
    font-weight bold
    margin-bottom 4px
    // border:1px solid;
}
.desc {
    max-width 250px
}
.listContent {
    position relative
    
}
.card {
    height 120px
}
.van-card__content{
  padding-left:15px;
  position: relative;
}
.van-card__bottom{
  position: absolute;
  top 61px
}
.num {
    font-weight bold
    font-size: 14px
    padding 5px 8px
    padding-left 0
    
}
.van-card__price
   transform  translateY(10px)
.price {
    color: #f2104b
}
.vprice {
    color: #12acf4
}
.box ,.van-list{
  height 500px
}
// 小店结束
</style>