import './EmployeeDetailCard.css'

const EmployeeDetailCard = ({ employee }) => {
  return (
    <div className="employee-detail-card">
      <div className="employee-header">
        <div className="employee-avatar">
          {employee.first_name[0]}{employee.last_name[0]}
        </div>
        <div className="employee-info">
          <h2>{employee.first_name} {employee.last_name}</h2>
          <span className={`role-badge ${employee.role}`}>{employee.role}</span>
        </div>
      </div>

      <div className="employee-details">
        <div className="detail-section">
          <h3>Contact Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Email</label>
              <span>{employee.email}</span>
            </div>
            <div className="detail-item">
              <label>Phone</label>
              <span>{employee.phone || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Address</label>
              <span>{employee.address || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Employment Information</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Department</label>
              <span>{employee.department}</span>
            </div>
            <div className="detail-item">
              <label>Position</label>
              <span>{employee.role}</span>
            </div>
            <div className="detail-item">
              <label>Hire Date</label>
              <span>{employee.hire_date || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Salary</label>
              <span>${employee.salary?.toLocaleString() || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetailCard
