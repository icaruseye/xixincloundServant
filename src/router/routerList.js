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
import customer from './routers/customer'
import article from './routers/article'
import schedule from './routers/schedule'
import activity from './routers/activity'
import course from './routers/course'

const routerList = [
  ...common,
  ...message,
  ...mission,
  ...app,
  ...user,
  ...consult,
  ...recommend,
  ...customer,
  ...article,
  ...schedule,
  ...activity,
  ...course
]

export default routerList
