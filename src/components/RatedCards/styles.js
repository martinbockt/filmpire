import { styled } from '@mui/material/styles';


const useStyles = ({theme}) => ({

    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
        gap: '10px'
    }
})

export default useStyles