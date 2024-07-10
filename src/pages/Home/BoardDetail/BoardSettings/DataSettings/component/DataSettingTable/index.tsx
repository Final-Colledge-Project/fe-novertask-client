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
export default function DataSettingTable(props: IDataSettingTableProps) {
  const {
    title,
    searchVal,
    setSearchVal,
    setVisibleCreateModal,
    refetch,
    loading,
    columns,
    dataRender
  } = props
  const locale = {
    emptyText: <Empty size={70} />
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
        <Button
          variant="contained"
          startIcon={<RiAddFill />}
          size="small"
          onClick={() => setVisibleCreateModal(true)}>
          New
        </Button>
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
