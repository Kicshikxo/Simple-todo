import { v4 as uuidv4 } from 'uuid'
import { InjectionKey } from 'vue'
import { Store, createStore, useStore } from 'vuex'

import { Todo } from '@/types/todo'

export const SAVED_TODOS_STORAGE_KEY = 'saved-todos'

export interface todoStoreState {
    todos: Todo[]
}

export const todoStoreKey: InjectionKey<Store<todoStoreState>> = Symbol()

export const todoStore = createStore<todoStoreState>({
    state: () => ({
        todos: (() => {
            try {
                return JSON.parse(localStorage.getItem(SAVED_TODOS_STORAGE_KEY) ?? '[]')
            } catch (e) {
                return []
            }
        })()
    }),
    mutations: {
        createTodo(state, todo: Todo) {
            state.todos = [todo, ...state.todos]
        },
        removeTodo(state, { id }: Todo) {
            state.todos = state.todos.filter((todo) => todo.id !== id)
        },
        updateTodo(state, { id, text, finished, updatedAt, finishedAt }: Todo) {
            state.todos = state.todos.map((todo) =>
                todo.id === id ? { ...todo, text, finished, updatedAt, finishedAt } : todo
            )
        }
    },
    actions: {
        createTodo({ commit }, text: string) {
            commit('createTodo', {
                id: uuidv4(),
                text,
                finished: false,
                createdAt: new Date().toJSON(),
                updatedAt: new Date().toJSON()
            } as Todo)
        },
        removeTodo({ commit }, todo: Todo) {
            commit('removeTodo', todo)
        },
        updateTodo({ commit }, todo: Todo) {
            commit('updateTodo', {
                ...todo,
                updatedAt: new Date().toJSON(),
                finishedAt: todo.finished ? new Date().toJSON() : undefined
            } as Todo)
        }
    },
    plugins: [
        (store) => {
            store.subscribe((mutation, { todos }) => {
                window.localStorage.setItem(SAVED_TODOS_STORAGE_KEY, JSON.stringify(todos))
            })
        }
    ]
})

export function useTodoStore() {
    return useStore(todoStoreKey)
}
