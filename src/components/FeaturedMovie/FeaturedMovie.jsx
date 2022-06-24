import React from 'react'
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material'
import { Link } from "react-router-dom"

import useStyles from './styles'
import { useTheme } from '@mui/material/styles'

const FeaturedMovie = ({ movie }) => {

    const theme = useTheme()
    const classes = useStyles({theme})

    if (!movie) return null

    return (
        <Box component={Link} to={`/movie/${movie.id}`} sx={classes.featuredCardContainer}>
            <Card sx={classes.card}>
                <CardMedia
                    media="pictures"
                    ald={movie.title}
                    image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    title={movie.title}
                    sx={classes.cardMedia}
                />
                <Box padding="20px">
                    <CardContent sx={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>{movie.title}</Typography>
                        <Typography variant="body2">{movie.overview}</Typography>
                    </CardContent>

                </Box>
            </Card>
        </Box>
    )
}

export default FeaturedMovie