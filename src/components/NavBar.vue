<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
    <header>
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="flex py-4 justify-between">
          <RouterLink
            to="/"
            class="text-white rounded-md px-3 py-2 text-sm font-medium"
            aria-current="page"
            >Dashboard</RouterLink
          >

          <div class="">
            <RouterLink
              to="/create"
              class="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              + Create
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div class="sm:hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <RouterLink
            to="/"
            class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
            >Dashboard</RouterLink
          >
        </div>
      </div>
    </nav>
  </header>
</template>