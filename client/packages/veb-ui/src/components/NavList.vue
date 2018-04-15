<template>
    <div class="veb-navigation-item unselectable">
        <div class="nav-list" v-ripple="{background: '#d1d1d1'}">
            <slot></slot>
            <div class="chevron open" v-if="sublist=== true">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            </div>
        </div>
        <div v-if="sublist=== true" class="nav-sublist">
            <slot name="sublist"></slot>
        </div>
    </div>
</template>

<script>
import ripple from '../directives/v-ripple'
import Helper from '../helper.js'

export default {
    props: {
        sublist: {
            type: Boolean,
            default: false
        },
        to: {
            default: '7w483jk5h35735j35j35838583535j3h5jh3583985935jn35hdf8g9fd8g3j5'
        }
    },
    directives: {
        ripple
    },
    computed: {
        tag () {
            if (this.sublist || this.to === '7w483jk5h35735j35j35838583535j3h5jh3583985935jn35hdf8g9fd8g3j5') {
                return 'div'
            }
            return 'a'
        }
    },
    mounted () {
        this.$nextTick(() => {
            const el = this.$el
            const navList = Helper.children(el, 'nav-list')
            let sublistHeight = null
            //  const linkSublist = el.parentNode
            if (this.sublist === true) {
                const chevron = Helper.children(navList, 'chevron')
                const navSublist = Helper.children(el, 'nav-sublist')

                Helper.addClass(chevron, 'open')

                const hasActive = Helper.children(navSublist.children[0], 'router-link-active')
                if (hasActive) {
                    navSublist.style.maxHeight = '100%'
                    Helper.addClass(navSublist, 'open')
                    Helper.removeClass(chevron, 'open')
                }

                navList.addEventListener('mouseup', (e) => {
                    sublistHeight = navSublist.scrollHeight
                    if (Helper.hasClass(navSublist, 'open')) {
                        navSublist.style.maxHeight = '0px'
                    } else {
                        navSublist.style.maxHeight = sublistHeight + 'px'
                    }
                    Helper.toggleClass(navSublist, 'open')
                    Helper.toggleClass(chevron, 'open')
                })

                var observeDOM = (function () {
                    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
                    const eventListenerSupported = window.addEventListener

                    return function (obj, callback) {
                        if (MutationObserver) {
                            // define a new observer
                            var obs = new MutationObserver(function (mutations, observer) {
                                if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
                                    callback()
                                }
                            })
                            // have the observer observe foo for changes in children
                            obs.observe(obj, { childList: true, subtree: true })
                        } else if (eventListenerSupported) {
                            obj.addEventListener('DOMNodeInserted', callback, false)
                            obj.addEventListener('DOMNodeRemoved', callback, false)
                        }
                    }
                })()

                // Observe a specific DOM element:
                observeDOM(navSublist, function () {
                    if (Helper.hasClass(navSublist, 'open')) {
                        sublistHeight = navSublist.scrollHeight
                        navSublist.style.maxHeight = sublistHeight + 'px'
                    }
                })
            } else {
                el.addEventListener('mouseup', (e) => {
                    const reveal = Helper.getParentFromClass(this, 'reveal')
                    if (reveal) {
                        reveal.disable()
                    }
                    this.$emit('click')
                })
            }
            // let $elIndex = parseInt($el.index())
            // $el.css('z-index', 100 - $elIndex)
            // if (this.sublist === true) {
            //     $navList.addClass('sublist')
            //     let $navSublist = $el.find('.nav-sublist')
            //     let $chevron = $navList.children('.chevron')
            //     let sublistHeight = $navSublist.outerHeight()
            //     $navSublist.velocity({marginTop: [ '-' + sublistHeight + 'px', [0.0, 0.0, 0.2, 1], '0']}, { duration: 200 })
            //     $chevron.velocity({rotateZ: ['90deg', [0.0, 0.0, 0.2, 1], '0deg']}, { duration: 200 })
            //     let hasActive = $navSublist.find('.router-link-active').length > 0

            //     if (hasActive) {
            //         $chevron.velocity('reverse')
            //         $navSublist.velocity('reverse')
            //     }
            //     $navList.on('click', (e) => {
            //         e.preventDefault()
            //     })
            //     $navList.on('mouseup', (e) => {
            //         e.preventDefault()
            //         $chevron.velocity('reverse')
            //         $navSublist.velocity('reverse')
            //     })
            // } else {
            //     $el.on('click', (e) => {
            //         $el.parents('.veb-navigation').removeClass('open')
            //         self.$emit('click')
            //     })
            // }
        })
    }
}
</script>
