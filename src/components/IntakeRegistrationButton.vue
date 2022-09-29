<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const emit = defineEmits([
    'intakeRegistered'
])

const loading = ref(false)

const props = defineProps({
    medicine: {
        type: Object,
        required: true,
    }
})

const registerIntake = async () => {

    try {
        loading.value = true
        await api.post(`/medicines/${props.medicine._id}/intakes`)
        emit('intakeRegistered')
        $q.notify('Intake registered')
    }
    catch (error) {
        $q.notify('Intake registration failed')
        console.error(error)
    }
    finally {
        loading.value = false
    }
}




</script>

<template>
    <q-btn color="primary" flat icon="format_list_bulleted_add" @click="registerIntake()" :loading="loading"/>
</template>