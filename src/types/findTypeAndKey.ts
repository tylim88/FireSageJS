import { MetaType } from './metaType'
import { RemoveLastSegment } from './stringManipulation'
import { PushAble, Removable, PushAbleOnly } from './fieldValue'

export type Mode = 'read' | 'write' | 'base' | 'compare'

export type FindParentKey<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = U extends keyof T['flatten_write'] & string
	? RemoveLastSegment<U> extends never
		? null
		: RemoveLastSegment<U>
	: never

type TypeDiving<T, U extends string> = U extends `${infer Y}/${infer S}`
	? TypeDiving<T[Y & keyof T], S>
	: T[U & keyof T]

// not in use
export type FindParentNestedTypeFromFullPath<
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

export type FindNestedTypeFromFullPath<
	T extends MetaType,
	U extends string | undefined,
	M extends Mode,
	ACC extends T[M] = T[M]
> = U extends undefined
	? T[M]
	: ACC extends undefined // distributive, remove able read need this
	? undefined
	: U extends `${infer R extends keyof ACC & string}/${infer S}`
	? ACC[R] extends infer P
		? P extends P
			? FindNestedTypeFromFullPath<T, S, M, P>
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
	: never

export type GetAllRemovablePath<T extends MetaType> = GetAllVPath<
	T['base'],
	Removable
>

export type GetAllPushAblePath<T extends MetaType> = GetAllVPath<
	T['base'],
	PushAble<unknown>
>

export type GetAllPushOnlyPath<T extends MetaType> = GetAllVPath<
	T['base'],
	PushAbleOnly<unknown>
>
