import './LeaveTable.css'

const LeaveTable = ({ requests, onApproveReject, canManage, showEmployeeName = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'green'
      case 'rejected': return 'red'
      case 'pending': return 'orange'
      default: return 'gray'
    }
  }

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  return (
    <div className="leave-table-container">
      <table className="leave-table">
        <thead>
          <tr>
            {showEmployeeName && <th>Employee</th>}
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Days</th>
            <th>Reason</th>
            <th>Applied Date</th>
            <th>Status</th>
            {canManage && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              {showEmployeeName && <td>{request.employee_name}</td>}
              <td className="leave-type">
                <span className={`type-badge ${request.leave_type}`}>
                  {request.leave_type}
                </span>
              </td>
              <td>{new Date(request.start_date).toLocaleDateString()}</td>
              <td>{new Date(request.end_date).toLocaleDateString()}</td>
              <td>{calculateDays(request.start_date, request.end_date)} days</td>
              <td className="reason-cell">
                <span title={request.reason}>
                  {request.reason.length > 50 
                    ? `${request.reason.substring(0, 50)}...` 
                    : request.reason}
                </span>
              </td>
              <td>{new Date(request.applied_date).toLocaleDateString()}</td>
              <td>
                <span className={`status-badge ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </td>
              {canManage && (
                <td className="actions">
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onApproveReject(request.id, 'approved')}
                        className="action-btn approve-btn"
                        title="Approve request"
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => onApproveReject(request.id, 'rejected')}
                        className="action-btn reject-btn"
                        title="Reject request"
                      >
                        ❌
                      </button>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      {requests.length === 0 && (
        <div className="empty-state">
          <p>No leave requests found</p>
        </div>
      )}
    </div>
  )
}

export default LeaveTable
