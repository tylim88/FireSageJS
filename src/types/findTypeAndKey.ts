import { MetaType } from './metaType'
import { RemoveLastSegment } from './stringManipulation'
import { PushAble, Removable, PushAbleOnly, PseudoArray } from './fieldValue'

export type Mode = 'read' | 'write' | 'base' | 'compare'

export type FindParentKey<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = U extends keyof T['flatten_write'] & string
	? RemoveLastSegment<U> extends never
		? null
		: RemoveLastSegment<U>
	: never

type TypeDiving<
	T,
	U extends string | number | `${number}`
> = T extends unknown[]
	? never
	: U extends `${infer Y}/${infer S}`
	? TypeDiving<T[Y & keyof T], S>
	: U extends keyof T
	? T[U]
	: never

// not in use
export type FindParentNestedWriteTypeFromFullPath<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = U extends keyof T['flatten_write'] & string
	? RemoveLastSegment<U> extends never
		? T['write']
		: FindParentKey<T, U> extends keyof T[`flatten_write`]
		? TypeDiving<T[`flatten_write`], FindParentKey<T, U> & string>
		: never
	: never

export type FindAllChildKeys<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = U extends undefined
	? keyof T['flatten_write'] & string
	: keyof T['flatten_write'] & string extends infer R
	? R extends `${U}/${infer S}`
		? S
		: never
	: never

export type FindAllTopLevelChildKeys<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = FindAllChildKeys<T, U> extends infer R
	? R extends `${string}/${string}`
		? never
		: R & string
	: never

export type GetFullPath<
	T extends MetaType,
	ParentFullPath extends (keyof T['flatten_write'] & string) | undefined,
	ChildRelativePath extends string
> = `${ParentFullPath}/${ChildRelativePath}` extends keyof T['flatten_write'] &
	string
	? `${ParentFullPath}/${ChildRelativePath}`
	: ParentFullPath extends undefined
	? ChildRelativePath extends keyof T['flatten_write'] & string
		? ChildRelativePath
		: never
	: never

export type FindNestedWriteTypeFromFullPath<
	T extends MetaType,
	U extends string | undefined,
	ACC extends T['write'] = T['write']
> = U extends undefined
	? T['write']
	: U extends `${infer R}/${infer S}`
	? R extends keyof ACC
		? ACC[R] extends infer P
			? P extends P // make distributive
				? FindNestedWriteTypeFromFullPath<T, S, P>
				: never
			: never
		: never
	: U extends keyof ACC
	? ACC[U]
	: never

export type FindNestedReadTypeFromFullPath<
	T extends MetaType,
	U extends string | undefined,
	ACC extends T['read'] = T['read']
> = U extends undefined
	? T['read']
	: ACC extends undefined
	? never
	: U extends `${infer R}/${infer S}`
	? R extends keyof ACC
		? ACC[R] extends infer P
			? P extends (infer Q)[]
				? FindNestedReadTypeFromFullPath<T, S, Record<`${number}`, Q>>
				: FindNestedReadTypeFromFullPath<T, S, P>
			: never
		: never
	: U extends keyof ACC
	? ACC[U]
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
