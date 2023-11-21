<script setup lang="ts">
import type { Employee } from '@/types/employee'
import EmployeeCard from '@/components/EmployeeCard.vue'
import { useEmployeeStore } from '@/stores/employee'
import { onMounted, ref, type Ref } from 'vue'

const store = useEmployeeStore()
const props = defineProps<Props>()

interface Props {
  employee?: Employee
  employees?: Employee[]
}

const subos: Ref<Employee[]> = ref([])

const loading = ref(true)

const loadedSuccess = async () => {
  loading.value = true
  subos.value = await store.getSubordinates(props.employee!.subordinates)
  loading.value = false
}
onMounted(async () => {
  await loadedSuccess()
  // console.log('Subos: ', store.subs)
})
</script>

<template>
  <div v-if="loading === false && store.dataM === 'Nothing'" class="ml-8">
    <ul>
      <li class="mb-2">
        <EmployeeCard v-if="employee!.position === 'CEO'" :employee="employee!" />
        <div v-if="employee!.subordinates !== null">
          <ul v-for="sub in subos" :key="sub.id">
            <!-- Manager 1 -->
            <li class="flex ml-8 mb-2">
              <div>
                <img class="h-18 w-12" src="@/assets/hierarchy.svg" />
              </div>
              <EmployeeCard :employee="sub" />
            </li>
            <OrgHierarchy :employee="sub" />
          </ul>
        </div>
      </li>
    </ul>
  </div>
  <div v-if="store.dataM === 'Search'">
    <div v-for="emp in employees!" :key="emp.id">
      <EmployeeCard :employee="emp!" />
    </div>
  </div>
</template>
