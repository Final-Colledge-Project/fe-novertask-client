import { Box } from '@mui/material'
import { DATA_SETTING } from '~/utils/constant/common'
import IssueTypeSetting from './IssueTypeSetting'
import { IDataSettingSectionProps } from './helper'
import './styles.scss'
import PrioritySetting from './PrioritySetting'
import LabelSetting from './LabelSetting'
import IssueLinkTypeSetting from './IssueLinkTypeSetting'
export default function DataSettingSection(props: IDataSettingSectionProps) {
  const { settingItem } = props
  let childComponent = <></>
  switch (settingItem) {
    case DATA_SETTING.issueType:
      childComponent = <IssueTypeSetting />
      break
    case DATA_SETTING.priority:
      childComponent = <PrioritySetting />
      break
    case DATA_SETTING.label:
      childComponent = <LabelSetting />
      break
    case DATA_SETTING.issueLinkType:
      childComponent = <IssueLinkTypeSetting />
      break
  }
  return <Box className="settingSection">{childComponent}</Box>
}
