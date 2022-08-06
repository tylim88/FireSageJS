import {
	FindParentKey,
	FindParentNestedTypeFromFullPath,
	FindAllChildKeys,
	FindNestedTypeFromFullPath,
	GetAllRemovePath,
	GetAllPushPath,
} from './findTypeAndKey'
import { IsTrue, IsSame } from './utils'
import { Users } from '../utilForTests'
import { Increment, ServerTimestamp } from './fieldValue'

describe('test', () => {
	it('test Find Parent Key', () => {
		type A = FindParentKey<Users, undefined>
		type B = FindParentKey<Users, 'a'>
		type C = FindParentKey<Users, 'b/d'>
		type D = FindParentKey<Users, 'b/d/f/j'>
		type E = FindParentKey<Users, `b/h/${string}`>
		type F = FindParentKey<Users, `b/h/${string}/i`>
		type G = FindParentKey<Users, `b/h`>
		type H = FindParentKey<Users, `b/h/${string}/m`>
		type I = FindParentKey<Users, `b/h/${string}/m/${string}`>
		type J = FindParentKey<Users, `b/h/${string}/m/${string}/n`>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, null>>()
		IsTrue<IsSame<C, 'b'>>()
		IsTrue<IsSame<D, 'b/d/f'>>()
		IsTrue<IsSame<E, 'b/h'>>()
		IsTrue<IsSame<F, `b/h/${string}`>>()
		IsTrue<IsSame<G, 'b'>>()
		IsTrue<IsSame<H, `b/h/${string}`>>()
		IsTrue<IsSame<I, `b/h/${string}/m`>>()
		IsTrue<IsSame<J, `b/h/${string}/m/${string}`>>()
	})

	it('test Find All Child Keys', () => {
		type A = FindAllChildKeys<Users, undefined>
		type B = FindAllChildKeys<Users, 'a'>
		type C = FindAllChildKeys<Users, 'b/d'>
		type D = FindAllChildKeys<Users, 'b/d/f/j'>
		type E = FindAllChildKeys<Users, `b/h/${string}`>
		type F = FindAllChildKeys<Users, `b/h/${string}/i`>
		type G = FindAllChildKeys<Users, `b/h`>
		type H = FindAllChildKeys<Users, `b/h/${string}/l`>
		type I = FindAllChildKeys<Users, `b/h/${string}/m`>
		type J = FindAllChildKeys<Users, `b/h/${string}/m/${string}/n`>
		type K = FindAllChildKeys<Users, `b/h/${string}/m/${string}`>

		IsTrue<IsSame<A, keyof Users['flatten_write']>>()
		IsTrue<IsSame<B, never>>()
		IsTrue<IsSame<C, 'e' | 'f' | 'k' | 'f/j'>>()
		IsTrue<IsSame<D, never>>()
		IsTrue<IsSame<E, 'i' | 'l' | 'm' | `m/${string}` | `m/${string}/n`>>()
		IsTrue<IsSame<F, never>>()
		IsTrue<IsSame<G, string>>()
		IsTrue<IsSame<H, never>>()
		IsTrue<IsSame<I, string>>()
		IsTrue<IsSame<J, never>>()
		IsTrue<IsSame<K, 'n'>>()
	})

	it('test Find Parent Type', () => {
		type A = FindParentNestedTypeFromFullPath<Users, undefined>
		type B = FindParentNestedTypeFromFullPath<Users, 'a'>
		type C = FindParentNestedTypeFromFullPath<Users, 'b/d'>
		type D = FindParentNestedTypeFromFullPath<Users, 'b/d/f/j'>
		type E = FindParentNestedTypeFromFullPath<Users, `b/h/${string}`>
		type F = FindParentNestedTypeFromFullPath<Users, `b/h/${string}/i`>
		type G = FindParentNestedTypeFromFullPath<Users, `b/h`>
		type H = FindParentNestedTypeFromFullPath<Users, `b/h/${string}/l`>
		type I = FindParentNestedTypeFromFullPath<Users, `b/h/${string}/m`>
		type J = FindParentNestedTypeFromFullPath<
			Users,
			`b/h/${string}/m/${string}`
		>
		type K = FindParentNestedTypeFromFullPath<
			Users,
			`b/h/${string}/m/${string}/n`
		>

		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, Users['write']>>()
		IsTrue<IsSame<C, Users['flatten_write']['b']>>()
		IsTrue<IsSame<D, Users['flatten_write']['b/d/f']>>()
		IsTrue<IsSame<E, Users['flatten_write']['b']['h']>>()
		IsTrue<IsSame<F, Users['flatten_write']['b']['h'][string]>>()
		IsTrue<IsSame<G, Users['flatten_write']['b']>>()
		IsTrue<IsSame<H, Users['flatten_write']['b']['h'][string]>>()
		IsTrue<IsSame<I, Users['flatten_write']['b']['h'][string]>>()
		IsTrue<IsSame<J, Users['flatten_write']['b']['h'][string]['m']>>()
		IsTrue<IsSame<K, Users['flatten_write']['b']['h'][string]['m']['string']>>()
	})

	it('test Find Nested Type', () => {
		type A = FindNestedTypeFromFullPath<Users, undefined, 'write'>
		type B = FindNestedTypeFromFullPath<Users, 'a', 'write'>
		type C = FindNestedTypeFromFullPath<Users, 'b/d', 'write'>
		type D = FindNestedTypeFromFullPath<Users, 'b/d/f/j', 'write'>
		type E = FindNestedTypeFromFullPath<Users, `b/h/${string}`, 'write'>
		type F = FindNestedTypeFromFullPath<Users, `b/h/${string}/i`, 'write'>
		type G = FindNestedTypeFromFullPath<Users, `b/h`, 'read'>
		type H = FindNestedTypeFromFullPath<Users, `b/h/${string}/l`, 'write'>
		type I = FindNestedTypeFromFullPath<Users, `b/h/${string}/m`, 'write'>
		type J = FindNestedTypeFromFullPath<
			Users,
			`b/h/${string}/m/${string}`,
			'write'
		>
		type K = FindNestedTypeFromFullPath<
			Users,
			`b/h/${string}/m/${string}/n`,
			'write'
		>
		type L = FindNestedTypeFromFullPath<Users, `b/h/${string}/l`, 'read'>
		IsTrue<IsSame<A, Users['write']>>()
		IsTrue<IsSame<B, 1 | 2 | 3>>()
		IsTrue<
			IsSame<
				C,
				{
					e: 'abc' | 'xyz' | 'efg'
					f: {
						j: number | Increment
					}
					k: string
				}
			>
		>()
		IsTrue<IsSame<D, number | Increment>>()
		IsTrue<
			IsSame<
				E,
				{
					i: boolean
					l: ServerTimestamp
					m: { [x: string]: { n: '7' | '8' | '9' } }
				}
			>
		>()
		IsTrue<IsSame<F, boolean>>()
		IsTrue<
			IsSame<
				G,
				{
					[x: string]: {
						i: boolean
						l: number | undefined
						m: { [x: string]: { n: '7' | '8' | '9' | undefined } } | undefined
					}
				}
			>
		>()
		IsTrue<IsSame<H, ServerTimestamp>>()
		IsTrue<
			IsSame<
				I,
				{
					[x: string]: {
						n: '7' | '8' | '9'
					}
				}
			>
		>()
		IsTrue<
			IsSame<
				J,
				{
					n: '7' | '8' | '9'
				}
			>
		>()
		IsTrue<IsSame<K, '7' | '8' | '9'>>()
		IsTrue<IsSame<L, number | undefined>>()
	})

	it('test Get All Remove Path', () => {
		IsTrue<
			IsSame<
				GetAllRemovePath<Users>,
				| 'b/d'
				| 'b/d/k'
				| `b/h/${string}/m`
				| `b/h/${string}/l`
				| `b/h/${string}/m/${string}/n`
			>
		>
	})

	it('test Get All Push Path', () => {
		IsTrue<IsSame<GetAllPushPath<Users>, `b/h/${string}/m` | 'o'>>
	})
})
