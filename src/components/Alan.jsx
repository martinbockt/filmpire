import React, { useEffect, useContext } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ColorModeContext } from '../utils/ToggleColorMode'
import { fetchToken } from '../utils'
import { selectGenreOrCategory, searchMovie } from '../features/currentGenreOrCategory'

const useAlan = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { setMode } = useContext(ColorModeContext)

    useEffect(() => {
        alanBtn({
            key: process.env.REACT_APP_ALANAI_KEY,
            onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
                if (command === 'chooseGenre') {
                    const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase())

                    if (foundGenre) {
                        navigate('/')
                        dispatch(selectGenreOrCategory(foundGenre.id))
                    } else {
                        const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory
                        navigate('/')
                        dispatch(selectGenreOrCategory(category))
                    }
                }
                if (command === 'changeMode') {
                    if (mode === 'light') {
                        setMode('light')
                    } else {
                        setMode('dark')
                    }
                } else if (command === 'login') {
                    fetchToken()
                } else if (command === 'logout') {
                    localStorage.clear()
                    navigate('/')
                } else if (command === 'search') {
                    dispatch(searchMovie(query))
                }
            }
        });
    }, []);

    return (
        <div>Alan</div>
    )
}

export default useAlan