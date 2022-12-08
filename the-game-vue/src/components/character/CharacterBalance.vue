<template>
  <div class="flex h-full flex-col gap-4" v-if="balance">
    <div class="flex flex-row gap-4">
      <div class="flex w-1/2 h-24 bg-lera-yellow rounded-lg shadow-md px-2 py-1">
        <div class="relative rounded-xl h-full w-full">
          <div class="absolute top-0 left-0 flex flex-col">
            <span class="font-bold text-xl text-white leading-none tracking-wide">{{balance.balance}}</span>
            <span class="font-semibold text-xs text-white leading-none tracking-wide">CYN</span>
          </div>
          <div class="absolute bottom-0 right-0 flex flex-col">
            <span class="text-xs text-white leading-none tracking-wide">1234 9573 8520 0024</span>
            <span class="text-xs text-white leading-none tracking-wide">12/27</span>
          </div>
        </div>
      </div>
      <div class="flex w-1/2">
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-row h-1/2 gap-2">
            <div class="flex items-center justify-center w-2/3 bg-white shadow-md rounded-lg">
              <span v-if="codeShowed" class="text-xl">{{balance.secret_code}}</span>
              <span v-else class="text-xl">******</span>
            </div>
            <div 
              @click="() => codeShowed = !codeShowed"
              class="w-1/3 bg-white shadow-md rounded-lg flex items-center justify-center">
              <img v-if="codeShowed" class="h-8 w-8" src="@/assets/img/icons/eye.png"/>
              <img v-else class="h-8 w-8" src="@/assets/img/icons/eye-closed.png"/>
            </div>
          </div>
          <button class="flex items-center justify-center h-1/2 shadow-md rounded-lg bg-lera-green-light" @click="openTransactionPopup()">
            <span class="font-bold">Перевод</span>
            <img class="h-8 w-8" src="@/assets/img/icons/arrow-right.png"/>
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-col max-h-48 w-full rounded-lg shadow-md bg-white ">
      <div class="flex flex-row justify-between items-center w-full p-2 "
      @click="() => historyShowed = !historyShowed">
        <span class="leading-none font-bold">История операций</span>
        <img class="h-6 w-6" src="@/assets/img/icons/half-arrow-down.png"/>
      </div>
      <div class="flex flex-col p-2 transition ease-in-out duration-150 overflow-scroll" :class="[historyShowed ? 'opacity-100' : 'hidden']">
        <div class="h-8 w-full flex justify-between items-center"
          v-for="transaction in balance.history" :key="transaction.id">
          <div class="w-24 overflow-hidden mx-2 font-semibold">{{transaction.new_value}}</div>
          <div class="h-full w-24 flex flex-col items-center">
            <div class="h-1/3 text-xs text-center" :class="[isAddTransaction(transaction) ? 'text-lera-green' : 'text-lera-red']">{{transactionDifference(transaction)}}</div>
            <img class="h-2/3 w-10 object-fill" :class="{'rotate-180' : isAddTransaction(transaction)}" src="@/assets/img/icons/arrow-right.png"/>
          </div>
          <div class="w-48 overflow-hidden mx-2 text-sm text-right leading-none ">{{transaction.reason}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCharactersStore } from '../../store/CharactersStore'

export default {
  props: {
    balanceProp: null,
    characterID: {
      type: Number
    }
  },

  setup() {
    const characterStore = useCharactersStore()
    
    return {characterStore}
  },

  mounted() {
    if (!this.balanceProp) return

    this.balance = this.balanceProp

    this.characterStore.$subscribe((mutation, state) => {
      // import { MutationType } from 'pinia'
      mutation.type // 'direct' | 'patch object' | 'patch function'
      // same as cartStore.$id
      mutation.storeId // 'cart'
      // only available with mutation.type === 'patch object'
      mutation.payload // patch object passed to cartStore.$patch()

      this.updateBalance()
    })
  },
  data() {
    return {
      balance: null,
      codeShowed: false,
      historyShowed: false
    }
  },
  // watch: {
  //   balanceU
  // },
  
  methods: {
    transactionDifference(transaction) {
      return transaction.new_value - transaction.old_value
    },
    isAddTransaction(transaction) {
      return (this.transactionDifference(transaction) > 0)
    },
    openTransactionPopup() {
      this.$emit('openTransactionPopup')
    },
    updateBalance() {
      this.balance = this.characterStore.getCharacterBalanceByID(this.characterID).data
    }
  }
}
</script>

<style>

</style>