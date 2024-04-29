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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertToGoogleEvents = (events: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return events.map((event: any) => {
    return {
      id: event.id,
      title: event.summary,
      start: dayjs(event.start.dateTime).toDate(),
      end: dayjs(event.end.dateTime).toDate(),
      htmlLink: event.htmlLink
    }
  })
}
