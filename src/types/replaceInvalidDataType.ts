import {
	ErrorInvalidDataTypeRead,
	ErrorInvalidDataTypeBase,
	ErrorInvalidDataTypeWrite,
} from './error'
import { ServerTimestamp, Increment, Push, Remove } from './fieldValue'

export type ReplaceInvalidDataTypeBase<
	T,
	K extends string = keyof T & string
> = T extends
	| boolean
	| string
	| number
	| ServerTimestamp
	| Increment
	| Push<any>
	| Remove
	? T
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceInvalidDataTypeBase<T[K], K & string> }
	: T extends Push<infer X>
	? { [x: string]: ReplaceInvalidDataTypeBase<X> }
	: ErrorInvalidDataTypeBase<K extends string ? K : 'root'>

export type ReplaceInvalidDataTypeRead<
	T,
	K extends string = keyof T & string
> = T extends boolean | string | number | undefined
	? T
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceInvalidDataTypeRead<T[K], K & string> }
	: T extends Push<infer X>
	? { [x: string]: ReplaceInvalidDataTypeRead<X> }
	: ErrorInvalidDataTypeRead<K extends string ? K : 'root'>

export type ReplaceInvalidDataTypeWrite<
	T,
	K extends string = keyof T & string
> = T extends boolean | string | number | ServerTimestamp | Increment
	? T
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceInvalidDataTypeWrite<T[K], K & string> }
	: T extends Push<infer X>
	? { [x: string]: ReplaceInvalidDataTypeWrite<X> }
	: ErrorInvalidDataTypeWrite<K extends string ? K : 'root'>

export type ReplaceRemove<T> = T extends Remove
	? never
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceRemove<T[K]> }
	: T extends Push<infer X>
	? { [x: string]: ReplaceRemove<X> }
	: T

export type ReplaceRemoveWithUndefined<T> = T extends Remove
	? undefined
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceRemoveWithUndefined<T[K]> }
	: T extends Push<infer X>
	? { [x: string]: ReplaceRemoveWithUndefined<X> }
	: T
