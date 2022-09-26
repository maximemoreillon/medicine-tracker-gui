<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive, ref, onMounted, computed } from 'vue'
import { api } from 'src/boot/axios'
import { Cookies } from 'quasar'

const router = useRouter()


const credentials = reactive({
    username: '',
    password: ''
})

const loggedIn = ref()


const login = async () => {

    try {
        const url = import.meta.env.VITE_LOGIN_URL
        const { data: { jwt } } = await api.post(url, credentials)
        Cookies.set('jwt', jwt)
        // router.push({name: 'medicines'})
        checkAuth()
    } catch (error) {
        alert('Login failed')
        console.error(error)
    }

}

const logout = async () => {

    try {
        Cookies.remove('jwt')
        checkAuth()
    } catch (error) {
        alert('Login failed')
        console.error(error)
    }

}

const checkAuth = () => {
    loggedIn.value = !!Cookies.get('jwt')
}

onMounted(() => {
    checkAuth()
})

</script>

<template>
<q-page padding>
    <q-form @submit="login()" class="q-gutter-md" v-if="!loggedIn">
        <q-input v-model="credentials.username" label="Username" hint="Your username" />
        <q-input v-model="credentials.password" label="password" hint="Your password" type="password" />
        <q-btn label="Login" type="submit" color="primary" />
    </q-form>
    <q-btn label="Logout" @click="logout()" color="primary" v-else/>
</q-page>
</template>

<style scoped>

</style>
