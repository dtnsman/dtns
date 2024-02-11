((typeof self !== 'undefined' ? self : this)["webpackJsonpk_form_design"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpk_form_design"] || []).push([[39],{

/***/ "1f3b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5d16e32a-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/components/UploadImg/uploadImg.vue?vue&type=template&id=da1113ba&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "upload-img-box-9136076486841527",
    style: {
      width: _vm.record.options.width
    }
  }, [_c('Upload', {
    attrs: {
      "name": _vm.config.uploadImageName || _vm.record.options.fileName,
      "headers": _vm.config.uploadImageHeaders || _vm.record.options.headers,
      "data": _vm.config.uploadImageData || _vm.optionsData,
      "action": _vm.config.uploadImage || _vm.record.options.action,
      "multiple": _vm.record.options.multiple,
      "listType": _vm.record.options.listType,
      "disabled": _vm.record.options.disabled || _vm.parentDisabled,
      "fileList": _vm.fileList,
      "accept": "image/gif, image/jpeg, image/png",
      "remove": _vm.remove,
      "beforeUpload": _vm.beforeUpload
    },
    on: {
      "change": _vm.handleChange,
      "preview": _vm.handlePreview
    }
  }, [_vm.record.options.listType !== 'picture-card' && _vm.fileList.length < _vm.record.options.limit ? _c('Button', {
    attrs: {
      "disabled": _vm.record.options.disabled || _vm.parentDisabled
    }
  }, [_c('a-icon', {
    attrs: {
      "type": "upload"
    }
  }), _vm._v(" " + _vm._s(_vm.record.options.placeholder) + " ")], 1) : _vm._e(), _vm.record.options.listType === 'picture-card' && _vm.fileList.length < _vm.record.options.limit ? _c('div', {
    attrs: {
      "disabled": _vm.record.options.disabled || _vm.parentDisabled
    }
  }, [_c('a-icon', {
    attrs: {
      "type": "plus"
    }
  }), _c('div', {
    staticClass: "ant-upload-text"
  }, [_vm._v(_vm._s(_vm.record.options.placeholder))])], 1) : _vm._e()], 1), _c('a-modal', {
    attrs: {
      "visible": _vm.previewVisible,
      "footer": null
    },
    on: {
      "cancel": _vm.handleCancel
    }
  }, [_c('img', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "alt": "example",
      "src": _vm.previewImageUrl
    }
  })])], 1);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./packages/components/UploadImg/uploadImg.vue?vue&type=template&id=da1113ba&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.promise.js
var es6_promise = __webpack_require__("551c");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./packages/utils/index.js + 7 modules
var utils = __webpack_require__("e74d");

