import { useState, useEffect } from 'react'
import './DepartmentPage.css'

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '' })

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      // Mock data - replace with actual API call
      setDepartments([
        { id: 1, name: 'Information Technology', description: 'Software development and IT support', employee_count: 25 },
        { id: 2, name: 'Human Resources', description: 'HR management and recruitment', employee_count: 8 },
        { id: 3, name: 'Finance', description: 'Financial planning and accounting', employee_count: 12 },
        { id: 4, name: 'Marketing', description: 'Marketing and business development', employee_count: 15 },
      ])
    } catch (error) {
      console.error('Failed to fetch departments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // API call to create department
      const newDepartment = { ...formData, id: Date.now(), employee_count: 0 }
      setDepartments([...departments, newDepartment])
      setFormData({ name: '', description: '' })
      setShowForm(false)
    } catch (error) {
      console.error('Failed to create department:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== id))
    }
  }

  if (loading) {
    return <div className="loading">Loading departments...</div>
  }

  return (
    <div className="department-page">
      <div className="page-header">
        <h1>Departments</h1>
        <button onClick={() => setShowForm(true)} className="add-btn">
          Add Department
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Department</h2>
              <button onClick={() => setShowForm(false)} className="close-btn">×</button>
            </div>
            <form onSubmit={handleSubmit} className="department-form">
              <div className="form-group">
                <label htmlFor="name">Department Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="departments-grid">
        {departments.map((department) => (
          <div key={department.id} className="department-card">
            <div className="department-header">
              <h3>{department.name}</h3>
              <button
                onClick={() => handleDelete(department.id)}
                className="delete-btn"
                title="Delete department"
              >
                🗑️
              </button>
            </div>
            <p className="department-description">{department.description}</p>
            <div className="department-stats">
              <span className="employee-count">
                {department.employee_count} employees
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DepartmentPage
