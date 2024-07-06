import { IProps } from './IProps'
import { Container, Description, Image, ImageContainer } from './style'

const Empty = (props: IProps) => {
  const { size, description, isFullWidth, m, mX, mY, p, pX, pY } = props
  const DEFAULT_SIZE = 100 // 100px
  const DEFAULT_STRING = 'Empty'

  const padding = () => {
    if (p) return `${p}px`
    if (pX && pY) return `${pY}px ${pX}px`
    if (pX) return `0 ${pX}px`
    if (pY) return `${pY}px 0`
    return '0'
  }

  const margin = () => {
    if (m) return `${m}px`
    if (mX && mY) return `${mY}px ${mX}px`
    if (mX) return `0 ${mX}px`
    if (mY) return `${mY}px 0`
    return '0'
  }

  return (
    <Container
      $fullWidth={!!isFullWidth}
      $padding={padding()}
      $margin={margin()}>
      <ImageContainer $size={size ?? DEFAULT_SIZE}>
        <Image src="/img/no-data.png" alt="Empty" />
      </ImageContainer>
      <Description>{description ?? DEFAULT_STRING}</Description>
    </Container>
  )
}

export default Empty
