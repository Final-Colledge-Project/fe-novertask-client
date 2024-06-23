import { REPORT_TYPE } from '~/utils/constant/common'

export interface IReportType {
  img: string
  name: string
  description: string
  type: string
}

export const getReportTypesByTab = (type: number) => {
  let reportTypes: IReportType[] = []
  switch (type) {
    case 0:
      reportTypes = [
        {
          img: 'https://datavizproject.com/wp-content/uploads/types/Bar-Chart-Vertical.png',
          name: 'Average Age Report',
          description:
            'Project wise average age of all open tasks at a glance to keep your backlog in control',
          type: REPORT_TYPE.averageAgeReport
        }
      ]
      break
    case 1:
      reportTypes = [
        {
          img: 'https://cdn-icons-png.freepik.com/512/9752/9752264.png',
          name: 'Sprint Report',
          description:
            'The Sprint Report shows the list of tasks in each sprint. It is useful for your Sprint Retrospective meetings, and also for mid-sprint progress checks.',
          type: REPORT_TYPE.sprintReport
        },
        {
          img: 'https://www.visual-paradigm.com/servlet/editor-content/scrum/scrum-burndown-chart/sites/7/2018/11/burndown-chart-and-emotion.png',
          name: 'Sprint BurnDown Report',
          description:
            ' It is a visual measurement tool that shows the completed work per day against the projected rate of completion for the current sprint. It expresses the amount of work in story points completed per sprint.',
          type: REPORT_TYPE.sprintBurnDownReport
        },
        {
          img: 'https://images.ctfassets.net/zsv3d0ugroxu/5SxfCTZhtfroLyYEeL5Dc7/8ebef6df2fb2dc9ddd7c3f65f92dc304/Screenshot_JSW_Velocity_Chart_annotated',
          name: 'Sprint Velocity Report',
          description:
            'The Sprint Velocity Report shows the amount of work delivered in each sprint, enabling you to predict the amount of work the team can deliver in future sprints.',
          type: REPORT_TYPE.sprintVelocityReport
        }
      ]
      break
  }
  return reportTypes
}

export const a11yProps = (index: number) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}
