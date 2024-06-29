import { useSelector } from 'react-redux'
import { ICompletedTableProps } from './helper'
import { StoreType } from '~/redux'
import { Table, type TableProps } from 'antd'
import { ICompletedTask } from '~/services/reportService/resTypes'

interface DataType {
  key: string
  name: string
  priority: string
  storyPoint: number
  issueType: string
}

const CompletedTable = (props: ICompletedTableProps) => {
  const { data } = props
  const allPriorities = useSelector(
    (state: StoreType) => state.priority.allPriorities
  )
  const allIssueTypes = useSelector(
    (state: StoreType) => state.issueType.allIssueTypes
  )
  const dataTable = data.map((item: ICompletedTask) => ({
    key: item._id,
    name: item.title,
    priority: allPriorities.find((p) => p._id === item.priorityId)?.name || '',
    storyPoint: item.storyPoint,
    issueType: allIssueTypes.find((i) => i._id === item.issueTypeId)?.name || ''
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
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Issue Type',
      dataIndex: 'issueType',
      key: 'issueType',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Story Point',
      dataIndex: 'storyPoint',
      key: 'storyPoint',
      render: (text) => <span>{text}</span>
    }
  ]
  return <Table columns={columns} dataSource={dataTable} />
}

export default CompletedTable
