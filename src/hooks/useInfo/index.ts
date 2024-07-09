import { useSelector } from 'react-redux'
import { StoreType } from '~/redux'

// return info of logged user
const useInfo = () => {
  const userInfo = useSelector((state: StoreType) => state.auth.userInfo)
  return userInfo
}
export default useInfo
