import styled from '@emotion/styled'

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: rgba(var(--mui-palette-black-mainChannel) / 0.2);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  scale: 1;
  transform-origin: center center;
  opacity: 1;
  transition: opacity 0.3s;

  &.hidden {
    scale: 0;
    opacity: 0;
  }
`

export const Modal = styled.div`
  min-width: 500px;
  max-width: 500px;
  padding: 20px;
  background-color: var(--mui-palette-white-main);
  border-radius: 8px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  & > .title {
    font-weight: 700;
    display: flex;
    align-items: baseline;
    gap: 5px;
    font-size: 20px;
    color: var(--mui-palette-blue-main);

    & > .icon {
      position: relative;
      top: 4px;
    }
  }
`

export const Members = styled.div`
  width: 100%;
  max-height: 500px;
  height: 300px;
  /* background-color: var(--mui-palette-gray5-main); */
  display: flex;
  gap: 5px;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 20px;
`

export const MemberItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 10px 5px 0;
  border-bottom: 1px solid var(--mui-palette-divider);

  & > .info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    line-height: normal;
    flex: 1;

    .email {
      color: var(--mui-palette-gray-main);
      font-size: 12px;
    }
    .name {
      font-size: 14px;
    }
    .name-role-group {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  & .role {
    display: flex;
    width: fit-content;
    justify-content: flex-end;
    text-align: right;
    font-size: 12px;
    padding: 0px 8px;
    border-radius: 50px;
    color: var(--mui-palette-white-main);

    &.boardAdmin {
      background-color: rgba(var(--mui-palette-yellow-mainChannel) / 0.1);
      color: var(--mui-palette-yellow-main);
    }
    &.boardLead {
      background-color: rgba(var(--mui-palette-orange-mainChannel) / 0.1);
      color: var(--mui-palette-orange-main);
    }

    // member
    background-color: rgba(var(--mui-palette-green-mainChannel) / 0.1);
    color: var(--mui-palette-green-main);
  }

  & .plaintext {
    font-size: 12px;
    color: var(--mui-palette-gray-main);
  }
`
export const MemberSectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > .note {
    font-size: 12px;
    color: var(--mui-palette-gray-main);
    padding-right: 10px;
  }
`
export const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;

  & > .total {
    font-size: 14px;
    width: 100%;
    text-align: right;
  }

  & > .action-group {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
`

export const ActionButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
