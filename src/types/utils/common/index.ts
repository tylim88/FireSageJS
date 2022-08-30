export * from './numeric'
export * from './string'
export * from './is'

export type StrictExtract<T, U extends T> = Extract<T, U>
export type StrictOmit<T, U extends keyof T> = Omit<T, U>
