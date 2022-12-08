import { defineStore } from 'pinia'
import { LOGIN_URL, userToApiLogin } from "../config/ApiConfig"
import axios from 'axios'

export const useAuthStore = defineStore('profile', {
  state: () => {
    return {
      email: null,
      access_token: '',
      isLoading: false
    }
  },
  getters: {
    isAuthentificated: (state) => !(state.access_token === null || state.access_token === '')
  },
  actions: {
    async loginAsync(email, password) {
      this.isLoading = true
      // console.log(userToApiLogin(email, password))
      var result = await axios.post(LOGIN_URL,
        userToApiLogin(email, password)
      )
        .then(response => {
          if (!response.headers.authorization) {
            console.log(response.headers.authorization?true:false)
            return 'error'
          }
          this.email = email
          this.access_token = response.headers.authorization;
          localStorage.setItem('access_token', this.access_token)
          localStorage.setItem('email', email)
      })
      .catch(error=> {
        return 'error'
      });

      this.isLoading = false
      return result
    },
    logout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('email')
      this.$reset()

      // if (axios.defaults.headers.common['Authorization'])
      //   axios.defaults.headers.common.removeItem['Authorization']
    }
  },
})