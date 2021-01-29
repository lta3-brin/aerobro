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
    },
    accSignal () {
      const acc = this.sensor.acc

      if (acc <= process.env.ACC_THRESHOLD_MIN) {
        return 'positive'
      } else if (acc > process.env.ACC_THRESHOLD_MIN && acc <= process.env.ACC_THRESHOLD_MAX) {
        return 'warning'
      } else {
        return 'negative'
      }
    },
    strainSignal1 () {
      const strain1 = this.sensor.strain1

      if (strain1 <= process.env.STRAIN_THRESHOLD_MIN) {
        return 'positive'
      } else if (strain1 > process.env.STRAIN_THRESHOLD_MIN && strain1 <= process.env.STRAIN_THRESHOLD_MAX) {
        return 'warning'
      } else {
        return 'negative'
      }
    },
    strainSignal2 () {
      const strain2 = this.sensor.strain2

      if (strain2 <= process.env.STRAIN_THRESHOLD_MIN) {
        return 'positive'
      } else if (strain2 > process.env.STRAIN_THRESHOLD_MIN && strain2 <= process.env.STRAIN_THRESHOLD_MAX) {
        return 'warning'
      } else {
        return 'negative'
      }
    }
  }
}
