import React from 'react'
import { Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery } from '@mui/material'
import { Movie as MovieIcon, Theaters, Language, ArrowBack} from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { Link, useParams } from 'react-router-dom'

import useStyles from './styles'
import { useGetActorQuery, useGetActorCreditsQuery } from '../../services/TMDB'
import { MovieList } from '..'

function Actors() {
  const { id } = useParams()
  const { data, isFetching, error } = useGetActorQuery(id)
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetActorCreditsQuery(id)


  const theme = useTheme()
  const classes = useStyles({theme})


  if(isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    )
  }

  if(error) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">Something has gone wrong - Go back</Link>
      </Box>
    )
  }

  return (
    <Grid container sx={classes.containerSpaceAround}>
      <Grid item display="flex" sm={12} lg={4}>
        <Box
          component="img"
          sx={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
          alt={data?.name}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography component="h1" variant="h2" gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant="h5" gutterBottom sx={{marginTop: '10px'}}>
            Born: {data?.birthday}
        </Typography>
        <Typography gutterBottom sx={{marginBottom: '10px'}}>
            {data?.biography}
        </Typography>
        <Grid item container sx={{marginTop: '2rem'}}>
          <Box sx={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} sx={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                {data?.homepage && <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>}
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/name/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
              </ButtonGroup>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '2rem', width: '100%'}}>
        <Typography component="h2" variant="h3" gutterBottom align="center">
          Movies
        </Typography>
        {recommendations
        ? <MovieList movies={recommendations} numberOfMovies={12}/>
        : <Box>Sorry nothing has been found</Box>
        }
      </Box>
    </Grid>
  )
}

export default Actors