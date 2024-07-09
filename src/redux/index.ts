import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import authReducer from './authSlice'
import snackBarReducer from './snackBarSlice'
import teamWSReducer from './teamWSSlice'
import progressReducer from './progressSlice'
import popupReducer from './popupSlice'
import boardReducer from './boardSlice'
import navReducer from './navSlice'
import notiReducer from './notiSlice'
import cardReducer from './cardSlice'
import scheduleReducer from './scheduleSlice'
import columnReducer from './columnSlice'
import systemReducer from './systemSlice'
import permissionReducer from './permissionSlice'
import sprintReducer from './sprintSlice'
import priorityReducer from './prioritySlice'
import issueTypeReducer from './issueTypeSlice'
import labelReducer from './labelSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    snackBar: snackBarReducer,
    teamWorkspace: teamWSReducer,
    progress: progressReducer,
    popup: popupReducer,
    board: boardReducer,
    nav: navReducer,
    notification: notiReducer,
    card: cardReducer,
    schedule: scheduleReducer,
    column: columnReducer,
    system: systemReducer,
    permission: permissionReducer,
    sprint: sprintReducer,
    priority: priorityReducer,
    issueType: issueTypeReducer,
    label: labelReducer
  }
})

export type StoreType = ReturnType<typeof store.getState>
export type StoreDispatchType = typeof store.dispatch
export default store
