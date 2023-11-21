import dayjs from 'dayjs'

export default function convertDate(date: string) {
  // format: MM/DD/YYYY, for example 11/21/2023
  const convertedDate = dayjs(date).format('MM/DD/YYYY')
  return convertedDate
}
