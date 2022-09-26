<script setup lang="ts">
import { axios, api } from 'src/boot/axios'

import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { onMounted } from 'vue'

const medicines = ref([])

const columns = ref([
  { name: 'Name', label: 'Name', field: 'name', sortable: true },
  { name: 'Frequency', label: 'Frequency', field: 'frequency', sortable: true },
])

const get_medicines = async () => {
  const { data } = await api.get('/medicines')
  medicines.value = data
}

onMounted(() => {
  get_medicines()
})

</script>


<template>

  <q-page>
    <q-table title="Medicines" :rows="medicines" :columns="columns" row-key="name" />
    

  </q-page>
</template>
