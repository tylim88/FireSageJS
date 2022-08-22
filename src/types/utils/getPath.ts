import { MetaType } from '../metaType'
import { PushAble, Removable, PushAbleOnly, PseudoArray } from '../fieldType'
import { ReplaceInvalidSegment } from './replacePathAndType'

export type GetFullPath<
	T extends MetaType,
	ParentFullPath extends (keyof T['flatten_write'] & string) | undefined,
	ChildRelativePath extends string
> = `${ParentFullPath}/${ChildRelativePath}` extends keyof T['flatten_write'] &
	string
	? ReplaceInvalidSegment<
			T,
			`${ParentFullPath}/${ChildRelativePath}`
	  > extends keyof T['flatten_write'] & string
		? `${ParentFullPath}/${ChildRelativePath}`
		: never
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
			| (T extends PseudoArray<infer X>
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
	: T extends PseudoArray<infer X>
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

export type GetAllPseudoArrayPaths<T extends MetaType> = GetAllVPath<
	T['base'],
	PseudoArray<unknown>
>
