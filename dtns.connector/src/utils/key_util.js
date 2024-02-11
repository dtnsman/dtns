/**
 * Created by lauo.li on 2018/12/27.
 */
/* eslint-disable */ 

 import randomBytes from 'randombytes' 
//  import CryptoJS from 'crypto-js'
//  import sha256 from 'crypto-js/sha256'
//  import md5 from 'crypto-js/md5'
 import bs58 from 'bs58'
//  import bn from './bn.js'
//  import secp256k1 from './secp256k1'

//  const crypto = require('crypto');
//  const secp256k1 = require('secp256k1')
//  const bs58 = require(`bs58`);
 
 /**
  * 使用bs58Encode编码
  * @type {bs58Encode}
  */
 function bs58Encode(msg)
 {
     var MSG = bs58.encode(msg);
     return MSG;
 }
 /**
  * 使用bs58Decode解码
  * @type {bs58Decode}
  */
 function bs58Decode(msg)
 {
     var MSG = bs58.decode(msg);
     return MSG;
 }
 
 /**
  * 使用hashName进行内容签名，得到hash值
  * @type {hashVal}
  */
function hashVal(msg,hashName = 'sha256')
 {
     var msg_hash = crypto.createHash(hashName).update(msg).digest('hex');
     return msg_hash;
     // return bs58Encode(Buffer.from(msg_hash));
 }
 
 /**
  * 生成新的private_key
  * @type {newPrivateKey}
  */
function newPrivateKey()
 {
     // generate privKey
     let privKey
     do {
         privKey = randomBytes(32) //其实是一个buffer，二进制的buffer。
         //privKey = randomBytes(32) //其实是一个buffer，二进制的buffer。
     } while (!secp256k1.privateKeyVerify(privKey))
 
     //console.log("privKey:"+privKey+" length:"+privKey.length+" typeof:"+(typeof privKey))
 
     return bs58Encode(privKey);
 }
 
 /**
  * 生态新的publicKey
  * @type {getPublicKey}
  */
function getPublicKey(privateKey){
     var privKey = bs58Decode(privateKey);
     var pubKey = secp256k1.publicKeyCreate(privKey);
     pubKeyStr = bs58Encode(pubKey);
 
     return pubKeyStr
 
     /**这里会导致递归问题（invalidateKeys里会调用　getPublicKey）
     //2019-1-4新增判断
     if(invalidateKeys(privateKey,pubKeyStr))
         return pubKeyStr;
     else
         return null;
     */
 }
 
 /**
  * 签名内容
  * @type {signMsg}
  */
function signMsg(msg,privKey){
 
     private_key =  bs58Decode(privKey);
     //console.log("private_key:"+private_key+" length:"+private_key.length+" typeof:"+(typeof private_key))
 
     var sigObj = secp256k1.ecdsaSign(Buffer.from(msg,"hex"),private_key)//sign
     //return sigObj.signature;
     return bs58Encode(sigObj.signature);
 }
 
 /**
  * 验证签名
  * @type {verifySignMsg}
  */
function verifySignMsg(msg, signature, pubKey)
 {
     pubKey = bs58Decode(pubKey);
     signature = bs58Decode(signature)
     return secp256k1.ecdsaVerify( signature,Buffer.from(msg,'hex'), pubKey);//verify
 }
 
 /**
  * 判断keys是否ok正确
  * @type {invalidateKeys}
  */
function invalidateKeys(privateKey,publicKey)
 {
     if(privateKey && publicKey ) {
         let pub_key ="";
         try {
             pub_key = getPublicKey(privateKey);
         }catch(err){
             console.log("invalidateKeys-error:"+err);
             return false;
         }
 
         if (pub_key.length <= 0 || ("" + pub_key) != publicKey)
             return false;
         else
             return true;
     }
     else{
         return false;
     }
 }
 
 /**
  * 检测签名和hash是否符合格式要求
  * @type {validateHashORSign}
  */
