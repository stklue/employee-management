<script setup lang="ts">
import type { Employee } from '@/types/employee'
import { useEmployeeStore } from '@/stores/employee'
import { onMounted, ref, type Ref } from 'vue'

const store = useEmployeeStore()
const props = defineProps<Props>()

interface Props {
  employee: Employee
}

const subos: Ref<Employee[]> = ref([])

const loading = ref(true)

const loadedSuccess = async () => {
  loading.value = true
  subos.value = await store.getSubordinates(props.employee.subordinates)
  loading.value = false
}
onMounted(async () => {
  await loadedSuccess()
  // console.log('Subos: ', store.subs)
})
</script>

<template>
  <div v-if="loading === false" class="ml-4">
    <ul>
      <li>
        <span v-if="employee.position === 'CEO'" class="text-blue-500">{{ employee.name }}</span>
        <div v-if="employee.subordinates !== null">
          <ul v-for="sub in subos " :key="sub.id">
            <!-- Manager 1 -->
            <li class="ml-4">
              <span class="text-green-500">{{ sub.name }}</span>
            </li>
            <OrgHierarchy :employee="sub" />
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
