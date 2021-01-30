const connectionErrorHandler = (socket) => {
  socket.on('connect_failed', () => {
    console.log('Koneksi ke socket gagal...🙏🏻')
  })
}

const onErrorHandler = (socket) => {
  socket.on('error', (message) => {
    console.log(`Terjadi kesalahan: ${message}`)
  })
}

module.exports = {
  connectionErrorHandler,
  onErrorHandler
}
