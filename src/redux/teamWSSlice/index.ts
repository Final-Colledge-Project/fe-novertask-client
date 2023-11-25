import { createSlice } from '@reduxjs/toolkit'
import { assignAdmin, createWS, getAllMembers } from './actions'
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
  currTeamMembers:
    | {
        workspaceAdmins: { user: IMockUser; role: 'admin' | 'superAdmin' }[]
        workspaceMembers: { user: IMockUser }[]
      }
    | undefined
  assignAdmin: {
    loading: boolean
    error: undefined | string
    success: boolean
  }
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
  assignAdmin: {
    loading: false,
    error: undefined,
    success: false
  },
  currTeamMembers: undefined
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
    },
    resetAssignAdmin: (state) => {
      state.assignAdmin = {
        loading: false,
        error: undefined,
        success: false
      }
    },
    resetGetAllMember: (state) => {
      state.getAllMember = {
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
        state.currTeamMembers = {
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
      .addCase(assignAdmin.pending, (state) => {
        state.assignAdmin = {
          loading: true,
          error: undefined,
          success: false
        }
      })
      .addCase(assignAdmin.fulfilled, (state, { payload }) => {
        const { workspaceAdmins, workspaceMembers } = payload!
        state.currTeamMembers = {
          workspaceAdmins,
          workspaceMembers: workspaceMembers || []
        }
        state.assignAdmin = {
          error: undefined,
          loading: false,
          success: true
        }
      })
      .addCase(assignAdmin.rejected, (state, { payload }) => {
        state.assignAdmin = {
          error: payload as string,
          loading: false,
          success: false
        }
      })
  }
})

export default teamWSSlice.reducer
export const { resetCreateWS, resetAssignAdmin, resetGetAllMember } =
  teamWSSlice.actions
