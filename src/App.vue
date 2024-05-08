<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
// import SoyHeader from './components/SoyHeader.vue'
// import SoyFooter from './components/SoyFooter.vue'





const superadmin = false;

function reciboClick(a:string) {
  console.log('click', a)
}
</script>

<template>
  
    <main>
      <br><br><br><br>
      <router-view></router-view>

    </main>
  </template>



