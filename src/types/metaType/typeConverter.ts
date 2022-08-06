import { ServerTimestamp, Increment, PushAble } from '../fieldValue'

export type ReadTypeConverter<T> = T extends Record<string, unknown>
	? { [K in keyof T]: ReadTypeConverter<T[K]> }
	: T extends PushAble<infer X>
	? { [x: string]: ReadTypeConverter<X> }
	: T extends ServerTimestamp
	? number
	: T

export type WriteTypeConverter<T> = T extends Record<string, unknown>
	? { [K in keyof T]: WriteTypeConverter<T[K]> }
	: T extends PushAble<infer X>
	? { [x: string]: WriteTypeConverter<X> }
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
	: T extends PushAble<infer X>
	? { [x: string]: AllNodesPossiblyReadAsUndefined<X> | undefined } | undefined
	: T | undefined
