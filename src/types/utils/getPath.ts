import { MetaType } from '../metaType'
import {
	PushAble,
	Removable,
	PushAbleOnly,
	NumericKeyRecord,
} from '../fieldValue'
import { ValidateFullPath } from './validatePathAndType'
import { ErrorIsNotChildPathOf } from './error'

export type GetFullPath<
	T extends MetaType,
	ParentFullPath extends (keyof T['flatten_write'] & string) | undefined,
	ChildRelativePath extends string
> = ParentFullPath extends string
	? `${ParentFullPath}/${ChildRelativePath}` extends keyof T['flatten_write'] &
			string
		? ValidateFullPath<
				T,
				`${ParentFullPath}/${ChildRelativePath}`,
				`${ParentFullPath}/${ChildRelativePath}`
		  >
		: ErrorIsNotChildPathOf<ParentFullPath, ChildRelativePath>
	: ParentFullPath extends undefined
	? ChildRelativePath extends keyof T['flatten_write'] & string
		? ChildRelativePath
		: ErrorIsNotChildPathOf<ParentFullPath, ChildRelativePath>
	: never // impossible route

export type GetAllVPath<
	T,
	V,
	Key extends string | undefined = undefined
> = T extends V
	?
			| Key
			| (T extends PushAble<infer X>
					? GetAllVPath<
							X,
							V,
							Key extends undefined ? string : `${Key}/${string}`
					  >
					: never)
			| (T extends PushAbleOnly<infer X>
					? GetAllVPath<
							X,
							V,
							Key extends undefined ? string : `${Key}/${string}`
					  >
					: never)
			| (T extends NumericKeyRecord<infer X>
					? GetAllVPath<
							X,
							V,
							Key extends undefined ? string : `${Key}/${number}`
					  >
					: never)
	: T extends Record<string, unknown>
	? keyof T extends infer K
		? K extends K // make it distributive
			? GetAllVPath<
					T[K & keyof T],
					V,
					Key extends undefined ? K & string : `${Key}/${K & string}`
			  >
			: never
		: never
	: T extends PushAble<infer X>
	? GetAllVPath<X, V, Key extends undefined ? string : `${Key}/${string}`>
	: T extends PushAbleOnly<infer X>
	? GetAllVPath<X, V, Key extends undefined ? string : `${Key}/${string}`>
	: T extends NumericKeyRecord<infer X>
	? GetAllVPath<X, V, Key extends undefined ? string : `${Key}/${number}`>
	: never

export type GetAllRemovablePaths<T extends MetaType> = GetAllVPath<
	T['base'],
	Removable
>

export type GetAllPushAblePaths<T extends MetaType> = GetAllVPath<
	T['base'],
	PushAble<unknown>
>

export type GetAllPushAbleOnlyPaths<T extends MetaType> = GetAllVPath<
	T['base'],
	PushAbleOnly<unknown>
>

export type GetAllNumericKeyRecordPaths<T extends MetaType> = GetAllVPath<
	T['base'],
	NumericKeyRecord<unknown>
>
