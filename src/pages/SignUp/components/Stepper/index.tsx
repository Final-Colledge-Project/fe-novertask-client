import { Step, StepLabel } from '@mui/material'
import Stepper from '@mui/material/Stepper'
interface StepperProps {
  steps: Array<string>
  active: number
}
const CustomStepper = ({ steps, active }: StepperProps) => {
  return (
    <div style={{ width: '100%' }}>
      <Stepper activeStep={active} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}
export default CustomStepper