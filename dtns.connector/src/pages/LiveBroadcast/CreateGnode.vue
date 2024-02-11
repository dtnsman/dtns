<template>
  <div class="box">
    <header class="topbar">
      <div
        style="margin:0 auto;height:46px;"
        align="center"
      >
        <span style="font-size:16px; line-height:43px;margin-right:2px;">创建G节点</span>
      </div>
      <div
        @click="back"
        style="position:absolute; top:14px; left:15px;"
      >
        <van-icon
          style="font-size:17px;"
          name="arrow-left"
        />
      </div>
    </header>
    <div style="margin-top:25px;margin-left:10%;margin-bottom:10px">创建G节点订单：</div>
    <div class="optionsGroup">
      <div style="width:80%;margin-top:10px">
        <van-field
          readonly
          clickable
          label="选择配置"
          :value="value1"
          placeholder="选择配置"
          @click="showPicker1 = !showPicker1;showPicker2 = false;showPicker3 = false;showPicker4 = false;showPicker5 = false;showPicker6 = false"
        />
      </div>
      <van-popup
        v-model="showPicker1"
        round
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="option1"
          @cancel="showPicker1 = false"
          @confirm="onConfirm1"
        />
      </van-popup>
      <div style="width:80%;margin-top:10px">
        <van-field
          readonly
          clickable
          label="选择合约"
          :value="value2"
          placeholder="选择合约"
          @click="showPicker2 = !showPicker2;showPicker1 = false;showPicker3 = false;showPicker4 = false;showPicker5 = false;showPicker6 = false"
        />
      </div>
      <van-popup
        v-model="showPicker2"
        round
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="option2"
          @cancel="showPicker2 = false"
          @confirm="onConfirm2"
        />
      </van-popup>
      <div class="div1">
        <van-field
          v-model="value"
          label="token命名"
          placeholder="请输入2-10位英文字符"
          style="width:80%;margin-top:11px;margin-left:10%;font-size:12px"
        />
      </div>
      <div
        class="div1"
        v-if="show === true"
      >
        <van-field
          v-model="value"
          label="COIN上限"
          placeholder="请输入COIN上限"
          style="width:80%;margin-top:11px;margin-left:10%;font-size:12px"
        />
      </div>
      <div style="width:80%;margin-top:10px">
        <van-field
          readonly
          clickable
          label="云服务商"
          :value="value3"
          placeholder="云服务商"
          @click="showPicker3 = !showPicker3;showPicker1 = false;showPicker2 = false;showPicker4 = false;showPicker5 = false;showPicker6 = false"
        />
      </div>
      <van-popup
        v-model="showPicker3"
        round
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="option3"
          @cancel="showPicker3 = false"
          @confirm="onConfirm3"
        />
      </van-popup>
      <div style="width:80%;margin-top:10px">
        <van-field
          readonly
          clickable
          label="购买周期"
          :value="value4"
          placeholder="购买周期"
          @click="showPicker4 = !showPicker4;showPicker1 = false;showPicker2 = false;showPicker3 = false;showPicker5 = false;showPicker6 = false"
        />
      </div>
      <van-popup
        v-model="showPicker4"
        round
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="option4"
          @cancel="showPicker4 = false"
          @confirm="onConfirm4"
        />
      </van-popup>

      <div style="width:80%;margin-top:10px">
        <van-field
          readonly
          clickable
          label="购买数量"
          :value="value5"
          placeholder="购买数量"
          @click="showPicker5 = !showPicker5;showPicker1 = false;showPicker2 = false;showPicker3 = false;showPicker4 = false;showPicker6 = false"
        />
      </div>
      <van-popup
        v-model="showPicker5"
        round
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="option5"
          @cancel="showPicker5 = false"
          @confirm="onConfirm5"
        />
      </van-popup>
      <div style="width:80%;margin-top:10px">
        <van-field
          readonly
          clickable
          label="购买方式"
          :value="value6"
          placeholder="购买方式"
          @click="showPicker6 = !showPicker6;showPicker1 = false;showPicker2 = false;showPicker3 = false;showPicker4 = false;showPicker5 = false"
        />
      </div>
      <van-popup
        v-model="showPicker6"
        round
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="option6"
          @cancel="showPicker6 = false"
          @confirm="onConfirm6"
        />
      </van-popup>
      <van-button
        type="primary"
        style="width:40%;margin-top:20px"
      >确定购买</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      show: false,
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      showPicker4: false,
      showPicker5: false,
      showPicker6: false,
      option1: [
        { text: "请选择", value: 0 },
        { text: "1GB空间", value: 1 },
        { text: "2GB空间", value: 2 },
        { text: "3GB空间", value: 3 },
        { text: "4GB空间", value: 4 },
        { text: "5GB空间", value: 5 },
        { text: "8GB空间", value: 6 },
        { text: "10GB空间", value: 7 },
      ],
      option2: [
        { text: "请选择", value: 0 },
        { text: "COIN(记账型)", value: 1 },
        { text: "SCORE(记账型)", value: 2 },
        { text: "MSG(消息型)", value: 3 },
        { text: "TEXT(内容型)", value: 4 },
        { text: "CLT(合约型)", value: 5 },
      ],
      option3: [
        { text: "请选择", value: 0 },
        { text: "阿里云", value: 1 },
        { text: "百度云", value: 2 },
        { text: "华为云", value: 3 },
        { text: "腾讯云", value: 4 },
        { text: "AWS-1云", value: 5 },
      ],
      option4: [
        { text: "请选择", value: 0 },
        { text: "按月购买", value: 1 },
        { text: "按年购买", value: 2 },
      ],
      option5: [
        { text: "请选择", value: 0 },
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
        { text: "5", value: 5 },
        { text: "6", value: 6 },
        { text: "7", value: 7 },
        { text: "8", value: 8 },
        { text: "9", value: 9 },
        { text: "10", value: 10 },
        { text: "11", value: 11 },
        { text: "12", value: 12 },
      ],
      option6: [
        { text: "请选择", value: 0 },
        { text: "余额支付(RMB)", value: 1 },
        { text: "会员特权(免费)", value: 2 },
        { text: "积分支付(GSB)", value: 3 },
      ],
    };
  },
  methods: {
    onConfirm1(value) {
      this.value1 = value.text;
      this.showPicker1 = false;
    },
    onConfirm2(value) {
      this.value2 = value.text;
      this.showPicker2 = false;
      if (value.text === "COIN(记账型)") {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    onConfirm3(value) {
      this.value3 = value.text;
      this.showPicker3 = false;
    },
    onConfirm4(value) {
      this.value4 = value.text;
      this.showPicker4 = false;
    },
    onConfirm5(value) {
      this.value5 = value.text;
      this.showPicker5 = false;
    },
    onConfirm6(value) {
      this.value6 = value.text;
      this.showPicker6 = false;
    },
    back() {
      //返回上一层
      this.$router.go(-1);
    }, ///
    created() {
      // this.userInfo = JSON.parse(localStorage.userInfo);
    },
    mounted() {
      //这时候请求后端数据
    },
  },
};
</script>
<style scoped lang="stylus">
>>>.van-field__control {
  margin-left: 30%;
}

.div1 {
  display: flex;
  width: 100%;
}

>>>.van-field__label {
  width: 60px;
}

>>>.van-popup--top {
  width: 70%;
}

>>>.van-overlay {
  display: none;
}

.box {
  width: 100%;
  height: 100%;
  // position fixed
  background-color: #f5f5f5;
}

.optionsGroup {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.topbar {
  height: 46px;
  background-color: #fff;
}
</style>
