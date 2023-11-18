<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEmployeeStore } from '../stores/employee'

const store = useEmployeeStore()
const loading = ref(false)

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
          <form action="" class="flex border-t border-gray-200 lg:border-t-0">
            <fieldset class="w-full">
              <legend class="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">Filters</legend>

              <div class="space-y-2 px-5 py-6">
                <div class="flex items-center">
                  <input
                    id="developer"
                    type="checkbox"
                    name="developer"
                    class="h-5 w-5 rounded border-gray-300"
                    checked
                  />

                  <label for="developer" class="ml-3 text-sm font-medium"> Developer </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="architect"
                    type="checkbox"
                    name="architect"
                    class="h-5 w-5 rounded border-gray-300"
                    checked
                  />

                  <label for="architect" class="ml-3 text-sm font-medium"> Architect </label>
                </div>

                <div class="pt-2">
                  <button type="button" class="text-xs text-gray-500 underline">
                    Reset Filters
                  </button>
                </div>
              </div>
            </fieldset>
            <fieldset class="w-full">
              <legend class="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">Sort</legend>

              <div class="space-y-2 px-5 py-6">
                <div class="flex items-center">
                  <input
                    id="New"
                    type="checkbox"
                    name="type[New]"
                    class="h-5 w-5 rounded border-gray-300"
                    checked
                  />

                  <label for="New" class="ml-3 text-sm font-medium"> Position </label>
                </div>

                <div class="pt-2">
                  <button type="button" class="text-xs text-gray-500 underline">
                    Reset Filters
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
          <div class="">
            <div class="flex justify-between border-t border-gray-200 px-5 py-3">
              <button
                name="reset"
                type="button"
                class="rounded text-xs font-medium text-gray-600 underline"
              >
                Reset All
              </button>

              <button
                name="commit"
                type="button"
                class="rounded bg-blue-600 px-5 py-3 text-xs font-medium text-white active:scale-95"
              >
                Apply Filters
              </button>
            </div>
          </div>
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
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all-search" class="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Surname</th>
                <th scope="col" class="px-6 py-3">Position</th>
                <th scope="col" class="px-6 py-3">Salary</th>
                <th scope="col" class="px-6 py-3">Line Manager</th>
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
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                  </div>
                </td>
                <th
                  scope="row"
                  class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    class="w-10 h-10 rounded-full"
                    src="@/assets/default_profile.jpg"
                    alt="Jese image"
                  />
                  <div class="ps-3">
                    <div class="text-base font-semibold">{{ employee.name }}</div>
                  </div>
                </th>
                <td class="px-6 py-4">{{ employee.surname }}</td>
                <td class="px-6 py-4">{{ employee.position }}</td>
                <td class="px-6 py-4">R{{ employee.salary }}</td>
                <td class="px-6 py-4">Jake Test</td>
                <td class="px-6 py-4">
                  <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >Edit user</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Body -->
      </section>
    </div>
  </main>
</template>
