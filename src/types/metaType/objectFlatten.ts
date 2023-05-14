import { RemoveLastSlash } from '../tsUtils'

export type DeepKey<T, K extends keyof T = keyof T> = K extends string | number
	? T[K] extends infer R
		? R extends Record<string, unknown> // * make R distributive
			? // * trailing '/' is needed because string | `${string}/something` will collapse into string
			  `${K}/` | `${K}/${DeepKey<R>}`
			: `${K}/`
		: never // impossible route
	: never // impossible route

export type DeepValue<
	T,
	P extends string
	// ! P extends `${infer K extends keyof T}/${infer Rest extends DeepKey<T[K],Mode>}` causes TS to hang, why?
> = P extends `${infer K}/${infer Rest}`
	? T[(K extends `${infer R extends number}` ? R : K) & keyof T] extends infer S
		? S extends S // * make S distributive
			? DeepValue<S, Rest>
			: never
		: never // impossible route
	: T[(P extends `${infer R extends number}` ? R : P) & keyof T]

export type ObjectFlatten<Data> = Data extends string | unknown[]
	? Data
	: Data extends Record<string, unknown>
	? {
			[K in DeepKey<Data> as RemoveLastSlash<K>]-?: ObjectFlatten<
				DeepValue<Data, RemoveLastSlash<K>>
			>
	  }
	: Data
