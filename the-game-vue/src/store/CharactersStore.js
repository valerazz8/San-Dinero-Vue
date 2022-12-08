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
      if (!this.characters) {
        this.characters = response.data
        return
      }

      this.characters = response.data

      // this.characters.forEach((character) => {
      //   var balance = character.tabs.find(tab => tab.title === 'balance')
      //   console.log(character.tabs.find(tab => tab.title === 'balance'))
      //   if (balance) {
      //     var response_character = response.data.find(response_character => response_character.id === character.id)
      //     var response_character_balance = response_character.tabs.find(tab => tab.title === 'balance')

      //     if (balance.data.balance !== response_character_balance.data.balance) {
            
      //     }
      //   }
      // })
    },
    logout() {
      // localStorage.removeItem('characters')
    }
  },
})