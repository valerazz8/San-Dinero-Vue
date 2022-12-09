<template>
  <div ref="transactionForm" class="w-full rounded-lg flex flex-col items-center pb-4 px-2">
    <div v-if="isError" class="text-center text-lera-red mb-2 leading-none text-xs">{{errorMessage ? errorMessage : errorMessageDefault}}</div>
    
    <div class="mb-2">
      <label for="amount" class="block mb-1 font-medium text-xs">Сумма перевода</label>
      <div class="flex items-center">
        <input type="number" id="amount" class="bg-gray-50 border 
        -lera-green-light rounded-lg shadow-md w-full p-1 text-right font-bold text-xs
        required:border-lera-red
        invalid:border-lera-red focus:border-lera-blue placeholder-shown:border-lera-green-light valid:border-lera-green-light" placeholder="0" required min="1" v-model="amount">
        <span class="ml-4 font-medium">CYN</span>
      </div>
    </div>
    <div class="mb-2">
      <label for="amount" class="block mb-1 font-medium text-xs">Причина перевода</label>
      <div class="flex items-center">
        <textarea type="text" id="amount" rows="5" class="bg-gray-50 border border-lera-green-light rounded-lg shadow-md w-full p-1 font-bold text-xs
        required:border-lera-red
        invalid:border-lera-red focus:border-lera-blue placeholder-shown:border-lera-green-light valid:border-lera-green-light" placeholder="причина" v-model="reason"></textarea>
      </div>
    </div>
    <button class="flex items-center justify-center shadow-md rounded-lg bg-lera-green-light px-4 py-1 mt-4"
    @click="makeTransaction()" v-if="!isLoading">
      <span class="font-bold">Перевод</span>
      <img class="h-4 w-4" src="@/assets/img/icons/arrow-right.png"/>
    </button>
    <button class="flex items-center justify-center shadow-md rounded-lg bg-lera-green-light px-4 py-1 mt-2"
    @click="makeTransaction()" disabled v-else>
      <span class="font-bold">Отправка</span>
      <img class="h-4 w-4" src="@/assets/img/icons/arrow-right.png"/>
    </button>
  </div>
</template>

<script>
import { ADMIN_UPDATE_BALANCE } from '../../../config/ApiConfig'
import { useAuthStore } from '../../../store/AuthStore'

export default {
  setup() {
    const authStore = useAuthStore()

    return { authStore }
  },
  data() {
    return {
      isLoading: false,
      amount: null,
      mode: 'increase',
      reason: '',
      isError: false,
      errorMessage: '',
      errorMessageDefault: 'error'
    }
  },
  methods: {
    async makeTransaction() {
      this.isError = false
      this.errorMessage = ''

      this.isLoading = true

      if (this.amount < 0 && Math.abs(this.amount) > this.$parent.currentCharacter.balance) {
        this.amount = -this.$parent.currentCharacter.balance
        this.isError = true
        this.errorMessage = 'У персонажа нет столько денег'
        this.isLoading = false
        return
      }

      // console.log(userToApiLogin(email, password))
      var result = await this.$axios.post(ADMIN_UPDATE_BALANCE,
        {
          "character_id": this.$parent.currentCharacter.id,
          "amount": this.amount,
          "reason": this.reason,
          "mode": this.mode
        }, {headers: {
        'Authorization': this.authStore.access_token
      }})
        .then(response => {
          return true
      })
        .catch(error => {
          this.isError = true
          this.errorMessage = error.response.data
          return false
      });

      this.isLoading = false

      if (result) {
        this.amount = 0,
        this.reason = ''
      }
    }
  }
}
</script>

<style>

</style>