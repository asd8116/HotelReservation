import { apiHelper } from '@/utils/helpers'

export default {
  getRooms () {
    return apiHelper.get(`/rooms`)
  },
  getRoom (roomId) {
    return apiHelper.get(`/room/${roomId}`)
  },
  postBookingRoom (roomId, formData) {
    return apiHelper.post(`/room/${roomId}`, formData)
  },
  deleteBookingRoom () {
    return apiHelper.delete(`/rooms`)
  }
}
