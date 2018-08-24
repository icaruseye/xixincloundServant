import faceList from '@/plugins/datas/faceList.js'
const emojiImage = require('@/assets/images/15BPafa.png')

// 计算表情的样式
export const computeEmojiStyle = (val) => {
  let index = faceList.indexOf(val)
  let floor = Math.floor(index / 15)
  return `background-image: url(${emojiImage});background-position: -${index * 29 - floor * 435}px -${floor * 29}px`
}

// 格式化文本中的表情
export const getEmojiByMsgText = (val) => {
  const emojiReg = /\[[\u4e00-\u9fa5]{1,}\]/g
  let list = val.match(emojiReg)
  if (list && list.length > 0) {
    list.map(item => {
      if (faceList.indexOf(item) >= 0) {
        val = val.replace(item, `<i class="text_emoji_items" style="${computeEmojiStyle(item)}"></i>`)
      }
    })
    return val
  }
  return val
}

// 如果文本最后是表情就把表情整个删除掉，如果不是就只删一步
export const backspaceTextLastEmoji = (str) => {
  const emojiReg = /\[[\u4e00-\u9fa5]{1,}\]$/
  let lastEmojiStartIndex = str.search(emojiReg)
  if (lastEmojiStartIndex >= 0) {
    let lastEmojiName = str.substring(lastEmojiStartIndex, str.length)
    if (faceList.indexOf(lastEmojiName) >= 0) {
      str = str.substring(0, lastEmojiStartIndex)
      return str
    }
  }
  str = str.substring(0, str.length - 1)
  return str
}
