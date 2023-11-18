<script setup lang="ts">
import { useEmployeeStore } from "@/stores/employee"
import { ref } from "vue";

const store = useEmployeeStore() 
const filters = ref([])

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

      <div class="pt-2">
        <button 
       
        type="button" class="text-xs text-gray-500 underline">Reset Filters</button>
      </div>
    </div>
  </fieldset>
</template>
