<script lang="ts" setup>
import LogoutButton from 'components/LogoutButton.vue'
import { ref } from 'vue';
import { useQuasar } from 'quasar'

const $q = useQuasar()

const nav = ref([
  {
    title: 'Medicine',
    caption: 'List of medicines',
    icon: 'medication',
    to: { name: 'medicines' }
  },
  {
    title: 'About',
    caption: 'About this app',
    icon: 'info_outline',
    to: { name: 'about' }
  },

]);

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}


</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          Medicine tracker
        </q-toolbar-title>

        <LogoutButton />

        <q-btn 
          @click="$q.dark.toggle()" 
          :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'" 
          flat 
          round/>
        
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered>
      <q-list>

        <q-item v-for="({to, icon, caption, title}, index) in nav" :key="index" :to="to" >
          <q-item-section v-if="icon" avatar>
            <q-icon :name="icon" />
          </q-item-section>
          
          <q-item-section>
            <q-item-label>{{ title }}</q-item-label>
            <q-item-label caption>{{ caption }}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>


