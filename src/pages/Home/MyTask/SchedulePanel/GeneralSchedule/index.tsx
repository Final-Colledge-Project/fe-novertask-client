import { DateCalendar } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { Avatar, Button, Divider, Dropdown } from 'antd'
import './style.scss'
import CalendarItem from './CalendarItem'
import { GoogleOutlined } from '@ant-design/icons'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useEffect, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import axios from 'axios'
import { updateProviderToken } from '~/services/userService'
import { StoreDispatchType, StoreType } from '~/redux'
import { useDispatch, useSelector } from 'react-redux'
import { setGoogleCalendarEvents } from '~/redux/scheduleSlice'
import { convertToGoogleEvents } from '~/utils/helper'
import utc from 'dayjs/plugin/utc'
import { QUERY_KEY, TYPE_EVENT } from '~/utils/constant'
import { addSchedule } from '~/redux/scheduleSlice/actions'
import { Chip } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { cardAssignToMe } from '~/services/cardService'
dayjs.extend(utc)
interface IGeneralScheduleProps {
  date: Date
  setDate: (event: Date) => void
}

const GeneralSchedule = ({ date, setDate }: IGeneralScheduleProps) => {
  const session = useSession() //tokens, when session exist => user is logged in
  const { user } = session || {}
  const supabase = useSupabaseClient()
  const currentUser = useSelector((state: StoreType) => state.auth).userInfo
  const [isRetry, setIsRetry] = useState(false)
  const { schedules } = useSelector((state: StoreType) => state.schedule)
  const calendarSchedule = schedules?.find(
    (item) => item.type === TYPE_EVENT.googleEvent
  )

  const dispatch = useDispatch<StoreDispatchType>()
  useEffect(() => {
    const updateToken = async () => {
      if (session?.provider_token) {
        await await updateProviderToken({
          providerToken: session?.provider_token,
          providerRefreshToken: session?.provider_refresh_token || ''
        })
      }
    }
    updateToken()
  }, [session])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    dispatch(setGoogleCalendarEvents([]))
  }

  const handleLoginGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
        redirectTo: 'http://localhost:5173/u/my-tasks',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
    if (error) {
      // console.log('~~~~>error', error)
    } else {
      if (!calendarSchedule) {
        dispatch(
          addSchedule({
            name: 'Google Calendar',
            type: TYPE_EVENT.googleEvent
          })
        )
      }
    }
  }

  useEffect(() => {
    const getGoogleCalendar = async () => {
      try {
        const data = await axios.get(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events',
          {
            headers: {
              Authorization: `Bearer ${
                session?.provider_token ||
                currentUser?.providerToken.accessToken
              }`
            },
            params: {
              timeMin: dayjs(date).subtract(34, 'day').toISOString(),
              timeMax: dayjs(date).add(34, 'day').toISOString(),
              singleEvents: true
            }
          }
        )
        if (data?.data?.items) {
          dispatch(
            setGoogleCalendarEvents(convertToGoogleEvents(data.data.items))
          )
        }
      } catch (err) {
        setIsRetry(true)
      }
    }
    if (session) {
      getGoogleCalendar()
    }
  }, [date])

  useEffect(() => {
    const retryGetEvents = async () => {
      try {
        const response = await axios.post(
          'https://oauth2.googleapis.com/token',
          {
            refresh_token: `${
              session?.provider_refresh_token ||
              currentUser?.providerToken.refreshToken
            }`,
            client_id:
              '78989143522-7i3r9h2fcik6eeu2m3q8ecgqd8b39prj.apps.googleusercontent.com',
            client_secret: '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',
            grant_type: 'refresh_token'
          }
        )
        if (response?.data?.access_token) {
          const retryData = await axios.get(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            {
              headers: {
                Authorization: `Bearer ${response?.data?.access_token}`
              },
              params: {
                timeMin: dayjs(date).subtract(34, 'day').toISOString(),
                timeMax: dayjs(date).add(34, 'day').toISOString(),
                singleEvents: true
              }
            }
          )
          if (retryData?.data?.items) {
            dispatch(
              setGoogleCalendarEvents(
                convertToGoogleEvents(retryData.data.items)
              )
            )
          }
        }
      } catch (err) {
        handleSignOut()
      }
    }
    if (isRetry) {
      retryGetEvents()
    }
  }, [isRetry, date])

  const items = [
    {
      key: '1',
      label: <span>Disconnect Calendar</span>,
      onClick: handleSignOut
    }
  ]

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={dayjs(date)}
          onChange={(newValue) => setDate(newValue)}
        />
      </LocalizationProvider>
      <Divider style={{ margin: 0, border: '0.5px solid #E5E5EA' }} />
      <div className="myCalendar">
        <div style={{ fontSize: '16px', fontWeight: '500' }}>My Calendars</div>
        {(schedules || []).map((item) => (
          <CalendarItem schedule={item} />
        ))}
      </div>
      <Divider style={{ margin: 0, border: '0.5px solid #E5E5EA' }} />
      <div className="connectCalendar">
        {session ? (
          <Dropdown menu={{ items }} placement="bottomLeft">
            <Chip
              avatar={
                <Avatar alt="Natacha" src={user?.user_metadata?.avatar_url} />
              }
              label={user?.email}
              variant="outlined"
              sx={{
                borderColor: '#E5E5EA',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer'
                }
              }}
            />
          </Dropdown>
        ) : (
          <div>
            <Button
              icon={<GoogleOutlined style={{ fontSize: '18px' }} />}
              className="addCalendar-btn"
              onClick={handleLoginGoogle}>
              Connect Calendar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
export default GeneralSchedule
