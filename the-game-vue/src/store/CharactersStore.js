import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'
import axios from 'axios'
import { CHARACTERS } from '../config/ApiConfig'

export const useCharactersStore = defineStore('character', {
  state: () => {
    return {
      characters: null,
      isLoading: false
    }
  },
  getters: {
    getCharacterByID: (state) => {
      return (id) => 
        state.characters.find((character) => character.id == id)
    },
    getCharacterBalanceByID: (state) => {
      return (id) => {
        var character = state.getCharacterByID(id)
        return character.tabs.find(tab => tab.title === 'balance')
      }
    },
    getCharacterSkillsByID: (state) => {
      return (id) => {
        var character = state.getCharacterByID(id)
        return character.tabs.find(tab => tab.title === 'skills')
      }
    }
  },
  actions: {
    async init() {
      const authStore = useAuthStore()

      if (!authStore.isAuthentificated) return

      var response = await axios.get(CHARACTERS, {headers: {
        'Authorization': authStore.access_token
      }
      })
      this.characters = response.data
    },
    logout() {
    }
  },
})