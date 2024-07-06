import { useSelector } from 'react-redux'
import { IAverageAgeTableProps } from './helper'
import { StoreType } from '~/redux'
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { DATE_FORMAT2 } from '~/utils/constant'

interface DataType {
  key: string
  name: string
  createDate: Date
  age: number
  status: string
}

const AverageAgeTable = (props: IAverageAgeTableProps) => {
  const { data } = props
  const { allColumns } = useSelector((state: StoreType) => state.column)
  const dataTable = data.map((item) => ({
    key: item.taskId,
    name: item.name,
    createDate: item.createDate,
    age: item.age,
    status: allColumns.find((c) => c._id === item.status)?.title || ''
  }))
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (text) => <span>{dayjs(text).format(DATE_FORMAT2)}</span>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <span>{text}</span>
    }
  ]
  return (
    <Table
      columns={columns}
      dataSource={dataTable}
      pagination={false}
      id="averageAgeTable"
    />
  )
}
export default AverageAgeTable
