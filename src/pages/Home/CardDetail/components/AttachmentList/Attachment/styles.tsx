import styled from '@emotion/styled'

export const AttachmentContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px 12px;
  border-radius: 12px;
  background-color: white;
  border: 1px solid var(--mui-palette-gray-main);

  &:hover {
    box-shadow: 0px 0px 6px 1px var(--mui-palette-gray6-main);
  }
`

export const AttachmentName = styled.div<{ $isImage?: boolean }>`
  font-size: 14px;
  flex: 1;
  display: flex;
  align-items: baseline;
  gap: 4px;

  flex-direction: ${({ $isImage }) => ($isImage ? 'column' : 'row')};

  & > .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--mui-palette-black-main);
    -webkit-box-oriented: vertical;
    display: -webkit-box;
    font-weight: 600;
  }

  & > .date {
    font-size: 12px;
    color: var(--mui-palette-gray-main);
  }
`

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  width: fit-content;
`

export const AttachmentReview = styled.div`
  width: 195px;
  height: 220px;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--mui-palette-gray6-main);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
`
