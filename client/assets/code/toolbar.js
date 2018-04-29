export const Toolbar1 = `<template>
     <veb-toolbar class="background-primary elevation z2" v-elevation>
        <div class="font-title color-white">Title</div>
    </veb-toolbar>
</template>
`

export const Toolbar2 = `<template>
    <veb-toolbar class="background-accent elevation z2" v-elevation>
        <veb-icon-button name="menu" class="color-white"></veb-icon-button>
        <div class="font-title color-white" style="display: inline-block; margin: 0; margin-left: 20px;">Title</div>
        <span slot="right" class="veb-dark-theme">
            <veb-button button-style="color" class="inverse" v-ripple>Button</veb-button>
            <veb-icon-button name="dots-vertical" class="color-white"></veb-icon-button>
        </span>
    </veb-toolbar>
</template>
`
