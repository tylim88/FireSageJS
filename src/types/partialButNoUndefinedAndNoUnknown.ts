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
} from './error'

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

export type UpdateValuesLoopCheck<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	V extends (FindAllChildKeys<T, U> extends infer R
		? R extends string
			? [R, FindNestedTypeFromFullPath<T, GetFullPath<T, U, R>, 'write'>]
			: never
		: never)[],
	ACC extends [string, unknown][] = []
> = V extends []
	? ACC
	: V extends [infer P, ...infer S]
	? P extends V[number]
		? S extends V
			? UpdateValuesLoopCheck<
					T,
					U,
					S,
					[
						...ACC,
						GetFullPath<T, U, P[0]> extends GetAllPushAbleOnlyPath<T>
							? [ErrorIsPushOnlyAbleType<`relative path${P[0]}`>, 'Error']
							: [
									P[0],
									FindNestedTypeFromFullPath<
										T,
										GetFullPath<T, U, P[0]>,
										'write'
									>
							  ]
					]
			  >
			: 123[]
		: 456[]
	: V

type o = unknown[] extends [infer R, ...infer S] ? 1 : 2
