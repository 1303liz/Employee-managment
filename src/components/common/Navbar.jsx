import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Generate user initials for avatar
  const getUserInitials = () => {
    if (!user?.first_name && !user?.last_name) return 'U'
    const firstInitial = user?.first_name?.charAt(0) || ''
    const lastInitial = user?.last_name?.charAt(0) || ''
    return `${firstInitial}${lastInitial}`.toUpperCase()
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">
          EM
        </div>
        <h2>Employee Management</h2>
      </div>
      
      <div className="navbar-user">
        <div className="user-info">
          <span className="user-name">{user?.first_name} {user?.last_name}</span>
          <span className="user-role">{user?.role}</span>
        </div>
        <div className="user-avatar">
          {getUserInitials()}
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <span>Logout</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16,17 21,12 16,7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
