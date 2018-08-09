<template>
  <div class="items_container">
    <i class="img_icon_box">
      <img class="img_icon" :src="UseType | xxMissionTypeIconFilter" alt="任务">
    </i>
    <h1 class="mission_name">
      {{MissionName}}
    </h1>
    <p v-if="UserName" class="create_time">
      投诉人：{{UserName}}
    </p>
    <p class="create_time">
      投诉时间：{{CreateTime | xxTimeFormatFilter}}
    </p>
    <p class="reason_text">
      投诉原因：{{Reason}}
    </p>
    <div class="status_icon_box" v-html="svgIcon"></div>
  </div>
</template>
<script>
export default {
  computed: {
    svgIcon () {
      switch (this.State) {
        case -1:
          return this.createSvgIcon({
            color: '#f6f6f6',
            size: '60',
            innerText: '取消投诉',
            textColor: '#999'
          })
        case 0:
          return this.createSvgIcon({
            color: '#3AC7F5',
            innerText: '未申诉'
          })
        case 1:
          return this.createSvgIcon({
            color: '#faad14',
            innerText: '仲裁中'
          })
        case 2:
          return this.createSvgIcon({
            color: '#ffa39e',
            size: '60',
            innerText: '申诉失败'
          })
        case 3:
          return this.createSvgIcon({
            color: '#95de64',
            size: '60',
            innerText: '申诉成功'
          })
        default:
          return ''
      }
    }
  },
  methods: {
    createSvgIcon ({
      size = 55,
      width = 25,
      color = '#3AC7F5',
      innerText = '',
      textColor = '#fff'
    }) {
      let svg = document.createElement('svg')
      svg.setAttribute('style', `width:${size}px;height:${size}px`)
      svg.setAttribute('xmlns', `http://www.w3.org/2000/svg`)
      svg.setAttribute('version', `1.1`)
      let polygon = document.createElement('polygon')
      polygon.setAttribute('points', `0,0 ${width},0 ${size},${size - width} ${size},${size}`)
      polygon.setAttribute('style', `fill:${color};`)
      let path = document.createElement('path')
      let pathID = `path_${Math.floor(Math.random() * 1000 * 1000)}`
      path.setAttribute('id', pathID)
      path.setAttribute('d', `M${width / 2},0 L${size} ${size - width / 2}`)
      let text = document.createElement('text')
      text.setAttribute('font-size', `12`)
      text.setAttribute('text-anchor', `middle`)
      text.setAttribute('fill', `${textColor}`)
      let textPath = document.createElement('textPath')
      textPath.setAttribute('xlink:href', `#${pathID}`)
      textPath.setAttribute('startOffset', `50%`)
      let tspan = document.createElement('tspan')
      tspan.innerText = innerText
      tspan.setAttribute('dy', 5)
      textPath.appendChild(tspan)
      text.appendChild(textPath)
      svg.appendChild(polygon)
      svg.appendChild(path)
      svg.appendChild(text)
      return svg.outerHTML
    }
  },
  props: {
    UserName: {
      type: String,
      default: null
    },
    State: {
      type: Number,
      default: 0
    },
    UseType: {
      type: Number,
      default: 0
    },
    CreateTime: {
      type: String,
      default: ''
    },
    MissionName: {
      type: String,
      default: ''
    },
    Reason: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
  .items_container
  {
    position: relative;
    background-color: #fff;
    min-height: 60px;
    padding: 10px 10px 10px 70px;
    border-top: 1px solid #eee;
    .status_icon_box
    {
      position: absolute;
      right: 0;
      top: 0;
    }
    .img_icon_box
    {
      position: absolute;
      top: -10px;
      left: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #fff;
      border: 1px solid #eee;
      &::after
      {
        position: absolute;
        top: 9px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        display: block;
        content: '';
        z-index: 1;
        background-color: #fff
      }
      .img_icon
      {
        position: relative;
        z-index: 2;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
    .mission_name
    {
      font-size: 16px;
      font-weight: normal;
    }
    .create_time
    {
      margin-top: 5px;
      font-size: 12px;
      color: #999
    }
    .reason_text
    {
      border-radius: 5px;
      font-size: 12px;
      margin-top: 5px;
      color: #999;
      text-align: justify;
    }
  }
</style>

