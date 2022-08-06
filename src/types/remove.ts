import { Remove, Push } from './fieldValue'

// not in use
export type GetAllRemovePath<
	T,
	Key extends string | undefined = undefined
> = T extends Remove
	? Key
	: T extends Record<string, unknown>
	? keyof T extends infer K
		? K extends K // make it distributive
			? GetAllRemovePath<
					T[K & keyof T],
					Key extends undefined ? K & string : `${Key}/${K & string}`
			  >
			: never
		: never
	: T extends Push<infer X>
	? GetAllRemovePath<X, Key extends undefined ? string : `${Key}/${string}`>
	: never
