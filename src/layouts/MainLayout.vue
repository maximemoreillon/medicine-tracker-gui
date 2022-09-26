<script lang="ts" setup>
import { ref } from 'vue';
import { version } from '../../package.json'
import LogoutButton from 'components/LogoutButton.vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()


const linksList = ref([
  {
    title: 'Medicine',
    caption: 'List of medicines',
    icon: 'medication',
    to: { name: 'medicines' }
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
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Medicine tracker
        </q-toolbar-title>

        <div>v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered>
      <q-list>

        <q-item-label header >
          Medicine tracker v{{version}}
        </q-item-label>


        <q-item v-for="({to, icon, caption, title}, index) in linksList" :key="index" :to="to" >
          <q-item-section v-if="icon" avatar>
            <q-icon :name="icon" />
          </q-item-section>
          
          <q-item-section>
            <q-item-label>{{ title }}</q-item-label>
            <q-item-label caption>{{ caption }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-btn color="primary" @click="$q.dark.toggle()" :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'"/>
          </q-item-section>

        </q-item>


        <q-item>
          <q-item-section>
            <LogoutButton />
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>


