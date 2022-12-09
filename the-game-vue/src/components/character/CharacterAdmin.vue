<template>
  <div>
    <div v-if="adminStore.isLoading">
      Loading
    </div>
    <div v-else>
      <div class="flex flex-col gap-2">
        <div>
          <button class="m-1 rounded-lg shadow-md overflow-hidden p-2 bg-white border-b-2"
            v-for="character in adminStore.characters" :key="character.id"
            :class="{'bg-lera-yellow': (currentCharacter && character.id === currentCharacter.id)}"
            @click="() => currentCharacter = character">
            <span class="flex w-full whitespace-nowrap truncate text-sm leading-none">{{character.name}}</span>
          </button>
        </div>

        <div v-if="(currentCharacter)">
          <div class="flex">
            <div class="w-1/2">
              <h3 class="text-center align-middle font-bold">Перевод</h3>
              <AdminTransaction/>
            </div>

            <div class="flex flex-col grow">
              <div>
                <h3 class="text-center align-middle font-bold">Скилы</h3>
              </div>
              <div>
                <h3 class="text-center align-middle font-bold">Здоровье</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAdminsStore } from '../../store/AdminStore';
import AdminTransaction from './admin/AdminTransaction.vue';

export default {
  components: { AdminTransaction },
  setup() {
    const adminStore = useAdminsStore()
    return {adminStore}
  },
  mounted() {
    this.adminStore.init()

    if (this.adminStore.characters)
      this.currentCharacter = this.adminStore.characters[0]
  },
  data() {
    return {
      currentCharacter: null
    }
  }
}
</script>

<style>

</style>