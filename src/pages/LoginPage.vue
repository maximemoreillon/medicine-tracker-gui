<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import { Cookies } from 'quasar'

const router = useRouter()


const credentials = reactive({
    username: '',
    password: ''
})

const login = async () => {

    try {
        const url = import.meta.env.VITE_LOGIN_URL
        const { data: { jwt } } = await api.post(url, credentials)
        Cookies.set('jwt', jwt)
        router.push({name: 'medicines'})
    } catch (error) {
        alert('Login failed')
        console.error(error)
    }

}


</script>

<template>
<q-page padding>
    <q-form @submit="login()" class="q-gutter-md">

        <q-input v-model="credentials.username" label="Username" hint="Your username" />
        <q-input v-model="credentials.password" label="password" hint="Your password" type="password" />
        <q-btn label="Login" type="submit" color="primary" />
    </q-form>
</q-page>
</template>

<style scoped>

</style>
