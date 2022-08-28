import { MetaType } from '../metaType'
import { DataSnapshot } from '../snapshots'
import { ErrorInvalidOnChildType } from './error'
import {
	FindAllTopLevelChildKeys,
	GetFullPath,
	IsRecordOrArray,
} from '../utils'
import { Query, DatabaseReference } from '../refs'

export type IsValidOnChildRef<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = IsRecordOrArray<
	T,
	U,
	ErrorInvalidOnChildType<U>,
	DatabaseReference<T, U> | Query<T, U> // ! why Query<T, U> alone does not work?
>

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
