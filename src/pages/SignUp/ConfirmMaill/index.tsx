import clsx from 'clsx'
import CustomStepper from '../components/Stepper'
import './style.scss'
import Button from '@mui/material/Button'
import { useEffect, useRef, useState } from 'react'
const ConfirmMail = () => {
  const steps = ['Enter email', 'Verify email', 'Finish profile']
  const ref = useRef<HTMLDivElement | null>(null)
  const [inputCodes, setInputCodes] = useState<Array<number>>([
    0, 0, 0, 0, 0, 0
  ])
  const [inputs, setInputs] = useState<Array<HTMLInputElement>>()
  const [dirties, setDirties] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
    false,
    false
  ])
  const focusInputAt = (index: number, type: string) => {
    if (inputs !== undefined) {
      if (type === 'next') {
        if (index >= inputs.length - 1) {
          return
        }
        inputs[index + 1].focus()
      } else {
        if (index <= 0) {
          return
        }
        inputs[index - 1].focus()
      }
    }
  }
  const handleInputCodes = (e: React.ChangeEvent, index: number) => {
    setInputCodes((prev) => {
      const newCodes = [...prev]
      const inputType = (e.nativeEvent as InputEvent).inputType
      if (inputType === 'deleteContentBackward') {
        // return newCodes
        newCodes[index] = 0
        focusInputAt(index, 'back')
        setDirties((prev) => {
          const newState = [...prev]
          newState[index] = false
          return newState
        })
      }
      const toData = (e.nativeEvent as InputEvent).data
      if (toData !== null && toData.match(/^[0-9]$/)) {
        newCodes[index] = +toData
        focusInputAt(index, 'next')

        setDirties((prev) => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }
      return newCodes
    })
  }
  const handleSubmidCode = () => {
    console.log(inputCodes)
  }
  useEffect(() => {
    if (ref.current?.children) {
      const children = Array.from(ref.current.children)
      setInputs(children.map((child) => child as HTMLInputElement))
    }
  }, [])
  useEffect(() => {
    if (inputs !== undefined) {
      inputs[0].focus()
    }
  }, [inputs])
  return (
    <div className="confirm-container">
      <CustomStepper steps={steps} active={1} />
      <div className="confirm-content">
        <div className="image">
          <img src="/img/mail-notify.png" alt="" />
        </div>
        <div className="text">
          <p className="title">Verify your email</p>
          <p className="sub-title">
            We emailed you a six digit code to{' '}
            <span className="mail">email@example.abc.com</span>
          </p>
          <p>Enter the cod below to verify your email address</p>
        </div>
        <div className="input-box" ref={ref}>
          {inputCodes.map((c, i) => (
            <input
              step={1}
              type="text"
              name="digit-1"
              id="digit-1"
              placeholder="0"
              className={clsx('input-code', dirties[i] ? 'dirty' : '')}
              value={inputCodes[i]}
              onChange={(e) => handleInputCodes(e, i)}
            />
          ))}
        </div>
        <div className="input-action">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmidCode}
          >
            Verify
          </Button>
          <p className="resend-group">
            You didn't receive the code?{' '}
            <span>
              <Button
                variant="text"
                color="primary"
                sx={{
                  display: 'inline-block',
                  height: '43px',
                  fontSize: '16px',
                  py: 0
                }}
              >
                Resend
              </Button>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
export default ConfirmMail
