export interface ISprintBurnDownProps {
  boardId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chartRef?: any
}

export interface IDataChart {
  sprintDays: string[]
  actualBurnDown: number[]
  idealBurnDown: number[]
}

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Allow the chart to be resized
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Time'
      }
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Story Points'
      }
    }
  },
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    title: {
      display: true,
      text: 'Sprint Burn Down Chart'
    }
  }
}
