import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Popover,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import { useEffect, useState } from 'react'
import { RiLoopLeftFill, RiSearchLine } from 'react-icons/ri'
import './styles.scss'
import { Skeleton, Table, TableColumnsType } from 'antd'
import Empty from '~/components/Empty'
import {
  IAssigneeCol,
  IGeneralIssue,
  IIssueTypeCol,
  ILabelCol,
  IPriorityCol,
  ISprintCol,
  IStatusCol
} from './helper'
import dayjs from 'dayjs'
import { FORMAT_DATE, QUERY_KEY } from '~/utils/constant'
import { getAllIssues } from '~/services/boardService'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { uniqBy, uniq } from 'lodash'
import { RiEqualizerLine } from 'react-icons/ri'
import { ColumnTitleProps } from 'antd/es/table/interface'

const ListView = () => {
  const [searchVal, setSearchVal] = useState('')
  const { id: boardId } = useParams()
  const [selectHierarchy, setSelectHierarchy] = useState(2)
  const [issueTypes, setIssueType] = useState<IIssueTypeCol[]>()
  const [status, setStatus] = useState<IStatusCol[]>()
  const [assignees, setAssignees] = useState<IAssigneeCol[]>()
  const [sprints, setSprints] = useState<ISprintCol[]>()
  const [labels, setLabels] = useState<ILabelCol[]>()
  const [priorities, setPriorities] = useState<IPriorityCol[]>()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'column-popover' : undefined
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const locale = {
    emptyText: <Empty size={70} />
  }

  const {
    data: resData,
    isLoading,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: [QUERY_KEY.get_all_issues, boardId, selectHierarchy],
    queryFn: () => {
      return getAllIssues(boardId || '', selectHierarchy)
    },
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (!resData) return
    const issueTypes = uniqBy(
      resData.map((e) => e.issueType),
      '_id'
    )
    if (issueTypes.length) setIssueType(issueTypes)
    const status = uniqBy(
      resData.map((e) => e.status),
      '_id'
    )
    if (status.length) setStatus(status)
    const assignees = uniqBy(
      resData.filter((e) => e.assignee).map((e) => e.assignee),
      '_id'
    )
    if (assignees.length) setAssignees(assignees)
    const sprints = uniqBy(
      resData.filter((e) => e.sprint).map((e) => e.sprint) || [],
      '_id'
    )
    if ((sprints || []).length && sprints !== undefined)
      setSprints(sprints.filter((e) => e !== undefined))
    const labels = uniqBy(
      resData.filter((e) => e.label).map((e) => e.label) || [],
      '_id'
    )
    if (labels.length) setLabels(labels)
    const priorities = uniqBy(
      resData.filter((e) => e.priority).map((e) => e.priority) || [],
      '_id'
    )
    if (priorities.length) setPriorities(priorities)
  }, [resData])

  const scrumColumn: TableColumnsType<IGeneralIssue> = [
    {
      title: 'ID',
      dataIndex: 'taskId',
      key: 'taskId',
      className: 'colTable',
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
        a.taskId.localeCompare(b.taskId),
      render: (text) => {
        return <span className="boldCell">{text}</span>
      }
    },
    {
      title: 'IssueType',
      dataIndex: 'issueType',
      key: 'issueType',
      className: 'colTable',
      filters:
        issueTypes?.map((item) => ({
          text: item.name,
          value: item.name
        })) || [],
      onFilter: (value, record) =>
        record.issueType.name.startsWith(value as string),
      filterSearch: true,
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
        a.issueType.name.localeCompare(b.issueType.name),
      render: (text: IIssueTypeCol) => (
        <div className="normalCell">
          <img src={text.icon} width={15} height={15} />
          <div>{text.name}</div>
        </div>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'colTable',
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
        a.name.localeCompare(b.name),
      render: (text: string) => (
        <Tooltip title={text}>
          <div
            className="normalCell"
            style={{
              maxWidth: '400px',
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      className: 'colTable',
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
        a.name.localeCompare(b.name),
      render: (text) => (
        <Tooltip title={text}>
          <div
            className="normalCell"
            style={{
              maxWidth: '400px',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      className: 'colTable',
      filters:
        status?.map((item) => ({
          text: item.title,
          value: item.title
        })) || [],
      onFilter: (value, record) =>
        record.status.title.startsWith(value as string),
      filterSearch: true,
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
        a.status.title.localeCompare(b.status.title),
      render: (text: IStatusCol) => (
        <Chip
          label={text.title}
          sx={{
            color: `${text.color}`,
            backgroundColor: `${text.color + '1A'}`,
            '& .MuiChip-label': {
              borderRadius: '4px'
            }
          }}
        />
      )
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee',
      key: 'assignee',
      className: 'colTable',
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
        a?.assignee?.fullName.localeCompare(b?.assignee?.fullName),
      filters:
        assignees?.map((item) => ({
          text: item?.fullName,
          value: item?.fullName
        })) || [],
      onFilter: (value, record) =>
        record?.assignee?.fullName.startsWith(value as string),
      filterSearch: true,
      render: (text: IAssigneeCol) => (
        <div className="normalCell">
          {text?.avatar && <img src={text?.avatar} width={40} height={40} />}
          <div>{text?.fullName}</div>
        </div>
      )
    },
    {
      title: 'Story Point',
      dataIndex: 'storyPoint',
      key: 'storyPoint',
      className: 'colTable',
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
        (a?.storyPoint || 0) - (b?.storyPoint || 0),
      render: (text: number) => <span className="normalCell">{text}</span>
    },
    {
      title: 'Sprint',
      dataIndex: 'sprint',
      key: 'sprint',
      className: 'colTable',
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
        (a.sprint?.name || '').localeCompare(b.sprint?.name || ''),
      filters:
        sprints?.map((item) => ({
          text: item?.name,
          value: item?.name
        })) || [],
      onFilter: (value, record) =>
        (record?.sprint?.name || '').startsWith(value as string),
      render: (text: ISprintCol) => (
        <span className="normalCell">{text.name}</span>
      )
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      className: 'colTable',
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
        dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      render: (text: string) => (
        <span className="normalCell">{dayjs(text).format(FORMAT_DATE)}</span>
      )
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      className: 'colTable',
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
        dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix(),
      render: (text: string) => (
        <span className="normalCell">{dayjs(text).format(FORMAT_DATE)}</span>
      )
    },
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
      className: 'colTable',
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
        a.label.name.localeCompare(b.label.name),
      filters:
        labels?.map((item) => ({
          text: item?.name,
          value: item?.name
        })) || [],
      onFilter: (value, record) =>
        (record?.label?.name || '').startsWith(value as string),
      render: (text: ILabelCol) =>
        text && (
          <Chip
            label={text?.name}
            sx={{
              color: `${text?.color}`,
              backgroundColor: `${text?.color + '1A'}`,
              '& .MuiChip-label': {
                borderRadius: '4px'
              }
            }}
          />
        )
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      className: 'colTable',
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
        a.priority.name.localeCompare(b.priority.name),
      filters:
        priorities?.map((item) => ({
          text: item?.name,
          value: item?.name
        })) || [],
      onFilter: (value, record) =>
        (record?.priority?.name || '').startsWith(value as string),
      render: (text: IPriorityCol) => (
        <Chip
          label={text.name}
          sx={{
            color: `${text.color}`,
            backgroundColor: `${text.color + '1A'}`,
            '& .MuiChip-label': {
              borderRadius: '4px'
            }
          }}
        />
      )
    },
    {
      title: 'Resolved At',
      dataIndex: 'resolvedAt',
      key: 'resolvedAt',
      className: 'colTable',
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
        dayjs(a.resolvedAt).unix() - dayjs(b.resolvedAt).unix(),
      render: (text: string) => (
        <span className="normalCell">{dayjs(text).format(FORMAT_DATE)}</span>
      )
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      className: 'colTable',
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
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
      sorter: (a: IGeneralIssue, b: IGeneralIssue) =>
        dayjs(a.updatedAt).unix() - dayjs(b.updatedAt).unix(),
      render: (text: string) => (
        <span className="normalCell">{dayjs(text).format(FORMAT_DATE)}</span>
      )
    }
  ]

  const defaultCheckedList = scrumColumn.map((item) => item.key as string)
  const [checkListCol, setCheckListCol] = useState(defaultCheckedList)

  const newColumns = scrumColumn.map((item) => ({
    ...item,
    hidden: !checkListCol.includes(item.key as string)
  }))

  const dataRender = resData?.filter(
    (item: IGeneralIssue) =>
      item.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      item.taskId.toLowerCase().includes(searchVal.toLowerCase())
  )

  const handleChangeCol = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckListCol(uniq([...checkListCol, event.target.value]))
    } else {
      const filterList = checkListCol.filter((i) => i !== event.target.value)
      setCheckListCol(filterList)
    }
  }

  const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckListCol(defaultCheckedList)
    } else {
      setCheckListCol([])
    }
  }

  const childrenCol = (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {scrumColumn.map((col) => (
        <FormControlLabel
          label={col.title as string}
          value={col.key}
          control={
            <Checkbox
              checked={checkListCol.includes(col.key as string)}
              onChange={handleChangeCol}
            />
          }
        />
      ))}
    </Box>
  )

  return (
    <Box className="listWrapper">
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
          placeholder="Search by Name/ID"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchVal(event.target.value)
          }}
        />
        {/* <FormControl variant="outlined" sx={{ minWidth: '70px' }} size="small">
          <InputLabel id="hierarchy-label">Hierarchy</InputLabel>
          <Select
            labelId="hierarchy-label"
            label="Hierarchy"
            value={selectHierarchy}
            onChange={(e) => setSelectHierarchy(Number(e.target.value))}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl> */}
        <IconButton size="small" aria-describedby={id} onClick={handleClick}>
          <RiEqualizerLine />
        </IconButton>

        <Popover
          id={id}
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}>
          <div className="colPopover">
            <FormControlLabel
              label="All Columns"
              control={
                <Checkbox
                  checked={defaultCheckedList.length === checkListCol.length}
                  indeterminate={
                    defaultCheckedList.length !== checkListCol.length
                  }
                  onChange={handleChangeAll}
                />
              }
            />
            {childrenCol}
          </div>
        </Popover>
        {/* <RiEqualizerLine /> */}
        <Tooltip title="Refetch">
          <IconButton size="small" onClick={() => refetch()}>
            <RiLoopLeftFill />
          </IconButton>
        </Tooltip>
      </div>
      <Skeleton loading={isLoading || isRefetching} active>
        <Table
          scroll={{ x: 'max-content' }}
          columns={newColumns}
          dataSource={dataRender}
          pagination={{
            locale: { items_per_page: 'Rows' },
            showSizeChanger: true,
            position: ['bottomRight']
          }}
          locale={locale}
        />
      </Skeleton>
    </Box>
  )
}

export default ListView
