/**
 * system-cmd的插件代码
 */
window.systemcmd_c = {}
// const systemcmd_c_token_name = OBJ_TOKEN_NAME
// const systemcmd_c_api_base   = OBJ_API_BASE
// const systemcmd_c_token_root = OBJ_TOKEN_ROOT

systemcmd_c.routers = function(app)
{
    if(!app) return 
    if(!app.setChatC) return 
    const urlParser = null
    //app.all('/systemcmd/reboot',urlParser,console_filter,systemcmd_c.reboot)
    //app.all('/systemcmd/shutdown',urlParser,console_filter,systemcmd_c.shutdown)
    app.all('/systemcmd/killapp',urlParser,console_filter,systemcmd_c.killapp)
}
systemcmd_c.killapp = killapp
async function killapp(req,res)
{
    console.log('system-cmd-api call killapp now: success')
    res.json({ret:true,msg:'success'})
    process.exit(1)
}
/**
 * 重启（windows）
 */
systemcmd_c.reboot = reboot
async function reboot(req,res)
{
    console.log('system-cmd-api call reboot now:')
    const { exec } = require('child_process');
    let command = exec('shutdown -r -t 0', function(err, stdout, stderr) {
        if(err || stderr) {
            console.log("reboot failed" + err + stderr);
            return res.json({ret:false,msg:'reboot failed'})
        }
        res.json({ret:false,msg:'success'})
    });
    command.stdin.end();
    command.on('close', function(code) {
        console.log("reboot close -- code:",  code);
    });
}
//关机（windows）
systemcmd_c.shutdown = shutdown
async function shutdown(req,res)
{
    console.log('system-cmd-api call shutdown now:')
    const { exec } = require('child_process');
    let command = exec('shutdown -s -t 00', function(err, stdout, stderr) {
        if(err || stderr) {
            console.log("shutdown failed" + err + stderr);
            return res.json({ret:false,msg:'shutdown failed'})
        }
        res.json({ret:false,msg:'success'})
    });
    command.stdin.end();
    command.on('close', function(code) {
        console.log("shutdown close -- code:",  code);
    });
}
