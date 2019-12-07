import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'https://challenge.thef2e.com/api/thef2e2019/stage6'

const axiosInstance = axios.create({
  baseURL
})

// axiosInstance.defaults.withCredentials = true
axiosInstance.interceptors.request.use(
  config => {
    const token = 'Cl3TtbHONsf7FpEruEjZjyReQR5IGb1KWNbzOAhSUgP12FHTW8LkYXF0L8Ab'
    config.headers['Authorization'] = `Bearer ${token}`

    return config
  },
  err => Promise.reject(err)
)

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
