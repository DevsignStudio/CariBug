import Toolbar from './components/Toolbar.vue'
import Avatar from './components/Avatar.vue'
import Scrollbar from './components/Scrollbar.vue'
import BlurBack from './components/BlurBack.vue'
import Icon from './components/Icon.vue'
import IconButton from './components/IconButton.vue'
import Button from './components/Button.vue'
import DataTable from './components/DataTable.vue'
import PageContainer from './components/PageContainer.vue'
import Reveal from './components/Reveal.vue'
import Navigation from './components/Navigation.vue'
import NavList from './components/NavList.vue'
import Cards from './components/Cards.vue'
import CardsContent from './components/CardsContent.vue'
import CardsAction from './components/CardsAction.vue'
import Divider from './components/Divider.vue'
import Image from './components/Image.vue'
import Textfield from './components/Textfield.vue'
import Tab from './components/Tab.vue'
import TabItem from './components/TabItem.vue'
import TabContent from './components/TabContent.vue'
import TabContentItem from './components/TabContentItem.vue'
import SearchBox from './components/SearchBox.vue'
import List from './components/List.vue'
import ListItem from './components/ListItem.vue'
import Checkbox from './components/Checkbox.vue'
import Radio from './components/Radio.vue'
import Switch from './components/Switch.vue'
import Menu from './components/Menu.vue'
import MenuItem from './components/MenuItem.vue'
import MenuOption from './components/MenuOption.vue'
import DropdownMenu from './components/DropdownMenu.vue'
import DropdownSelect from './components/DropdownSelect.vue'

export default function (Vue, options) {
    Vue.component('veb-toolbar', Toolbar)
    Vue.component('veb-avatar', Avatar)
    Vue.component('veb-scrollbar', Scrollbar)
    Vue.component('veb-blur-back', BlurBack)
    Vue.component('veb-datatable', DataTable)
    Vue.component('veb-icon', Icon)
    Vue.component('veb-icon-button', IconButton)
    Vue.component('veb-button', Button)
    Vue.component('veb-page-container', PageContainer)
    Vue.component('veb-reveal', Reveal)
    Vue.component('veb-navigation', Navigation)
    Vue.component('veb-nav-list', NavList)
    Vue.component('veb-cards', Cards)
    Vue.component('veb-cards-content', CardsContent)
    Vue.component('veb-cards-action', CardsAction)
    Vue.component('veb-divider', Divider)
    Vue.component('veb-image', Image)
    Vue.component('veb-textfield', Textfield)
    Vue.component('veb-tab', Tab)
    Vue.component('veb-tab-item', TabItem)
    Vue.component('veb-tab-content', TabContent)
    Vue.component('veb-tab-content-item', TabContentItem)
    Vue.component('veb-search-box', SearchBox)
    Vue.component('veb-list', List)
    Vue.component('veb-list-item', ListItem)
    Vue.component('veb-checkbox', Checkbox)
    Vue.component('veb-radio', Radio)
    Vue.component('veb-switch', Switch)
    Vue.component('veb-menu', Menu)
    Vue.component('veb-menu-item', MenuItem)
    Vue.component('veb-option', MenuOption)
    Vue.component('veb-dropdown-menu', DropdownMenu)
    Vue.component('veb-select', DropdownSelect)
}
