<template>
  <div class="room-image-banner">
    <router-link to="/rooms" class="banner-logo">
      <img :src="`${basePath}images/logo_block.svg`" alt />
    </router-link>

    <div class="images-panel">
      <div
        class="main-image image-container"
        :style="{backgroundImage: `url('${imageUrl[0]}')`}"
        @click="openLightBox(0)"
      ></div>

      <div class="sub-images">
        <div
          class="sub-image image-container"
          v-for="(image, index) in imageUrl.slice(1, imageUrl.length)"
          :key="index"
          :style="{ backgroundImage: `url('${image}')` }"
          @click="openLightBox(index + 1)"
        ></div>
      </div>
    </div>

    <transition name="fade">
      <div class="lightbox" v-if="show" @click="closeLigthBox">
        <i class="fas fa-chevron-left" @click.stop="pre"></i>

        <div class="imgbox">
          <img :src="imageUrl[index]" alt />

          <div class="information">
            <div class="room-name">{{ roomName }}</div>
            <div class="index">{{ `${index + 1} / ${imageUrl.length}` }}</div>
          </div>
        </div>

        <i class="fas fa-chevron-right" @click.stop="next"></i>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: Array,
      default: () => []
    },
    roomName: {
      type: String
    }
  },
  data () {
    return {
      index: 0,
      show: false,
      basePath: process.env.BASE_URL
    }
  },
  methods: {
    openLightBox (index) {
      this.index = index
      this.show = true
    },
    closeLigthBox () {
      this.show = false
    },
    pre () {
      if (this.index - 1 < 0) this.index = this.imageUrl.length - 1
      else this.index -= 1
    },
    next () {
      if (this.index + 1 > this.imageUrl.length - 1) this.index = 0
      else this.index += 1
    }
  }
}
</script>

<style lang="scss" scoped>
.room-image-banner {
  width: 100%;
  height: 600px;
  box-shadow: 0px 0px 10px rgba(black, 0.5);
  .banner-logo {
    position: absolute;
    top: 32px;
    left: 50px;
    z-index: 9;
  }
  .images-panel {
    width: 100%;
    height: 100%;
    display: flex;

    .image-container {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center bottom;
      background-size: cover;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        box-shadow: 0px 0px 20px #999 inset;
      }
    }
    .main-image {
      width: calc(100% - 400px);
    }
    .sub-images {
      width: 400px;
      display: flex;
      flex-direction: column;
    }
  }
  .lightbox {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(black, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;

    i {
      color: white;
      font-size: 32px;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        color: grey;
      }
    }
    .imgbox {
      height: 600px;
      margin: 0 85px;
      img {
        height: 600px;
      }
    }
    .information {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      top: calc(100% + 20px);

      .room-name,
      .index {
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 1.67px;
        text-align: right;
      }
    }
  }
}
</style>
