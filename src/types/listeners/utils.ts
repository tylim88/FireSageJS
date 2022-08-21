import { MetaType } from '../metaType'
import { DatabaseReference } from '../query'
import { DataSnapshot } from '../snapshots'
import { ErrorInvalidOnChildType } from './error'
import {
	FindAllTopLevelChildKeys,
	GetFullPath,
	FindNestedWriteTypeFromFullPath,
} from '../utils'

export type IsValidOnChildRef<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = FindNestedWriteTypeFromFullPath<T, U> extends
	| Record<string, unknown>
	| unknown[]
	? DatabaseReference<T, U>
	: ErrorInvalidOnChildType<U>

export type GetOnChildSnapshot<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = GetFullPath<
	T,
	U,
	FindAllTopLevelChildKeys<T, U>
> extends infer C extends keyof T['flatten_write'] & string
	? C extends C
		? DataSnapshot<T, C>
		: never
	: never
