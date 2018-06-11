export default {
    head () {
        return {
            title: 'Caribug' + (this.pageTitle ? ' | ' + this.pageTitle : '') 
        }
    }
}