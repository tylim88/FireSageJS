import {
	GetLastTwoSegment,
	GetLastSegment,
	RemoveLastSegment,
	IsSubStringOfEither,
} from './stringCommon'
import { IsTrue, IsSame } from './isCommon'

describe('test', () => {
	it('test last 2 segments', () => {
		type A = GetLastTwoSegment<'a'>
		type B = GetLastTwoSegment<'a/b'>
		type C = GetLastTwoSegment<'a/b/c'>
		type D = GetLastTwoSegment<`a/b/${string}/d`>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, 'a/b'>>()
		IsTrue<IsSame<C, 'b/c'>>()
		IsTrue<IsSame<D, `${string}/d`>>()
	})

	it('test get last segment', () => {
		type A = GetLastSegment<'a'>
		type B = GetLastSegment<'a/b'>
		type C = GetLastSegment<`a/b/${string}`>
		type D = GetLastSegment<`a/b/${string}/d`>
		IsTrue<IsSame<A, 'a'>>()
		IsTrue<IsSame<B, 'b'>>()
		IsTrue<IsSame<C, string>>()
		IsTrue<IsSame<D, 'd'>>()
	})

	it('test Remove Last Segment', () => {
		type A = RemoveLastSegment<'a'>
		type B = RemoveLastSegment<'a/b'>
		type C = RemoveLastSegment<`a/b/${string}`>
		type D = RemoveLastSegment<`a/b/${string}/d`>
		IsTrue<IsSame<A, never>>()
		IsTrue<IsSame<B, 'a'>>()
		IsTrue<IsSame<C, 'a/b'>>()
		IsTrue<IsSame<D, `a/b/${string}`>>()
	})

	it('test is sub string of, positive case', () => {
		type A = IsSubStringOfEither<'a', 'a'>
		type B = IsSubStringOfEither<'a/b', 'a'>
		type C = IsSubStringOfEither<'a', 'a/b'>
		type D = IsSubStringOfEither<'a/b/c', 'a'>
		type E = IsSubStringOfEither<'a', 'a/b/c'>
		type F = IsSubStringOfEither<'a/b/c', 'a/b'>
		type G = IsSubStringOfEither<'a/b', 'a/b/c'>
		type H = IsSubStringOfEither<'a', `${string}`>
		type I = IsSubStringOfEither<`${string}`, 'a'>
		type J = IsSubStringOfEither<'a/b', `${string}`>
		type K = IsSubStringOfEither<`${string}`, 'a/b'>
		type L = IsSubStringOfEither<`a/b/${string}`, `${string}`>
		type M = IsSubStringOfEither<`${string}`, `a/b/${string}`>
		type N = IsSubStringOfEither<`a/b/${string}`, `${string}/b`>
		type O = IsSubStringOfEither<`${string}/b`, `a/b/${string}`>
		type P = IsSubStringOfEither<`a/b/${string}`, `a/${string}/c`>
		type Q = IsSubStringOfEither<`a/${string}/c`, `a/b/${string}`>
		IsTrue<IsSame<A, true>>()
		IsTrue<IsSame<B, true>>()
		IsTrue<IsSame<C, true>>()
		IsTrue<IsSame<D, true>>()
		IsTrue<IsSame<E, true>>()
		IsTrue<IsSame<F, true>>()
		IsTrue<IsSame<G, true>>()
		IsTrue<IsSame<H, true>>()
		IsTrue<IsSame<I, true>>()
		IsTrue<IsSame<J, true>>()
		IsTrue<IsSame<K, true>>()
		IsTrue<IsSame<L, true>>()
		IsTrue<IsSame<M, true>>()
		IsTrue<IsSame<N, true>>()
		IsTrue<IsSame<O, true>>()
		IsTrue<IsSame<P, true>>()
		IsTrue<IsSame<Q, true>>()
	})

	it('test is sub string of, negative case', () => {
		type A = IsSubStringOfEither<'a', 'b'>
		type B = IsSubStringOfEither<'b/a', 'a'>
		type C = IsSubStringOfEither<'b', 'a/b'>
		type D = IsSubStringOfEither<'a/b/c', 'c'>
		type E = IsSubStringOfEither<'b', 'a/b/c'>
		type F = IsSubStringOfEither<'a/b/c', 'b/c'>
		type G = IsSubStringOfEither<'b/c', 'a/b/c'>
		type H = IsSubStringOfEither<'a/b', `${string}/c`>
		type I = IsSubStringOfEither<`${string}/c`, 'a/b'>
		type J = IsSubStringOfEither<`a/b/${string}`, `b/${string}`>
		type K = IsSubStringOfEither<`b/${string}`, `a/b/${string}`>
		type L = IsSubStringOfEither<`a/b/${string}`, `d/${string}/c`>
		type M = IsSubStringOfEither<`d/${string}/c`, `a/b/${string}`>
		IsTrue<IsSame<A, false>>()
		IsTrue<IsSame<B, false>>()
		IsTrue<IsSame<C, false>>()
		IsTrue<IsSame<D, false>>()
		IsTrue<IsSame<E, false>>()
		IsTrue<IsSame<F, false>>()
		IsTrue<IsSame<G, false>>()
		IsTrue<IsSame<H, false>>()
		IsTrue<IsSame<I, false>>()
		IsTrue<IsSame<J, false>>()
		IsTrue<IsSame<K, false>>()
		IsTrue<IsSame<L, false>>()
		IsTrue<IsSame<M, false>>()
	})
})
