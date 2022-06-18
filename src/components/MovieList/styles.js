import { styled } from '@mui/material/styles';

const useStyles = ({theme}) => ({

    imageLink: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10% 0'
    },

    image: {
        width: '70%'
    },
    movieContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '10px',
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center'
        }
    }
})

export default useStyles