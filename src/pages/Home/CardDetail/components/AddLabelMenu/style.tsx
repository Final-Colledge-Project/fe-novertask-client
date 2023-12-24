import styled from '@emotion/styled'
import { CircularProgress, CircularProgressProps } from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'

export const Layer = styled.div`
  &.open {
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: transparent;
  }
`

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: var(--mui-palette-white-main);

  & .edit-icon {
    margin-left: auto;
  }
`

export const MenuHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 10px 15px;
  border-bottom: 1px solid var(--mui-palette-divider);
`

export const MenuBody = styled.div`
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  gap: 10px;
  margin: 0 10px;
`

export const Label = styled.div<{ $color: string }>`
  color: ${(props) => props.$color};
  background-color: ${(props) => props.$color + '20'};
  padding: 2px 10px;
  border-radius: 50px;
  font-size: 14px;
  min-height: 25px;
`

export const MenuFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid var(--mui-palette-divider);
`
export const MenuGeneralContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`

export const Divider = styled.div`
  flex-shrink: 0;
  height: 100%;
  width: 1px;
  background-color: var(--mui-palette-divider);
`

export const LabelSelectContainer = styled.div`
  min-width: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;

  & ul.MuiList-root {
    max-height: 200px;
  }
`

export const LabelCreatorContainer = styled.div`
  display: flex;
  min-width: 300px;
  flex-direction: column;
  padding-bottom: 20px;
`

export const LabelCreatorBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  margin: 0 10px;
`

export const LabelReviewContainer = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  .section__title {
    font-size: 14px;
    font-weight: 700;
    text-align: left;
    width: 100%;
  }
`

export const ProvidedColorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  /* justify-content: space-evenly; */
  /* align-content: flex-end; */
`

export const ColorBox = styled.div<{ $color: string }>`
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.$color || 'var(--mui-palette-gray-main))'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: var(--mui-palette-gray-main);
  outline: 2px solid transparent;
  border: 1px solid var(--mui-palette-divider);

  outline-offset: 3px;
  -moz-outline-radius: 10px;

  &:hover {
    outline-color: var(--mui-palette-gray-main);
  }

  &.chosen {
    outline-color: var(--mui-palette-blue-main);
  }
`

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  margin-top: 5px;
`

export const ColorPickerContainer = styled.div`
  width: 100%;

  & .rcp-body {
    background-color: var(--mui-palette-white-main);
    gap: 10px;
    padding: 5px;
    padding-top: 10px;
  }

  & .rcp-field-input {
    color: var(--mui-palette-gray-main);
    border: 1px solid var(--mui-palette-gray-main);
  }

  & .rcp-field-label {
    color: var(--mui-palette-black-main);
  }
`

export const Loading = muiStyled((props: CircularProgressProps) => (
  <CircularProgress
    size="15px"
    sx={{
      color: (theme) => theme.palette.blue.main,
      display: 'inline-block',
      ml: '10px'
    }}
    {...props}
  />
))()

