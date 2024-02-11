<template>
  <div id="app">
    <keep-alive include="index,dweb,folder,chat,dxib">
      <router-view/>
    </keep-alive>
    <PopInit></PopInit>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
  }
}


</script>

<style>
#app {
  padding-bottom: 50px;
  margin:0;
  padding:0;
  background-color: #f5f5f5;
  float: left;
}
html,body,#app {
  width: 100%;
  height: 100%;

}
body {
  position:relative;
  font-family: PingFangSC-Regular, sans-serif;
  /* font-weight: bold; */
  margin:0;
  padding:0;
}
</style>
<script>
  document.addEventListener('plusready', function() {
    // eslint-disable-next-line no-undef
    var webview = plus.webview.currentWebview();
    // eslint-disable-next-line no-undef
    plus.key.addEventListener('backbutton', function() {
      webview.canBack(function(e) {
        if(e.canBack) {
          webview.back();
        } else {
          //webview.close(); //hide,quit
          //plus.runtime.quit();
          //首页返回键处理
          //处理逻辑：1秒内，连续两次按返回键，则退出应用；
          var first = null;
          // eslint-disable-next-line no-undef
          plus.key.addEventListener('backbutton', function() {
            //首次按键，提示‘再按一次退出应用’
            if (!first) {
              first = new Date().getTime();
              window.console.log('再按一次退出应用');
              setTimeout(function() {
                first = null;
              }, 1000);
            } else {
              if (new Date().getTime() - first < 1500) {
                // eslint-disable-next-line no-undef
                plus.runtime.quit();
              }
            }
          }, false);
        }
      })
    });
  });
  window.onload = function() {
  document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  document.addEventListener('gesturestart', function(event) {
    event.preventDefault()
  })
}
</script>