import { Skeleton } from '@mui/material'
import { BigItem, Column, Container, SmallItem } from './styled'

const SItem = () => {
  return (
    <SmallItem>
      <Skeleton
        variant="rounded"
        animation="wave"
        width={'100%'}
        height={'100%'}
      />
    </SmallItem>
  )
}
const LItem = () => {
  return (
    <BigItem>
      <Skeleton
        variant="rounded"
        animation="wave"
        width={'100%'}
        height={'100%'}
      />
    </BigItem>
  )
}

const BoardDetailLoading = () => {
  return (
    <Container>
      <Column>
        <SItem />
        <SItem />
        <SItem />
      </Column>
      <Column>
        <LItem />
        <SItem />
        <SItem />
        <SItem />
      </Column>
      <Column>
        <SItem />
        <SItem />
        <LItem />
      </Column>
    </Container>
  )
}
export default BoardDetailLoading
