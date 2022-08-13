import { MetaType } from './metaType'
import { ErrorNeedString, ErrorInvalidPathTypeOrNeedNumber } from './error'
import { FindMetaPathType } from './findTypeAndKey'

// string does not extends `${number}`
// `${number}` extends string so we need to handle this case
export type ReplaceInvalidLastSegment<
	T extends MetaType,
	U extends keyof T['flatten_write'] & string,
	L extends string = FindMetaPathType<T, U> & string,
	H extends string = U
> = L[] extends never[]
	? ErrorInvalidPathTypeOrNeedNumber // return generic error for string does not extends `${number}` case
	: L extends `${infer M}/${infer N}`
	? H extends `${infer I}/${infer J}`
		? I extends `${number}`
			? string extends M
				? ErrorNeedString
				: ReplaceInvalidLastSegment<T, U, N, J>
			: ReplaceInvalidLastSegment<T, U, N, J>
		: never // impossible route
	: H extends `${number}`
	? string extends L
		? ErrorNeedString
		: U
	: U
