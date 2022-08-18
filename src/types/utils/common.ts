export type StrictOmit<T, Key extends keyof T> = Omit<T, Key>

export type StrictExclude<T, U extends T> = Exclude<T, U>

export type OddNumber<
	X extends number,
	Y extends unknown[] = [1],
	Z extends number = never
> = Y['length'] extends X
	? Z | Y['length']
	: OddNumber<X, [1, 1, ...Y], Z | Y['length']>

export type EvenNumber<
	X extends number,
	Y extends unknown[] = [],
	Z extends number = never
> = Y['length'] extends X
	? Z | Y['length']
	: OddNumber<X, [1, 1, ...Y], Z | Y['length']>

export type DoNotDistribute<T> = T
