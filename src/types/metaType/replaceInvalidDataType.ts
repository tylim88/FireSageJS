import {
	ErrorInvalidDataTypeRead,
	ErrorInvalidDataTypeBase,
	ErrorInvalidDataTypeWrite,
} from '../error'
import {
	ServerTimestamp,
	PushAble,
	Removable,
	PushAbleOnly,
	PseudoArray,
} from '../fieldValue'

export type ReplaceInvalidDataTypeBase<T> = T extends
	| boolean
	| string
	| number
	| ServerTimestamp
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
	| ServerTimestamp
	| Removable
	| null
	? T
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceInvalidDataTypeRead<T[K]> }
	: T extends PushAble<infer X>
	? PushAble<ReplaceInvalidDataTypeRead<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceInvalidDataTypeRead<X>>
	: T extends PseudoArray<infer X>
	? PseudoArray<ReplaceInvalidDataTypeRead<X>>
	: ErrorInvalidDataTypeRead

export type ReplaceInvalidDataTypeWrite<T> = T extends
	| boolean
	| string
	| number
	| ServerTimestamp
	| Removable
	| null
	? T
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceInvalidDataTypeWrite<T[K]> }
	: T extends PushAble<infer X>
	? PushAble<ReplaceInvalidDataTypeWrite<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceInvalidDataTypeWrite<X>>
	: T extends PseudoArray<infer X>
	? PseudoArray<ReplaceInvalidDataTypeWrite<X>>
	: ErrorInvalidDataTypeWrite

export type ReplaceRemove<T> = T extends Removable
	? never
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceRemove<T[K]> }
	: T extends PushAble<infer X>
	? PushAble<ReplaceRemove<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceRemove<X>>
	: T extends PseudoArray<infer X>
	? PseudoArray<ReplaceRemove<X>>
	: T

export type ReplaceRemoveWithUndefined<T> = T extends Removable
	? undefined
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceRemoveWithUndefined<T[K]> }
	: T extends PushAble<infer X>
	? PushAble<ReplaceRemoveWithUndefined<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceRemoveWithUndefined<X>>
	: T extends PseudoArray<infer X>
	? PseudoArray<ReplaceRemoveWithUndefined<X>>
	: T
