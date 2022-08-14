import { MetaType } from './metaType'
import { FindNestedWriteTypeFromFullPath } from './findTypeAndKey'
import { GetFullPath, GetAllPushAbleOnlyPaths } from './getPath'
import {
	ErrorIsPushOnlyAbleType,
	ErrorNeedTupleNotArray,
	ErrorElementNeedConstAssertion,
} from './error'

import { ValidateChildPath } from './child'

type ValidateChildPathAndCheckIsNotPushAbleOnly<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	P extends string
> = ValidateChildPath<T, U, P> extends P
	? GetFullPath<T, U, P> extends GetAllPushAbleOnlyPaths<T>
		? ErrorIsPushOnlyAbleType<`child ${P}`>
		: P
	: ValidateChildPath<T, U, P>

export type ValidateNodeNames<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends readonly string[],
	ACC extends readonly string[] = []
> = number extends V[number]
	? [ErrorNeedTupleNotArray]
	: V extends []
	? Readonly<ACC>
	: V extends readonly [infer P extends string, ...infer S extends string[]]
	? ValidateNodeNames<
			T,
			U,
			S,
			[
				...ACC,
				string extends P
					? GetFullPath<T, U, P> extends never
						? ErrorElementNeedConstAssertion
						: ValidateChildPathAndCheckIsNotPushAbleOnly<T, U, P>
					: ValidateChildPathAndCheckIsNotPushAbleOnly<T, U, P>
			]
	  >
	: never

export type GetNodeTypes<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends readonly string[],
	ACC extends unknown[] = []
> = V extends []
	? ACC
	: V extends readonly [infer P extends string, ...infer S extends string[]]
	? GetNodeTypes<
			T,
			U,
			S,
			[...ACC, FindNestedWriteTypeFromFullPath<T, GetFullPath<T, U, P>>]
	  >
	: never
