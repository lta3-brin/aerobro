import { io } from 'socket.io-client'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default ({ Vue }) => {
  Vue.prototype.$socket = io(process.env.SOCKET_ADDRESS)
}
