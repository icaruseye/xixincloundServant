import xxCell from './cells/container'
import xxCellItems from './cells/items'
import xxStepBar from './steps/bar'
import xxStepItems from './steps/items'
import xxTimeLine from './timeLine/box'
import xxTimeLineItems from './timeLine/items'
import xxTab from './tabs/tab'
import xxTabItem from './tabs/tab-item'
import xxCheckerItem from './checker/item'
import xxCheckerBox from './checker/box'
import xxUploader from './uploader'
import xxTabbar from './tabbar'
import xxFiltrate from './filtrate'
import xxHint from './hintComponent'
import xxInputGroupBox from './inputGroup/box'
import xxInputGroupItems from './inputGroup/items'
import xxOccupiedBox from './OccupiedBox'
import xxGoBack from './GoBack'
import xxPageSorter from './PageSorter'
import xxCenterImage from './xxCenterImage'
import xxLoading from './xxLoading'
import xxLoadmore from './loadmore'

const components = {
  install: function (Vue) {
    Vue.component('xxCell', xxCell)
    Vue.component('xxCellItems', xxCellItems)
    Vue.component('xxStepBar', xxStepBar)
    Vue.component('xxStepItems', xxStepItems)
    Vue.component('xxTimeLine', xxTimeLine)
    Vue.component('xxTimeLineItems', xxTimeLineItems)
    Vue.component('xxTab', xxTab)
    Vue.component('xxTabItem', xxTabItem)
    Vue.component('xxCheckerItem', xxCheckerItem)
    Vue.component('xxCheckerBox', xxCheckerBox)
    Vue.component('xxUploader', xxUploader)
    Vue.component('xxTabbar', xxTabbar)
    Vue.component('xxFiltrate', xxFiltrate)
    Vue.component('xxHint', xxHint)
    Vue.component('xxInputGroupBox', xxInputGroupBox)
    Vue.component('xxInputGroupItems', xxInputGroupItems)
    Vue.component('xxOccupiedBox', xxOccupiedBox)
    Vue.component('xxGoBack', xxGoBack)
    Vue.component('xxPageSorter', xxPageSorter)
    Vue.component('xxCenterImage', xxCenterImage)
    Vue.component('xxLoading', xxLoading)
    Vue.component('xxLoadmore', xxLoadmore)
  }
}

export default components
