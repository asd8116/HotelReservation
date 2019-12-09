<template>
  <div
    class="background-image"
    v-if="iniRoom"
    :style="{backgroundImage: `url(${iniRoom.imageUrl})`}"
  >
    <div class="show"></div>

    <div class="room-index-name">
      <div class="number">{{ getStringNumber }}</div>
      <div class="name">{{ iniRoom.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    iniRoom: {
      type: Object,
      default () {
        return {
          imageUrl: 'https://via.placeholder.com/1200'
        }
      }
    },
    iniIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getStringNumber () {
      const stringNumber = this.iniIndex.toString()

      return '0' + stringNumber
    }
  }
}
</script>

<style lang="scss" scoped>
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom;

  .show {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(192, 192, 192, 0.2);
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.35) 100%);
  }
  .room-index-name {
    position: absolute;
    left: 70px;
    bottom: 75px;

    .number {
      font-size: 66px;
      font-weight: normal;
      color: white;

      &::after {
        content: '';
        width: 85px;
        height: 20px;
        position: absolute;
        top: 70%;
        left: 0;
        background-color: rgba(white, 0.2);
        background-image: linear-gradient(
          45deg,
          white 5%,
          transparent 5%,
          transparent 45%,
          white 45%,
          white 55%,
          transparent 55%,
          transparent 95%,
          white 95%,
          white
        );
        background-size: 10px 10px;
      }
    }
    .name {
      margin-top: 12px;
      font-size: 24px;
      letter-spacing: 2.51px;
      color: white;
    }
  }
}
</style>
