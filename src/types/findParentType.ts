import { MetaType } from './metaTypeCreator'
import { GetNumberOfCharacter } from './utils'

export type GetNumberOfSlash<ID extends string> = GetNumberOfCharacter<ID, '/'>

export type GetLastTwoSegment<U extends `${string}/${string}`> =
	GetNumberOfSlash<U> extends 1
		? U
		: U extends `${string}/${infer R extends `${string}/${string}`}`
		? GetLastTwoSegment<R>
		: never

export type GetLastPart<U extends string> = U extends `${string}/${string}`
	? GetLastTwoSegment<U> extends `${string}/${infer R}`
		? R
		: never
	: U

export type RemoveLastSegment<
	U extends string,
	ACC extends `${string}/${string}` = never
> = GetNumberOfSlash<U> extends 0
	? ACC extends `${infer P}/` // ! write article about <ACC[] extends `${infer P}/`[]>, the P become string
		? P
		: never
	: U extends `${infer S}/${infer R}`
	? RemoveLastSegment<R, ACC[] extends never[] ? `${S}/` : `${ACC}${S}/`>
	: never

export type FindParentKey<
	T extends MetaType,
	U extends (keyof T['flattenWrite'] & string) | undefined
> = U extends keyof T['flattenWrite'] & string
	? RemoveLastSegment<U> extends never
		? null
		: RemoveLastSegment<U>
	: never

export type FindParentType<
	T extends MetaType,
	U extends (keyof T['flattenWrite'] & string) | undefined
> = U extends keyof T['flattenWrite'] & string
	? RemoveLastSegment<U> extends never
		? T['write']
		: FindParentKey<T, U> extends keyof T['flattenWrite']
		? T['flattenWrite'][FindParentKey<T, U>]
		: never
	: never

export type FindAllChildKeys<
	T extends MetaType,
	U extends (keyof T['flattenWrite'] & string) | undefined
> = U[] extends undefined[]
	? keyof T['flattenWrite'] & string
	: keyof T['flattenWrite'] & string extends infer R
	? R extends `${U}/${infer S}`
		? S
		: never
	: never

export type GetFullPath<
	T extends MetaType,
	ParentFullPath extends (keyof T['flattenWrite'] & string) | undefined,
	ChildRelativePath extends string
> = `${ParentFullPath}/${ChildRelativePath}` extends keyof T['flattenWrite'] &
	string
	? `${ParentFullPath}/${ChildRelativePath}`
	: ParentFullPath extends undefined
	? ChildRelativePath extends keyof T['flattenWrite'] & string
		? ChildRelativePath
		: never
	: never

export type FindNestedType<
	T extends MetaType,
	U extends string | undefined,
	ACC extends T['flattenWrite'] = T['write']
> = U extends undefined
	? T['write']
	: U extends `${infer R extends keyof ACC & string}/${infer S}`
	? FindNestedType<T, S, ACC[R]>
	: U extends keyof ACC & string
	? ACC[U]
	: never
