import Loading from '~/components/Loading'
import {
  IAverageAgeReport,
  IAverageAgeReportProps,
  chartOptions,
  preProcessData
} from './helper'
import { AVERAGE_AGE_PERIOD } from '~/utils/constant'
import { getAverageAgeReport } from '~/services/reportService'
import { useRef, useState } from 'react'
import {
  Box,
  MenuItem,
  Select,
  Button,
  Typography,
  TextField,
  SelectChangeEvent
} from '@mui/material'
import { upperCaseFirstLetter } from '~/utils/helper'
import './styles.scss'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import CombinedChart from '~/components/Charts/CombinedChart'
const AverageAgeReport = (props: IAverageAgeReportProps) => {
  const { boardId, setExportFn } = props
  const [periodOption, setPeriodOption] = useState<string>(
    AVERAGE_AGE_PERIOD.daily
  )
  const chartRef = useRef<unknown>(null)
  const [previousDay, setPreviousDay] = useState<number>(7)
  const [errorNumber, setErrorNumber] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sprintData, setSprintData] = useState<IAverageAgeReport>(
    {} as IAverageAgeReport
  )
  const { dates, totalAges, averageAges } = preProcessData(
    sprintData.averageEachTask
  )
  // console.log('~~~~> sprintData', sprintData)
  const averageLineData = new Array(dates.length).fill(sprintData.averageAge)

  const dataSet: ChartData<'bar' | 'line'> = {
    labels: dates,
    datasets: [
      {
        type: 'bar',
        label: 'Total Task Age (Days)',
        data: totalAges,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        type: 'line',
        label: 'Average Age per Task',
        data: averageAges,
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        fill: false
      },
      {
        type: 'line',
        label: 'Overall Average Age',
        data: averageLineData,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false
      }
    ]
  }

  const getAverageAgeReportData = async () => {
    try {
      setIsLoading(true)
      const queryString = `period=${periodOption}&previousDay=${previousDay}`
      const data = await getAverageAgeReport(boardId, queryString)
      if (!data) return
      setSprintData(data)
      setIsLoading(false)
    } catch (err) {
      enqueueSnackbar((err as AxiosError).message, { variant: 'error' })
    }
  }

  const onChangeOption = (event: SelectChangeEvent) => {
    setPeriodOption(event.target.value)
  }

  const onChangePreviousDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length && Number(value) <= 0) {
      setErrorNumber(true)
    } else {
      setErrorNumber(false)
      setPreviousDay(Number(value))
    }
  }

  const onSubmit = () => {
    getAverageAgeReportData()
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="wrapper">
          <Box className="filterGroup">
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <Typography variant="body1">Period:</Typography>
              <Select
                id="sprint-select"
                label=""
                autoWidth
                inputProps={{ 'aria-label': 'Without label' }}
                size="small"
                sx={{ minWidth: '100px' }}
                defaultValue={periodOption}
                onChange={onChangeOption}>
                {Object.keys(AVERAGE_AGE_PERIOD).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {upperCaseFirstLetter(
                      Object.values(AVERAGE_AGE_PERIOD)[index]
                    )}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <Typography variant="body1">Days Previously:</Typography>
              <TextField
                label=""
                type="number"
                size="small"
                onChange={onChangePreviousDays}
                defaultValue={previousDay}
                sx={{ width: '100px' }}
                error={errorNumber}
                inputProps={{ min: 0 }}
              />
            </Box>
            <Button onClick={onSubmit} variant="contained">
              Submit
            </Button>
          </Box>
          <div className="sprintChart">
            <CombinedChart
              options={chartOptions}
              data={dataSet}
              chartRef={chartRef}
            />
          </div>
          <div className="sprintTable"></div>
        </div>
      )}
    </div>
  )
}

export default AverageAgeReport
