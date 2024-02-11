<template>
  <div class="box">
      <van-nav-bar title="视频" left-arrow @click-left="back"/>
      <article style="border:1px solid white;margin:0 auto;background-color:white;">

        <section class="experiment" style="width:100%; height:100%;border:1px solid red; margin:0 auto">
            <div id="videos-container" style="width:100%; height:100%; margin:0 auto">
            </div>
        </section>
        <section class="experiment" style="text-align:center;border:none; margin-top:20px;">
            <button @click="openBtn" id="openCamera">打开摄像头</button>
            <button @click="startBtn" id="start-recording" :disabled="disabled">开始录制</button>
            <button @click="saveBtn" id="save-recording" :disabled="disabled">保存</button>
            <!-- <a href="javascript:void(0)" onclick="send()">发送</a> -->
        </section>
 </article>
  </div>
</template>
<script>
    /* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
    "use strict";
    // IE <10 is explicitly unsupported
    if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
        return;
    }
    var
          doc = view.document
          // only get URL when necessary in case Blob.js hasn't overridden it yet
        , get_URL = function() {
            return view.URL || view.webkitURL || view;
        }
        , save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
        , can_use_save_link = "download" in save_link
        , click = function(node) {
            var event = new MouseEvent("click");
            node.dispatchEvent(event);
        }
        , is_safari = /constructor/i.test(view.HTMLElement) || view.safari
        , is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
        , throw_outside = function(ex) {
            (view.setImmediate || view.setTimeout)(function() {
                throw ex;
            }, 0);
        }
        , force_saveable_type = "application/octet-stream"
        // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
        , arbitrary_revoke_timeout = 1000 * 40 // in ms
        , revoke = function(file) {
            var revoker = function() {
                if (typeof file === "string") { // file is an object URL
                    get_URL().revokeObjectURL(file);
                } else { // file is a File
                    file.remove();
                }
            };
            setTimeout(revoker, arbitrary_revoke_timeout);
        }
        , dispatch = function(filesaver, event_types, event) {
            event_types = [].concat(event_types);
            var i = event_types.length;
            while (i--) {
                var listener = filesaver["on" + event_types[i]];
                if (typeof listener === "function") {
                    try {
                        listener.call(filesaver, event || filesaver);
                    } catch (ex) {
                        throw_outside(ex);
                    }
                }
            }
        }
        , auto_bom = function(blob) {
            // prepend BOM for UTF-8 XML and text/* types (including HTML)
            // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
            if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
                return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
            }
            return blob;
        }
        , FileSaver = function(blob, name, no_auto_bom) {
            if (!no_auto_bom) {
                blob = auto_bom(blob);
            }
            // First try a.download, then web filesystem, then object URLs
            var
                  filesaver = this
                , type = blob.type
                , force = type === force_saveable_type
                , object_url
                , dispatch_all = function() {
                    dispatch(filesaver, "writestart progress write writeend".split(" "));
                }
                // on any filesys errors revert to saving with object URLs
                , fs_error = function() {
                    if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
                        // Safari doesn't allow downloading of blob urls
                        var reader = new FileReader();
                        reader.onloadend = function() {
                            var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
                            var popup = view.open(url, '_blank');
                            if(!popup) view.location.href = url;
                            url=undefined; // release reference before dispatching
                            filesaver.readyState = filesaver.DONE;
                            dispatch_all();
                        };
                        reader.readAsDataURL(blob);
                        filesaver.readyState = filesaver.INIT;
                        return;
                    }
                    // don't create more object URLs than needed
                    if (!object_url) {
                        object_url = get_URL().createObjectURL(blob);
                    }
                    if (force) {
                        view.location.href = object_url;
                    } else {
                        var opened = view.open(object_url, "_blank");
                        if (!opened) {
                            // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
                            view.location.href = object_url;
                        }
                    }
                    filesaver.readyState = filesaver.DONE;
                    dispatch_all();
                    revoke(object_url);
                }
            ;
            filesaver.readyState = filesaver.INIT;

            if (can_use_save_link) {
                object_url = get_URL().createObjectURL(blob);
                setTimeout(function() {
                    save_link.href = object_url;
                    save_link.download = name;
                    click(save_link);
                    dispatch_all();
                    revoke(object_url);
                    filesaver.readyState = filesaver.DONE;
                });
                return;
            }

            fs_error();
        }
        , FS_proto = FileSaver.prototype
        , saveAs = function(blob, name, no_auto_bom) {
            return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
        }
    ;
    // IE 10+ (native saveAs)
    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
        return function(blob, name, no_auto_bom) {
            name = name || blob.name || "download";

            if (!no_auto_bom) {
                blob = auto_bom(blob);
            }
            return navigator.msSaveOrOpenBlob(blob, name);
        };
    }

    FS_proto.abort = function(){};
    FS_proto.readyState = FS_proto.INIT = 0;
    FS_proto.WRITING = 1;
    FS_proto.DONE = 2;

    FS_proto.error =
    FS_proto.onwritestart =
    FS_proto.onprogress =
    FS_proto.onwrite =
    FS_proto.onabort =
    FS_proto.onerror =
    FS_proto.onwriteend =
        null;

    return saveAs;
}(
       typeof self !== "undefined" && self
    || typeof window !== "undefined" && window
    || this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd !== null)) {
  define("FileSaver.js", function() {
    return saveAs;
  });
}
</script>
<script>
let mediaStream;
let recorderFile;
let stopRecordCallback;
let openBtn = document.getElementById("openCamera");
let startBtn = document.getElementById("start-recording");
let saveBtn = document.getElementById("save-recording");
export default {
    data(){
        return{
          disabled:'',
        }
    },
  methods: {
    back(){
      this.$router.go(-1)
    },

    openBtn() {//打开摄像头
      console.log(this.disabled)
      this.disabled = true;
    //   startBtn.disabled=false;
      this.openCamera();
      },
    startBtn() {//开始录制视频
      this.disabled = true;
      this.startRecord();
    },
    saveBtn() {//保存
      this.saver();
         // alert('Drop WebM file on Chrome or Firefox. Both can play entire file. VLC player or other players may not work.');
    },

    async changeVideo(data){//发送视频
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
      let videoUrl = `${this.$baseUrl}/file/download?user_id=`+localStorage.user_id+'&s_id='+localStorage.s_id+'&filename='+res.data.filename+'&file_kind='+res.data.file_kind
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
        
      }else
      {
        this.$toast.fail("发送失败" + ress.msg)
      }
      // this.chatRexord.push(ress)
      // // console.log(this.chatRexord)
      // this.expandUserData();
      // this.updateReadedHeight(ress.height)
   },
  }
}
</script>
<style lang="stylus" scoped>
.box{
  width:100%;
  height 100%;
  background-color:#fff;
  position fixed
}
.box >>> .van-nav-bar__text {
	color #000000
	font-size 1rem
	font-weight bold
}
.box >>> .van-nav-bar__arrow {
  color:#000;
}

</style>
