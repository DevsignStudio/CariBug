<template>
    <div>
        <veb-page-container>
            <h1 class="font-display1">Table</h1>
            <p class="font-subhead">A card is a sheet of material that serves as an entry point to more detailed information.>Cards display content composed of different elements whose size or supported actions vary.
            Cards are a convenient means of displaying content composed of different elements. They’re also well-suited for showcasing elements whose size or supported actions vary, like photos with captions of variable length.</p>
            <div class="components-panel">
                <div class="row center-xs" style="width: 100%">
                    <div class="col-xs-fluid-24">
                        <div style="padding: 12px;">
                            <veb-datatable  v-if="exampleData1.length">
                                <table>
                                    <thead>
                                        <tr>
                                            <th v-for="key in Object.keys(exampleData1[0])" :key="key">{{key}}</th>
                                            <th class="unsortable"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user in exampleData1" :key="user.id">
                                            <td v-for="data in Object.keys(user)" :key="data">{{user[data]}}</td>
                                            <td class="td-action">
                                                <veb-icon-button name="details" class="color-primary"></veb-icon-button>
                                                <veb-icon-button name="account-multiple" class="color-grey-700"></veb-icon-button>
                                            </td>
                                        </tr>
                                        <tr v-if="!exampleData1.length">
                                            <td colspan="100" class="font-center">No Data to show</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </veb-datatable>
                        </div>
                    </div>
                    <div class="col-xs-fluid-24 col-md-fluid-10">
                        <div style="padding: 12px;">
                            
                            <veb-datatable v-if="exampleData1.length">
                                <table>
                                    <thead>
                                        <tr>
                                            <th v-for="key in Object.keys(exampleData1[0])" :key="key">{{key}}</th>
                                            <th class="unsortable"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user in exampleData1" :key="user.id">
                                            <td v-for="data in Object.keys(user)" :key="data">{{user[data]}}</td>
                                            <td class="td-action">
                                                <veb-icon-button name="details" class="color-primary"></veb-icon-button>
                                                <veb-icon-button name="account-multiple" class="color-grey-700"></veb-icon-button>
                                            </td>
                                        </tr>
                                        <tr v-if="!exampleData1.length">
                                            <td colspan="100" class="font-center">No Data to show</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </veb-datatable>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{Table1}}</highlight-code>
        </veb-page-container>
        <veb-page-container>
           <div class="components-panel">
                <div class="row center-xs" style="width: 100%">
                    <div class="col-xs-fluid-24">
                        <div style="padding: 12px;">
                            <veb-datatable @headerClick="orderData2" :sortable="true"  v-if="exampleData2.length">
                                <table>
                                    <thead>
                                        <tr>
                                            <th v-for="key in Object.keys(exampleData2[0])" :key="key">{{key}}</th>
                                            <th class="unsortable"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user in exampleData2" :key="user.id">
                                            <td v-for="data in Object.keys(user)" :key="data">{{user[data]}}</td>
                                            <td class="td-action">
                                                <veb-icon-button name="details" class="color-primary"></veb-icon-button>
                                                <veb-icon-button name="account-multiple" class="color-grey-700"></veb-icon-button>
                                            </td>
                                        </tr>
                                        <tr v-if="!exampleData2.length">
                                            <td colspan="100" class="font-center">No Data to show</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </veb-datatable>
                        </div>
                    </div>
                    <div class="col-xs-fluid-24 col-md-fluid-10">
                        <div style="padding: 12px;">
                            <veb-datatable @headerClick="orderData3" :sortable="true"  v-if="exampleData3.length">
                                <table>
                                    <thead>
                                        <tr>
                                            <th v-for="key in Object.keys(exampleData3[0])" :key="key">{{key}}</th>
                                            <th class="unsortable"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user in exampleData3" :key="user.id">
                                            <td v-for="data in Object.keys(user)" :key="data">{{user[data]}}</td>
                                            <td class="td-action">
                                                <veb-icon-button name="details" class="color-primary"></veb-icon-button>
                                                <veb-icon-button name="account-multiple" class="color-grey-700"></veb-icon-button>
                                            </td>
                                        </tr>
                                        <tr v-if="!exampleData3.length">
                                            <td colspan="100" class="font-center">No Data to show</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </veb-datatable>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clearfix"></div>
            <highlight-code lang="html">{{Table2}}</highlight-code>
        </veb-page-container>
    </div>
</template>

<script>
import {Table1, Table2} from '~/assets/code/table.js'
import _ from 'lodash'
export default {
    data () {
        return {
            pageTitle: 'Components > Table',
            Table1,
            Table2,
            exampleData1: [],
            exampleData2: [],
            exampleData3: []
        }
    },
    head () {
        return {
            title: this.pageTitle
        }
    },
    mounted () {
        this.exampleData1 = [{
            'id': 1,
            'first_name': 'Jeanette',
            'last_name': 'Penddreth',
            'email': 'jpenddreth0@census.gov',
            'gender': 'Female',
            'ip_address': '26.58.193.2'
        }, {
            'id': 2,
            'first_name': 'Giavani',
            'last_name': 'Frediani',
            'email': 'gfrediani1@senate.gov',
            'gender': 'Male',
            'ip_address': '229.179.4.212'
        }, {
            'id': 3,
            'first_name': 'Noell',
            'last_name': 'Bea',
            'email': 'nbea2@imageshack.us',
            'gender': 'Female',
            'ip_address': '180.66.162.255'
        }, {
            'id': 4,
            'first_name': 'Willard',
            'last_name': 'Valek',
            'email': 'wvalek3@vk.com',
            'gender': 'Male',
            'ip_address': '67.76.188.26'
        }]

        this.exampleData2 = this.exampleData1
        this.exampleData3 = this.exampleData1
    },
    methods: {
        orderData2 (header, order) {
            this.exampleData2 = _.orderBy(this.exampleData2, header, order)
        },
        orderData3 (header, order) {
            this.exampleData3 = _.orderBy(this.exampleData3, header, order)
        }
    }
}
</script>
