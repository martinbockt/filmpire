import { Scale } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const useStyles = ({theme}) => ({

    movie: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    links: {
        alignItems: 'center',
        fontWeight: 'bolder',
        textDecoration: 'none',
        [theme.breakpoints.up('xs')]: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    image: {
        borderRadius: '20px',
        height: '300px',
        marginBottom: '10px',
    },
    title: {
        color: theme.palette.text.primary,
        textOverflow: 'ellipsis',
        width: '230px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        marginTop: '10px',
        marginBottom: 0,
        textAlign: 'center'
    }
})

export default useStyles