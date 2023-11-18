export interface Employee {
    id: string,
    name: string,
    surname: string,
    profile_url?: string,
    employeeno: string,
    position: string,
    salary: number,
    line_manager?: string,
    created_at: Date
}


export const emptyEmplpyee = {id: "", employeeno:"",position:"Developer", salary: 20000} as Employee 