export default interface IProps {
  chosenColor: string
  onChange: (color: string) => void
  open?: boolean
  disabled?: boolean
}
