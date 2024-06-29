import { IReportType } from '../../helper'

export interface IReportTypeProps {
  item: IReportType
}

export const reportTypeStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0px 0px 7px 1px #D8D8DC',
  borderRadius: '5px',
  marginBottom: '10px',
  backgroundColor: '#E5E5EA',
  width: '300px',
  height: '250px',
  '&:hover': {
    boxShadow: '0px 0px 10px 4px #BCBCC0',
    position: 'relative',
    top: '-2px',
    cursor: 'pointer'
  }
}

export const reportContentStyle = {
  fontSize: '14px',
  backgroundColor: '#fff',
  height: '100%',
  padding: '10px',
  borderRadius: '0px 0px 5px 5px',
  maxHeight: '80px'
}
