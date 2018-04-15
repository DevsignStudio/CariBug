<template>
    <div class="elevation z3 background-white" style="height: 100vh;overflow: hidden">
        <veb-toolbar class="background-grey-100" style="z-index: 100; border: 0">
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



