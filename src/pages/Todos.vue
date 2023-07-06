<template>
    <v-container>
        <v-card>
            <template #title> Добавить задачу </template>
            <v-form ref="todoForm" @submit.prevent="createTodo" class="pa-3">
                <v-text-field
                    v-model.trim="newTodoText"
                    :rules="newTodoTextRules"
                    label="Текст задачи"
                    variant="underlined"
                    required
                />
                <div class="d-flex justify-end">
                    <v-btn type="submit" variant="text" :disabled="!newTodoText">Добавить</v-btn>
                </div>
            </v-form>
        </v-card>
        <br />
        <v-card v-if="todoStore.state.todos.length">
            <template #title> Список задач </template>
            <todo-list />
        </v-card>
    </v-container>
</template>

<script lang="ts" setup>
import TodoList from '@/components/TodoList.vue'
import { useTodoStore } from '@/store/todos'
import { ref } from 'vue'
import { VForm } from 'vuetify/components/VForm'

const todoStore = useTodoStore()

const todoForm = ref<InstanceType<typeof VForm>>()

const newTodoText = ref('')
const newTodoTextRules = [(value: string) => !!value || 'Введите текст задачи']

function createTodo() {
    if (!todoForm.value?.validate()) return

    todoStore.dispatch('createTodo', newTodoText.value)
    todoForm.value?.reset()
}
</script>
