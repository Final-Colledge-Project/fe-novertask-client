/* eslint-disable indent */
import { Tooltip } from '@mui/material'
import IProps from './IProps'
import { Avatar, DataComparison, LogData, LogItem } from './style'
import { RiArrowRightLine } from 'react-icons/ri'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { CARD_LOG_TARGETS } from '~/utils/constant/card'
import { toDescriptionObject } from '~/utils/helper'
import html from 'sanitize-html'
import { LOG_MSG_CREATE } from '~/utils/constant/common'

const NULL_VALUE_DISPLAY_STRING = 'None'

export default function Log(props: IProps) {
  const { log, getUserFullName, getUserInfo } = props

  const genLogMessage = () => {
    return `<b>${getUserFullName(log.userId)}</b> ${log.msg} <b>${
      log.target
    }</b>  | ${dayjs(log.createdAt).format('MMMM DD, YYYY')} at ${dayjs(
      log.createdAt
    ).format('h:mm A')}`
  }

  const getOldDataInLog = () => {
    const defaultVal = log.oldVal ? log.oldVal : NULL_VALUE_DISPLAY_STRING
    switch (log.target) {
      case CARD_LOG_TARGETS.DESCRIPTION:
        return genDescriptionLog(defaultVal)
        break
      default:
        return defaultVal
    }
  }

  const getNewDataInLog = () => {
    const defaultVal = log.newVal ? log.newVal : NULL_VALUE_DISPLAY_STRING
    switch (log.target) {
      case CARD_LOG_TARGETS.DESCRIPTION:
        return genDescriptionLog(defaultVal)
        break
      default:
        return defaultVal
    }
  }

  const isNone = (value: string) => {
    return value === NULL_VALUE_DISPLAY_STRING
  }

  const genDescriptionLog = (value: string) => {
    const descObj = toDescriptionObject(value)
    // console.log(descObj)
    if (descObj.content && descObj.formatter) {
      return descObj.content
    }
    return value
  }

  const isCreatingLog = () => {
    return log.msg === LOG_MSG_CREATE
  }

  return (
    <LogItem className={clsx(isCreatingLog() && 'log--creating')}>
      <Tooltip title={getUserFullName(log.userId)}>
        <Avatar $size="25px">
          <img src={getUserInfo(log.userId)?.avatar} alt="" />
        </Avatar>
      </Tooltip>
      <LogData>
        <div
          dangerouslySetInnerHTML={{
            __html: html(genLogMessage())
          }}></div>
        {!isCreatingLog() && (
          <DataComparison>
            <p
              className={clsx(
                'data',
                isNone(getOldDataInLog()) && 'data--none'
              )}>
              {getOldDataInLog()}
            </p>
            <div className="icon">
              <RiArrowRightLine size={17} />
            </div>
            <p
              className={clsx(
                'data',
                isNone(getNewDataInLog()) && 'data--none'
              )}>
              {getNewDataInLog()}
            </p>
          </DataComparison>
        )}
      </LogData>
    </LogItem>
  )
}
