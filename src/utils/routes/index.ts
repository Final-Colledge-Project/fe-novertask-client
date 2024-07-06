const allRoutes = {
  dashBoard: {
    path: '/u/dashboard',
    name: 'dashboard'
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
        segment: '',
        adminOnly: false
      },
      boardOverView: {
        path: '/u/boards/:boardId/overview',
        name: 'boardOverView',
        segment: 'overview',
        adminOnly: false
      },
      boardMember: {
        path: '/u/boards/:boardId/members',
        name: 'boardMember',
        segment: 'members',
        adminOnly: false
      },
      boardSettings: {
        path: '/u/boards/:boardId/settings',
        name: 'boardSettings',
        segment: 'settings',
        adminOnly: true
      },
      boardReports: {
        path: '/u/boards/:boardId/reports',
        name: 'boardReports',
        segment: 'reports',
        adminOnly: false
      }
    },
    card: {
      cardDetail: {
        path: '/u/boards/:boardId/cards/:cardId',
        name: 'cardDetail',
        segment: ''
      }
    },
    workspace: {
      workspaceOverview: {
        path: '/u/workspaces/:workspaceId/overview',
        name: 'workspaceOverview',
        segment: 'overview',
        adminOnly: false
      },
      workspaceDetail: {
        path: '/u/workspaces/:workspaceId',
        name: 'workspaceDetail',
        segment: '',
        adminOnly: false
      },
      workspaceMember: {
        path: '/u/workspaces/:workspaceId/members',
        name: 'workspaceMember',
        segment: 'members',
        adminOnly: false
      },
      workspaceSettings: {
        path: '/u/workspaces/:workspaceId/settings',
        name: 'workspaceSettings',
        segment: 'settings',
        adminOnly: true
      }
    }
  }
}

export default allRoutes
