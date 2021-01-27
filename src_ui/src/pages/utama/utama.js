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
  },
  methods: {
    goToExternal (url) {
      openURL(url, null, { noopener: true, noreferrer: true })
    }
  }
}
