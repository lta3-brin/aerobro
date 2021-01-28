import { openURL } from 'quasar'
import Jembatan from 'src/components/jembatan/Jembatan'

export default {
  name: 'PageIndex',
  components: {
    Jembatan
  },
  data () {
    return {
      jembatanHeight: 0
    }
  },
  mounted () {
    this.jembatanHeight = window.innerHeight - 82
    this.onListenSocket()
  },
  methods: {
    goToExternal (url) {
      openURL(url, null, { noopener: true, noreferrer: true })
    },
    onListenSocket () {
      this.$socket.on(process.env.SOCKET_ROOM_DEFAULT, (message) => {
        this.$store.commit('jembatan/sensorMutation', message)
      })
    }
  },
  computed: {
    sensor () {
      return this.$store.getters['jembatan/sensorGetter']
    }
  }
}
