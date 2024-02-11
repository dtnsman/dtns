// 编辑器自定义事件
const events = {
    redirect(url) {
        if (url) {
            window.location.href = url
        }
    },

    alert(msg) {
        if (msg) {
            // eslint-disable-next-line no-alert
            alert(msg)
        }
    },
    code(c) {
        if (c) {
            // alert(c)
            console.log('event-code-this:' + this)
            console.log('event-code-this:' + Object.keys(this))
            console.log('event-code-this:' + JSON.stringify(this._props))
            // console.log('even-component-url:' + this._props.propValue.url)
            // eslint-disable-next-line
            eval(c)
        }
    },
}

const mixins = {
    methods: events,
}

const eventList = [
    {
        key: 'redirect',
        label: '跳转事件',
        event: events.redirect,
        param: '',
    },
    {
        key: 'alert',
        label: 'alert 事件',
        event: events.alert,
        param: '',
    },
    {
        key: 'code',
        label: '代码 事件',
        event: events.code,
        param: '',
    },
]

export {
    mixins,
    events,
    eventList,
}