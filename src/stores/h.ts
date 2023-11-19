// Employee2 interface
export interface Employee2 {
  name: string
  surname: string
  position: string
  lineManager?: Employee2 | null
  subordinates?: Employee2[]
}

// EmployeeGraph interface
export interface EmployeeGraph {
  employees: Map<Employee2, Employee2[]>
}

// Function to create an employee
export const createEmployee = (
  name: string,
  surname: string,
  position: string,
  lineManager?: Employee2 | null
): Employee2 => {
  return { name, surname, position, lineManager, subordinates: [] }
}

// Function to create an employee graph
export const createEmployeeGraph = (): EmployeeGraph => {
  return { employees: new Map() }
}

export const addEmployee = (graph: EmployeeGraph, employee: Employee2): void => {
  graph.employees.set(employee, [])
}

// Function to add a subordinate to a manager
export const addSubordinate = (
  graph: EmployeeGraph,
  manager: Employee2,
  subordinate: Employee2
): void => {
  if (graph.employees.has(manager)) {
    graph.employees.get(manager)!.push(subordinate)
    console.log('Add Subordinate: ', subordinate.name)
  } else {
    graph.employees.set(manager, [])
    graph.employees.get(manager)!.push(subordinate)
    console.log('Missed Subordinate: ', subordinate.name)
  }
}

export const dfsTraversal = (
  graph: EmployeeGraph,
  startEmployee: Employee2,
  visited: Set<Employee2> = new Set()
): void => {
  visited.add(startEmployee)

  console.log(`${startEmployee.name} ${startEmployee.surname} (${startEmployee.position})`)

  const subordinates = graph.employees.get(startEmployee) || []
  for (const subordinate of subordinates) {
    if (!visited.has(subordinate)) {
      dfsTraversal(graph, subordinate, visited)
    }
  }
}

// Example usage:
