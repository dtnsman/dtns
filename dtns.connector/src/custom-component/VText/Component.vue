<!-- eslint-disable vue/no-v-html -->
<template>
    <div
        v-if="editMode == 'edit'"
        class="v-text"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
    >
        <!-- tabindex >= 0 使得双击时聚焦该元素 -->
        <div
            ref="text"
            :contenteditable="canEdit"
            :class="{ 'can-edit': canEdit }"
            tabindex="0"
            :style="{ verticalAlign: element.style.verticalAlign }"
            @dblclick="setEdit"
            @paste="clearStyle"
            @mousedown="handleMousedown"
            @blur="handleBlur"
            @input="handleInput"
            v-html="element.propValue"
        ></div>
    </div>
    <div v-else class="v-text preview" @click="clickNow">
        <div :style="{ verticalAlign: element.style.verticalAlign }" v-html="mtext?mtext:element.propValue"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { keycodes } from '@/utils/shortcutKey.js'
import request from '@/utils/request'
import OnEvent from '../common/OnEvent'
// import { newPrivateKey } from '../../utils/key_util'
// import * as eccryptoJS from 'rn-eccrypto-js'

// import * as jqecc from 'jquery-ecdsa'
 
export default {
    extends: OnEvent,
    props: {
        propValue: {
            type: String,
            required: true,
            default: '',
        },
        request: {
            type: Object,
            default: () => {},
        },
        element: {
            type: Object,
            default: () => {},
        },
        linkage: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            canEdit: false,
            ctrlKey: 17,
            isCtrlDown: false,
            cancelRequest: null,
            propCTX: '',
            mtext: null,
        }
    },
    computed: {
        ...mapState([
            'editMode',
        ]),
    },
    async created() {
        // 注意，修改时接口属性时不会发数据，在预览时才会发
        // 如果要在修改接口属性的同时发请求，需要 watch 一下 request 的属性
        if (this.request) {
            // 第二个参数是要修改数据的父对象，第三个参数是修改数据的 key，第四个数据修改数据的类型
            this.cancelRequest = request(this.request, this.element, 'propValue', 'string')
        }
        // setTimeout(async () => {
        //     this.xdata = this.element.xdata
        //     // eslint-disable-next-line
        //     this.poplang = new PopRuntime(this)//this.element.poplang
        //     await this.poplang.runScript(null, this.element.code)
        //     console.log('code:' + this.element.code, 'mtext:', this.mtext)
        // }, 1000)
        // eslint-disable-next-line
        this.poplang = new PopRuntime(this)
        this.poplang.binderAddOpcode('init', async () => {
            this.xdata = this.element.xdata
            console.log('this.xdata:', this.xdata)
            await this.poplang.runScript(null, this.element.code)
            console.log('code:' + this.element.code, 'mtext:', this.mtext)
        })
        this.element.poplang = this.poplang
        
        if (true) return 
        
        // const keyPair = eccryptoJS.generateKeyPair()

        // const str = 'test message to hash'
        // const msg = eccryptoJS.utf8ToBuffer(str)
        // const hash = await eccryptoJS.sha256(str)

        // const sig = await eccryptoJS.sign(keyPair.privateKey, hash)

        // await eccryptoJS.verify(keyPair.publicKey, msg, sig)
        // console.log('keyPair:' + JSON.stringify(keyPair))
        /* eslint-disable */ 

        this.propCTX = {}
        this.poplang = new PopRuntime(this.propCTX)
        // this.poplang.setProtocol(protocol)
        // console.log('protocol:' + JSON.stringify(protocol))

        const protocolCache = localStorage.getItem('protocol_config')
        console.log('protocolCache:' + JSON.stringify(protocolCache))

        if (protocolCache) {
            this.poplang.setProtocol(JSON.parse(protocolCache))
            this.isok = 'ok'
        }else{
            this.isok = false
            return ;
        }

        // let script = `
        // {"tmp":100000101,"key":"safe-key"}
        // [["this.get"]]
        // set a 1
        // set b 3
        // + a b c
        // + c c c
        // //这里在safeFlag=true的情况下，不会退出。
        // $.process.exit
        // this.assign {"tmp":100,"yz":780000,"param":{"a":1,"b":1,"c":1}}
        // $.JSON.stringify param
        // set z 1000003
        // pop.func myfunc a c z
        //     + a c c
        //     $.console.log c
        //     < c z cmp
        //     pop.ifelse cmp myfunc pop.exit a c z c cmp
        //     ## 这是永远的注释（记得保留空格）
        //     return c cmp
        // pop.func.end
        // myfunc a c tmp c cmp
        // `
        
        let script = `
        {"tmp":100000101,"key":"safe-key"}
        [["this.get"]]
        set a 1
        set b 1
        + a b c
        + c c c
        //这里在safeFlag=true的情况下，不会退出。
        $.process.exit
        this.assign {"tmp":100,"yz":780000,"param":{"a":1,"b":1,"c":1}}
        $.JSON.stringify param
        set z 1000003
        pop.func myfunc a c z
            + a c c
            //$.console.log c
            < c z cmp
            // new obj o
            // object.set o.a a
            // object.set o.b b
            // object.set o.cmp cmp
            // this.get
            //递归调用------会引发results嵌套问题。
            // # 注释掉results  ---递归中使用，照样会形成深深的栈
            pop.ifelse cmp myfunc pop.exit a c z c cmp
            // # 
            ## 这是永远的注释（记得保留空格）
            return c cmp
            //下面这行语句不会执行到。
            this.get 
        pop.func.end
        //让外部可以捕获得到结果，参考：myfunc a b c tmp vret
        // pop.ifelse yy myfunc this.get  tmp a a z
        // pop.ifelse a myfunc this.get  tmp a a z
        // pop.ifelse a myfunc0 this.get  tmp a a z
        `
        let script2 = `
        this.get

        # 注释掉results收集
        myfunc a c tmp c cmp
        myfunc a c tmp c cmp
        myfunc a c tmp c cmp
        # 恢复results收集
        //pop.while cmp myfunc a c tmp c cmp
        //以下执行ok-2022-9-16-bak
        // pop.do.while cmp myfunc a c tmp c cmp

        set x rmb_zHW1ivcmHt742C2g
        fork x x x x 
        //set yv 中文字符啊
        this.get
        // pop.func myfunc00000
        // + c c c`
        await this.poplang.runScript(null, script)
        // this.element.innerHTML = this.propCTX.c
        let xjson = await this.poplang.runScript(null, script2)
        console.log('xjson:' + JSON.stringify(xjson))

/* eslint-disable */ 
        //await new Promise(resolve => setTimeout(resolve, 10000));

        console.log('ctx:' + JSON.stringify(this.propCTX))
        this.element.propValue += JSON.stringify(this.propCTX)

        const a = document.createElement('input')
        a.setAttribute('type', 'file')
        let This = this
        // console.log('this:' + this.)

        // let pkey = newPrivateKey()
        // console.log('pkey:'+pkey)

        a.addEventListener('change',async function selectedFileChanged() {
            console.log('data:' + this.files)
            if (this.files.length == 0) return alert('请选择文件')
            console.log('upload-files:'+JSON.stringify(this.files[0].name))
            This.propCTX['file'] = this.files[0]
            await This.poplang.op(null,'set','filename',this.files[0].name)
            let uploadRet = await This.poplang.op(null,'file.upload','x','x','x','x','file','upload_ret')
            This.poplang.op(null,'del','upload_ret')
            console.log('uploadRet:'+JSON.stringify(uploadRet))
            const reader = new FileReader()
            reader.onload = function fileReadCompleted() {
                console.log('result:' + reader.result)
                var aestext = CryptoJS.AES.encrypt(reader.result, '302').toString();
                console.log('aestext:'+aestext)
                var decodeText =  CryptoJS.AES.decrypt(aestext,'302').toString(CryptoJS.enc.Utf8)
                console.log('decodeText:'+decodeText)
                console.log('text-md5:'+ md5(decodeText))
                console.log('text-sha256:'+sha256(decodeText))
                // console.log('text:' + reader.result
                // let { style, data } = JSON.parse(reader.result)
                // // This.canvasStyleData = style
                // console.log('style:' + JSON.stringify(style))
                // This.$store.commit('setCanvasStyle', style)
                // This.$store.commit('setComponentData', data)
            }

            reader.readAsText(this.files[0])

            //await new Promise(resolve => setTimeout(resolve, 100));
            await This.poplang.op(null,'set','furl','http://127.0.0.1/op?appid=10001&secret_key=39f01b58558ba38d831744a0d353d7a3&opcode=file.download&token_x=rmb_zHW1ivcmHt742C2g&token_y=rmb_zHW1ivcmHt742C2g&opval=2')
            await This.poplang.op(null,'set','path','download0.jpg')
            let downloadRet = await This.poplang.op(null,'local.file.download','furl','xy','filename','')
        })
        a.click()

        const privateKeyBuf = window.crypto.getRandomValues(new Uint8Array(32))
const privateKey = Secp256k1.uint256('7ecd5cb78755d45deb5087d2327c70245cd6b8ed2e1116f18d9667de87514666',16)// Secp256k1.uint256(privateKeyBuf, 16)

//console.log('bs58encode : '+(typeof bs58Encode))
const hexString = '7ecd5cb78755d45deb5087d2327c70245cd6b8ed2e1116f18d9667de87514666'
const prikeyEncode = bs58.encode(new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16))))//bs58Encode(privateKey)
console.log('prikeyEncode:'+prikeyEncode)

