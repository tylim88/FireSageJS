import { MetaType } from './metaType'
import {
	FindAllChildKeys,
	FindNestedTypeFromFullPath,
	GetFullPath,
} from './findTypeAndKey'
import { ErrorHasNoChild, ErrorUnknownProperty } from './error'

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