function validateHashORSign(hashOrSign)
 {
     if(hashOrSign && (""+hashOrSign).length>0)
     {
         let regExp = new RegExp("^[a-zA-Z0-9]+[a-zA-Z0-9]{8,256}$")
         //sub_token = sub_token.substring(0,3);
 
         //console.log("sub_token:"+sub_token)
 
         return regExp.test(""+hashOrSign);
     }
     return false;
 }
 
 
 function test_keys(){
 
     private_key = newPrivateKey();
     console.log("private_key:"+private_key+" length:"+private_key.length+" typeof="+(typeof private_key))
 
     pub_key = getPublicKey(private_key);
     console.log("pub_key:"+pub_key+" length:"+pub_key.length+" typeof="+(typeof pub_key))
     console.log("invalidateKeys:"+invalidateKeys(private_key,pub_key))
     console.log("invalidateKeys:"+invalidateKeys("",""))
     try{
         console.log("invalidateKeys:"+invalidateKeys("1","2"))
     }catch(err){
         console.log("invalidateKeys-err:"+err);
     }
 
     var msg_text = "hello妹子你好啊，这是非常不错的字符啊"
     var msg_hash = hashVal(msg_text);
     /*
     var msg_hash0 = hashVal(msg_text,"md5");
     console.log("msg_test:"+msg_text+"\nmsg_text.length:"+msg_text.length);
     console.log("msg_hash:"+msg_hash+" length:"+msg_hash.length)
     console.log("msg_hash0:"+msg_hash0+" length:"+msg_hash0.length)
 
     msg_hash_bs58 = bs58Encode(Buffer.from(msg_hash));
     msg_hash_str = bs58Decode(msg_hash_bs58);
     console.log("msg_hash_bs58:"+msg_hash_bs58+" length="+msg_hash_bs58.length+" typeof="+(typeof msg_hash_bs58))
     console.log("msg_hash_str:"+msg_hash_str+" length="+msg_hash_str.length+" typeof="+(typeof msg_hash_str))
     */
 
     sign = signMsg(msg_hash,private_key)
     console.log("sign:"+sign+" length:"+sign.length)
 
     bverify = verifySignMsg(msg_hash,sign,pub_key);
     console.log("bverify:"+bverify+" msg_hash:"+msg_hash+" sign:"+sign+" pub_key:"+pub_key)
 
 }
 
 //test_keys();
 
 
 //test();
 
 function test() {
 // or require('secp256k1/elliptic')
 //   if you want to use pure js implementation in node
     var timestamp = Date.parse(new Date());
 // generate message to sign
     let msg = Buffer.from("wellcom to beijing--from lauo.li", "utf8")
     msg = Buffer.from("202cb962ac59075b964b07152d234b70")//32字节,二进制 binnary
     msg = Buffer.from("202cb962ac59075b964b07152d234b70" + "202cb962ac59075b964b07152d234b70", "hex")
     msg = Buffer.from("202cb962ac59075b964b07152d234b70", "binary")//32字节,二进制 binnary
 
     var text = Buffer.from("wellcom to beijing--from lauo.li北京欢迎你，哈哈，是吗，这确实不错呢，你非常可以呢？3123423哈哈，翰的不错《}{}你是来自哪里呢，非常可以啊,11", "utf8")
     var md5 = crypto.createHash('md5').update(text).digest('hex');
 
 
     console.log("data:" + msg + ",md5:" + md5 + ",text=" + text + ",code-length=" + text.byteLength);
     msg = Buffer.from(md5);
 // generate privKey
     let privKey
     do {
         privKey = msg;
         privKey = randomBytes(32) //其实是一个buffer，二进制的buffer。
         //privKey = randomBytes(32) //其实是一个buffer，二进制的buffer。
     } while (!secp256k1.privateKeyVerify(privKey))
 
 // get the public key in a compressed format
 //这里将一个hex十六进制的buffer转为字符串，又通过buffer转回来。
     var byteArray = new Buffer(privKey.toString('hex'), 'hex')
     console.log("privKey=" + privKey.toString('hex'));
 
     const pubKey = secp256k1.publicKeyCreate(byteArray)
 
 
 // sign the message
     let sigObj;
     let flag;
 
     console.log('begin:'+new Date().getTime())
 
     console.time()
     for(i=0;i<10000;i++)
     {
         let sha_hash = crypto.createHash('sha256').update(text).digest('hex');
         //console.log('sha_hash:'+sha_hash)
         // sigObj = secp256k1.sign(Buffer.from(sha_hash), privKey)
 // verify the signature
     }
     console.timeEnd()
 
 
     console.time()
 for(i=0;i<10000;i++)
     {
         sigObj =  secp256k1.ecdsaSign(msg, privKey)
 // verify the signature
     }
     console.timeEnd()
     console.log('end 0 :'+new Date().getTime())
     console.time()
     //console.log('time-end0:'+console.timeEnd())
 for(i=0;i<10000;i++)
     {
         flag =  secp256k1.ecdsaVerify(sigObj.signature,msg,  pubKey);
     //    console.log('flag:'+flag)
     }
     console.timeEnd()
 
 
 
 
     console.log("data:" + msg);
     console.log("privKey:" + privKey + "|" + byteArray + "|" + privKey.toString('hex') + ",length=" + privKey.length + " toString.length:" + privKey.toString('hex').length);
     console.log("privKey:" + privKey + "|" + byteArray + "|" + privKey.toString('base64') + ",length=" + privKey.length + " toString.length:" + privKey.toString('base64').length);
     console.log("privKey:" + privKey + "|" + byteArray + "|" + bs58.encode(privKey) + ",length=" + privKey.length + " toString.length:" + bs58.encode(privKey).length + "===" + bs58.decode(bs58.encode(privKey)));
     console.log("pubKey:" + pubKey.toString('hex') + ",length=" + pubKey.length);
     console.log("sigObj:" + sigObj.signature.toString('hex') + ",length=" + sigObj.signature.length);
     console.log("flag:" + flag);
 
 
     console.log("used-time:" + (Date.parse(new Date()) - timestamp));
 
 // => true
 
 
 //buffer的一些编码测试：
     console.log("buffer-test:");
     const buf = Buffer.from('hello world', 'ascii');
 
     console.log(buf.toString('hex'));
 // Prints: 68656c6c6f20776f726c64
     console.log(buf.toString('base64'));
 // Prints: aGVsbG8gd29ybGQ=
 
     console.log(Buffer.from('fhqwhgads', 'ascii'));
 // Prints: <Buffer 66 68 71 77 68 67 61 64 73>
     console.log(Buffer.from('fhqwhgads', 'utf16le'));
 // Prints: <Buffer 66 00 68 00 71 00 77 00 68 00 67 00
 
 
 
 privKey = newPrivateKey();
 let pubKey0 = getPublicKey(privKey)
 msg = '8c296ad1e67e42d27267a871ee39b2c292282df027262ea2065ccc9948831a2e';
 console.time()
 for(i=0;i<10000;i++)
 {
     sigObj =  signMsg(msg,privKey)//secp256k1.ecdsaSign(msg, privKey)
 // verify the signature
 }
 console.timeEnd()
 console.log('end 0 :'+new Date().getTime())
 console.time()
 //console.log('time-end0:'+console.timeEnd())
 for(i=0;i<10000;i++)
 {
     flag =  verifySignMsg(msg,sigObj,pubKey0)//secp256k1.ecdsaVerify(sigObj.signature,msg,  pubKey);
 //    console.log('flag:'+flag)
 }
 console.timeEnd()
 
 }
 
 //test()
// const key_util = 
 export default {signMsg,bs58Encode,bs58Decode,hashVal,newPrivateKey,getPublicKey,
    signMsg,verifySignMsg,invalidateKeys,validateHashORSign}