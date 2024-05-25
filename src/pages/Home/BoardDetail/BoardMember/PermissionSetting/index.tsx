import PermissionGroup from '../PermissionGroup'
import { PermissionSettingContainer } from './style'

export default function PermissionSetting() {
  return (
    <PermissionSettingContainer>
      {Array.from({ length: 2 }).map(() => (
        <PermissionGroup />
      ))}
    </PermissionSettingContainer>
  )
}
