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

// not in use
export type GetFirstSegment<U extends string | undefined> =
	U extends `${infer Y}/${string}` ? Y : U

// not in use
export type RemoveFirstSegment<U extends string | undefined> =
	U extends `${string}/${infer Y}` ? Y : ''
