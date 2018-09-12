<template>
  <div class="loadingContianer">
    <div class="loading">
      <span v-for="index in 10" :key="index" :style="{animationDelay:`${0.2 * (index % 2) * index}s`}"></span>
      <p><slot></slot></p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.loadingContianer
{
  position: relative;
  position: relative;
  width: 100%;
  height: 100%;
}
.loading{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 25px;
  display: flex;
  flex-flow: nowrap;
  align-items: center;
  justify-content: center; 
}
.loading p
{
  position: absolute;
  top: 30px;
  color: #999;
  font-size: 14px;
}
.loading span{
  display: inline-block;
  width: 4px;
  height: 15px;
  margin-right: 3px;
  border-radius: 4px;
  background: rgba(0,204,204,.4);
  -webkit-animation: load 1.5s ease infinite; 
}
@-webkit-keyframes load{
  100%,0% {
    height: 15px;
    background: rgba(0,204,204,.4);
  }
  50%{
    height: 30px;
    background: rgba(58,199,245,.4);
  }
}
</style>
