import { MetaType } from '../metaType'
import {
	PushAble,
	Removable,
	PushAbleOnly,
	NumericKeyRecord,
} from '../fieldType'
import { ValidateFullPath } from './validatePathAndType'

export type GetFullPath<
	T extends MetaType,
	ParentFullPath extends (keyof T['flatten_write'] & string) | undefined,
	ChildRelativePath extends string
> = `${ParentFullPath}/${ChildRelativePath}` extends keyof T['flatten_write'] &
	string
	? ValidateFullPath<
			T,
			`${ParentFullPath}/${ChildRelativePath}`,
			`${ParentFullPath}/${ChildRelativePath}`,
			never,
			never,
			never
	  >
	: ParentFullPath extends undefined
	? ChildRelativePath extends keyof T['flatten_write'] & string
		? ChildRelativePath
		: never
	: never
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
