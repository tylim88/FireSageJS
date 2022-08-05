import { MetaType } from './metaTypeCreator'
import { GetNumberOfCharacter } from './utils'

export type Mode = 'read' | 'write' | 'base'

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
	? ACC extends `${infer P}/` // TODO write article about <ACC[] extends `${infer P}/`[]>, the P become string
		? P
		: never
	: U extends `${infer S}/${infer R}`
	? RemoveLastSegment<R, ACC[] extends never[] ? `${S}/` : `${ACC}${S}/`>
	: never

export type FindParentKey<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = U extends keyof T['flatten_write'] & string
	? RemoveLastSegment<U> extends never
		? null
		: RemoveLastSegment<U>
	: never

export type FindParentType<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined,
	M extends Mode
> = U extends keyof T['flatten_write'] & string
	? RemoveLastSegment<U> extends never
		? T[M]
		: FindParentKey<T, U> extends keyof T[`flatten_${M}`]
		? T[`flatten_${M}`][FindParentKey<T, U>]
		: never
	: never

export type FindAllChildKeys<
	T extends MetaType,
	U extends (keyof T['flatten_write'] & string) | undefined
> = U[] extends undefined[]
	? keyof T['flatten_write'] & string
	: keyof T['flatten_write'] & string extends infer R
	? R extends `${U}/${infer S}`
		? S
		: never
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

export type FindNestedType<
	T extends MetaType,
	U extends string | undefined,
	M extends Mode,
	ACC extends T[`flatten_${M}`] = T[M]
> = U extends undefined
	? T[M]
	: U extends `${infer R extends keyof ACC & string}/${infer S}`
	? FindNestedType<T, S, M, ACC[R]>
	: U extends keyof ACC & string
	? ACC[U]
	: never
