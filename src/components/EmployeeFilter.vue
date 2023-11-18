<script setup lang="ts">
import { useEmployeeStore } from "@/stores/employee"
import { ref } from "vue";

const store = useEmployeeStore() 
const filters = ref([])
const resetFilters = () => {
  filters.value = []
  store.getEmployees()
}
</script>

<template>
  <fieldset class="w-full">
    <legend class="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">Filters</legend>

    <div class="space-y-2 px-5 py-6">
      <div class="flex items-center">
        <input
          id="developer"
          type="checkbox"
          name="developer"
          value="Developer"
          v-model="filters"
          v-on:change="store.filterEmployee(filters)"
          class="h-5 w-5 rounded border-gray-300"
          
        />

        <label for="developer" class="ml-3 text-sm font-medium"> Developer </label>
      </div>
      <div class="flex items-center">
        <input
          id="architect"
          type="checkbox"
          name="architect"
          value="Architect"
          v-model="filters"
          v-on:change="store.filterEmployee(filters)"
          class="h-5 w-5 rounded border-gray-300"
          
        />

        <label for="architect" class="ml-3 text-sm font-medium"> Architect </label>
      </div>
      <div class="flex items-center">
        <input
          id="lt10K"
          type="checkbox"
          name="lt10K"
          value="lt10K"
          v-model="filters"
          v-on:change="store.lte10000(filters)"
          class="h-5 w-5 rounded border-gray-300"
          
        />

        <label for="lt10K" class="ml-3 text-sm font-medium"> &lt;= 10K </label>
      </div>
      <div class="flex items-center">
        <input
          id="gt20K"
          type="checkbox"
          name="gt20K"
          value="gt20K"
          v-model="filters"
          v-on:change="store.gte20000(filters)"
          class="h-5 w-5 rounded border-gray-300"
          
        />

        <label for="gt20K" class="ml-3 text-sm font-medium"> &gt;= 20K </label>
      </div>

      <div class="pt-2">
        <button 
       @click="resetFilters"
        type="button" class="text-xs text-gray-500 underline">Reset Filters</button>
      </div>
    </div>
  </fieldset>
</template>
