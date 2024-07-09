import { IIssueType, IPriority } from '~/services/types'

export interface IDataSettingSectionProps {
  settingItem: string
}

export type CommonSettingType = IIssueType | IPriority
