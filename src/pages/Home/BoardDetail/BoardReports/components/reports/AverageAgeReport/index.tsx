import {
  IAverageAgeReport,
  IAverageAgeReportProps,
  chartOptions,
  exportChartPdf,
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
import CombinedChart from '~/components/Charts/BarLineChart'
import { ChartData } from 'chart.js'
import AverageAgeTable from './AverageAgeTable'
import dayjs from 'dayjs'
import { RiDownloadLine } from 'react-icons/ri'
import { LoadingOutlined } from '@ant-design/icons'
import { Empty } from 'antd'
const AverageAgeReport = (props: IAverageAgeReportProps) => {
  const { boardId, reportType } = props
  const [periodOption, setPeriodOption] = useState<string>(
    AVERAGE_AGE_PERIOD.daily
  )
  const chartRef = useRef<unknown>(null)
  const [previousDay, setPreviousDay] = useState<number>(7)
  const [errorNumber, setErrorNumber] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isExport, setIsExport] = useState<boolean>(false)
  const [sprintData, setSprintData] = useState<IAverageAgeReport>(
    {} as IAverageAgeReport
  )
  const { dates, totalAges, averageAges } = preProcessData(
    sprintData.averageEachTask
  )
  const averageLineData = new Array(dates.length).fill(sprintData.averageAge)

  const exportReport = async () => {
    try {
      const table = document.getElementById('averageAgeTable') as HTMLElement
      const fileName = `average-age-${dayjs().unix()}`
      await exportChartPdf(chartRef, fileName, table, reportType, setIsExport)
    } catch (err) {
      console.log('🚀 ~ exportReport ~ err:', err)
      setIsExport(false)
      enqueueSnackbar('Export Failed', { variant: 'error' })
    }
  }

  const dataSet: ChartData<'bar' | 'line', number[], string> = {
    labels: dates,
    datasets: [
      {
        type: 'bar',
        label: 'Total Task Age (Days)',
        data: totalAges,
        backgroundColor: 'rgba(0, 122, 255, 0.4)',
        borderColor: 'rgba(0, 122, 255, 1)',
        borderWidth: 2
      },
      {
        type: 'bar',
        label: 'Average Age per Task',
        data: averageAges,
        borderColor: 'rgba(255, 149, 0, 1)',
        backgroundColor: 'rgba(255, 149, 0, 0.4)',
        borderWidth: 2
      },
      {
        type: 'line',
        label: 'Overall Average Age',
        data: averageLineData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
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
      console.log('🚀 ~ getAverageAgeReportData ~ err:', err)
      enqueueSnackbar('Generate Export Failed', { variant: 'error' })
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
      <div className="wrapper">
        <div className="wrapperHeader">
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
            <Button
              onClick={onSubmit}
              variant="contained"
              startIcon={isLoading ? <LoadingOutlined /> : null}
              disabled={isLoading || isExport}>
              Submit
            </Button>
          </Box>
          <Button
            variant="outlined"
            startIcon={isExport ? <LoadingOutlined /> : <RiDownloadLine />}
            onClick={exportReport}
            disabled={isExport || !(sprintData?.averageEachTask || []).length}>
            Export PDF
          </Button>
        </div>
        {!(sprintData?.averageEachTask || []).length && <Empty />}
        {(sprintData?.averageEachTask || []).length > 0 ? (
          <div className="sprintChart">
            <CombinedChart
              options={chartOptions}
              data={dataSet}
              chartRef={chartRef}
            />
          </div>
        ) : (
          <></>
        )}
        {(sprintData?.averageEachTask || []).length > 0 ? (
          <div className="sprintTable">
            <AverageAgeTable data={sprintData.averageEachTask} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default AverageAgeReport
