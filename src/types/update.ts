import { MetaType } from './metaType'
import {
	FindAllChildKeys,
	FindNestedTypeFromFullPath,
	GetFullPath,
	GetAllPushAbleOnlyPath,
} from './findTypeAndKey'
import {
	ErrorHasNoChild,
	ErrorUnknownProperty,
	ErrorIsPushOnlyAbleType,
	ErrorNeedTupleNotArray,
	ErrorElementNeedConstAssertion,
	ErrorNoSuchChild,
} from './error'

export type VerifyNodeNames<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends readonly string[],
	ACC extends readonly string[] = []
> = number extends V[number]
	? [ErrorNeedTupleNotArray]
	: V extends []
	? Readonly<ACC>
	: V extends readonly [infer P extends string, ...infer S extends string[]]
	? VerifyNodeNames<
			T,
			U,
			S,
			[
				...ACC,
				string extends GetFullPath<T, U, P>
					? ErrorElementNeedConstAssertion
					: GetFullPath<T, U, P> extends never
					? ErrorNoSuchChild<P, U>
					: GetFullPath<T, U, P> extends GetAllPushAbleOnlyPath<T>
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
			[...ACC, FindNestedTypeFromFullPath<T, GetFullPath<T, U, P>, 'write'>]
	  >
	: never
