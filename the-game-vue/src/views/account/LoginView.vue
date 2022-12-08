<template>
  <section class="h-screen">
    <div class="px-6 h-full text-gray-800">
      <div
        class="
          flex
          xl:justify-center
          lg:justify-between
          justify-center
          items-center
          flex-wrap
          h-full
          g-6
        "
      >
        <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
          <form>
            <div v-if="isError">
              <p class="my-2 text-red-800 text-center font-semibold">Проверьте логин и пароль</p>
            </div>
            <!-- Email input -->
            <div class="mb-6">
              <input
                id="email"
                type="text"
                class="form-control block w-full px-4
                  py-2
                  text-xl
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700
                  focus:bg-white
                  focus:border-blue-600
                  focus:outline-none
                "
                placeholder="Login"
                v-model="email"
              />
            </div>

            <!-- Password input -->
            <div class="mb-6">
              <input
                type="password"
                class="
                  form-control
                  block
                  w-full
                  px-4
                  py-2
                  text-xl
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700
                  focus:bg-white
                  focus:border-blue-600
                  focus:outline-none
                "
                id="password"
                placeholder="Password"
                v-model="password"
              />
            </div>

            <div class="text-center lg:text-left">
              <button
                type="button"
                class="
                  inline-block
                  px-7
                  py-3
                  bg-blue-600
                  text-white
                  font-medium
                  text-sm
                  leading-snug
                  uppercase
                  rounded
                  shadow-md
                  hover:bg-blue-700 hover:shadow-lg
                  focus:bg-blue-700
                  focus:shadow-lg
                  focus:outline-none
                  focus:ring-0
                  active:bg-blue-800 active:shadow-lg
                  transition
                  duration-150
                  ease-in-out
                "
                @click="onSubmit()"
              >
              <span v-if="authStore.isLoading">Loading</span>
              <span v-else>Войти</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from '../../store/AuthStore'

export default {
  data() {
    return {
      email: '',
      password: '', 
      access_token: '',
      isError: false,
    }
  },
  setup() {
    const authStore = useAuthStore()

    // authStore.$subscribe((mutation, state) => {
    //   mutation.type,
    //     mutation.storeId,
    //     mutation.payload

    //   console.log(state.isLoading)
    // })
    
    return {
      authStore,
    }
  },
  methods: {
    mounted() {
      window.location.replace("./character");
    },
    async onSubmit() {
      await this.loginQuery()
    },
    async loginQuery() {
      var result = await this.authStore.loginAsync(this.email, this.password);

      if (result === 'error') {
        this.isError = true
        return
      }

      this.$router.push('Character')
    }
  },
};
</script>

<style>
</style>