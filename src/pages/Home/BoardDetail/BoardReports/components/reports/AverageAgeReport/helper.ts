import { FieldValues } from 'react-hook-form'
import * as yup from 'yup'
import { IAverageTaskAge } from '~/services/reportService/resTypes'
export interface IAverageAgeReportProps {
  boardId: string
  setExportFn: (fn: () => void) => void
}

export interface IFormFields extends FieldValues {
  period: string
  previousDays: number
}

export const schema = yup.object().shape({
  period: yup.string().required('Period is required'),
  previousDays: yup.number().required('Previous days is required').min(1)
})

export interface IAverageAgeReport {
  averageAge: number
  averageEachTask: IAverageTaskAge[]
}

export interface IAverageData {
  dates: string[]
  totalAges: number[]
  averageAges: number[]
}

export const preProcessData = (averageTask: IAverageTaskAge[]) => {
  const groupedData = (averageTask || []).reduce(
    (acc: { [key: string]: { totalAge: number; count: number } }, task) => {
      const date = task.createDate.toString().split('T')[0]
      if (!acc[date]) {
        acc[date] = { totalAge: 0, count: 0 }
      }
      acc[date].totalAge += task.age
      acc[date].count += 1
      return acc
    },
    {}
  )
  const dates = Object.keys(groupedData)
  const totalAges = dates.map((date) => groupedData[date].totalAge)
  const averageAges = dates.map(
    (date) => groupedData[date].totalAge / groupedData[date].count
  )
  return { dates, totalAges, averageAges }
}

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Task Age and Average Age'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
