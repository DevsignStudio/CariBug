export const Table1 = `<template>
    <div class="row center-xs" style="width: 100%">
        <div class="col-xs-fluid-24">
            <div style="padding: 24px;">
                <veb-datatable>
                    <table>
                        <thead>
                            <tr>
                                <th v-for="key in Object.keys(exampleData[0])" :key="key">{{key}}</th>
                                <th class="unsortable"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in exampleData" :key="user.id">
                                <td v-for="data in Object.keys(user)" :key="data">{{user[data]}}</td>
                                <td class="td-action">
                                    <veb-icon-button name="details" class="color-primary"></veb-icon-button>
                                    <veb-icon-button name="account-multiple" class="color-grey-700"></veb-icon-button>
                                </td>
                            </tr>
                            <tr v-if="!exampleData.length">
                                <td colspan="100" class="font-center">No Data to show</td>
                            </tr>
                        </tbody>
                    </table>
                </veb-datatable>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            exampleData: [{
                'id': 1,
                'first_name': 'Jeanette',
                'last_name': 'Penddreth',
                'email': 'jpenddreth0@census.gov',
                'gender': 'Female',
                'ip_address': '26.58.193.2'
            },
            ...
            ]
        }
    },
}
</script>
`

export const Table2 = `<template>
    <div class="row center-xs" style="width: 100%">
        <div class="col-xs-fluid-24">
            <div style="padding: 24px;">
                <veb-datatable @headerClick="orderData" :sortable="true"  v-if="exampleData.length">
                    <table>
                        <thead>
                            <tr>
                                <th v-for="key in Object.keys(exampleData[0])" :key="key">{{key}}</th>
                                <th class="unsortable"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in exampleData" :key="user.id">
                                <td v-for="data in Object.keys(user)" :key="data">{{user[data]}}</td>
                                <td class="td-action">
                                    <veb-icon-button name="details" class="color-primary"></veb-icon-button>
                                    <veb-icon-button name="account-multiple" class="color-grey-700"></veb-icon-button>
                                </td>
                            </tr>
                            <tr v-if="!exampleData.length">
                                <td colspan="100" class="font-center">No Data to show</td>
                            </tr>
                        </tbody>
                    </table>
                </veb-datatable>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
    data () {
        return {
            exampleData: [{
                'id': 1,
                'first_name': 'Jeanette',
                'last_name': 'Penddreth',
                'email': 'jpenddreth0@census.gov',
                'gender': 'Female',
                'ip_address': '26.58.193.2'
            },
            ...
            ]
        }
    },
    methods: {
        orderData (header, order) {
            this.exampleData = _.orderBy(this.exampleData, header, order)
        }
    }
}
</script>
`
