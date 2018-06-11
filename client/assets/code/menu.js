export const Menu1 = `<template>
    <veb-dropdown-menu>
        <veb-icon-button name="menu" trigger-menu></veb-icon-button>
        <veb-menu>
            <veb-menu-item>Test 1</veb-menu-item>
            <veb-menu-item>Test 2</veb-menu-item>
            <veb-menu-item>Test 3</veb-menu-item>
            <veb-menu-item>Test 4</veb-menu-item>
        </veb-menu>
    </veb-dropdown-menu>
</template>
`

export const Menu2 = `<template>
    <veb-select label="Please Select" v-model="test">
        <veb-option value="1">Test 1</veb-option>
        <veb-option value="2">Test 2</veb-option>
        <veb-option value="3">Test 3</veb-option>
        <veb-option value="4">Test 1</veb-option>
        <veb-option value="5">Test 1</veb-option>
        <veb-option value="6">Test 1</veb-option>
        <veb-option value="7">Test 1</veb-option>
        <veb-option value="8">Test 1</veb-option>
        <veb-option value="9">Test 1</veb-option>
        <veb-option value="10">Test 1</veb-option>
        <veb-option value="11">Test 1</veb-option>
    </veb-select>
    <veb-select label="Please Select" v-model="test" :disabled="true">
        <veb-option value="1">Test 1</veb-option>
        <veb-option value="2">Test 2</veb-option>
        <veb-option value="3">Test 3</veb-option>
        <veb-option value="4">Test 1</veb-option>
        <veb-option value="5">Test 1</veb-option>
        <veb-option value="6">Test 1</veb-option>
        <veb-option value="7">Test 1</veb-option>
        <veb-option value="8">Test 1</veb-option>
        <veb-option value="9">Test 1</veb-option>
        <veb-option value="10">Test 1</veb-option>
        <veb-option value="11">Test 1</veb-option>
    </veb-select>
</template>

<script>
export default {
    data () {
        return {
            test: "1",
        }
    }
}
</script>
`

export default  {
    Menu1,
    Menu2
}
