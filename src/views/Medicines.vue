<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { inject, reactive, ref} from 'vue'
import { onMounted } from 'vue'
import MedicineRow from '@/components/MedicineRow.vue';
const axios: any = inject('axios')

const medicines = ref([])

const get_medicines = async () => {
  const {data} = await axios.get('/medicines')
  medicines.value = data
}

onMounted( () => {
  get_medicines()
})

</script>

<template>
  <h1>Medicines</h1>
  <p>
    <RouterLink :to="{name: 'newMedicine'}">New medicine</RouterLink>
  </p>

  <table>
    <tr>
      <th>Name</th>
      <th>Frequency</th>
      <th>Last intake</th>
      <th>Due</th>
      <th>Register intake</th>
      <th>Delete</th>
    </tr>
    <MedicineRow :medicine="medicine" v-for="(medicine, index) in medicines" />
  </table>
  <div >
    
  </div>
</template>

<style scoped>
table {
  width: 100%;
  text-align: center;
}

</style>