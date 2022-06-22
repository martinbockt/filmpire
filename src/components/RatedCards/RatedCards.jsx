import React from 'react'
import { Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Movie } from '..'
import useStyles from './styles'

const RatedCards = ({ title, data }) => {
    const theme = useTheme()
    const classes = useStyles({theme})

    return (
        <Box>
            <Typography variant="h5" gutterBottom>{title}</Typography>
            <Box sx={classes.container}>
                {data?.results.map((movie, i) => (
                    <Movie key={movie.id} movie={movie} i={i} />
                ))}
            </Box>
        </Box>
    )
}

export default RatedCards
