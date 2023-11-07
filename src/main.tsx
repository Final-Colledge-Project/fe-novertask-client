import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { Provider } from 'react-redux'

import muiTheme from './utils/muiTheme/'
import App from './App.tsx'
import { AuthProvider } from './hooks/useAuth'
import store from './redux/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={muiTheme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LocalizationProvider>
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
)
