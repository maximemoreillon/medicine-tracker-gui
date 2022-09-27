<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Cookies } from 'quasar'

const router = useRouter()

const logout = async () => {
    Cookies.remove('jwt')
    router.push({ name: 'login' })
}

</script>

<template>
<q-btn round flat @click="logout()" icon="logout"/>
</template>

<style scoped>

</style>
