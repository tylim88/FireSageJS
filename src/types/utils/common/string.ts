export type RemoveLastSlash<T extends string> = T extends `${infer R}/` ? R : T

export type GetNumberOfCharacter<
	ID extends string,
	Character extends string,
	SlashCount extends unknown[] = []
> = ID extends `${string}${Character}${infer Tail}`
	? GetNumberOfCharacter<Tail, Character, [1, ...SlashCount]>
	: SlashCount['length']

export type GetNumberOfSlash<ID extends string> = GetNumberOfCharacter<ID, '/'>

export type GetLastTwoSegment<U extends string> = GetNumberOfSlash<U> extends 1
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

export type IsSameOrSubString<
	A extends string,
	B extends string
> = A extends `${infer T}/${infer U}`
	? B extends `${infer C}/${infer D}`
		? C extends T
			? IsSameOrSubString<U, D>
			: T extends C
			? IsSameOrSubString<U, D>
			: false
		: T extends B
		? true
		: false
	: A extends B
	? true
	: B extends A
	? true
	: false

export type IsSameOrSubStringOfEither<
	A extends string,
	B extends string
> = IsSameOrSubString<A, B> extends true
	? true
	: IsSameOrSubString<B, A> extends true
	? true
	: false

export type GetFirstSegment<U extends string | undefined> =
	U extends `${infer Y}/${string}` ? Y : U

export type RemoveFirstSegment<U extends string | undefined> =
	U extends `${string}/${infer Y}` ? Y : never
