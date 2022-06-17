import React from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'

import App from './components/App'
import store from './app/store'

const theme = createTheme({})
const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </Provider>
)