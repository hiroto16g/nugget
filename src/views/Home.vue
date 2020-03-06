<template>
  <div>
    <div hidden>
      {{ $route.params.id }} 
    </div>
    <HomePC class="pc"></HomePC>
    <HomeSP class="sp"></HomeSP>
  </div>
</template>


<script>
  import HomePC from './HomePC.vue'
  import HomeSP from './HomeSP.vue'
  
  export default {
    name: 'home',
    components: {
      HomePC,
      HomeSP
    }
  }
</script>