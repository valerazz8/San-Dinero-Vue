<template>
  <main v-if="character" class="flex flex-col h-screen overflow-hidden gap-2 pt-6 pb-20">
    <div class="bg-white w-52 mb-1 rounded-full m-auto text-center p-1 text-2xl font-extrabold shadow-md">
      {{character.level}}
    </div>
    
    <div class="bg-white h-32 shrink-0 w-36 m-auto rounded-xl shadow-md" >
      
    </div>
    <div class="text-center w-32 m-auto text-xl font-extrabold leading-6">{{character.name}}</div>

    <div class="flex justify-between gap-2 px-10 my-2">
      <CharacterTabButton 
        v-for="button in character.tabs" :key="button.title" 
        :title="button.title" 
        :isActive="isActive(button.title)"
        @pressed="CharacterTabPressed"/>
    </div>


    <div class="flex grow justify-center pb-2 px-10 overflow-hidden">
      <div
        class="h-full w-full" v-if="currentTab">
        <CharacterStory v-if="currentTab.type==='CharacterStory'" :story="currentTab.data.content"/>
        <CharacterHealth v-if="currentTab.type==='CharacterHealth'" :health="currentTab.data" :characterID="character.id"/>
        <CharacterSkills v-if="currentTab.type==='CharacterSkill'" :characterID="character.id" :skillsProp="currentTab.data"/>
        <CharacterBalance v-if="currentTab.type==='CharacterBalance'" :characterID="character.id" :balanceProp="currentTab.data" @openTransactionPopup="() => isTransactionOpened = true"
          />
        <CharacterAdmin v-if="currentTab.type==='CharacterAdmin'" />
      </div>
    </div>

    <BalanceTransaction v-if="currentTab && currentTab.type==='CharacterBalance'" :isActive="isTransactionOpened" :balance="currentTab.data"
    :characterID="character.id" @close="() => isTransactionOpened = false"/>
  </main>
</template>

<script>
import CharacterTabButton from './CharacterTabButton.vue'
import CharacterStory from './CharacterStory.vue';
import CharacterBalance from './CharacterBalance.vue';
import CharacterSkills from './CharacterSkills.vue';
import CharacterHealth from './CharacterHealth.vue';
import BalanceTransaction from './balance/BalanceTransaction.vue';
import { useCharactersStore } from '../../store/CharactersStore';
import CharacterAdmin from './CharacterAdmin.vue';

export default {
  components: {
    CharacterTabButton,
    CharacterStory,
    CharacterBalance,
    CharacterSkills,
    CharacterHealth,
    BalanceTransaction,
    CharacterAdmin
},

  props: {
    characterID: Number
  },

  setup() {
    const characterStore = useCharactersStore()

    return {characterStore}
  },

  mounted() {
    this.character = this.characterStore.getCharacterByID(this.characterID)

    console.log(this.character)

    if (this.character.tabs)
      this.currentTab = this.character.tabs[0]
  },
  data() {
    return {
      //story, Status, Skills, Money
      character: null,
      currentTab: null,
      isTransactionOpened: false
    }
  }, 
  methods: {
    CharacterTabPressed(buttonTitle) {
      this.currentTab = this.character.tabs.find(tab => {
        return tab.title === buttonTitle
      })
    },
    isActive(viewStatus) {
      if (!this.currentTab) return false

      return this.currentTab.title === viewStatus
    }
  }
}
</script>

<style>

</style>