import { RemoveLastSlash } from '../tsUtils'

export type DeepKey<
	T,
	Mode extends 'read' | 'write', // ! removing this useless generic fail everything, why?
	K extends keyof T = keyof T
> = K extends string | number
	? T[K] extends infer R
		? R extends Record<string, unknown> // * make R distributive
			? // * trailing '/' is needed because string | `${string}/something` will collapse into string
			  `${K}/` | `${K}/${DeepKey<R, Mode>}`
			: `${K}/`
		: never // impossible route
	: never // impossible route

export type DeepValue<
	T,
	P extends string,
	Mode extends 'read' | 'write'
	// ! P extends `${infer K extends keyof T}/${infer Rest extends DeepKey<T[K],Mode>}` causes TS to hang, why?
> = P extends `${infer K}/${infer Rest}`
	? T[(K extends `${infer R extends number}` ? R : K) & keyof T] extends infer S
		? S extends unknown[] // * make S distributive
			? never
			: Rest extends RemoveLastSlash<DeepKey<S, Mode>>
			? DeepValue<S, Rest, Mode>
			: never // impossible route
		: never // impossible route
	: T[(P extends `${infer R extends number}` ? R : P) & keyof T]

export type ObjectFlatten<Data> = Data extends string | unknown[]
	? Data
	: Data extends Record<string, unknown>
	? {
			[K in DeepKey<Data, 'write'> as RemoveLastSlash<K>]-?: ObjectFlatten<
				DeepValue<Data, RemoveLastSlash<K>, 'write'>
			>
	  }
	: Data
