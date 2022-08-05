import { ErrorInvalidDataType } from './error'
import { ServerTimestamp, Increment, Push } from './fieldValue'
export type ReplaceInvalidDataType<T> = T[] extends (
	| boolean
	| string
	| number
	| ServerTimestamp
	| Increment
	| Push<any>
)[]
	? T
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceInvalidDataType<T[K]> }
	: ErrorInvalidDataType<T extends string ? T : 'root'>
