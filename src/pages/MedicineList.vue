<script setup lang="ts">

import AddMedicineDialog from 'src/components/AddMedicineDialog.vue'
import IntakeRegistrationButton from 'src/components/IntakeRegistrationButton.vue'

import { api } from 'src/boot/axios'
import { Medicine } from 'src/components/models'
import { ref, onMounted } from 'vue'

const loading = ref(false)
const medicines = ref<Medicine[]>([])
const columns = ref([
  { name: 'medicineName', label: 'Name', field: 'name', sortable: true },
  { name: 'frequency', label: 'Frequency', field: 'frequency', sortable: true },
  { name: 'lastIntake', label: 'Last Intake', field: 'lastIntake', sortable: true },
  { name: 'isTaken', label: 'Taken', field: 'isTaken' },
  { name: 'registerIntake', label: 'Register Intake', field: 'registerIntake' },
  { name: 'details', label: 'Details', field: 'details' },
])


const get_medicines = async () => {
  loading.value = true
  try {
    const { data } = await api.get('/medicines')
    medicines.value = data
  } 
  catch (error) {
    alert('Failed to get data')
    console.error(error)
  }
  finally {
    loading.value = false
  }
  
}

const registerIntake = async (medicine: Medicine) => {

  try {
    await api.post(`/medicines/${medicine._id}/intakes`)
    get_medicines()
  } 
  catch (error) {
    alert ('Failed to register intake')
    console.error(error)
  }
}
  


const getLastInstakeOf = (medicine: Medicine) => {
  const {intake} = medicine
  if(!intake || !intake.length) return
  const lastIndex = intake.length -1
  return new Date(intake[lastIndex].date)
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
      :loading="loading"
      title="Medicines" 
      :rows="medicines" 
      :columns="columns" 
      row-key="name">
    
      <template v-slot:top>
        <q-toolbar>
          <q-toolbar-title>
            Medicines
          </q-toolbar-title>
        
          <AddMedicineDialog @medicineAdded="get_medicines()" />
        </q-toolbar>
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
          <IntakeRegistrationButton :medicine="props.row" @intakeRegistered="get_medicines()"/>
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
