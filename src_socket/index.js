const app = require('express')()
const http = require('http').createServer(app)

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
})

const handleDisconnect = require('./handlers/disconnectHandler')
const handleEmit = require('./handlers/emitHandler')


app.get('/', (req, res) => {
  res.send('<p>Halaman ini sengaja dikosongkan.</p>')
})

io.on('connection', (socket) => {
  console.log('pengguna terhubung', socket.id)

  handleEmit.emitSensor(io)
  handleDisconnect.disconnect(socket)
})

if (process.env.SOCKET_PORT) {
  http.listen(process.env.SOCKET_PORT, () => {
    console.log('Server socket berhasil dijalankan *:3000')
  })
} else {
  console.log('Definisikan Env. untuk SOCKET_PORT')
}
