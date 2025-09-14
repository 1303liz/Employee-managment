import './EmployeeTable.css'

const EmployeeTable = ({ employees, onEdit, onDelete, canEdit }) => {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Employees Found</h3>
        <p>Start building your team by adding your first employee.</p>
        <div className="empty-icon">👥</div>
      </div>
    )
  }

  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            {canEdit && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="employee-name">
                <div className="name-container">
                  <div className="avatar">
                    {(employee.first_name?.[0] || '').toUpperCase()}
                    {(employee.last_name?.[0] || '').toUpperCase()}
                  </div>
                  <span>{employee.first_name} {employee.last_name}</span>
                </div>
              </td>
              <td className="employee-email">{employee.email}</td>
              <td className="employee-department">
                <span className="department-tag">{employee.department}</span>
              </td>
              <td className="employee-role">
                <span className={`role-badge ${employee.role}`}>
                  {employee.role}
                </span>
              </td>
              {canEdit && (
                <td className="employee-actions">
                  <div className="action-buttons">
                    <button
                      onClick={() => onEdit(employee)}
                      className="action-btn edit"
                      title="Edit employee"
                      aria-label={`Edit ${employee.first_name} ${employee.last_name}`}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(employee.id)}
                      className="action-btn delete"
                      title="Delete employee"
                      aria-label={`Delete ${employee.first_name} ${employee.last_name}`}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeTable
