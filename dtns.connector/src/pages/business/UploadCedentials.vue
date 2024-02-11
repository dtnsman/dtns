<template>
    <div>
        <van-nav-bar
        title="上传凭证"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        right-text="上传"
        />
        <div class="uploader">
            <van-uploader :after-read="upload" v-model="fileList" ref="upload" @change="upload" />
        </div>
        <!-- <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="upload"/> -->
            </div>
</template>
<style lang="stylus" scoped>
.uploader
 box-sizing border-box
 padding .6rem
</style>
<script>
import Vue from 'vue'
import {NavBar,Uploader, Toast} from 'vant'
Vue.use(NavBar).use(Uploader).use(Toast)
import axios from "axios"
export default {
    data () {
        return{
            uploadImages:[],
            fileList: [],
            useInfo: "",
            Data:[],
            file:[],
            data:[],
            img_id:[]
        }
    },
    methods: {
        onClickLeft () {
            this.$router.go(-1)
        },
   async upload (data) {
        let random = Math.random();
      let img_kind = data.file;
      let formData = new FormData();
      formData.append("user_id", this.Data.user_id);
      formData.append("s_id", this.Data.s_id);
      formData.append("random", random);
      formData.append("img_kind", "open");
      formData.append("file", img_kind);
      let config = {
        headers: {
          enctype: "multipart/form-data"
        }
      };
    //  this.$axios.post("http://106.12.119.162:9000/image/upload", formData, config)
      this.$axios.post("http://182.61.13.123:50001/image/upload", formData, config)
        .then(res => {
        console.log(res);
        this.img_id = res.data.filename;
        console.log(this.img_id)
        // let img_id = this.img_id;
        // img_id.push(res.data.filename); 
    })
   },
    
    
        async onClickRight () {
            let random = Math.random()
            let params = {
                user_id: this.Data.user_id,
                img_id:this.img_id,
                order_id:this.$route.params.id,
                s_id: this.Data.s_id,
                random: random
            }
            let res = await this.$api.network.OTCupload(params)
            console.log(params.img_id)
            if (!res.ret){
                return Toast.fail("上传失败" + res.msg)
            }else {
                Toast.success("上传成功")
                this.$router.push({
                    path: '/business/otcwhole'
                    })
            }

        }
    },
    created () {
    let Data = JSON.parse(localStorage.getItem('userInfo'));
    this.Data = Data
    //  console.log(Data)
    },
    mounted () {
        // console.log(this.$route.params.id)
    }
}
</script>
