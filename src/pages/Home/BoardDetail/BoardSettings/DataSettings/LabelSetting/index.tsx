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
import { isDarkColor, isHexColor } from '~/utils/helper'
import { CommonSettingType } from '../helper'
import { RiPantoneFill } from 'react-icons/ri'
import { getAllByBoard } from '~/services/labelService'
import ModalActionLabel from './ModalActionLabel'
import { deleteLabelThunk } from '~/redux/labelSlice/actions'

export default function LabelSetting() {
  const { id: boardId } = useParams()
  const [filterName, setFilterName] = useState('')
  const [selectedLabel, setSelectedLabel] = useState<CommonSettingType | null>(
    null
  )
  const dispatch = useDispatch<StoreDispatchType>()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const loading = useSelector((state: StoreType) => state.label.loading)
  const {
    data: resData,
    isLoading,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: [QUERY_KEY.get_all_labels, boardId],
    queryFn: () => {
      return getAllByBoard({ boardId: boardId || '' })
    },
    refetchOnWindowFocus: false
  })

  const [visible, setVisible] = useState<boolean>(false)

  const labelColumns: TableColumnsType<CommonSettingType> = [
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
            background: text ? (isHexColor(text) ? `${text}` : '#fff') : '#fff',
            color: text ? (isDarkColor(text) ? '#fff' : '#000') : '#000'
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
            <Tooltip title={canDelete ? 'Delete' : 'Label is in use'}>
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

  const dataRender = resData?.data.filter((item) =>
    item.name.toLowerCase().includes(filterName.toLowerCase())
  )

  const onEditRow = (record: CommonSettingType) => {
    setSelectedLabel(record)
    setVisible(true)
  }

  const onDeleteRow = (record: CommonSettingType) => {
    setSelectedLabel(record)
    setOpenDeleteModal(true)
  }

  const onDeletePriority = () => {
    const cb = () => {
      setSelectedLabel(null)
      setOpenDeleteModal(false)
      refetch()
    }
    const data = {
      labelId: selectedLabel?._id || '',
      boardId: boardId || '',
      cb
    }
    dispatch(deleteLabelThunk(data))
  }

  const title = (
    <div className="settingTitle">
      <RiPantoneFill />
      <h3>Label</h3>
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
        columns={labelColumns}
        dataRender={dataRender || []}
      />
      <ModalActionLabel
        visible={visible}
        setVisible={setVisible}
        refetch={refetch}
        selectedLabel={selectedLabel || null}
        setSelectedLabel={setSelectedLabel}
      />
      <ConfirmDialog
        title="Delete Priority"
        content={
          <div>
            <p>
              Are you sure you want to delete permanently the{' '}
              <strong>{selectedLabel?.name}</strong> label?
            </p>
          </div>
        }
        onConfirm={onDeletePriority}
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false)
          setSelectedLabel(null)
        }}
        cancelBtnText="Cancel"
        confirmBtnText="Delete"
        loading={loading}
      />
    </div>
  )
}
