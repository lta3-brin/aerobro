const emitSensor = (io) => {
  setInterval(() => {
    io.emit(process.env.SOCKET_ROOM_DEFAULT, {
      acc: Math.random().toFixed(3),
      strain1: Math.random().toFixed(3),
      strain2: Math.random().toFixed(3)
    })
  }, 1000)
}

module.exports = { emitSensor }
