import './AttendanceForm.css'

const AttendanceForm = ({ todayAttendance, onMarkAttendance }) => {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const canCheckIn = !todayAttendance
  const canCheckOut = todayAttendance && !todayAttendance.check_out

  return (
    <div className="attendance-form">
      <div className="attendance-header">
        <h2>Mark Attendance</h2>
        <div className="current-time">
          Current Time: {getCurrentTime()}
        </div>
      </div>

      <div className="attendance-status">
        {todayAttendance ? (
          <div className="status-info">
            <div className="status-item">
              <label>Check In:</label>
              <span className="time">{todayAttendance.check_in}</span>
            </div>
            {todayAttendance.check_out && (
              <div className="status-item">
                <label>Check Out:</label>
                <span className="time">{todayAttendance.check_out}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="no-attendance">
            <p>You haven't marked attendance today</p>
          </div>
        )}
      </div>

      <div className="attendance-actions">
        <button
          onClick={() => onMarkAttendance('check_in')}
          disabled={!canCheckIn}
          className={`attendance-btn check-in ${!canCheckIn ? 'disabled' : ''}`}
        >
          {canCheckIn ? 'Check In' : 'Already Checked In'}
        </button>

        <button
          onClick={() => onMarkAttendance('check_out')}
          disabled={!canCheckOut}
          className={`attendance-btn check-out ${!canCheckOut ? 'disabled' : ''}`}
        >
          {!todayAttendance ? 'Check In First' : 
           todayAttendance.check_out ? 'Already Checked Out' : 'Check Out'}
        </button>
      </div>
    </div>
  )
}

export default AttendanceForm
