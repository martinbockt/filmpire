import React, { useState, useEffect} from 'react'
import { TextField, InputAdornment, Box } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

import { searchMovie } from '../../features/currentGenreOrCategory'

import useStyles from './styles'

const Search = () => {
    const navigate = useNavigate()
    const theme = useTheme()
    const classes = useStyles({theme})
    const [query, setQuery] = useState('')
    const dispatch = useDispatch()

    const handleKeyPress = (event) => {
        if(event.key === "Enter") {
            navigate('/')
            dispatch(searchMovie(query))
        }
    }

    return (
        <Box sx={classes.searchContainer}>
            <TextField 
                onKeyPress={handleKeyPress}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="standard"
                InputProps={{
                    sx: classes.input, 
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                    }}
            />
        </Box>
    )
}

export default Search