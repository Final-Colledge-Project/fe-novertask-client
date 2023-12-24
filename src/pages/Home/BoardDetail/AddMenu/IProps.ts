export default interface IProps {
  items?: {
    title: string
    onChoose: () => void
  }[]
}
