import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './RegisterPage.css'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'employee',
    department: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [fieldErrors, setFieldErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    return strength
  }

  const validateField = (name, value) => {
    const errors = { ...fieldErrors }
    
    switch (name) {
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = 'Please enter a valid email address'
        } else {
          delete errors.email
        }
        break
      case 'password':
        if (value.length < 6) {
          errors.password = 'Password must be at least 6 characters'
        } else {
          delete errors.password
        }
        setPasswordStrength(calculatePasswordStrength(value))
        break
      case 'confirmPassword':
        if (value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match'
        } else {
          delete errors.confirmPassword
        }
        break
      case 'first_name':
      case 'last_name':
        if (value.trim().length < 2) {
          errors[name] = 'Name must be at least 2 characters'
        } else {
          delete errors[name]
        }
        break
      default:
        break
    }
    
    setFieldErrors(errors)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Real-time validation
    validateField(name, value)
    
    // Clear general error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate all fields before submission
    const requiredFields = ['first_name', 'last_name', 'email', 'password']
    const newFieldErrors = {}
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newFieldErrors[field] = 'This field is required'
      }
    })

    if (formData.password !== formData.confirmPassword) {
      newFieldErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors)
      setError('Please fix the errors below')
      setLoading(false)
      return
    }

    try {
      const { confirmPassword, ...submitData } = formData
      const result = await register(submitData)
      
      if (result.success) {
        // Success animation/feedback could be added here
        navigate('/login', { 
          state: { 
            message: 'Registration successful! Please login with your credentials.',
            type: 'success'
          }
        })
      } else {
        setError(result.error || 'Registration failed. Please try again.')
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    }
    
    setLoading(false)
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return '#ff4757'
    if (passwordStrength < 50) return '#ffa502'
    if (passwordStrength < 75) return '#3742fa'
    return '#2ed573'
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak'
    if (passwordStrength < 50) return 'Fair'
    if (passwordStrength < 75) return 'Good'
    return 'Strong'
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Employee Management System</h1>
          <h2>Create Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">First Name *</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className={`form-input ${fieldErrors.first_name ? 'error' : ''}`}
                placeholder="First name"
              />
              {fieldErrors.first_name && (
                <span className="field-error">{fieldErrors.first_name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name *</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className={`form-input ${fieldErrors.last_name ? 'error' : ''}`}
                placeholder="Last name"
              />
              {fieldErrors.last_name && (
                <span className="field-error">{fieldErrors.last_name}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`form-input ${fieldErrors.email ? 'error' : ''}`}
              placeholder="Enter your email"
            />
            {fieldErrors.email && (
              <span className="field-error">{fieldErrors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder="Phone number (optional)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select Department</option>
              <option value="IT">Information Technology</option>
              <option value="HR">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`form-input ${fieldErrors.password ? 'error' : ''}`}
                  placeholder="Create password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {formData.password && (
                <div className="password-strength">
                  <div 
                    className="password-strength-bar"
                    style={{ 
                      width: `${passwordStrength}%`,
                      backgroundColor: getPasswordStrengthColor()
                    }}
                  ></div>
                  <span 
                    className="password-strength-text"
                    style={{ color: getPasswordStrengthColor() }}
                  >
                    {getPasswordStrengthText()}
                  </span>
                </div>
              )}
              {fieldErrors.password && (
                <span className="field-error">{fieldErrors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`form-input ${fieldErrors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm password"
              />
              {fieldErrors.confirmPassword && (
                <span className="field-error">{fieldErrors.confirmPassword}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || Object.keys(fieldErrors).length > 0}
            className={`register-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="register-footer">
          <div className="demo-info">
            <h4>💡 Demo Information</h4>
            <p>This is a demo system. You can register with any email and the system will create a mock account for testing purposes.</p>
          </div>
          <p>
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
