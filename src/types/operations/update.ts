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

/**
Writes multiple values to the Database at once.

The values argument contains multiple property-value pairs that will be written to the Database together. Each child property can either be a simple property (for example, "name") or a relative path (for example, "name/first") from the current location to the data to update.

As opposed to the set() method, update() can be use to selectively update only the referenced properties at the current location (instead of replacing all the child properties at the current location).

The effect of the write will be visible immediately, and the corresponding events ('value', 'child_added', etc.) will be triggered. Synchronization of the data to the Firebase servers will also be started, and the returned Promise will resolve when complete. If provided, the onComplete callback will be called asynchronously after synchronization has finished.

A single update() will generate a single "value" event at the location where the update() was performed, regardless of how many children were modified.

Note that modifying data with update() will cancel any pending transactions at that location, so extreme care should be taken if mixing update() and transaction() to modify the same data.

@param ref — The location to write to.

@param paths — array containing relative child paths.

@param values - array containing values respective to the paths. Eg: given paths ['a','b','c'] and values [1, 2, 3], 1 will be written to path 'a', 2 will be written to path 'b' and 3 will be written to path 'c'.  

@returns — Resolves when update on server is complete.
 */
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
