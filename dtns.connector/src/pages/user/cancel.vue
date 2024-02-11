<template>
<!--可复用的相册组件 这里只完成静态页面 不涉及数据-->
    <div class="box">
        <van-nav-bar
            title="会员"
            left-arrow
            @click-left="onClickLeft"
            :fixed="true"
            />
        <div style="text-align:center; margin:0 auto;">
          <div style="margin-top:76px;">
              <svg t="1586764345866" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2576" width="70" height="70"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="2577"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="2578"></path></svg>
          </div>
          <div style="font-size:18px; margin-top:18px;">VIP{{user_vip}}</div>
          <div style="font-size:12px; margin-top:23px;" v-if="vip_timeout !==''">到账时间： {{vip_timeout}}</div>
          <div style="font-size:12px; margin-top:12px;">{{Equity}}</div>
        </div>
        <div style="font-size:13px; padding-left:15px; margin-top:50px; padding-bottom:10px;">购买或者续费会员 :</div>
            <div v-for="(item,index) in list" :key="index"  @click="purchase(item)" style="position:relative;">
                 <div v-if="item.vip_level    !== 0">
                    <van-cell :title="'VIP' + item.vip_level" is-link :value="item.price + '元'" />
                <!-- <svg v-if ="item.vip_level === 0" style="position:absolute; top:12px; left:15px; z-index:1" t="1586769711814" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4176" width="19" height="19"><path d="M512.409161 0a511.992571 511.992571 0 1 0 511.591008 511.992571A512.394134 512.394134 0 0 0 512.409161 0z" fill="#12ADF5" p-id="4177"></path><path d="M471.851318 803.125602a27.30627 27.30627 0 0 1-8.031256 0 40.15628 40.15628 0 0 1-30.920335-28.912522L332.910589 392.326856H238.944894a40.15628 40.15628 0 0 1 0-80.31256h124.886031a40.15628 40.15628 0 0 1 40.15628 29.715648l86.737565 332.493999 264.228323-346.548698a40.15628 40.15628 0 0 1 63.848485 48.589099l-315.226798 412.003434a40.15628 40.15628 0 0 1-31.723462 14.857824z" fill="#FFFFFF" p-id="4178"></path></svg> -->
                <svg v-if ="item.vip_level === 1" style="position:absolute; top:12px; left:15px; z-index:1" t="1586765203512" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2744" width="20" height="20"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="2745"></path><path d="M530.317338 703.278973a25.077593 25.077593 0 0 1-7.375763 0 36.878813 36.878813 0 0 1-28.396686-26.921534l-91.828246-351.455092H316.42022a36.878813 36.878813 0 1 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l79.658237 304.987787 241.556229-317.895372A36.878813 36.878813 0 0 1 848.21271 310.51961l-288.761109 378.376626a36.878813 36.878813 0 0 1-29.134263 14.382737zM1006.054032 714.711405h-71.544898l73.757627-357.72449L890.992134 442.545762l16.226678-84.083695 115.061898-84.083695h71.544898z" fill="#FFFFFF" p-id="2746"></path></svg>
                <svg v-if ="item.vip_level === 2" style="position:absolute; top:12px; left:15px; z-index:1" t="1586765234266" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2952" width="20" height="20"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="2953"></path><path d="M476.47427 712.498676h-7.375763a36.878813 36.878813 0 0 1-28.396686-26.921533L348.873576 334.12205H262.577152a36.878813 36.878813 0 0 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l80.027026 304.987788 242.293804-318.264161a36.878813 36.878813 0 1 1 58.637314 44.992153l-289.129898 378.007838a36.878813 36.878813 0 0 1-29.503051 14.751525zM1032.606777 540.643406l-140.139491 119.487355h205.046203l-13.276373 63.800348h-304.250211l12.538797-63.800348 199.883169-165.95466c51.630339-42.779424 70.069746-67.119441 70.069745-103.998254a57.162161 57.162161 0 0 0-59.743677-62.693983A87.771576 87.771576 0 0 0 912.750634 405.666948h-73.757627a158.578898 158.578898 0 0 1 168.167389-141.614643 116.537051 116.537051 0 0 1 126.125542 123.912813c1.475153 57.530949-36.878813 99.204008-100.679161 152.678288z" fill="#FFFFFF" p-id="2954"></path></svg>
                <svg v-if ="item.vip_level === 3" style="position:absolute; top:12px; left:15px; z-index:1" t="1586765249750" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3080" width="20" height="20"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="3081"></path><path d="M476.47427 712.498676h-7.375763a36.878813 36.878813 0 0 1-28.396686-26.921533L348.873576 334.12205H262.577152a36.878813 36.878813 0 0 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l80.027026 304.987788 242.293804-318.264161a36.878813 36.878813 0 1 1 58.637314 44.992153l-289.129898 378.007838a36.878813 36.878813 0 0 1-29.503051 14.751525zM1024.862227 492.33216a83.714907 83.714907 0 0 1 47.204881 85.190059A157.103745 157.103745 0 0 1 915.700939 737.57627c-80.764602 0-124.65039-44.254576-124.65039-108.054924a110.63644 110.63644 0 0 1 0-21.389712h64.537924a96.253703 96.253703 0 0 0 0 14.751526 54.949432 54.949432 0 0 0 60.850042 57.899737 97.360068 97.360068 0 0 0 91.090669-102.523102c0-36.878813-19.176983-58.268525-62.325194-58.268525h-11.801221l11.063644-56.424585h12.170009A88.509152 88.509152 0 0 0 1038.1386 368.788135a50.523974 50.523974 0 0 0-54.580644-55.687009 84.452483 84.452483 0 0 0-80.395814 67.857017h-64.906712A147.515254 147.515254 0 0 1 992.408871 258.151694a102.89189 102.89189 0 0 1 110.63644 107.686136 132.026152 132.026152 0 0 1-78.183084 126.49433z" fill="#FFFFFF" p-id="3082"></path></svg>
                <svg v-if ="item.vip_level === 4" style="position:absolute; top:12px; left:15px; z-index:1" t="1586765261415" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3208" width="20" height="20"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="3209"></path><path d="M476.47427 712.498676h-7.375763a36.878813 36.878813 0 0 1-28.396686-26.921533L348.873576 334.12205H262.577152a36.878813 36.878813 0 0 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l80.027026 304.987788 242.293804-318.264161a36.878813 36.878813 0 1 1 58.637314 44.992153l-289.129898 378.007838a36.878813 36.878813 0 0 1-29.503051 14.751525zM1073.173472 619.932855h-51.999127l-19.545771 97.728855h-58.268525l19.545771-97.728855h-184.394067l11.063644-56.424585 212.421965-320.845677H1069.485591l-212.790754 320.845677h116.905839l21.7585-110.63644h58.268525l-21.389712 110.63644h51.999127z" fill="#FFFFFF" p-id="3210"></path></svg>
                <svg v-if ="item.vip_level === 5" style="position:absolute; top:12px; left:15px; z-index:1" t="1586765271034" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3336" width="20" height="20"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="3337"></path><path d="M476.47427 712.498676h-7.375763a36.878813 36.878813 0 0 1-28.396686-26.921533L348.873576 334.12205H262.577152a36.878813 36.878813 0 0 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l80.027026 304.987788 242.293804-318.264161a36.878813 36.878813 0 1 1 58.637314 44.992153l-289.129898 378.007838a36.878813 36.878813 0 0 1-29.503051 14.751525zM1106.364404 318.632948h-184.394067l-25.077593 127.231907a105.842195 105.842195 0 0 1 75.601568-25.815169 94.778551 94.778551 0 0 1 101.047948 102.891889 289.498686 289.498686 0 0 1-4.056669 53.843068 231.598949 231.598949 0 0 1-53.105491 121.700084A142.721008 142.721008 0 0 1 912.381846 737.57627a101.416737 101.416737 0 0 1-112.84917-104.735831 175.91194 175.91194 0 0 1 0-20.652135h62.693983a94.040974 94.040974 0 0 0 0 14.013949 48.311246 48.311246 0 0 0 51.630339 53.843068c57.162161 0 78.551873-45.729729 89.615517-104.367043a236.761983 236.761983 0 0 0 5.531822-44.992152c0-32.822144-12.170008-57.162161-50.523975-57.162161a82.97733 82.97733 0 0 0-73.757627 43.885788H826.085422l51.630339-258.151694h241.18744z" fill="#FFFFFF" p-id="3338"></path></svg>
                <svg v-if ="item.vip_level === 6" style="position:absolute; top:12px; left:15px; z-index:1" t="1586769210566" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3464" width="20" height="20"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="3465"></path><path d="M476.47427 712.498676h-7.375763a36.878813 36.878813 0 0 1-28.396686-26.921533L348.873576 334.12205H262.577152a36.878813 36.878813 0 0 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l80.027026 304.987788 242.293804-318.264161a36.878813 36.878813 0 1 1 58.637314 44.992153l-289.129898 378.007838a36.878813 36.878813 0 0 1-29.503051 14.751525zM939.672168 737.57627a123.544025 123.544025 0 0 1-132.763729-132.394941 239.712288 239.712288 0 0 1 56.793373-142.721008l154.15344-214.265906h70.438534l-147.515254 200.620745a103.629466 103.629466 0 0 1 38.722754-6.269398c59.006102 0 110.63644 40.935483 110.636441 127.969483A154.891017 154.891017 0 0 1 939.672168 737.57627z m19.176983-243.768957a98.466432 98.466432 0 0 0-89.984305 105.473406 70.807322 70.807322 0 0 0 67.857016 80.027025 98.097644 98.097644 0 0 0 89.615517-106.579771A69.700957 69.700957 0 0 0 958.849151 493.807313z" fill="#FFFFFF" p-id="3466"></path></svg>
                <svg v-if ="item.vip_level === 7" style="position:absolute; top:12px; left:15px; z-index:1" t="1586769243985" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3672" width="20" height="20"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="3673"></path><path d="M467.992143 721.349592h-7.375763a36.878813 36.878813 0 0 1-28.396686-26.921534L340.391448 342.972965H254.095025a36.878813 36.878813 0 0 1 0-73.757627H368.788135a36.878813 36.878813 0 0 1 36.878813 27.659111l80.027026 304.987787 242.293804-318.26416a36.878813 36.878813 0 1 1 57.530949 44.992152l-288.023533 378.007838a36.878813 36.878813 0 0 1-29.503051 14.751526zM1169.427176 327.483864l-255.20139 419.680897h-70.438534L1098.988642 327.483864h-152.3095l-14.382737 71.544898H870.339998l26.183958-128.707059H1180.122031z" fill="#FFFFFF" p-id="3674"></path></svg>
                <svg v-if ="item.vip_level === 8" style="position:absolute; top:12px; left:15px; z-index:1" t="1586769269166" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3840" width="20" height="20"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="3841"></path><path d="M476.47427 712.498676h-7.375763a36.878813 36.878813 0 0 1-28.396686-26.921533L348.873576 334.12205H262.577152a36.878813 36.878813 0 0 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l80.027026 304.987788 242.293804-318.264161a36.878813 36.878813 0 1 1 58.637314 44.992153l-289.129898 378.007838a36.878813 36.878813 0 0 1-29.503051 14.751525zM1048.464667 491.963372a102.523101 102.523101 0 0 1 43.148212 90.721881 147.515254 147.515254 0 0 1-157.472534 154.891017A113.217957 113.217957 0 0 1 811.333897 617.351338a142.35222 142.35222 0 0 1 87.033999-134.238881 97.360068 97.360068 0 0 1-36.878813-80.764602 143.827373 143.827373 0 0 1 147.515254-147.515254A110.63644 110.63644 0 0 1 1125.541387 368.788135a134.976457 134.976457 0 0 1-77.07672 123.175237z m-83.714906 24.340017a90.353093 90.353093 0 0 0-88.877941 96.622491 60.112466 60.112466 0 0 0 61.587619 65.644288 89.984305 89.984305 0 0 0 89.615516-96.253703A60.481254 60.481254 0 0 0 964.749761 516.303389z m40.566695-204.308627a85.558847 85.558847 0 0 0-81.13339 90.353093 53.105491 53.105491 0 0 0 56.055796 58.268525A85.558847 85.558847 0 0 0 1061.003464 368.788135a53.105491 53.105491 0 0 0-55.687008-56.793373z" fill="#FFFFFF" p-id="3842"></path></svg>
                <svg v-if ="item.vip_level === 9" style="position:absolute; top:12px; left:15px; z-index:1" t="1586769288326" class="icon" viewBox="0 0 1524 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4008" width="20" height="20"><path d="M0 0m479.424575 0l475.736694 0q479.424575 0 479.424575 479.424575l0 4.794246q0 479.424575-479.424575 479.424575l-475.736694 0q-479.424575 0-479.424575-479.424575l0-4.794246q0-479.424575 479.424575-479.424575Z" fill="#12ADF5" p-id="4009"></path><path d="M486.800338 712.498676H479.424575a36.878813 36.878813 0 0 1-28.396686-26.921533L359.199643 334.12205H272.90322a36.878813 36.878813 0 0 1 0-73.757627h114.69311a36.878813 36.878813 0 0 1 36.878813 27.65911l80.027025 304.987788 242.293805-318.264161a36.878813 36.878813 0 1 1 58.637313 44.992153L516.303389 697.747151a36.878813 36.878813 0 0 1-29.503051 14.751525zM1094.194396 516.303389l-153.415864 212.421965h-71.17611l147.515254-200.620745a106.210983 106.210983 0 0 1-39.091542 6.638186c-59.37489 0-112.480381-40.935483-112.480382-127.969482a154.891017 154.891017 0 0 1 152.3095-165.585873 123.912813 123.912813 0 0 1 132.763729 132.394941A238.237135 238.237135 0 0 1 1094.194396 516.303389z m-74.495203-221.272881a98.466432 98.466432 0 0 0-89.615517 106.210983 70.438534 70.438534 0 0 0 68.594593 79.289449 98.097644 98.097644 0 0 0 88.877941-105.473407C1087.55621 331.909321 1062.847405 295.030508 1019.699193 295.030508z" fill="#FFFFFF" p-id="4010"></path></svg>
           
                 </div>
            </div>
        <div style="height:50px;"></div>
        <div style="font-size:13px; color:#111; text-align:center; width:100%; height:50px; position:fixed; bottom:0; background-color:#fff; z-index:999;line-height:45px; ">购买会员，享受会员权益</div>
        <van-popup v-model="show" closeable  position="bottom" style="height: 30% ;">
            <div style="width:100%; height:100px; backaround-color:#393d49;">
                <div style="font-size:16px; width:90%; margin:0; padding-top:20px;padding-left:5%;">你确定购买VIP{{vip}}会员，为期1年吗？</div>
                <!-- <div style="font-size:14px; padding-left:15px; margin-top:5px;">权益:{{vip_rights}}</div> -->
                <div style="font-size:16px; width:90%; margin:0 auto; padding-top:12px;">订单金额 : {{price}}元</div>
            </div>
            <div style="margin-top:10px; text-align:center;">
                <van-button @click="payment" style="width:90%;color:#fff; background-color:#12adf5; margin-top:20px; font-weight:bold; font-size:15px; border-radius:5px;">付款购买</van-button>
            </div>
        </van-popup>
        <!-- <van-popup v-model="shows" closeable  position="bottom" style="height: 30% ;"> -->
            <!-- <div>充值中请稍等</div> -->
        <div v-show="shows">
            <iframe @load="Inpayment"  :src="RmbUrl" frameborder="0" scrolling="no" width="0" height="0"></iframe>
        </div>
        <!-- </van-popup> -->
    </div>
