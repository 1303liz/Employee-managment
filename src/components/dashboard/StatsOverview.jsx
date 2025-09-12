import './StatsOverview.css'

const StatsOverview = () => {
  return (
    <div className="stats-overview">
      <div className="stats-section">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">👤</span>
            <div className="activity-content">
              <p>New employee John Smith joined IT department</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">🏖️</span>
            <div className="activity-content">
              <p>Leave request approved for Jane Doe</p>
              <span className="activity-time">4 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">💰</span>
            <div className="activity-content">
              <p>Payroll processed for January 2024</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3>Department Overview</h3>
        <div className="department-stats">
          <div className="dept-stat">
            <span className="dept-name">IT</span>
            <span className="dept-count">25 employees</span>
          </div>
          <div className="dept-stat">
            <span className="dept-name">HR</span>
            <span className="dept-count">8 employees</span>
          </div>
          <div className="dept-stat">
            <span className="dept-name">Finance</span>
            <span className="dept-count">12 employees</span>
          </div>
          <div className="dept-stat">
            <span className="dept-name">Marketing</span>
            <span className="dept-count">15 employees</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsOverview
