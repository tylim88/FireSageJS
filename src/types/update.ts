import { MetaType } from './metaType'
import {
	FindNestedWriteTypeFromFullPath,
	ReplaceNumericRecordIfInputIsRecordString,
	GetFullPath,
	GetAllPushAbleOnlyPaths,
} from './utils'
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
	: string[] extends V
	? [ErrorElementNeedConstAssertion]
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
	N extends readonly string[],
	V extends readonly unknown[],
	ACC extends unknown[] = []
> = N extends []
	? ACC
	: N extends readonly [infer P extends string, ...infer S extends string[]]
	? V extends readonly [infer X, ...infer Y extends unknown[]]
		? GetNodeTypes<
				T,
				U,
				S,
				Y,
				[
					...ACC,
					ReplaceNumericRecordIfInputIsRecordString<
						X,
						FindNestedWriteTypeFromFullPath<T, GetFullPath<T, U, P>>
					>
				]
		  >
		: GetNodeTypes<
				T,
				U,
				S,
				[],
				[...ACC, FindNestedWriteTypeFromFullPath<T, GetFullPath<T, U, P>>]
		  >
	: never
