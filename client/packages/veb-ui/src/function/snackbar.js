import Vue from 'vue/dist/vue.js'
import Snackbar from '../components/Snackbar'

export default {
    run({message, buttonText = "OK", type = "color-green"}, callback = function() {}) {
        var element = Vue.extend(Snackbar)
        let self = this
        let el = new element({
            data: {
                message,
                buttonText,
                type
            },
            methods: {
                finished () {
                    self.removeContent(callback)
                }
            }
        })

        this.addQueue({ el, callback: callback });
    },
    removeContent (callback) {
        this.queue[0].el.$destroy()
        this.queue[0].el.$el.remove()
        this.active = false
        this.queue.shift()
        this.show()
        callback()
    },
    addQueue (data) {
        this.queue.push(data);
        this.show();
    },
    queue: [],
    active: false,
    show() {
        if (this.queue.length !== 0 && !this.active) {
            let area = document.createElement('div')
            area.className = 'veb-snackbar-area'
            let body = document.querySelector('body')
            body.prepend(area)
            this.active = true
            let currentEl = this.queue[0].el;
            currentEl.$mount(area)
        }
    }
}
