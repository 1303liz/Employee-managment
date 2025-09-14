import './DashboardCards.css'

const DashboardCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees || 0,
      icon: '👥',
      color: 'blue',
      subtitle: 'Active employees',
      trend: {
        type: 'up',
        value: '+5',
        label: 'vs last month'
      }
    },
    {
      title: 'Present Today',
      value: stats.presentToday || 0,
      icon: '✅',
      color: 'green',
      subtitle: `${Math.round(((stats.presentToday || 0) / (stats.totalEmployees || 1)) * 100)}% attendance`,
      trend: {
        type: 'up',
        value: '+2%',
        label: 'vs yesterday'
      }
    },
    {
      title: 'Pending Leaves',
      value: stats.pendingLeaves || 0,
      icon: '📋',
      color: 'orange',
      subtitle: 'Requires approval',
      trend: {
        type: 'down',
        value: '-3',
        label: 'vs last week'
      }
    },
    {
      title: 'Departments',
      value: stats.totalDepartments || 0,
      icon: '🏢',
      color: 'purple',
      subtitle: 'Active departments',
      trend: {
        type: 'neutral',
        value: '0',
        label: 'no change'
      }
    }
  ]

  const renderTrend = (trend) => {
    if (!trend) return null
    
    const trendIcon = trend.type === 'up' ? '↗' : trend.type === 'down' ? '↘' : '→'
    
    return (
      <span className={`card-trend ${trend.type}`}>
        <span>{trendIcon}</span>
        <span>{trend.value} {trend.label}</span>
      </span>
    )
  }

  return (
    <div className="dashboard-cards">
      {cards.map((card, index) => (
        <div key={index} className={`dashboard-card ${card.color}`}>
          <div className="card-icon">{card.icon}</div>
          <div className="card-content">
            <h3 className="card-value">{card.value.toLocaleString()}</h3>
            <p className="card-title">{card.title}</p>
            <div className="card-subtitle">
              <span>{card.subtitle}</span>
              {renderTrend(card.trend)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardCards
