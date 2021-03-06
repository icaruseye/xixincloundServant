/**
 * Created by lwj on 2018/6/8.
 */
import _import from '../_import'

export default [
  {
    path: '/article',
    component: _import('/servant/article/list'),
    meta: {
      title: '文章列表',
      goBackParam: {
        url: '/app',
        title: '应用'
      }
    }
  },
  {
    path: '/article/:id/detail',
    component: _import('/servant/article/detail'),
    meta: {
      title: '文章详情',
      goBackParam: {
        url: '/article',
        title: '文章列表'
      }
    }
  },
  {
    path: '/article/edit',
    component: _import('/servant/article/edit'),
    meta: {
      title: '编辑文章',
      goBackParam: {
        url: '/article',
        title: '文章列表'
      }
    }
  }
]
