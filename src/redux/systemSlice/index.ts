import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ISystemState {
  errorCode: number | undefined
  message: string | undefined,
  showHomeButton?: boolean
}

const initState: ISystemState = {
  errorCode: undefined,
  message: undefined,
  showHomeButton: true
}

const systemSlice = createSlice({
  name: 'system',
  initialState: initState,
  reducers: {
    setErrorScreen: (state, action: PayloadAction<ISystemState>) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export default systemSlice.reducer
export const { setErrorScreen } = systemSlice.actions
