<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, inject, reactive, ref } from 'vue'
import cookies from 'vue-cookies'

const axios: any = inject('axios')



const setAuthHeaders = () => {
  const jwt = cookies.get('jwt')
  if (!jwt) return
  axios.defaults.headers.common.Authorization = `Bearer ${jwt}`

}

onMounted(() => {

  // Should be done on router change and not mounted!
  setAuthHeaders()
})


</script>

<template>
  <header>
    Medicine tracker
  </header>

  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink :to="{name: 'login'}">Login</RouterLink>
  </nav>

  <main>
    <RouterView />
  </main>

</template>

<style scoped>




</style>
