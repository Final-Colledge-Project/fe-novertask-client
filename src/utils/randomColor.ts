import { forOwn } from 'lodash'
import { COLOR } from './constant'

export default function randomColor() : string {
  const colors: { color: string }[] = []
  forOwn(COLOR, (value: { main: string }, _key: string) => {
    colors.push({ color: value.main })
  })
  const max = colors.length
  const randomIndex = Math.floor(Math.random() * (max - 0 + 1) + 0)
  return colors[randomIndex] ? colors[randomIndex].color : randomColor()
}
