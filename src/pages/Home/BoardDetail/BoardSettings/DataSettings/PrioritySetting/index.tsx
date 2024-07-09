import { useQuery } from '@tanstack/react-query'
import { TableColumnsType } from 'antd'
import { useParams } from 'react-router-dom'
import { FORMAT_DATE, QUERY_KEY } from '~/utils/constant'
import './styles.scss'
import { IconButton, Tooltip } from '@mui/material'
import { RiEditLine } from 'react-icons/ri'
import { RiDeleteBinLine } from 'react-icons/ri'
import dayjs from 'dayjs'
import { useState } from 'react'
import ConfirmDialog from '~/components/dialog/ConfirmDialog'
import { deleteIssueType } from '~/redux/issueTypeSlice/actions'
import { StoreDispatchType, StoreType } from '~/redux'
import { useDispatch, useSelector } from 'react-redux'
import DataSettingTable from '../component/DataSettingTable'
import { isDarkColor, isHexColor } from '~/utils/helper'
import { getAllPrioritiesByBoard } from '~/services/priorityService'
import { CommonSettingType } from '../helper'
import ModalActionPriority from './ModalActionPriority'
import { RiArrowUpCircleFill } from 'react-icons/ri'
import { deletePriority } from '~/redux/prioritySlice/actions'

export default function PrioritySetting() {
  const { id: boardId } = useParams()
  const [filterName, setFilterName] = useState('')
  const [selectedPriority, setSelectedPriority] =
    useState<CommonSettingType | null>(null)
  const dispatch = useDispatch<StoreDispatchType>()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const loading = useSelector((state: StoreType) => state.issueType.loading)
  const {
    data: priorityData,
    isLoading,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: [QUERY_KEY.get_all_issue_types, boardId],
    queryFn: () => {
      return getAllPrioritiesByBoard(boardId || '', '')
    },
    refetchOnWindowFocus: false
  })

  const [visible, setVisible] = useState<boolean>(false)

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
      render: (text: string) => <span className="normalCell">{text}</span>
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      className: 'colTable',
      render: (text: string) => (
        <span
          className="normalCell"
          style={{
            textAlign: 'center',
            padding: '4px',
            borderRadius: '4px',
            background: isHexColor(text) ? `${text}` : '#fff',
            color: isDarkColor(text) ? '#fff' : '#000'
          }}>
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

  const dataRender = priorityData?.filter((item) =>
    item.name.toLowerCase().includes(filterName.toLowerCase())
  )

  const onEditRow = (record: CommonSettingType) => {
    setSelectedPriority(record)
    setVisible(true)
  }

  const onDeleteRow = (record: CommonSettingType) => {
    setSelectedPriority(record)
    setOpenDeleteModal(true)
  }

  const onDeletePriority = () => {
    const cb = () => {
      setSelectedPriority(null)
      setOpenDeleteModal(false)
      refetch()
    }
    const data = {
      priorityId: selectedPriority?._id || '',
      boardId: boardId || '',
      cb
    }
    dispatch(deletePriority(data))
  }

  const title = (
    <div className="settingTitle">
      <RiArrowUpCircleFill />
      <h3>Priority</h3>
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
      />
      <ModalActionPriority
        visible={visible}
        setVisible={setVisible}
        refetch={refetch}
        selectedPriority={selectedPriority || null}
        setSelectedPriority={setSelectedPriority}
      />
      <ConfirmDialog
        title="Delete Priority"
        content={
          <div>
            <p>
              Are you sure you want to delete permanently the{' '}
              <strong>{selectedPriority?.name}</strong> issue type?
            </p>
          </div>
        }
        onConfirm={onDeletePriority}
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false)
          setSelectedPriority(null)
        }}
        cancelBtnText="Cancel"
        confirmBtnText="Delete"
        loading={loading}
      />
    </div>
  )
}
