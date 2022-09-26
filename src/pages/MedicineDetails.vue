<script setup lang="ts">

import { api } from 'src/boot/axios'
import { Medicine } from 'src/components/models'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, computed} from 'vue'

const route = useRoute()
const router = useRouter()


const medicine_id = route.params._id

const medicine = ref<Medicine>()

const columns = ref([
    { name: 'name', label: 'Name', field: 'name', sortable: true },
    { name: 'frequency', label: 'Frequency', field: 'frequency', sortable: true },
    { name: 'lastIntake', label: 'Last Intake', field: 'lastIntake', sortable: true },
    { name: 'registerIntake', label: 'Register Intake', field: 'registerIntake', sortable: false },
    { name: 'deleteMedicine', label: 'Delete', field: 'deleteMedicine', sortable: false },
])

const get_medicine = async () => {
    const { data } = await api.get(`/medicines/${medicine_id}`)
    medicine.value = data
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
    get_medicine()
}

const deleteMedicine = async () => {
    if (!medicine.value) return
    await api.delete(`/medicines/${medicine.value._id}`)
    router.push({name: 'medicines'})
}

onMounted(() => {
    get_medicine()
})

</script>


<template>
    <q-page padding>

        <q-card v-if="medicine">

            
            <q-card-section>
                <div class="text-h6">{{medicine.name}}</div>
                <div class="text-subtitle2">To be taken {{medicine.frequency}} time(s) per day</div>
            </q-card-section>
            <q-list>
            
                <q-item-label header>
                    Intake history
                </q-item-label>
            
            
                <q-item v-for="({date}, index) in medicine.intake" :key="index">
                    <q-item-section>
                        <q-item-label>{{ new Date(date).toDateString() }}</q-item-label>
                    </q-item-section>
                </q-item>
            
            </q-list>
            <q-card-actions align="right">
                <q-btn color="primary" icon="check" label="Register intake" @click="registerIntake()" />
                <q-btn color="red" icon="delete" label="Delete" @click="deleteMedicine()" />
            </q-card-actions>
                
        </q-card>

        





    </q-page>
</template>
