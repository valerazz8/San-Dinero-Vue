import { defineStore } from 'pinia'
import { useAuthStore } from './AuthStore'
import axios from 'axios'
import { ADMIN_CHARACTERS } from '../config/ApiConfig'

export const useAdminsStore = defineStore('admin', {
  state: () => {
    return {
      characters: null,
      isLoading: false
    }
  },
  getters: {

  },
  actions: {
    async init() {
      this.isLoading = true
      const authStore = useAuthStore()

      if (!authStore.isAuthentificated) return

      var response = await axios.get(ADMIN_CHARACTERS, {headers: {
        'Authorization': authStore.access_token
      }
      })
      this.characters = response.data.characters
      console.log(this.characters)
      this.isLoading = false
    },
    logout() {
    }
  },
})