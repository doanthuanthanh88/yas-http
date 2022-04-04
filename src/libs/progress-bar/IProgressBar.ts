export interface IProgressBar {
  total: number
  get value(): number
  set title(title: string)
  start(total: number, startValue: number, payload?: any): void | Promise<void>
  increment(num: number, payload?: any): void | Promise<void>
  stop(): void | Promise<void>
}