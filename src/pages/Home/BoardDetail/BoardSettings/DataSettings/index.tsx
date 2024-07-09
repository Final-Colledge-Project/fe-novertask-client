import { Box } from '@mui/material'
import { DATA_SETTING } from '~/utils/constant/common'
import IssueTypeSetting from './IssueTypeSetting'
import { IDataSettingSectionProps } from './helper'
import './styles.scss'
import PrioritySetting from './PrioritySetting'
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
      childComponent = <div>Status</div>
      break
    case DATA_SETTING.issueLinkType:
      childComponent = <div>IssueLinkType</div>
      break
  }
  return <Box className="settingSection">{childComponent}</Box>
}
