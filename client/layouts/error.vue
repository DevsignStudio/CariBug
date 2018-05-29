<template>
    <!-- <section class="container">
        <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
        <h1 class="title">
            {{ error.statusCode }}
        </h1>
        <h2 class="info">
            {{ error.message }}
        </h2>
        <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
            Homepage
        </nuxt-link>
    </section> -->
    <div style="height: 100%">
        <veb-page-container style="overflow-x: hidden;height: 100%">
            <div class="row center-xs middle-xs">
                <div class="col-xs-fluid-24 col-md-5">
                    <img src="~/assets/img/denied.svg" style="width: 100%; margin-bottom: 50px;" alt="">
                    <div class="font-center font-display3 color-grey-700">Oops!</div>
                    <!-- <div class="font-center font-title font-light color-grey-700">The page you try to access is inaccessible</div> -->
                    <div class="font-center font-title font-light color-grey-700">{{ error.message }}</div>
                    <div class="button-center-container" style="margin-top: 20px;">
                        <veb-button @click="returnHome" class="primary" button-style="raised" v-ripple>Back To Home</veb-button>
                    </div>
                </div>
            </div>
        </veb-page-container>
    </div>
</template>
<script>
export default {
    props: ['error'],
    layout (context) {
        if (context.route.fullPath.includes('/dashboard/')) {
            return 'dashboardLayout'
        }
        return 'default'
    },
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
    methods: {
        returnHome () {
            if (this.$route.fullPath.includes('/dashboard/')) {
                return this.$router.push('/dashboard/')
            }
            return this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
