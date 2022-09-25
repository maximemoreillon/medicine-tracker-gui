<script setup lang="ts">
import { useRouter } from 'vue-router'
import { inject, reactive, ref, onMounted } from 'vue'
import { useCookies } from "vue3-cookies";


const axios: any = inject('axios')
const { cookies } = useCookies()
const router = useRouter()


const credentials = reactive({
    username: '',
    password: ''
})

const login = async () => {

    try {
        const url = import.meta.env.VITE_LOGIN_URL
        const { data: { jwt } } = await axios.post(url, credentials)
        cookies.set('jwt', jwt)
        router.push({name: 'medicines'})
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
            <label for="username">Username</label>
            <input type="text" v-model="credentials.username" id="username">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" v-model="credentials.password" id="password">
        </div>
        <div>
            <button type="submit">Login</button>
        </div>

    </form>

</template>

<style scoped>

form {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
}
form > div {
    display: flex;
    gap: 0.5em;
}

label {
    flex-basis: 5em;
}
</style>
