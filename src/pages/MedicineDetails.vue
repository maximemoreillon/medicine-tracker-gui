<script setup lang="ts">
import IntakeRegistrationButton from 'src/components/IntakeRegistrationButton.vue'

import { api } from 'src/boot/axios'
import { Medicine } from 'src/components/models'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, computed} from 'vue'

const route = useRoute()
const router = useRouter()


const medicine_id = route.params._id

const medicine = ref<Medicine>()
const loading = ref<boolean>()
const columns = ref([
    { name: 'date', label: 'Date', field: 'date', sortable: true },
    { name: 'deleteIntake', label: 'Delete', field: 'deleteIntake'},

])

const getMedicine = async () => {
    loading.value = true
    try {
        const { data } = await api.get(`/medicines/${medicine_id}`)
        medicine.value = data
    } 
    catch (error) {
        alert('Failed to get medicine')
        console.error(error)
    }
    finally {
        loading.value = false
    }
    
}

const lastIntake = computed(() => {
    if (!medicine.value) return
    const { intake } = medicine.value
    if (!intake || !intake.length) return
    const lastIndex = intake.length - 1
    return new Date(intake[lastIndex].date).toDateString()
})

const registerIntake = async () => {
    if (!medicine.value) return
    await api.post(`/medicines/${medicine.value._id}/intakes`)
    getMedicine()
}

const deleteMedicine = async () => {
    if (!medicine.value) return
    if (!confirm(`Delete ${medicine.value.name} ?`)) return
    await api.delete(`/medicines/${medicine.value._id}`)
    router.push({name: 'medicines'})
}


const deleteIntake = async (_id: string) => {
    if (!medicine.value) return
    if (!confirm(`Delete ${medicine.value.name} ?`)) return
    await api.delete(`/medicines/${medicine.value._id}/intakes/${_id}`)
    getMedicine()
}

onMounted(() => {
    getMedicine()
})

</script>


<template>
    <q-page padding>
        <q-card>
            <q-inner-loading :showing="loading">
                <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>

            <template v-if="medicine && !loading">
                <q-toolbar>
                    <q-btn flat round dense icon="arrow_left" :to="{name: 'medicines'}" />
                    <q-toolbar-title>
                        {{medicine.name}}
                    </q-toolbar-title>
                    
                    <q-btn color="red" icon="delete" label="Delete" @click="deleteMedicine()" />
                </q-toolbar>

                <q-card-section>
                    <div class="text-subtitle2">To be taken {{medicine.frequency}} time(s) per day</div>
                </q-card-section>

                <q-card-section>
                    <q-table bordered flat title="Intake history" :rows="medicine.intake" :columns="columns" row-key="name">

                        <template v-slot:top>
                            <q-toolbar>
                                <q-toolbar-title>Intake history</q-toolbar-title>
                                <IntakeRegistrationButton :medicine="medicine" @intakeRegistered="getMedicine()"/>
                            </q-toolbar>
                        </template>

                        <template v-slot:body-cell-date="props">
                            <q-td :props="props">
                                {{ new Date(props.row.date).toDateString() }}
                            </q-td>
                        </template>
                    
                    
                        <template v-slot:body-cell-deleteIntake="props">
                            <q-td :props="props">
                                <q-btn flat icon="delete" @click="deleteIntake(props.row._id)" />
                            </q-td>
                        </template>
                    
                    </q-table>
                </q-card-section>
      
            </template>


            
                
        </q-card>

        





    </q-page>
</template>
