import {
	GetLastTwoSegment,
	GetLastPart,
	RemoveLastSegment,
	FindParentKey,
	FindParentType,
	FindAllChildKeys,
	FindNestedType,
} from './findParentType'
import { IsTrue, IsSame } from './utils'
import { Users } from '../utilForTests'
import { ServerTimestamp } from './fieldValue'

describe('test', () => {
	it('test last 2 segments', () => {
		// @ts-expect-error
		type A = GetLastTwoSegment<'a'>
		type B = GetLastTwoSegment<'a/b'>
		type C = GetLastTwoSegment<'a/b/c'>
		type D = GetLastTwoSegment<'a/b/c/d'>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, 'a/b'>>()
		IsTrue<IsSame<C, 'b/c'>>()
		IsTrue<IsSame<D, 'c/d'>>()
	})

	it('test get last part', () => {
		type A = GetLastPart<'a'>
		type B = GetLastPart<'a/b'>
		type C = GetLastPart<'a/b/c'>
		type D = GetLastPart<'a/b/c/d'>
		IsTrue<IsSame<A, 'a'>>()
		IsTrue<IsSame<B, 'b'>>()
		IsTrue<IsSame<C, 'c'>>()
		IsTrue<IsSame<D, 'd'>>()
	})

	it('test Remove Last Segment', () => {
		type A = RemoveLastSegment<'a'>
		type B = RemoveLastSegment<'a/b'>
		type C = RemoveLastSegment<'a/b/c'>
		type D = RemoveLastSegment<'a/b/c/d'>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, 'a'>>()
		IsTrue<IsSame<C, 'a/b'>>()
		IsTrue<IsSame<D, 'a/b/c'>>()
	})

	it('test Find Parent Key', () => {
		type A = FindParentKey<Users, undefined>
		type B = FindParentKey<Users, 'a'>
		type C = FindParentKey<Users, 'b/d'>
		type D = FindParentKey<Users, 'b/d/f/j'>
		type E = FindParentKey<Users, `b/h/${string}`>
		type F = FindParentKey<Users, `b/h/${string}/i`>
		type G = FindParentKey<Users, `b/h`>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, null>>()
		IsTrue<IsSame<C, 'b'>>()
		IsTrue<IsSame<D, 'b/d/f'>>()
		IsTrue<IsSame<E, 'b/h'>>()
		IsTrue<IsSame<F, `b/h/${string}`>>()
		IsTrue<IsSame<G, 'b'>>()
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
		IsTrue<IsSame<A, keyof Users['flatten_write']>>()
		IsTrue<IsSame<B, never>>()
		IsTrue<IsSame<C, 'e' | 'f' | 'k' | 'f/j'>>()
		IsTrue<IsSame<D, never>>()
		IsTrue<IsSame<E, 'i' | 'l'>>()
		IsTrue<IsSame<F, never>>()
		IsTrue<IsSame<G, string>>()
		IsTrue<IsSame<H, never>>()
	})

	it('test Find Parent Type', () => {
		type A = FindParentType<Users, undefined, 'write'>
		type B = FindParentType<Users, 'a', 'write'>
		type C = FindParentType<Users, 'b/d', 'write'>
		type D = FindParentType<Users, 'b/d/f/j', 'write'>
		type E = FindParentType<Users, `b/h/${string}`, 'write'>
		type F = FindParentType<Users, `b/h/${string}/i`, 'write'>
		type G = FindParentType<Users, `b/h`, 'write'>
		type H = FindParentType<Users, `b/h/${string}/l`, 'write'>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, Users['write']>>()
		IsTrue<IsSame<C, Users['flatten_write']['b']>>()
		IsTrue<IsSame<D, Users['flatten_write']['b/d/f']>>()
		IsTrue<IsSame<E, Users['flatten_write']['b']['h']>>()
		IsTrue<IsSame<F, Users['flatten_write']['b']['h'][string]>>()
		IsTrue<IsSame<G, Users['flatten_write']['b']>>()
		IsTrue<IsSame<H, Users['flatten_write']['b']['h'][string]>>()
	})

	it('test Find Write Type', () => {
		type A = FindNestedType<Users, undefined, 'write'>
		type B = FindNestedType<Users, 'a', 'write'>
		type C = FindNestedType<Users, 'b/d', 'write'>
		type D = FindNestedType<Users, 'b/d/f/j', 'write'>
		type E = FindNestedType<Users, `b/h/${string}`, 'write'>
		type F = FindNestedType<Users, `b/h/${string}/i`, 'write'>
		type G = FindNestedType<Users, `b/h`, 'write'>
		type H = FindNestedType<Users, `b/h/${string}/l`, 'write'>
		type L = FindNestedType<Users, `b/h/${string}/l`, 'read'>
		IsTrue<IsSame<A, Users['write']>>()
		IsTrue<IsSame<B, Users['write']['a']>>()
		IsTrue<IsSame<C, Users['write']['b']['d']>>()
		IsTrue<IsSame<D, Users['write']['b']['d']['f']['j']>>()
		IsTrue<IsSame<E, Users['write']['b']['h'][string]>>()
		IsTrue<IsSame<F, Users['write']['b']['h'][string]['i']>>()
		IsTrue<IsSame<G, Users['write']['b']['h']>>()
		IsTrue<IsSame<H, ServerTimestamp>>()
		IsTrue<IsSame<L, number>>()
	})
})
