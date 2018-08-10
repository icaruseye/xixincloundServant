/**
 * Created by lwj on 2018/6/8.
 */
import common from './routers/common'
import message from './routers/message'
import app from './routers/app'
import user from './routers/user'
import mission from './routers/mission'
import consult from './routers/consult'
import recommend from './routers/recommend'

const routerList = [
  ...common,
  ...message,
  ...mission,
  ...app,
  ...user,
  ...consult,
  ...recommend
]

export default routerList
