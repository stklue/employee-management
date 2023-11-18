<script setup lang="ts">
import { ref } from 'vue'
import { useEmployeeStore } from '@/stores/employee'
const store = useEmployeeStore()
const sortValue = ref()

const resetSort = () => {
  sortValue.value = null
  store.getEmployees()
}
</script>

<template>
  <fieldset class="w-full">
    <legend class="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">Sort</legend>

    <div class="space-y-2 px-5 py-6">
      <div class="flex items-center">
        <input
          id="salaryasc"
          type="radio"
          name="Salary asc"
          value="salary asc"
          v-model="sortValue"
          v-on:change="store.sortSalary('salary')"
          class="h-5 w-5 rounded border-gray-300"
        />

        <label for="Salary asc" class="ml-3 text-sm font-medium"> Salary asc </label>
      </div>
      <div class="flex items-center">
        <input
          id="salarydesc"
          type="radio"
          name="Salary desc"
          value="salary desc"
          v-model="sortValue"
          v-on:change="store.sortSalary('salary', false)"
          class="h-5 w-5 rounded border-gray-300"
        />

        <label for="Salary desc" class="ml-3 text-sm font-medium"> Salary desc </label>
      </div>
      <div class="flex items-center">
        <input
          id="line_manager"
          type="radio"
          name="Line Manager"
          value="line_manager"
          v-model="sortValue"
          v-on:change="store.sortSalary('line_manager')"
          class="h-5 w-5 rounded border-gray-300"
        />

        <label for="New" class="ml-3 text-sm font-medium"> Line Manager </label>
      </div>

      <div class="pt-2">
        <button 
        @click="resetSort"
        type="button" class="text-xs text-gray-500 underline">Reset</button>
      </div>
    </div>
  </fieldset>
</template>
