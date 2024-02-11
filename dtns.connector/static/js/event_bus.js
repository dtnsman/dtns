/**
 * 基于DNALinkEngine中的EventEmitter的重命名
 */
class PopEventBus{
    constructor(){
        this.eventMap = new Map()
    }
    on(channelName,func){
        // console.log('EventEmitter.on----channelName:'+channelName+' typeof-func:'+(typeof func))
        if(!channelName) return false
        if(typeof func!='function')
            return false
        let list = this.eventMap.has(channelName) ?  this.eventMap.get(channelName):[]
        list.push(func)
        this.eventMap.set(channelName,list)
        return true
    }
    removeListener(channelName,func)
    {
        if(!channelName) return false
        if(typeof func!='function')
            return false
        let list = this.eventMap.has(channelName) ?  this.eventMap.get(channelName):[]
        let newList = []
        let flag = false;
        for(let i=0;i<list.length;i++){
            if(list[i] != func) newList.push(list[i])
            else flag = true;
        }
        this.eventMap.set(channelName,newList)
        return flag
    }
    listenerCount(channelName){
        if(!this.eventMap.has(channelName)) return -1
        let list = this.eventMap.get(channelName)
        return list.length
    }
    removeAllListeners(channelName){
        return this.eventMap.delete(channelName)
    }
    //emit函数使用形参x0-x5避免了...etc，当etc.len=1时，且etc[0]为数组时导致错误。
    emit(channelName,x0,x1,x2=null,x3=null,x4=null,x5=null){
        if(!this.eventMap.has(channelName))  return 0;
        let list = this.eventMap.get(channelName)
        for(let i=0;i<list.length;i++){
            let func = list[i]
            func(x0,x1,x2,x3,x4,x5)
        }
        return list.length
    }
}
window.PopEventBus = PopEventBus