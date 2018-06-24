<template>
    <div class="main-container">
        <div class="swipe-tabs-container" ref="tabContainer">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import { setTimeout } from 'timers';

export default {
    props: {
        element: String,
        size: {
            default: 3,
            type: Number
        },
        swipe: {
            default: true,
            type: Boolean
        }
    },
    mounted () {
        var self = this
        self.$nextTick(() => {
            setTimeout(() => {
                require('slick-carousel')
                require('slick-carousel/slick/slick.css')
                const $swipeTabsContainer = $(self.element).find('.swipe-tabs')
                const $swipeTabs = $swipeTabsContainer.find('.swipe-tab')
                const $swipeTabsContentContainer = $(self.$el).find('.swipe-tabs-container')
                let currentIndex = 0
                const activeTabClassName = 'active-tab'

                $swipeTabsContainer.on('init', function (event, slick) {
                    $swipeTabsContentContainer.removeClass('invisible')
                    $swipeTabsContainer.removeClass('invisible')
                    currentIndex = slick.getCurrent()
                    $swipeTabs.removeClass(activeTabClassName)
                    $(this).find('[data-slick-index=' + currentIndex + ']').children().children().addClass(activeTabClassName)
                })
                $swipeTabsContentContainer.on('init', function (event, slick) {
                    $swipeTabsContainer.slick({
                        slidesToShow: self.size,
                        slidesToScroll: 1,
                        arrows: false,
                        swipe: false,
                        infinite: false,
                        swipeToSlide: true,
                        touchThreshold: 10,
                        variableWidth: true,
                        asNavFor: $swipeTabsContentContainer,
                    })
                })

                $swipeTabsContentContainer.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    infinite: false,
                    swipeToSlide: true,
                    swipe: self.swipe,
                    draggable: false,
                    edgeFriction: 0,
                    speed: 200,
                    touchThreshold: 10,
                    
                })

                $swipeTabs.on('click', function (event) {
                    let containerWidth = $swipeTabsContainer.width()
                    let threshold = 0;
                    let totalWidth = 0
                    $swipeTabs.each(function(item) {
                        totalWidth += $(this).outerWidth()
                        if (totalWidth <= containerWidth) {
                            threshold = item;
                        }
                    })

                    let beforeIndex = currentIndex
                    currentIndex = $(this).parent().parent().data('slick-index')
                    $swipeTabs.removeClass(activeTabClassName)
                    $swipeTabsContainer.find('[data-slick-index=' + currentIndex + ']').children().children().addClass(activeTabClassName)
                    $swipeTabsContentContainer.slick('slickGoTo', currentIndex)
                    if (containerWidth > totalWidth) {
                        $swipeTabsContainer.slick('slickGoTo', 0)
                    } else if(currentIndex > threshold){
                        $swipeTabsContainer.slick('slickGoTo', threshold -1)
                    } else {
                        if (beforeIndex < currentIndex) {
                            $swipeTabsContainer.slick('slickGoTo', (currentIndex - 1))
                        } else {
                            $swipeTabsContainer.slick('slickGoTo', (currentIndex - 2))
                        }
                    }
                })
                // initializes slick navigation tabs swipe handler
                $swipeTabsContentContainer.on('swipe', function (event, slick, direction) {
                    let containerWidth = $swipeTabsContainer.width()
                    let totalWidth = 0
                    $swipeTabs.each(function() {
                        totalWidth += $(this).outerWidth()
                    })
                    currentIndex = slick.getCurrent()
                    $swipeTabs.removeClass(activeTabClassName)
                    $swipeTabsContainer.find('[data-slick-index=' + currentIndex + ']').children().children().addClass(activeTabClassName)

                    if (containerWidth > totalWidth) {
                        $swipeTabsContainer.slick('slickGoTo', 0)
                    } else {
                        $swipeTabsContainer.slick('slickGoTo', (currentIndex - 1))
                    }
                })
                $swipeTabsContentContainer.on('afterChange', function (slick, currentSlide) {
                    self.$emit('slideChange', currentSlide.currentSlide)
                    self.$children[currentSlide.currentSlide].$children[0].scrollTop()
                // self.lastSlide = (currentSlide.slideCount -1) === currentSlide.currentSlide;
                })
            }, 500)
            
        })
    }
}
</script>

<style>
    .slick-slide > * {
        height: 100%;
    }
</style>
