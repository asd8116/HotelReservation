<template>
  <div class="dialog-panel alert-box">
    <h3 class="title">{{ title === 'true' ? ' 預約成功' : ' 預約失敗' }}</h3>

    <div class="decoration-three">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="message" v-if="title !== 'true'">{{ message }}</div>

    <div class="image" v-else>
      <img :src="`${basePath}images/tick-inside-circle.svg`" alt />
    </div>

    <div class="button-group">
      <button class="btn-confrim" v-if="title === 'true'" @click.prevent="closeAll">回頁面</button>
      <button class="btn-confrim" v-else @click.prevent="closeAll">返回</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message', 'title', 'closeAll'],
  data () {
    return {
      basePath: process.env.BASE_URL
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-panel.alert-box {
  width: 100%;
  max-width: 425px;

  .title{
    font-weight: bolder;
  }
  .message {
    font-size: 14px;
    font-weight: bolder;
    color: #000000;
    letter-spacing: 1.46px;
  }
  .image {
    width: 100%;
    text-align: center;
    img {
      width: 60px;
      height: 60px;
    }
  }
  .button-group {
    justify-content: flex-end;
  }
}
</style>
