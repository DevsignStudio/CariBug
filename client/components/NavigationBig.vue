<template>
    <div class="elevation z3 background-white" style="height: 100vh;overflow: hidden">
        <veb-toolbar class="background-primary elevation z2" style="z-index: 100; border: 0" v-elevation>
            <div class="font-display1 color-white"><span class="font-thin">Cari</span>Bug</div>
            <!-- <img src="/img/logo-text.svg" style="width: 60%; margin: 0;"> -->
        </veb-toolbar>
        <veb-scrollbar>
            <navigation></navigation>
        </veb-scrollbar>
    </div>
</template>

<script>
import Navigation from './Navigation'

export default {
    components: {
        Navigation
    }
}
</script>



