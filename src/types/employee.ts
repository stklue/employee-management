export interface Employee {
  id: string
  name: string
  surname: string
  profile_url?: string,
  birthdate: string,
  employeeno: string
  position: string
  salary: number
  line_manager?: string
  created_at?: Date
  subordinates?: Employee[]
}

export const emptyEmployee = {
  id: '',
  name: '',
  surname: '',
  employeeno: '',
  position: 'Developer',
  birthdate: '',
  salary: 20000,
  subordinates: []
} as Employee
