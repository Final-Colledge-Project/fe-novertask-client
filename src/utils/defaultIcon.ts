import bugRed from '../../public/icon/bugRed.png'
import accessRequest from '../../public/icon/accessRequest.png'
import bugGrey from '../../public/icon/bugGrey.png'
import concern from '../../public/icon/concern.png'
import defect from '../../public/icon/defect.png'
import designTask from '../../public/icon/designTask.png'
import developmentTask from '../../public/icon/developmentTask.png'
import document from '../../public/icon/document.png'
import epic from '../../public/icon/epic.png'
import improvement from '../../public/icon/improvement.png'
import newFeature from '../../public/icon/newFeature.png'
import question from '../../public/icon/question.png'
import remove from '../../public/icon/remove.png'
import requirement from '../../public/icon/requirement.png'
import salesRequest from '../../public/icon/salesRequest.png'
import story from '../../public/icon/story.png'
import subTask from '../../public/icon/subTask.png'
import suggestion from '../../public/icon/suggestion.png'
import task from '../../public/icon/task.png'

export const defaultIssueTypeIcon = {
  story: {
    icon: story,
    name: 'Story'
  },
  epic: {
    icon: epic,
    name: 'Epic'
  },
  task: {
    icon: task,
    name: 'Task'
  },
  subTask: {
    icon: subTask,
    name: 'Sub-task'
  },
  bugRed: {
    icon: bugRed,
    name: 'Bug'
  },
  bugGrey: {
    icon: bugGrey,
    name: 'Bug'
  },
  improvement: {
    icon: improvement,
    name: 'Improvement'
  },
  newFeature: {
    icon: newFeature,
    name: 'New Feature'
  },
  question: {
    icon: question,
    name: 'Question'
  },
  concern: {
    icon: concern,
    name: 'Concern'
  },
  suggestion: {
    icon: suggestion,
    name: 'Suggestion'
  },
  defect: {
    icon: defect,
    name: 'Defect'
  },
  designTask: {
    icon: designTask,
    name: 'Design Task'
  },
  developmentTask: {
    icon: developmentTask,
    name: 'Development Task'
  },
  document: {
    icon: document,
    name: 'Document'
  },
  requirement: {
    icon: requirement,
    name: 'Requirement'
  },
  salesRequest: {
    icon: salesRequest,
    name: 'Sales Request'
  },
  remove: {
    icon: remove,
    name: 'Remove'
  },
  accessRequest: {
    icon: accessRequest,
    name: 'Access Request'
  }
}

type DefaultIcons = {
  [key: string]: {
    icon: string
    name: string
  }
}

export const getDefaultIssueIcon = (
  icon: string,
  defaultIcons: DefaultIcons
) => {
  const existIcon = Object.values(defaultIcons).find(
    (item) => item.icon === icon
  )
  return existIcon
}
