<script lang="ts" setup>
import { version } from '../../package.json'

</script>

<template>
    <q-page padding>
        <q-card>
            <q-card-section>
                <div class="text-h6">Medicine tracker</div>
                <div class="text-subtitle2">v{{version}}</div>
            </q-card-section>
            <q-card-section>
                An excuse to try out the Quasar framework
            </q-card-section>
        </q-card>
    </q-page>
</template>