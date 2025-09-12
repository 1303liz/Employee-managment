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

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Employee Management System</h2>
      </div>
      
      <div className="navbar-user">
        <div className="user-info">
          <span className="user-name">{user?.first_name} {user?.last_name}</span>
          <span className="user-role">{user?.role}</span>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar
