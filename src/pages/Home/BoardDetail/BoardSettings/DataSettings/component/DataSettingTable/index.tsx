import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip
} from '@mui/material'
import { Skeleton, Table } from 'antd'
import { RiAddFill, RiLoopLeftFill, RiSearchLine } from 'react-icons/ri'
import IDataSettingTableProps from './helper'
import './styles.scss'
import Empty from '~/components/Empty'
import usePermission from '~/hooks/usePermission'
import { DATA_SETTING } from '~/utils/constant/common'
export default function DataSettingTable(props: IDataSettingTableProps) {
  const {
    title,
    searchVal,
    setSearchVal,
    setVisibleCreateModal,
    refetch,
    loading,
    columns,
    dataRender,
    type
  } = props
  const locale = {
    emptyText: <Empty size={70} />
  }
  const curPerm = usePermission()
  let canCreate = curPerm ? curPerm.isAdmin : false

  switch (type) {
    case DATA_SETTING.issueType: {
      canCreate = curPerm ? curPerm.isAdmin || curPerm.issueType.create : false
      break
    }
    case DATA_SETTING.label: {
      canCreate = curPerm ? curPerm.isAdmin || curPerm.label.create : false
      break
    }
    case DATA_SETTING.priority: {
      canCreate = curPerm ? curPerm.isAdmin || curPerm.priority.create : false
      break
    }
    case DATA_SETTING.issueLinkType: {
      canCreate = curPerm
        ? curPerm.isAdmin || curPerm.issueLinkType.create
        : false
      break
    }
  }

  return (
    <div className="settingCommon">
      <div className="settingHeader">{title}</div>
      <div className="settingFilter">
        <TextField
          label=""
          id="outlined-size-small"
          size="small"
          variant="outlined"
          value={searchVal}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiSearchLine />
              </InputAdornment>
            )
          }}
          placeholder="Search by name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchVal(event.target.value)
          }}
        />
        <Tooltip
          title={!canCreate ? "Don't have permission to do this action" : ''}>
          <span>
            <Button
              variant="contained"
              startIcon={<RiAddFill />}
              size="small"
              onClick={() => setVisibleCreateModal(true)}
              disabled={!canCreate}>
              New
            </Button>
          </span>
        </Tooltip>

        <Tooltip title="Refetch">
          <IconButton size="small" onClick={() => refetch()}>
            <RiLoopLeftFill />
          </IconButton>
        </Tooltip>
      </div>
      <Skeleton loading={loading} active>
        <Table
          scroll={{ x: 'max-content' }}
          columns={columns}
          dataSource={dataRender}
          pagination={{
            locale: { items_per_page: 'Rows' },
            showSizeChanger: true,
            position: ['bottomRight']
          }}
          locale={locale}
        />
      </Skeleton>
    </div>
  )
}
