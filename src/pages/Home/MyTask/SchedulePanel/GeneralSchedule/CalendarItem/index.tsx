import { Checkbox, theme, Row, Col, Divider, ColorPicker } from 'antd'
import type { CheckboxProps } from 'antd'
import { generate, green, presetPalettes, red } from '@ant-design/colors'
import type { ColorPickerProps } from 'antd'
type Presets = Required<ColorPickerProps>['presets'][number]
import './style.scss'
const CalendarItem = () => {
  const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`)
  }

  const genPresets = (presets = presetPalettes) =>
    Object.entries(presets).map<Presets>(([label, colors]) => ({
      label,
      colors
    }))

  const HorizontalLayoutDemo = () => {
    const { token } = theme.useToken()

    const presets = genPresets({
      primary: generate(token.colorPrimary),
      red,
      green
    })

    const customPanelRender: ColorPickerProps['panelRender'] = (
      _,
      { components: { Picker, Presets } }
    ) => (
      <Row justify="space-between" wrap={false}>
        <Col span={12}>
          <Presets />
        </Col>
        <Divider type="vertical" style={{ height: 'auto' }} />
        <Col flex="auto">
          <Picker />
        </Col>
      </Row>
    )

    return (
      <ColorPicker
        defaultValue={token.colorPrimary}
        styles={{ popupOverlayInner: { width: 400 } }}
        presets={presets}
        panelRender={customPanelRender}
        size="small"
      />
    )
  }

  return (
    <div className="calendarItem">
      <Checkbox onChange={onChange}>khiemld.0204@gmail.com</Checkbox>
      <HorizontalLayoutDemo />
    </div>
  )
}

export default CalendarItem
