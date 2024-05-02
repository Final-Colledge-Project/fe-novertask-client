import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { StoreType } from '~/redux/index.ts'

export default function ErrorHandler() {
  const { errorCode, message } = useSelector((state: StoreType) => state.system)
  const navigate = useNavigate()

  useEffect(() => {
    if (errorCode || message) {
      navigate('/error/' + errorCode, { replace: true })
    }
  }, [errorCode, message])

  return (
    <>
      <Outlet />
    </>
  )
}
