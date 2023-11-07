import { useEffect, useRef } from 'react'

export default function useInterval(callback: () => void, delay: number) {
  // const savedCallback = useRef<() => void>()
  const idInterval = useRef<number>()

  // Remember the latest callback.
  // useEffect(() => {
  //   savedCallback.current = callback
  // }, [callback])

  // Set up the interval.
  useEffect(() => {
    idInterval.current = window.setInterval(() => {
      if (callback) callback()
    }, delay)

    return () => clearInterval(idInterval.current)
  }, [callback])

  return idInterval.current
}