console.log('privateKey-str:'+privateKey.toString('hex'))
console.log('keys:'+(Object.keys(Secp256k1)))
// Generating public key
const publicKey = Secp256k1.generatePublicKeyFromPrivateKeyData(privateKey)
const pubX = Secp256k1.uint256(publicKey.x, 16)
const pubY = Secp256k1.uint256(publicKey.y, 16)

// Signing a digest
const digest = Secp256k1.uint256("483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8", 16)
const sig = Secp256k1.ecsign(privateKey, digest)
const sigR = Secp256k1.uint256(sig.r,16)
const sigS = Secp256k1.uint256(sig.s,16)

// Verifying signature
const isValidSig = Secp256k1.ecverify(pubX, pubY, sigR, sigS, digest)
let prikey = privateKey.toString('hex')
let pubxKey = pubX.toString('hex')
let pubyKey = pubY.toString('hex')
console.log('pubx:'+pubxKey+' puby:'+pubyKey)
console.log('signR:'+sigR.toString('hex')+' signS:'+sigS.toString('hex'))
console.log( 'Signature must be valid:'+isValidSig+' prikey:'+prikey+' len:'+prikey.length)
        
        // this.$http.post( 'http://127.0.0.1:80/op', { name:"菜鸟教程", url:"http://www.runoob.com"},{emulateJSON:true}).then(function(res){
        //             console.log('result:'+res.body);    
        //         },function(res){
        //             console.log(res.status);
        //         });
        // let This = this
        // setInterval(() => {
        //     // let Time = new Date().getTime()
        //     // This.element.propValue += Time
        //     // This.element.innerHTML = '' + This.propCTX.c
        //     This.$emit('input', This.element, 'value:' + This.propCTX.c)
        //     console.log('ctx:' + JSON.stringify(This.propCTX))
        // }, 1000)
    },
    beforeDestroy() {
        // 组件销毁时取消请求
        this.request && this.cancelRequest()
    },
    methods: {
        handleInput(e) {
            this.$emit('input', this.element, e.target.innerHTML)
        },

        handleKeydown(e) {
            // 阻止冒泡，防止触发复制、粘贴组件操作
            this.canEdit && e.stopPropagation()
            if (e.keyCode == this.ctrlKey) {
                this.isCtrlDown = true
            } else if (this.isCtrlDown && this.canEdit && keycodes.includes(e.keyCode)) {
                e.stopPropagation()
            } else if (e.keyCode == 46) { // deleteKey
                e.stopPropagation()
            }
        },

        handleKeyup(e) {
            // 阻止冒泡，防止触发复制、粘贴组件操作
            this.canEdit && e.stopPropagation()
            if (e.keyCode == this.ctrlKey) {
                this.isCtrlDown = false
            }
        },

        handleMousedown(e) {
            if (this.canEdit) {
                e.stopPropagation()
            }
        },

        async clickNow(e) {
            let ret = await this.poplang.op(null, 'onclick')
            console.log('VText-onclick-ret:', ret)
        },

        clearStyle(e) {
            e.preventDefault()
            const clp = e.clipboardData
            const text = clp.getData('text/plain') || ''
            if (text !== '') {
                document.execCommand('insertText', false, text)
            }

            this.$emit('input', this.element, e.target.innerHTML)
        },

        handleBlur(e) {
            this.element.propValue = e.target.innerHTML || '&nbsp;'
            const html = e.target.innerHTML
            if (html !== '') {
                this.element.propValue = e.target.innerHTML
            } else {
                this.element.propValue = ''
                this.$nextTick(() => {
                    this.element.propValue = '&nbsp;'
                })
            }
            this.canEdit = false
        },

        setEdit() {
            if (this.element.isLock) return

            this.canEdit = true
            // 全选
            this.selectText(this.$refs.text)
        },

        selectText(element) {
            const selection = window.getSelection()
            const range = document.createRange()
            range.selectNodeContents(element)
            selection.removeAllRanges()
            selection.addRange(range)
        },
    },
}
</script>

<style lang="scss" scoped>
.v-text {
    width: 100%;
    height: 100%;
    display: table;

    div {
        display: table-cell;
        width: 100%;
        height: 100%;
        outline: none;
        word-break: break-all;
        padding: 4px;
    }

    .can-edit {
        cursor: text;
        height: 100%;
    }
}

.preview {
    user-select: none;
}
</style>
