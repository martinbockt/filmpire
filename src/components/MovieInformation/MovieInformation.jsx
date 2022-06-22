import React, { useState, useEffect } from 'react'
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating } from '@mui/material'
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack} from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory'
import genreIcons from '../../assets/genres'
import useStyles from './styles'
import { useGetMovieQuery, useGetRecommendationsQuery, useGetListQuery } from '../../services/TMDB'
import { MovieList } from '..'
import { userSelector } from '../../features/auth'


function MovieInformation() {
  const navigate = useNavigate()

  const { user } = useSelector(userSelector)
  const { id } = useParams()
  const theme = useTheme()
  const classes = useStyles({theme})
  const dispatch = useDispatch()

  const { data, isFetching, error } = useGetMovieQuery(id)
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id})
  const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1})
  const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1})

  const [isMovieFavorited, setIsMovieFavorited] = useState(false)
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false)

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id))
  }, [favoriteMovies, data])
  
  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id))
  }, [watchlistMovies, data])

  const [open, setOpen] = useState(false)

  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited
    })

    setIsMovieFavorited((prev) => !prev)
  }

  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted
    })

    setIsMovieWatchlisted((prev) => !prev)
  }

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
        <Button onClick={() => navigate(-1)} endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main'}}>
          Something has gone wrong - Go back
        </Button>
      </Box>
    )
  }

  return (
    <Grid container sx={classes.containerSpaceAround}>
      <Grid item display="flex" sm={12} lg={4}>
        <Box
          component="img"
          sx={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography component="h1" variant="h3" align="center" gutterBottom>
          {data?.title} ({data?.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item sx={classes.containerSpaceAround}>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant="subtitle1" gutterBottom sx={{marginLeft: '10px'}}>
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
          {data?.runtime} min | Language: {data?.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid item sx={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link key={genre.name} style={classes.links} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <Box component="img" src={genreIcons[genre.name.toLowerCase()]} alt={genre.name + 'Category'} sx={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom sx={{marginTop: '10px'}}>
            Overview
        </Typography>
        <Typography gutterBottom sx={{marginBottom: '10px'}}>
            {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
            Top Cast
        </Typography>
        <Grid item container spacing={2}>
            {data && data.credits?.cast?.map((character, i) => (
              character.profile_path && <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} sx={{textDecoration: 'none'}}>
                <Box component="img" src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} sx={classes.castImage} />
                <Typography color="textPrimary">
                  {character.name}
                </Typography>
                <Typography color="textSecondary">
                  {character.character.split('/')[0]}
                </Typography>
              </Grid>
            )).slice(0,6)}
        </Grid>
        <Grid item container sx={{marginTop: '2rem'}}>
          <Box sx={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} sx={classes.buttonsContainer}>
              <ButtonGroup size="small" variant="outlined">
                {data?.homepage && <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>}
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => setOpen(() => (true))} href="#" endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} sx={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>{isMovieFavorited ? "Unfavorite" : "Favorite"}</Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>Watchlist</Button>
                <Button onClick={() => navigate(-1)}endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main'}}>
                  Back
                </Button>
              </ButtonGroup>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '5rem', width: '100%'}}>
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations
        ? <MovieList movies={recommendations} numberOfMovies={12}/>
        : <Box>Sorry nothing has been found</Box>
        }
      </Box>
      <Modal
        closeAfterTransition
        sx={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <Box
            component="iframe"
            autoPlay
            sx={classes.video}
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  )
}

export default MovieInformation