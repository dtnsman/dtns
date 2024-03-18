/**
 * 用于统一导入全局的插件（支持node.js和browser 2种环境）
 */

window.loadPluginsObj = function(pluginsObj,app)
{
    if(!pluginsObj) return false
    if(typeof Buffer!= 'undefined'){//node.js环境
        //node.js直接导入
        require(pluginsObj.url_nodejs)
        if(pluginsObj.index && window[pluginsObj.index] && typeof window[pluginsObj.index].routers=='function')
        {
            window[pluginsObj.index].routers(app)
        }
    }else{
        //创建script-element元素导入
        // (function() {
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.onload = function(){
                console.log('loaded-pluginsObj:',pluginsObj,typeof window[pluginsObj.index])
                if(pluginsObj.index && window[pluginsObj.index] && typeof window[pluginsObj.index].routers=='function')
                {
                    window[pluginsObj.index].routers(app)
                }
            }
            script.src = pluginsObj.url
            document.body.appendChild(script);
        // })()
    }
}

/**
 * 导入全局的plugins
 */
window.loadPlugins = function(app)
{
    if(window.plugins && window.plugins.length>0)
    {
        for(let i=0;i<plugins.length;i++)
        {
            console.log('load-plugins-i:'+i,plugins[i])
            loadPluginsObj(plugins[i],app)
        }
    }
}

