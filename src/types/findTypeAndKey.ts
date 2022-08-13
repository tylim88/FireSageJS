import { MetaType } from './metaType'
import { RemoveLastSegment, GetNumberOfSlash } from './stringManipulation'

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
	: keyof T['flatten_write'] & string extends infer R // make distributive
	? R extends `${U}/${infer S}`
		? S
		: never
	: never // impossible route

export type FindAllTopLevelChildKeys<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = FindAllChildKeys<T, U> extends infer R
	? R extends `${string}/${string}`
		? never
		: R & string
	: never // impossible route

export type FindNestedWriteTypeFromFullPath<
	T extends MetaType,
	U extends string | undefined,
	ACC extends T['write'] = T['write']
> = U extends undefined
	? T['write']
	: U extends `${infer R}/${infer S}`
	? R extends keyof ACC
		? ACC[R] extends infer P // make distributive
			? P extends P
				? FindNestedWriteTypeFromFullPath<T, S, P>
				: never // impossible route
			: never // impossible route
		: never // impossible route
	: U extends keyof ACC
	? ACC[U]
	: never // impossible route

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
		? ACC[R] extends infer P // make distributive
			? P extends (infer Q)[]
				? FindNestedReadTypeFromFullPath<T, S, Record<`${number}`, Q>>
				: FindNestedReadTypeFromFullPath<T, S, P>
			: never // impossible route
		: never // impossible route
	: U extends keyof ACC
	? ACC[U]
	: never // impossible route

export type FindMetaPathType<
	T extends MetaType,
	U extends keyof T['flatten_write'] & string
> = keyof T['flatten_write'] extends infer S // make distributive
	? S extends S
		? U extends S
			? GetNumberOfSlash<U> extends GetNumberOfSlash<S & string>
				? S
				: never
			: never
		: never // impossible route
	: never // impossible route
