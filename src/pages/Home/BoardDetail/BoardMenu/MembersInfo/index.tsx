import { Typography } from '@mui/material'
import { Accordion, AccordionDetails, AccordionSummary } from '../style'
import { ListContainer, ListHeader } from './style'

export default function MembersInfo() {
  return (
    <Accordion>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>Members</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ListContainer>
          <ListHeader>
            
          </ListHeader>
        </ListContainer>
      </AccordionDetails>
    </Accordion>
  )
}
