const app = require('express')()
const http = require('http').createServer(app)

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET'],
  }
})

const handleEmit = require('./handlers/emitHandler')
const handleError = require('./handlers/errorHandler')
const handleDisconnect = require('./handlers/disconnectHandler')


app.get('/', (req, res) => {
  res.send('<p>Halaman ini sengaja dikosongkan.</p>')
})

io.on('connection', (socket) => {
  console.log('📡 pengguna terhubung', socket.id)

  handleEmit.emitSensor(io)
  handleDisconnect.disconnectHandler(socket)
  handleError.connectionErrorHandler(socket)
  handleError.onErrorHandler(socket)
})

if (process.env.SOCKET_PORT) {
  http.listen(process.env.SOCKET_PORT, () => {
    console.log(`Server socket berhasil dijalankan *:${ process.env.SOCKET_PORT } 🚀`)
  })
} else {
  console.log('Definisikan Env. untuk SOCKET_PORT')
}
