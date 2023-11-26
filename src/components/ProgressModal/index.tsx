import CircularProgress from '@mui/material/CircularProgress'
import * as StyledComponent from './style'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
const ProgressModal = () => {
  const { loading } = useSelector((state: StoreType) => state.progress)

  return (
    loading && (
      <StyledComponent.ProgressModalContainer>
        <CircularProgress
          size="50px"
          sx={{ color: (theme) => theme.palette.white.main }}
        />
      </StyledComponent.ProgressModalContainer>
    )
  )
}

export default ProgressModal
