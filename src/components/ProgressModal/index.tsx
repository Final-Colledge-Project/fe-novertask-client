import * as StyledComponent from './style'
import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'
import { GooSpinner } from 'react-spinners-kit'
import { COLOR } from '~/utils/constant'
const ProgressModal = () => {
  const { loading } = useSelector((state: StoreType) => state.progress)

  return (
    loading && (
      <StyledComponent.ProgressModalContainer>
        <GooSpinner size={50} color={COLOR.WHITE.main} loading={true} />
      </StyledComponent.ProgressModalContainer>
    )
  )
}

export default ProgressModal
