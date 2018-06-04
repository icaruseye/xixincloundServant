<template>
  <div>
    登录中...
  </div>
</template>

<script>
import http from '@/api/index'
export default {
  methods: {
    async login () {
      // const option = {
      //   code: this.$route.query.code,
      //   shopID: this.$route.query.shopID
      // }
      // // 获取token
      // const res = await http.get('/Login', option)
      const res = await http.get('/LoginTest', {id: this.$route.query.id})
      if (res.data.Data) {
        localStorage.setItem('servant_token', res.data.Data)
        this.$store.dispatch('getAccount').then(() => {
          const path = sessionStorage.getItem('to_path') || '/'
          this.$router.push(path)
        })
      }
    }
  },
  created () {
    this.login()
  }
}
</script>