<script setup lang="ts">
import { api } from 'src/boot/axios'
import { reactive, ref} from 'vue'

const emit = defineEmits(['medicineAdded'])


const userInput = reactive({
    name: '',
    frequency: '',
})

const dialog = ref()

const loading = ref(false)

const add_medicine = async () => {
    try {
        loading.value = true
        await api.post('/medicines', userInput)
        dialog.value = false
        emit('medicineAdded')
    } 
    catch (error) {
        console.error(error)
        
    }
    finally {
        loading.value = false
    }
    
}


</script>


<template>
<q-btn label="Add medicine" color="primary" icon="add" @click="dialog = true" />

<q-dialog v-model="dialog">
    <q-card class="medicine-registration-card">
        <q-card-section>
            <div class="text-h6">Add medicine</div>
        </q-card-section>

        <q-form @submit="add_medicine()" class="q-gutter-md">
            <q-card-section class="row q-gutter-md">
                <q-input class="col" v-model.number="userInput.frequency" label="Frequency" hint="Intake per day" type="number"/>
                <q-input class="col" v-model="userInput.name" label="Name" hint="Medicine name" />
            </q-card-section>
            
            <q-card-actions align="right">
                <q-btn color="primary" flat icon="close" label="Cancel"  v-close-popup/>
                <q-btn label="Register" flat type="submit" icon="add" color="primary" />
            </q-card-actions>
        </q-form>
    </q-card>
</q-dialog>
</template>

<style scoped>

</style>