import { DATA_SETTING } from '~/utils/constant/common'

export const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

export const DATA_SETTING_ITEMS = [
  {
    label: 'Issue Type',
    value: DATA_SETTING.issueType
  },
  {
    label: 'Priority',
    value: DATA_SETTING.priority
  },
  {
    label: 'Label',
    value: DATA_SETTING.label
  }
  // {
  //   label: 'Issue Link Type',
  //   value: DATA_SETTING.issueLinkType
  // }
]
