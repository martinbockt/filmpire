import React from 'react'
import { Typography, Button, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import useStyles from './styles'


const Pagination = ({ currentPage, setPage, totalPages }) => {

    const theme = useTheme()
    const classes = useStyles({theme})

    console.log(currentPage)
    console.log(totalPages)

    let maxPages = totalPages > 500 ? 500 : totalPages
    const handlePrev = () => {
        currentPage !== 1 
        ? setPage((prevPage) => prevPage - 1)
        : setPage(maxPages)
    }

    const handleNext = () => {
        currentPage !== maxPages
        ? setPage((prevPage) => prevPage + 1)
        : setPage(0)
    }

    return (
        <Box sx={classes.container}>
            <Button onClick={handlePrev} sx={classes.button} variant="contained" color="primary" type="button">Prev</Button>
            <Typography variant="h4" sx={classes.pageNumber}>{currentPage}</Typography>
            <Button onClick={handleNext} sx={classes.button} variant="contained" color="primary" type="button">Next</Button>
        </Box>
    )
}

export default Pagination