import { RemoveLastSlash } from '../stringManipulation'
import { IsSame, IsEqual } from '../utils'

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
type o = DeepKey<
	{ a: { b: Record<`${number}`, { c: 1 }> | { d: 1 }[] } },
	'write'
>
type u = DeepKey<
	{
		a: {
			b: {
				[x in string]: 1 | 2 | 3
			}
		}
	},
	'write'
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

type p = DeepValue<
	{ a: { b: Record<number, { c: 123 }> | { d: 456 }[] } },
	`a/b/${number}/c`,
	'write'
>

export type ObjectFlatten<Data> = Data extends string | unknown[]
	? Data
	: Data extends Record<string, unknown>
	? {
			[K in DeepKey<Data, 'write'>]-?: ObjectFlatten<
				DeepValue<Data, K, 'write'>
			>
	  }
	: Data
type q = ObjectFlatten<{
	a: { b: Record<number, { c: 1123 }> | { d: 3451 }[] }
}>

type e = ObjectFlatten<{
	b: {
		[x: string]: 1 | 2 | 3
	}
}>
