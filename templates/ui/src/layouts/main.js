export default {
  name: 'MainLayout',
  data () {
    return {
      tab: ''
    }
  },
  async created () {
    await this.onCreate()
  },
  methods: {
    async onCreate () {
      try {
        const result = await this.$store.dispatch('jembatan/versionAction')

        this.$store.commit('jembatan/setVersionMutation', result[0].name)
      } catch (e) {
        console.log(e.message)
      }
    }
  },
  computed: {
    version: function () {
      return this.$store.getters['jembatan/versionGetter']
    }
  }
}
