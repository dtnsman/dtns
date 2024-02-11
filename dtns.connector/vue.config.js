module.exports = {
    //以下两项配置之后，需要使用Node.js作为服务器直接浏览器打开index.html即可（方便hbuilder打包）2022-12-16新增
    assetsDir:'static',
    // publicPath:'./',
    // 打包APP参考文章
    // https://www.cnblogs.com/taohuaya/p/10263519.html
    publicPath: process.env.NODE_ENV === "production" ? "" : "/",
    devServer:{
        // port:9527,
        open:true,
        //proxy:"http://127.0.0.1:8088",
        proxy: {
            '/api': {
                target:'http://182.61.13.123:9000',
                // target:'http://192.168.101.127:9000',
                // target: 'htttp://106.12.119.162:50001',
                // target: 'http://localhost:9000',

                // target: 'http://192.168.101.171:9000',// http://106.12.119.162:8008
                ws: true,
                changeOrigin : true,
                // secure: false,  // 如果是https接口，需要配置这个参数
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }

}
