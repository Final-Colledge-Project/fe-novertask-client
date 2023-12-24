import dayjs from 'dayjs'

export const getRecordTime = (date: string) => {
  const convertDate = dayjs(date)
  return dayjs().diff(convertDate, 'hour') < 24
    ? dayjs().diff(convertDate, 'hour') > 0
      ? dayjs().diff(convertDate, 'hour') + ' hours ago'
      : dayjs().diff(convertDate, 'minute') + ' minutes ago'
    : dayjs().diff(convertDate, 'day') + ' days ago'
}
