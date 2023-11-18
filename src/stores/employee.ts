import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../lib/supabaseClient'
import { type Employee } from '../types/employee'

export const useEmployeeStore = defineStore('employee', () => {
  const employees: Ref<Employee[]> = ref([])
  type State = 'Initial' | 'Successfull' | 'Fail'
  const state: Ref<State> = ref('Initial')
  async function  createEmployee(employee: Employee) {
    try {
      console.log("Submitting data", employee)
      const s = await supabase.from('employees').insert(employee)
      console.log(s.status, s.data, s.error)
      state.value = 'Successfull'
    } catch (e) {
      console.log(e)
      state.value = 'Fail'
    }
  }
  const getEmployees = async () => {
    const { data } = await supabase.from('employees').select()
    employees.value = data as unknown as Employee[]
  }

  return { employees, getEmployees, createEmployee , state}
})
