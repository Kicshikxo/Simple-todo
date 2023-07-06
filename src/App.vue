<template>
    <v-app>
        <v-app-bar flat app>
            <template #title>Таск-меденжер</template>
            <v-btn to="/" class="mr-3"> Главная </v-btn>
            <v-btn to="/todos" class="mr-3"> Список задач </v-btn>
        </v-app-bar>
        <v-main>
            <router-view v-slot="{ Component }">
                <v-fade-transition leave-absolute>
                    <component :is="Component" />
                </v-fade-transition>
            </router-view>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
