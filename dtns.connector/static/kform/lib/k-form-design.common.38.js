((typeof self !== 'undefined' ? self : this)["webpackJsonpk_form_design"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpk_form_design"] || []).push([[38],{

/***/ "0553":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5d16e32a-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/components/UploadFile/uploadFile.vue?vue&type=template&id=17df4374&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    style: {
      width: _vm.record.options.width
    }
  }, [!_vm.record.options.drag ? _c('Upload', {
    attrs: {
      "disabled": _vm.record.options.disabled || _vm.parentDisabled,
      "name": _vm.config.uploadFileName || _vm.record.options.fileName,
      "headers": _vm.config.uploadFileHeaders || _vm.record.options.headers,
      "data": _vm.config.uploadFileData || _vm.optionsData,
      "action": _vm.config.uploadFile || _vm.record.options.action,
      "multiple": _vm.record.options.multiple,
      "fileList": _vm.fileList,
      "remove": _vm.remove,
      "beforeUpload": _vm.beforeUpload
    },
    on: {
      "preview": _vm.handlePreview,
      "change": _vm.handleChange
    }
  }, [_vm.fileList.length < _vm.record.options.limit ? _c('Button', {
    attrs: {
      "disabled": _vm.record.options.disabled || _vm.parentDisabled
    }
  }, [_c('a-icon', {
    attrs: {
      "type": "upload"
    }
  }), _vm._v(" " + _vm._s(_vm.record.options.placeholder) + " ")], 1) : _vm._e()], 1) : _c('UploadDragger', {
    class: {
      'hide-upload-drag': !(_vm.fileList.length < _vm.record.options.limit)
    },
    attrs: {
      "disabled": _vm.record.options.disabled || _vm.parentDisabled,
      "name": _vm.config.uploadFileName || _vm.record.options.fileName,
      "headers": _vm.config.uploadFileHeaders || _vm.record.options.headers,
      "data": _vm.config.uploadFileData || _vm.optionsData,
      "action": _vm.config.uploadFile || _vm.record.options.action,
      "multiple": _vm.record.options.multiple,
      "fileList": _vm.fileList,
      "remove": _vm.remove,
      "beforeUpload": _vm.beforeUpload
    },
    on: {
      "preview": _vm.handlePreview,
      "change": _vm.handleChange
    }
  }, [_c('p', {
    staticClass: "ant-upload-drag-icon"
  }, [_c('a-icon', {
    attrs: {
      "type": "cloud-upload"
    }
  })], 1), _c('p', {
    staticClass: "ant-upload-text"
  }, [_vm._v("单击或拖动文件到此区域")])])], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./packages/components/UploadFile/uploadFile.vue?vue&type=template&id=17df4374&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.promise.js
var es6_promise = __webpack_require__("551c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/message/index.js + 4 modules
var message = __webpack_require__("f64c");

// EXTERNAL MODULE: ./packages/utils/index.js + 7 modules
var utils = __webpack_require__("e74d");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/components/UploadFile/uploadFile.vue?vue&type=script&lang=js&





/*
 * author kcz
 * date 2019-12-31
 * description 上传文件组件
 */


var Upload = utils["c" /* pluginManager */].getComponent("upload");
var UploadDragger = utils["c" /* pluginManager */].getComponent("uploadDragger");
var Button = utils["c" /* pluginManager */].getComponent("aButton").component;
/* harmony default export */ var uploadFilevue_type_script_lang_js_ = ({
  name: "KUploadFile",
  // eslint-disable-next-line vue/require-prop-types
  props: ["record", "value", "config", "parentDisabled", "dynamicData"],
  components: {
    Upload: Upload.component,
    UploadDragger: UploadDragger.component,
    Button: Button
  },
  data: function data() {
    return {
      fileList: []
    };
  },
  watch: {
    value: {
      // value 需要深度监听及默认先执行handler函数
      handler: function handler(val) {
        if (val) {
          this.setFileList();
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    optionsData: function optionsData() {
      try {
        return JSON.parse(this.record.options.data);
      } catch (err) {
        console.error(err);
        return {};
      }
    }
  },
  methods: {
    setFileList: function setFileList() {
      // 当传入value改变时，fileList也要改变
      // 如果传入的值为字符串，则转成json
      if (typeof this.value === "string") {
        this.fileList = JSON.parse(this.value);
        // 将转好的json覆盖组件默认值的字符串
        this.handleSelectChange();
      } else {
        this.fileList = this.value;
      }
    },
    handleSelectChange: function handleSelectChange() {
      var _this = this;
      setTimeout(function () {
        var arr = _this.fileList.map(function (item) {
          if (typeof item.response !== "undefined") {
            // const res = item.response;
            return {
              type: "file",
              name: item.name,
              status: item.status,
              uid: item.uid,
              //res.data.fileId || Date.now(),
              url: item.url || "" //res.data.url || ""
            };
          } else {
            return {
              type: "file",
              name: item.name,
              status: item.status,
              uid: item.uid,
              url: item.url || ""
            };
          }
        });
        _this.$emit("change", arr);
        _this.$emit("input", arr);
      }, 10);
    },
    handlePreview: function handlePreview(file) {
      var _this2 = this;
      // 下载文件
      var downloadWay = this.record.options.downloadWay;
      var dynamicFun = this.record.options.dynamicFun;
      if (downloadWay === "a") {
        // 使用a标签下载
        var a = document.createElement("a");
        a.href = file.url || file.thumbUrl;
        a.download = file.name;
        a.click();
      } else if (downloadWay === "ajax") {
        // 使用ajax获取文件blob，并保持到本地
        this.getBlob(file.url || file.thumbUrl).then(function (blob) {
          _this2.saveAs(blob, file.name);
        });
      } else if (downloadWay === "dynamic") {
        // 触发动态函数
        this.dynamicData[dynamicFun](file);
      }
    },
    /**
     * 获取 blob
     * url 目标文件地址
     */
    getBlob: function getBlob(url) {
      return new Promise(function (resolve) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
          if (xhr.status === 200) {
            resolve(xhr.response);
          }
        };
        xhr.send();
      });
    },
    /**
     * 保存 blob
     * filename 想要保存的文件名称
     */
    saveAs: function saveAs(blob, filename) {
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
      } else {
        var link = document.createElement("a");
        var body = document.querySelector("body");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // fix Firefox
        link.style.display = "none";
        body.appendChild(link);
        link.click();
        body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      }
    },
    remove: function remove() {
      this.handleSelectChange();
    },
    beforeUpload: function () {
      var _beforeUpload = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e, files) {
        var g_dtnsManager, data, fileInfo, rpc_client, res, resultObj;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (files.length + this.fileList.length > this.record.options.limit) {
                message["a" /* default */].warning("\u6700\u5927\u4E0A\u4F20\u6570\u91CF\u4E3A".concat(this.record.options.limit));
                files.splice(this.record.options.limit - this.fileList.length);
              }
              console.log('beforeUpload:files:', files);
              console.log('fileList:', this.fileList);
              g_dtnsManager = window.g_dtnsManager;
              console.log('g_dtnsManager:', g_dtnsManager);
              if (!(typeof g_dtnsManager != 'undefined')) {
                _context.next = 15;
                break;
              }
              console.log('g_dtnsManager:', g_dtnsManager);
              // g_dtnsManager.run()
              data = {
                file: files[0]
              };
              fileInfo = {
                fieldname: "file",
                encoding: 'fromfile_binary',
                originalname: data.file.name,
                mimetype: data.file.type,
                filename: data.file.name,
                path: 'file-path',
                size: data.file.size,
                user_id: localStorage.user_id,
                s_id: localStorage.s_id,
                file_kind: 'file',
                random: Math.random(),
                data: data.file
              }; // if(this.chatWeb3Key)
              // {
              //   console.time()
              //   console.log('encrypt file:')
              //   let web3KeyHash = await sign_util.hashVal(this.chatWeb3Key)
              //   let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(this.chatWeb3Key)
              //   console.log('import-key:',await sign_util.importSecretKey(aeskey))
              //   let en1 = await sign_util.encryptMessage(await sign_util.importSecretKey(aeskey),iv,fileInfo.filename)
              //   fileInfo.filename = 'aes256|'+web3KeyHash+'|'+en1
              //   fileInfo.originalname = fileInfo.filename
              //   console.log('fileInfo.filename:',fileInfo.filename)
              //   console.log('old-file.size:',fileInfo.size)
              //   var binaryData = await new Promise((res)=>{
              //                   var reader = new FileReader();
              //                   reader.onload = function (e) {
              //                       res(e.target.result);
              //                   }
              //                   reader.readAsArrayBuffer(fileInfo.data);
              //               })
              //   fileInfo.data = await sign_util.encryptMessage(await sign_util.importSecretKey(aeskey),iv,binaryData,false)
              //   fileInfo.data = new Blob([fileInfo.data ], { type: 'application/octet-stream' });
              //   fileInfo.size = fileInfo.data.size
              //   console.log('new-file.size:',fileInfo.size)
              //   console.timeEnd()
              // }
              rpc_client = window.rpc_client;
              _context.next = 12;
              return new Promise(function (resolve) {
                rpc_client.sendFile(fileInfo, function (udata) {
                  console.log('sendFile-callback-data:' + JSON.stringify(udata));
                  resolve(udata);
                });
              });
            case 12:
              res = _context.sent;
              console.log('upload-file-ret:' + JSON.stringify(res));
              if (!res.data.ret) {
                console.log('上传失败' + res.data.msg, 3000);
              } else {
                console.log('上传成功' + res.data.msg, 3000);
                //[{"type":"img","name":"weixin-touxiang.jpg","status":"done","uid":"vc-upload-1681467233136-3","url":"http://cdn.kcz66.com/%E5%A4%B4%E5%83%8F.jpg"},
                resultObj = {
                  type: "file",
                  name: data.file.name,
                  status: "done",
                  uid: data.file.uid,
                  url: res.data.filename,
                  originFileObj: {
                    uid: data.file.uid
                  },
                  xhr: {},
                  response: "ok",
                  percent: 0,
                  lastModified: 1685528081370,
                  lastModifiedDate: "2023-05-31T10:14:41.370Z"
                }; // console.log('await window.imageDb.getDataByKey(resultObj.url):',await window.imageDb.getDataByKey(resultObj.url))
                // resultObj.thumbUrl = (await window.imageDb.getDataByKey(resultObj.url)).data
                console.log('resultObj:', resultObj);
                this.resultObj = resultObj;
                this.fileList.push(resultObj);
              }
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function beforeUpload(_x, _x2) {
        return _beforeUpload.apply(this, arguments);
      }
      return beforeUpload;
    }(),
    handleChange: function handleChange(info) {
      this.fileList = info.fileList;
      console.log('handleChange-this.fileList:', this.fileList);
      if (info.file.status === "done") {
        var res = info.file.response;
        if (res.code === 0) {
          // this.handleSelectChange();
        } else {
          // this.fileList.pop();
          Object.assign(this.fileList[this.fileList.length - 1], this.resultObj);
          // message.error(`文件上传失败`);
        }
      } else if (info.file.status === "error") {
        // this.fileList.pop();
        Object.assign(this.fileList[this.fileList.length - 1], this.resultObj);
        // message.error(`文件上传失败`);
      }

      this.handleSelectChange();
    }
  }
});
// CONCATENATED MODULE: ./packages/components/UploadFile/uploadFile.vue?vue&type=script&lang=js&
 /* harmony default export */ var UploadFile_uploadFilevue_type_script_lang_js_ = (uploadFilevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./packages/components/UploadFile/uploadFile.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  UploadFile_uploadFilevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var uploadFile = (component.exports);
// CONCATENATED MODULE: ./packages/components/UploadFile/index.js

/* harmony default export */ var UploadFile = __webpack_exports__["default"] = (uploadFile);

/***/ })

}]);