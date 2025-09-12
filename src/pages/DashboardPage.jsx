import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import DashboardCards from '../components/dashboard/DashboardCards'
import StatsOverview from '../components/dashboard/StatsOverview'
import './DashboardPage.css'

const DashboardPage = () => {
  const { user, hasRole } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    pendingLeaves: 0,
    totalDepartments: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Mock data for now - replace with actual API calls
        setStats({
          totalEmployees: 125,
          presentToday: 98,
          pendingLeaves: 12,
          totalDepartments: 8
        })
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const handleNavigation = (path) => {
    navigate(path)
  }

  const handleQuickAction = (action) => {
    switch(action) {
      case 'attendance':
        navigate('/attendance')
        break
      case 'leave':
        navigate('/leave')
        break
      case 'payroll':
        navigate('/payroll')
        break
      case 'profile':
        // For now, just navigate to dashboard
        navigate('/dashboard')
        break
      default:
        break
    }
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-welcome">
          Welcome back, {user?.first_name} {user?.last_name}!
        </p>
      </div>

      <div className="dashboard-content">
        {/* Admin/Manager Dashboard */}
        {hasRole('admin') || hasRole('manager') ? (
          <>
            <DashboardCards stats={stats} />
            <StatsOverview />
          </>
        ) : (
          /* Employee Dashboard */
          <div className="employee-dashboard">
            <div className="employee-cards">
              <div className="dashboard-card" onClick={() => handleNavigation('/dashboard')}>
                <div className="card-icon">👤</div>
                <div className="card-content">
                  <h3>My Profile</h3>
                  <p>View and update your profile information</p>
                </div>
              </div>

              <div className="dashboard-card" onClick={() => handleNavigation('/attendance')}>
                <div className="card-icon">📅</div>
                <div className="card-content">
                  <h3>My Attendance</h3>
                  <p>Track your attendance and working hours</p>
                </div>
              </div>

              <div className="dashboard-card" onClick={() => handleNavigation('/leave')}>
                <div className="card-icon">🏖️</div>
                <div className="card-content">
                  <h3>Leave Requests</h3>
                  <p>Submit and track your leave requests</p>
                </div>
              </div>

              <div className="dashboard-card" onClick={() => handleNavigation('/payroll')}>
                <div className="card-icon">💰</div>
                <div className="card-content">
                  <h3>Payroll</h3>
                  <p>View your salary and payment history</p>
                </div>
              </div>
            </div>

            <div className="employee-quick-actions">
              <h3>Quick Actions</h3>
              <div className="quick-actions-grid">
                <button className="quick-action-btn" onClick={() => handleQuickAction('attendance')}>Mark Attendance</button>
                <button className="quick-action-btn" onClick={() => handleQuickAction('leave')}>Request Leave</button>
                <button className="quick-action-btn" onClick={() => handleQuickAction('payroll')}>View Payslip</button>
                <button className="quick-action-btn" onClick={() => handleQuickAction('profile')}>Update Profile</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
