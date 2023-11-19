<script setup lang="ts">
// import type { Employee } from '@/types/employee'
// import { useEmployeeStore } from '@/stores/employee'

// defineProps<Props>()

// const store = useEmployeeStore()
// interface Props {
//   employee: Employee
//   subordinates: Employee2[]
// }


</script>

<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
    <h1 class="text-2xl font-semibold mb-4">Employee Tree</h1>

    <div class="tree">
      <ul>
        <!-- CEO -->
        <li>
          <span class="text-blue-500">CEO</span>
          <ul>
            <!-- Manager 1 -->
            <li>
              <span class="text-green-500">Manager 1</span>
              <ul>
                <!-- Employee 1 -->
                <li><span class="text-gray-700">Employee 1</span></li>
                <!-- Employee 2 -->
                <li><span class="text-gray-700">Employee 2</span></li>
              </ul>
            </li>
            <!-- Manager 2 -->
            <li>
              <span class="text-green-500">Manager 2</span>
              <ul>
                <!-- Employee 3 -->
                <li><span class="text-gray-700">Employee 3</span></li>
                <!-- Employee 4 -->
                <li><span class="text-gray-700">Employee 4</span></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
