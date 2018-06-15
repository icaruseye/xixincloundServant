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
  }
}

export default components
