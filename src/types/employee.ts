export interface Employee {
  id?: number
  name: string
  email: string
  surname: string
  profile_url?: string,
  birthdate: string,
  employeeno: string
  position: string
  salary: number
  line_manager?: string
  created_at?: Date
  subordinates: string[]
}


export interface EmployeeView  {
   emp: Employee 
   children: Employee[]
}  

export const emptyEmployee = {
  id: -1,
  name: '',
  surname: '',
  email: '',
  employeeno: '',
  position: 'Developer',
  birthdate: '',
  profile_url: '',
  salary: 20000,
  subordinates: []
} as Employee
