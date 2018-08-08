<template>
  <div style="padding-bottom: 50px">
    <div class="widthdraw_status_container">
      <p class="widthdraw_bank_name">
        <i class="widthdraw_bank_icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mingshengyinhang"></use>
          </svg>
        </i>
        中国民生银行
      </p>
      <p class="widthdraw_amount">
        ￥6,000.00
      </p>
      <p class="widthdraw_amount_text">
        转账中
      </p>
    </div>
    <xx-timeLine step="3" class="mt10px">
      <xx-timeLine-items
        slot="items"
        title="发起提现"
      >
        <ul>
          <li class="desc_list_items">
            <p class="normal_desc_p">服务单号：201808081211440001</p>
            <p class="normal_desc_p">提现金额：￥10,000.00</p>
            <p class="normal_desc_p">提现到：中国民生银行（1125）李汶津</p>
            <p class="normal_desc_p">发起时间：2018-08-08 12:11:44</p>
          </li>
        </ul>
      </xx-timeLine-items>
      <xx-timeLine-items
        slot="items"
        title="审核"
      >
        <ul>
          <li class="desc_list_items">
            <p class="normal_desc_p">审核意见：同意</p>
            <p class="normal_desc_p">处理时间：2018-08-08 16:08:04</p>
          </li>
        </ul>
      </xx-timeLine-items>
      <xx-timeLine-items
        slot="items"
        title="转账"
      >
        <p class="working_box">
          正在转账，请稍候…
        </p>
      </xx-timeLine-items>
      <xx-timeLine-items
        slot="items"
        title="提现成功"
      >
      </xx-timeLine-items>
    </xx-timeLine>
  </div>
</template>
<style lang="less" scoped>
  .widthdraw_status_container
  {
    background-color: #fff;
    padding: 10px 0;
    .widthdraw_bank_name
    {
      .widthdraw_bank_icon
      {
        font-size: 26px;
      }
      text-align: center;
      font-size: 18px;
    }
    .widthdraw_amount
    {
      font-size: 26px;
      text-align: center;
    }
    .widthdraw_amount_text
    {
      text-align: center;
      color: #3ac7f5;
      font-size: 14px;
    }
  }
  
  .normal_title_p
  {
    font-size: 14px;
    color: #666;
    text-align: left;
    line-height: 25px;
  }
  .normal_desc_p
  {
    font-size: 12px;
    color: #999999;
    text-align: justify;
    line-height: 25px;
    &.redColor
    {
      color: #FF3939
    }
  }
  .desc_list_items
  {
    position: relative;
    padding-bottom: 11px;
    margin-bottom: 11px;
  }
  .desc_list_items::after
  {
    position: absolute;
    content: '';
    display: block;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    transform: scaleY(.5);
    background-color: #D8F4FD;
  }
  .desc_list_items_title
  {
    font-size: 15px;
    color: #333333;
    font-weight: normal;
    height: 21px;
    line-height: 21px;
    margin-bottom: 7px;
  }
  .working_box
  {
    color: #f7931e;
    height: 30px;
    line-height: 30px;
  }
</style>
