<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { inject, reactive, ref} from 'vue'
import { onMounted } from 'vue'

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
    </tr>
    <tr v-for="(medicine, index) in medicines" :key="index">
      <td>
        <RouterLink :to="{name: 'medicine', params: {_id: medicine._id}}">
          {{medicine.name}}
        </RouterLink>
        
      </td>
      <td>{{medicine.frequency}}</td>
    </tr>
  </table>
  <div >
    
  </div>
</template>
