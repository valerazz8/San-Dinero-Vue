<template>
  <div class="flex flex-col gap-4 grow">
    <div v-for="healthEl in health" :key="healthEl.name">
      <span class="text-xl font-black">{{healthEl.description}}</span>
      <CharacterHealthProgressBar :healthItem="healthEl" 
      :barColor="healthEl.value > 70 ? 'bg-lera-green' : healthEl.value > 30 ? 'bg-lera-yellow' : 'bg-lera-red'"/>
    </div>
  </div>
</template>

<script>
import CharacterHealthProgressBar from './CharacterHealthProgressBar.vue'
import { CHARACTERS_HEALTH_UPDATE } from '../../config/ApiConfig'
import { useAuthStore } from '../../store/AuthStore'

export default {
  components: { CharacterHealthProgressBar },

  props: {
    health: Object,
    characterID: Number
  },

  mounted() {
    this.updateHealth()
    this.timer = setInterval(() => {
      this.timerFunction()
    }, this.timerOptions.updateTime)
  },

  setup() {
    const authStore = useAuthStore()

    return {authStore}
  },

  data() {
    return {
      timer: null,
      timerOptions: {
        updateTime: 10000
      }
    }
  },

  methods: {
    async timerFunction() {
      await this.updateHealth()
    },
    async updateHealth() {
      var response = await this.$axios.get(CHARACTERS_HEALTH_UPDATE.replace('%character_id%', this.characterID), {headers: {
          'Authorization': this.authStore.access_token
        }
      })
      if (!response) return

      response.data.forEach(healthElement => {
        var currentHealthElement = this.health.find(opt => opt.id === healthElement.id)
        if (currentHealthElement.value === healthElement.value) return

        currentHealthElement.value = healthElement.value
        console.log(currentHealthElement.name + ' updated')
      })
    }
  },
  

  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style>

</style>