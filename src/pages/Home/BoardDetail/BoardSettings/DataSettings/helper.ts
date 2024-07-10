import { IIssueType, ILabel, IPriority, IIssueLinkType } from '~/services/types'

export interface IDataSettingSectionProps {
  settingItem: string
}

export type CommonSettingType = IIssueType | IPriority | ILabel | IIssueLinkType
