import styled from '@emotion/styled'

export const MemberItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 10px 5px 0;
  border-bottom: 1px solid var(--mui-palette-divider);

  & > .body {
    display: flex;
    gap: 10px;
    align-items: center;

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
  }
`
