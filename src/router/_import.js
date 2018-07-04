/**
 * Created by lwj on 2018/6/7.
 */
// export default file => () => import('@/views' + file)
export default file => resolve => { require([`@/views${file}`], resolve) }
