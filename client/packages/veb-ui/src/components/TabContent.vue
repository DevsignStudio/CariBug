<template>
    <div class="main-container">
        <div class="swipe-tabs-container" ref="tabContainer">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'

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
            $swipeTabsContainer.slick({
                slidesToShow: self.size,
                slidesToScroll: 1,
                arrows: false,
                infinite: false,
                swipeToSlide: true,
                touchThreshold: 10
            })
            $swipeTabsContentContainer.slick({
                asNavFor: $swipeTabsContainer,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                infinite: false,
                swipeToSlide: true,
                swipe: self.swipe,
                draggable: false,
                edgeFriction: 0,
                speed: 200,
                touchThreshold: 10
            })
            $swipeTabs.on('click', function (event) {
                // gets index of clicked tab
                currentIndex = $(this).parent().parent().data('slick-index')
                $swipeTabs.removeClass(activeTabClassName)
                $swipeTabsContainer.find('[data-slick-index=' + currentIndex + ']').children().children().addClass(activeTabClassName)
                $swipeTabsContainer.slick('slickGoTo', (currentIndex - 1))
                $swipeTabsContentContainer.slick('slickGoTo', currentIndex)
            })
            // initializes slick navigation tabs swipe handler
            $swipeTabsContentContainer.on('swipe', function (event, slick, direction) {
                currentIndex = $(this).slick('slickCurrentSlide')
                $swipeTabs.removeClass(activeTabClassName)
                $swipeTabsContainer.find('[data-slick-index=' + currentIndex + ']').children().children().addClass(activeTabClassName)
                $swipeTabsContainer.slick('slickGoTo', (currentIndex - 1))
            // console.log(currentIndex - 1);
            })
            $swipeTabsContentContainer.on('afterChange', function (slick, currentSlide) {
                self.$emit('slideChange', currentSlide.currentSlide)
                self.$children[currentSlide.currentSlide].$children[0].scrollTop()
            // self.lastSlide = (currentSlide.slideCount -1) === currentSlide.currentSlide;
            })
        })
    }
}
</script>

<style>
    .slick-slide > * {
        height: 100%;
    }
</style>
