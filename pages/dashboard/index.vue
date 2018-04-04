<template>
    <div>
        <veb-dropdown-menu>
            <veb-button class="primary" v-ripple trigger-menu><veb-icon name="menu"></veb-icon> Show Menu</veb-button>
            <veb-menu>
                <veb-menu-item><veb-icon name="home"></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name="home"></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name=""></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name=""></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name=""></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name=""></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name=""></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name=""></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name=""></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name=""></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name=""></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name=""></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name=""></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name=""></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name=""></veb-icon> Testing</veb-menu-item>
                <veb-menu-item><veb-icon name="home"></veb-icon> Testing</veb-menu-item>
            </veb-menu>
        </veb-dropdown-menu>
        <veb-dropdown-menu>
            <veb-icon-button name="dots-vertical" trigger-menu v-ripple></veb-icon-button>
            <veb-menu>
                <veb-menu-item>Testing</veb-menu-item>
                <veb-menu-item>Testing</veb-menu-item>
                <veb-menu-item>Testing</veb-menu-item>
                <veb-menu-item>Testing</veb-menu-item>
            </veb-menu>
        </veb-dropdown-menu>
        <div style="width: 200px">
            <veb-select v-model="selectValue" label="Name">
                <veb-option value="nizul">Nizul</veb-option> 
                <veb-option value="zaim">Zaim</veb-option> 
                <veb-option value="lili">Lili</veb-option> 
                <veb-option value="madiha">Madiha</veb-option> 
                <veb-option value="anuar">Anuar</veb-option> 
                <veb-option value="zainal_abidin">Zainal Abidin</veb-option> 
                <veb-option value="sulaiman">Sulaiman</veb-option> 
            </veb-select>
        </div>
    </div>
</template>

<script>
import CurrentuserGQL from '~/apollo/query/currentUser.gql'
export default {
    data () {
        return {
            selectValue: '',
            currentUser: null
        }
    },
    apollo: {
        currentUser: CurrentuserGQL
    }
}
</script>

