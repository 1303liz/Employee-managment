import { useState } from 'react'
import './PayrollForm.css'

const PayrollForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    employee_name: '',
    month: '',
    basic_salary: '',
    allowances: '',
    deductions: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      basic_salary: parseFloat(formData.basic_salary) || 0,
      allowances: parseFloat(formData.allowances) || 0,
      deductions: parseFloat(formData.deductions) || 0
    })
  }

  const netSalary = (parseFloat(formData.basic_salary) || 0) + 
                   (parseFloat(formData.allowances) || 0) - 
                   (parseFloat(formData.deductions) || 0)

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Generate Payroll</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="payroll-form">
          <div className="form-group">
            <label htmlFor="employee_name">Employee Name</label>
            <input
              type="text"
              id="employee_name"
              name="employee_name"
              value={formData.employee_name}
              onChange={handleChange}
              required
              placeholder="Enter employee name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="month">Month</label>
            <input
              type="month"
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="basic_salary">Basic Salary</label>
            <input
              type="number"
              id="basic_salary"
              name="basic_salary"
              value={formData.basic_salary}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="allowances">Allowances</label>
            <input
              type="number"
              id="allowances"
              name="allowances"
              value={formData.allowances}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="deductions">Deductions</label>
            <input
              type="number"
              id="deductions"
              name="deductions"
              value={formData.deductions}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div className="salary-summary">
            <div className="summary-row">
              <span>Basic Salary:</span>
              <span>${(parseFloat(formData.basic_salary) || 0).toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Allowances:</span>
              <span>+${(parseFloat(formData.allowances) || 0).toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Deductions:</span>
              <span>-${(parseFloat(formData.deductions) || 0).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Net Salary:</span>
              <span>${netSalary.toFixed(2)}</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Generate Payroll
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PayrollForm
