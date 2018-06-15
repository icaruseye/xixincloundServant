<template>
  <p class="service_hint_p">
    <i class="service_hint_p_icon"></i>
    <slot></slot>
  </p>
</template>
<style scoped>
  .service_hint_p
  {
    position: relative;
    height: 40px;
    padding-left: 20px;
    line-height: 40px;
    font-size: 10px;
    color: #999999;
    margin: 0 11px;
  }
  
  .service_hint_p_icon
  {
    position: absolute;
    display: flex;
    flex-flow: column;
    width: 10px;
    height: 10px;
    background-color: #F6E5C8;
    color: #F8A519;
    font-size: 4px;
    text-align: center;
    line-height: 1;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
    align-content: center;
    align-items: center;
  }
  .service_hint_p_icon::before,
  .service_hint_p_icon::after
  {
    content: "";
    display: block;
    width: 1px;
    background-color: #F8A519;
  }
  .service_hint_p_icon::before
  {
    margin-top: 2px;
    content: "";
    display: block;
    width: 1px;
    height: 4px;
    background-color: #F8A519;
  }
  .service_hint_p_icon::after
  {
    height: 1px;
    margin-top: 1px;
  }
</style>

