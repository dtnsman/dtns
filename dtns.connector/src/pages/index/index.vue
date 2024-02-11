<template>
  <!--微信组件-->
  <div class="box" style="position:fixed;overflow-y:scroll;top:46px;bottom:50px;left:0;right:0;" ref="listScroll">
    <header class="topbar" style="border-bottom:1px solid #eee; height:46px; position:fixed; top:0; background-color:#fff; margin:0 auto; align:center; z-index:999;">
      <div style="margin:0 auto;height:46px;" align="center">
        <svg v-if="imgStatus == true " style="width:17px;height:17px;top:13px; position:absolute;" t="1590975627508" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5496" width="17" height="17"><path d="M514.752467 0.007392a511.992334 511.992334 0 1 0 509.254407 511.992334A511.992334 511.992334 0 0 0 514.752467 0.007392z m375.095988 528.419896A752.929903 752.929903 0 0 1 659.862593 574.972045a301.171961 301.171961 0 0 1-101.303296-16.427561c-8.213781 128.682565-161.537688 276.530619-183.441103 295.696107a21.903415 21.903415 0 0 1-19.165489 5.475854 30.117196 30.117196 0 0 1-19.165488-8.213781 27.379269 27.379269 0 0 1 2.737927-38.330977c54.758538-52.020611 188.916957-199.868665 161.537688-290.220253-71.1861-62.972319-262.840984-5.475854-331.289157 21.903415a27.379269 27.379269 0 0 1-35.59305-16.427561 24.641342 24.641342 0 0 1 13.689635-35.59305c24.641342-8.213781 224.510007-84.875734 347.716718-38.330977 8.213781-128.682565 147.848054-268.316838 167.013542-287.482327a30.117196 30.117196 0 0 1 38.330977 2.737927 27.379269 27.379269 0 0 1 0 38.330977c-49.282685 49.282685-169.751469 191.654884-150.58598 282.006473 73.924027 60.234392 254.627203 10.951708 320.337449-13.689635a27.379269 27.379269 0 1 1 19.165489 52.020612z" fill="#1afa29" p-id="5497"></path></svg>
        <svg v-if="imgStatus == false " style="width:17px;height:17px;top:13px; position:absolute;" t="1590976113043" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5679" width="17" height="17"><path d="M514.752467 0.007392a511.992334 511.992334 0 1 0 509.254407 511.992334A511.992334 511.992334 0 0 0 514.752467 0.007392z m375.095988 528.419896A752.929903 752.929903 0 0 1 659.862593 574.972045a301.171961 301.171961 0 0 1-101.303296-16.427561c-8.213781 128.682565-161.537688 276.530619-183.441103 295.696107a21.903415 21.903415 0 0 1-19.165489 5.475854 30.117196 30.117196 0 0 1-19.165488-8.213781 27.379269 27.379269 0 0 1 2.737927-38.330977c54.758538-52.020611 188.916957-199.868665 161.537688-290.220253-71.1861-62.972319-262.840984-5.475854-331.289157 21.903415a27.379269 27.379269 0 0 1-35.59305-16.427561 24.641342 24.641342 0 0 1 13.689635-35.59305c24.641342-10.951708 224.510007-84.875734 347.716718-38.330977 8.213781-128.682565 147.848054-268.316838 167.013542-287.482327a30.117196 30.117196 0 0 1 38.330977 2.737927 27.379269 27.379269 0 0 1 0 38.330977c-49.282685 49.282685-169.751469 191.654884-150.58598 282.006473 73.924027 60.234392 254.627203 10.951708 320.337449-13.689635a27.379269 27.379269 0 1 1 19.165489 52.020612z" fill="#F00945" p-id="5680"></path></svg>
        <span style="margin-left:24px; font-size:16px; line-height:43px;">消息</span>
      </div>
      <ib3status style="position:absolute; top:12px; left:15px;z-index:999" />
      <!-- <div style="position:absolute; top:14px; left:15px;z-index:999" @click="switchIB3">
        <img :src="dtnsIcon" width="18" height="18"/>
        <span>{{ nowIB3name }}</span>
      </div> -->
      <div style="position:absolute; top:14px; right:15px;z-index:999">
        <van-icon name="plus" slot="right" @click="pageset" />
      </div>
    </header>
    <div v-show="addshow" @click="addshow = false" style="background:transparent;position:fixed; z-index:888; width:100%; height:100%;top:0;left:0">
    </div>
    <div class="box_x" style="filter: invert(1) hue-rotate(180deg);" v-show="addshow">
      <div style="float:left; border-bottom:1px solid #666;width:100%;" @click="chat">
        <img src="../../assets/images/groupChat.png" alt="" width="20px;" style="float:left; margin:11px 0 10px 15px;">
        <p style="color:#fff; font-size:14px; float:left; padding:11px 0 0 9px; margin:0;">发起群聊 </p>
      </div>
      <div style="float:left; border-bottom:1px solid #666;width:100%;" @click="friend">
        <img src="../../assets/images/friend.png" alt="" width="20px;" style="float:left; margin:10px 0 10px 15px;">
        <p style="color:#fff; font-size:14px; float:left; padding:10px 0 0 8px; margin:0;">添加联系人 </p>
      </div>
      <div style="float:left;border-bottom:1px solid #666; width:100%;" @click="scan">
        <img src="../../assets/images/scan.png" alt="" width="20px;" style="float:left; margin:10px 0 0 15px;">
        <p style="color:#fff; font-size:14px; float:left; padding:10px 15px 10px 8px; margin:0;">扫一扫 </p>
      </div>
      <div style="float:left;border-bottom:1px solid #666; width:100%;" @click="sendDtns">
        <img src="../../assets/images/address.png" alt="" width="20px;" style="float:left; margin:10px 0 0 15px;">
        <!-- <svg style="color:black;float:left; margin:10px 0 0 15px;" t="1589768344498" class="icon" viewBox="0 0 1324 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4061" width="22" height="22"><path d="M1257.485342 303.530945h-33.355049V66.710098a66.710098 66.710098 0 0 0-66.710098-66.710098H66.710098a66.710098 66.710098 0 0 0-66.710098 66.710098v890.579804a66.710098 66.710098 0 0 0 66.710098 66.710098h1090.710097a66.710098 66.710098 0 0 0 66.710098-66.710098v-236.820847h33.355049a66.710098 66.710098 0 0 0 66.710098-66.710097v-283.517916a66.710098 66.710098 0 0 0-66.710098-66.710097z m-100.065147 653.758957H66.710098V66.710098h1090.710097v236.820847H763.830619a66.710098 66.710098 0 0 0-66.710098 66.710097v283.517916a66.710098 66.710098 0 0 0 66.710098 66.710097h393.589576z m-393.589576-303.530944v-283.517916h493.654723v283.517916z" p-id="4062"></path></svg> -->
        <p style="color:#fff; font-size:14px; float:left; padding:10px 15px 10px 8px; margin:0;">收付款 </p>
      </div>
      <div style="float:left;border-bottom:1px solid #666; width:100%;" @click="broadcast('group_live')">
        <svg style="float:left; margin:10px 0 0 15px;" t="1589768344498" class="icon" viewBox="0 0 1451 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2504" width="20" height="20"><path d="M911.266055 93.944954a93.944954 93.944954 0 0 0-93.944954-93.944954H93.944954a93.944954 93.944954 0 0 0-93.944954 93.944954v836.110092a93.944954 93.944954 0 0 0 93.944954 93.944954h723.376147a93.944954 93.944954 0 0 0 93.944954-93.944954V352.293578zM1427.963303 84.550459a42.275229 42.275229 0 0 0-46.972477 0l-403.963303 230.165137v394.568808l403.963303 234.862385h46.972477a56.366972 56.366972 0 0 0 23.486238-42.275229V122.12844a46.972477 46.972477 0 0 0-23.486238-37.577981z" fill="#FFFFFF" p-id="2505"></path></svg>
        <p style="color:#fff; font-size:14px; float:left; padding:10px 15px 10px 8px; margin:0;">开直播间 </p>
      </div>
       <div style="float:left;border-bottom:0px solid #666; width:100%;" @click="broadcast('group_shop')">
        <svg style="float:left; margin:10px 0 10 15px;" t="1590460171190" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2965" width="18" height="18"><path d="M1008.995228 367.590465L840.204205 15.004772a26.256381 26.256381 0 0 0-22.50547-15.003647H210.051051a30.007293 30.007293 0 0 0-26.256381 15.003647L18.754558 367.590465a153.787377 153.787377 0 0 0-18.754558 71.267321c0 97.523702 105.025526 172.541935 232.556521 172.541935a296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205 296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205c131.281907 0 232.556521-75.018233 232.556521-172.541935a153.787377 153.787377 0 0 0-18.754558-71.267321zM660.160447 648.908837a243.809256 243.809256 0 0 1-146.285554 48.761851 255.061991 255.061991 0 0 1-146.285553-48.761851 236.307433 236.307433 0 0 1-146.285554 48.761851 277.567461 277.567461 0 0 1-123.780084-33.758204v326.329311a30.007293 30.007293 0 0 0 26.256382 33.758205h780.189619a30.007293 30.007293 0 0 0 26.256381-33.758205v-326.329311a262.563814 262.563814 0 0 1-123.780084 33.758204 243.809256 243.809256 0 0 1-146.285553-48.761851z" fill="#FFFFFF" p-id="2966"></path></svg>
        <p style="color:#fff; font-size:14px; float:left; padding:10px 0 0 9px; margin:0;">开通小店 </p>
      </div>
      <!-- <div style="float:left;" @click="createGNode()">
        <svg style="float:left; margin:10px 0 0 15px;" t="1590460171190" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="703" width="17" height="17"><path d="M882.1914 744.849921c-60.501005 0-112.097749 38.645092-131.425292 92.560342H244.912146c-80.468136 0-145.955927-62.61964-145.955926-139.570043 0-77.000371 65.487791-139.570043 145.955926-139.570043h136.312143c19.497433 53.585462 70.934281 91.950735 131.205434 91.950735 60.241173 0 111.688014-38.375266 131.205434-91.950735h136.452052C914.210763 558.280171 1023.340425 453.92743 1023.340425 325.660102S914.210763 93.040033 780.077216 93.040033H273.093982c-19.197627-54.165089-70.944274-93.040033-131.595182-93.040033C64.508422 0 1.928757 62.569672 1.928757 139.560049c0 76.950403 62.579665 139.570043 139.570043 139.570043 60.640915 0 112.377569-38.894931 131.585189-93.040033h506.993227c80.468136 0 145.955927 62.61964 145.955927 139.570043 0 77.000371-65.487791 139.570043-145.955927 139.570043H644.414655c-18.887826-54.734722-70.924287-94.139324-131.974938-94.139325-61.090625 0-113.097105 39.394609-131.974938 94.139325H244.912146c-134.133547 0-243.263209 104.352741-243.263209 232.620069 0 128.267328 109.129663 232.620069 243.263209 232.620069h505.524174c19.057717 54.394941 70.9043 93.529717 131.75508 93.529717 76.950403 0 139.570043-62.61964 139.570043-139.570043 0.009994-77.000371-62.61964-139.580036-139.570043-139.580036zM141.428845 207.036558c-37.166045 0-67.376574-30.230515-67.376574-67.376573 0-37.166045 30.210528-67.376574 67.376574-67.376574 37.146058 0 67.376574 30.210528 67.376573 67.376574 0 37.146058-30.230515 67.376574-67.376573 67.376573z m371.000878 236.257725c37.146058 0 67.376574 30.210528 67.376574 67.376574 0 37.146058-30.230515 67.376574-67.376574 67.376573-37.166045 0-67.376574-30.230515-67.376574-67.376573 0.009994-37.176039 30.210528-67.376574 67.376574-67.376574z m369.761677 508.502254c-37.166045 0-67.376574-30.230515-67.376574-67.376573 0-37.166045 30.210528-67.376574 67.376574-67.376574 37.146058 0 67.376574 30.210528 67.376574 67.376574 0 37.146058-30.230515 67.376574-67.376574 67.376573z" p-id="6194" fill="#FFFFFF"></path></svg>
        <p style="color:#fff; font-size:14px; float:left; padding:10px 0 0 9px; margin:0;">创建G节点 </p>
      </div> -->
       <!-- <div style="float:left;" @click="goShopping">
        <svg style="float:left; margin:10px 0 0 15px;" t="1590460171190" class="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2965" width="18" height="18"><path d="M1008.995228 367.590465L840.204205 15.004772a26.256381 26.256381 0 0 0-22.50547-15.003647H210.051051a30.007293 30.007293 0 0 0-26.256381 15.003647L18.754558 367.590465a153.787377 153.787377 0 0 0-18.754558 71.267321c0 97.523702 105.025526 172.541935 232.556521 172.541935a296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205 296.322019 296.322019 0 0 0 142.534642-33.758205 270.065637 270.065637 0 0 0 138.78373 33.758205c131.281907 0 232.556521-75.018233 232.556521-172.541935a153.787377 153.787377 0 0 0-18.754558-71.267321zM660.160447 648.908837a243.809256 243.809256 0 0 1-146.285554 48.761851 255.061991 255.061991 0 0 1-146.285553-48.761851 236.307433 236.307433 0 0 1-146.285554 48.761851 277.567461 277.567461 0 0 1-123.780084-33.758204v326.329311a30.007293 30.007293 0 0 0 26.256382 33.758205h780.189619a30.007293 30.007293 0 0 0 26.256381-33.758205v-326.329311a262.563814 262.563814 0 0 1-123.780084 33.758204 243.809256 243.809256 0 0 1-146.285553-48.761851z" fill="#FFFFFF" p-id="2966"></path></svg>
        <p style="color:#fff; font-size:14px; float:left; padding:10px 0 0 9px; margin:0;">购物车测试</p>
      </div> -->
    </div>
    <!-- <div style="height:46px;"></div> -->
    <div v-if="add" style="font-size:14px; padding-top:10px; padding-left:15px;">
      暂无任何记录
    </div>
    <van-pull-refresh
      v-model="isLoading"
      :success-text="textNews"
      @refresh="onRefresh"
    >

    <div>
      <div class="list" v-for="(item,index) in list" :key="index" @click="come(item)">
        <van-swipe-cell>
          <div style="position: relative;border-bottom:1px solid #f5f5f5;overflow:hidden;padding:0 15px 0 15px;">
            <div class="left">
            <van-tag v-show="item.unread_num" round type="danger">{{item.unread_num}}</van-tag>
            <img v-lzlogo="item.chatlogo" />
          </div>
          <div style="position:absolute; top:48px; left:44px;">
            <svg v-if="item.vip_level === 1 && item.chat_type !== 'group_live'" t="1586568097421" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1426" width="22" height="22"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="1427"></path><path d="M530.317338 703.278973a25.077593 25.077593 0 0 1-7.375763 0 36.878813 36.878813 0 0 1-28.396686-26.921534l-91.828246-351.455092H316.42022a36.878813 36.878813 0 1 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l79.658237 304.987787 241.556229-317.895372A36.878813 36.878813 0 0 1 848.21271 310.51961l-288.761109 378.376626a36.878813 36.878813 0 0 1-29.134263 14.382737zM1006.054032 714.711405h-71.544898l73.757627-357.72449L890.992134 442.545762l16.226678-84.083695 115.061898-84.083695h71.544898z" fill="#FFFFFF" p-id="1428"></path></svg>
            <svg v-else-if="item.vip_level === 2 && item.chat_type !== 'group_live'" t="1586568234392" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1930" width="22" height="22"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="1931"></path><path d="M476.47427 712.498676h-7.375763a36.878813 36.878813 0 0 1-28.396686-26.921533L348.873576 334.12205H262.577152a36.878813 36.878813 0 0 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l80.027026 304.987788 242.293804-318.264161a36.878813 36.878813 0 1 1 58.637314 44.992153l-289.129898 378.007838a36.878813 36.878813 0 0 1-29.503051 14.751525zM1032.606777 540.643406l-140.139491 119.487355h205.046203l-13.276373 63.800348h-304.250211l12.538797-63.800348 199.883169-165.95466c51.630339-42.779424 70.069746-67.119441 70.069745-103.998254a57.162161 57.162161 0 0 0-59.743677-62.693983A87.771576 87.771576 0 0 0 912.750634 405.666948h-73.757627a158.578898 158.578898 0 0 1 168.167389-141.614643 116.537051 116.537051 0 0 1 126.125542 123.912813c1.475153 57.530949-36.878813 99.204008-100.679161 152.678288z" fill="#FFFFFF" p-id="1932"></path></svg>
            <svg v-else-if="item.vip_level === 3 && item.chat_type !== 'group_live'" t="1586568253412" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2058" width="22" height="22"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="2059"></path><path d="M476.47427 712.498676h-7.375763a36.878813 36.878813 0 0 1-28.396686-26.921533L348.873576 334.12205H262.577152a36.878813 36.878813 0 0 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l80.027026 304.987788 242.293804-318.264161a36.878813 36.878813 0 1 1 58.637314 44.992153l-289.129898 378.007838a36.878813 36.878813 0 0 1-29.503051 14.751525zM1024.862227 492.33216a83.714907 83.714907 0 0 1 47.204881 85.190059A157.103745 157.103745 0 0 1 915.700939 737.57627c-80.764602 0-124.65039-44.254576-124.65039-108.054924a110.63644 110.63644 0 0 1 0-21.389712h64.537924a96.253703 96.253703 0 0 0 0 14.751526 54.949432 54.949432 0 0 0 60.850042 57.899737 97.360068 97.360068 0 0 0 91.090669-102.523102c0-36.878813-19.176983-58.268525-62.325194-58.268525h-11.801221l11.063644-56.424585h12.170009A88.509152 88.509152 0 0 0 1038.1386 368.788135a50.523974 50.523974 0 0 0-54.580644-55.687009 84.452483 84.452483 0 0 0-80.395814 67.857017h-64.906712A147.515254 147.515254 0 0 1 992.408871 258.151694a102.89189 102.89189 0 0 1 110.63644 107.686136 132.026152 132.026152 0 0 1-78.183084 126.49433z" fill="#FFFFFF" p-id="2060"></path></svg>
            <svg v-else-if="item.vip_level === 4 && item.chat_type !== 'group_live'" t="1586568261703" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2186" width="22" height="22"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="2187"></path><path d="M476.47427 712.498676h-7.375763a36.878813 36.878813 0 0 1-28.396686-26.921533L348.873576 334.12205H262.577152a36.878813 36.878813 0 0 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l80.027026 304.987788 242.293804-318.264161a36.878813 36.878813 0 1 1 58.637314 44.992153l-289.129898 378.007838a36.878813 36.878813 0 0 1-29.503051 14.751525zM1073.173472 619.932855h-51.999127l-19.545771 97.728855h-58.268525l19.545771-97.728855h-184.394067l11.063644-56.424585 212.421965-320.845677H1069.485591l-212.790754 320.845677h116.905839l21.7585-110.63644h58.268525l-21.389712 110.63644h51.999127z" fill="#FFFFFF" p-id="2188"></path></svg>
            <svg v-else-if="item.vip_level === 5 && item.chat_type !== 'group_live'" t="1586568270537" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2314" width="22" height="22"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="2315"></path><path d="M476.47427 712.498676h-7.375763a36.878813 36.878813 0 0 1-28.396686-26.921533L348.873576 334.12205H262.577152a36.878813 36.878813 0 0 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l80.027026 304.987788 242.293804-318.264161a36.878813 36.878813 0 1 1 58.637314 44.992153l-289.129898 378.007838a36.878813 36.878813 0 0 1-29.503051 14.751525zM1106.364404 318.632948h-184.394067l-25.077593 127.231907a105.842195 105.842195 0 0 1 75.601568-25.815169 94.778551 94.778551 0 0 1 101.047948 102.891889 289.498686 289.498686 0 0 1-4.056669 53.843068 231.598949 231.598949 0 0 1-53.105491 121.700084A142.721008 142.721008 0 0 1 912.381846 737.57627a101.416737 101.416737 0 0 1-112.84917-104.735831 175.91194 175.91194 0 0 1 0-20.652135h62.693983a94.040974 94.040974 0 0 0 0 14.013949 48.311246 48.311246 0 0 0 51.630339 53.843068c57.162161 0 78.551873-45.729729 89.615517-104.367043a236.761983 236.761983 0 0 0 5.531822-44.992152c0-32.822144-12.170008-57.162161-50.523975-57.162161a82.97733 82.97733 0 0 0-73.757627 43.885788H826.085422l51.630339-258.151694h241.18744z" fill="#FFFFFF" p-id="2316"></path></svg>
            <svg v-else-if="item.vip_level === 6 && item.chat_type !== 'group_live'" t="1586568280328" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2442" width="22" height="22"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="2443"></path><path d="M476.47427 712.498676h-7.375763a36.878813 36.878813 0 0 1-28.396686-26.921533L348.873576 334.12205H262.577152a36.878813 36.878813 0 0 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l80.027026 304.987788 242.293804-318.264161a36.878813 36.878813 0 1 1 58.637314 44.992153l-289.129898 378.007838a36.878813 36.878813 0 0 1-29.503051 14.751525zM939.672168 737.57627a123.544025 123.544025 0 0 1-132.763729-132.394941 239.712288 239.712288 0 0 1 56.793373-142.721008l154.15344-214.265906h70.438534l-147.515254 200.620745a103.629466 103.629466 0 0 1 38.722754-6.269398c59.006102 0 110.63644 40.935483 110.636441 127.969483A154.891017 154.891017 0 0 1 939.672168 737.57627z m19.176983-243.768957a98.466432 98.466432 0 0 0-89.984305 105.473406 70.807322 70.807322 0 0 0 67.857016 80.027025 98.097644 98.097644 0 0 0 89.615517-106.579771A69.700957 69.700957 0 0 0 958.849151 493.807313z" fill="#FFFFFF" p-id="2444"></path></svg>
            <svg v-else-if="item.vip_level === 7 && item.chat_type !== 'group_live'" t="1586568292479" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2570" width="22" height="22"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="2571"></path><path d="M467.992143 721.349592h-7.375763a36.878813 36.878813 0 0 1-28.396686-26.921534L340.391448 342.972965H254.095025a36.878813 36.878813 0 0 1 0-73.757627H368.788135a36.878813 36.878813 0 0 1 36.878813 27.659111l80.027026 304.987787 242.293804-318.26416a36.878813 36.878813 0 1 1 57.530949 44.992152l-288.023533 378.007838a36.878813 36.878813 0 0 1-29.503051 14.751526zM1169.427176 327.483864l-255.20139 419.680897h-70.438534L1098.988642 327.483864h-152.3095l-14.382737 71.544898H870.339998l26.183958-128.707059H1180.122031z" fill="#FFFFFF" p-id="2572"></path></svg>
            <svg v-else-if="item.vip_level === 8 && item.chat_type !== 'group_live'" t="1586568301189" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2698" width="22" height="22"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="2699"></path><path d="M476.47427 712.498676h-7.375763a36.878813 36.878813 0 0 1-28.396686-26.921533L348.873576 334.12205H262.577152a36.878813 36.878813 0 0 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l80.027026 304.987788 242.293804-318.264161a36.878813 36.878813 0 1 1 58.637314 44.992153l-289.129898 378.007838a36.878813 36.878813 0 0 1-29.503051 14.751525zM1048.464667 491.963372a102.523101 102.523101 0 0 1 43.148212 90.721881 147.515254 147.515254 0 0 1-157.472534 154.891017A113.217957 113.217957 0 0 1 811.333897 617.351338a142.35222 142.35222 0 0 1 87.033999-134.238881 97.360068 97.360068 0 0 1-36.878813-80.764602 143.827373 143.827373 0 0 1 147.515254-147.515254A110.63644 110.63644 0 0 1 1125.541387 368.788135a134.976457 134.976457 0 0 1-77.07672 123.175237z m-83.714906 24.340017a90.353093 90.353093 0 0 0-88.877941 96.622491 60.112466 60.112466 0 0 0 61.587619 65.644288 89.984305 89.984305 0 0 0 89.615516-96.253703A60.481254 60.481254 0 0 0 964.749761 516.303389z m40.566695-204.308627a85.558847 85.558847 0 0 0-81.13339 90.353093 53.105491 53.105491 0 0 0 56.055796 58.268525A85.558847 85.558847 0 0 0 1061.003464 368.788135a53.105491 53.105491 0 0 0-55.687008-56.793373z" fill="#FFFFFF" p-id="2700"></path></svg>
            <svg v-else-if="item.vip_level === 9 && item.chat_type !== 'group_live'" t="1586568308857" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2826" width="22" height="22"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="2827"></path><path d="M486.800338 712.498676H479.424575a36.878813 36.878813 0 0 1-28.396686-26.921533L359.199643 334.12205H272.90322a36.878813 36.878813 0 0 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l80.027025 304.987788 242.293805-318.264161a36.878813 36.878813 0 1 1 58.637313 44.992153L516.303389 697.747151a36.878813 36.878813 0 0 1-29.503051 14.751525zM1094.194396 516.303389l-153.415864 212.421965h-71.17611l147.515254-200.620745a106.210983 106.210983 0 0 1-39.091542 6.638186c-59.37489 0-112.480381-40.935483-112.480382-127.969482a154.891017 154.891017 0 0 1 152.3095-165.585873 123.912813 123.912813 0 0 1 132.763729 132.394941A238.237135 238.237135 0 0 1 1094.194396 516.303389z m-74.495203-221.272881a98.466432 98.466432 0 0 0-89.615517 106.210983 70.438534 70.438534 0 0 0 68.594593 79.289449 98.097644 98.097644 0 0 0 88.877941-105.473407C1087.55621 331.909321 1062.847405 295.030508 1019.699193 295.030508z" fill="#FFFFFF" p-id="2828"></path></svg>
            <svg v-else-if="item.chat_type == 'group_live'" t="1590457791295" class="icon" viewBox="0 0 1526 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2469" width="22" height="22"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ACF4" p-id="2470"></path><path d="M803.958134 291.342627a44.254576 44.254576 0 0 0-44.254576-44.254577h-331.909322a40.566695 40.566695 0 0 0-40.566694 44.254577v383.53966a40.566695 40.566695 0 0 0 40.566694 40.566695h331.909322a44.254576 44.254576 0 0 0 44.254576-40.566695V409.35483zM1036.294659 283.966864a18.439407 18.439407 0 0 0-18.439407 0l-184.394067 106.948559v180.706186l184.394067 106.948559h18.439407a18.439407 18.439407 0 0 0 11.063644-18.439407V306.094152a25.815169 25.815169 0 0 0-11.063644-22.127288z" fill="#FFFFFF" p-id="2471"></path></svg>
            <svg v-else-if="item.chat_type == 'group_shop'" t="1591091838113" class="icon" viewBox="0 0 1526 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3514" width="22" height="22"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ACF4" p-id="3515"></path><path d="M995.727964 398.291186l-95.884915-199.145593c0-3.687881-7.375763-7.375763-11.063644-7.375763h-342.972965a18.439407 18.439407 0 0 0-14.751526 7.375763l-92.197034 199.145593h-3.687881a132.763729 132.763729 0 0 0-7.375763 36.878813c0 55.31822 59.006102 99.572796 129.075848 99.572796a177.018305 177.018305 0 0 0 81.133389-18.439406 169.642542 169.642542 0 0 0 77.445509 18.439406 177.018305 177.018305 0 0 0 81.133389-18.439406 177.018305 177.018305 0 0 0 81.13339 18.439406c70.069746 0 129.075847-44.254576 129.075847-99.572796a84.821271 84.821271 0 0 0-11.063644-36.878813zM800.270253 560.557965a154.891017 154.891017 0 0 1-84.821271 25.815169 151.203135 151.203135 0 0 1-81.13339-25.815169 151.203135 151.203135 0 0 1-81.13339 25.815169 140.139491 140.139491 0 0 1-70.069745-18.439406v184.394067a18.439407 18.439407 0 0 0 14.751525 18.439407h438.85788a18.439407 18.439407 0 0 0 14.751526-18.439407v-184.394067a140.139491 140.139491 0 0 1-70.069746 18.439406 151.203135 151.203135 0 0 1-81.133389-25.815169z" fill="#FFFFFF" p-id="3516"></path></svg>
          </div>
          <div class="info">
            <div class="name" style="width:120px;">
            <!-- <div class="name" :style="{'width': computedStringWidth(item.chatname)*8+ 'px' }"> -->
              {{item.chatname}}
            </div>
            <div class="newinfo" style="width: 150px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">{{item.recent_msg.msg}}</div>
          </div>
          <div class="right">{{item.create_time}}</div>
          </div>
        <template #right>
          <van-button square text="删除" @click="deleChat" type="danger" class="delete-button" />
        </template>
        </van-swipe-cell>
      </div>
      <div ref="nullDiv" class="list" :style="{height:nullDivHeight + 'px'}" ></div>
      <!-- <div style="height:50px;width:100%;float:left;"></div> -->
    </div>
    
    </van-pull-refresh>
    <floor></floor>
  </div>
