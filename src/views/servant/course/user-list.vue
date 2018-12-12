<template>
  <div class="wrapper">
    <xx-go-back></xx-go-back>
    <div v-if="list.length > 0">
      <div class="title_bar">
        <div>已有<span>{{list.length}}</span>人参加此课程</div>
      </div>
      <div class="course_list">
        <template v-for="(item, index) in list">
          <div class="course_list_item" :key="index">
            <img class="icon" :src="item.Avatar | transformImgUrl" alt="">
            <div class="title">{{item.NickName}}</div>
            <!-- <button class="btn manage" @click=toDetail(item.UserId)>学习过程</button> -->
          </div>
        </template>
      </div>
    </div>
    <xx-occupied-box v-else>
      暂无用户参加此课程
    </xx-occupied-box>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
  },
  mounted () {
    this.getCourseUser()
  },
  methods: {
    async getCourseUser () {
      const res = await this.$http.get(`/Proxy-Course-User?courseId=${this.$route.params.id}`)
      if (res.data.Code === 100000) {
        this.list = res.data.Data
      } else {
        this.$vux.toast.text(res.data.Msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.course_list {
  background: #fff;
}

.course_list_item {
  display: flex;
  align-items: center;
  padding: 20px 12px;
  border-bottom: 1px solid RGBA(58, 199, 245, .2);
  &:last-child {
    border: 0;
  }
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .title {
    flex: 1;
    font-size: 18px;
    color: #333;
  }
  .btn {
    padding: 2px 8px;
    font-size: 13px;
    color: #fff;
    border-radius: 2px;
    margin-left: 10px;
    color: #3AC7F5;
    background: #fff;
    border: 1px solid #3AC7F5;
  }
}

.title_bar {
  padding: 0 12px;
  height: 40px;
  line-height: 40px;
  align-items: center;
  justify-content: space-around;
  font-size: 12px;
  color: #666;
  span {
    color: #F8A519;
  }
}
</style>
