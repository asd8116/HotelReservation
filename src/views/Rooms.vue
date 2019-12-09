<template>
  <main class="rooms-page">
    <div class="banner">
      <carousel
        :autoplay="true"
        :loop="true"
        :autoplayTimeout="3000"
        :perPage="1"
        :paginationEnabled="false"
        class="bunner-carousel"
      >
        <slide v-for="room in rooms" :key="room.id">
          <div class="slide-content" :style="{ backgroundImage: `url('${room.imageUrl}')` }"></div>
        </slide>
      </carousel>

      <div class="center_banner">
        <router-link to="/rooms" class="logo">
          <img :src="`${basePath}images/logo_white.svg`" alt />
        </router-link>

        <div class="information">
          <div class="social">
            <a href class="social-link instagram">
              <img :src="`${basePath}images/instagram-brands.svg`" alt />
            </a>
            <a href class="social-link facebook">
              <img :src="`${basePath}images/facebook-square-brands.svg`" alt />
            </a>
          </div>

          <div class="line"></div>

          <ul class="contact">
            <li>
              <span class="icon">
                <img :src="`${basePath}images/phone-alt-solid.svg`" alt />
              </span>
              <div class="contant">02-17264937</div>
            </li>
            <li>
              <span class="icon">
                <img :src="`${basePath}images/envelope-solid.svg`" alt />
              </span>
              <div class="contant">whitespace@whitespace.com.tw</div>
            </li>
            <li>
              <span class="icon">
                <img :src="`${basePath}images/home-solid.svg`" alt />
              </span>
              <div class="contant">台北市羅斯福路十段30號</div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="rooms-container container">
      <div class="rooms-list row">
        <div class="col-4 col-pad-6 col-phone-12 item" v-for="room in rooms" :key="room.id">
          <RoomsCard :ini-room="room" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import RoomsCard from '@/components/RoomsCard.vue'

import { Carousel, Slide } from 'vue-carousel'
import roomsAPI from '@/api/room'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    Carousel,
    Slide,
    RoomsCard
  },
  data () {
    return {
      rooms: [],
      basePath: process.env.BASE_URL
    }
  },
  created () {
    this.fetchRooms()
  },
  methods: {
    async fetchRooms () {
      const vm = this
      try {
        let loader = vm.$loading.show()
        const { data } = await roomsAPI.getRooms()

        vm.rooms = data.items
        loader.hide()
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Unavailable',
          text: 'Please Try Later'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.rooms-page {
  width: 100%;

  .banner {
    width: 100%;
    height: 660px;

    .slide-content {
      width: 100%;
      height: 660px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center bottom;
    }
    .center_banner {
      position: absolute;
      top: 155px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;

      .line {
        width: 3px;
        background-color: white;
      }
      .information {
        display: flex;
        margin-top: 50px;

        .social {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 23px;

          .social-link {
            display: inline-block;
            width: 25px;
            height: 25px;
            margin-right: 15px;
          }
        }
        ul.contact {
          list-style: none;
          padding: 0;
          margin: 0;
          margin-left: 30px;

          li {
            display: flex;
            margin-bottom: 14px;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              width: 20px;
              height: 20px;
            }
            .contant {
              font-size: 14px;
              color: white;
              margin-top: 3px;
              margin-left: 12px;
            }
          }
        }
      }
    }
  }
  .rooms-container {
    max-width: 950px;
    top: -105px;
  }
  .rooms-list {
    .item {
      max-width: 300px;
      padding: 0 12px;
      @include phone-width {
        max-width: 350px;
      }
    }
  }
}
</style>
