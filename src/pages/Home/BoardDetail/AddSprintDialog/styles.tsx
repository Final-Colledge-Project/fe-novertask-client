import styled from '@emotion/styled'

export const Container = styled.div`
  min-width: 600px;
  max-width: 600px;
  background-color: var(--mui-palette-white-main);
  border-radius: 8px;
`

export const Body = styled.div`
  height: 400px;
  overflow-y: auto;
`

export const ActionButtonsGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`
export const Placeholder = styled.div`
  width: 100%;
  color: var(--mui-palette-gray-main);
  padding: 50px 0;
  text-align: center;
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
