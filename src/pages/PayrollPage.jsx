import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import PayrollTable from '../components/payroll/PayrollTable'
import PayrollForm from '../components/payroll/PayrollForm'
import './PayrollPage.css'

const PayrollPage = () => {
    const { hasRole } = useAuth()
  const [payrollRecords, setPayrollRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchPayrollData()
  }, [])

  const fetchPayrollData = async () => {
    try {
      // Mock data - replace with actual API call
      const mockRecords = [
        {
          id: 1,
          employee_name: 'John Doe',
          month: '2024-01',
          basic_salary: 5000,
          allowances: 1000,
          deductions: 500,
          net_salary: 5500,
          status: 'paid'
        },
        {
          id: 2,
          employee_name: 'Jane Smith',
          month: '2024-01',
          basic_salary: 6000,
          allowances: 1200,
          deductions: 600,
          net_salary: 6600,
          status: 'pending'
        }
      ]
      
      setPayrollRecords(mockRecords)
    } catch (error) {
      console.error('Failed to fetch payroll data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGeneratePayroll = async (payrollData) => {
    try {
      const newRecord = {
        ...payrollData,
        id: Date.now(),
        net_salary: payrollData.basic_salary + payrollData.allowances - payrollData.deductions,
        status: 'pending'
      }
      
      setPayrollRecords([newRecord, ...payrollRecords])
      setShowForm(false)
    } catch (error) {
      console.error('Failed to generate payroll:', error)
    }
  }

  const handleUpdateStatus = async (id, status) => {
    try {
      const updatedRecords = payrollRecords.map(record =>
        record.id === id ? { ...record, status } : record
      )
      setPayrollRecords(updatedRecords)
    } catch (error) {
      console.error('Failed to update payroll status:', error)
    }
  }

  if (loading) {
    return <div className="loading">Loading payroll data...</div>
  }

  return (
    <div className="payroll-page">
      <div className="page-header">
        <h1>Payroll Management</h1>
        {hasRole('admin') && (
          <button onClick={() => setShowForm(true)} className="add-btn">
            Generate Payroll
          </button>
        )}
      </div>

      {showForm && (
        <PayrollForm
          onSubmit={handleGeneratePayroll}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="payroll-section">
        <h2>
          {hasRole('employee') ? 'My Payroll History' : 'All Payroll Records'}
        </h2>
        <PayrollTable
          records={payrollRecords}
          onUpdateStatus={handleUpdateStatus}
          canManage={hasRole('admin')}
          showEmployeeName={!hasRole('employee')}
        />
      </div>
    </div>
  )
}

export default PayrollPage
