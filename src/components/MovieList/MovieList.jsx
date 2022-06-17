import React from 'react'
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'


import useStyles from './styles'
import { Movie } from '..'

const MovieList = ({ movies }) => {

    const theme = useTheme()
    const classes = useStyles({theme})

    return (
        <Grid container sx={{...classes.movieContainer}}>
            {movies.results.map((movie, i) => (
                <Movie key={i} movie={movie} i={i} />
            ))}
        </Grid>
    )
}

export default MovieList