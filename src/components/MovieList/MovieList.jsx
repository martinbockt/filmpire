import React from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'


import useStyles from './styles'
import { Movie } from '..'

const MovieList = ({ movies }) => {

    const theme = useTheme()
    const classes = useStyles({theme})

    return (
        <Box container sx={classes.movieContainer}>
            {movies.results.map((movie, i) => (
                <Movie key={i} movie={movie} i={i} />
            ))}
        </Box>
    )
}

export default MovieList