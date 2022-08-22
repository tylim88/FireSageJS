import {
	ErrorInvalidDataType,
	ErrorObjectTypeUnion,
	ErrorUsePseudoArrayInstead,
} from './error'
import {
	ServerTimestamp,
	PushAble,
	Removable,
	PushAbleOnly,
	PseudoArray,
} from '../fieldType'
import { IsUnion } from '../utils'

export type ReplaceRecordNumber<T, U> = T extends Record<infer X, unknown>
	? X extends number | `${number}`
		? ErrorUsePseudoArrayInstead
		: U
	: never

export type ReplaceInvalidDataTypeBase<T> = T extends
	| boolean
	| string
	| number
	| ServerTimestamp
	| Removable
	| null
	? T
	: T extends Record<string, unknown>
	? ReplaceRecordNumber<T, { [K in keyof T]: ReplaceInvalidDataTypeBase<T[K]> }>
	: T extends PushAble<infer X>
	? PushAble<ReplaceInvalidDataTypeBase<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceInvalidDataTypeBase<X>>
	: T extends PseudoArray<infer X>
	? PseudoArray<ReplaceInvalidDataTypeBase<X>>
	: ErrorInvalidDataType

export type ReplaceInvalidDataTypeRead<T> = T extends
	| boolean
	| string
	| number
	| ServerTimestamp
	| Removable
	| null
	? T
	: T extends Record<string, unknown>
	? ReplaceRecordNumber<T, { [K in keyof T]: ReplaceInvalidDataTypeRead<T[K]> }>
	: T extends PushAble<infer X>
	? PushAble<ReplaceInvalidDataTypeRead<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceInvalidDataTypeRead<X>>
	: T extends PseudoArray<infer X>
	? PseudoArray<ReplaceInvalidDataTypeRead<X>>
	: ErrorInvalidDataType

export type ReplaceInvalidDataTypeWrite<T> = T extends
	| boolean
	| string
	| number
	| ServerTimestamp
	| Removable
	| null
	? T
	: T extends Record<string, unknown>
	? ReplaceRecordNumber<
			T,
			{ [K in keyof T]: ReplaceInvalidDataTypeWrite<T[K]> }
	  >
	: T extends PushAble<infer X>
	? PushAble<ReplaceInvalidDataTypeWrite<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceInvalidDataTypeWrite<X>>
	: T extends PseudoArray<infer X>
	? PseudoArray<ReplaceInvalidDataTypeWrite<X>>
	: ErrorInvalidDataType

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

export type ReplaceInvalidUnion<T> = Exclude<T, Removable> extends infer R
	? IsUnion<R> extends true
		? Extract<
				R,
				| Record<string, unknown>
				| PushAble<unknown>
				| PushAbleOnly<unknown>
				| PseudoArray<unknown>
		  > extends never
			? T
			: ErrorObjectTypeUnion
		: R extends Record<string, unknown>
		?
				| {
						[K in keyof R]: ReplaceInvalidUnion<R[K]>
				  }
				| Extract<T, Removable>
		: T
	: T
