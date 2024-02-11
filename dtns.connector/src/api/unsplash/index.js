import api from '../index'
import urls from './url'
// import { formatUrl } from '../../common/utils'
// 这个东西是unsplash要求加在header里的验证，有兴趣的同学可以去看他的api，此处不再赘述
const header = {
    'Authorization': 'Client-ID xxxxxxx'
}

export default {
    viewPhotos (params) {
        // return出去了一个promise
        return api.get(urls.photos, params, header)
    },
    getTest(params){
        return api.get(urls.sendTest,params,"");
    },
    sendSms(params){
        return api.get(urls.sendSms,params,"");
    }
}