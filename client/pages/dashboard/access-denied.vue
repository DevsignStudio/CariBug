<template>
    <div style="height: 100%">
        <veb-page-container style="overflow-x: hidden;height: 100%">
            <div class="row center-xs middle-xs">
                <div class="col-xs-fluid-24 col-md-5">
                    <img src="~/assets/img/denied.svg" style="width: 100%; margin-bottom: 50px;" alt="">
                    <div class="font-center font-display3 color-grey-700">Oops!</div>
                    <div class="font-center font-title font-light color-grey-700">The page you try to access is inaccessible</div>
                    <div class="button-center-container" style="margin-top: 20px;">
                        <veb-button @click="$router.push('/dashboard')" class="primary" button-style="raised" v-ripple>Back To Home</veb-button>
                    </div>
                </div>
            </div>
        </veb-page-container>
    </div>
</template>

<script>
export default {
    layout: 'dashboardLayout',
    data () {
        return {
            pageTitle: 'Access Denied',
        }
    },
    head () {
        return {
            title: this.pageTitle
        }
    },
}
</script>

<style scoped>
    .no-hover:hover {
        background: none;
    }
</style>


