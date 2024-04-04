import dayjs from 'dayjs'

export enum AppointmentStatusCode {
  Pending = 'P',
  CheckedIn = 'CI',
  CheckedOut = 'CO',
  Cancelled = 'X'
}
export const EVENT_STATUS_COLORS = {
  P: '#FFD700',
  CI: '#32CD32',
  CO: '#FF4500',
  X: '#DC143C'
}

