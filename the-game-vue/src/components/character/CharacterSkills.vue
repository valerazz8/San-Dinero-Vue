<template>
  <div class="flex flex-col">
    <h2 class="mt-2 my-4 text-xl font-bold leading-none text-center w-full">Навыки</h2>
    <div class="grid grid-cols-2 gap-4" v-if="skills">
      <div v-for="skill in skills" :key="skill.name" class="h-24 flex flex-col items-center justify-center bg-white border-2 rounded-xl overflow-hidden"
      :class="[skill.visible ? 'border-lera-yellow bg-lera-yellow-light' : 'opacity-30 border-black bg-white']">
        <img class="h-12" :src="`../../assets/img/icons/${skill.name}.png`" :alt="skill.name">
        <span class="text-center leading-none">{{skill.visible ? skill.description  : '?????'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useCharactersStore } from '../../store/CharactersStore'

export default {

  props: {
    skillsProp: Array,
    characterID: Number 
  }, 
  setup() {
    const characterStore = useCharactersStore()

    return { characterStore }
  },
  mounted() {
    if (!this.skillsProp) return

    this.skills = this.skillsProp

    this.characterStore.$subscribe((mutation, state) => this.updateSkills())
  },
  data() {
    return {
      skills: null
    }
  },
  methods: {
    updateSkills() {
      this.skills = this.characterStore.getCharacterSkillsByID(this.characterID).data
    }
  }
}
</script>

<style>

</style>