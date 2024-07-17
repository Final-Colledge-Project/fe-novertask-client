import styled from '@emotion/styled'

export const FileUpdateContainer = styled.div`
  .files-ui-footer {
    font-size: 11px;
    padding: 4px 8px 2px;
    color: var(--mui-palette-blue-main);
    background-color: rgba(var(--mui-palette-blue-mainChannel) / 0.05);
    border-top: 1px dashed var(--mui-palette-blue-main);
  }

  .fui-dropzone-root {
    label {
      font-size: 14px;
      color: var(--mui-palette-gray-main);
    }
  }

  .files-ui-header {
    span {
      font-size: 14px;
      color: var(--mui-palette-gray-main);
    }
  }

  .fui-dropzone-border {
    border: 1px dashed var(--mui-palette-blue-main);
  }

  .files-ui-buttons-container {
    button {
      background-color: var(--mui-palette-blue-main);
      border-radius: 8px;
    }
  }
`
