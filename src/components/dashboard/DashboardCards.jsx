import './DashboardCards.css'

const DashboardCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: '👥',
      color: 'blue'
    },
    {
      title: 'Present Today',
      value: stats.presentToday,
      icon: '✅',
      color: 'green'
    },
    {
      title: 'Pending Leaves',
      value: stats.pendingLeaves,
      icon: '📋',
      color: 'orange'
    },
    {
      title: 'Departments',
      value: stats.totalDepartments,
      icon: '🏢',
      color: 'purple'
    }
  ]

  return (
    <div className="dashboard-cards">
      {cards.map((card, index) => (
        <div key={index} className={`dashboard-card ${card.color}`}>
          <div className="card-icon">{card.icon}</div>
          <div className="card-content">
            <h3 className="card-value">{card.value}</h3>
            <p className="card-title">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardCards
