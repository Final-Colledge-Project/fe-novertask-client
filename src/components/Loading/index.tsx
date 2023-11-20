import { CircularProgress } from '@mui/material'
import * as StyledComponent from './style'
const Loading = () => {
  return (
    <StyledComponent.ProgressModalContainer>
      <CircularProgress
        size="50px"
        sx={{ color: (theme) => theme.palette.white.main }}
      />
    </StyledComponent.ProgressModalContainer>
  )
}

export default Loading
