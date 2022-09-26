<script setup lang="ts">
import { api } from 'src/boot/axios'
import { reactive, ref} from 'vue'

const emit = defineEmits(['medicineAdded'])


const userInput = reactive({
    name: '',
    frequency: '',
})

let dialog = ref()


const add_medicine = async () => {
    await api.post('/medicines', userInput)
    dialog.value = false
    emit('medicineAdded')
}


</script>


<template>
<q-btn label="Add medicine" color="primary" @click="dialog = true" />

<q-dialog v-model="dialog">
    <q-card >
        <q-card-section>
            <div class="text-h6">Add medicine</div>
        </q-card-section>

        <q-form @submit="add_medicine()" class="q-gutter-md">
            <q-card-section class="q-pt-none">
            
                <q-input v-model="userInput.name" label="Name" hint="Medicine name" />
                <q-input v-model.number="userInput.frequency" label="Frequency" hint="Intake per day" type="number"/>
            </q-card-section>
            
            <q-card-actions align="right">
                <q-btn color="primary" icon="close" label="Cancel"  v-close-popup/>
                <q-btn label="Register" type="submit" icon="check" color="primary" />
            </q-card-actions>
        </q-form>
    </q-card>
</q-dialog>
</template>
