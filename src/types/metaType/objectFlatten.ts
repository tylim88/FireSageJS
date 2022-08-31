import { RemoveLastSlash } from '../tsUtils'

export type DeepKey<
	T,
	Mode extends 'read' | 'write',
	K extends keyof T = keyof T
> = K extends string | number | `${number}`
	? T[K] extends infer R
		? R extends Record<string, unknown>
			?
					| (`${K}/` & (Mode extends 'write' ? unknown : never))
					| `${K}/${DeepKey<R, Mode>}`
			: `${K}/`
		: never // impossible route
	: never // impossible route

type DeepValue<
	T,
	P extends string,
	Mode extends 'read' | 'write'
	// ! P extends `${infer K extends keyof T}/${infer Rest extends DeepKey<T[K],Mode>}` causes error
> = P extends `${infer K}/${infer Rest}`
	? T[K & keyof T] extends infer S
		? S extends unknown[]
			? never
			: DeepKey<S, Mode> extends infer W // ! need distribution because RemoveLastSlash<DeepKey<S, Mode>> may result in string | `${string}/something` which will collapse into string
			? Rest extends RemoveLastSlash<W & string>
				? DeepValue<S, Rest, Mode>
				: never // impossible route
			: never // impossible route
		: never // impossible route
	: T[P & keyof T]

export type ObjectFlatten<Data> = Data extends string | unknown[]
	? Data
	: Data extends Record<string, unknown>
	? {
			[K in DeepKey<Data, 'write'> as RemoveLastSlash<K>]-?: ObjectFlatten<
				DeepValue<Data, RemoveLastSlash<K>, 'write'>
			>
	  }
	: Data
