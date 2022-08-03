import { MetaType } from './metaTypeCreator'
import { FindAllChildKeys, FindNestedType, GetFullPath } from './findParentType'

export type PartialButNoUndefined<
	T extends MetaType,
	U extends (keyof T['flattenRoot'] & string) | undefined,
	Data extends Record<string, unknown>,
	Type extends Record<string, unknown> = {
		[K in FindAllChildKeys<T, U>]: FindNestedType<T, GetFullPath<T, U, K>>
	}
> = keyof Data extends keyof Type
	? {
			[K in keyof Data]: Type[K]
	  }
	: `unknown properties:${Exclude<keyof Data, keyof Type> & string}`
