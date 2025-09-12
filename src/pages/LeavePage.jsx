import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import LeaveForm from '../components/leave/LeaveForm'
import LeaveTable from '../components/leave/LeaveTable'
import './LeavePage.css'

const LeavePage = () => {
  const { user, hasRole } = useAuth()
  const [leaveRequests, setLeaveRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchLeaveRequests()
  }, [])

  const fetchLeaveRequests = async () => {
    try {
      // Mock data - replace with actual API call
      const mockRequests = [
        {
          id: 1,
          employee_name: 'John Doe',
          leave_type: 'vacation',
          start_date: '2024-02-01',
          end_date: '2024-02-05',
          reason: 'Family vacation',
          status: 'pending',
          applied_date: '2024-01-15'
        },
        {
          id: 2,
          employee_name: 'Jane Smith',
          leave_type: 'sick',
          start_date: '2024-01-20',
          end_date: '2024-01-22',
          reason: 'Medical treatment',
          status: 'approved',
          applied_date: '2024-01-18'
        }
      ]
      
      setLeaveRequests(mockRequests)
    } catch (error) {
      console.error('Failed to fetch leave requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitLeave = async (leaveData) => {
    try {
      const newRequest = {
        ...leaveData,
        id: Date.now(),
        employee_name: `${user.first_name} ${user.last_name}`,
        status: 'pending',
        applied_date: new Date().toISOString().split('T')[0]
      }
      
      setLeaveRequests([newRequest, ...leaveRequests])
      setShowForm(false)
    } catch (error) {
      console.error('Failed to submit leave request:', error)
    }
  }

  const handleApproveReject = async (id, status) => {
    try {
      const updatedRequests = leaveRequests.map(request =>
        request.id === id ? { ...request, status } : request
      )
      setLeaveRequests(updatedRequests)
    } catch (error) {
      console.error('Failed to update leave request:', error)
    }
  }

  if (loading) {
    return <div className="loading">Loading leave requests...</div>
  }

  return (
    <div className="leave-page">
      <div className="page-header">
        <h1>Leave Management</h1>
        {hasRole('employee') && (
          <button onClick={() => setShowForm(true)} className="add-btn">
            Request Leave
          </button>
        )}
      </div>

      {showForm && (
        <LeaveForm
          onSubmit={handleSubmitLeave}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="leave-section">
        <h2>
          {hasRole('employee') ? 'My Leave Requests' : 'All Leave Requests'}
        </h2>
        <LeaveTable
          requests={leaveRequests}
          onApproveReject={handleApproveReject}
          canManage={hasRole('admin') || hasRole('manager')}
          showEmployeeName={!hasRole('employee')}
        />
      </div>
    </div>
  )
}

export default LeavePage
