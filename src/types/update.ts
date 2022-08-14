import { MetaType } from './metaType'
import { FindNestedWriteTypeFromFullPath } from './findTypeAndKey'
import { GetFullPath, GetAllPushAbleOnlyPaths } from './getPath'
import {
	ErrorIsPushOnlyAbleType,
	ErrorNeedTupleNotArray,
	ErrorElementNeedConstAssertion,
	ErrorNoSuchChild,
} from './error'

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
				string extends GetFullPath<T, U, P>
					? ErrorElementNeedConstAssertion
					: GetFullPath<T, U, P> extends never
					? ErrorNoSuchChild<P, U>
					: GetFullPath<T, U, P> extends GetAllPushAbleOnlyPaths<T>
					? ErrorIsPushOnlyAbleType<`child ${P}`>
					: P
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
