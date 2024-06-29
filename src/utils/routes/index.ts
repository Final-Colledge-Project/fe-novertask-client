const allRoutes = {
  dashBoard: {
    path: '/u/dashboard',
    name: 'dashboard'
  },
  workspace: {
    workspaceDetail: {
      path: '/u/workspaces/:workspaceId',
      name: 'workspaceDetail',
      segment: ''
    },
    workspaceMember: {
      path: '/u/workspaces/:workspaceId/members',
      name: 'workspaceMember',
      segment: 'members'
    },
    workspaceSettings: {
      path: '/u/workspaces/:workspaceId/settings',
      name: 'workspaceSettings',
      segment: 'settings'
    }
  },
  myTask: {
    path: '/u/my-tasks',
    name: 'myTask'
  },
  inbox: {
    path: '/u/inbox',
    name: 'inbox'
  },
  notifications: {
    path: '/u/notifications',
    name: 'notifications'
  },
  home: {
    board: {
      boardDetail: {
        path: '/u/boards/:boardId',
        name: 'boardDetail',
        segment: ''
      },
      boardOverView: {
        path: '/u/boards/:boardId/overview',
        name: 'boardOverView',
        segment: 'overview'
      },
      boardMember: {
        path: '/u/boards/:boardId/members',
        name: 'boardMember',
        segment: 'members'
      },
      boardSettings: {
        path: '/u/boards/:boardId/settings',
        name: 'boardSettings',
        segment: 'settings'
      },
      boardReports: {
        path: '/u/boards/:boardId/reports',
        name: 'boardReports',
        segment: 'reports'
      }
    },
    card: {
      cardDetail: {
        path: '/u/boards/:boardId/cards/:cardId',
        name: 'cardDetail',
        segment: ''
      }
    }
  }
}

export default allRoutes
