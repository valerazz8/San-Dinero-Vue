<template>
  <div class="absolute h-screen w-full top-0 left-0 flex items-center justify-center backdrop-contrast-75 shadow-md" :class="{'hidden': !isActive}" >
   

    <div ref="transactionForm" class="w-full mx-10 bg-white rounded-lg flex flex-col items-center pb-4">
      <div class="w-full flex shadow-md rounded-b-xl rounded-t-lg bg-lera-green-light justify-center mb-4">
        <h2 class="my-4 font-black text-xl text-center">ПЕРЕВОД<br>ПОЛЬЗОВАТЕЛЮ</h2>
      </div>
      <div v-if="isError" class="text-lera-red p-2 mb-4 text-justify">{{errorMessage ? errorMessage : errorMessageDefault}}</div>
      <div class="mb-6 mx-16">
        <label for="code" class="block mb-2 font-medium">Код получателя</label>
        <input type="number" id="code" class="bg-gray-50 border border-lera-green-light rounded-lg shadow-md w-full p-2 tracking-widest text-center font-bold text-xl
        required:border-lera-red invalid:border-lera-red focus:border-lera-blue placeholder-shown:border-lera-green-light valid:border-lera-green-light" placeholder="000000" required min="000000" max="999999" v-model="secret_code">
      </div>
      <div class="mb-8 mx-16">
        <label for="amount" class="block mb-2 font-medium">Сумма перевода</label>
        <div class="flex items-center">
          <input type="number" id="amount" class="bg-gray-50 border border-lera-green-light rounded-lg shadow-md w-full p-2 text-right font-bold text-xl
          required:border-lera-red
          invalid:border-lera-red focus:border-lera-blue placeholder-shown:border-lera-green-light valid:border-lera-green-light" placeholder="0" required min="1" :max="balance.balance" v-model="amount">
          <span class="ml-4 text-xl font-medium">CYN</span>
        </div>
      </div>
      <button class="flex items-center justify-center shadow-md rounded-lg bg-lera-green-light px-4 py-1"
      @click="makeTransaction()" v-if="!isLoading">
        <span class="font-bold">Перевод</span>
        <img class="h-8 w-8" src="@/assets/img/icons/arrow-right.png"/>
      </button>
      <button class="flex items-center justify-center shadow-md rounded-lg bg-lera-green-light px-4 py-1"
      @click="makeTransaction()" disabled v-else>
        <span class="font-bold">Отправка</span>
        <img class="h-8 w-8" src="@/assets/img/icons/arrow-right.png"/>
      </button>
    </div>

    <div class="fixed h-screen w-screen inset-0 -z-10" @click="() => this.$emit('close')"></div>
  </div>
</template>

<script>

import { CHARACTERS_TRANSACTION } from '../../../config/ApiConfig';
import { useAuthStore } from '../../../store/AuthStore';

export default {
  props: {
    isActive: false,
    balance: null,
    characterID: null
  },
  setup() {
    const authStore = useAuthStore()

    return {authStore}
  },
  data() {
    return {
      isLoading: false,
      isError: false,
      errorMessage: '',
      errorMessageDefault: 'Ууууупс. Произошла ошибка при совершении транзакции, проверьте введенные данные или повторите отправку позже.',
      secret_code: null,
      amount: null,
    }
  },
  methods: {
    async makeTransaction() {
      this.isError = false
      this.errorMessage = ''

      if (!this.amount || !this.secret_code) {
        this.isError = true
        this.errorMessage = 'Введи данные'
        return
      }
      
      if (this.balance.balance < this.amount) {
        this.isError = true
        this.errorMessage = 'У тебя нет столько'
        return
      }

      if (this.balance.secret_code === this.secret_code) {
        console.log(this.balance.secret_code)
        this.isError = true
        this.errorMessage = 'Ты кого пытаешься наебать?'
        return
      }

      this.isLoading = true
      // console.log(userToApiLogin(email, password))
      var result = await this.$axios.post(CHARACTERS_TRANSACTION.replace('%character_id%', this.characterID),
        {
          "secret_code": this.secret_code,
          "amount": this.amount
        }, {headers: {
        'Authorization': this.authStore.access_token
      }})
        .then(response => {
          return true
      })
        .catch(error => {
          this.isError=true
          return false
      });

      this.isLoading = false

      if (!this.isError) this.$emit('close')
      this.amount=0
    }
  }
}
</script>

<style>

</style>