import { MetaType } from './metaTypeCreator'

export type GetNumberOfInvalidCharacter<
	ID extends string,
	InvalidCharacter extends string,
	SlashCount extends unknown[] = []
> = ID extends `${string}${InvalidCharacter}${infer Tail}`
	? GetNumberOfInvalidCharacter<Tail, InvalidCharacter, [1, ...SlashCount]>
	: SlashCount['length']

export type GetNumberOfSlash<ID extends string> = GetNumberOfInvalidCharacter<
	ID,
	'/'
>

export type GetLastTwoSegment<U extends `${string}/${string}`> =
	GetNumberOfSlash<U> extends 1
		? U
		: U[] extends `${string}/${infer R extends `${string}/${string}`}`[]
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
	? ACC extends `${infer P}/` // ! write article about ACC[] extends `${infer P}/`[]
		? P
		: never
	: U[] extends `${infer S}/${infer R}`[]
	? RemoveLastSegment<R, ACC[] extends never[] ? `${S}/` : `${ACC}${S}/`>
	: never

export type FindParentKey<
	T extends MetaType,
	U extends keyof T['flattenRoot'] & string
> = RemoveLastSegment<U> extends never ? null : RemoveLastSegment<U>

export type FindParentType<
	T extends MetaType,
	U extends keyof T['flattenRoot'] & string
> = RemoveLastSegment<U> extends never
	? T['root']
	: T['flattenRoot'][FindParentKey<T, U> & keyof T['flattenRoot']]

export type FindAllChildKeys<
	T extends MetaType,
	U extends (keyof T['flattenRoot'] & string) | null
> = U[] extends null[]
	? keyof T['flattenRoot'] & string
	: keyof T['flattenRoot'] & string extends infer R
	? R extends `${U}/${infer S}`
		? S
		: never
	: never
