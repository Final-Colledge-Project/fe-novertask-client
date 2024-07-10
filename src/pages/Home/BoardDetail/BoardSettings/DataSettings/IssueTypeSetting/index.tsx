import { useQuery } from '@tanstack/react-query'
import { TableColumnsType } from 'antd'
import { useParams } from 'react-router-dom'
import { getAllIssueTypesByBoard } from '~/services/issueTypeService'
import { FORMAT_DATE, PERMISSION_MSG, QUERY_KEY } from '~/utils/constant'
import { RiBugFill } from 'react-icons/ri'
import './styles.scss'
import { IconButton, Tooltip } from '@mui/material'
import { RiEditLine } from 'react-icons/ri'
import { RiDeleteBinLine } from 'react-icons/ri'
import dayjs from 'dayjs'
import { useState } from 'react'
import ModalActionIssueType from './ModalActionIssueType'
import ConfirmDialog from '~/components/dialog/ConfirmDialog'
import { deleteIssueType } from '~/redux/issueTypeSlice/actions'
import { StoreDispatchType, StoreType } from '~/redux'
import { useDispatch, useSelector } from 'react-redux'
import DataSettingTable from '../component/DataSettingTable'
import { CommonSettingType } from '../helper'
import { DATA_SETTING } from '~/utils/constant/common'
import usePermission from '~/hooks/usePermission'
export default function IssueTypeSetting() {
  const { id: boardId } = useParams()
  const [filterName, setFilterName] = useState('')
  const [selectedIssueType, setSelectedIssueType] =
    useState<CommonSettingType | null>(null)
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

  const curPerm = usePermission()
  const canEdit = curPerm ? curPerm.isAdmin || curPerm.issueType.update : false
  const canDelete = curPerm
    ? curPerm.isAdmin || curPerm.issueType.delete
    : false

  const issueTypeColumns: TableColumnsType<CommonSettingType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'colTable',
      sorter: (a: CommonSettingType, b: CommonSettingType) =>
        a.name.localeCompare(b.name),
      render: (text: string) => <span className="boldCell">{text}</span>
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      className: 'colTable',
      render: (text: string) => (
        <Tooltip title={text}>
          <div
            className="normalCell"
            style={{
              maxWidth: '450px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
            {text}
          </div>
        </Tooltip>
      )
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
      sorter: (a: CommonSettingType, b: CommonSettingType) => {
        const hierarchyA =
          'hierarchy' in a && typeof a.hierarchy === 'number' ? a.hierarchy : 0
        const hierarchyB =
          'hierarchy' in b && typeof b.hierarchy === 'number' ? b.hierarchy : 0
        return hierarchyA - hierarchyB
      },
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
      sorter: (a: CommonSettingType, b: CommonSettingType) =>
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
      sorter: (a: CommonSettingType, b: CommonSettingType) =>
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
        const { canDelete: notInUse } = record
        return (
          <div className="actionCol">
            <Tooltip title={!canEdit ? PERMISSION_MSG.notHavePerm : 'Edit'}>
              <span>
                <IconButton
                  aria-label="edit"
                  className="btnRow"
                  size="small"
                  onClick={() => onEditRow(record)}
                  disabled={!canEdit}>
                  <RiEditLine />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip
              title={
                !canDelete
                  ? PERMISSION_MSG.notHavePerm
                  : notInUse
                  ? 'Delete'
                  : 'Issue type is in use'
              }>
              <span>
                <IconButton
                  aria-label="delete"
                  className="btnRow"
                  size="small"
                  disabled={!canDelete || !notInUse}
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

  const onEditRow = (record: CommonSettingType) => {
    setSelectedIssueType(record)
    setVisible(true)
  }

  const onDeleteRow = (record: CommonSettingType) => {
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

  const title = (
    <div className="settingTitle">
      <RiBugFill />
      <h3>Issue Type</h3>
    </div>
  )

  return (
    <div className="settingWrapper">
      <DataSettingTable
        title={title}
        searchVal={filterName}
        setSearchVal={setFilterName}
        setVisibleCreateModal={setVisible}
        refetch={refetch}
        loading={isLoading || isRefetching}
        columns={issueTypeColumns}
        dataRender={dataRender || []}
        type={DATA_SETTING.issueType}
      />
      <ModalActionIssueType
        visible={visible}
        setVisible={setVisible}
        refetch={refetch}
        selectedIssueType={selectedIssueType || null}
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
