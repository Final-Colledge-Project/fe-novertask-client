import styled from '@emotion/styled'

export const CustomAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 16px;
`

export const WorkspaceGroupTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-left: 12px;
  margin-top: 12px;
  color: var(--mui-palette-gray-main);
  display: flex;
  align-items: baseline;
  gap: 8px;

  .title-content {
    max-width: 150px;
    /* show eclipse for overflow text */
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    overflow: hidden;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }

  & .title-line {
    flex-grow: 1;
    height: 1px;
    background: var(--mui-palette-gray5-main);
    bottom: -8px;
    margin-right: 12px;
  }
`