// EXTERNAL MODULE: ./node_modules/ant-design-vue/es/message/index.js + 4 modules
var message = __webpack_require__("f64c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./packages/components/UploadImg/uploadImg.vue?vue&type=script&lang=js&





/*
 * author kcz
 * date 2019-12-31
 * description 上传图片组件
 */


var Upload = utils["c" /* pluginManager */].getComponent("upload");
var Button = utils["c" /* pluginManager */].getComponent("aButton").component;
/* harmony default export */ var uploadImgvue_type_script_lang_js_ = ({
  name: "KUploadImg",
  // eslint-disable-next-line vue/require-prop-types
  props: ["record", "value", "config", "parentDisabled"],
  components: {
    Upload: Upload.component,
    Button: Button
  },
  data: function data() {
    return {
      fileList: [],
      previewVisible: false,
      previewImageUrl: ""
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
              type: "img",
              name: item.name,
              status: item.status,
              uid: item.uid,
              url: item.url,
              //res.data.url || "",
              thumbUrl: item.thumbUrl //res.data.thumbUrl
            };
          } else {
            return {
              type: "img",
              name: item.name,
              status: item.status,
              uid: item.uid,
              url: item.url || "",
              thumbUrl: item.thumbUrl
            };
          }
        });
        _this.$emit("change", arr);
        _this.$emit("input", arr);
      }, 10);
    },
    handlePreview: function handlePreview(file) {
      // 预览图片
      this.previewImageUrl = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleCancel: function handleCancel() {
      // 取消操作
      this.previewVisible = false;
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
                _context.next = 32;
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
                img_kind: 'open',
                random: Math.random(),
                data: data.file,
                img_q: 0.1
              }; // if(this.chatWeb3Key)
              // {
              //   console.time()
              //   let web3KeyHash = await sign_util.hashVal(this.chatWeb3Key)
              //   let {iv,aeskey} = sign_util.decodeWeb3keyAes256Str(this.chatWeb3Key)
              //   console.log('import-key:',await sign_util.importSecretKey(aeskey))
              //   let en1 = await sign_util.encryptMessage(await sign_util.importSecretKey(aeskey),iv,fileInfo.filename)
              //   fileInfo.filename = 'aes256|'+web3KeyHash+'|'+en1
              //   fileInfo.originalname = fileInfo.filename
              //   console.log('fileInfo.filename:',fileInfo.filename)
              //   console.timeEnd()
              // }
              rpc_client = window.rpc_client;
              _context.next = 12;
              return new Promise(function (resolve) {
                rpc_client.sendImage(fileInfo, function (udata) {
                  console.log('sendFile-callback-data:' + JSON.stringify(udata));
                  resolve(udata);
                });
              });
            case 12:
              res = _context.sent;
              console.log('upload-file-ret:' + JSON.stringify(res));
              if (res.data.ret) {
                _context.next = 18;
                break;
              }
              console.log('上传失败' + res.data.msg, 3000);
              _context.next = 32;
              break;
            case 18:
              console.log('上传成功' + res.data.msg, 3000);
              //[{"type":"img","name":"weixin-touxiang.jpg","status":"done","uid":"vc-upload-1681467233136-3","url":"http://cdn.kcz66.com/%E5%A4%B4%E5%83%8F.jpg"},
              resultObj = {
                type: "img",
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
              };
              _context.t0 = console;
              _context.next = 23;
              return window.imageDb.getDataByKey(resultObj.url);
            case 23:
              _context.t1 = _context.sent;
              _context.t0.log.call(_context.t0, 'await window.imageDb.getDataByKey(resultObj.url):', _context.t1);
              _context.next = 27;
              return window.imageDb.getDataByKey(resultObj.url);
            case 27:
              resultObj.thumbUrl = _context.sent.data;
              console.log('resultObj:', resultObj);
              this.resultObj = resultObj;
              this.fileList.push(resultObj);
              console.log('push-fileList:', this.fileList);
            case 32:
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
    handleChange: function () {
      var _handleChange = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(info) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // 上传数据改变时
              this.fileList = info.fileList;
              if (info.file.status === "done") {
                res = info.file.response;
                if (res.code === 0) {
                  // this.fileList.pop();
                  // this.handleSelectChange();
                } else {
                  // this.fileList.pop();
                  // this.fileList.pop();
                  Object.assign(this.fileList[this.fileList.length - 1], this.resultObj);
                  // message.error(`图片上传失败`);
                }
              } else if (info.file.status === "error") {
                // message.error(`图片上传失败`);
                // this.fileList.pop();
                Object.assign(this.fileList[this.fileList.length - 1], this.resultObj);
                // this.fileList.pop();
              }

              this.handleSelectChange();
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function handleChange(_x3) {
        return _handleChange.apply(this, arguments);
      }
      return handleChange;
    }()
  }
});
// CONCATENATED MODULE: ./packages/components/UploadImg/uploadImg.vue?vue&type=script&lang=js&
 /* harmony default export */ var UploadImg_uploadImgvue_type_script_lang_js_ = (uploadImgvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./packages/components/UploadImg/uploadImg.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  UploadImg_uploadImgvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var uploadImg = (component.exports);
// CONCATENATED MODULE: ./packages/components/UploadImg/index.js

/* harmony default export */ var UploadImg = __webpack_exports__["default"] = (uploadImg);

/***/ })

}]);