import { MetaType } from '../metaType'
import {
	FindNestedWriteTypeFromFullPath,
	ValidateRecordString,
	GetFullPath,
	GetAllPushAbleOnlyPaths,
	ValidateChildPath,
} from '../utils'
import {
	IsSameOrSubStringOfEither,
	GetNumberOfSlash,
	IsAGreaterThanB,
	CreateArrayWithLengthX,
} from '../tsUtils'
import {
	ErrorIsPushOnlyAbleType,
	ErrorNeedTupleNotArray,
	ErrorElementNeedConstAssertion,
	ErrorPathHasAncestor,
} from './error'
import { DatabaseReference } from '../refs'

type ReplaceIfAncestorExist<
	T extends readonly string[],
	U extends string,
	Ancestors extends string[] = []
> = Ancestors['length'] extends 0
	? T extends readonly [infer H extends string, ...infer R extends string[]]
		? ReplaceIfAncestorExist<
				R,
				U,
				[
					...Ancestors,
					...(GetNumberOfSlash<H> extends GetNumberOfSlash<U>
						? []
						: IsSameOrSubStringOfEither<H, U> extends true
						? IsAGreaterThanB<
								CreateArrayWithLengthX<GetNumberOfSlash<H>>,
								CreateArrayWithLengthX<GetNumberOfSlash<U>>
						  > extends 'lesser'
							? [H]
							: []
						: [])
				]
		  >
		: U
	: ErrorPathHasAncestor<U, Ancestors[0]>

type ValidateChildPathAndCheckIsNotPushAbleOnly<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	P extends string
> = ValidateChildPath<T, U, P> extends P
	? GetFullPath<T, U, P> extends GetAllPushAbleOnlyPaths<T>
		? ErrorIsPushOnlyAbleType<`child ${P}`>
		: P
	: ValidateChildPath<T, U, P>

export type ValidateChildPaths<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends readonly string[],
	ACC extends readonly string[] = [],
	O extends readonly string[] = V
> = number extends V[number]
	? [ErrorNeedTupleNotArray]
	: V extends []
	? Readonly<ACC>
	: string[] extends V
	? [ErrorElementNeedConstAssertion]
	: V extends readonly [infer P extends string, ...infer S extends string[]]
	? ValidateChildPaths<
			T,
			U,
			S,
			[
				...ACC,
				string extends P
					? GetFullPath<T, U, P> extends never
						? ErrorElementNeedConstAssertion
						: ReplaceIfAncestorExist<
								O,
								ValidateChildPathAndCheckIsNotPushAbleOnly<T, U, P>
						  >
					: ReplaceIfAncestorExist<
							O,
							ValidateChildPathAndCheckIsNotPushAbleOnly<T, U, P>
					  >
			],
			O
	  >
	: never

export type GetChildPathsType<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	N extends readonly string[],
	V extends readonly unknown[],
	ACC extends unknown[] = []
> = N extends []
	? ACC
	: N extends readonly [infer P extends string, ...infer S extends string[]]
	? V extends readonly [infer X, ...infer Y extends unknown[]]
		? GetChildPathsType<
				T,
				U,
				S,
				Y,
				[
					...ACC,
					ValidateRecordString<
						X,
						FindNestedWriteTypeFromFullPath<T, GetFullPath<T, U, P>>
					>
				]
		  >
		: GetChildPathsType<
				T,
				U,
				S,
				[],
				[...ACC, FindNestedWriteTypeFromFullPath<T, GetFullPath<T, U, P>>]
		  >
	: never

// TODO research the 2 dimensions tuple inference issue, check old commit
export type Update = <
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	N extends readonly string[],
	V extends readonly unknown[]
>(
	ref: DatabaseReference<T, U>,
	paths: N extends never ? N : ValidateChildPaths<T, U, N>,
	values: V extends never ? V : GetChildPathsType<T, U, N, V>
) => Promise<void>
// ! If you change this, change also onDisconnect update
