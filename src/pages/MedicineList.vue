<script setup lang="ts">
import AddMedicineDialog from 'src/components/AddMedicineDialog.vue'

import { api } from 'src/boot/axios'
import { Medicine } from 'src/components/models'

// import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'

const medicines = ref([])

const columns = ref([
  { name: 'medicineName', label: 'Name', field: 'name', sortable: true },
  { name: 'frequency', label: 'Frequency', field: 'frequency', sortable: true },
  { name: 'lastIntake', label: 'Last Intake', field: 'lastIntake', sortable: true },
  { name: 'isTaken', label: 'Taken', field: 'isTaken' },
  { name: 'registerIntake', label: 'Register Intake', field: 'registerIntake' },
  { name: 'details', label: 'Details', field: 'details' },
])

const get_medicines = async () => {
  const { data } = await api.get('/medicines')
  medicines.value = data
}

const getLastInstakeOf = (medicine: Medicine) => {
  const {intake} = medicine
  if(!intake || !intake.length) return
  const lastIndex = intake.length -1
  return new Date(intake[lastIndex].date)
}

const registerIntake = async (medicine: Medicine) => {
  await api.post(`/medicines/${medicine._id}/intakes`)
  get_medicines()
}

const deleteMedicine = async (medicine: Medicine) => {
  if (!confirm(`Delete ${medicine.name} ?`))
  await api.delete(`/medicines/${medicine._id}`)
  get_medicines()
}

const isTaken = (medicine: Medicine) => {
  if(!medicine) return
  const lastIntakeDate = getLastInstakeOf(medicine)
  if(!lastIntakeDate) return
  const numberOfDaysToAdd = 1 / medicine.frequency
  const dueTime = lastIntakeDate.setDate(lastIntakeDate.getDate() + numberOfDaysToAdd)
  return new Date() < new Date(dueTime)

}

onMounted(() => {
  get_medicines()
})

</script>


<template>
  <q-page padding>


    <q-table 
      title="Medicines" 
      :rows="medicines" 
      :columns="columns" 
      row-key="name">
    
      <template v-slot:top>
        <AddMedicineDialog @medicineAdded="get_medicines()" />
      </template>

    
      <template v-slot:body-cell-lastIntake="props">
        <q-td :props="props">
          {{getLastInstakeOf(props.row)?.toDateString()}}
        </q-td>
      </template>

      <template v-slot:body-cell-isTaken="props">
        <q-td :props="props">
          <q-avatar 
            :color="isTaken(props.row) ? 'positive' : 'negative'" 
            :icon="isTaken(props.row) ? 'check' : 'close'" 
            size="24px"
            text-color="white"/>
        </q-td>
      </template>


    
      <template v-slot:body-cell-registerIntake="props">
        <q-td :props="props">
          <q-btn color="primary" icon="format_list_bulleted_add" flat round @click="registerIntake(props.row)" />
        </q-td>
      </template>

      <template v-slot:body-cell-details="props">
        <q-td :props="props">
          <q-btn color="primary" icon="info" flat round :to="{name: 'medicine', params: {_id: props.row._id}}" />
        </q-td>
      </template>
    
      <!-- <template v-slot:body-cell-deleteMedicine="props">
        <q-td :props="props">
          <q-btn color="negative" icon="delete" flat round @click="deleteMedicine(props.row)" />
        </q-td>
      </template> -->
    
    </q-table>

    

  </q-page>
</template>
