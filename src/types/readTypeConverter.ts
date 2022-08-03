import { ServerTimestamp } from './fieldValue'

export type ReadTypeConverter<T> = T extends ServerTimestamp
	? number
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReadTypeConverter<T[K]> }
	: T
