<template>
  <div class="box">
    <van-tabbar v-model="active">
      <van-tabbar-item to="/index/chat/ib" style="text-align:center">
        <img :src="this.img0" class="img" style="display:inline-block"  /><br/>
        {{ ibchatStr }}
      </van-tabbar-item>
      <van-tabbar-item to="/dweb" >
        <!-- <div class="dicon_reply" style="display:block;border: 0px;"></div> -->
        <div class="imgbox" v-on:dblclick="dwebRefresh" >
        <img v-if="this.active!=1" :src="this.imgbang"  class="img" />
        <img v-if="this.active==1" :src="this.imgbang"  class="imgx" />
        </div>
        {{ dwebStr }}
      </van-tabbar-item>
      <van-tabbar-item to="/index" :info="total_unread_num" >
        <img :src="this.img1" class="img" v-on:dblclick="indexRefresh"  />
        {{ chatStr }}
      </van-tabbar-item>
      <van-tabbar-item to="Connection">
        <img :src="this.img3"  class="img" />
        {{ contactStr }}
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        <img :src="this.img5"  class="img" />
        {{ meStr }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import imgb from '../../assets/images/tbangn.png'
import imgb1 from '../../assets/images/tbangn1.png'
import img1 from '../../assets/images/1-1.png'
import img2 from '../../assets/images/1.png'
import img3 from '../../assets/images/tab11.png'
import img4 from '../../assets/images/tabs.png'
import img5 from '../../assets/images/3.png'
import img6 from '../../assets/images/3-3.png'

import img0 from '../../assets/images/smile.png'
import img10 from '../../assets/images/smile.jpg'

    export default {
        data() {
            return {
              total_unread_num:null,
              active:"",
                img0:img0,
                img10:img10,
                img1:img1,
                img2:img2,
                img3:img3,
                img4:img4,
                img5:img5,
                img6:img6,
                imgbang:imgb,
                ibchatStr:g_dtnsStrings.getString('/index/ibchat'),
                dwebStr:g_dtnsStrings.getString('/index/dweb'),
                chatStr:g_dtnsStrings.getString('/index/chat'),
                contactStr:g_dtnsStrings.getString('/index/contact'),
                meStr:g_dtnsStrings.getString('/index/me'),
            }
        },
        methods:{
            async news(){
              while(!imageDb.db)  await rpc_client.sleep(100)
              while(!imDb.db)  await rpc_client.sleep(100)
              this.total_unread_num = await imDb.getDataByKey('total_unread_num')//parseInt(localStorage.getItem('total_unread_num'))
              this.total_unread_num = this.total_unread_num ? this.total_unread_num.data :null
              this.total_unread_num  = this.total_unread_num  ? this.total_unread_num :null
              console.log('floor-vue-unread_num:'+this.total_unread_num)
            },
            indexRefresh(){
              console.log('indexRefresh')
              if(typeof this.$api.network.getIndexObj().onRefresh == 'function')
                this.$api.network.getIndexObj().onRefresh()
            },
            dwebRefresh()
            {
              console.log('dwebxRefresh do nothing now!')
              // if(typeof g_dwebRefresh== 'function')
              //   g_dwebRefresh()
            },
            setBar (path) {
                 if (path === '/index' || path ==='/') {
                        this.imgbang = imgb
                        this.img1 = img2
                        this.img3 = img3
                        this.img5 = img5
                        this.active = 2

                    }else if (path === '/Connection') {
                      this.imgbang = imgb
                         this.img1 = img1
                        this.img3 = img4
                        this.img5 = img5
                        this.active = 3
                    }else if (path === '/dweb') {
                      this.imgbang = imgb1
                        this.img1 = img1
                        this.img3 = img3
                        this.img5 = img5
                        this.active = 1
                    }
                    else{
                      this.imgbang = imgb
                         this.img1 = img1
                        this.img3 = img3
                        this.img5 = img6
                        this.active = 4
                    }
            }
        },
        created () {
            let routePath = this.$route.path
            this.setBar(routePath)
            if(typeof g_pop_event_bus!='undefined')
            {
              const This = this
              g_pop_event_bus.on('update_dtns_loction',function(){
                This.ibchatStr = g_dtnsStrings.getString('/index/ibchat')
                This.dwebStr = g_dtnsStrings.getString('/index/dweb')
                This.chatStr = g_dtnsStrings.getString('/index/chat')
                This.contactStr=g_dtnsStrings.getString('/index/contact')
                This.meStr=g_dtnsStrings.getString('/index/me')
              })
            }
        },
        mounted() {
          // g_dchatManager.setViewContext(this) //2023-10-7新增（用于switchIB3以及切换各个页面）

          this.$api.network.setTotalUnreadNum(this.news)
          this.$api.network.updateTotalUnreadNum()
          console.log('into floor-mounted()')
          this.news()

          window.g_gotoPage = (url) =>
          {
            console.log('floor.vue-g_gotoPage:'+url)
            this.$router.push(url)
          }
        },
        activated(){
          // console.log('$refs',this.$refs)
          console.log('into floor-activated()')
          this.news()
        },
        watch: {
            '$route':{
                handler (to, from) {
                  this.setBar(to.path)
                }
            }
        }
    }
</script>
<style lang="stylus" scoped>
.box >>> .van-info {
  right: -10px;
  top:1px;
  z-index: 999;
  font-size:12px;
  border-radius: 25px;
}
.imgbox{
  width: 22px;
  overflow-x: hidden;
}
.img{
  position: relative;
  text-rendering: auto;
  cursor: pointer;
  width: 21px;
  display: block;
  top:-3px;
  left:1px;
}
.imgx{
  position: relative;
  text-rendering: auto;
  cursor: pointer;
  width: 21px;
  display: block;
  top:-3px;
  left:1px;
  transform: translateX(-105%);
  filter: drop-shadow(21px 0 #12ADF5);
  overflow: hidden;
}

.box >>> .van-tabbar-item--active{
  color:#12adf5;
}

.dicon_reply {
  background:url('../../../static/images/dweb_icon.png');
  background-repeat:no-repeat;
  background-position:77% 0%;
  height:58px;
  width:60px;
  zoom:0.40;
  border: 0px
  }
</style>
