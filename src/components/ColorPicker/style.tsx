import styled from '@emotion/styled'

export const Section = styled.div`
  min-width: 280px;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px;

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

  &.keep-hover {
    outline-color: var(--mui-palette-gray-main);
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
  padding: 10px;
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

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CurrentColorBox = styled.div<{ $color: string }>`
  width: 100%;
  border-radius: 8px;
  height: 50px;
  background-color: ${(props) => props.$color};
  outline: 1px solid var(--mui-palette-gray-main);
  margin: 4px;
  outline-offset: 3px;
`
