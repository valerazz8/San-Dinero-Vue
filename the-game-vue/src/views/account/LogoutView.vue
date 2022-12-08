<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <span class="font-semibold mb-4 mx-8 text-center">Хотите выйти из профиля {{this.authStore.email}}?</span>
    <div class="flex">
      <button class="w-24 p-2 m-2 font-semibold bg-lera-red text-white rounded-lg shadow-lg"
      @click="logout()">Выйти</button>
      <button class="w-24 p-2 m-2 font-semibold bg-white rounded-lg shadow-lg"
      @click="() => $emit('closeLogout')">Отмена</button>
    </div>
  </div>

</template>

<script>
import { useAuthStore } from '../../store/AuthStore' 
import { useCharactersStore } from '../../store/CharactersStore' 

export default {
  setup() {
    const authStore = useAuthStore()
    const charactersStore = useCharactersStore()

    return {authStore, charactersStore}
  },
  methods: {
    logout() {
      this.$emit('closeLogout')
      this.authStore.logout()
      this.charactersStore.logout()
      this.$router.push('Login')
    }
  }
}
</script>