<template>
  <div v-if="roomData" class="room-page">
    <RoomImages :imageUrl="roomData.imageUrl" :roomName="roomData.name" />
  </div>
</template>

<script>
import RoomImages from '@/components/RoomImages'

import roomsAPI from '@/api/room'
import { Toast } from '@/utils/helpers'

export default {
  components: {
    RoomImages
  },
  data () {
    return {
      roomData: {}
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
      try {
        let loader = vm.$loading.show()
        const { data } = await roomsAPI.getRoom(roomId)

        vm.roomData = data.room[0]
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
