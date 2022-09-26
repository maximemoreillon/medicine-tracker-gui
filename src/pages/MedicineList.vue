<script setup lang="ts">
import AddMedicineDialog from 'src/components/AddMedicineDialog.vue'

import { api } from 'src/boot/axios'
import { Medicine } from 'src/components/models'

import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'

const medicines = ref([])

const columns = ref([
  { name: 'medicineName', label: 'Name', field: 'name', sortable: true },
  { name: 'frequency', label: 'Frequency', field: 'frequency', sortable: true },
  { name: 'lastIntake', label: 'Last Intake', field: 'lastIntake', sortable: true },
  { name: 'registerIntake', label: 'Register Intake', field: 'registerIntake', sortable: false },
  { name: 'deleteMedicine', label: 'Delete', field: 'deleteMedicine', sortable: false },
])

const get_medicines = async () => {
  const { data } = await api.get('/medicines')
  medicines.value = data
}

const getLastInstakeOf = (medicine: Medicine) => {
  const {intake} = medicine
  if(!intake || !intake.length) return
  const lastIndex = intake.length -1
  return new Date(intake[lastIndex].date).toDateString()
}

const registerIntake = async (medicine: Medicine) => {
  await api.post(`/medicines/${medicine._id}/intakes`)
  get_medicines()
}

const deleteMedicine = async (medicine: Medicine) => {
  await api.delete(`/medicines/${medicine._id}`)
  get_medicines()
}

onMounted(() => {
  get_medicines()
})

</script>


<template>
  <q-page padding>


        <q-table title="Medicines" :rows="medicines" :columns="columns" row-key="name">
        
          <template v-slot:top>
            <AddMedicineDialog @medicineAdded="get_medicines()" />
          </template>

          <template v-slot:body-cell-medicineName="props">
            <q-td :props="props">
              <RouterLink :to="{name: 'medicine', params: {_id: props.row._id}}">{{props.row.name}}</RouterLink>
            </q-td>
          </template>
        
          <template v-slot:body-cell-lastIntake="props">
            <q-td :props="props">
              {{getLastInstakeOf(props.row)}}
            </q-td>
          </template>
        
          <template v-slot:body-cell-registerIntake="props">
            <q-td :props="props">
              <q-btn color="primary" icon="check" label="Register" @click="registerIntake(props.row)" />
            </q-td>
          </template>
        
          <template v-slot:body-cell-deleteMedicine="props">
            <q-td :props="props">
              <q-btn color="red" icon="delete" label="Delete" @click="deleteMedicine(props.row)" />
            </q-td>
          </template>
        
        </q-table>

    

  </q-page>
</template>
