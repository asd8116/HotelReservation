import { apiHelper } from '@/utils/helpers'

export default {
  getRooms () {
    return apiHelper.get(`/rooms`)
  },
  getRoom (roomId) {
    return apiHelper.get(`/room/${roomId}`)
  },
  postBooking (roomId, formData) {
    return apiHelper.post(`/room/${roomId}`, formData)
  },
  deleteBooking () {
    return apiHelper.delete(`/rooms`)
  }
}
