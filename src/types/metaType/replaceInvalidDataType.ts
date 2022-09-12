import {
	ErrorInvalidDataType,
	ErrorUseNumericKeyRecordInstead,
	ErrorInvalidKey,
	ErrorObjectTypeUnion,
} from './error'
import {
	ServerTimestamp,
	PushAble,
	Removable,
	PushAbleOnly,
	NumericKeyRecord,
	PossiblyReadAsNullable,
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

type ValidUnion = Removable | PossiblyReadAsNullable

export type ReplaceInvalidDataTypeBase<T> = T extends
	| boolean
	| string
	| number
	| ServerTimestamp
	| ValidUnion
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
	| ValidUnion
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
	| ValidUnion
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

export type ReplaceInvalidUnion<T> = Exclude<T, ValidUnion> extends infer R
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
				| Extract<T, ValidUnion>
		: T
	: T
