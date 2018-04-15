export const Textfield1 = `<template>
        <veb-textfield v-model="testData" placeholder="Name"></veb-textfield>
        <veb-textfield v-model="testData" placeholder="Name" 
                        message="Message here"></veb-textfield>
        <veb-textfield v-model="testData" placeholder="Name" 
                        message="Message here" :force-message="true"></veb-textfield>
        <veb-textfield v-model="testData" placeholder="Multiline" type="multiline"></veb-textfield>
        <veb-textfield v-model="testData" class="accent" placeholder="Name"></veb-textfield>
        <veb-textfield v-model="testData" type="password" placeholder="Password"></veb-textfield>
        <veb-textfield v-model="testData" class="accent" placeholder="Name" :disabled="true"></veb-textfield>
        <veb-textfield v-model="testData" class="accent" placeholder="Name" :is-info="true"></veb-textfield>
        <veb-textfield v-model="testData" placeholder="Name" 
                        class="success" message="Message here" :force-message="true" :always-show-color="true"></veb-textfield>
        <veb-textfield v-model="testData" placeholder="Name" 
                        class="failed" message="Message here" :force-message="true" :always-show-color="true"></veb-textfield>
    </veb-toolbar>
</template>

<script>
export default {
    data () {
        return: {
            testData: '',
        }
    }
}
</script>
`
