<template>
  <div class="wrapper">
    <div class="schedule_table_wrap">
      <div class="title">
        <div class="item">上午</div>
        <div class="item">下午</div>
        <div class="item">夜晚</div>
      </div>
      <div class="weeklist">
        <div class="col">
          <div class="item active" @click="clickItem(0)">
            <div>挂 1</div>
            <div>余 2</div>
          </div>
          <div class="item active">
            <span>1</span>
          </div>
          <div class="item"></div>
        </div>
        <div class="col">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
        <div class="col">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
        <div class="col">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
        <div class="col">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
        <div class="col">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
        <div class="col">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      count: 0
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    clickItem (index) {
      let data = null
      if (this.isEdit) {
        data = true
      } else {
        data = false
      }
      this.$emit('on-item-click', data)
    },
    setNumber () {}
  }
}
</script>

<style lang="less" scoped>
.schedule_table_wrap {
  background: #fff;
  border-top: 1px solid #f1f1f1;
  display: flex;
  .title {
    width: 40px;
    .item {
      width: 100%;
      letter-spacing: 4px;
      -webkit-writing-mode: vertical-rl;
    }
  }
  .weeklist {
    flex: 1;
    display: flex;
    .col {
      flex: 1;
      &:last-child {
        border-right: 0;
      }
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 74px;
    font-size: 12px;
    color: #666;
    text-align: center;
    border-right: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
    div {
      height: 25px;
      line-height: 25px;
    }
    &.active {
      background: #3AC7F5;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
