import './AttendanceTable.css'

const AttendanceTable = ({ records, showEmployeeName = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'green'
      case 'absent': return 'red'
      case 'late': return 'orange'
      default: return 'gray'
    }
  }

  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 'N/A'
    
    const [inHour, inMin] = checkIn.split(':').map(Number)
    const [outHour, outMin] = checkOut.split(':').map(Number)
    
    const inMinutes = inHour * 60 + inMin
    const outMinutes = outHour * 60 + outMin
    
    const diffMinutes = outMinutes - inMinutes
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60
    
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="attendance-table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            {showEmployeeName && <th>Employee</th>}
            <th>Check In</th>
            <th>Check Out</th>
            <th>Hours Worked</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              {showEmployeeName && <td>{record.employee_name}</td>}
              <td>{record.check_in || 'N/A'}</td>
              <td>{record.check_out || 'N/A'}</td>
              <td>{calculateHours(record.check_in, record.check_out)}</td>
              <td>
                <span className={`status-badge ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {records.length === 0 && (
        <div className="empty-state">
          <p>No attendance records found</p>
        </div>
      )}
    </div>
  )
}

export default AttendanceTable
