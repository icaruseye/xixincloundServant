<template>
  <div class="container">
    <div class="input_box">
      <input class="input_control" type="text">
    </div>
    <div class="btn_box">
      <button class="btn">发送</button>
    </div>
  </div>
</template>
<style lang="less" scoped>
.container
{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #fff;
  display: flex;
  flex-flow: nowrap;
  .input_box
  {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 0 12px;
    .input_control
    {
      height: 35px;
      width: 100%;
      padding: 0 12px;
      background-color: #f6f6f6;
      border-radius: 4px
    }
  }
  .btn_box
  {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 80px;
    .btn
    {
      width: 62px;
      height: 35px;
      border-radius: 4px;
      background-color: #3AC7F5;
      color: #fff;
      border: none
    }
  }
}
</style>

