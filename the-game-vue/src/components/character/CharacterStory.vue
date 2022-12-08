<template>
  <div class="overflow-scroll h-full text-justify
  bg-white/30 rounded-2xl p-4 px-2 drop-shadow-lg ">
    <div>{{story}}</div>
  </div>
</template>

<script>
export default {
  props: {
    story: {
      type: String,
      default: 'описание персонажа'
    }
    
  }
}
</script>

<style>

</style>