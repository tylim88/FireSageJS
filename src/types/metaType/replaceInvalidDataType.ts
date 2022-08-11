import {
	ErrorInvalidDataTypeRead,
	ErrorInvalidDataTypeBase,
	ErrorInvalidDataTypeWrite,
} from '../error'
import {
	ServerTimestamp,
	Increment,
	PushAble,
	Removable,
	PushAbleOnly,
	PseudoArray,
} from '../fieldValue'

type i = ReplaceInvalidDataTypeBase<{ a: PseudoArray<{ b: 1 }> }>

export type ReplaceInvalidDataTypeBase<T> = T extends
	| boolean
	| string
	| number
	| ServerTimestamp
	| Increment
	| Removable
	| null
	? T
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceInvalidDataTypeBase<T[K]> }
	: T extends PushAble<infer X>
	? PushAble<ReplaceInvalidDataTypeBase<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceInvalidDataTypeBase<X>>
	: T extends PseudoArray<infer X>
	? PseudoArray<ReplaceInvalidDataTypeBase<X>>
	: ErrorInvalidDataTypeBase

export type ReplaceInvalidDataTypeRead<T> = T extends
	| boolean
	| string
	| number
	| undefined
	| null
	? T
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceInvalidDataTypeRead<T[K]> }
	: T extends PushAble<infer X>
	? { [x: string]: ReplaceInvalidDataTypeRead<X> }
	: T extends PushAbleOnly<infer X>
	? { [x: string]: ReplaceInvalidDataTypeRead<X> }
	: T extends PseudoArray<infer X>
	? { [x: string]: ReplaceInvalidDataTypeRead<X> }
	: ErrorInvalidDataTypeRead

export type ReplaceInvalidDataTypeWrite<T> = T extends
	| boolean
	| string
	| number
	| ServerTimestamp
	| Increment
	| null
	? T
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceInvalidDataTypeWrite<T[K]> }
	: T extends PushAble<infer X>
	? { [x: string]: ReplaceInvalidDataTypeWrite<X> }
	: T extends PushAbleOnly<infer X>
	? { [x: string]: ReplaceInvalidDataTypeWrite<X> }
	: T extends PseudoArray<infer X>
	? { [x: string]: ReplaceInvalidDataTypeWrite<X> }
	: ErrorInvalidDataTypeWrite

export type ReplaceRemove<T> = T extends Removable
	? never
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceRemove<T[K]> }
	: T extends PushAble<infer X>
	? { [x: string]: ReplaceRemove<X> }
	: T extends PushAbleOnly<infer X>
	? { [x: string]: ReplaceRemove<X> }
	: T extends PseudoArray<infer X>
	? { [x: string]: ReplaceRemove<X> }
	: T

export type ReplaceRemoveWithUndefined<T> = T extends Removable
	? undefined
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceRemoveWithUndefined<T[K]> }
	: T extends PushAble<infer X>
	? { [x: string]: ReplaceRemoveWithUndefined<X> }
	: T extends PushAbleOnly<infer X>
	? { [x: string]: ReplaceRemoveWithUndefined<X> }
	: T
