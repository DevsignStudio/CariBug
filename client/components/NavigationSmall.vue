<template>
    <veb-reveal ref="navigation" >
        <veb-navigation style="height:100vh">
            <div style="height: 100%">
                <veb-scrollbar class="flex-fill-height">
                    <navigation></navigation>
                </veb-scrollbar>
            </div>
        </veb-navigation>
    </veb-reveal>
</template>

<script>
import Navigation from './Navigation'

export default {
    components: {
        Navigation
    }
}
</script>



