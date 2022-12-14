import {
	FindParentKey,
	FindParentNestedWriteTypeFromFullPath,
	FindAllLevelChildKeys,
	FindNestedReadTypeFromFullPath,
	FindAllTopLevelChildKeys,
	FindNestedWriteTypeFromFullPath,
	FindMetaPathType,
	FindKeyOfWriteType,
	FindNestedCompareTypeFromFullPath,
} from './findTypeAndKey'
import { IsTrue, IsSame } from '../tsUtils'
import { Users, TopLevelRecord } from '../../utilForTests'
import { Increment } from '../fieldValue'

describe('test', () => {
	it('test Find Parent Key', () => {
		type A = FindParentKey<Users, undefined>
		type B = FindParentKey<Users, 'a'>
		type C = FindParentKey<Users, 'b/d'>
		type D = FindParentKey<Users, 'b/d/f/j'>
		type E = FindParentKey<Users, `b/h/${string}`>
		type F = FindParentKey<Users, `b/h/${string}/i`>
		type G = FindParentKey<Users, `b/h`>
		type H = FindParentKey<Users, `b/h/${string}/l`>
		type I = FindParentKey<Users, `b/h/${string}/m`>
		type J = FindParentKey<Users, `b/h/${string}/m/${string}`>
		type K = FindParentKey<Users, `b/h/${string}/m/${string}/n`>
		type L = FindParentKey<Users, `b/h/${string}/p`>
		type M = FindParentKey<Users, `b/h/${string}/p/${string}`>
		type N = FindParentKey<Users, `b/h/${string}/p/${string}/r`>
		type O = FindParentKey<Users, `b/h/${string}/s`>
		type P = FindParentKey<Users, `b/h/${string}/s/${number}`>
		type Q = FindParentKey<Users, `b/h/${string}/s/${number}/t`>

		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, null>>()
		IsTrue<IsSame<C, 'b'>>()
		IsTrue<IsSame<D, 'b/d/f'>>()
		IsTrue<IsSame<E, 'b/h'>>()
		IsTrue<IsSame<F, `b/h/${string}`>>()
		IsTrue<IsSame<G, 'b'>>()
		IsTrue<IsSame<H, `b/h/${string}`>>()
		IsTrue<IsSame<I, `b/h/${string}`>>()
		IsTrue<IsSame<J, `b/h/${string}/m`>>()
		IsTrue<IsSame<K, `b/h/${string}/m/${string}`>>()
		IsTrue<IsSame<L, `b/h/${string}`>>()
		IsTrue<IsSame<M, `b/h/${string}/p`>>()
		IsTrue<IsSame<N, `b/h/${string}/p/${string}`>>()
		IsTrue<IsSame<O, `b/h/${string}`>>()
		IsTrue<IsSame<P, `b/h/${string}/s`>>()
		IsTrue<IsSame<Q, `b/h/${string}/s/${number}`>>()
	})

	it('test Find All Child Keys', () => {
		type A = FindAllLevelChildKeys<Users, undefined>
		type B = FindAllLevelChildKeys<Users, 'a'>
		type C = FindAllLevelChildKeys<Users, 'b/d'>
		type D = FindAllLevelChildKeys<Users, 'b/d/f/j'>
		type E = FindAllLevelChildKeys<Users, `b/h/abc`>
		type F = FindAllLevelChildKeys<Users, `b/h/${string}/i`>
		type G = FindAllLevelChildKeys<Users, `b/h`>
		type H = FindAllLevelChildKeys<Users, `b/h/${string}/l`>
		type I = FindAllLevelChildKeys<Users, `b/h/${string}/m`>
		type J = FindAllLevelChildKeys<Users, `b/h/${string}/m/${string}`>
		type K = FindAllLevelChildKeys<Users, `b/h/${string}/m/abc/n`>
		type L = FindAllLevelChildKeys<Users, `b/h/${string}/p`>
		type M = FindAllLevelChildKeys<Users, `b/h/${string}/p/${string}`>
		type N = FindAllLevelChildKeys<Users, `b/h/abc/p/${string}/r`>
		type O = FindAllLevelChildKeys<Users, `b/h/${string}/s`>
		type P = FindAllLevelChildKeys<Users, `b/h/${string}/s/${string}`>
		type Q = FindAllLevelChildKeys<Users, `b/h/${string}/s/abc/t`>

		IsTrue<IsSame<A, keyof Users['flatten_write']>>()
		IsTrue<IsSame<B, never>>()
		IsTrue<IsSame<C, 'e' | 'f' | 'k' | 'f/j'>>()
		IsTrue<IsSame<D, never>>()
		IsTrue<
			IsSame<
				E,
				| 'i'
				| 'l'
				| 'm'
				| `m/${string}`
				| `m/${string}/n`
				| 'p'
				| `p/${string}`
				| `p/${string}/r`
				| 's'
				| `s/${number}`
				| `s/${number}/t`
			>
		>()
		IsTrue<IsSame<F, never>>()
		IsTrue<
			IsSame<
				G,
				| `${string}/`
				| `${string}/m`
				| `${string}/i`
				| `${string}/l`
				| `${string}/p`
				| `${string}/s`
				| `${string}/m/${string}`
				| `${string}/m/${string}/n`
				| `${string}/p/${string}`
				| `${string}/p/${string}/r`
				| `${string}/s/${number}`
				| `${string}/s/${number}/t`
			>
		>()
		IsTrue<IsSame<H, never>>()
		IsTrue<IsSame<I, `${string}/` | `${string}/n`>>()
		IsTrue<IsSame<J, 'n'>>()
		IsTrue<IsSame<K, never>>()
		IsTrue<IsSame<L, `${string}/` | `${string}/r`>>()
		IsTrue<IsSame<M, 'r'>>()
		IsTrue<IsSame<N, never>>()
		IsTrue<IsSame<O, `${number}` | `${number}/t`>>()
		IsTrue<IsSame<P, never>>()
		IsTrue<IsSame<Q, never>>()
	})

	it('test Find All Top Level Child Keys', () => {
		type A = FindAllTopLevelChildKeys<Users, undefined>
		type B = FindAllTopLevelChildKeys<Users, 'a'>
		type C = FindAllTopLevelChildKeys<Users, 'b/d'>
		type D = FindAllTopLevelChildKeys<Users, 'b/d/f/j'>
		type E = FindAllTopLevelChildKeys<Users, `b/h/${string}`>
		type F = FindAllTopLevelChildKeys<Users, `b/h/${string}/i`>
		type G = FindAllTopLevelChildKeys<Users, `b/h`>
		type H = FindAllTopLevelChildKeys<Users, `b/h/${string}/l`>
		type I = FindAllTopLevelChildKeys<Users, `b/h/${string}/m`>
		type J = FindAllTopLevelChildKeys<Users, `b/h/${string}/m/${string}`>
		type K = FindAllTopLevelChildKeys<Users, `b/h/${string}/m/${string}/n`>
		type L = FindAllTopLevelChildKeys<Users, `b/h/${string}/p`>
		type M = FindAllTopLevelChildKeys<Users, `b/h/${string}/p/${string}`>
		type N = FindAllTopLevelChildKeys<Users, `b/h/${string}/p/${string}/r`>
		type O = FindAllTopLevelChildKeys<Users, `b/h/${string}/s`>
		type P = FindAllTopLevelChildKeys<Users, `b/h/${string}/s/${number}`>
		type Q = FindAllTopLevelChildKeys<Users, `b/h/${string}/s/${string}/t`>
		IsTrue<IsSame<A, 'a' | 'b' | 'o' | 'q' | 'u' | 'w'>>()
		IsTrue<IsSame<B, never>>()
		IsTrue<IsSame<C, 'e' | 'f' | 'k'>>()
		IsTrue<IsSame<D, never>>()
		IsTrue<IsSame<E, 'i' | 'l' | 'm' | 'p' | 's'>>()
		IsTrue<IsSame<F, never>>()
		IsTrue<IsSame<G, string>>()
		IsTrue<IsSame<H, never>>()
		IsTrue<IsSame<I, string>>()
		IsTrue<IsSame<J, 'n'>>()
		IsTrue<IsSame<K, never>>()
		IsTrue<IsSame<L, string>>()
		IsTrue<IsSame<M, 'r'>>()
		IsTrue<IsSame<N, never>>()
		IsTrue<IsSame<O, `${number}`>>()
		IsTrue<IsSame<P, 't'>>()
		IsTrue<IsSame<Q, never>>()
	})

	it('test Find Parent Type', () => {
		type A = FindParentNestedWriteTypeFromFullPath<Users, undefined>
		type B = FindParentNestedWriteTypeFromFullPath<Users, 'a'>
		type C = FindParentNestedWriteTypeFromFullPath<Users, 'b/d'>
		type D = FindParentNestedWriteTypeFromFullPath<Users, 'b/d/f/j'>
		type E = FindParentNestedWriteTypeFromFullPath<Users, `b/h/${string}`>
		type F = FindParentNestedWriteTypeFromFullPath<Users, `b/h/${string}/i`>
		type G = FindParentNestedWriteTypeFromFullPath<Users, `b/h`>
		type H = FindParentNestedWriteTypeFromFullPath<Users, `b/h/${string}/l`>
		type I = FindParentNestedWriteTypeFromFullPath<Users, `b/h/${string}/m`>
		type J = FindParentNestedWriteTypeFromFullPath<
			Users,
			`b/h/${string}/m/${string}`
		>
		type K = FindParentNestedWriteTypeFromFullPath<
			Users,
			`b/h/${string}/m/${string}/n`
		>
		type L = FindParentNestedWriteTypeFromFullPath<Users, `b/h/${string}/p`>
		type M = FindParentNestedWriteTypeFromFullPath<
			Users,
			`b/h/${string}/p/${string}`
		>
		type N = FindParentNestedWriteTypeFromFullPath<
			Users,
			`b/h/${string}/p/${string}/r`
		>
		type O = FindParentNestedWriteTypeFromFullPath<Users, `b/h/${string}/s`>
		type P = FindParentNestedWriteTypeFromFullPath<
			Users,
			`b/h/${string}/s/${number}`
		>
		type Q = FindParentNestedWriteTypeFromFullPath<
			Users,
			`b/h/${string}/s/${number}/t`
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
		IsTrue<IsSame<L, Users['flatten_write']['b']['h'][string]>>()
		IsTrue<IsSame<M, Users['flatten_write']['b']['h'][string]['p']>>()
		IsTrue<IsSame<N, Users['flatten_write']['b']['h'][string]['p']['string']>>()
		IsTrue<IsSame<O, Users['flatten_write']['b']['h'][string]>>()
		IsTrue<IsSame<P, Users['flatten_write']['b']['h'][string]['s']>>()
		IsTrue<
			IsSame<
				Q,
				{
					t: number | Increment
				}
			>
		>()
	})

	it('test Find Nested Write Type', () => {
		type A = FindNestedWriteTypeFromFullPath<Users, undefined>
		type B = FindNestedWriteTypeFromFullPath<Users, 'a'>
		type C = FindNestedWriteTypeFromFullPath<Users, 'b/d'>
		type D = FindNestedWriteTypeFromFullPath<Users, 'b/d/f/j'>
		type E = FindNestedWriteTypeFromFullPath<Users, `b/h/${string}`>
		type F = FindNestedWriteTypeFromFullPath<Users, `b/h/${string}/i`>
		type G = FindNestedWriteTypeFromFullPath<Users, `b/h`>
		type H = FindNestedWriteTypeFromFullPath<Users, `b/h/${string}/l`>
		type I = FindNestedWriteTypeFromFullPath<Users, `b/h/${string}/m`>
		type J = FindNestedWriteTypeFromFullPath<Users, `b/h/${string}/m/${string}`>
		type K = FindNestedWriteTypeFromFullPath<
			Users,
			`b/h/${string}/m/${string}/n`
		>
		type L = FindNestedWriteTypeFromFullPath<Users, `b/h/${string}/p`>
		type M = FindNestedWriteTypeFromFullPath<Users, `b/h/${string}/p/${string}`>
		type N = FindNestedWriteTypeFromFullPath<
			Users,
			`b/h/${string}/p/${string}/r`
		>
		type O = FindNestedWriteTypeFromFullPath<Users, `b/h/${string}/s`>
		type P = FindNestedWriteTypeFromFullPath<Users, `b/h/${string}/s/${number}`>
		type Q = FindNestedWriteTypeFromFullPath<
			Users,
			`b/h/${string}/s/${number}/t`
		>

		IsTrue<IsSame<A, Users['write']>>()
		IsTrue<IsSame<B, Users['write']['a']>>()
		IsTrue<IsSame<C, Users['write']['b']['d']>>()
		IsTrue<IsSame<D, Users['write']['b']['d']['f']['j']>>()
		IsTrue<IsSame<E, Users['write']['b']['h'][string]>>()
		IsTrue<IsSame<F, Users['write']['b']['h'][string]['i']>>()
		IsTrue<IsSame<G, Users['write']['b']['h']>>()
		IsTrue<IsSame<H, Users['write']['b']['h'][string]['l']>>()
		IsTrue<IsSame<I, Users['write']['b']['h'][string]['m']>>()
		IsTrue<IsSame<J, Users['write']['b']['h'][string]['m'][string]>>()
		IsTrue<IsSame<K, Users['write']['b']['h'][string]['m'][string]['n']>>()
		IsTrue<IsSame<L, Users['write']['b']['h'][string]['p']>>()
		IsTrue<IsSame<M, Users['write']['b']['h'][string]['p'][string]>>()
		IsTrue<IsSame<N, Users['write']['b']['h'][string]['p'][string]['r']>>()
		IsTrue<IsSame<O, Users['write']['b']['h'][string]['s']>>()
		IsTrue<
			IsSame<
				P,
				{
					t: number | Increment
				}
			>
		>()
		IsTrue<IsSame<Q, number | Increment>>()
	})

	it('test Find Nested Read Type', () => {
		type A = FindNestedReadTypeFromFullPath<Users, undefined>
		type B = FindNestedReadTypeFromFullPath<Users, 'a'>
		type C = FindNestedReadTypeFromFullPath<Users, 'b/d'>
		type D = FindNestedReadTypeFromFullPath<Users, 'b/d/f/j'>
		type E = FindNestedReadTypeFromFullPath<Users, `b/h/${string}`>
		type F = FindNestedReadTypeFromFullPath<Users, `b/h/${string}/i`>
		type G = FindNestedReadTypeFromFullPath<Users, `b/h`>
		type H = FindNestedReadTypeFromFullPath<Users, `b/h/${string}/l`>
		type I = FindNestedReadTypeFromFullPath<Users, `b/h/${string}/m`>
		type J = FindNestedReadTypeFromFullPath<Users, `b/h/${string}/m/${string}`>
		type K = FindNestedReadTypeFromFullPath<
			Users,
			`b/h/${string}/m/${string}/n`
		>
		type L = FindNestedReadTypeFromFullPath<Users, `b/h/${string}/p`>
		type M = FindNestedReadTypeFromFullPath<Users, `b/h/${string}/p/${string}`>
		type N = FindNestedReadTypeFromFullPath<
			Users,
			`b/h/${string}/p/${string}/r`
		>
		type O = FindNestedReadTypeFromFullPath<Users, `b/h/${string}/s`>
		type P = FindNestedReadTypeFromFullPath<Users, `b/h/${string}/s/${number}`>
		type Q = FindNestedReadTypeFromFullPath<
			Users,
			`b/h/${string}/s/${number}/t`
		>
		IsTrue<IsSame<A, Users['read']>>()
		IsTrue<IsSame<B, Users['read']['a']>>()
		IsTrue<IsSame<C, Users['read']['b']['d']>>()
		IsTrue<IsSame<D, number>>()
		IsTrue<IsSame<E, Users['read']['b']['h'][string]>>()
		IsTrue<IsSame<F, Users['read']['b']['h'][string]['i']>>()
		IsTrue<IsSame<G, Users['read']['b']['h']>>()
		IsTrue<IsSame<H, Users['read']['b']['h'][string]['l']>>()
		IsTrue<IsSame<I, Users['read']['b']['h'][string]['m']>>()
		IsTrue<
			IsSame<
				J,
				| {
						n: '1' | '2' | '7' | '8' | '9' | undefined | null
				  }
				| undefined
				| null
			>
		>()
		IsTrue<IsSame<K, '1' | '2' | '7' | '8' | '9' | undefined | null>>()
		IsTrue<IsSame<L, Users['read']['b']['h'][string]['p']>>()
		IsTrue<
			IsSame<
				M,
				| {
						r: number | undefined | null
				  }
				| undefined
				| null
			>
		>()
		IsTrue<IsSame<N, number | undefined | null>>()
		IsTrue<IsSame<O, Users['read']['b']['h'][string]['s']>>()
		IsTrue<
			IsSame<
				P,
				| {
						t: number | undefined | null
				  }
				| undefined
				| null
			>
		>()
		IsTrue<IsSame<Q, number | undefined | null>>()
	})

	it('test Find Nested Compare Type', () => {
		type A = FindNestedCompareTypeFromFullPath<Users, undefined>
		type B = FindNestedCompareTypeFromFullPath<Users, 'a'>
		type C = FindNestedCompareTypeFromFullPath<Users, 'b/d'>
		type D = FindNestedCompareTypeFromFullPath<Users, 'b/d/f/j'>
		type E = FindNestedCompareTypeFromFullPath<Users, `b/h/${string}`>
		type F = FindNestedCompareTypeFromFullPath<Users, `b/h/${string}/i`>
		type G = FindNestedCompareTypeFromFullPath<Users, `b/h`>
		type H = FindNestedCompareTypeFromFullPath<Users, `b/h/${string}/l`>
		type I = FindNestedCompareTypeFromFullPath<Users, `b/h/${string}/m`>
		type J = FindNestedCompareTypeFromFullPath<
			Users,
			`b/h/${string}/m/${string}`
		>
		type K = FindNestedCompareTypeFromFullPath<
			Users,
			`b/h/${string}/m/${string}/n`
		>
		type L = FindNestedCompareTypeFromFullPath<Users, `b/h/${string}/p`>
		type M = FindNestedCompareTypeFromFullPath<
			Users,
			`b/h/${string}/p/${string}`
		>
		type N = FindNestedCompareTypeFromFullPath<
			Users,
			`b/h/${string}/p/${string}/r`
		>
		type O = FindNestedCompareTypeFromFullPath<Users, `b/h/${string}/s`>
		type P = FindNestedCompareTypeFromFullPath<
			Users,
			`b/h/${string}/s/${number}`
		>
		type Q = FindNestedCompareTypeFromFullPath<
			Users,
			`b/h/${string}/s/${number}/t`
		>

		IsTrue<IsSame<A, Users['compare']>>()
		IsTrue<IsSame<B, Users['compare']['a']>>()
		IsTrue<IsSame<C, Users['compare']['b']['d']>>()
		IsTrue<IsSame<D, Users['compare']['b']['d']['f']['j']>>()
		IsTrue<IsSame<E, Users['compare']['b']['h'][string]>>()
		IsTrue<IsSame<F, Users['compare']['b']['h'][string]['i']>>()
		IsTrue<IsSame<G, Users['compare']['b']['h']>>()
		IsTrue<IsSame<H, Users['compare']['b']['h'][string]['l']>>()
		IsTrue<IsSame<I, Users['compare']['b']['h'][string]['m']>>()
		IsTrue<IsSame<J, Users['compare']['b']['h'][string]['m'][string]>>()
		IsTrue<IsSame<K, Users['compare']['b']['h'][string]['m'][string]['n']>>()
		IsTrue<IsSame<L, Users['compare']['b']['h'][string]['p']>>()
		IsTrue<IsSame<M, Users['compare']['b']['h'][string]['p'][string]>>()
		IsTrue<IsSame<N, Users['compare']['b']['h'][string]['p'][string]['r']>>()
		IsTrue<IsSame<O, Users['compare']['b']['h'][string]['s']>>()
		IsTrue<
			IsSame<
				P,
				{
					t: number
				}
			>
		>()
		IsTrue<IsSame<Q, number>>()
	})

	it('test FindMetaPathType Type', () => {
		type A = FindMetaPathType<Users, 'a'>
		type B = FindMetaPathType<Users, 'b/h/abc'>
		type C = FindMetaPathType<Users, 'b/h/123'>
		type D = FindMetaPathType<Users, 'b/h/abc/efg'>
		type E = FindMetaPathType<Users, 'b/h/abc/s'>
		type F = FindMetaPathType<Users, 'b/h/abc/s/123'>
		type G = FindMetaPathType<Users, 'b/h/abc/s/efg'>
		type H = FindMetaPathType<Users, undefined>

		IsTrue<IsSame<A, 'a'>>()
		IsTrue<IsSame<B, `b/h/${string}`>>()
		IsTrue<IsSame<C, `b/h/${string}`>>() // special case, should be `b/h/${number}`, because `${number}` extends string, ValidateFullPath will handle it
		IsTrue<IsSame<D, never>>()
		IsTrue<IsSame<E, `b/h/${string}/s`>>()
		IsTrue<IsSame<F, `b/h/${string}/s/${number}`>>()
		IsTrue<IsSame<G, never>>()
		IsTrue<IsSame<H, undefined>>()
	})

	it('test FindMetaPathType Type For TopLevelRecord Type', () => {
		type A = FindMetaPathType<TopLevelRecord, undefined>
		type B = FindMetaPathType<TopLevelRecord, 'user1'>
		type C = FindMetaPathType<TopLevelRecord, 'user1/a'>
		type D = FindMetaPathType<TopLevelRecord, 'user1/k'>

		IsTrue<IsSame<A, undefined>>()
		IsTrue<IsSame<B, string>>()
		IsTrue<IsSame<C, `${string}/a`>>()
		IsTrue<IsSame<D, never>>()
	})

	it('test Find Key of WriteType', () => {
		type A = FindKeyOfWriteType<Users, undefined>
		type B = FindKeyOfWriteType<Users, 'a'>
		type C = FindKeyOfWriteType<Users, 'b/d'>
		type D = FindKeyOfWriteType<Users, 'b/d/f/j'>
		type E = FindKeyOfWriteType<Users, `b/h/${string}`>
		type F = FindKeyOfWriteType<Users, `b/h/${string}/i`>
		type G = FindKeyOfWriteType<Users, `b/h`>
		type H = FindKeyOfWriteType<Users, `b/h/${string}/l`>
		type I = FindKeyOfWriteType<Users, `b/h/${string}/m`>
		type J = FindKeyOfWriteType<Users, `b/h/${string}/m/${string}`>
		type K = FindKeyOfWriteType<Users, `b/h/${string}/m/${string}/n`>
		type L = FindKeyOfWriteType<Users, `b/h/${string}/p`>
		type M = FindKeyOfWriteType<Users, `b/h/${string}/p/${string}`>
		type N = FindKeyOfWriteType<Users, `b/h/${string}/p/${string}/r`>
		type O = FindKeyOfWriteType<Users, `b/h/${string}/s`>
		type P = FindKeyOfWriteType<Users, `b/h/${string}/s/${number}`>
		type Q = FindKeyOfWriteType<Users, `b/h/${string}/s/${number}/t`>

		IsTrue<IsSame<A, 'a' | 'b' | 'o' | 'q' | 'u' | 'w'>>()
		IsTrue<IsSame<B, keyof number>>()
		IsTrue<IsSame<C, 'e' | 'f' | 'k'>>()
		IsTrue<IsSame<D, keyof number>>()
		IsTrue<IsSame<E, 'i' | 'l' | 'm' | 'p' | 's'>>()
		IsTrue<IsSame<F, 'valueOf'>>()
		IsTrue<IsSame<G, string>>()
		IsTrue<IsSame<H, keyof never>>()
		IsTrue<IsSame<I, string>>()
		IsTrue<IsSame<J, 'n'>>()
		IsTrue<IsSame<K, keyof '1'>>()
		IsTrue<IsSame<L, string>>()
		IsTrue<IsSame<M, 'r'>>()
		IsTrue<IsSame<N, keyof never>>()
		IsTrue<IsSame<O, `${number}`>>()
		IsTrue<IsSame<P, 't'>>()
		IsTrue<IsSame<Q, keyof number>>()
	})
})
