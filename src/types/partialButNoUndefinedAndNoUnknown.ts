import { MetaType } from './metaTypeCreator'
import { FindAllChildKeys, FindNestedType, GetFullPath } from './findParentType'
import { ErrorHasNoChild, ErrorUnknownProperty } from './error'

export type PartialButNoUndefinedAndNoUnknown<
	T extends MetaType,
	U extends (keyof T['flattenWrite'] & string) | undefined,
	Data extends Record<string, unknown>,
	Type extends Record<string, unknown> = {
		[K in FindAllChildKeys<T, U>]: FindNestedType<T, GetFullPath<T, U, K>>
	}
> = FindAllChildKeys<T, U> extends never
	? ErrorHasNoChild<U>
	: keyof Data & string extends keyof Type
	? {
			[K in keyof Data]: Type[K & keyof Type]
	  }
	: ErrorUnknownProperty<Exclude<keyof Data, keyof Type> & string>
