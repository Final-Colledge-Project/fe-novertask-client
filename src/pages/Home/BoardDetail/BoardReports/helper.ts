export interface IReportType {
  img: string
  name: string
  description: string
}

export const getReportTypesByTab = (type: number) => {
  let reportTypes: IReportType[] = []
  switch (type) {
    case 0:
      reportTypes = [
        {
          img: 'https://datavizproject.com/wp-content/uploads/types/Bar-Chart-Vertical.png',
          name: 'Average Age Report',
          description: 'Project wise average age of all open tasks at a glance to keep your backlog in control'
        }
      ]
      break
    case 1:
      reportTypes = [
        {
          id: 2,
          name: 'Agile Scrum Reports',
          value: 'scrum'
        }
      ]
      break
  }
  return reportTypes
}
