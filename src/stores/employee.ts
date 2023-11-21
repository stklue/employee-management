import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../lib/supabaseClient'
import { emptyEmployee, type Employee } from '../types/employee'
import { root } from 'postcss'

export const useEmployeeStore = defineStore('employee', () => {
  const employees: Ref<Employee[]> = ref([])
  const subs: Ref<Employee[]> = ref([])
  const ceo: Ref<Employee> = ref(emptyEmployee)
  const rootNode = ref('CEO')
  type State = 'Initial' | 'Successfull' | 'Fail'
  const state: Ref<State> = ref('Initial')

  type DataManipulation = 'Nothing' | 'Search' | 'Filter' | 'Sort'
  const dataM: Ref<DataManipulation> = ref('Nothing')

  const filterEmployee = async (col: string, fParam: string[]) => {
    dataM.value = 'Filter'
    if (fParam.includes('CEO')) {
      rootNode.value = 'CEO'
      ceo.value = await getCEO()
    } else if (fParam.includes('CTO') && !fParam.includes('CEO')) {
      rootNode.value = 'CTO'
      ceo.value = await getCEO()
    } else if (fParam.includes('Manager') && (!fParam.includes('CEO') || !fParam.includes('CTO'))) {
      rootNode.value = 'Manager'
      ceo.value = await getCEO()
    } else {
      rootNode.value = 'Developer'
      ceo.value = await getCEO()
    }

    try {
      if (fParam.length < 1) {
        dataM.value = 'Nothing'
        await getEmployees()
        return
      }
      const { data } = await supabase.from('employees').select('*').in(col, fParam)
      employees.value = data as unknown as Employee[]
     
    } catch (e) {
      console.log(e)
    }
  }
  const getSubordinates = async (fParam: string[]): Promise<Employee[]> => {
    try {
      if (fParam === null) {
        return []
      }
      const { data } = await supabase
        .from('employees')
        .select('*')
        // .eq('id', ceo.value.id)
        .in('employeeno', fParam)
      subs.value = data as unknown as Employee[]

      if (subs.value.length < 1) {
        return []
      }
      return subs.value
    } catch (e) {
      // console.log(e)
      return []
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
  async function getCEO() {
    try {
      const { data } = await supabase
        .from('employees')
        .select()
        .eq('position', rootNode.value)
        .single()
      ceo.value = data as unknown as Employee
      return ceo.value
    } catch (e) {
      console.log(e)
      return emptyEmployee
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
  async function deleteEmployee(id: number) {
    try {
      await supabase.from('employees').delete().eq('id', id)
    } catch (e) {
      console.log(e)
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
      state.value = 'Fail'
      console.log(e)
    }
  }
  async function updateEmployee(employee: Employee) {
    try {
      await supabase.from('employees').upsert(employee)

      state.value = 'Successfull'
    } catch (e) {
      console.log(e)
      state.value = 'Fail'
    }
  }
  async function updateManagerSub(man: Employee) {
    try {
      await supabase.from('employees').update({ subordinates: man.subordinates }).eq('id', man.id)

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
  const getEmployeeByName = async (names: string[]) => {
    const { data } = await supabase.from('employees').select().in('name', names)
    employees.value = data as unknown as Employee[]
  }

  const getManagerByPos = async (man: string): Promise<Employee> => {
    const { data } = await supabase.from('employees').select().eq('position', man).single()
    return data as unknown as Employee
  }

  return {
    employees,
    getEmployees,
    createEmployee,
    state,
    getCEO,
    rootNode,
    ceo,
    filterEmployee,
    getEmployeeByName,
    lte10000,
    getSubordinates,
    gte20000,
    subs,
    sortSalary,
    getEmployee,
    deleteEmployee,
    updateEmployee,
    getManagerByPos,
    updateManagerSub,
    dataM
  }
})
