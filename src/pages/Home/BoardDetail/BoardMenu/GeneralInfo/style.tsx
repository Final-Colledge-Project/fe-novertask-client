import styled from '@emotion/styled'
import { styled as muiStyled } from '@mui/material/styles'
import { AccordionSummaryProps } from '@mui/material'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import { RiArrowRightSLine } from 'react-icons/ri'

export const BoardMenuContainer = styled.div`
  background-color: var(--mui-palette-white-main);
  padding: 0px 20px 10px;
  min-width: 400px;
  max-width: 400px;
  width: 400px;
  transition: min-width 0.3s, width 0.3s;
  border-left: 1px solid var(--mui-palette-divider);
  overflow-y: auto;

  &.hide {
    min-width: 0px;
    width: 0px;
    padding: 0px 0 10px;
    overflow: hidden;
  }
`

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid var(--mui-palette-divider);
  position: sticky;
  top: 0px;
  z-index: 100;
  background-color: rgba(var(--mui-palette-white-mainChannel) / 0.8);
  backdrop-filter: blur(4px);

  & > .title {
    font-weight: 700;
  }
`

export const MenuBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 20px;
`

export const Accordion = muiStyled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  width: '100%',
  '&:not(:last-child)': {},
  '&:before': {
    display: 'none'
  }
}))

export const AccordionSummary = muiStyled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<RiArrowRightSLine sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  border: '0px',
  borderRadius: '8px',
  backgroundColor: theme.palette.white.main,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  },
  '&:hover': {
    backgroundColor: theme.palette.gray6.main
  },
  '&.Mui-expanded': {
    backgroundColor: theme.palette.gray5.main,
    borderRadius: '8px 8px 0 0',
    border: '1px solid var(--mui-palette-gray3-main)',
    borderBottom: 'none',
    color: theme.palette.black.main,
    fontWeight: '700'
  }
}))

export const AccordionDetails = muiStyled(MuiAccordionDetails)(() => ({
  padding: '10px 20px 20px',
  border: '1px solid var(--mui-palette-gray3-main)',
  borderTop: 'none',
  borderRadius: '0 0 8px 8px',
  marginBottom: '10px',
  backgroundColor: 'rgba(var(--mui-palette-gray6-mainChannel)/0.5)'
}))

export const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  & > .label {
    font-weight: 700;
    font-size: 14px;
    color: var(--mui-palette-black-main);

    &--one-line {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  & > .error {
    font-size: 12px;
    color: var(--mui-palette-error-main);
    width: 100%;
    text-align: right;
  }

  &.one-line {
    flex-direction: row;
    align-items: center;
  }

  & .MuiFormControl-root .MuiInputBase-root.Mui-disabled {
    background-color: var(--mui-palette-white-main);
    color: var(--mui-palette-black-main);
  }

  & .MuiFormControl-root .MuiInputBase-input.Mui-disabled {
    color: var(--mui-palette-black-main);
  }
  
  & .MuiFormControl-root .MuiInputBase-input.Mui-disabled {
    color: var(--mui-palette-black-main);
    -webkit-text-fill-color: var(--mui-palette-black-main);
  }
`
export const InputGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
`

export const User = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  gap: 20px;
  margin-top: 10px;
`

export const UserDetailInfo = styled.div`
  display: flex;
  align-items: start;
  width: 100%;
  height: 100%;
`

export const GeneralAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`

export const GeneralInfo = styled.div`
  flex: 1;
  line-height: normal;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  & > .name {
    font-size: 20px;
    font-weight: 700;
  }
  & > .email {
    color: var(--mui-palette-gray-main);
    font-size: 14px;
  }
`

export const FormActionsGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`
