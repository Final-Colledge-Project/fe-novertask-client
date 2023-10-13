import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

const useOTPInputGroup = ({
  handleSubmitCode
}: {
  handleSubmitCode: (codes: number[]) => Promise<void>
}) => {
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

  const focusInputAt = (index: number, type: 'next' | 'back') => {
    if (inputs !== undefined) {
      // turn focus into the next right box of current index
      if (type === 'next') {
        if (index >= inputs.length - 1) {
          inputs[0].focus()
          return
        }
        inputs[index + 1].focus()
      }

      // turn focus into the next left box of current index
      else {
        if (index <= 0) {
          inputs[inputs.length - 1].focus()
          return
        }
        inputs[index - 1].focus()
      }
    }
  }

  const setValueAt = (value: number, index: number) => {
    setInputCodes((prev) => {
      const newCodes = [...prev]
      newCodes[index] = value
      focusInputAt(index, 'next')

      setDirties((prev) => {
        const newState = [...prev]
        newState[index] = true
        return newState
      })

      return newCodes
    })
  }

  const deleteValueAt = (index: number) => {
    setInputCodes((prev) => {
      const newCodes = [...prev]
      newCodes[index] = 0

      // check if the current box have value -> stay focus
      // otherwise, turn focus back to the next left box
      if (!dirties[index]) {
        focusInputAt(index, 'back')
      } else {
        setDirties((prev) => {
          const newState = [...prev]
          newState[index] = false
          return newState
        })
      }

      return newCodes
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
    case 'Enter':
      if (dirties.every((i) => i)) {
        handleSubmitCode(inputCodes)
      }
      break
    case 'ArrowRight':
      focusInputAt(index, 'next')
      break
    case 'ArrowLeft':
      focusInputAt(index, 'back')
      break
    case 'Backspace':
      deleteValueAt(index)
      break
    case e.key.match(/^[0-9]$/) ? e.key : '':
      setValueAt(+e.key, index)
      break
    }
  }

  return {
    InputCodeElement: (
      <div className="input-box-group" ref={ref}>
        {inputCodes.map((c, i) => (
          <input
            key={`input-box-${i}`}
            pattern="[0-9]*"
            step={1}
            type="text"
            name={`digit-${i}`}
            id={`digit-${i}`}
            placeholder="0"
            className={clsx('input-box', dirties[i] ? 'dirty' : '')}
            value={inputCodes[i]}
            // onChange={(e) => handleInputCodes(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
        ))}
      </div>
    ),
    inputs,
    dirties,
    inputCodes
  }
}
export default useOTPInputGroup
