import { MetaType } from './metaType'
import {
	ErrorInvalidPathTypeNeedString,
	ErrorInvalidPathTypeOrNeedNumber,
} from './error'
import { FindMetaPathType } from './findTypeAndKey'

// string does not extends `${number}`
// `${number}` extends string so we need to handle this case
export type DetectInvalidSegment<
	T extends MetaType,
	V extends keyof T['flatten_write'] & string,
	L extends string = FindMetaPathType<T, V> & string,
	H extends string = V
> = L[] extends never[]
	? ErrorInvalidPathTypeOrNeedNumber // return generic error for string does not extends `${number}` case
	: L extends `${infer M}/${infer N}`
	? H extends `${infer I}/${infer J}`
		? I extends `${number}`
			? string extends M
				? ErrorInvalidPathTypeNeedString
				: DetectInvalidSegment<T, V, N, J>
			: DetectInvalidSegment<T, V, N, J>
		: never // impossible route
	: H extends `${number}`
	? string extends L
		? ErrorInvalidPathTypeNeedString
		: V
	: V

export type DetectNumericRecordType<T> = T extends Record<string, unknown>
	? T extends Record<infer X, unknown>
		? X extends number
			? true
			: `${number}` extends `${X & (string | number)}`
			? `${X & (string | number)}` extends `${number}`
				? true
				: false
			: false
		: false
	: false

// not in use
export type DetectStringRecordType<T> = T extends Record<string, unknown>
	? T extends Record<infer X, unknown>
		? `${X & (string | number)}` extends `${number}`
			? false
			: true
		: false
	: false

// keep in mind Record<string, T> and Record<number, T> extends each other, which is why the code is written in such way
// Record<string, T> does not extends Record<number,T> & Record<string,T>
export type DetectAndIntersectNumericRecordWithRecordStringNever<I, T> =
	DetectNumericRecordType<I> extends infer G
		? G extends true
			? T // don't intersect if input type is Record<number,T>
			: T extends Record<number, unknown> // intersect if input type is Record<string,T> and path type is Record<number,T>
			? DetectNumericRecordType<T> extends true
				? T & Record<string, never>
				: T
			: T
		: never
