<template>
  <header>
    <div class="fixed top-0 right-0 -z-10">
      <img src="../assets/img/header.png">
    </div>
    <div class="fixed top-3 right-3
    bg-white rounded-full h-8 w-8
    flex items-center justify-center
    shadow-lg z-20"
    v-if="authStore.isAuthentificated"
    @click="() => this.$emit('logoutClicked')">
      <span class="font-mono font-bold leading-none">{{authStore.email.slice(0,2).toUpperCase()}}</span>
    </div>
  </header>
  
</template>

<script>
import { useAuthStore } from '../store/AuthStore' 

export default {
  setup() {
    const authStore = useAuthStore()

    return {authStore}
  },
}
</script>