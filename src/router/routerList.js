/**
 * Created by lwj on 2018/6/8.
 */
import common from './routers/common'
import message from './routers/message'
import app from './routers/app'
import user from './routers/user'
import mission from './routers/mission'

const routerList = [
  ...common,
  ...message,
  ...mission,
  ...app,
  ...user
]

export default routerList
