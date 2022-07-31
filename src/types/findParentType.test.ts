import {
	GetLastTwoSegment,
	GetLastPart,
	RemoveLastSegment,
	FindParentKey,
	FindParentType,
	RemoveRootName,
	FindAllChildKeys,
} from './findParentType'
import { IsTrue, IsSame } from './utils'
import { Users } from '../utilForTests'

describe('test', () => {
	it('test last 2 segments', () => {
		// @ts-expect-error
		type A = GetLastTwoSegment<'a'>
		type B = GetLastTwoSegment<'a/b'>
		type C = GetLastTwoSegment<'a/b/c'>
		type D = GetLastTwoSegment<'a/b/c/d'>
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
	it('test remove root Name', () => {
		// @ts-expect-error
		type A = RemoveRootName<Users, 'a'>
		type B = RemoveRootName<Users, 'Users/a'>
		type C = RemoveRootName<Users, 'Users/b/d'>
		type D = RemoveRootName<Users, 'Users/b/d/f/g'>
		type E = RemoveRootName<Users, 'Users'>
		IsTrue<IsSame<B, 'a'>>()
		IsTrue<IsSame<C, 'b/d'>>()
		IsTrue<IsSame<D, 'b/d/f/g'>>()
		IsTrue<IsSame<E, never>>()
	})
	it('test Find Parent Key', () => {
		type A = FindParentKey<Users, 'a'>
		type B = FindParentKey<Users, 'b/c'>
		type C = FindParentKey<Users, 'b/d'>
		type D = FindParentKey<Users, 'b/d/f/g'>
		type E = FindParentKey<Users, 'b/h'>
		IsTrue<IsSame<A, Users['rootName']>>()
		IsTrue<IsSame<B, 'b'>>()
		IsTrue<IsSame<C, 'b'>>()
		IsTrue<IsSame<D, 'b/d/f'>>()
		IsTrue<IsSame<E, 'b'>>()
	})
	it('test Find Parent Type', () => {
		type A = FindParentType<Users, 'a'>
		type B = FindParentType<Users, 'b/c'>
		type C = FindParentType<Users, 'b/d'>
		type D = FindParentType<Users, 'b/d/f/g'>
		type E = FindParentType<Users, 'b/h'>
		IsTrue<IsSame<A, Users['root']>>()
		IsTrue<IsSame<B, Users['flattenRoot']['b']>>()
		IsTrue<IsSame<C, Users['flattenRoot']['b']>>()
		IsTrue<IsSame<D, Users['flattenRoot']['b/d/f']>>()
		IsTrue<IsSame<E, Users['flattenRoot']['b']>>()
	})
	it('test Find All Child Keys', () => {
		type A = FindAllChildKeys<Users, 'a'>
		type B = FindAllChildKeys<Users, 'b/c'>
		type C = FindAllChildKeys<Users, 'b/d'>
		type D = FindAllChildKeys<Users, 'b/d/f/g'>
		type E = FindAllChildKeys<Users, 'b/h'>
		type F = FindAllChildKeys<Users, `b/h/${string}`>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, never>>()
		IsTrue<IsSame<C, 'b/d/e' | 'b/d/f' | 'b/d/f/g'>>()
		IsTrue<IsSame<D, never>>()
		IsTrue<IsSame<E, `b/h/${string}`>>()
		IsTrue<IsSame<F, never>>()
	})
})
