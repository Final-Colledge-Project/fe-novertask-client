import { Box, Typography } from '@mui/material';
import './style.scss'
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className='noti-tabPanel'
    >
      {value === index && (
        <Box sx={{ padding: '3px 1px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default CustomTabPanel