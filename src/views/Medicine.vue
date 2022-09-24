<script setup lang="ts">
import { inject, ref } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const axios: any = inject('axios')

const medicine_id = route.params._id
const medicine = ref()


const get_medicine = async () => {
  const { data } = await axios.get(`/medicines/${medicine_id}`)
  medicine.value = data
}

const add_intake = async () => {
  await axios.post(`/medicines/${medicine_id}/intakes`)
  get_medicine()
}

onMounted(() => {
  get_medicine()
})

</script>

<template>
  <h1>Medicine</h1>
  <div>
    <button @click="add_intake()">Register intake</button>
  </div>
  <div>
    {{medicine}}
  </div>
  
</template>
