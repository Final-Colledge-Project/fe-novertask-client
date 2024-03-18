import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { StoreType } from '~/redux/index.ts'
import { setErrorScreen } from '~/redux/systemSlice/index.ts'

export default function ErrorHandler() {
  const { errorCode, message } = useSelector((state: StoreType) => state.system)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (errorCode || message) {
      navigate('/error/' + errorCode, { replace: true })
      dispatch(setErrorScreen({ errorCode: undefined, message: undefined }))
    }
  }, [errorCode, message])

  return (
    <>
      <Outlet />
    </>
  )
}
