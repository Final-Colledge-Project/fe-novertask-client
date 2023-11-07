import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import authReducer from './authSlice'
import snackBarReducer from './snackBarSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    snackBar: snackBarReducer
  }
})

export type StoreType = ReturnType<typeof store.getState>
export type StoreDispatchType = typeof store.dispatch
export default store
