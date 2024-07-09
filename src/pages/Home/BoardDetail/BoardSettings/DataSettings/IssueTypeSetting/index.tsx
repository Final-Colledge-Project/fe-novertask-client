import { useQuery } from '@tanstack/react-query'
import { Skeleton, Table, TableColumnsType } from 'antd'
import { useParams } from 'react-router-dom'
import Loading from '~/components/Loading'
import { getAllIssueTypesByBoard } from '~/services/issueTypeService'
import { FORMAT_DATE, QUERY_KEY } from '~/utils/constant'
import { RiPantoneFill } from 'react-icons/ri'
import './styles.scss'
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip
} from '@mui/material'
import { RiEditLine } from 'react-icons/ri'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IIssueType } from '~/services/types'
import { RiSearchLine } from 'react-icons/ri'
import { RiAddFill, RiLoopLeftFill } from 'react-icons/ri'
import dayjs from 'dayjs'
import { useState } from 'react'
import ModalActionIssueType from './ModalActionIssueType'
import ConfirmDialog from '~/components/dialog/ConfirmDialog'
import { deleteIssueType } from '~/redux/issueTypeSlice/actions'
import { StoreDispatchType, StoreType } from '~/redux'
import { useDispatch, useSelector } from 'react-redux'
export default function IssueTypeSetting() {
  const { id: boardId } = useParams()
  const [filterName, setFilterName] = useState('')
  const [selectedIssueType, setSelectedIssueType] = useState<IIssueType | null>(
    null
  )
  console.log('🚀 ~ IssueTypeSetting ~ selectedIssueType:', selectedIssueType)
  const dispatch = useDispatch<StoreDispatchType>()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const loading = useSelector((state: StoreType) => state.issueType.loading)
  const {
    data: issueTypeData,
    isLoading,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: [QUERY_KEY.get_all_issue_types, boardId],
    queryFn: () => {
      return getAllIssueTypesByBoard(boardId || '', '')
    },
    refetchOnWindowFocus: false
  })

  const [visible, setVisible] = useState<boolean>(false)

  const issueTypeColumns: TableColumnsType<IIssueType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'colTable',
      sorter: (a: IIssueType, b: IIssueType) => a.name.localeCompare(b.name),
      render: (text: string) => <span className="boldCell">{text}</span>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      className: 'colTable',
      render: (text: string) => <span className="normalCell">{text}</span>
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      className: 'colTable',
      render: (text: string) => (
        <div>
          {text ? <img width={20} height={20} src={text} alt={'Icon'} /> : '-'}
        </div>
      )
    },
    {
      title: 'Hierarchy',
      dataIndex: 'hierarchy',
      key: 'hierarchy',
      className: 'colTable',
      sorter: (a: IIssueType, b: IIssueType) => a.hierarchy - b.hierarchy,
      render: (text: number) => (
        <span className="normalCell" style={{ textAlign: 'center' }}>
          {text}
        </span>
      )
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      className: 'colTable',
      sorter: (a: IIssueType, b: IIssueType) =>
        dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      render: (text: string) => (
        <span className="normalCell">{dayjs(text).format(FORMAT_DATE)}</span>
      )
    },
    {
      title: 'Updated At',
      dataIndex: 'createdAt',
      key: 'updatedAt',
      className: 'colTable',
      sorter: (a: IIssueType, b: IIssueType) =>
        dayjs(a.updatedAt).unix() - dayjs(b.updatedAt).unix(),
      render: (text: string) => (
        <span className="normalCell">{dayjs(text).format(FORMAT_DATE)}</span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      className: 'colTable',
      fixed: 'right',
      render: (_, record) => {
        const { canDelete } = record
        return (
          <div className="actionCol">
            <IconButton
              aria-label="edit"
              className="btnRow"
              size="small"
              onClick={() => onEditRow(record)}>
              <RiEditLine />
            </IconButton>
            <Tooltip title={canDelete ? 'Delete' : 'Issue type is in use'}>
              <span>
                <IconButton
                  aria-label="delete"
                  className="btnRow"
                  size="small"
                  disabled={!canDelete}
                  onClick={() => onDeleteRow(record)}>
                  <RiDeleteBinLine />
                </IconButton>
              </span>
            </Tooltip>
          </div>
        )
      }
    }
  ]

  const dataRender = issueTypeData?.filter((item) =>
    item.name.toLowerCase().includes(filterName.toLowerCase())
  )

  const onEditRow = (record: IIssueType) => {
    setSelectedIssueType(record)
    setVisible(true)
  }

  const onDeleteRow = (record: IIssueType) => {
    setSelectedIssueType(record)
    setOpenDeleteModal(true)
  }

  const onDeleteIssueType = () => {
    const cb = () => {
      setSelectedIssueType(null)
      setOpenDeleteModal(false)
      refetch()
    }
    const data = {
      issueTypeId: selectedIssueType?._id || '',
      boardId: boardId || '',
      cb
    }
    dispatch(deleteIssueType(data))
  }

  return (
    <div className="settingWrapper">
      <div className="settingHeader">
        <div className="settingTitle">
          <RiPantoneFill />
          <h3>Issue Type</h3>
        </div>
      </div>
      <div className="settingFilter">
        <TextField
          label=""
          id="outlined-size-small"
          size="small"
          variant="outlined"
          value={filterName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiSearchLine />
              </InputAdornment>
            )
          }}
          placeholder="Search by name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value)
          }}
        />
        <Button
          variant="contained"
          startIcon={<RiAddFill />}
          size="small"
          onClick={() => setVisible(true)}>
          New
        </Button>
        <Tooltip title="Refetch">
          <IconButton size="small" onClick={() => refetch()}>
            <RiLoopLeftFill />
          </IconButton>
        </Tooltip>
      </div>
      <Skeleton loading={isLoading || isRefetching} active>
        <Table
          scroll={{ x: 'max-content' }}
          columns={issueTypeColumns}
          dataSource={dataRender}
          loading={{ indicator: <Loading />, spinning: isLoading }}
          pagination={{
            locale: { items_per_page: 'Rows' },
            showSizeChanger: true,
            position: ['bottomRight']
          }}
        />
      </Skeleton>
      <ModalActionIssueType
        visible={visible}
        setVisible={setVisible}
        refetch={refetch}
        selectedIssueType={selectedIssueType}
        setSelectedIssueType={setSelectedIssueType}
      />
      <ConfirmDialog
        title="Delete Issue Type"
        content={
          <div>
            <p>
              Are you sure you want to delete permanently the{' '}
              <strong>{selectedIssueType?.name}</strong> issue type?
            </p>
          </div>
        }
        onConfirm={onDeleteIssueType}
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false)
          setSelectedIssueType(null)
        }}
        cancelBtnText="Cancel"
        confirmBtnText="Delete"
        loading={loading}
      />
    </div>
  )
}
