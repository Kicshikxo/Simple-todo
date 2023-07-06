<template>
    <v-container class="d-flex justify-center">
        <v-btn to="/todos" :append-icon="mdiChevronRight"> К списку задач </v-btn>
    </v-container>
</template>

<script lang="ts" setup>
import { mdiChevronRight } from '@mdi/js'
</script>
