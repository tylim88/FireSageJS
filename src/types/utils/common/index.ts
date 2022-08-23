export * from './numeric'
export * from './string'
export * from './is'

export type StrictExtract<T, U extends T> = Extract<T, U>
