import React from 'react'
import { Typography, Box, Grow, Tooltip, Rating } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'


import useStyles from './styles'

const Movie = ({ movie, i}) => {

    const theme = useTheme()
    const classes = useStyles({theme})

    return (
        <Box item sx={classes.movie}>
            <Grow in key={i} timeout={ (i+1) * 250}>
                <Link style={classes.links} className="movie_links" to={`/movie/${movie.id}`}>
                    <img 
                        className="movie_image"
                        alt={movie.title} 
                        style={classes.image} 
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://www.fillmurray.com/200/300'}/>
                    <Typography sx={classes.title} variant="h5">{movie.title}</Typography>
                </Link>
            </Grow>
            <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
                <div>
                    <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
                </div>
            </Tooltip>
        </Box>
    )
}

export default Movie