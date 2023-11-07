export default interface IProps {
  onSubmitCode: (codes: number[]) => Promise<void> | void
  length: number
}
