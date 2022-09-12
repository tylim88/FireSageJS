import {
	ServerTimestamp,
	Increment,
	PushAble,
	PushAbleOnly,
	NumericKeyRecord,
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

export type AllNodesPossiblyReadAsNullable<T> = T extends Record<
	string,
	unknown
>
	?
			| {
					[K in keyof T]:
						| AllNodesPossiblyReadAsNullable<T[K]>
						| undefined
						| null
			  }
			| undefined
			| null
	: T extends (infer X)[]
	? (AllNodesPossiblyReadAsNullable<X> | undefined | null)[] | undefined | null
	: T | undefined | null
