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
      icon: '⏰',
      roles: ['admin', 'manager', 'employee']
    },
    {
      path: '/leave',
      label: 'Leave',
      icon: '📅',
      roles: ['admin', 'manager', 'employee']
    },
    {
      path: '/payroll',
      label: 'Payroll',
      icon: '💰',
      roles: ['admin', 'manager']
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: '👤',
      roles: ['admin', 'manager', 'employee']
    }
  ]

  // Group menu items by category
  const coreItems = menuItems.slice(0, 3)
  const hrItems = menuItems.slice(3, 6)
  const personalItems = menuItems.slice(6)

  const renderMenuSection = (title, items) => (
    <div className="sidebar-section" key={title}>
      <h3 className="sidebar-section-title">{title}</h3>
      <ul className="sidebar-menu">
        {items.map((item) => {
          if (!hasAnyRole(item.roles)) return null
          
          const isActive = location.pathname === item.path
          
          return (
            <li key={item.path} className="sidebar-item">
              <Link 
                to={item.path} 
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-text">{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {renderMenuSection('Core', coreItems)}
        {renderMenuSection('HR Management', hrItems)}
        {renderMenuSection('Personal', personalItems)}
      </nav>
      
      <div className="sidebar-footer">
        <p className="sidebar-footer-text">
          Employee Management System
          <br />
          <small>v2.0</small>
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
