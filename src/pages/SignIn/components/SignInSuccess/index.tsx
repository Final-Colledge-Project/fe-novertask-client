import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { StoreDispatchType, StoreType } from '~/redux'
import { loginSuccess } from '~/redux/authSlice/actions'
import { ILoginSuccessBody } from '~/services/authService'
const SingInSuccess = () => {
  const { userId, tokenLogin } = useParams()
  const dispatch = useDispatch<StoreDispatchType>()
  const { userInfo } = useSelector((state: StoreType) => state.auth)
  const reqBody: ILoginSuccessBody = {
    userId: userId || '',
    tokenLogin: tokenLogin || ''
  }

  useEffect(() => {
    dispatch(loginSuccess(reqBody))
  }, [])

  return (
    <div>
      {userInfo ? <Navigate to={'/home'} /> : <Navigate to={'/sign-in'} />}
    </div>
  )
}

export default SingInSuccess
