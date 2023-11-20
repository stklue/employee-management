import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../lib/supabaseClient'
import { emptyEmployee, type Employee } from '../types/employee'

export interface EmployeeGraph {
  employees: Array<Employee>
}

export const emptyGraph = { employees: [] } as EmployeeGraph

export interface HierarchyNode {
  manager: Employee
  id: string
  children: Array<Employee>
}

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
  async function deleteEmployee(id: string) {
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
    } catch (e) {
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
       await supabase
        .from('employees')
        .update({ subordinates: man.subordinates })
        .eq('id', man.id)

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
  const tree: Ref<Array<HierarchyNode>> = ref([])

  const getManagerByName = async (man: string): Promise<Employee> => {
    const { data } = await supabase.from('employees').select().eq('name', man).single()
    return data as unknown as Employee
  }

  const buildOrgHierachy = async () => {
    // Employee[] => HierarchyNode[]
    const line_managers: string[] = []
    employees.value.forEach((e) => {
      if (!line_managers.includes(e.line_manager as string)) {
        if (e.line_manager !== null) {
          line_managers.push(e.line_manager as string)
        }
      }
    })

    line_managers.forEach(async (man) => {
      const { data } = await supabase.from('employees').select('*').eq('line_manager', man)
      const x: Array<Employee> = data as unknown as Employee[]
      const emp = employees.value.find((e) => e.name === man)
      const h = { manager: emp, id: man, children: x } as HierarchyNode
      tree.value.push(h)
    })
  }

  return {
    employees,
    getEmployees,
    createEmployee,
    state,
    filterEmployee,
    getEmployeeByName,
    lte10000,
    gte20000,
    sortSalary,
    getEmployee,
    deleteEmployee,
    updateEmployee,
    getManagerByName,
    updateManagerSub,
    buildOrgHierachy,
    tree
  }
})
