import { TableColumnsType } from 'antd'
import { ReactElement } from 'react'
import { CommonSettingType } from '../../helper'

export default interface IDataSettingTableProps {
  title: ReactElement
  searchVal: string
  setSearchVal: (value: string) => void
  setVisibleCreateModal: (value: boolean) => void
  refetch: () => void
  loading: boolean
  columns: TableColumnsType<CommonSettingType>
  dataRender: CommonSettingType[]
  type: string
}
