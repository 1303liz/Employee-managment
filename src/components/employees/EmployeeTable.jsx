import './EmployeeTable.css'

const EmployeeTable = ({ employees, onEdit, onDelete, canEdit }) => {
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
              <td>{employee.first_name} {employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td className="role-badge">
                <span className={`role ${employee.role}`}>{employee.role}</span>
              </td>
              {canEdit && (
                <td className="actions">
                  <button
                    onClick={() => onEdit(employee)}
                    className="action-btn edit-btn"
                    title="Edit employee"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(employee.id)}
                    className="action-btn delete-btn"
                    title="Delete employee"
                  >
                    🗑️
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      {employees.length === 0 && (
        <div className="empty-state">
          <p>No employees found</p>
        </div>
      )}
    </div>
  )
}

export default EmployeeTable
