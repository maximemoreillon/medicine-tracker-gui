<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { inject, reactive, ref, onMounted } from 'vue'
import cookies from 'vue-cookies'

const axios: any = inject('axios')



const credentials = reactive({
    username: '',
    password: ''
})

const login = async () => {

    try {
        const url = import.meta.env.VITE_LOGIN_URL
        // console.log(url)
        const { data: { jwt } } = await axios.post(url, credentials)
        cookies.set('jwt', jwt)
        alert('Login successful')
    } catch (error) {
        alert('Login failed')
        console.error(error)
    }

    

}

</script>

<template>
    <h1>Login</h1>
    <form @submit.prevent="login()">
    <div>
        <input type="text" v-model="credentials.username">
    </div>
    <div>
        <input type="password" v-model="credentials.password">
    </div>
    <div>
        <button type="submit">Login</button>
    </div>

    </form>

</template>

<style scoped>

</style>
