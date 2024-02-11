// function get_xbody_canvas()
// {
//     // return get_xbody_canvas_editor()
//     let els = document.getElementsByClassName('excalidraw__canvas')
//     console.log('excalidraw__canvas-els:',els)
//     if(!els ||els.length<=0){
//         console.log('excalidraw__canvas-els is empty')
//         return {canvas:null,base64:null}
//     }
//     let base64 = els[0].toDataURL('image/webp',0.9)
//     console.log('excalidraw__canvas-els-base64:',base64)

//     //合并了这两个canvas，才能更好的录制视频
//     let newCanvas = document.createElement("canvas");
//     newCanvas.width = els[0].width;
//     newCanvas.height = els[0].height;
//     let context = newCanvas.getContext("2d");
//     //这里很关键
//     window.g_timer_id =  setInterval(()=>{
//         //加了这个会闪烁
//         if(newCanvas.width!=els[0].width || newCanvas.height!=els[0].height)//加了判断，就不会闪烁那么厉害（只有变化宽度或高度时才会闪烁）
//         {
//         newCanvas.width = els[0].width;
//         newCanvas.height = els[0].height;
//         }
//         context.drawImage(els[1], 0, 0);
//         context.drawImage(els[0], 0, 0);
//     },0)
//     return {canvas:newCanvas,base64}
// }

function get_xbody_canvas_editor(xbody = null)
{
    if(xbody) return {canvas:xbody}
    let newCanvas = document.createElement("canvas");
    let context = newCanvas.getContext("2d");
    let scale = 2 , base64 = null
    newCanvas.width = window.innerWidth*scale
    newCanvas.height = window.innerHeight*scale

    window.g_timer_id =  setInterval(()=>{
        //加了这个会闪烁
        if(newCanvas.width!=window.innerWidth*scale || newCanvas.height!=window.innerHeight*scale)//加了判断，就不会闪烁那么厉害（只有变化宽度或高度时才会闪烁）
        {
        newCanvas.width = window.innerWidth*scale;
        newCanvas.height = window.innerHeight*scale;
        }

        console.log('newCanvas-w:',newCanvas.width,newCanvas.height)

        html2canvas(xbody ? xbody :document.body,{ scale,allowTaint :false,useCORS: true}).then(function(canvas) {
            // document.body.appendChild(canvas);
            context.drawImage(canvas, 0, 0);
            if(!base64)
            {
                // base64 = newCanvas.toDataURL('image/webp',0.9)
                // window.g_xbody_base64 = base64
            }
        });
    },0)
    window.g_xbody_base64 = null
    return {canvas:newCanvas,base64:null}
}


window.g_xbody_start_record = function(xbody= null , editoFlag = true)
{
    let {canvas,base64} = get_xbody_canvas_editor(xbody)// editoFlag ? get_xbody_canvas_editor() : get_xbody_canvas() 
    if(!canvas) return false
    console.log('g_xbody_start_record-canvas:',canvas,base64)
    var context = canvas.getContext('2d');
    // context.fillStyle = 'rgba(255,255,255,1)';//设置为白色背景

    let allChunks=[];
    let stream=canvas.captureStream(24); // 60 FPS recording
    let recorder=new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9,opus',
    });
    window.g_xbody_recorder = recorder
    window.g_xbody_recorder_chunks = allChunks
    // canvas 录制回调
    let last_data_time = Date.now()
    let last_buff = null
    window.g_xbody_recorder_start_time = Date.now()
    recorder.ondataavailable=async e=>{
        console.log('e.data-len:',e.data.size,e.data)
        let new_time = Date.now()
        console.log('last_data_time-sub:',new_time - last_data_time)
        last_data_time = new_time
        allChunks.push(e.data);
    }
    recorder.start(10);
    return base64
}
window.g_xbody_stop_record =async function()
{
    if(typeof g_xbody_recorder=='undefined' || !window.g_xbody_recorder){
        console.log('xbody-recorder is null')
        return null
    }
    g_xbody_recorder.stop(0)
    let duration = Date.now() - g_xbody_recorder_start_time
    let videoBlob = new Blob(g_xbody_recorder_chunks, { 'type' : 'video/webm' })

    //https://blog.csdn.net/qq_36958916/article/details/108529705
    videoBlob = await new Promise((res)=>{
        ysFixWebmDuration(videoBlob, duration, function (fixedBlob) {
            console.log('fixedBlob:',fixedBlob)
            res(fixedBlob)
        });
    })

    var myUrl = URL.createObjectURL(videoBlob)
    downloadFile(myUrl,'3deditor-record-'+Date.now()+'.webm')
    window.g_xbody_recorder_chunks = null
    clearInterval(window.g_timer_id)
    return videoBlob
}
function downloadFile(url,name='默认文件名')
{
    var a = document.createElement("a")//创建a标签触发点击下载
    a.setAttribute("href",url)//附上
    a.setAttribute("download",name)
    a.setAttribute("target","_blank")
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);
    a.dispatchEvent(clickEvent);
}