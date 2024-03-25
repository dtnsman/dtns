/**
 * 2019.1.28
 * 将java版本改为node.js版本的文件。
 * @type {*|exports}
 */
// const config = require('./config').config;

//const x6gs_config = require('../dtns.coin/root/root_config')
//console.log("x6gs_config:"+JSON.stringify(x6gs_config));
//
//var arguments = process.argv.splice(2);
//console.log('所传递的参数是：', arguments);


const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

// const bodyParser = require('body-parser');
// const routes = require('./routes');
// app.use(bodyParser.urlencoded({ extended: false }));
//require('./libs/prototype_add');

// app.use(express.static('public'))
app.use(express.static('./'))
app.use('/chat',express.static('dist'))
// app.use(express.static('www'))


// 路由
// routes(app);
let port = 3333
let host = '127.0.0.1'
app.listen(port, () => {
    console.log("You can debug your app with http://" +host+ ':'+port );
});
// global.error_log = ErrorLog;

//错误处理
process.on('uncaughtException', function(err) {
    console.log(err);
    console.log(err.stack);
    // ErrorLog.write(err);
    // ErrorLog.write(err.stack);
})

process.on('unhandledRejection', (reason, p) => {
    p.catch((err) => {
        console.log(err);
        console.log(err.stack);
        // ErrorLog.write(err.stack); //本地错误日志
    })
});
