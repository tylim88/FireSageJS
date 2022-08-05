import { ServerTimestamp, Increment, Push, Remove } from './fieldValue'

export type ReadTypeConverter<T> = T extends ServerTimestamp
	? number
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReadTypeConverter<T[K]> }
	: T extends Push<infer X>
	? { [x: string]: ReadTypeConverter<X> }
	: T

export type WriteTypeConverter<T> = number extends T
	? number | Increment
	: T extends Record<string, unknown>
	? { [K in keyof T]: WriteTypeConverter<T[K]> }
	: T extends Push<infer X>
	? { [x: string]: WriteTypeConverter<X> }
	: T

export type RemoveRemove<T> = T extends Remove
	? never
	: T extends Record<string, unknown>
	? { [K in keyof T]: RemoveRemove<T[K]> }
	: T

export type ReplaceRemoveWithUndefined<T> = T extends Remove
	? undefined
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceRemoveWithUndefined<T[K]> }
	: T
