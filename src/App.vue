<template>
  <div class="h-screen w-full overflow-hidden">
    <!-- <div class="absolute top-0 left-0 w-full opacity-30">
      <img src="./assets/img/iPhone 14 - 13.png">
    </div> -->

    <TheHeader @logoutClicked="toggleLogout()"/>

    <TheLogout v-if="showLogoutView" @closeLogout="toggleLogout()"/>
    <RouterView v-else/>

    <TheFooter/>
  </div>
  
</template>


<script>
import { RouterLink, RouterView } from "vue-router"
import TheFooter from "./components/TheFooter.vue"
import TheHeader from "./components/TheHeader.vue"
import TheLogout from "./views/account/LogoutView.vue"
import { useAuthStore } from "./store/AuthStore"

export default {
  components: {
    TheFooter, TheHeader, TheLogout
  },
  setup() {
    const authStore = useAuthStore()

    return {authStore}
  },
  data() {
    return {
      access_token: '',
      showLogoutView: false
    }
  },
  mounted() {
    if (!this.authorize()) return
  },
  methods: {
    authorize() {
      this.access_token = localStorage.getItem('access_token')
      // console.log(this.access_token)

      if (!this.access_token) {
        this.$router.push('login')
        return false
      }

        this.authStore.access_token = localStorage.getItem('access_token')
        this.authStore.email = localStorage.getItem('email')
        return true
    },
      
    toggleLogout() {
      this.showLogoutView = !this.showLogoutView
    }
  },

}
</script>