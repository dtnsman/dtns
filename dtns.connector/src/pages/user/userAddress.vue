<template>
   <MyBox title="选择收货地址" @back="$router.go(-1)">
       <template slot="content">
           <div class="content">
                <div class="body">
                    <!-- <van-address-list
                  
                    v-model="chosenAddressId"
                    :list="items"
                    default-tag-text="默认"
                    @add="onAdd"
                    @edit="onEdit"
                    /> -->
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                    >
                        <van-cell :label="item.address_detail" v-for="item of items" :key="item.address_id" @click="upAddress(item.address_id)" center>
                        <template slot="title">
                            <span style="font-size:16px;font-family: PingFangSC-Regular, sans-serif;font-weight:bold">{{item.user_name}}</span>
                            <span style="font-size:16px">{{item.phone}}</span>
                        </template>
                        <template slot="right-icon">
                            <svg  @click.stop="$router.push(`/addAddressEdit/${item.address_id}`)" t="1590808340346" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2701" width="17" height="17"><path d="M993.341317 239.137725a27.592814 27.592814 0 0 0-30.658682 30.658682V950.419162c0 3.065868-3.065868 12.263473-6.131737 12.263473h-889.101796a6.131737 6.131737 0 0 1-6.131737-6.131737v-889.101796a6.131737 6.131737 0 0 1 6.131737-6.131737h680.622754a30.658683 30.658683 0 0 0 30.658683-30.658682 33.724551 33.724551 0 0 0-30.658683-30.658683H67.449102A67.449102 67.449102 0 0 0 0 67.449102v889.101796a67.449102 67.449102 0 0 0 67.449102 67.449102h889.101796a70.51497 70.51497 0 0 0 67.449102-73.580838V269.796407a30.658683 30.658683 0 0 0-30.658683-30.658682z" p-id="2702"></path><path d="M199.281437 812.45509a27.592814 27.592814 0 0 0 21.461078 9.197605 33.724551 33.724551 0 0 0 21.461078-9.197605L1002.538922 52.11976a30.658683 30.658683 0 0 0 0-42.922155 30.658683 30.658683 0 0 0-42.922156 0L199.281437 769.532934a30.658683 30.658683 0 0 0 0 42.922156z" p-id="2703"></path></svg>
                        </template>
                    </van-cell>
                    </van-list>
                    
                </div>
           </div>
           <div class="addAddressContent">
               <!-- <van-icon name="arrow" /> -->
               <van-cell title="新增收货地址" is-link :center="true" to="/addAddress">
                   <template slot="icon">
                       <svg style="margin-right:5px" t="1590974899000" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3759" width="20" height="20"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#12ADF5" p-id="3760"></path><path d="M841.099164 489.366786H533.409797V183.512545A21.409797 21.409797 0 1 0 489.366786 183.512545v305.854241H183.512545a21.409797 21.409797 0 1 0 0 42.819594h305.854241v308.912784a21.409797 21.409797 0 0 0 42.819594 0V533.409797h308.912784a21.409797 21.409797 0 1 0 0-42.819594z" fill="#FFFFFF" p-id="3761"></path></svg>
                   </template>
               </van-cell>
           </div>
       </template>
  </MyBox>    
</template>
<script>
export default {
    data () {
        return {
            loading: false,
            finished:false,
            begin: 0,
            len: 10,
            chosenAddressId: "asdfasf" ,
            addressList:'',
            items: []
        }
    },
    methods: {
        onEdit (id) {
            this.$toast(`编辑按钮${JSON.stringify(id)}`)
        },
        async upAddress(el){
            let addressid = el
            console.log(addressid)
            let params = {
                user_id: localStorage.user_id,
                s_id: localStorage.s_id,
                address_id:addressid
            }
            let res = await this.$api.network.topaddress(params)
            console.log(res)
            this.$router.go(-1)
        },
        async onLoad () {
            let params = {
                user_id: localStorage.user_id,
                s_id: localStorage.s_id,
                begin: this.begin,
                len: this.len
            }
            let res = await this.$api.network.queryAddressList(params)
            console.log(res)
            if(res&&res.ret) {
                // this.items = res.list
                this.items = this.items.concat(res.list)
                this.begin+=this.len
                console.log(this.items)
            }else {
                this.finished = true
            }
              this.loading = false
            // if (res&&res)
        }
    }
}
</script>
<style lang="stylus" scoped>
.content {
    box-sizing border-box
    padding 15px
    padding-bottom 80px
    // border-radius 10px
}
.body {
    // border-radius 5px
    // background-color #ffffff
    // box-sizing border-box
    // padding 0px 10px
    // padding-bottom 95px
}
.van-cell {
    padding-bottom  10px
    padding-top 10px
}
/deep/ .van-cell:nth-child(1){
    border-radius 5px
}
/deep/ .van-cell:last-child {
    border-radius 5px
}
.content >>> .van-cell:first-child {
      padding-top 
}
.addAddressContent {
    position fixed
    bottom 0
    right 0
    left 0
    
}
</style>