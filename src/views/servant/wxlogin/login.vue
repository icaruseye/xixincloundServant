<template>
  <div>
    登录中...
  </div>
</template>
<script>
export default {
  methods: {
    async login () {
      const option = {
        code: this.$route.query.code,
        shopID: this.$route.query.shopID
      }
      const res = await this.$http.get('/Login', option)
      if (res.data.Data) {
        localStorage.setItem('servant_token', res.data.Data)
        this.$store.dispatch('getAccount').then(() => {
          const path = sessionStorage.getItem('to_path') || '/'
          sessionStorage.removeItem('to_path')
          this.$router.replace(path)
        })
      }
    }
  },
  created () {
    this.login()
  }
}
</script>
