import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import AttendanceTable from '../components/attendance/AttendanceTable'
import AttendanceForm from '../components/attendance/AttendanceForm'
import './AttendancePage.css'

const AttendancePage = () => {
  const { user, hasRole } = useAuth()
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [todayAttendance, setTodayAttendance] = useState(null)

  useEffect(() => {
    fetchAttendanceData()
  }, [])

  const fetchAttendanceData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockRecords = [
        { id: 1, date: '2024-01-15', check_in: '09:00', check_out: '17:30', status: 'present', employee_name: 'John Doe' },
        { id: 2, date: '2024-01-14', check_in: '09:15', check_out: '17:45', status: 'present', employee_name: 'John Doe' },
      ]
      
      setAttendanceRecords(mockRecords)
      
      // Check if user has marked attendance today
      const today = new Date().toISOString().split('T')[0]
      const todayRecord = mockRecords.find(record => record.date === today)
      setTodayAttendance(todayRecord)
    } catch (error) {
      console.error('Failed to fetch attendance data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAttendance = async (type) => {
    try {
      const now = new Date()
      const time = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      const date = now.toISOString().split('T')[0]

      if (type === 'check_in') {
        const newRecord = {
          id: Date.now(),
          date,
          check_in: time,
          check_out: null,
          status: 'present',
          employee_name: `${user.first_name} ${user.last_name}`
        }
        setAttendanceRecords([newRecord, ...attendanceRecords])
        setTodayAttendance(newRecord)
      } else {
        // Update check_out time
        const updatedRecords = attendanceRecords.map(record =>
          record.id === todayAttendance.id
            ? { ...record, check_out: time }
            : record
        )
        setAttendanceRecords(updatedRecords)
        setTodayAttendance({ ...todayAttendance, check_out: time })
      }
    } catch (error) {
      console.error('Failed to mark attendance:', error)
    }
  }

  if (loading) {
    return <div className="loading">Loading attendance data...</div>
  }

  return (
    <div className="attendance-page">
      <div className="page-header">
        <h1>Attendance Management</h1>
      </div>

      {/* Employee Attendance Marking */}
      {hasRole('employee') && (
        <AttendanceForm
          todayAttendance={todayAttendance}
          onMarkAttendance={handleMarkAttendance}
        />
      )}

      {/* Attendance Records Table */}
      <div className="attendance-section">
        <h2>
          {hasRole('employee') ? 'My Attendance Records' : 'All Attendance Records'}
        </h2>
        <AttendanceTable
          records={attendanceRecords}
          showEmployeeName={!hasRole('employee')}
        />
      </div>
    </div>
  )
}

export default AttendancePage
