import { createSlice } from '@reduxjs/toolkit'
import { createWS, getAllMembers } from './actions'
import { IMockUser } from '~/services/workspaceService/resTypes'

interface TempWSType {
  id: string
  name: string
  workspaceSuperAdmins: string
}

const initialState: {
  loading: boolean
  error: undefined | string
  success: boolean
  currentTeamWS: TempWSType[] | undefined
  createWS: {
    loading: boolean
    error: undefined | string
    success: boolean
  }
  getAllMember: {
    loading: boolean
    error: undefined | string
    success: boolean
  }
  allMember:
    | {
        workspaceAdmins: { user: IMockUser; role: 'admin' | 'superAdmin' }[]
        workspaceMembers: { user: IMockUser }[]
      }
    | undefined
} = {
  loading: false,
  error: undefined,
  success: false,
  currentTeamWS: [],
  createWS: {
    loading: false,
    error: undefined,
    success: false
  },
  getAllMember: {
    loading: false,
    error: undefined,
    success: false
  },
  allMember: undefined
}

const teamWSSlice = createSlice({
  name: 'teamWorkspace',
  initialState,
  reducers: {
    resetCreateWS: (state) => {
      state.createWS = {
        loading: false,
        error: undefined,
        success: false
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWS.pending, (state) => {
        state.createWS = {
          loading: true,
          error: undefined,
          success: false
        }
      })
      .addCase(createWS.fulfilled, (state, { payload }) => {
        state.currentTeamWS?.push(payload as TempWSType)
        state.createWS = {
          error: undefined,
          loading: false,
          success: true
        }
      })
      .addCase(createWS.rejected, (state, { payload }) => {
        state.createWS = {
          error: payload as string,
          loading: false,
          success: false
        }
      })
      .addCase(getAllMembers.pending, (state) => {
        state.getAllMember = {
          loading: true,
          error: undefined,
          success: false
        }
      })
      .addCase(getAllMembers.fulfilled, (state, { payload }) => {
        const { workspaceAdmins, workspaceMembers } = payload!
        state.allMember = {
          workspaceAdmins,
          workspaceMembers: workspaceMembers || []
        }
        state.getAllMember = {
          error: undefined,
          loading: false,
          success: true
        }
      })
      .addCase(getAllMembers.rejected, (state, { payload }) => {
        state.getAllMember = {
          error: payload as string,
          loading: false,
          success: false
        }
      })
  }
})

export default teamWSSlice.reducer
export const { resetCreateWS } = teamWSSlice.actions
