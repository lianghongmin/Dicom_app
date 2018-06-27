<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import navHeader from "@/components/Common/header"
export default {
  data(){
     return {
      // title:"我的影像"
     }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
