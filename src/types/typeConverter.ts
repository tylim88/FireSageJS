import { ServerTimestamp, Increment } from './fieldValue'

export type ReadTypeConverter<T> = T extends ServerTimestamp
	? number
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReadTypeConverter<T[K]> }
	: T

export type WriteTypeConverter<T> = number extends T
	? number | Increment
	: T extends Record<string, unknown>
	? { [K in keyof T]: WriteTypeConverter<T[K]> }
	: T
