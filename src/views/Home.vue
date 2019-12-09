<template>
  <main class="landing-page">
    <transition name="fade" v-for="room in rooms" :key="room.id">
      <BackgroundImage :initial-room="room" v-if="hoverRoomId === room.id" />
    </transition>

    <div class="show"></div>

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
        >{{ room.name }}</li>
      </ul>

      <div class="information"></div>
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
        const { data } = await roomsAPI.getRooms()

        vm.rooms = data.items
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
  padding-top: 55px;
  padding-left: 45px;
  display: flex;
  justify-content: space-between;
  .show {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(192, 192, 192, 0.2);
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.35) 100%);
  }
  .img {
    height: 170px;
  }
  .rooms-List {
    background-color: white;
    list-style: none;
    padding-top: 18px;
    padding-left: 34px;
    padding-bottom: 44px;
    padding-right: 34px;
    margin: 0;
    min-width: 305px;
    li.room {
      padding: 18px 0;
      font-size: 14px;
      letter-spacing: 1.5px;
      cursor: pointer;
      &::before {
        content: '';
        display: inline-block;
        width: 23px;
        height: 2px;
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
}
</style>
