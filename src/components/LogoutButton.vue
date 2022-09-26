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
<q-btn label="Logout" @click="logout()" color="primary" icon="logout"/>
</template>

<style scoped>

</style>
