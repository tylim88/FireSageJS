import { ErrorInvalidDataType } from './error'
import { ServerTimestamp } from './fieldValue'

export type ReplaceInvalidDataType<T> = T[] extends (
	| boolean
	| string
	| number
	| ServerTimestamp
)[]
	? T
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceInvalidDataType<T[K]> }
	: ErrorInvalidDataType<T extends string ? T : 'root'>
