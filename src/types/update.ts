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
} from './error'

const a = [1, 2, 3] as const
type o = (readonly ['a', 'b'])['length']

//  not in use
export type PartialButNoUndefinedAndNoUnknown<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	Data extends Record<string, unknown>,
	Type extends Record<string, unknown> = {
		[K in FindAllChildKeys<T, U>]: FindNestedTypeFromFullPath<
			T,
			GetFullPath<T, U, K>,
			'write'
		>
	}
> = FindAllChildKeys<T, U> extends never
	? ErrorHasNoChild<U>
	: keyof Data & string extends keyof Type
	? {
			[K in keyof Data]: Type[K & keyof Type]
	  }
	: ErrorUnknownProperty<Exclude<keyof Data, keyof Type> & string>

export type VerifyNodeNames<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V,
	ACC extends string[] = []
> = V extends []
	? ACC
	: V extends [infer P, ...infer S]
	? VerifyNodeNames<
			T,
			U,
			S,
			[
				...ACC,
				GetFullPath<T, U, P> extends GetAllPushAbleOnlyPath<T>
					? ErrorIsPushOnlyAbleType<`child ${P}`>
					: P
			]
	  >
	: never

export type GetNodeTypes<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V,
	ACC extends unknown[] = []
> = V extends []
	? ACC
	: V extends [
			infer P extends string,
			...infer S extends FindAllChildKeys<T, U>[]
	  ]
	? GetNodeTypes<
			T,
			U,
			S,
			[...ACC, FindNestedTypeFromFullPath<T, GetFullPath<T, U, P>, 'write'>]
	  >
	: never
