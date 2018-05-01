import Vue from 'vue/dist/vue.js'
import Confirmation from '../components/Confirmation'

export default {
    run(message, callbackConfirm = function() {}, callbackCancel = function() {}, title = "Confirm", confirmText = "Confirm", cancelText = "Cancel") {
        var element = Vue.extend(Confirmation)
        let self = this
        let el = new element({
            data: {
                message,
                confirmText,
                cancelText,
                title
            },
            methods: {
                confirmed () {
                    self.removeContent(callbackConfirm)
                },
                canceled () {
                    self.removeContent(callbackCancel)
                }
            }
        })

        this.addQueue({ el });
    },
    removeContent (callback) {
        setTimeout(() => {
            this.queue[0].el.$destroy()
            this.queue[0].el.$el.remove()
            this.active = false
            this.queue.shift()
            this.show()
        }, 400)
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
            area.className = 'veb-confirmation-area'
            let body = document.querySelector('body')
            body.prepend(area)
            this.active = true
            let currentEl = this.queue[0].el;
            currentEl.$mount(area)
        }
    }
}
