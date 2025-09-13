import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './MemberProfilePage.css'

const MemberProfilePage = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationalId: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    
    // Work Information
    employeeId: '',
    department: '',
    position: '',
    hireDate: '',
    salary: '',
    manager: '',
    
    // Additional Information
    skills: '',
    education: '',
    certifications: '',
    languages: ''
  })
  
  const [formErrors, setFormErrors] = useState({})
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    // Load user profile data (mock data for now)
    const loadProfileData = async () => {
      try {
        setLoading(true)
        // Mock API call - replace with actual API
        const mockProfileData = {
          firstName: user?.firstName || 'John',
          lastName: user?.lastName || 'Doe',
          email: user?.email || 'john.doe@company.com',
          phone: '+1 (555) 123-4567',
          dateOfBirth: '1990-05-15',
          gender: 'Male',
          nationalId: '123-45-6789',
          address: '123 Main Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States',
          emergencyContactName: 'Jane Doe',
          emergencyContactPhone: '+1 (555) 987-6543',
          emergencyContactRelationship: 'Spouse',
          employeeId: 'EMP001',
          department: 'Engineering',
          position: 'Software Developer',
          hireDate: '2022-01-15',
          salary: '$75,000',
          manager: 'Sarah Johnson',
          skills: 'JavaScript, React, Node.js, Python',
          education: 'Bachelor of Science in Computer Science',
          certifications: 'AWS Certified Developer',
          languages: 'English (Native), Spanish (Intermediate)'
        }
        setProfileData(mockProfileData)
      } catch (error) {
        console.error('Failed to load profile data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfileData()
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    // Required fields validation
    if (!profileData.firstName.trim()) errors.firstName = 'First name is required'
    if (!profileData.lastName.trim()) errors.lastName = 'Last name is required'
    if (!profileData.email.trim()) errors.email = 'Email is required'
    if (!profileData.phone.trim()) errors.phone = 'Phone number is required'
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (profileData.email && !emailRegex.test(profileData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    // Phone validation
    const phoneRegex = /^\+?[\d\s\-()]+$/
    if (profileData.phone && !phoneRegex.test(profileData.phone)) {
      errors.phone = 'Please enter a valid phone number'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsEditing(false)
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
      
      console.log('Profile updated:', profileData)
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormErrors({})
    // Reload original data
    window.location.reload()
  }

  if (loading && !profileData.firstName) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-title">
          <h1>My Profile</h1>
          <p>View and update your personal information</p>
        </div>
        <div className="profile-actions">
          {!isEditing ? (
            <button 
              className="btn-edit" 
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button 
                className="btn-save" 
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                className="btn-cancel" 
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {showSuccessMessage && (
        <div className="success-message">
          <i className="icon-success">✓</i>
          Profile updated successfully!
        </div>
      )}

      <div className="profile-content">
        {/* Personal Information Section */}
        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="profile-grid">
            <div className="form-group">
              <label>First Name *</label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  className={formErrors.firstName ? 'error' : ''}
                />
              ) : (
                <div className="profile-value">{profileData.firstName}</div>
              )}
              {formErrors.firstName && <span className="error-text">{formErrors.firstName}</span>}
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  className={formErrors.lastName ? 'error' : ''}
                />
              ) : (
                <div className="profile-value">{profileData.lastName}</div>
              )}
              {formErrors.lastName && <span className="error-text">{formErrors.lastName}</span>}
            </div>

            <div className="form-group">
              <label>Email *</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className={formErrors.email ? 'error' : ''}
                />
              ) : (
                <div className="profile-value">{profileData.email}</div>
              )}
              {formErrors.email && <span className="error-text">{formErrors.email}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className={formErrors.phone ? 'error' : ''}
                />
              ) : (
                <div className="profile-value">{profileData.phone}</div>
              )}
              {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profileData.dateOfBirth}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="profile-value">{profileData.dateOfBirth}</div>
              )}
            </div>

            <div className="form-group">
              <label>Gender</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={profileData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              ) : (
                <div className="profile-value">{profileData.gender}</div>
              )}
            </div>

            <div className="form-group">
              <label>National ID</label>
              {isEditing ? (
                <input
                  type="text"
                  name="nationalId"
                  value={profileData.nationalId}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="profile-value">{profileData.nationalId}</div>
              )}
            </div>
          </div>
        </div>

        {/* Address Information Section */}
        <div className="profile-section">
          <h2>Address Information</h2>
          <div className="profile-grid">
            <div className="form-group full-width">
              <label>Address</label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="profile-value">{profileData.address}</div>
              )}
            </div>

            <div className="form-group">
              <label>City</label>
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={profileData.city}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="profile-value">{profileData.city}</div>
              )}
            </div>

            <div className="form-group">
              <label>State</label>
              {isEditing ? (
                <input
                  type="text"
                  name="state"
                  value={profileData.state}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="profile-value">{profileData.state}</div>
              )}
            </div>

            <div className="form-group">
              <label>Zip Code</label>
              {isEditing ? (
                <input
                  type="text"
                  name="zipCode"
                  value={profileData.zipCode}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="profile-value">{profileData.zipCode}</div>
              )}
            </div>

            <div className="form-group">
              <label>Country</label>
              {isEditing ? (
                <input
                  type="text"
                  name="country"
                  value={profileData.country}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="profile-value">{profileData.country}</div>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="profile-section">
          <h2>Emergency Contact</h2>
          <div className="profile-grid">
            <div className="form-group">
              <label>Contact Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="emergencyContactName"
                  value={profileData.emergencyContactName}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="profile-value">{profileData.emergencyContactName}</div>
              )}
            </div>

            <div className="form-group">
              <label>Contact Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="emergencyContactPhone"
                  value={profileData.emergencyContactPhone}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="profile-value">{profileData.emergencyContactPhone}</div>
              )}
            </div>

            <div className="form-group">
              <label>Relationship</label>
              {isEditing ? (
                <select
                  name="emergencyContactRelationship"
                  value={profileData.emergencyContactRelationship}
                  onChange={handleInputChange}
                >
                  <option value="">Select Relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Child">Child</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <div className="profile-value">{profileData.emergencyContactRelationship}</div>
              )}
            </div>
          </div>
        </div>

        {/* Work Information Section */}
        <div className="profile-section">
          <h2>Work Information</h2>
          <div className="profile-grid">
            <div className="form-group">
              <label>Employee ID</label>
              <div className="profile-value readonly">{profileData.employeeId}</div>
            </div>

            <div className="form-group">
              <label>Department</label>
              <div className="profile-value readonly">{profileData.department}</div>
            </div>

            <div className="form-group">
              <label>Position</label>
              <div className="profile-value readonly">{profileData.position}</div>
            </div>

            <div className="form-group">
              <label>Hire Date</label>
              <div className="profile-value readonly">{profileData.hireDate}</div>
            </div>

            <div className="form-group">
              <label>Salary</label>
              <div className="profile-value readonly">{profileData.salary}</div>
            </div>

            <div className="form-group">
              <label>Manager</label>
              <div className="profile-value readonly">{profileData.manager}</div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="profile-section">
          <h2>Additional Information</h2>
          <div className="profile-grid">
            <div className="form-group full-width">
              <label>Skills</label>
              {isEditing ? (
                <textarea
                  name="skills"
                  value={profileData.skills}
                  onChange={handleInputChange}
                  rows="3"
                />
              ) : (
                <div className="profile-value">{profileData.skills}</div>
              )}
            </div>

            <div className="form-group full-width">
              <label>Education</label>
              {isEditing ? (
                <textarea
                  name="education"
                  value={profileData.education}
                  onChange={handleInputChange}
                  rows="3"
                />
              ) : (
                <div className="profile-value">{profileData.education}</div>
              )}
            </div>

            <div className="form-group full-width">
              <label>Certifications</label>
              {isEditing ? (
                <textarea
                  name="certifications"
                  value={profileData.certifications}
                  onChange={handleInputChange}
                  rows="3"
                />
              ) : (
                <div className="profile-value">{profileData.certifications}</div>
              )}
            </div>

            <div className="form-group full-width">
              <label>Languages</label>
              {isEditing ? (
                <textarea
                  name="languages"
                  value={profileData.languages}
                  onChange={handleInputChange}
                  rows="3"
                />
              ) : (
                <div className="profile-value">{profileData.languages}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberProfilePage