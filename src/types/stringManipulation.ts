export type RemoveLastSlash<T extends string> = T extends `${infer R}/` ? R : T

export type GetNumberOfCharacter<
	ID extends string,
	Character extends string,
	SlashCount extends unknown[] = []
> = ID extends `${string}${Character}${infer Tail}`
	? GetNumberOfCharacter<Tail, Character, [1, ...SlashCount]>
	: SlashCount['length']

export type GetNumberOfSlash<ID extends string> = GetNumberOfCharacter<ID, '/'>

export type GetLastTwoSegment<U extends `${string}/${string}`> =
	GetNumberOfSlash<U> extends 1
		? U
		: U extends `${string}/${infer R extends `${string}/${string}`}`
		? GetLastTwoSegment<R>
		: never

export type GetLastSegment<U extends string> = U extends `${string}/${string}`
	? GetLastTwoSegment<U> extends `${string}/${infer R}`
		? R
		: never
	: U

export type RemoveLastSegment<
	U extends string,
	ACC extends `${string}/${string}` = never
> = GetNumberOfSlash<U> extends 0
	? ACC extends `${infer P}/`
		? P
		: never
	: U extends `${infer S}/${infer R}`
	? RemoveLastSegment<R, ACC[] extends never[] ? `${S}/` : `${ACC}${S}/`>
	: never
