import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../lib/supabaseClient'
import { emptyEmployee, type Employee } from '../types/employee'

export const useEmployeeStore = defineStore('employee', () => {
  const employees: Ref<Employee[]> = ref([])
  type State = 'Initial' | 'Successfull' | 'Fail'
  const state: Ref<State> = ref('Initial')

  const filterEmployee = async (fParam: string[]) => {
    try {
      if (fParam.length < 1) {
        await getEmployees()
        return
      }
      const { data } = await supabase.from('employees').select('*').in('position', fParam)
      employees.value = data as unknown as Employee[]
    } catch (e) {
      console.log(e)
    }
  }

  async function sortSalary(sortValue: string, t?: boolean) {
    try {
      const { data } = await supabase
        .from('employees')
        .select()
        .order(sortValue, { ascending: t ?? true })
      employees.value = data as unknown as Employee[]
    } catch (e) {
      console.log(e)
    }
  }
  async function lte10000(fParam: string[]) {
    try {
      if (fParam.length < 1) {
        await getEmployees()
        return
      }
      const { data } = await supabase.from('employees').select().lte('salary', 10000)
      employees.value = data as unknown as Employee[]
    } catch (e) {
      console.log(e)
    }
  }

  async function getEmployee(id: string) {
    const employee: Ref<Employee> = ref(emptyEmployee)
    try {
      const { data } = await supabase.from('employees').select().eq('id', id).single()
      employee.value = data as unknown as Employee
      
      return employee.value
    } catch (e) {
      console.log(e)
      return emptyEmployee
    }
  }


  async function gte20000(fParam: string[]) {
    try {
      if (fParam.length < 1) {
        await getEmployees()
        return
      }
      const { data } = await supabase.from('employees').select().lte('salary', 20000)
      employees.value = data as unknown as Employee[]
    } catch (e) {
      console.log(e)
    }
  }

  async function createEmployee(employee: Employee) {
    try {
      await supabase.from('employees').insert(employee)
      state.value = 'Successfull'
    } catch (e) {
      console.log(e)
      state.value = 'Fail'
    }
  }
  async function updateEmployee(employee: Employee) {
    try {
      const { data } = await supabase.from('employees').upsert(employee)
      console.log("This was the data returned: ", data);
      
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

  return { employees, getEmployees, createEmployee, state, filterEmployee, lte10000, gte20000, sortSalary, getEmployee , updateEmployee}
})
