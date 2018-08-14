<template>
  <div>
    <xx-search placeholder="搜索用户" v-model="searchValue"></xx-search>
    <div>
      <router-link to="/">最新添加</router-link>
    </div>
    <tags-container style="margin-top:5px"></tags-container>
  </div>
</template>
<script>
import xxSearch from '@/components/common/xxSearch'
import tagsContainer from './components/tagsContainer'
export default {
  components: {
    xxSearch,
    tagsContainer
  },
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    onCancel () {
    }
  }
}
</script>

