export interface IDataChart {
  sprintName: string[]
  totalStoryPoint: number[]
  completedStoryPoint: number[]
}

export interface IVelocityReportProps {
  boardId: string
  setExportFn: (fn: () => void) => void
}

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    title: {
      display: true,
      text: 'Velocity Chart'
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Sprints'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Story Points'
      },
      beginAtZero: true
    }
  }
}
