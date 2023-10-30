import WorkSpaceSummary from '../components/WorkSpaceSummary'
import './style.scss'
import workspaceDatas from '~/services/mockData.json'
import SearchBox from '~/components/SearchBox'
import MenuPopup from './MenuPopup'
import AddWSPopup from './AddWSPopup'
import { useState } from 'react'
import AddPJPopup from './AddPJPopup'

const DashBoardMain = () => {
  const [addWSPopupVisible, setAddWSPopupVisible] = useState(false)
  const [addPJPopupVisible, setAddPJPopupVisible] = useState(false)
  const [addTaskPopupVisible, setAddTaskPopupVisible] = useState(false)

  const handleCloseAddWSPopup = () => {
    setAddWSPopupVisible(false)
  }
  const handleCloseAddPJPopup = () => {
    setAddPJPopupVisible(false)
  }

  const addMenuItems = [
    {
      title: 'Add workspace',
      onChoose: () => {
        setAddWSPopupVisible(true)
      }
    },
    {
      title: 'Add project',
      onChoose: () => {
        setAddPJPopupVisible(true)
      }
    },
    {
      title: 'Add task',
      onChoose: () => {
        setAddTaskPopupVisible(true)
      }
    }
  ]

  console.log('add WS popup: ', addWSPopupVisible)

  return (
    <div className="dashboard-main-container">
      <div className="dashboard-header">
        <h1 className="dashboard-header-title">Dashboard</h1>
        <div className="dashboard-header-searchbox">
          <SearchBox label="" />
        </div>
        <div className="dashboard-header-add-btn">
          <MenuPopup items={addMenuItems} />
        </div>
      </div>
      {workspaceDatas.map((workspace) => (
        <WorkSpaceSummary data={workspace} />
      ))}

      {addWSPopupVisible && (
        <AddWSPopup
          visible={addWSPopupVisible}
          onClose={handleCloseAddWSPopup}
        />
      )}
      {addPJPopupVisible && (
        <AddPJPopup
          visible={addPJPopupVisible}
          onClose={handleCloseAddPJPopup}
        />
      )}
    </div>
  )
}
export default DashBoardMain
