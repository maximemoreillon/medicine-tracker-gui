<script setup lang="ts">
import { inject, ref, reactive, computed } from 'vue'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

type Intake = {
    date: Date
    _id: String,

}

type Medicine = {
    name: string
    _id: string
    frequency: number
    intake: [Intake]
}

const props = defineProps<{
    medicine: Medicine
}>()


const router = useRouter()
const route = useRoute()
const axios: any = inject('axios')


const lastIntake = computed(() => {
    // Massively dirty
    if (!props.medicine) return
    if (!props.medicine.intake.length) return
    return new Date(props.medicine.intake[0].date)

})

const isDue = computed(() => {
    // Massively dirty
    if (!props.medicine) return
    if (!props.medicine.intake.length) return true
    const lastIntakeDate = new Date(props.medicine.intake[0].date)
    const numberOfDaysToAdd = 1 / props.medicine.frequency
    const dueTime = lastIntakeDate.setDate(lastIntakeDate.getDate() + numberOfDaysToAdd)
    return new Date() > new Date(dueTime)

})


const delete_medicine = async () => {
    if (!confirm(`Delete medicine?`)) return
    await axios.delete(`/medicines/${props.medicine._id}`)
    router.push({ name: 'medicines' })
}

const add_intake = async () => {
    await axios.post(`/medicines/${props.medicine._id}/intakes`)
}

onMounted(() => {

})

</script>

<template>
    <tr>
        <td>
            {{props.medicine.name}}
        </td>
        <!-- <td>
            <RouterLink :to="{name: 'medicine', params: {_id: props.medicine._id}}">
                {{props.medicine.name}}
            </RouterLink>
        </td> -->
        <td>{{medicine.frequency}} time / day</td>
        <td>{{lastIntake?.toDateString()}}</td>
        <td>{{isDue}}</td>
        <td>
            <button>Register intake</button>
        </td>
        <td>
            <button>Delete</button>
        </td>
    </tr>
</template>

<style scoped>

</style>