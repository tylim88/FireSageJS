import {
	ErrorInvalidDataType,
	ErrorObjectTypeUnion,
	ErrorUseNumericKeyRecordInstead,
	ErrorInvalidKey,
} from './error'
import {
	ServerTimestamp,
	PushAble,
	Removable,
	PushAbleOnly,
	NumericKeyRecord,
} from '../fieldValue'
import { IsCharacterValid } from '../utils'
import { IsUnion } from '../tsUtils'

type IsValidFirebaseKey<K extends string, P> = IsCharacterValid<
	K,
	P,
	ErrorInvalidKey<K>
>

type ReplaceRecordNumber<T, U> = T extends Record<infer X, unknown>
	? X extends number | `${number}`
		? ErrorUseNumericKeyRecordInstead
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
	? ReplaceRecordNumber<
			T,
			{
				[K in keyof T]: IsValidFirebaseKey<
					K & string,
					ReplaceInvalidDataTypeBase<T[K]>
				>
			}
	  >
	: T extends PushAble<infer X>
	? PushAble<ReplaceInvalidDataTypeBase<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceInvalidDataTypeBase<X>>
	: T extends NumericKeyRecord<infer X>
	? NumericKeyRecord<ReplaceInvalidDataTypeBase<X>>
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
	? ReplaceRecordNumber<
			T,
			{
				[K in keyof T]: IsValidFirebaseKey<
					K & string,
					ReplaceInvalidDataTypeRead<T[K]>
				>
			}
	  >
	: T extends PushAble<infer X>
	? PushAble<ReplaceInvalidDataTypeRead<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceInvalidDataTypeRead<X>>
	: T extends NumericKeyRecord<infer X>
	? NumericKeyRecord<ReplaceInvalidDataTypeRead<X>>
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
			{
				[K in keyof T]: IsValidFirebaseKey<
					K & string,
					ReplaceInvalidDataTypeWrite<T[K]>
				>
			}
	  >
	: T extends PushAble<infer X>
	? PushAble<ReplaceInvalidDataTypeWrite<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceInvalidDataTypeWrite<X>>
	: T extends NumericKeyRecord<infer X>
	? NumericKeyRecord<ReplaceInvalidDataTypeWrite<X>>
	: ErrorInvalidDataType

export type ReplaceRemove<T> = T extends Removable
	? never
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceRemove<T[K]> }
	: T extends PushAble<infer X>
	? PushAble<ReplaceRemove<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceRemove<X>>
	: T extends NumericKeyRecord<infer X>
	? NumericKeyRecord<ReplaceRemove<X>>
	: T

export type ReplaceRemoveWithUndefined<T> = T extends Removable
	? undefined
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceRemoveWithUndefined<T[K]> }
	: T extends PushAble<infer X>
	? PushAble<ReplaceRemoveWithUndefined<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceRemoveWithUndefined<X>>
	: T extends NumericKeyRecord<infer X>
	? NumericKeyRecord<ReplaceRemoveWithUndefined<X>>
	: T

export type ReplaceInvalidUnion<T> = Exclude<T, Removable> extends infer R
	? IsUnion<R> extends true
		? Extract<
				R,
				| Record<string, unknown>
				| PushAble<unknown>
				| PushAbleOnly<unknown>
				| NumericKeyRecord<unknown>
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
