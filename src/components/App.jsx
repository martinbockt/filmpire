import React, { useRef } from 'react'
import { CssBaseline } from '@mui/material'
import { Routes, Route } from 'react-router-dom'

import useStyles from './styles'
import useAlan from './Alan'

import { Actors, MovieInformation, Movies, NavBar, Profile } from './'

const App = () => {
    
    const classes = useStyles();
    const alanBtnContainer = useRef()
    useAlan()

    return (
        <classes.Root>
            <CssBaseline/>
            <NavBar/>
            <classes.Content>
                <div 
                style={classes.Toolbar}
                 />
                <Routes>
                    <Route exact path='/' element={<Movies/>}/>
                    <Route exact path='/movie/:id' element={<MovieInformation/>}/>
                    <Route exact path='/actors/:id' element={<Actors/>}/>
                    <Route exact path='/profile/:id' element={<Profile/>}/>
                    <Route exact path='/approved' element={<Profile />}/>
                </Routes>
            </classes.Content>
            <div ref={alanBtnContainer} />
        </classes.Root>
    )
}

export default App