import styled from '@emotion/styled'

export const Container = styled.div<{
  $fullWidth: boolean
  $padding: string
  $margin: string
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};
  padding: ${(props) => props.$padding};
  margin: ${(props) => props.$margin};
`
export const Description = styled.span`
  margin-top: 4px;
  font-size: 14px;
  color: var(--mui-palette-gray-main);
`

export const Image = styled.img`
  width: 150%;
  height: 150%;
  object-fit: contain;
  object-position: center;
  opacity: 0.7;
`

export const ImageContainer = styled.div<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  display: flex;
  justify-content: center;
  align-items: center;
`
