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
import { StoreDispatchType, StoreType } from '~/redux'
import { useDispatch, useSelector } from 'react-redux'
import DataSettingTable from '../component/DataSettingTable'
import { CommonSettingType } from '../helper'
import { RiArrowUpCircleFill } from 'react-icons/ri'
import { getAllIssueLinkTypes } from '~/services/issueLinkTypeService'
import ModalActionLinkIssueType from './ModalActionIssueLinkType'
import { deleteIssueLinkType } from '~/redux/issueLinkTypeSlice/actions'
import { RiArrowLeftRightLine } from 'react-icons/ri'
export default function IssueLinkTypeSetting() {
  const { id: boardId } = useParams()
  const [filterName, setFilterName] = useState('')
  const [selectedIssueLinkType, setSelectedIssueLinkType] =
    useState<CommonSettingType | null>(null)
  const dispatch = useDispatch<StoreDispatchType>()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const loading = useSelector((state: StoreType) => state.issueLinkType.loading)
  const {
    data: priorityData,
    isLoading,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: [QUERY_KEY.get_all_issue_link_types, boardId],
    queryFn: () => {
      return getAllIssueLinkTypes(boardId || '', '')
    },
    refetchOnWindowFocus: false
  })

  const [visible, setVisible] = useState<boolean>(false)

  const priorityColumns: TableColumnsType<CommonSettingType> = [
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
      title: 'Inward',
      dataIndex: 'inwardName',
      key: 'name',
      className: 'colTable',
      sorter: (a: CommonSettingType, b: CommonSettingType) => {
        const inwardA = 'inwardName' in a ? a.inwardName : ''
        const inwardB = 'inwardName' in b ? b.inwardName : ''
        return inwardA.localeCompare(inwardB)
      },
      render: (text: string) => <span className="boldCell">{text}</span>
    },
    {
      title: 'Outward',
      dataIndex: 'outwardName',
      key: 'name',
      className: 'colTable',
      sorter: (a: CommonSettingType, b: CommonSettingType) => {
        const outwardA = 'outwardName' in a ? a.outwardName : ''
        const outwardB = 'outwardName' in b ? b.outwardName : ''
        return outwardA.localeCompare(outwardB)
      },
      render: (text: string) => <span className="boldCell">{text}</span>
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
            <Tooltip title={canDelete ? 'Delete' : 'Priority is in use'}>
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
    setSelectedIssueLinkType(record)
    setVisible(true)
  }

  const onDeleteRow = (record: CommonSettingType) => {
    setSelectedIssueLinkType(record)
    setOpenDeleteModal(true)
  }

  const onDeleteIssueLinkType = () => {
    const cb = () => {
      setSelectedIssueLinkType(null)
      setOpenDeleteModal(false)
      refetch()
    }
    const data = {
      issueLinkTypeId: selectedIssueLinkType?._id || '',
      boardId: boardId || '',
      cb
    }
    dispatch(deleteIssueLinkType(data))
  }

  const title = (
    <div className="settingTitle">
      <RiArrowLeftRightLine />
      <h3>Issue Link Type</h3>
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
        columns={priorityColumns}
        dataRender={dataRender || []}
      />
      <ModalActionLinkIssueType
        visible={visible}
        setVisible={setVisible}
        refetch={refetch}
        selectedIssueLinkType={selectedIssueLinkType || null}
        setSelectedIssueLinkType={setSelectedIssueLinkType}
      />
      <ConfirmDialog
        title="Delete Issue Link Type"
        content={
          <div>
            <p>
              Are you sure you want to delete permanently the{' '}
              <strong>{selectedIssueLinkType?.name}</strong> issue link type?
            </p>
          </div>
        }
        onConfirm={onDeleteIssueLinkType}
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false)
          setSelectedIssueLinkType(null)
        }}
        cancelBtnText="Cancel"
        confirmBtnText="Delete"
        loading={loading}
      />
    </div>
  )
}
