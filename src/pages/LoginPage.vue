<script setup lang="ts">
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { api } from 'src/boot/axios'
import { Cookies } from 'quasar'

const router = useRouter()

const loading = ref(false)

const credentials = reactive({
    username: '',
    password: ''
})

const loggedIn = ref()


const login = async () => {

    try {
        loading.value = true
        const url = import.meta.env.VITE_LOGIN_URL
        const { data: { jwt } } = await api.post(url, credentials)
        Cookies.set('jwt', jwt)
        router.push({name: 'medicines'})
    } catch (error) {
        alert('Login failed')
        console.error(error)
    }
    finally {
        loading.value = false
    }

}





</script>

<template>
<q-layout view="lHh Lpr lFf">
    <q-page padding>
        <q-card>
            <q-card-section>
                <div class="text-h6">Login</div>
                <!-- <div class="text-subtitle2">by John Doe</div> -->
            </q-card-section>
            <q-form @submit="login()" class="q-gutter-md" v-if="!loggedIn">
                <q-card-section>
                    <q-input v-model="credentials.username" label="Username" hint="Your username" />
                    <q-input v-model="credentials.password" label="password" hint="Your password" type="password" />
                </q-card-section>
                <q-card-actions align="center">
                    <q-btn label="Login" type="submit" color="primary" :loading="loading"/>
                </q-card-actions>
            </q-form>
        </q-card>
            
    </q-page>
</q-layout>


</template>

<style scoped>

</style>
