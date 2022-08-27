import {
	ServerTimestamp,
	Increment,
	PushAble,
	PushAbleOnly,
	PseudoArray,
} from '../fieldType'

export type ReadTypeConverter<T> = T extends Record<string, unknown>
	? { [K in keyof T]: ReadTypeConverter<T[K]> }
	: T extends PushAble<infer X>
	? { [x in string]: ReadTypeConverter<X> }
	: T extends PushAbleOnly<infer X>
	? { [x in string]: ReadTypeConverter<X> }
	: T extends PseudoArray<infer X>
	? ReadTypeConverter<X>[]
	: T extends ServerTimestamp
	? number
	: T

export type CompareTypeConverter<T> = T extends Record<string, unknown>
	? { [K in keyof T]: CompareTypeConverter<T[K]> }
	: T extends PushAble<infer X>
	? { [x in string]: CompareTypeConverter<X> }
	: T extends PushAbleOnly<infer X>
	? { [x in string]: CompareTypeConverter<X> }
	: T extends PseudoArray<infer X>
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
	: T extends PseudoArray<infer X>
	? { [x in `${number}`]: WriteTypeConverter<X> } | WriteTypeConverter<X>[]
	: number extends T
	? number | Increment
	: T

export type AllNodesPossiblyReadAsUndefined<T> = T extends Record<
	string,
	unknown
>
	?
			| { [K in keyof T]: AllNodesPossiblyReadAsUndefined<T[K]> | undefined }
			| undefined
	: T extends (infer X)[]
	? (AllNodesPossiblyReadAsUndefined<X> | undefined)[] | undefined
	: T | undefined
