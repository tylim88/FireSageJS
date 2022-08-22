import { MetaType } from '../metaType'
import { DatabaseReference } from '../query'
import { FindNestedWriteTypeFromFullPath } from '../utils'

export type IsChildObjectOrArray<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	E extends string
> = FindNestedWriteTypeFromFullPath<T, U> extends
	| Record<string, unknown>
	| unknown[]
	? DatabaseReference<T, U>
	: E
