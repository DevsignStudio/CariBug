<template>
    <veb-reveal ref="navigation" >
        <veb-navigation style="height:100vh">
            <veb-scrollbar>
                <navigation></navigation>
            </veb-scrollbar>
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



