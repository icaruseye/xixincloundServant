<template>
  <div>
    <xx-occupied-box>
      {{occupiedText}}
    </xx-occupied-box>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  data () {
    return {
      occupiedText: ''
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'userInfo',
      'userAccount'
    ]),
    code () {
      return this.$route.query.code
    },
    shopID () {
      return this.$route.query.shopID
    }
  },
  methods: {
    ...mapActions([
      'getUserAccount',
      'getUserInfo'
    ]),
    ...mapMutations([
      'SET_TOKEN'
    ]),
    async login () {
      this.occupiedText = '正在验证身份…'
      await this.getToken().then(tokenResult => {
        if (tokenResult.Code === 100000) {
          sessionStorage.setItem('servant_token', tokenResult.Data)
          this.SET_TOKEN(tokenResult.Data)
          this.getUserAccountAndInfo()
        } else {
          this.occupiedText = '验证身份失败，请联系客服'
        }
      })
    },
    async getUserAccountAndInfo () {
      this.occupiedText = '正在为您获取身份信息…'
      await this.getUserAccount()
      this.occupiedText = '正在为您加载个人资料…'
      await this.getUserInfo()
      const path = sessionStorage.getItem('to_path') || '/'
      sessionStorage.removeItem('to_path')
      this.$router.push(path)
    },
    async getToken () {
      const res = await this.$http.get('/Login', {
        code: this.code,
        shopID: this.shopID
      })
      return res.data
    }
  },
  created () {
    if (this.token && this.userAccount) {
      this.$router.replace('/user')
      return false
    } else {
      this.login()
    }
  }
}
</script>
