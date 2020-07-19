<template>
  <img class="avatar-image" :src="src">
</template>


<style>
  .avatar-image {
    border-radius: 50%;
    max-width:100px;
    max-height:100px;
  }
</style>


<script>
  export default {
    props: {
      src: {
        type: String,
        require: false,
        default: 'https://cdn.vuetifyjs.com/images/john.jpg'
      }
    }
  }
</script>