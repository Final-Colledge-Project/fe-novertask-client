import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import authReducer from './authSlice'
import snackBarReducer from './snackBarSlice'
import teamWSReducer from './teamWSSlice'
import progressReducer from './progressSlice'
import popupReducer from './popupSlice'
import boardReducer from './boardSlice'
import navReducer from './navSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    snackBar: snackBarReducer,
    teamWorkspace: teamWSReducer,
    progress: progressReducer,
    popup: popupReducer,
    board: boardReducer,
    nav: navReducer
  }
})

export type StoreType = ReturnType<typeof store.getState>
export type StoreDispatchType = typeof store.dispatch
export default store
