import styled from '@emotion/styled'

export const ChangePasswordContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;

  & .section__title {
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
    padding-bottom: 5px;
    width: 100%;
    border-bottom: 1px solid var(--mui-palette-divider);
    color: var(--mui-palette-blue-main);
  }

  & .section__sub-title {
    color: var(--mui-palette-gray-main);
    font-size: 14px;
  }
`

export const Form = styled.form`
  margin-top: 30px;
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
`

export const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  & > .label {
    font-weight: 700;
    font-size: 14px;
    color: var(--mui-palette-black-main);
  }
`
export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

export const FormActionsGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`
