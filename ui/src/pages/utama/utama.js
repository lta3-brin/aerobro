import { openURL } from 'quasar'
import Jembatan from 'src/components/jembatan/Jembatan'

export default {
  name: 'PageIndex',
  components: {
    Jembatan
  },
  data () {
    return {
      connection: null,
      jembatanHeight: 0
    }
  },
  mounted () {
    this.jembatanHeight = window.innerHeight - 82
    this.onListenSocket()
  },
  destroyed () {
    this.connection.close()
  },
  methods: {
    goToExternal (url) {
      openURL(url, null, { noopener: true, noreferrer: true })
    },
    onListenSocket () {
      const protokol = window.location.protocol

      this.connection = new EventSource(`${protokol}//${process.env.STREAM_ADDRESS}/stream`)

      this.connection.onmessage = (event) => {
        const data = event.data.split(',')
        const payload = {
          acc: data[0],
          strain1: data[1],
          strain2: data[2]
        }

        this.$store.commit('jembatan/sensorMutation', payload)
      }
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
