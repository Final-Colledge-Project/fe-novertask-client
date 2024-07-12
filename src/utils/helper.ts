/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneDeep } from 'lodash'
import dayjs from 'dayjs'
import { FORMAT_DATE_TIME } from './constant'
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertToGoogleEvents = (events: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    (events || [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((event: any) => event.start || event.end)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((event: any) => {
        return {
          id: event.id,
          title: event.summary,
          start: dayjs(event.start.dateTime).toDate() || null,
          end: dayjs(event.end.dateTime).toDate() || null,
          htmlLink: event.htmlLink
        }
      })
  )
}

export const isDarkColor = (hexColor: string) => {
  hexColor = hexColor.replace('#', '')
  // Convert hex to RGB
  const r = parseInt(hexColor.substring(0, 2), 16)
  const g = parseInt(hexColor.substring(2, 4), 16)
  const b = parseInt(hexColor.substring(4, 6), 16)

  // Calculate luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

  // Check if the luminance is below a threshold
  return luminance < 128
}

export const formatDateTime = (date: string) => {
  return dayjs(date).isValid() ? dayjs(date).format(FORMAT_DATE_TIME) : ''
}

export const formatDate = (date: string) => {
  return dayjs(date).isValid() ? dayjs(date).format('MMM D') : ''
}

export const upperCaseFirstLetter = (str: string) => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const first3UpperCharacter = (str: string) => {
  if (!str) return str
  return str.replace(/\s/g, '').slice(0, 3).toUpperCase()
}

export const generateBusinessKey = (input: string): string => {
  // Step 1: Trim spaces from the input
  const trimmedInput = input.trim()

  // Step 2: Split the input into words, ignoring any additional spaces
  const words = trimmedInput.split(/\s+/)

  // Step 3: Process the words based on the given conditions
  let result: string

  if (words.length === 1) {
    // If the input has only one word
    const word = words[0]
    if (word.length <= 4) {
      result = word
    } else {
      result = word.slice(0, 2)
    }
  } else {
    // If the input has two or more words
    result = words
      .map((word) => word[0])
      .join('')
      .slice(0, 10)
  }

  // Step 4: Convert the result to uppercase
  return result.toUpperCase()
}

// export const getLocalIcon = (icon: string) => {
//   return require(`../public/icon/${icon}`)
// }

export const DefaultIssueTypeIcon = [
  {
    path: ''
  }
]

export const calculateEndDate = (
  startDay: Date,
  duration: number,
  workingDays: number[]
): Date => {
  let endDate = dayjs(startDay)
  let remainDays = duration * workingDays.length
  let testDate = endDate
  while (remainDays > 0) {
    testDate = testDate.add(1, 'day')
    if (workingDays.includes(testDate.day())) {
      endDate = testDate
      remainDays--
    }
    if (remainDays === 1 && !workingDays.includes(testDate.day())) {
      endDate = testDate
      remainDays--
    }
  }
  return endDate.toDate()
}
