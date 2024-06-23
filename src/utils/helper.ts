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
