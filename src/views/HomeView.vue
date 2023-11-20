<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEmployeeStore } from '../stores/employee'
import EmployeeFilter from '@/components/EmployeeFilter.vue'
import EmployeeSort from '@/components/EmployeeSort.vue'
// import OrgHierarchy from '@/components/OrgHierarchy.vue'

const store = useEmployeeStore()
const loading = ref(false)

const searchVal = ref('')

onMounted(async () => {
  loading.value = true
  await store.getEmployees()
  loading.value = false
})
</script>

<template>
  <main>
    <div class="flex">
      <!-- Left Side -->
      <section class="flex-1 h-screen w-full pt-4 px-4">
        <!-- Filter Options -->
        <div>
          <form class="flex flex-col border-t border-gray-200 lg:border-t-0">
            <EmployeeFilter />
            <EmployeeSort />
          </form>
        </div>
      </section>
      <!-- Right Side -->
      <section class="flex-3 h-screen w-full px-10 pt-4 space-y-4">
        <!-- Search input -->
        <form>
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >Search</label
          >
          <div class="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for employees"
              required
            />
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <!-- Employee Table -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Surname</th>
                <th scope="col" class="px-6 py-3">Email</th>
                <th scope="col" class="px-6 py-3">Position</th>
                <th scope="col" class="px-6 py-3">Salary</th>
                <th scope="col" class="px-6 py-3">Line Manager</th>
                <th scope="col" class="px-6 py-3">Birth Date</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <div v-if="loading">loading...</div>
              <tr
                v-else
                v-for="employee in store.employees"
                :key="employee.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div v-if="employee.profile_url">
                    <img
                      class="w-10 h-10 rounded-full"
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

                  <div class="ps-3">
                    <div class="text-base font-semibold">{{ employee.name }}</div>
                  </div>
                </th>
                <td class="px-6 py-4">{{ employee.surname }}</td>
                <td class="px-6 py-4">{{ employee.email }}</td>
                <td class="px-6 py-4">{{ employee.position }}</td>
                <td class="px-6 py-4">R{{ employee.salary }}</td>
                <td class="px-6 py-4">{{ employee.line_manager ?? 'Unassigned' }}</td>
                <td class="px-6 py-4">{{ employee.birthdate }}</td>
                <td class="px-6 py-4">
                  <RouterLink
                    :to="'/edit/' + employee.id"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >Edit/Delete</RouterLink
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </main>
</template>
