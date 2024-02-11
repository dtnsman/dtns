//加载vue插件
import router from '../router'
import xplugins from "./index.json" 
function loadXPageNow(url){ // 路由懒加载
  return (resolve) =>  require([`${url}`], resolve)
}
function loadXComponentNow(url){ // 路由懒加载
  return (resolve) =>  resolve(window.Vue.component(url))
}

//如name一样，则替换，否则更新
const userPlugins = []
function addRoute(plugin)
{
  let flag = false
  for(let i=0;i<userPlugins.length;i++)
  {
    if(plugin.name == userPlugins[i].name)
    {
      userPlugins[i] = plugin
      flag = true
    }
  }
  if(flag)
  {
    resetRouter(router)
    loadXPlugins(userPlugins)
    console.log('replace-plugin:',plugin)
  }else{
    userPlugins.push(plugin)
    router.addRoute(plugin)
    console.log('add-plugin:',plugin)
  }
}
//加载插件
const existsFilePlugins = new Map()
window.g_existsFilePlugins = existsFilePlugins
window.loadXPlugins = loadXPlugins
async function loadXPlugins(plugins,file_url = null)
{
  if(file_url && existsFilePlugins.has(file_url))
  {
    plugins = existsFilePlugins.get(file_url)
    for(let i=0;i<plugins.length;i++)
    {
      addRoute(plugins[i])
    }
    return true
  }

  console.log('loadPlugins:',plugins)
  while(!window['k-form-design']){
    console.log('k-form-design:',window['k-form-design'])
    await new Promise(resolve => setTimeout(resolve, 150))
  } 
  console.log('into loadPlugins now !',window.Vue.component('KFormDesign'))
  while(!window.Vue.component('KFormDesign')){
    console.log('k-form-design2:',window.Vue.component('KFormDesign'))
    await new Promise(resolve => setTimeout(resolve, 150))
  } 
  console.log('k-form-design2:',window.Vue.component('KFormDesign'))
  let tmpPlugins = []
  if(!plugins || plugins.length<=0) return false
  for(let i=0;i<plugins.length;i++)
  {
    // if(plugins[i].type!='vue') continue
    let tmpPlugin = Object.assign({},plugins[i])
    tmpPlugin.component = plugins[i].type=='vue' ?  loadXPageNow(tmpPlugin.url) : window.Vue.component(tmpPlugin.url) //loadXComponentNow(tmpPlugin.url)  //window.Vue.component(tmpPlugin.url)//window[tmpPlugin.url] 
    tmpPlugins.push(tmpPlugin)
    if(typeof g_ib3_words=='undefined'){
        window.g_ib3_words = new Map()
    }
    if(tmpPlugin.word)
    {
        g_ib3_words.set(tmpPlugin.word,tmpPlugin.wordPath ? tmpPlugin.wordPath:tmpPlugin.path)
    }
    if(file_url) addRoute(tmpPlugin) //替换的方案 2023-1-5 fix the bug 
    else router.addRoute(tmpPlugin) //如果不是普通的用户插件，须使用router.addRoute函数
  }

  if(file_url) existsFilePlugins.set(file_url,tmpPlugins)
  // router.addRoutes(tmpPlugins)
  return true
}
loadXPlugins(xplugins)
//end the load xplugins

// 传入当前router
import Router from 'vue-router'
window.resetRouter = resetRouter
function resetRouter(router) {
  // 用初始化的matcher替换当前router的matcher
  router.matcher =  new Router(g_routers).matcher 
  //加载插件（系统）
  loadXPlugins(xplugins)
}

export default {}