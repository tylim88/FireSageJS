import { ServerTimestamp, Increment, PushAble } from '../fieldValue'

export type ReadTypeConverter<T> = T extends ServerTimestamp
	? number
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReadTypeConverter<T[K]> }
	: T extends PushAble<infer X>
	? { [x: string]: ReadTypeConverter<X> }
	: T

export type WriteTypeConverter<T> = number extends T
	? number | Increment
	: T extends Record<string, unknown>
	? { [K in keyof T]: WriteTypeConverter<T[K]> }
	: T extends PushAble<infer X>
	? { [x: string]: WriteTypeConverter<X> }
	: T
