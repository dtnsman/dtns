import axios from 'axios'
import url from '../../src/api/network/url'
let uploadImg = async (file)=> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let random = Math.random();
    let img_kind = file;
    // console.log(img_kind);
    let formData = new FormData();
    formData.append("user_id",userInfo.user_id);
    formData.append("s_id", userInfo.s_id);
    formData.append("random", random);
    formData.append("img_kind", "open");
    formData.append("file", img_kind);
    let config = {
        headers: {
        enctype: "multipart/form-data"
        }
    };
    let res = await axios.post(`${url.baseUrl}/image/upload`, formData, config)
    console.log(res)
    let img_p = "min500";//头像
    let txurl = `${url.baseUrl}/image/view?user_id=`+userInfo.user_id+'&s_id='+userInfo.s_id+'&filename='+res.data.filename+'&img_kind='+'open'+'&img_p='+img_p;
    return {
        filename: res.data.filename,
        url: txurl
    }
}

export default  {
    uploadImg
}