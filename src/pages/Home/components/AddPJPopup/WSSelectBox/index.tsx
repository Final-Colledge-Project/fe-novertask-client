import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import IProps from './IProps'

const WSSelectBox = ({
  value,
  handleChange,
  workspaces,
  field,
  error
}: IProps) => {
  return (
    <FormControl
      fullWidth
      error={error}
      sx={{
        m: 0,
        height: '50px',
        backgroundColor: (theme) => theme.palette.white.main,
        label: {
          color: (theme) =>
            error ? theme.palette.error.main : theme.palette.primary.main,
          '&.Mui-focused': {
            color: (theme) =>
              error ? theme.palette.error.main : theme.palette.primary.main
          }
        }
      }}
    >
      <InputLabel id="workspace-names-select-label">Workspace</InputLabel>
      <Select
        error={error}
        required
        labelId="workspace-names-select-label"
        id="workspace-names-select"
        value={value}
        label="Workspace"
        onChange={handleChange}
        {...field}
      >
        {/* <MenuItem value={'NONE_WORKSPACE_SELECTED'}>None</MenuItem> */}
        {workspaces.map((item: { _id: string; name: string }) => (
          <MenuItem value={item._id} key={item._id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default WSSelectBox
