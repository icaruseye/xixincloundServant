<template>
  <div style="padding-bottom:50px">
    <ListEditItems></ListEditItems>
    <ListEditItems></ListEditItems>
    <ListEditItems></ListEditItems>
    <ListEditItems></ListEditItems>
    <ListEditItems></ListEditItems>
    <ListEditItems></ListEditItems>
    <ListEditItems></ListEditItems>
    <router-link class="add_newArticle_btn" to="/article/edit"></router-link>
  </div>
</template>
<script>
import ListEditItems from './components/list-edit-items'
export default {
  components: {
    ListEditItems
  },
  data () {
    return {
      pageNumber: 1,
      pageSize: 10
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.get('/ArticleList', {
        ArticleType: 1,
        Index: this.pageNumber,
        Size: this.pageSize
      }).then(result => {
        console.log(result)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.add_newArticle_btn
{
  position: fixed;
  right: 12px;
  bottom: 22px;
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3AC7F5;
  box-shadow: 0 5px 7px #ccc;
  &::before,
  &::after
  {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 2px;
    display: block;
    content: ''
  }
  &::before
  {
    width: 3px;
    height: 28px;
  }
  &::after
  {
    width: 28px;
    height: 3px;
  }
}
</style>

