import {
	ErrorInvalidDataTypeRead,
	ErrorInvalidDataTypeBase,
	ErrorInvalidDataTypeWrite,
} from '../error'
import { ServerTimestamp, Increment, PushAble, Removable } from '../fieldValue'

export type ReplaceInvalidDataTypeBase<
	T,
	K extends string = keyof T & string
> = T extends
	| boolean
	| string
	| number
	| ServerTimestamp
	| Increment
	| PushAble<any>
	| Removable
	| null
	? T
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceInvalidDataTypeBase<T[K], K & string> }
	: T extends PushAble<infer X>
	? { [x: string]: ReplaceInvalidDataTypeBase<X> }
	: ErrorInvalidDataTypeBase<K extends string ? K : 'root'>

export type ReplaceInvalidDataTypeRead<
	T,
	K extends string = keyof T & string
> = T extends boolean | string | number | undefined | null
	? T
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceInvalidDataTypeRead<T[K], K & string> }
	: T extends PushAble<infer X>
	? { [x: string]: ReplaceInvalidDataTypeRead<X> }
	: ErrorInvalidDataTypeRead<K extends string ? K : 'root'>

export type ReplaceInvalidDataTypeWrite<
	T,
	K extends string = keyof T & string
> = T extends boolean | string | number | ServerTimestamp | Increment | null
	? T
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceInvalidDataTypeWrite<T[K], K & string> }
	: T extends PushAble<infer X>
	? { [x: string]: ReplaceInvalidDataTypeWrite<X> }
	: ErrorInvalidDataTypeWrite<K extends string ? K : 'root'>

export type ReplaceRemove<T> = T extends Removable
	? never
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceRemove<T[K]> }
	: T extends PushAble<infer X>
	? { [x: string]: ReplaceRemove<X> }
	: T

export type ReplaceRemoveWithUndefined<T> = T extends Removable
	? undefined
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceRemoveWithUndefined<T[K]> }
	: T extends PushAble<infer X>
	? { [x: string]: ReplaceRemoveWithUndefined<X> }
	: T
