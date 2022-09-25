<script setup lang="ts">
import { inject, ref, reactive, computed } from 'vue'
import type { Ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const axios: any = inject('axios')

const medicine_id = route.params._id

type Intake = {
  date: Date
  _id: String,

}

type Medicine = {
  name: string
  _id: string
  intake: [Intake]
}

const medicine = ref()


const isDue = computed(() => {
  // Massively dirty
  if (!medicine.value) return
  if (!medicine.value.intake.length) return
  const lastItemIndex = medicine.value.intake.length - 1
  const lastIntakeDate = new Date(medicine.value.intake[lastItemIndex].date)
  const numberOfDaysToAdd = 1 / medicine.value.frequency
  const dueTime = lastIntakeDate.setDate(lastIntakeDate.getDate() + numberOfDaysToAdd)
  return new Date() > new Date(dueTime)

})





const get_medicine = async () => {
  const { data } = await axios.get(`/medicines/${medicine_id}`)
  medicine.value = data
}

const delete_medicine = async () => {
  if(!confirm(`Delete medicine?`)) return
  await axios.delete(`/medicines/${medicine_id}`)
  router.push({name: 'medicines'})
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
  <div class="buttons_wrapper">
    <button @click="add_intake()">Register intake</button>
    <button @click="delete_medicine()">Delete medicine</button>
  </div>
  <template v-if="medicine">
    <p>
      Name: {{medicine.name}}
    </p>
    <p>
      Frequency: {{medicine.frequency}}
    </p>
    <p>
      Due: {{isDue}}
    </p>
    <h2>Intake</h2>
    <ul>
      <li v-for="(intake, index) in medicine.intake" :key="index">
        {{new Date(intake.date).toDateString()}}
      </li>
    </ul>
    
  </template>
  
  
</template>

<style scoped>
.buttons_wrapper{
  display: flex;
  gap: 0.5em;
}
</style>