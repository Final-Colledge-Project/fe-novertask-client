const requests = {
  getNotificationByUserId: '/notifications',
  markReadNotification: (notificationId: string) => `/notifications/${notificationId}`,
  markReadAllNotification: '/notifications/mark-all'
}

export default requests