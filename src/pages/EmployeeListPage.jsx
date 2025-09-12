import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import EmployeeTable from '../components/employees/EmployeeTable'
import EmployeeForm from '../components/employees/EmployeeForm'
import './EmployeeListPage.css'

const EmployeeListPage = () => {
  const { hasRole } = useAuth()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      // Mock data - replace with actual API call
      setEmployees([
        { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', department: 'IT', role: 'employee' },
        { id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', department: 'HR', role: 'manager' },
      ])
    } catch (error) {
      console.error('Failed to fetch employees:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEmployee = () => {
    setEditingEmployee(null)
    setShowForm(true)
  }

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee)
    setShowForm(true)
  }

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      // API call to delete employee
      setEmployees(employees.filter(emp => emp.id !== id))
    }
  }

  const handleFormSubmit = (employeeData) => {
    if (editingEmployee) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id ? { ...emp, ...employeeData } : emp
      ))
    } else {
      // Add new employee
      const newEmployee = { ...employeeData, id: Date.now() }
      setEmployees([...employees, newEmployee])
    }
    setShowForm(false)
    setEditingEmployee(null)
  }

  if (loading) {
    return <div className="loading">Loading employees...</div>
  }

  return (
    <div className="employee-list-page">
      <div className="page-header">
        <h1>Employees</h1>
        {hasRole('admin') && (
          <button onClick={handleAddEmployee} className="add-btn">
            Add Employee
          </button>
        )}
      </div>

      <EmployeeTable
        employees={employees}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
        canEdit={hasRole('admin')}
      />

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default EmployeeListPage
