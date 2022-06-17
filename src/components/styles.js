import { styled } from '@mui/material/styles';

const useStyles = () => ({

    Root: styled('div')(({ theme }) => ({
        display: 'flex',
        height: '100%',
    })),
 
    Toolbar: {
        height: '70px'
    },

    Content: styled('main')(({ theme }) => ({
        flexGrow: '1',
        padding: '2em',
    })),
})

export default useStyles