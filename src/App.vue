<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

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
