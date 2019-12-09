<template>
  <main class="landing-page">
    <transition name="fade" v-for="(room, index) in rooms" :key="index">
      <BackgroundImage :ini-room="room" :ini-index="index + 1" v-if="hoverRoomId === room.id" />
    </transition>

    <router-link to="/rooms" class="img">
      <img :src="`${basePath}images/logo_white.svg`" alt />
    </router-link>

    <div class="list-infor">
      <ul class="rooms-List">
        <li
          class="room"
          v-for="room in rooms"
          :class="room.id === hoverRoomId ? 'active' : ''"
          :key="room.id"
          @mouseover="mouseOver(room.id)"
          @mouseout="isPaused = false"
        >
          <router-link :to="{ name: 'room', params: { roomId: room.id }}">{{ room.name }}</router-link>
        </li>
      </ul>

      <div class="information">
        <div class="social">
          <a href class="social-link facebook">
            <img :src="`${basePath}images/facebook-square-brands.svg`" alt />
          </a>
          <a href class="social-link instagram">
            <img :src="`${basePath}images/instagram-brands.svg`" alt />
          </a>
        </div>

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
  </main>
</template>

<script>
import BackgroundImage from '@/components/BackgroundImage'

import roomsAPI from '@/api/room'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    BackgroundImage
  },
  data () {
    return {
      rooms: [],
      hoverRoomId: 0,
      // interval: null,
      isPaused: false,
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
        let loader = this.$loading.show()
        const { data } = await roomsAPI.getRooms()

        vm.rooms = data.items
        loader.hide()
        Toast.fire({
          icon: 'success',
          title: 'Get All Rooms'
        })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Unavailable',
          text: 'Please Try Later'
        })
      }
    },
    mouseOver (id) {
      this.hoverRoomId = id
      this.isPaused = true
    }
  }
}
</script>

<style lang="scss" scoped>
main.landing-page {
  width: 100%;
  height: 100%;
  padding: 55px 0 35px 45px;
  display: flex;
  justify-content: space-between;

  .img {
    height: 170px;
  }
  .list-infor {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .rooms-List {
    background-color: white;
    list-style: none;
    padding: 18px 34px 50px;
    margin: 0;
    min-width: 305px;

    &::after {
      content: '';
      width: 280px;
      height: 20px;
      position: absolute;
      top: 100%;
      right: 0;
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
    li a {
      color:#000;
    }
    li.room {
      padding: 16px 0;
      font-size: 14px;
      letter-spacing: 1.5px;
      cursor: pointer;

      &::before {
        content: '';
        display: inline-block;
        width: 23px;
        height: 3px;
        background-color: #696969;
        opacity: 0;
        visibility: hidden;
        position: absolute;
        top: 50%;
        left: -34px;
        transform: translateY(-50%);
        transition: 0.3s;
      }
      &.active {
        &::before {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
  .information {
    width: 100%;
    padding-left: 25px;

    .social {
      display: flex;

      .social-link {
        width: 25px;
        height: 25px;
        margin-right: 15px;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }
    ul.contact {
      list-style: none;
      padding: 0;
      margin-top: 50px;

      li {
        display: flex;
        margin-bottom: 14px;
        &:last-child {
          margin-bottom: 0;
        }

        .icon {
          width: 20px;
          height: 20px;
          img {
            object-fit: cover;
          }
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
</style>
