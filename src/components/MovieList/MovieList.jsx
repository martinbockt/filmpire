import React from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'


import useStyles from './styles'
import { Movie } from '..'

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {

    const theme = useTheme()
    const classes = useStyles({theme})

    const startFrom = excludeFirst ? 1 : 0

    return (
        <Box container sx={classes.movieContainer}>
            {movies?.results?.slice(startFrom, numberOfMovies).map((movie, i) => (
                <Movie key={i} movie={movie} i={i} />
            ))}

            {movies?.cast?.slice(startFrom, numberOfMovies).map((movie, i) => (
                <Movie key={i} movie={movie} i={i} />
            ))}


        </Box>
    )
}

export default MovieList