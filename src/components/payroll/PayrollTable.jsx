import './PayrollTable.css'

const PayrollTable = ({ records, onUpdateStatus, canManage, showEmployeeName = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'green'
      case 'pending': return 'orange'
      case 'processing': return 'blue'
      default: return 'gray'
    }
  }

  return (
    <div className="payroll-table-container">
      <table className="payroll-table">
        <thead>
          <tr>
            {showEmployeeName && <th>Employee</th>}
            <th>Month</th>
            <th>Basic Salary</th>
            <th>Allowances</th>
            <th>Deductions</th>
            <th>Net Salary</th>
            <th>Status</th>
            {canManage && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              {showEmployeeName && <td>{record.employee_name}</td>}
              <td>{new Date(record.month + '-01').toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              })}</td>
              <td>${record.basic_salary.toLocaleString()}</td>
              <td className="positive">${record.allowances.toLocaleString()}</td>
              <td className="negative">-${record.deductions.toLocaleString()}</td>
              <td className="net-salary">${record.net_salary.toLocaleString()}</td>
              <td>
                <span className={`status-badge ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </td>
              {canManage && (
                <td className="actions">
                  {record.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onUpdateStatus(record.id, 'processing')}
                        className="action-btn process-btn"
                        title="Mark as processing"
                      >
                        🔄
                      </button>
                      <button
                        onClick={() => onUpdateStatus(record.id, 'paid')}
                        className="action-btn paid-btn"
                        title="Mark as paid"
                      >
                        ✅
                      </button>
                    </>
                  )}
                  {record.status === 'processing' && (
                    <button
                      onClick={() => onUpdateStatus(record.id, 'paid')}
                      className="action-btn paid-btn"
                      title="Mark as paid"
                    >
                      ✅
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      {records.length === 0 && (
        <div className="empty-state">
          <p>No payroll records found</p>
        </div>
      )}
    </div>
  )
}

export default PayrollTable
