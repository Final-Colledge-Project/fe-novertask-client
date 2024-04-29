import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { Provider } from 'react-redux'

import { SnackbarProvider } from 'notistack'

import muiTheme from './utils/muiTheme/'
import App from './App.tsx'
import { AuthProvider } from './hooks/useAuth'
import store from './redux/index.ts'
import { Slide, styled } from '@mui/material'

import { MaterialDesignContent } from 'notistack'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
const StyledMaterialDesignContent = styled(MaterialDesignContent)((theme) => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: theme.theme.palette.green.main
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: theme.theme.palette.pink.main
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: theme.theme.palette.blue.main
  },
  '&.notistack-MuiContent-warning': {
    backgroundColor: theme.theme.palette.orange.main
  }
}))

const queryClient = new QueryClient()

const supabase = createClient(
  'https://zninqutqxatronscfnuy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuaW5xdXRxeGF0cm9uc2NmbnV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5NjYwOTgsImV4cCI6MjAyOTU0MjA5OH0.qiDzZMkZ2gFPd1VoQ4PdVOj8WihMabmf7qFuEYX_s3o'
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={muiTheme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <SessionContextProvider supabaseClient={supabase}>
                <SnackbarProvider
                  maxSnack={3}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  Components={{
                    success: StyledMaterialDesignContent,
                    error: StyledMaterialDesignContent,
                    info: StyledMaterialDesignContent,
                    warning: StyledMaterialDesignContent
                  }}
                  autoHideDuration={4000}
                  TransitionComponent={Slide}
                >
                  <App />
                </SnackbarProvider>
              </SessionContextProvider>
            </AuthProvider>
          </QueryClientProvider>
        </LocalizationProvider>
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
)
