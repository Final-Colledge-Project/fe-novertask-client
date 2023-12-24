import Calendar from './Calendar'
import DashBoardMain from './DashBoardMain'

import './style.scss'

const Dashboard = () => {
  

  return (
    <div className="dashboard-general-container">
      <DashBoardMain />
      <Calendar />
    </div>
  )
}
export default Dashboard
