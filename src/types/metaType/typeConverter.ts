import {
	ServerTimestamp,
	Increment,
	PushAble,
	PushAbleOnly,
	NumericKeyRecord,
	Removable,
	PossiblyReadAsNullable,
} from '../fieldValue'

export type ReadTypeConverter<T> = T extends Record<string, unknown>
	? { [K in keyof T]: ReadTypeConverter<T[K]> }
	: T extends PushAble<infer X>
	? { [x in string]: ReadTypeConverter<X> }
	: T extends PushAbleOnly<infer X>
	? { [x in string]: ReadTypeConverter<X> }
	: T extends NumericKeyRecord<infer X>
	? Record<`${number}`, ReadTypeConverter<X>>
	: T extends ServerTimestamp
	? number
	: T

export type CompareTypeConverter<T> = T extends Record<string, unknown>
	? { [K in keyof T]: CompareTypeConverter<T[K]> }
	: T extends PushAble<infer X>
	? { [x in string]: CompareTypeConverter<X> }
	: T extends PushAbleOnly<infer X>
	? { [x in string]: CompareTypeConverter<X> }
	: T extends NumericKeyRecord<infer X>
	? { [x in `${number}`]: CompareTypeConverter<X> }
	: T extends ServerTimestamp
	? number
	: T

export type WriteTypeConverter<T> = T extends Record<string, unknown>
	? { [K in keyof T]: WriteTypeConverter<T[K]> }
	: T extends PushAble<infer X>
	? { [x in string]: WriteTypeConverter<X> }
	: T extends PushAbleOnly<infer X>
	? { [x in string]: WriteTypeConverter<X> }
	: T extends NumericKeyRecord<infer X>
	? { [x in `${number}`]: WriteTypeConverter<X> } | WriteTypeConverter<X>[]
	: number extends T
	? number | Increment
	: T

export type ReplaceAllNodesPossiblyReadAsNullableWithNullable<T> =
	T extends Record<string, unknown>
		?
				| {
						[K in keyof T]:
							| ReplaceAllNodesPossiblyReadAsNullableWithNullable<T[K]>
							| undefined
							| null
				  }
				| undefined
				| null
		: T extends (infer X)[]
		?
				| (
						| ReplaceAllNodesPossiblyReadAsNullableWithNullable<X>
						| undefined
						| null
				  )[]
				| undefined
				| null
		: T | undefined | null

export type ReplaceRemoveAndPossiblyReadAsNullableWithNever<T> = T extends
	| Removable
	| PossiblyReadAsNullable
	? never
	: T extends Record<string, unknown>
	? { [K in keyof T]: ReplaceRemoveAndPossiblyReadAsNullableWithNever<T[K]> }
	: T extends PushAble<infer X>
	? PushAble<ReplaceRemoveAndPossiblyReadAsNullableWithNever<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceRemoveAndPossiblyReadAsNullableWithNever<X>>
	: T extends NumericKeyRecord<infer X>
	? NumericKeyRecord<ReplaceRemoveAndPossiblyReadAsNullableWithNever<X>>
	: T

export type ReplaceRemoveAndPossiblyReadAsNullableWithNullable<T> = T extends
	| Removable
	| PossiblyReadAsNullable
	? undefined | null
	: T extends Record<string, unknown>
	? {
			[K in keyof T]: ReplaceRemoveAndPossiblyReadAsNullableWithNullable<T[K]>
	  }
	: T extends PushAble<infer X>
	? PushAble<ReplaceRemoveAndPossiblyReadAsNullableWithNullable<X>>
	: T extends PushAbleOnly<infer X>
	? PushAbleOnly<ReplaceRemoveAndPossiblyReadAsNullableWithNullable<X>>
	: T extends NumericKeyRecord<infer X>
	? NumericKeyRecord<ReplaceRemoveAndPossiblyReadAsNullableWithNullable<X>>
	: T
