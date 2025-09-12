import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EmployeeDetailCard from '../components/employees/EmployeeDetailCard'
import './EmployeeDetailPage.css'

const EmployeeDetailPage = () => {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmployee()
  }, [id])

  const fetchEmployee = async () => {
    try {
      // Mock data - replace with actual API call
      setEmployee({
        id: parseInt(id),
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        department: 'IT',
        role: 'employee',
        hire_date: '2023-01-15',
        salary: 75000,
        address: '123 Main St, City, State'
      })
    } catch (error) {
      console.error('Failed to fetch employee:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading employee details...</div>
  }

  if (!employee) {
    return <div className="error">Employee not found</div>
  }

  return (
    <div className="employee-detail-page">
      <div className="page-header">
        <h1>Employee Details</h1>
      </div>

      <EmployeeDetailCard employee={employee} />
    </div>
  )
}

export default EmployeeDetailPage
