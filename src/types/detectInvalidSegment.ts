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

// because {a:1,b:2,c:3} extends {[x:number]:unknown} but not {[x:number]:unknown} & {[x:string]:never}
export type DetectAndIntersectNumericRecordWithRecordStringNever<T> =
	T extends Record<infer X, unknown>
		? `${number}` extends `${X & (string | number)}`
			? `${X & (string | number)}` extends `${number}`
				? T & Record<string, never>
				: T
			: T
		: T

export type DetectNumericRecordType<T> = T extends Record<infer X, unknown>
	? `${number}` extends `${X & (string | number)}`
		? `${X & (string | number)}` extends `${number}`
			? true
			: false
		: false
	: false
