export interface ISprintBurnDownProps {
  boardId: string
  setExportFn: (fn: () => void) => void
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
