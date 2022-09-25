<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, inject, reactive, ref } from 'vue'

const axios: any = inject('axios')



</script>

<template>
  <header>
    Medicine tracker
  </header>

  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink :to="{name: 'login'}">Login</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>

  <main>
    <RouterView />
  </main>

</template>

<style scoped>




</style>
