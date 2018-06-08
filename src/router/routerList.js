/**
 * Created by lwj on 2018/6/8.
 */
import common from './routers/common'
import message from './routers/message'
import app from './routers/app'
import user from './routers/user'

const routerList = [
  ...common,
  ...message,
  ...app,
  ...user
]

export default routerList
