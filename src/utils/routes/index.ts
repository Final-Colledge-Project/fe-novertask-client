const allRoutes = {
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
