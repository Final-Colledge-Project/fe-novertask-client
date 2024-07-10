import styled from '@emotion/styled'

export const Modal = styled.div`
  width: 550px;
  height: 500px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 20px 0 24px;
  margin-right: 4px;
`

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`

export const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
`

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 20px;

  &.row {
    flex-direction: row;
    align-items: center;
    column-gap: 10px;
  }

  &.c-gap-5 {
    gap: 20px;
  }

  &.level-2 {
    gap: 4px;
    width: 100%;
  }

  &.mb-0 {
    margin-bottom: 0;
  }

  &.gap-0 {
    gap: 0;
  }

  &.mt-3 {
    margin-top: 12px;
  }

  &.flex-1 {
    flex: 1;
  }
`

export const SubTitle = styled.div<{ $isRequired?: boolean }>`
  /* level 1 */
  font-size: 12px;
  font-weight: 600;

  /* level 2 */
  &.level-2 {
    font-size: 12px;
    font-weight: 400;
  }

  &.fixed-width {
    width: 120px;
  }

  &.mb-3 {
    margin-bottom: 12px;
  }

  &.text-bold {
    font-weight: 600;
  }

  ${(props) =>
    props.$isRequired &&
    `
    &:after {
      content: '*';
      color: var(--mui-palette-error-main);
    }
  `}
`

export const Label = styled.div<{ $color: string }>`
  color: ${(props) => props.$color};
  background-color: ${(props) => props.$color + '20'};
  padding: 2px 10px;
  border-radius: 50px;
  font-size: 14px;
  min-height: 25px;
`

export const Priority = styled.div<{ $color: string }>`
  padding: 0px 8px;
  border-radius: 5px;
  background-color: var(--mui-palette-gray-main);
  color: var(--mui-palette-white-main);
  font-size: 12px;

  background-color: ${(props) => props.$color};
`

export const HorizontalDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--mui-palette-gray-main);
  margin: 12px 0;
  flex-shrink: 0;
`
