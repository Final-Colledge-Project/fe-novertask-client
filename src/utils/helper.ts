/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneDeep } from 'lodash'
import dayjs from 'dayjs'

export const getRecordTime = (date: string) => {
  const convertDate = dayjs(date)
  return dayjs().diff(convertDate, 'hour') < 24
    ? dayjs().diff(convertDate, 'hour') > 0
      ? dayjs().diff(convertDate, 'hour') + ' hours ago'
      : dayjs().diff(convertDate, 'minute') + ' minutes ago'
    : dayjs().diff(convertDate, 'day') + ' days ago'
}

export const isDateInCountNextDays = (
  targetDate: string,
  countNextDays: number
) => {
  const currentDate = dayjs()
  const sevenDaysLater = currentDate.add(countNextDays, 'day')
  return (
    dayjs(targetDate).isAfter(currentDate.startOf('day')) &&
    dayjs(targetDate).isBefore(sevenDaysLater.endOf('day'))
  )
}

/*
 * Use to map the member data to the memberIds
 * Returns an array of members that have the same _id as the memberIds.
 */
export const mapData = <T>(dataSet: T[], key: keyof T, keyList: string[]) => {
  const result = keyList.map((value: string) => {
    const item = dataSet.find((item) => item[key] === value)
    if (item) {
      return item
    }
  })
  // clean duplicate data and remove undefined
  return result.filter(
    (item, index) => item && result.indexOf(item) === index
  ) as T[]
}

// Clear duplicate item by key
export const clearDuplicateByKey = <T>(dataSet: T[], key?: keyof T) => {
  let result: T[] = []
  // handle case key is undefined, remove all duplicate item
  if (!key) {
    result = dataSet.filter(
      (item, index, self) =>
        index ===
        self.findIndex((t) => JSON.stringify(t) === JSON.stringify(item))
    )
  } else {
    result = dataSet.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t[key] === item[key])
    )
  }
  return cloneDeep(result)
}

// check if the color is a hex color starting with #
export const isHexColor = (color: string) => {
  return /^#[0-9A-F]{6}$/i.test(color)
}

// check if a specific value is exist in a nested object
export const isValueExistInNestedObject = (
  obj: Record<string, any>,
  value: any
) => {
  let isExist = false
  Object.keys(obj).forEach((key) => {
    if (obj[key] === value) {
      isExist = true
    } else if (typeof obj[key] === 'object') {
      isExist = isValueExistInNestedObject(obj[key], value)
    }
  })
  return isExist
}