<template>
  <div v-if="roomData" class="room-page">
    <RoomImages :imageUrl="roomData.imageUrl" :roomName="roomData.name" />

    <main class="room">
      <RoomDetail :ini-room="roomData" />
      <Calendar :ini-room="roomData" :booked="booking" />
    </main>
  </div>
</template>

<script>
import RoomImages from '@/components/RoomImages'
import RoomDetail from '@/components/RoomDetail'
import Calendar from '@/components/Calendar'

import roomsAPI from '@/api/room'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    RoomImages,
    RoomDetail,
    Calendar
  },
  data () {
    return {
      roomData: {},
      booking: []
    }
  },
  created () {
    const { roomId } = this.$route.params
    this.fetchRoom(roomId)
  },
  beforeRouteUpdate (to, from, next) {
    // 路由改變時重新抓取資料
    const { roomId } = to.params
    this.fetchRoom(roomId)
    next()
  },
  methods: {
    async fetchRoom (roomId) {
      const vm = this
      let loader = vm.$loading.show()
      try {
        const { data } = await roomsAPI.getRoom(roomId)

        vm.roomData = data.room[0]
        vm.booking = data.booking
        loader.hide()
      } catch (error) {
        loader.hide()
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

<style lang="scss" scoped>
.room-page {
  width: 100%;
  min-width: 1200px;
  padding-bottom: 70px;

  .room {
    max-width: 1200px;
    width: 100%;
    margin: 50px auto 0;
    padding: 0 65px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
