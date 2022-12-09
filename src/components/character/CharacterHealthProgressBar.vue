<template>
  <div v-if="!isRefreshing" class="h-7 bg-white relative flex items-center rounded-full my-2 drop-shadow-lg">
    <div v-if="healthItem.value > 13"
      class="text-xs font-semibold 
        text-white text-center whitespace-nowrap
        p-2 leading-none rounded-full 
        transition duration-300 ease-linear"
        :class="barColor" :style="`width: ${healthItem.value}%`">
        <span class="">{{healthItem.value}} %</span>
    </div>
    <div v-else
      class="text-xs font-bold 
      text-lera-red text-center whitespace-nowrap
      p-2 leading-none rounded-full 
      transition duration-300 ease-linear"
      :class="barColor" :style="`width: ${healthItem.value}%`"><span class=" ml-12">{{healthItem.value}} %</span>
    </div>
    
    <button class="absolute right-0 w-10" @click="refreshOption()">
      <img src="../../assets/img/icons/button-add.png">
    </button>
  </div>

  <div v-else class="h-7 bg-white relative flex items-center rounded-full my-2 drop-shadow-lg">
    <div v-if="tmpValue > 13"
      class="text-xs font-semibold 
        text-white text-center whitespace-nowrap
        p-2 leading-none rounded-full 
        transition duration-300 ease-linear bg-lera-blue"
         :style="`width: ${tmpValue}%`">
        <span class="">{{tmpValue}} %</span>
    </div>
    <div v-else
      class="text-xs font-bold 
      text-lera-red text-center whitespace-nowrap
      p-2 leading-none rounded-full 
      transition duration-300 ease-linear bg-lera-blue"
       :style="`width: ${tmpValue}%`"><span class=" ml-12">{{tmpValue}} %</span>
    </div>
    
    <button class="absolute right-0 w-10" @click="refreshOption()">
      <img src="../../assets/img/icons/button-add.png">
    </button>
  </div>
</template>

<script>
import { CHARACTERS_HEALTH_REFRESH } from '../../config/ApiConfig';
import { useAuthStore } from '../../store/AuthStore';

export default {
  props: {
    healthItem: Object,
    barColor: {
      type: String,
      default: 'bg-blue-600'
    },
    characterId: Number
  },
  setup() {
    const authStore = useAuthStore()

    return { authStore }
  },
  data() {
    return {
      isRefreshing: false,
      timer: null,
      tmpValue: 0
    }
  },
  methods: {
    async refreshOption() {
      this.tmpValue = this.healthItem.value
      this.isRefreshing = true
      var response = await this.$axios.post(CHARACTERS_HEALTH_REFRESH.replace('%character_id%', this.characterId),
      {
        "health_option_id": this.healthItem.id
      },
      {
        headers: {
          'Authorization': this.authStore.access_token
        }
      })
      this.$parent.updateHealth()
      this.refreshTimer()
    },

    refreshTimer() {
      this.timer = setInterval(() => {
        if (this.tmpValue < 100)
          this.tmpValue++
        else {
          clearInterval(this.timer)
          this.isRefreshing = false
          return
        }
      }, 25)
    }
  },

  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style>

</style>