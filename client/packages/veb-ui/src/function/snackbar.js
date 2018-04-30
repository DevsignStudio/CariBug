import $ from 'jquery'
import Vue from 'vue/dist/vue.js'
import Snackbar from '../components/Snackbar'

export default {
    run(message, callback = function() {}, buttonText = "OK", type = "color-green") {
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
            let area = $('<div class="veb-snackbar-area"></div>')
            $("body").prepend(area);
            this.active = true
            let currentEl = this.queue[0].el;
            currentEl.$mount(area[0])
        }
    }
}
