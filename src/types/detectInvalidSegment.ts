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
