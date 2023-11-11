import { useState, useEffect, useCallback } from 'react'
import IProps from './IProps'
import useInterval from '../useInterval'

const useCounter = ({ time, isCountDown = true }: IProps) => {
  const [currentTime, setCurrentTime] = useState(time)
  const [reset, setReset] = useState(0)

  const onCount = useCallback(() => {
    setCurrentTime((prev) => {
      return prev + (isCountDown ? -1 : +1)
    })
  }, [reset])

  // const onCount = () => {
  //   setCurrentTime((prev) => {
  //     return prev + (isCountDown ? -1 : +1)
  //   })
  // }

  const idCounter: number = useInterval(onCount, 1000) as number

  useEffect(() => {
    if (currentTime <= 0) {
      window.clearInterval(idCounter)
    }
    if (!isCountDown && currentTime === time) {
      window.clearInterval(idCounter)
    }
  }, [currentTime])

  const handleReset = () => {
    setReset((prev) => prev + 1)
    setCurrentTime(time)
  }

  return {
    current: currentTime,
    reset: handleReset
  }
}

export default useCounter
