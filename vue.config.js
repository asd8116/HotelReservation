module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/HotelReservation/' : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/scss/all.scss";`
      }
    }
  }
}
