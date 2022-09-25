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
const emit = defineEmits(['updated'])

const lastIntake = computed(() => {
    // Massively dirty
    if (!props.medicine) return
    if (!props.medicine.intake.length) return
    const lastItemIndex = props.medicine.intake.length - 1
    return new Date(props.medicine.intake[lastItemIndex].date)

})

const isDue = computed(() => {
    // Massively dirty
    if (!props.medicine) return
    if (!props.medicine.intake.length) return true
    const lastItemIndex = props.medicine.intake.length - 1
    const lastIntakeDate = new Date(props.medicine.intake[lastItemIndex].date)
    const numberOfDaysToAdd = 1 / props.medicine.frequency
    const dueTime = lastIntakeDate.setDate(lastIntakeDate.getDate() + numberOfDaysToAdd)
    return new Date() > new Date(dueTime)

})


const delete_medicine = async () => {
    if (!confirm(`Delete medicine?`)) return
    await axios.delete(`/medicines/${props.medicine._id}`)
    router.push({ name: 'medicines' })
    emit('updated')
}

const register_intake = async () => {
    await axios.post(`/medicines/${props.medicine._id}/intakes`)
    emit('updated')
}

onMounted(() => {

})

</script>

<template>
    <tr>
        <td>
            {{props.medicine.name}}
        </td>
        <td>
            <RouterLink :to="{name: 'medicine', params: {_id: props.medicine._id}}">
                {{props.medicine.name}}
            </RouterLink>
        </td>
        <td>{{medicine.frequency}} time / day</td>
        <td>{{lastIntake?.toDateString()}}</td>
        <td>{{isDue}}</td>
        <td>
            <button @click="register_intake()">Register intake</button>
        </td>
        <td>
            <button @click="delete_medicine()">Delete</button>
        </td>
    </tr>
</template>

<style scoped>

</style>