import { RemoveLastSlash } from '../stringManipulation'

type DeepKey_<T, K extends keyof T, Mode extends 'read' | 'write'> = K extends
	| string
	| number
	| `${number}`
	? T[K] extends infer R
		? R extends Record<string, unknown>
			?
					| (`${K}/` & (Mode extends 'write' ? unknown : never))
					| `${K}/${DeepKey_<R, keyof R, Mode>}`
			: `${K}/`
		: '1' // impossible route
	: '2' // impossible route

export type DeepKey<T, Mode extends 'read' | 'write'> = RemoveLastSlash<
	DeepKey_<T, keyof T, Mode>
>

type DeepValue<
	T,
	P extends DeepKey<T, Mode>,
	Mode extends 'read' | 'write'
	// ! P extends `${infer K extends keyof T}/${infer Rest extends DeepKey<T[K],Mode>}` causes error
> = P extends `${infer K}/${infer Rest}`
	? K extends `${keyof T & (string | number)}`
		? T[K & keyof T] extends infer S
			? S extends unknown[]
				? never
				: Rest extends DeepKey<S, Mode>
				? DeepValue<S, Rest, Mode>
				: never
			: never
		: never
	: P extends `${keyof T & (string | number)}`
	? T[P & keyof T]
	: 5 // impossible route

export type ObjectFlatten<Data> = Data extends string | unknown[]
	? Data
	: Data extends Record<string, unknown>
	? {
			[K in DeepKey<Data, 'write'>]-?: ObjectFlatten<
				DeepValue<Data, K, 'write'>
			>
	  }
	: Data
