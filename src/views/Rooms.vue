<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import roomsAPI from '@/api/room'
import { Toast } from '@/utils/helpers'

export default {
  data () {
    return {
      rooms: []
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
    }
  }
}
</script>
