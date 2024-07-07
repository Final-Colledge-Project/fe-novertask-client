import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import IProps from './IProps'
import Empty from '~/components/Empty'

const TemplateSelect = ({ templates, field, error }: IProps) => {
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
      }}>
      <InputLabel id="template-names-select-label">Template</InputLabel>
      <Select
        {...field}
        error={error}
        labelId="template-names-select-label"
        id="template-names-select"
        // value={value}
        label="Template"
        // onChange={onChange}
      >
        {/* <MenuItem value={'NONE_WORKSPACE_SELECTED'}>None</MenuItem> */}
        {templates.map((item) => (
          <MenuItem value={item.value} key={item.name}>
            {item.name}
          </MenuItem>
        ))}
        {templates.length === 0 && (
          <MenuItem
            value={''}
            color="FFFFFFF"
            disabled
            sx={{
              '&.MuiButtonBase-root': {
                bgcolor: '#ffffff'
              }
            }}>
            <Empty
              description="No template available!"
              size={100}
              isFullWidth
            />
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

export default TemplateSelect
