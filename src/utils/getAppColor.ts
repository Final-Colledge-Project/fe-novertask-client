import { forOwn } from 'lodash'
import { COLOR } from './constant'

export default function getAppColor() {
  const colors: { color: string }[] = []
  forOwn(COLOR, (value: { main: string }, _key: string) => {
    colors.push({ color: value.main })
  })

  return colors.map((item) => item.color)
}
