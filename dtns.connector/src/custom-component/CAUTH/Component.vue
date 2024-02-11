<template>
    <div
        v-if="isok != 'ok'"
    >
        <img :src='propValue.url' 
             width="100px" 
             height="100px" 
             @click="onclick">
    </div>
    <div v-else>
        <img :src='propValue.url1' 
             width="100px" 
             height="100px" >
        <span style='width:300px;overflow: hidden; text-overflow: ellipsis; -o-text-overflow: ellipsis;'>{{ token_key }}</span>
    </div>
</template>

<script>
import OnEvent from '../common/OnEvent'
import PopRuntime from '../../../static/js/static/pop_runtime2'

export default {
    extends: OnEvent,
    props: {
        propValue: {
            type: Object,
            required: true,
            default: () => {},
            // eslint-disable-next-line
            url: 'http://ec2-52-81-96-59.cn-north-1.compute.amazonaws.com.cn:61000/node.lauo.valuetest/chain/file/valuetest_filezG8jnpsSTiLi'
        },
        element: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            isok: false,
            token_key: '',
        }
    },
    created() {
        // this.propCTX = {}
        // this.poplang = new PopRuntime(this.propCTX)
        // const protocolCache = localStorage.getItem('protocol_config')
        // console.log('protocolCache:' + JSON.stringify(protocolCache))

        // if (protocolCache) {
        //     this.poplang.setProtocol(JSON.parse(protocolCache))
        //     this.isok = 'ok'
        // }
    },
    methods: {
        onclick() {
            if (this.isok == 'ok') {
                return 0
            }
            alert('请选择密钥配置文件（ROOT）')
            const a = document.createElement('input')
            a.setAttribute('type', 'file')
            let This = this
            // console.log('this:' + this.)

            // let pkey = newPrivateKey()
            // console.log('pkey:'+pkey)
            a.addEventListener('change', async function selectedFileChanged() {
                console.log('data:' + this.files)
                if (this.files.length == 0) return alert('请选择文件')

                console.log('upload-files:' + JSON.stringify(this.files[0].name))
                
                // This.propCTX['file'] = this.files[0]
                // await This.poplang.op(null,'set','filename',this.files[0].name)
                // let uploadRet = await This.poplang.op(null,'file.upload','x','x','x','x','file','upload_ret')
                // This.poplang.op(null,'del','upload_ret')
                // console.log('uploadRet:'+JSON.stringify(uploadRet))
                const reader = new FileReader()
                reader.onload = async function fileReadCompleted() {
                    console.log('result:' + reader.result)
                    let protocol0 = JSON.parse(reader.result)
                    This.poplang.setProtocol(protocol0) 
                    await This.poplang.op(null, 'set', 'token', protocol0.root_config.TOKEN_ROOT)
                    await This.poplang.op(null, 'set', 'opval', 60 * 60 * 24 * 100)
                    let result = await This.poplang.op(null, 'token.key', 'token', 'token', 'opval', 'token')
                    console.log('token-key-result:' + JSON.stringify(result))

                    // await This.poplang.op(null, 'set', 'n', 'new')
                    // let forkResult = await This.poplang.op(null, 'fork', 'n', 'token', 'opval', 'token')
                    // console.log('private_key:' + forkResult.private_key)
                    // console.log('fork-result:' + JSON.stringify(forkResult))

                    if (result.ret && result.rpc_func_ret && result.rpc_func_ret) {
                        This.isok = 'ok'
                        This.token_key = result.rpc_func_ret.token_key
                        This.protocol = protocol0
                        delete protocol0.root_config.appids
                        delete protocol0.root_config.secret_keys
                        delete protocol0.root_config.private_key
                        protocol0.root_config.token_key = result.rpc_func_ret.token_key

                        localStorage.setItem('protocol_config', JSON.stringify(protocol0))
                        console.log('protocol-cached:' + JSON.stringify(protocol0))
                    }
                    // var aestext = CryptoJS.AES.encrypt(reader.result, '302').toString();
                    // console.log('aestext:'+aestext)
                    // var decodeText =  CryptoJS.AES.decrypt(aestext,'302').toString(CryptoJS.enc.Utf8)
                    // console.log('decodeText:'+decodeText)
                    // console.log('text-md5:'+ md5(decodeText))
                    // console.log('text-sha256:'+sha256(decodeText))

                    // console.log('text:' + reader.result
                    // let { style, data } = JSON.parse(reader.result)
                    // // This.canvasStyleData = style
                    // console.log('style:' + JSON.stringify(style))
                    // This.$store.commit('setCanvasStyle', style)
                    // This.$store.commit('setComponentData', data)
                }

                reader.readAsText(this.files[0])
            })

            a.click()
        },
    },
}
</script>

<style lang="scss" scoped>
.v-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    width: 100%;
    height: 100%;
    font-size: 14px;

    &:active {
        color: #3a8ee6;
        border-color: #3a8ee6;
        outline: 0;
    }

    &:hover {
        background-color: #ecf5ff;
        color: #3a8ee6;
    }
}
</style>
