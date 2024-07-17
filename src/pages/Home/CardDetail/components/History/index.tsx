import { IMemberInBoard, ITaskLog } from '~/services/types'
import { LogSection } from './styles'
import Log from '../Log'
interface IProps {
  logs: ITaskLog[]
  getUserFullName: (userId: string) => string
  getUserInfoById: (userId: string) => IMemberInBoard | null | undefined
  infoSort: string
}
const SORT_TYPES = {
  newest: 'newest',
  oldest: 'oldest'
}
export default function History(props: Readonly<IProps>) {
  const { logs, getUserFullName, getUserInfoById, infoSort } = props
  return (
    <LogSection>
      {infoSort === SORT_TYPES.newest &&
        logs
          .slice()
          .reverse()
          .map((log) => (
            <Log
              key={log._id}
              log={log}
              getUserFullName={getUserFullName}
              getUserInfo={getUserInfoById}
            />
          ))}
      {infoSort === SORT_TYPES.oldest &&
        logs.map((log) => (
          <Log
            key={log._id}
            log={log}
            getUserFullName={getUserFullName}
            getUserInfo={getUserInfoById}
          />
        ))}
    </LogSection>
  )
}
