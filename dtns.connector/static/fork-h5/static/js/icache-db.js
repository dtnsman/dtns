class IMIndexDB{
    constructor(dbname='imdb',storeName = 'imcache')
    {
        this.dbname = dbname
        this.db = null;
        this.version = 1
        this.storeName = storeName
        this.cached = new Map()
    }
    async openDB() {
        let This = this
        // var version = version || 1;
        var request = window.indexedDB.open(this.dbname,this.version);

        await new Promise((res)=>{
            request.onerror = function (e) {
                console.log(e.currentTarget.error.message);
                res(null)
            };
            request.onsuccess = function (e) {
                This.db = e.target.result;
                res(This.db)
            };
            request.onupgradeneeded = function (e) {
                var db = e.target.result;
                if (!db.objectStoreNames.contains(This.storeName)) {
                    var store = db.createObjectStore(This.storeName, { keyPath: 'key' ,autoIncrement:false});
                    store.createIndex('key', 'key', { unique: true });
                }
                console.log('DB version changed to ' + This.version);
            };
        })
        console.log('opened-db:',This.db)
        return This.db
    }

    closeDB() {
        this.db.close();
    }

    deleteDB(name) {
        indexedDB.deleteDatabase(name);
    }

    addData( data ) {
        if(!data || !data.key) return null
        if(data && !data.data)
            return null

        var transaction = this.db.transaction(this.storeName, 'readwrite');
        var store = transaction.objectStore(this.storeName)
        store.add(data);
        this.cached.set(data.key,data)
    }

    async getDataByKey(key) {
        if(!key) return null
        if(this.cached.has(key)){
            let result = this.cached.get(key)
            //如果存储了为空的内容，直接返回null，并清理缓存。
            if(result  && !result.data) 
            {
                this.deleteDataByKey(request.key)
                return null;
            }
            else 
                return result
        } 

        let This = this
        var transaction = this.db.transaction(this.storeName, 'readwrite');
            var store = transaction.objectStore(this.storeName);
        let data = await new Promise((res)=>{
            try{
                var request = store.get(key);
                request.onsuccess = function (e) {
                    var result = e.target.result;
                    if(result  && !result.data) 
                    {
                        This.deleteDataByKey(request.key)
                        return res(null)
                    }
                    res(result)
                };
                request.onerror = function(e) {
                    console.log('[Error]ImageIndexDB-getDataByKey-onerror',e.target.error);
                  };
            }
            catch(ex){
                console.log('ImageIndexDB-getDataByKey:'+key+' exception:',ex)
            }
        })
        if(data) this.cached.set(key,data)
        return data
    }

    updateData(value) {
        var transaction = this.db.transaction(this.storeName, 'readwrite');
        var store = transaction.objectStore(this.storeName);
        store.put(value)
    }

    deleteDataByKey(key) {
        var transaction = this.db.transaction(this.storeName, 'readwrite');
        var store = transaction.objectStore(this.storeName);
        store.delete(key)
        this.cached.delete(key)
    }

    clearObjectStore() {
        var transaction = this.db.transaction(this.storeName, 'readwrite');
        var store = transaction.objectStore(this.storeName);
        store.clear();
        this.cached.clear()
    }
    clear(){
        console.log('call imDb-clear()')
        this.clearObjectStore()
    }

    deleteObjectStore() {
        var transaction = this.db.transaction(this.storeName, 'versionchange');
        db.deleteObjectStore(this.storeName);
    }

    fetchStoreByCursor() {
        var transaction = this.db.transaction(this.storeName);
        var store = transaction.objectStore(this.storeName);
        var request = store.openCursor();
        request.onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                console.log('key:'+cursor.key);
                var value = cursor.value;
                console.log(JSON.stringify('value:',value));
                cursor.continue();
            }
        };
    }
    async getAllDatas() {
        var transaction = this.db.transaction(this.storeName);
        var store = transaction.objectStore(this.storeName);
        var index = store.index("key");
        var request = index.openCursor(null, IDBCursor.prev);
        let results = []
        await new Promise((res)=>{
            request.onsuccess = function (e) {
                var cursor = e.target.result;
                if (cursor) {
                    results.push(cursor.value)
                    cursor.continue();
                }else{
                    res(results)
                }
            }
        })
        return results
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

