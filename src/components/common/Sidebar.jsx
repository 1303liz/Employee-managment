import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Sidebar.css'

const Sidebar = () => {
  const { hasAnyRole } = useAuth()
  const location = useLocation()

  const menuItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: '📊',
      roles: ['admin', 'manager', 'employee']
    },
    {
      path: '/employees',
      label: 'Employees',
      icon: '👥',
      roles: ['admin', 'manager']
    },
    {
      path: '/departments',
      label: 'Departments',
      icon: '🏢',
      roles: ['admin', 'manager']
    },
    {
      path: '/attendance',
      label: 'Attendance',
      icon: '📅',
      roles: ['admin', 'manager', 'employee']
    },
    {
      path: '/leave',
      label: 'Leave Management',
      icon: '🏖️',
      roles: ['admin', 'manager', 'employee']
    },
    {
      path: '/payroll',
      label: 'Payroll',
      icon: '💰',
      roles: ['admin', 'employee']
    },
    {
      path: '/profile',
      label: 'My Profile',
      icon: '👤',
      roles: ['admin', 'manager', 'employee']
    }
  ]

  const filteredMenuItems = menuItems.filter(item => 
    hasAnyRole(item.roles)
  )

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {filteredMenuItems.map((item) => (
            <li key={item.path} className="sidebar-item">
              <Link
                to={item.path}
                className={`sidebar-link ${
                  location.pathname === item.path ? 'active' : ''
                }`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
