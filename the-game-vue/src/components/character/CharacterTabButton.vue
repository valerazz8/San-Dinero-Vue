<template>
  <button class="flex rounded-lg justify-center items-center w-16 h-16 shadow-md"
    :class="[isActive ? 'bg-lera-green' : 'bg-white']"
    @click="$emit('pressed', title)">
    <img class="h-8 fill-current" :src="iconProcced">
  </button>
</template>

<script>
export default {
  props: {
    title: String,
    isActive: {
      default: false
    }
  },
  computed: {
    iconProcced() {
      // var images = require.context('../assets/img/')
      if (this.isActive) {
        return `../src/assets/img/icons/${this.title}-white.png`;
      } else {
        return `../src/assets/img/icons/${this.title}.png`;
      }
    }
  }
}
</script>

<style>

</style>