<script setup lang="ts">
import type { Employee } from '@/types/employee'

defineProps<Props>()

interface Props {
  employee: Employee
}
</script>

<template>
  <RouterLink  :to="'/edit/' + employee.id" class="flex flex-col w-full bg-gray-200 max-w-md hove transition-all duration-700 hover:scale-110 hover:cursor-pointer shadow-md my-4  p-4 rounded-md">
    
    <div class="flex flex-col md:flex-row gap-1">
      <div v-if="employee.profile_url">
        <img
          class="rounded-full border-4 border-gray-300 h-10 w-10 mx-auto"
          :src="employee.profile_url"
          alt="Profile image"
        />
      </div>
      <vue-gravatar
        v-else
        class="w-10 h-10 rounded-full"
        :email="employee.email"
        :size="30"
        default-image="mp"
      />

      <div class="flex flex-col text-center md:text-left">
        <div class="font-medium text-gray-800">{{ employee.name }} {{ employee.surname }}</div>
        <div class="flex">
          <div class="text-gray-500 mb-2 whitespace-nowrap">{{ employee.position }}</div>
          <div
            class="inline-block h-[20px] mx-2 w-0.5 self-stretch bg-gray-400 opacity-100 dark:opacity-50"
          ></div>
          <div class="text-gray-500 mb-2 whitespace-nowrap">R{{ employee.salary }}</div>
        </div>
        <div class="flex">
          <div class="flex flex-row text-gray-800 my-auto mx-auto md:mx-0">
            <span>{{ employee.email }} </span>
          </div>
          <div
            class="inline-block h-[25px] mx-2 min-h-[1em] w-0.5 self-stretch bg-gray-400 opacity-100 dark:opacity-50"
          ></div>
          <div class="flex flex-row text-gray-800 my-auto mx-auto md:mx-0">
            <RouterLink
              :to="'/edit/' + employee.id"
              class="hover:cursor-pointer hover:text-blue-500"
              >Edit/Delete
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
