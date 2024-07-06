import * as StyledComponent from './style'
import { GooSpinner } from 'react-spinners-kit'
import { COLOR } from '~/utils/constant'
const Loading = () => {
  return (
    <StyledComponent.ProgressModalContainer>
      <GooSpinner size={50} color={COLOR.WHITE.main} loading={true} />
    </StyledComponent.ProgressModalContainer>
  )
}

export default Loading
