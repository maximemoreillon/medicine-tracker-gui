<script setup lang="ts">
import { useRouter } from 'vue-router'
import { inject, reactive } from 'vue'

const axios: any = inject('axios')
const router = useRouter()


const userInput = reactive({
    name: '',
    frequency: '',
})

const submit = async () => {
    const { data: {_id} } = await axios.post('/medicines', userInput)
    router.push({name: 'medicine', params: {_id}})
}

</script>

<template>
    <h1>New medicine</h1>
    <form @submit.prevent="submit()">
        <input type="text" v-model="userInput.name" placeholder="Name">
        <input type="number" v-model.number="userInput.frequency" placeholder="Frequency">
        <button type="submit">submit</button>
    </form>
</template>
