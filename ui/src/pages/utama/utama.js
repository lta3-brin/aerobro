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
      const addr = process.env.WS_ADDRESS

      this.connection = new WebSocket(addr)
      this.connection.onopen = async () => {
        const pesan = 'Mencoba terhubung dengan socket Aerobro...'

        console.log(pesan)
      }

      this.connection.onmessage = (event) => {
        const data = event.data
        const payload = data.split(',')

        this.$store.commit('jembatan/sensorMutation', {
          acc: parseFloat(payload[0]),
          strain1: parseFloat(payload[1]),
          strain2: parseFloat(payload[2])
        })
      }

      this.connection.onclose = () => {
        const pesan = 'Koneksi tidak terhubung dengan socket Aerobro...'

        console.log(pesan)
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
