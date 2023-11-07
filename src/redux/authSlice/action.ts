import { ISignInBody } from '~/services/authService'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '~/services'

const { signIn: signInService } = authService

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (data: ISignInBody, thunkApi) => {
    try {
      // sign in
      const res = await signInService(data)
      if (res && res.data) {
        // persist the token
        localStorage.setItem(
          import.meta.env.VITE_USER_TOKEN_KEY,
          res.data as string
        )

        // return token for reducer
        return res.data as string
      }
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message as string)
    }
  }
)