</template>
<script>
    export default {
     data() {
            return {
               shows:false,
               RmbUrl:'',
               list:[],
               show:false,
               vip:'',
               price:'',
               vip_rights:'',
               order_id:'',
               extra_data:'',
               rmbUrl:'',
               user_vip:0,
               vip_timeout:'',
               Equity:'',
               cloud_pay_order_id:''
            }
        },
    methods:{
        onClickLeft(){//点击返回上一层
            this.$router.push('/user');
            clearInterval(this.time)
        },
        async account(refresh = true){//个人会员等级信息
        let random = Math.random()
        console.log(random)
        let user = {
          user_id:localStorage.user_id,
          s_id:localStorage.s_id,
          random:random
        }
        // let res = await this.$api.network.ChatAccountInfo(user)
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
        console.log('accountInfo',res)

        if(res.vip_info == null){
            this.user_vip = 0
        }else
        {
            this.user_vip = res.vip_info.vip_level
        }
        let i = 0;
        for(i=0; i<this.list.length;i++){
            if(this.user_vip == this.list[i].vip_level)
            {
                this.Equity = this.list[i].vip_rights
            }
        }
        // console.log(this.Equity)
        
        if(res.vip_info == null)
        {
            return
        }else
        {
            let time = res.vip_info.vip_timeout
            let times = this.dateFormat("YYYY-mm-dd", new Date(time*1000))
            this.vip_timeout = times
        }     
        //   console.log(times)
        },
    dateFormat(fmt, date) {//时间戳转换
      let ret;
      const opt = {
          "Y+": date.getFullYear().toString(),        // 年
          "m+": (date.getMonth() + 1).toString(),     // 月
          "d+": date.getDate().toString(),            // 日
          "H+": date.getHours().toString(),           // 时
          "M+": date.getMinutes().toString(),         // 分
          "S+": date.getSeconds().toString()          // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
              fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
          };
      };
      return fmt;
  },
        async purchase(item){//点击弹出充值
            this.vip = item.vip_level
            this.price = item.price
            this.vip_rights = item.vip_rights
            let random = Math.random()
            let user = {
                user_id:localStorage.user_id,
                s_id:localStorage.s_id,
                order_name:'购买会员',
                vip_level:this.vip,
                order_num:"1",
                order_type:'vip',
                extra_data: '购买会员VIP'+this.vip,
                vip_pay_type:'rmb',
                vip_buy_type:'rmb',
                random:random
            }
            let ress =  await this.$api.network.ChatVipNew(user)
            if(ress.ret){
                this.order_id = ress.order_id
                this.extra_data = ress.extra_data
                this.show = true;
            }else if(ress.msg == "already have high-level-vip")
            {
                this.$toast.fail('您已经有更高级的VIP了')
            }
            else{
                this.$toast.fail(ress.msg)
            }
             
        },
        async payment(){//付款购买
            let random = Math.random()
            let user = {
                order_id:this.order_id,
                user_id:localStorage.user_id,
                extra_data:this.extra_data,
                s_id:localStorage.s_id,
                random:random
            }
            let ress =  await this.$api.network.ChatVipPay(user)
            if(ress.ret){
                this.$toast.success("购买成功")
                this.show = false
                this.$router.go(-1)
                return;
            }else if(ress.msg == "user have not enough money to pay order"){
                // this.$toast.fail("购买失败，你的余额不足请充值",2000)
                this.RMBnew()
            }else{
                this.$toast.fail("购买失败" + ress.msg)
                return;
            }
        },
        async VIPinformation(refresh = true){//查看会员信息
            let ress = null,cached =await imDb.getDataByKey('ChatVipPrices-cached'),This=this,fromNetFlag = false
            if(cached && cached.data){
                ress = cached.data
                if(refresh)
                this.$api.network.ChatVipPrices_and_rights({nothing:true}).then((res)=>{
                    if(res && res.ret){
                        imDb.addData({key:'ChatVipPrices-cached',data:res})
                        This.VIPinformation(false)
                    }
                })
            }else ress = await this.$api.network.ChatVipPrices_and_rights({nothing:true}),fromNetFlag = true
            if(!ress ||!ress.ret) return 
            if(fromNetFlag){
                imDb.addData({key:'ChatVipPrices-cached',data:ress})
            }
            //await this.$api.network.ChatVipPrices_and_rights({nothing:true})
            console.log('VIPinformation:',ress)
            this.list = ress.list
        },
        async RMBnew(){//创建人民币充值订单
            // this.show
            let random = Math.random()
            let user = {
                order_name:'余额充值',
                order_type:'rmb',
                pay_money:this.price,
                pay_type:'rmb',
                user_id:localStorage.user_id,
                s_id:localStorage.s_id,
                extra_data:'充值余额' + this.price + '元',
                random:random
            }
            let ress =  await this.$api.network.ChatRmbNew(user)
            console.log(ress)
            if(ress.ret)
            {
                //将接口返回的Form表单显示到页面
                document.querySelector('body').innerHTML = ress.pay_url;
                //调用submit 方法
                document.forms[0].submit()
                /*
                this.cloud_pay_order_id = ress.go_url.split('?')[1]
                this.RmbUrl = ress.go_url
                this.show = false
                this.shows = true
                console.log(this.RmbUrl)
                // window.location.href = this.rmbUrl
                this.time =   setInterval(() => {
                    this.RmbResult()
                }, 1000);
                */
                // if(localStorage.RmbUrl !=='')
                // {
                //     remove(iframe)
                // }
            }
            
        },
        Inpayment(){
           setTimeout(()=>{
            this.RmbUrl = ''
           },3000)
        },
        async RmbResult(){//充值结果
            let user = {
                order_id:this.order_id,
                cloud_pay_order_id:this.cloud_pay_order_id,
            }
            let res =  await this.$api.network.ChatWxQuery(user)
            if(res.ret){
                this.$toast.success('充值成功',1000)
                clearInterval(this.time)
                setTimeout(()=>{
                    this.payment()
                },2000)
                
            }
        }
    },
    created(){//进入页面就执行
        try{
        this.account()
        }catch(ex){}
        this.VIPinformation()
        
      },
}
</script>
<style lang="stylus" scoped>
.box >>> .van-nav-bar .van-icon{
    color:#000
}
body,html{
    width 100%;
    height 100%;
    background-color:#fff;
}
.box{
    width: 100%;
    height :100%;
    background-color #fff;
    position:absolute
}
.box[data-v-5fd5536a] .van-nav-bar__arrow{
    color:#000
    font-size 1.05rem
}

.van-cell__title{
    padding-left:25px;
}
</style>