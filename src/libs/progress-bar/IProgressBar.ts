export interface IProgressBar {
  total: number
  get value(): number
  set title(title: string)
  start(total: number, startValue: number, payload?: any)
  increment(num: number, payload?: any)
  stop()
}