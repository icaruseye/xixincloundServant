<template>
  <div v-if="userInfo">
    <div class="user_bg_container">
      {{ID}}
      {{userInfo.UserName}}
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: null
    }
  },
  computed: {
    ID () {
      return this.$route.params.id
    }
  },
  methods: {
    async getUserInfo () {
      const res = await this.$http.get(`/Attribute/Friends/Detail?userId=${this.ID}`)
      if (res.data.Code === 100000) {
        this.userInfo = res.data.Data
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user_bg_container
{
  height: 143px;
  background: linear-gradient(to right, #3AC7F5, #9EC2FB);
}
</style>
