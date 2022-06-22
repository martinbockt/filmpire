import React from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'

import App from './components/App'
import store from './app/store'
import './styles.css'
import ToggleColorModeProvider from './utils/ToggleColorMode'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <ToggleColorModeProvider>
            <Router>
                <App />
            </Router>
        </ToggleColorModeProvider>
    </Provider>
)