import styled from '@emotion/styled'

export const Container = styled.div`
  flex: 1;
  padding: 10px 20px;
`
export const Header = styled.div`
  width: 100%;

  & .header-text {
    font-size: 24px;
    color: var(--mui-palette-blue-main);
  }
`

export const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  gap: 20px;
`

export const User = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`

export const UserDetailInfo = styled.div`
  display: flex;
  align-items: start;
  width: 100%;
  height: 100%;
`

export const GeneralAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`

export const GeneralInfo = styled.div`
  flex: 1;
  line-height: normal;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  & > .name {
    font-size: 20px;
    font-weight: 700;
  }
  & > .email {
    color: var(--mui-palette-gray-main);
    font-size: 14px;
  }
`

export const SideBar = styled.div`
  flex: 0 0 250px;
  height: 100%;
`

export const VerticalDivider = styled.div`
  width: 1px;
  height: 100%;
  border-right: 1px solid var(--mui-palette-divider);
  margin: 0 20px;
`

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
export const Form = styled.div`
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
  font-size: 14px;
  display: flex;
  flex-direction: column;

  .item {
    padding: 8px 20px;
    width: 100%;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;
    color: var(--mui-palette-black-main);

    &--active {
      background-color: var(--mui-palette-gray6-main);
    }

    &.item--active:hover {
      background-color: var(--mui-palette-gray4-main);
    }

    &:hover {
      background-color: var(--mui-palette-gray6-main);
    }
  }
`
