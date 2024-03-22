const file_util = require("./file_util");
const config = {file_temp:__dirname+'/../file_temp/'}//require('../config').config;
class IFileIndexDB{
    constructor(dbname='ifiledb',storeName = 'ifilecache')
    {
        this.dbname = dbname
        this.db = {};//null
        this.version = 1
        this.storeName = storeName
        // this.cached = new Map()
    }
    async openDB() {
    }

    closeDB() {
    }

    deleteDB(name) {
    }

    async addData( data ) {
        if(!data || !data.key) return null
        if(data && !data.data)
            return null

        let origin_path = config.file_temp+data.key
        try{
            let flag = await file_util.writeFile(origin_path,Buffer.from(data.data)) 
            return flag
        }catch(ex){
            console.log('ifileDb.addData-exception-ex:'+ex,ex)
            return false
        }
        // this.cached.set(data.key,data)
    }

    async getDataByKey(key) {
        if(!key) return null

        let existFlag = await file_util.existsFile(config.file_temp+key)
        if(!existFlag) return null

        let data = await file_util.readFile(config.file_temp+key)
        if(!data) return null
        return {key:key,data:data}
    }

    async updateData(value) {
        // var transaction = this.db.transaction(this.storeName, 'readwrite');
        // var store = transaction.objectStore(this.storeName);
        // store.put(value)
        let origin_path = config.file_temp+data.key
        let flag = await file_util.writeFile(origin_path,Buffer.from(fileInfo.path)) 
        return flag
    }

    deleteDataByKey(key) {
        file_util.deleteFile(config.file_temp+key)
        // var transaction = this.db.transaction(this.storeName, 'readwrite');
        // var store = transaction.objectStore(this.storeName);
        // store.delete(key)
        // this.cached.delete(key)
    }

    clearObjectStore() {
    }
    clear(){
    }

    deleteObjectStore() {
    }

    fetchStoreByCursor() {
    }
    async getAllDatas() {
    }
}
async function test()
{
    var db = new ImageIndexDB()
    let instance = await db.openDB()
    console.log('opendb:',instance)
    // db.addData({key:'img0',data:'base000001'})
    // db.addData({key:'img1',data:'base000002'})
    // db.addData({key:'img2',data:'base000003'})
    // db.addData({key:'img3',data:'base000004'})
    let data = await db.getDataByKey('img3')
    console.log('data:'+JSON.stringify(data))
    let list = await db.getAllDatas()
    console.log('list:',list)
    //db.closeDB()
}

// test()

window.IFileIndexDB = IFileIndexDB
