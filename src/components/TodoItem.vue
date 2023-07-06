<template>
    <v-list-item>
        <template #prepend>
            <v-expand-x-transition>
                <div v-if="allowEdit">
                    <v-checkbox-btn :model-value="todo.finished" @update:model-value="todo.finished = $event" class="mr-3">
                        <v-tooltip activator="parent" location="bottom">
                            <template v-if="!todo.finished"> Выполнить задачу </template>
                            <template v-else> Отменить выполнение </template>
                        </v-tooltip>
                    </v-checkbox-btn>
                </div>
            </v-expand-x-transition>
        </template>
        <template #title>
            <v-list>
                <v-fade-transition leave-absolute>
                    <v-list-item v-if="allowEdit" class="pa-0">
                        <v-text-field
                            :model-value="todo.text"
                            @update:model-value="todo.text = $event"
                            label="Задача"
                            density="comfortable"
                            variant="underlined"
                            hide-details
                        />
                    </v-list-item>
                    <v-list-item v-else class="pa-0">
                        <div class="d-flex align-center">
                            <v-icon v-if="todo.finished" :icon="mdiCheck" class="mr-1" />
                            <span class="text-h6" :class="{ 'text-decoration-line-through': todo.finished }">
                                {{ todo.text }}
                            </span>
                        </div>
                    </v-list-item>
                </v-fade-transition>
            </v-list>
        </template>
        <template #subtitle>
            <v-expand-transition>
                <div v-if="allowEdit && todo.updatedAt">
                    {{
                        `Последнее изменение: ${dayjs
                            .duration({ milliseconds: dayjs(todo.updatedAt).diff(now) })
                            .humanize(true)}`
                    }}
                </div>
            </v-expand-transition>
            <v-expand-transition>
                <div v-if="!allowEdit">
                    <v-expand-transition>
                        <div>
                            {{ `Создано: ${dayjs.duration({ milliseconds: dayjs(todo.createdAt).diff(now) }).humanize(true)}` }}
                        </div>
                    </v-expand-transition>
                    <v-expand-transition>
                        <div v-if="todo.finished && todo.createdAt && todo.updatedAt">
                            {{
                                `Завершено за: ${dayjs
                                    .duration({ milliseconds: dayjs(todo.createdAt).diff(dayjs(todo.finishedAt)) })
                                    .humanize()}`
                            }}
                        </div>
                    </v-expand-transition>
                </div>
            </v-expand-transition>
        </template>
        <template #append>
            <v-fade-transition mode="out-in">
                <div v-if="allowEdit">
                    <v-btn icon variant="text" @click.stop="saveChanges" :disabled="!allowSave">
                        <v-icon :icon="mdiCheck" />
                        <v-tooltip activator="parent" location="bottom">Завершить редактирование</v-tooltip>
                    </v-btn>
                    <v-btn icon variant="text" @click.stop="cancelChanges">
                        <v-icon :icon="mdiClose" />
                        <v-tooltip activator="parent" location="bottom">Отменить редактирование</v-tooltip>
                    </v-btn>
                </div>
                <div v-else>
                    <v-btn icon variant="text" @click.stop="startEdit">
                        <v-icon :icon="mdiPencil" />
                        <v-tooltip activator="parent" location="bottom">Редактировать задачу</v-tooltip>
                    </v-btn>
                    <v-dialog v-model="showConfigDeleteDialog" width="300">
                        <template #activator="{ props }">
                            <v-btn icon variant="text" v-bind="props">
                                <v-icon :icon="mdiDelete" />
                                <v-tooltip activator="parent" location="bottom">Удалить задачу</v-tooltip>
                            </v-btn>
                        </template>

                        <v-card>
                            <template #title> Подтвердите действие </template>
                            <template #text> Вы действительно хотите удалить задачу? </template>
                            <template #actions>
                                <div class="d-flex w-100 justify-space-evenly">
                                    <v-btn @click="showConfigDeleteDialog = false">Отмена</v-btn>
                                    <v-btn color="red" @click="deleteTodo">Удалить</v-btn>
                                </div>
                            </template>
                        </v-card>
                    </v-dialog>
                </div>
            </v-fade-transition>
        </template>
    </v-list-item>
</template>

<script setup lang="ts">
import { Todo } from '@/types/todo'
import { mdiCheck, mdiClose, mdiDelete, mdiPencil } from '@mdi/js'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import { computed, onMounted, ref, toRaw, watch } from 'vue'

dayjs.locale('ru')
dayjs.extend(relativeTime)
dayjs.extend(duration)

const props = defineProps<{ todo: Todo }>()
const emits = defineEmits<{
    (event: 'update', todo: Todo): void
    (event: 'delete', todo: Todo): void
}>()

const now = ref(dayjs())
onMounted(() => setInterval(() => (now.value = dayjs()), 1000))

const todo = ref(structuredClone(toRaw(props.todo)))
watch(props, (value) => (todo.value = structuredClone(toRaw(value.todo))))

const allowEdit = ref(false)
const allowSave = computed(() => todo.value.text && JSON.stringify(props.todo) !== JSON.stringify(todo.value))

function startEdit() {
    allowEdit.value = true
}

function cancelChanges() {
    todo.value = structuredClone(toRaw(props.todo))
    allowEdit.value = false
}

function saveChanges() {
    if (!allowSave.value) return

    emits('update', todo.value)
    allowEdit.value = false
}

const showConfigDeleteDialog = ref(false)

function deleteTodo() {
    showConfigDeleteDialog.value = false
    emits('delete', todo.value)
}
</script>
