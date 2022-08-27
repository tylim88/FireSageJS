import { MetaType } from '../metaType'
import { DataSnapshot } from '../snapshots'
import { ErrorInvalidOnChildType } from './error'
import {
	FindAllTopLevelChildKeys,
	GetFullPath,
	IsRecordOrArray,
} from '../utils'

export type IsValidOnChildRef<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = IsRecordOrArray<T, U, ErrorInvalidOnChildType<U>>

export type GetOnChildSnapshot<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = GetFullPath<
	T,
	U,
	FindAllTopLevelChildKeys<T, U>
> extends infer C extends keyof T['flatten_write'] & string
	? C extends C // make distributive
		? DataSnapshot<T, C>
		: never
	: never
