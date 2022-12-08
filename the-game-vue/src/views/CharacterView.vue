<template>
  <div class="fixed h-screen w-screen">
    <div class="flex flex-row overflow-scroll snap-x" v-if="(charactersStore.characters!=null && charactersStore.characters.length > 0)">
      <div class="snap-center w-screen min-w-full" v-for="character in charactersStore.characters" :key="character.name">
        <CharacterComponent :characterID="character.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterComponent from '../components/character/CharacterComponent.vue'
import { useAuthStore } from '../store/AuthStore'
import { useCharactersStore } from '../store/CharactersStore'

export default {
  components: { CharacterComponent },

  setup() {
    const authStore = useAuthStore()
    const charactersStore = useCharactersStore()

    return {
      authStore, charactersStore
    }
  },

  async mounted() {
    await this.timerFunction()

    this.timer = setInterval(() => {
      this.timerFunction()
    }, this.timerOptions.updateTime)
  },

  data() {
    return {
      timerOptions: {
        updateTime: 10000
      }
    }
  },

  methods: {
    async timerFunction() {
      console.log('updating characters')

      var copy = JSON.parse(JSON.stringify(this.charactersStore.characters));
      await this.updateCharacters()

      
      console.log(this.charactersStore.characters)

      
    },

    async updateCharacters() {
      await this.charactersStore.init()
    },
  },

  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style>

</style>