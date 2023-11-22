import { Skeleton } from '@mui/material'
import { Container, Modal } from './styles'

const Loading = () => {
  return (
    <Container>
      <Modal>
        <Skeleton
          animation={'wave'}
          variant="rounded"
          width={'100%'}
          height={'100%'}
        />
      </Modal>
    </Container>
  )
}

export default Loading
