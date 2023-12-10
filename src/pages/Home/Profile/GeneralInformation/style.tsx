import styled from '@emotion/styled'

export const UpdateAvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`

export const InfoSection = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  & > .info-section_title {
    font-size: 24px;
    font-weight: 700;
    line-height: normal;
    padding-bottom: 5px;
    width: 100%;
    border-bottom: 1px solid var(--mui-palette-divider);
  }
  & > .info-section_form-group {
    display: flex;
    justify-content: space-between;
    padding-right: 70px;
    gap: 100px;
  }
`

export const Avatar = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 100px;
  border: 1px solid var(--mui-palette-blue-main);
  padding: 8px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .change-avatar-button {
    position: absolute;
    bottom: 0;
    right: 15px;
  }
`

export const AvatarError = styled.div`
  font-size: 12px;
  color: var(--mui-palette-pink-main);
  display: flex;
  position: relative;
  padding: 20px 15px 15px;
  background-color: var(--mui-palette-gray6-main);
  border-radius: 8px;

  & .close-error-button {
    position: absolute;
    top: 0;
    right: 0;
  }
`
export const Form = styled.form`
  width: 100%;
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

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

export const UploadActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const Menu = styled.ul`
  list-style-type: none;
`

export const MenuItem = styled.li``