</template>
<script>
import floor from "../../components/floor/floor.vue";
import imgOnline from "../../assets/images/onLine.png";
import imgOffLine from "../../assets/images/offLine.png";
import ib3status  from "../../components/header/ib3status.vue"
import dtnsImgUrl from "../../../static/images/connect-mini.jpg"

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

export default {
  name: 'index',
  components: {
      floor,
      ib3status
  },
  data() {
    return {
      scrollTop:0,
      listtime:false,
      count:0,
      isLoading:false,
      imgStatus:true,
      addshow:false,
      add:false,
      pageName: "联系",
      list:[],
      status:'直播间',
      value: 1,
      num: 1,
      textNews:'刷新成功',
      nowIB3name:'',
      dtnsIcon:dtnsImgUrl,
      nullDivHeight:0,
    };
  },
  methods: {
    switchIB3(){
      this.$router.push('/changeSvrNode')
    },
    deleChat(){//删除会话列表
      this.$toast.fail('该功能尚未完善')
    },
    onRefresh() {//下拉刷新
      this.scrollTop = 0
      document.documentElement.scrollTop = this.scrollTop
      this.chatlist()
      let i = 0
      console.log(this.listtime)
      console.log(i)
      let timex = setInterval(() => {
        i++;
        console.log(i)
        console.log(this.listtime)
        if(this.listtime ==true){
          clearInterval(timex);
          // this.$toast('刷新成功')
          this.textNews = '刷新成功'
          this.isLoading = false;
          i=0;
        }else if(i >=6){
          clearInterval(timex);
          // this.$toast('当前网络不佳，请重试')
          this.textNews = '当前网络不佳，请重试'
          this.isLoading = false;
          i=0;
        }
      }, 1000);
    },///

    pageset(){
      console.log(this.addshow)
      if(this.addshow){
        this.addshow = false
      }else{
        this.addshow = true
      }
    },
    chat(){ //添加群聊
      this.$router.push('/index/GroupChat')
      this.addshow  = !this.addshow 
    },
    friend(){ //添加朋友
      this.$router.push('/index/addfriend')
      this.addshow  = !this.addshow 
    },
    scan(){ //扫一扫
      this.$router.push('/index/scan')
      this.addshow  = !this.addshow 
    },
    sendDtns()
    {
      this.$router.push('/wallet')
      this.addshow  = !this.addshow 
    },
    broadcast(type){//开直播/开小店
      this.$router.push('/LiveBroadcast/OppenBroadcast/'+type)
      this.addshow  = !this.addshow 
    },
    createGNode(){
      this.$toast.fail('该功能尚未完善')
      this.addshow  = !this.addshow 
    },
    change(user_keepalive){//判断是否掉线
      if(user_keepalive==1)
      {
        this.imgStatus = true;
      }else{
        this.imgStatus = false;
      }
    },
    async come(item) {//跳转进入聊天室
      console.log(item)
      let shop_id = item.shop_id
      localStorage.setItem('shopid',shop_id)
      console.log(shop_id)
      let chatname = item.chatname
      console.log(chatname)
      localStorage.setItem("chatname",chatname)
      // imDb.addData({key:item.token_y,data:item})
      if(item.chat_type =='group_live' || item.chat_type == "group_shop"){
         this.$router.push(`/LiveBroadcast/videoChat/${item.token_y}`)
      }
      else{
         this.$router.push(`/index/chat/${item.token_y}`)
      }
      },
    
    async chatlist(refresh = true){//聊天窗口列表
      this.listtime = false
      let data = JSON.parse(localStorage.getItem('userInfo'));//
            let user = {
              user_id:data.user_id,
              s_id:data.s_id,
            }

     
      while(!iWalletDb.db)  await rpc_client.sleep(100)
      while(!imageDb.db)  await rpc_client.sleep(100)
      while(!imDb.db)  await rpc_client.sleep(100)
      // while(!rpc_client.client) await rpc_client.sleep(200)
      
      // let firstTimeFlag = false
      // firstTimeFlag = rpc_client.client.peers().length<1
      // while(rpc_client.client.peers().length<1)
      //       await rpc_client.sleep(50)
      // if(firstTimeFlag) await rpc_client.sleep(1200)
      
      //localStorage.getItem('recentmsgs_cached')
      let res = null ,recentmsgs_cached = await imDb.getDataByKey('recentmsgs_cached'),This = this,fromNetFlag = false
      if(recentmsgs_cached && recentmsgs_cached.data)
      {
        try{
          res = recentmsgs_cached.data
          console.log('chat.vue-chatlist-cached-msgs:',res)

          if(refresh){
            while(!rpc_client.pingpong_flag) await rpc_client.sleep(50)
            this.$api.network.ChatRecentMsgs(user).then((d)=>{
              if(d && d.ret){
                //localStorage.setItem('recentmsgs_cached',JSON.stringify(d))
                imDb.deleteDataByKey('recentmsgs_cached')
                imDb.addData({key:'recentmsgs_cached',data:d})
                This.chatlist(false)
              }else{
                console.log('index.vue:更新消息列表失败')
                // This.$toast.fail('更新消息列表失败')
              }
            })
          }
        }catch(ex){
          // console.log('[Error]parse recentmsgs_cached_str error')
          //localStorage.removeItem('recentmsgs_cached')
          imDb.deleteDataByKey('recentmsgs_cached')
          res = null
          while(!rpc_client.pingpong_flag) await rpc_client.sleep(50)
          //通过网络获取
          res = await this.$api.network.ChatRecentMsgs(user)
          fromNetFlag = true
        }
      }
      else{
        while(!rpc_client.pingpong_flag) await rpc_client.sleep(50)
        res = await this.$api.network.ChatRecentMsgs(user),fromNetFlag=true
      } 
      // .catch(e => {
      //   console.log(res)
      //   let array = JSON.parse(localStorage.getItem('error'))
      //   array.push(e)
      //   localStorage.setItem('error',JSON.stringify(array))
      // })
      console.log('chatlist-recentmsgs:',res)
      if(!res || !res.ret)
      {
        console.log('【Error】无法获取聊天列表信息')
        return ;
      }
      // if(res.ret)
      {
        this.listtime = true
      }
      console.log('fromNetFlag:'+fromNetFlag)
      if(fromNetFlag){
        imDb.deleteDataByKey('recentmsgs_cached')
        console.log('begin-imDb-addData:',res)
        imDb.addData({key:'recentmsgs_cached',data:res})
        //localStorage.setItem('recentmsgs_cached',JSON.stringify(res))
      }
      //使用默认图
      let total_unread_num =0;
      for(let i=0;res && res.list && i<res.list.length;i++)
      {
        let chatInfo = res.list[i]
        // localStorage.setItem(chatInfo.token_y,JSON.stringify(chatInfo))
        imDb.addData({key:chatInfo.token_y,data:chatInfo})//JSON.stringify(chatInfo)})
        let readed_height = await localStorage.getItem('readed_height_'+localStorage.user_id+'_'+chatInfo.token_y) ;
        readed_height = !readed_height? 0 : parseInt(readed_height)
        if(chatInfo.readed_height > readed_height){
          localStorage.setItem('readed_height_'+localStorage.user_id+'_'+chatInfo.token_y,chatInfo.readed_height) 
          readed_height = chatInfo.readed_height
        } 
        chatInfo.height = chatInfo.height? chatInfo.height :0;
        chatInfo.unread_num =  chatInfo.height - readed_height
        // console.log(chatInfo.height,readed_height,chatInfo.unread_num)
        chatInfo.unread_num = chatInfo.unread_num<0 ? 0:chatInfo.unread_num;
        total_unread_num += chatInfo.unread_num;
        // console.log(total_unread_num + "-------------")

        if(chatInfo.recent_msg)
        {
          //2023-3-28新增
          chatInfo.recent_msg.msg = await g_dchatManager.decryptMsgInfo(chatInfo.recent_msg.msg)
        }

        if(chatInfo.chat_type=='single')
        {
          // console.log('chat_type is single:',chatInfo)
          chatInfo.ret = true, chatInfo.chatid = chatInfo.token_y
          imDb.addData({key:'single-to-'+(user.user_id==chatInfo.user_a 
            ? chatInfo.user_b:chatInfo.user_a),data:chatInfo}) //这里使得联系人列表进入联系人页面，将可以直接聊天不需要联网请求chatid
          let dst_user_id = data.user_id == chatInfo.user_a ? chatInfo.user_b: chatInfo.user_a;
          this.$api.network.s_queryUserInfo(dst_user_id,function(qUserInfo){
            if(qUserInfo.logo)
            {
              chatInfo.chatlogo = qUserInfo.logo;
              //chatInfo.img = '/api/image/view?user_id='+localStorage.user_id+'&s_id='+localStorage.s_id+'&filename='+qUserInfo.logo+'&img_kind=open&img_p=min100';           
            }
            chatInfo.chatname = qUserInfo.user_name;
          })
          if(chatInfo.recent_msg)
          {
            chatInfo.create_time = GetDateTimeFormat(chatInfo.recent_msg.time_i);
          }
        }else{
          chatInfo.chatname =await g_dchatManager.decryptMsgInfo(chatInfo.chatname)
        }
         // chatInfo.img = `${this.$baseUrl}/image/view?user_id=`+localStorage.user_id+'&s_id='+localStorage.s_id+'&filename='+chatInfo.chatlogo//+'&img_kind=open&img_p=min500';
        //else
        //  chatInfo.img = "../../assets/mc_logos/"+(res.list[i].token_y.split('_')[1].substring(15,17).charCodeAt()%30+1)+'.jpeg'
        
      }

      //localStorage.setItem('total_unread_num',total_unread_num) 
      console.log('index.vue-total_unread_num:int:',total_unread_num)
      imDb.deleteDataByKey('total_unread_num')
      imDb.addData({key:'total_unread_num',data:total_unread_num})
      console.log('index.vue-total_unread_num:indexdb:',await imDb.getDataByKey('total_unread_num'))

      this.$api.network.updateTotalUnreadNum()
      this.list = res.list
      this.fixScrollHeight()
      if(res.list.length == 0){
        this.add = true
      }else{
        this.add = false
      }
      // console.log(res)
      
    },

    fixScrollHeight()
    {
      let num = this.list &&this.list.length>0 ? this.list.length: 0
      this.nullDivHeight = window.innerHeight- num * 72 - 46 -50 
      this.nullDivHeight = this.nullDivHeight>0 ? this.nullDivHeight:0
    },
    async show_newmsg(newMsgObj)
    {
      console.log('showNewMsg:'+JSON.stringify(newMsgObj))
      if(!newMsgObj ) return ;
      let updateRet = false;
      let addUnreadNumFlag = false;
      for(let i=0;this.list && i<this.list.length;i++)
      {
        let obj = this.list[i]
        if(obj.token_y == newMsgObj.token)
        {
          updateRet = true;
          obj.unread_num = newMsgObj.height - localStorage.getItem('readed_height_'+localStorage.user_id+'_'+obj.token_y) //obj.height;//应该在缓存中拿高度
          addUnreadNumFlag = obj.unread_num >0;
          obj.recent_msg = newMsgObj.opval
          obj.create_time = GetDateTimeFormat(newMsgObj.opval.time_i)
          obj.create_time_i=newMsgObj.opval.time_i

          //2023-3-28新增
          obj.recent_msg.msg = await g_dchatManager.decryptMsgInfo(obj.recent_msg.msg)
          break;
        }
      }
      if(!updateRet)
      {
        this.chatlist();
      }else{
        this.list.sort(function(a,b)
        {
            return b.create_time_i - a.create_time_i;
        })

        //总的未读高度。
        let total_unread_num = await imDb.getDataByKey('total_unread_num')///localStorage.getItem('total_unread_num') ;
        total_unread_num = total_unread_num ? total_unread_num.data : 0
        // console.log(total_unread_num + '++++++++++')
        total_unread_num = !total_unread_num ? 0 :parseInt(total_unread_num);
        total_unread_num+= parseInt(addUnreadNumFlag?1:0)
        imDb.addData({key:'total_unread_num',data:total_unread_num})
        //localStorage.setItem('total_unread_num',total_unread_num) ;
        this.$api.network.updateTotalUnreadNum()

        let tmp = []
        for(let i=0;this.list && i<this.list.length;i++) tmp.push(this.list[i])
        this.list = tmp
        this.fixScrollHeight()
        // console.log(total_unread_num + '++++++++++')

        imDb.addData({key:'recentmsgs_cached',data:{ret:true,list:this.list}})
      }
    },
    defaultSrc (event) {
      /*
      const img = event.srcElement  // 刚开始是以参数的形式定义的，但是默认的图片一直不能使用，遂改为此方式
      let params = {user_id:localStorage.user_id,s_id:localStorage.s_id,filename:img.src.split('filename=')[1],img_kind:'open',img_p:'min200'}
      img.src = this.$api.network.getImg(params)
      console.log('defaultSrc-img:',img)
      */
      img.onerror = null
      // img.src = './20211103110717.png' // 默认一张图片。若是public中的图片，直接 ./ 就可以
      // // 或 img.src = require('@/assets/images/20211103110717.png')
      // img.onerror = null // 若默认的图片地址亦无法正常使用，添加此可控制不一直跳动
    },
    error(){
      if(localStorage.getItem('error') === null)
      {
        localStorage.setItem('error',JSON.stringify([]))
      }
    },
    computedStringWidth(str) {  
    ///<summary>获得字符串实际长度，中文2，英文1</summary>  
    ///<param name="str">要获得长度的字符串</param>  
    // console.log(str)
      if (!str || !str.length) return 0
      var realLength = 0, len = str.length, charCode = -1;  
      for (var i = 0; i < len; i++) {  
          charCode = str.charCodeAt(i);  
          if (charCode >= 0 && charCode <= 128) realLength += 1;  
          else realLength += 2;  
      }
      if (realLength > 10) {
        return 10
      }
      return realLength;  
    },
    goShopping () {
      this.$router.push('/userShoppingCart')
    }
  },
  mounted() {
    this.nowIB3name = rpc_client.roomid
    // this.chatlist();
    var ilist = document.images;
    console.log('ilist-len:'+ilist.length)
    for(var i = 0; i < ilist.length; i++) {
        ilist[i].onloaded = function(){
          console.log('img-onloaded-url:'+ilist[i].src)
        }
        ilist[i].onerror = function(){
          console.log('img-onerror-url:'+ilist[i].src)
        }
    }
  },
  updated(){
    var ilist = document.images;
    console.log('ilist-len:'+ilist.length)
    for(var i = 0; i < ilist.length; i++) {
        ilist[i].onloaded = function(){
          console.log('img-onloaded-url:'+ilist[i].src)
        }
        ilist[i].onerror = function(){
          console.log('img-onerror-url:'+ilist[i].src)
        }
    }
  },
  async created() {
    this.imgStatus = window.rpc_client ? rpc_client.pingpong_flag :false
    let This = this
    window.g_showTips = function(msg,ok)
    {
      let msgObj = null
      try{
        msgObj = JSON.parse(msg)
      }catch(exx){}
      if(!msgObj)
        return this.$toast('【错误】请求授权的消息结构错误！')

      This.$dialog.confirm({
        title: '确认授权?',
        message: '请您确认是否同步钱包私钥:<br/><br/>目标公钥：'+msgObj.need_public_key+
        '<br/>加密公钥：'+msgObj.decrypt_public_key
        +'<br/>设备ID：'+msgObj.dtns_device_id
        +'<br/>DTNS-ID：'+msgObj.dtns_user_id
        +'<br/>手机（hash）：'+msgObj.phoneHash
        +'<br/>UID：'+msgObj.user_id
        +'<br/>昵称：'+msgObj.user_name,
        messageAlign:'left'
      })
        .then(() => {
          // on confirm
          
          g_dchatManager.sendNotice(async function(nowDeviceInfo){
            if(!nowDeviceInfo) return 
            nowDeviceInfo.need_public_key = msgObj.need_public_key
            nowDeviceInfo.notice_msg_type = 'query_ecc_keys_result_notice'
            nowDeviceInfo.decrypt_public_key = msgObj.decrypt_public_key
            nowDeviceInfo.s_id = null//没必要暴露这个session-id(安全起见)
            nowDeviceInfo.notice_result = await sign_util.encryptSomethingInfo(ok(),nowDeviceInfo.decrypt_public_key )
          },function(msg){
            This.$toast(msg)
          },function(){
            console.log('sendNotice success!')
            This.$toast('授权成功')
          })
          // if(typeof ok =='function')
          //   ok()
        })
        .catch(() => {
          // on cancel
        });
    }
    await this.chatlist()
    this.$api.network.addUserKeepAliveStatusFunc(this.change)
    this.$api.network.setNewMsgObjFunc(function(data)
    {
      console.log('newMsgObjFunc-data',data)
      This.show_newmsg(data)
    })
    this.$api.network.setIndexObj(this)

    this.$api.network.startWebSocket();
    this.error()
  },
  beforeRouteLeave(to,from,next){
    console.log('scroll-val:'+document.documentElement.scrollTop)//this.$refs.listScroll.scrollTop)
    this.scrollTop =document.documentElement.scrollTop// this.$refs.listScroll.scrollTop
    next();
  },
  activated(){
    this.imgStatus = window.rpc_client ? rpc_client.pingpong_flag :false
    this.addshow = false
    this.nowIB3name = rpc_client.roomid
    // console.log('$refs',this.$refs)
    console.log('this.scrollTop:'+this.scrollTop)
    this.chatlist(false)
    document.documentElement.scrollTop = this.scrollTop
    // this.$refs.listScroll.scrollTop = this.scrollTop
  }
};
</script>
<style lang="stylus" scoped>
.van-tag {
  position absolute
  font-size 12px;
  padding-top:0px;
  padding-bottom:0px;
  padding-left: 5px;
  padding-right:5px;
  line-height 17px;
  top 40px;
  right:20px;
}
.box_x {
  position:fixed; z-index:999; width:120px; height:242px; background-color:#333;border-radius:5px;
  right 10px;
  top:56px;
}
.box >>> .van-nav-bar__title {
  font-size 16px 
  font-weight bold
}
.box >>> .van-nav-bar .van-icon{
  font-size 1.1rem
  color #000
}
.topbar {
  position fixed
  top 0
  width 100%
  z-index 99
}                                                                                                                                                           
.list {
  height: 72px;
  width: 100%;
  // border-bottom: 1px solid #f5f5f5;
  float:left;
  background-color: #fff;
}

.list .left {
  img {
    width: 45px;
    height: 45px;
    border: 1px solid #eee;
    margin:13px 10px 13px 0px;
    float: left;
    clean: both;
    background-color:#f0f0f0
    border-radius:6px;
    // border:1px  solid;
  }
}

.list .info {
  height: 72px;
  width: 160px;
  display: table-cell;
  vertical-align: middle;
  // border:1px solid;
}

.info div {
  margin:6px 0 8px 0px;
  // border:1px solid;
}

.info .name {
  font-size: 15px;
  color: #000;
  margin-top:5px;
  float:left;
  height 20px
  // width:70px;
  overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
  // border:1px solid;
  padding-bottom:0;
  margin-bottom:4px;
}

.info .newinfo {
  color: #777;
  font-size:12px;
  height 20px
  width 50%;
  overflow hidden
  // border:1px solid;
  padding:0;
}

.list .right {
  float: right;
  position: absolute;
  right: 15px;
  top: 15px;
  color: #999999;
  font-size: 12px;
}
.goods-card {
    margin: 0;
    background-color: @white;
  }
.delete-button {
    height: 100%;
  }
</style>
