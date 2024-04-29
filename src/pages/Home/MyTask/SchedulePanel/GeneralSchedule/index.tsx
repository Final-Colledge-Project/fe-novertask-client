import { DateCalendar } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { Button, Divider } from 'antd'
import './style.scss'
import CalendarItem from './CalendarItem'
import { GoogleOutlined } from '@ant-design/icons'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useEffect, useMemo, useState } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import axios from 'axios'
import { updateProviderToken } from '~/services/userService'
import { StoreDispatchType, StoreType } from '~/redux'
import { useDispatch, useSelector } from 'react-redux'
import { setGoogleCalendarEvents } from '~/redux/scheduleSlice'
import { convertToGoogleEvents } from '~/utils/helper'
interface IGeneralScheduleProps {
  date: Date
  setDate: (event: Date) => void
}

const GeneralSchedule = ({ date, setDate }: IGeneralScheduleProps) => {
  const session = useSession() //tokens, when session exist => user is logged in
  const supabase = useSupabaseClient()
  const currentUser = useSelector((state: StoreType) => state.auth).userInfo
  const [isLogin, setIsLogin] = useState(false)
  const [isRetry, setIsRetry] = useState(false)
  const [prevLogin, setPrevLogin] = useState(false)

  const dispatch = useDispatch()
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
    setPrevLogin(isLogin)
    setIsLogin(false)
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
      console.log('~~~~>error', error)
    }
  }

  useEffect(() => {
    if (session?.provider_token) {
      console.log('~~~~>Runnhere - session', session)
      setPrevLogin(isLogin)
      setIsLogin(true)
    }
  }, [])

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
            }
          }
        )
        console.log('🚀 ~ getGoogleCalendar ~ data:', data?.data?.items)
        if (data?.data?.items) {
          console.log('~~~~~~~~~~~>Run Hereeeeeee')
          dispatch(
            setGoogleCalendarEvents(convertToGoogleEvents(data.data.item))
          )
        }
      } catch (err) {
        setIsRetry(true)
      }
    }
    if (session?.provider_token) {
      getGoogleCalendar()
    }
  }, [])

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
        console.log('~~~~>SignOut')
        handleSignOut()
      }
    }
    if (isRetry) {
      retryGetEvents()
    }
  }, [isRetry])
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={dayjs.utc(date)}
          onChange={(newValue) => setDate(newValue)}
        />
      </LocalizationProvider>
      <Divider style={{ margin: 0, border: '0.5px solid #E5E5EA' }} />
      <div className="myCalendar">
        <div style={{ fontSize: '16px', fontWeight: '500' }}>My Calendars</div>
        <CalendarItem />
        <CalendarItem />
        <CalendarItem />
      </div>
      <div>
        {session ? (
          <div>
            <span>{session.user.email}</span>
          </div>
        ) : (
          <div>
            <Button
              icon={<GoogleOutlined style={{ fontSize: '18px' }} />}
              className="addCalendar-btn"
              onClick={handleLoginGoogle}
            >
              Connect Calendar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
export default GeneralSchedule
