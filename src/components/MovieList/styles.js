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
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        overflow: 'auto',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center'
        }
    }
})

export default useStyles