const obj = {a:111,b:'ccccc',fun:'you have fun ',d:{a:'test',b:{key:'name',value:'your name'}}}
console.log('globalThis:'+Object.keys(globalThis))
console.log('globalThis.global-keys:'+Object.keys(globalThis.global))

console.log('String.keys:'+Object.keys(globalThis['String'])+' String:'+globalThis['String'])
let a = new String('')
console.log('a-keys:'+Object.keys(a))

let $ = 1333;
let $pop={yes:'haha'}
console.log('$:'+$)
console.log('$p:'+JSON.stringify($pop))

let 中文 = {英文:1}
中文['英文']=200
console.log('￥:'+中文+' 英文：'+中文.英文)

//hardcode the global-variable
console.log('window:'+(typeof window))
if(typeof window != 'undefined'){
    window.global=window
}
else {
    global.window = global; 
    global.alert = console.log;
}
let keys = global["Object"]['keys'](obj)
global.i = global["parseInt"]('0x10')

window['eval']('i++;global.i = i;alert(global.i)')
console.log('obj-keys:'+global["JSON"]["stringify"](keys)+' value:'+JSON['stringify'](obj)+' i:'+i)
// -------------------

if(typeof window != 'undefined'){
    window.global=window
    window.pop = window;
}
else {
    global.window = global; 
    global.alert = console.log;
    global.pop = global;
}

keys = pop["Object"]['keys'](obj)
pop.i = pop["parseInt"]('0x10')

pop['eval']('i++;global.i = i;alert(global.i)')
console.log('obj-keys:'+pop["JSON"]["stringify"](keys)+' value:'+JSON['stringify'](obj)+' i:'+i)

console.log('fetch:'+globalThis['process'])