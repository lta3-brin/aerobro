const disconnectHandler = (socket) => {
  socket.on('disconnect', () => {
    console.log('pengguna tidak terhubung.');
  })
}

module.exports = { disconnectHandler }
