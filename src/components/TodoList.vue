<template>
    <v-list density="comfortable" lines="three">
        <todo-item
            v-for="todo in selectedPageTodos"
            :key="todo.id"
            :todo="todo"
            @update="todoStore.dispatch('updateTodo', $event)"
            @delete="todoStore.dispatch('removeTodo', $event)"
        />
    </v-list>
    <v-pagination v-model="selectedPage" :length="Math.ceil(todoStore.state.todos.length / todosPerPage)"></v-pagination>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/store/todos'
import { computed, ref } from 'vue'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()

const todosPerPage = ref(10)
const selectedPage = ref(1)
const selectedPageTodos = computed(() =>
    todoStore.state.todos.slice((selectedPage.value - 1) * todosPerPage.value, selectedPage.value * todosPerPage.value)
)
</script>
