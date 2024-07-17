//message
export const DEFAULT_CONFIRM_DIALOG_TITLE = 'Are you sure?'
export const DEFAULT_CONFIRM_DIALOG_CONTENT =
  'Are you sure you want to do this action? Choose YES to continue.'
export const DEFAULT_CONFIRM_BUTTON = 'Yes'
export const DEFAULT_CANCEL_BUTTON = 'No'

// fall back image
export const FALLBACK_IMAGE = '/img/item-cover.jpg'

export const TITLE = {
  board: {
    boardOverView: 'Overview',
    boardDetail: 'Task',
    boardMember: 'Team',
    boardReports: 'Reports',
    boardSettings: 'Settings'
  },
  menu: {
    dashboard: 'Dashboard',
    workspace: 'Workspace',
    myTask: 'My Task',
    inbox: 'Inbox',
    notifications: 'Notifications'
  },
  workspace: {
    workspaceOverview: 'Overview',
    workspaceDetail: 'Detail',
    workspaceMember: 'Member',
    workspaceSettings: 'Settings'
  }
}

export const REPORT_TYPE = {
  averageAgeReport: 'averageAgeReport',
  sprintReport: 'sprintReport',
  sprintBurnDownReport: 'sprintBurnDownReport',
  sprintVelocityReport: 'sprintVelocityReport'
}

export const WORKING_DAYS = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 0
}

export const DATA_SETTING = {
  issueType: 'issueType',
  label: 'label',
  priority: 'priority',
  issueLinkType: 'issueLinkType'
}

export const DATE_FORMAT = 'DD/MM/YYYY'

export const LOG_MSG_CREATE = 'created the'

export const ACCEPT_FILES = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'text/csv',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'application/xml',
  'text/xml',
  'application/atom+xml',
  'application/zip',
  'application/rtf',
  'application/vnd.rar',
  'text/rtf',
  'text/xml',
  'application/x-rar-compressed',
  'application/octet-stream'
]

export const ACCEPTS_EXTENSIONS = [
  'doc',
  'docx',
  'pdf',
  'xlsx',
  'txt',
  'xml',
  'zip',
  'rtf',
  'rar'
]

export const MAX_FILE_SIZE = 2 * 1024 * 1024

export const MAX_UPLOAD = 3
